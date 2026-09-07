import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { getCMS } from '@/lib/payload'

export const revalidate = 60
export const dynamic = 'force-dynamic'

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getCMS()
  const { docs } = await payload.find({ collection: 'posts', where: { and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }] }, limit: 1, depth: 1 })
  const post = docs[0]
  if (!post) notFound()
  const image = typeof post.thumbnail === 'object' ? post.thumbnail : null
  return <main><header className="site-header"><Link href="/" className="brand">Field Notes</Link><nav><Link href="/blog">Journal</Link><Link href="/admin">Admin</Link></nav></header><article className="article"><Link className="back" href="/blog">← Journal</Link><p className="eyebrow">{post.publishedAt ? new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(new Date(post.publishedAt)) : 'Draft'}</p><h1>{post.title}</h1><p className="lead">{post.excerpt}</p>{image?.url && <Image className="article-image" src={image.url} alt={image.alt || post.title} width={1600} height={900} priority />}{post.content && <div className="prose"><RichText data={post.content} /></div>}</article></main>
}
