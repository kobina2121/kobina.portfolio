"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { z } from "zod";

import {
  clearAdminSession,
  createAdminSession,
  isAdminAuthenticated,
  verifyAdminCredentials,
} from "@/lib/admin/auth";
import {
  isListCollectionKey,
  listCollections,
  settingsCollection,
} from "@/lib/content/collections";
import { defaultPortfolioContent } from "@/lib/content/default-content";
import { type FormValues, normalizeValues } from "@/lib/content/fields";
import {
  deleteItem,
  getItem,
  moveItem,
  saveItem,
  saveSettings,
} from "@/lib/content/repository";
import {
  deleteImagesByUrl,
  saveImage,
  type SaveImageResult,
} from "@/lib/content/images";
import { seedPortfolioContent } from "@/lib/content/seed";
import { getDb } from "@/lib/db/mongodb";

export type AdminFormResult = {
  ok: false;
  message: string;
  fieldErrors?: Record<string, string>;
};

export type LoginState = { email?: string; error?: string };

async function assertAdmin() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
}

function revalidateSite() {
  revalidatePath("/", "layout");
}

function getFieldErrors(error: z.ZodError) {
  const fieldErrors: Record<string, string> = {};

  for (const issue of error.issues) {
    const path = issue.path.join(".");
    fieldErrors[path] ??= issue.message;
  }

  return fieldErrors;
}

function getSafeRedirect(value: FormDataEntryValue | null) {
  const target = typeof value === "string" ? value : "";

  return target.startsWith("/admin") && !target.startsWith("//")
    ? target
    : "/admin";
}

function getScreenshotUrls(item: Record<string, unknown> | null) {
  const screenshots = item?.screenshots;

  return Array.isArray(screenshots)
    ? screenshots.filter((url): url is string => typeof url === "string")
    : [];
}

export async function loginAction(
  _state: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !verifyAdminCredentials(email, password)
  ) {
    // Slow down repeated guesses.
    await new Promise((resolve) => setTimeout(resolve, 750));
    return {
      email: typeof email === "string" ? email : "",
      error: "That email and password don't match the admin account.",
    };
  }

  await createAdminSession();
  redirect(getSafeRedirect(formData.get("next")));
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function saveItemAction(
  collectionKey: string,
  id: string | null,
  values: FormValues,
): Promise<AdminFormResult> {
  await assertAdmin();

  if (!isListCollectionKey(collectionKey)) {
    return { ok: false, message: "Unknown collection." };
  }

  const config = listCollections[collectionKey];
  const parsed = config.schema.safeParse(
    normalizeValues(config.fields, values),
  );

  if (!parsed.success) {
    return {
      ok: false,
      message: "Some fields need attention.",
      fieldErrors: getFieldErrors(parsed.error),
    };
  }

  const db = await getDb();
  const previous = id ? await getItem(db, collectionKey, id) : null;
  const result = await saveItem(db, collectionKey, id, parsed.data);

  if (!result.ok) {
    return result;
  }

  // Delete screenshots that were removed from the project in this edit.
  const kept = new Set(getScreenshotUrls(parsed.data));
  await deleteImagesByUrl(
    getScreenshotUrls(previous).filter((url) => !kept.has(url)),
  );

  revalidateSite();
  redirect(`/admin/${collectionKey}?saved=1`);
}

export async function saveSettingsAction(
  values: FormValues,
): Promise<AdminFormResult> {
  await assertAdmin();

  const parsed = settingsCollection.schema.safeParse(
    normalizeValues(settingsCollection.fields, values),
  );

  if (!parsed.success) {
    return {
      ok: false,
      message: "Some fields need attention.",
      fieldErrors: getFieldErrors(parsed.error),
    };
  }

  await saveSettings(await getDb(), parsed.data);
  revalidateSite();
  redirect("/admin/settings?saved=1");
}

export async function deleteItemAction(formData: FormData) {
  await assertAdmin();

  const collectionKey = String(formData.get("collection"));
  const id = String(formData.get("id"));

  if (isListCollectionKey(collectionKey)) {
    const db = await getDb();
    const item = await getItem(db, collectionKey, id);
    await deleteItem(db, collectionKey, id);
    await deleteImagesByUrl(getScreenshotUrls(item));
    revalidateSite();
    redirect(`/admin/${collectionKey}?deleted=1`);
  }
}

export async function moveItemAction(formData: FormData) {
  await assertAdmin();

  const collectionKey = String(formData.get("collection"));
  const direction = formData.get("direction") === "up" ? "up" : "down";

  if (isListCollectionKey(collectionKey)) {
    await moveItem(
      await getDb(),
      collectionKey,
      String(formData.get("id")),
      direction,
    );
    revalidateSite();
    revalidatePath(`/admin/${collectionKey}`);
  }
}

export async function seedContentAction(formData: FormData) {
  await assertAdmin();

  await seedPortfolioContent(await getDb(), defaultPortfolioContent, {
    replace: formData.get("replace") === "true",
  });
  revalidateSite();
  redirect("/admin?seeded=1");
}

export async function uploadImageAction(
  formData: FormData,
): Promise<SaveImageResult> {
  await assertAdmin();

  const file = formData.get("file");

  if (!(file instanceof File)) {
    return { ok: false, message: "Choose an image to upload." };
  }

  return saveImage(new Uint8Array(await file.arrayBuffer()));
}
