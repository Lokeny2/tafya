import { defineField, defineType } from "sanity";

export const conditionSchema = defineType({
  name: "condition",
  title: "Condition",
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
        list: [
          "Cold & Flu",
          "Digestive",
          "Skin",
          "Mental Wellbeing",
          "Aches & Pains",
          "Allergies",
        ],
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
      name: "symptoms",
      title: "Symptoms",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "causes",
      title: "Causes",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "selfCare",
      title: "Self-care advice",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "whenToSeekHelp",
      title: "When to seek help",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "relatedConditions",
      title: "Related condition slugs",
      type: "array",
      of: [{ type: "string" }],
      description: "Enter slugs of related conditions e.g. common-cold",
    }),
  ],
});