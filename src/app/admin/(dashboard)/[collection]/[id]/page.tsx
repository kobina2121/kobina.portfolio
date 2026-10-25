import { notFound } from "next/navigation";

import { saveItemAction } from "@/app/admin/actions";
import { ContentForm } from "@/components/admin/content-form";
import { requireAdmin } from "@/lib/admin/auth";
import {
  isListCollectionKey,
  listCollections,
} from "@/lib/content/collections";
import { getItem } from "@/lib/content/repository";
import { getDb } from "@/lib/db/mongodb";

type EditItemPageProps = {
  params: Promise<{ collection: string; id: string }>;
};

export default async function AdminEditItemPage({ params }: EditItemPageProps) {
  await requireAdmin();

  const { collection, id } = await params;

  if (!isListCollectionKey(collection)) {
    notFound();
  }

  const item = await getItem(await getDb(), collection, id);

  if (!item) {
    notFound();
  }

  const config = listCollections[collection];

  return (
    <>
      <h1 className="mb-8 text-3xl font-black tracking-tight">
        Edit {config.singular}
      </h1>
      <ContentForm
        fields={config.fields}
        initialValues={item}
        action={saveItemAction.bind(null, collection, id)}
        submitLabel="Save changes"
        cancelHref={`/admin/${collection}`}
      />
    </>
  );
}
