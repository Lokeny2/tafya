import { defineField, defineType } from "sanity";

export const topicSchema = defineType({
  name: "topic",
  title: "Healthy Living Topic",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ["Physical Health", "Mental Wellbeing", "Preventive Care"],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "tips",
      title: "Tips",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});