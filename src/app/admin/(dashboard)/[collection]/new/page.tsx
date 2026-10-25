import { notFound } from "next/navigation";

import { saveItemAction } from "@/app/admin/actions";
import { ContentForm } from "@/components/admin/content-form";
import { requireAdmin } from "@/lib/admin/auth";
import {
  isListCollectionKey,
  listCollections,
} from "@/lib/content/collections";
import { getEmptyValues } from "@/lib/content/fields";

type NewItemPageProps = {
  params: Promise<{ collection: string }>;
};

export default async function AdminNewItemPage({ params }: NewItemPageProps) {
  await requireAdmin();

  const { collection } = await params;

  if (!isListCollectionKey(collection)) {
    notFound();
  }

  const config = listCollections[collection];

  return (
    <>
      <h1 className="mb-8 text-3xl font-black tracking-tight">
        New {config.singular}
      </h1>
      <ContentForm
        fields={config.fields}
        initialValues={getEmptyValues(config.fields)}
        action={saveItemAction.bind(null, collection, null)}
        submitLabel={`Create ${config.singular}`}
        cancelHref={`/admin/${collection}`}
      />
    </>
  );
}
