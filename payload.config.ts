import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Media } from './src/collections/Media'
import { Posts } from './src/collections/Posts'
import { Users } from './src/collections/Users'

export default buildConfig({
  admin: { user: Users.slug },
  collections: [Users, Media, Posts],
  // Local development falls back to a self-contained SQLite database. Vercel uses DATABASE_URL for Postgres.
  db: process.env.DATABASE_URL
    ? postgresAdapter({ pool: { connectionString: process.env.DATABASE_URL } })
    : sqliteAdapter({ client: { url: 'file:./payload.db' } }),
  editor: lexicalEditor(),
  plugins: [
    vercelBlobStorage({
      clientUploads: true,
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || 'development-secret-change-me',
  sharp,
  typescript: { outputFile: 'payload-types.ts' },
})
