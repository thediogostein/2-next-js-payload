# Payload Blog

A Vercel-ready Next.js blog managed in Payload. Every post has a required thumbnail image; Payload creates optimized `thumbnail` and `card` image variants.

## Local setup

1. Copy `.env.example` to `.env` and set `PAYLOAD_SECRET`. Without `DATABASE_URL`, the app uses a local SQLite database (`payload.db`) automatically.
2. Run `npm install`, then `npm run dev`.
3. Open `http://localhost:3000/admin` to create the first admin user, upload media, and publish posts.

## Vercel deployment

Import this repository into Vercel, connect a Postgres database and a Blob store, then set `DATABASE_URL`, `PAYLOAD_SECRET`, and `BLOB_READ_WRITE_TOKEN`. Vercel Blob is configured for direct client uploads, so media is not written to the serverless filesystem.
