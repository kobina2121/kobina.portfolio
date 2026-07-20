import { defineField, defineType } from "sanity";

export const certification = defineType({
  name: "certification",
  title: "Certifications",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "provider",
      title: "Provider",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "verificationUrl",
      title: "Verification URL",
      type: "url",
    }),
    defineField({
      name: "orderRank",
      title: "Sort order",
      type: "number",
      initialValue: 100,
    }),
  ],
});
