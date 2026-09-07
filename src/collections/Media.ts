import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { useAsTitle: 'alt' },
  access: { read: () => true },
  upload: {
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'thumbnail', width: 480, height: 320, position: 'centre', withoutEnlargement: true },
      { name: 'card', width: 960, height: 640, position: 'centre', withoutEnlargement: true },
    ],
  },
  fields: [{ name: 'alt', type: 'text', required: true }],
}
