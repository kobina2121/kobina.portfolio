import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "owner",
      title: "Owner name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Professional title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "email",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "availability",
      title: "Availability",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "aboutHighlights",
      title: "About highlights",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site settings",
      };
    },
  },
});
