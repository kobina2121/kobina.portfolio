import { defineField, defineType } from "sanity";

export const projectLink = defineType({
  name: "projectLink",
  title: "Project link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "url",
      description: "Leave empty when the link is private or not ready yet.",
      validation: (rule) =>
        rule.uri({
          scheme: ["http", "https"],
          allowRelative: false,
        }),
    }),
    defineField({
      name: "unavailableReason",
      title: "Unavailable reason",
      type: "text",
      rows: 2,
      description: "Shown when the URL is empty.",
    }),
  ],
});
