import { defineField, defineType } from "sanity";

export const projectMedia = defineType({
  name: "projectMedia",
  title: "Project media",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "accent",
      title: "Gradient accent",
      type: "string",
      description:
        "Tailwind gradient classes used by the current generated media card.",
      validation: (rule) => rule.required(),
    }),
  ],
});
