import { defineField, defineType } from "sanity";

export const skill = defineType({
  name: "skill",
  title: "Skills",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon key",
      type: "string",
      options: {
        list: [
          "html",
          "css",
          "javascript",
          "react",
          "node",
          "figma",
          "git",
          "mysql",
          "firebase",
          "java",
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "color",
      title: "Tailwind color class",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
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
