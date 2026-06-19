import { defineType, defineField } from "sanity";

export const area = defineType({
  name: "area",
  title: "Area of life",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 64 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "blurb",
      type: "text",
      rows: 2,
      description: "The kind of thing you tap here.",
    }),
    defineField({ name: "iconKey", type: "string" }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "displayOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: { select: { title: "title", subtitle: "blurb" } },
});
