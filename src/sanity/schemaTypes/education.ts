import { defineField, defineType } from "sanity";

export const education = defineType({
  name: "education",
  title: "Education",
  type: "document",
  fields: [
    defineField({
      name: "institution",
      title: "Institution",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "qualification",
      title: "Qualification",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "period",
      title: "Period",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "detail",
      title: "Detail",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "orderRank",
      title: "Sort order",
      type: "number",
      initialValue: 100,
    }),
  ],
});
