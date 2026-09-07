import type { CollectionConfig } from 'payload'

const slugify = (value: string) =>
  value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'status', 'publishedAt'] },
  access: { read: ({ req }) => Boolean(req.user) || { status: { equals: 'published' } } },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug', type: 'text', required: true, unique: true, index: true,
      hooks: { beforeValidate: [({ value, data }) => value || slugify(data?.title || '')] },
    },
    { name: 'excerpt', type: 'textarea', required: true },
    {
      name: 'thumbnail', type: 'upload', relationTo: 'media', required: true,
      admin: { description: 'The image shown on blog listing cards and at the top of the article.' },
    },
    { name: 'content', type: 'richText', required: true },
    {
      name: 'status', type: 'select', required: true, defaultValue: 'draft',
      options: [{ label: 'Draft', value: 'draft' }, { label: 'Published', value: 'published' }],
    },
    { name: 'publishedAt', type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' } } },
  ],
}
