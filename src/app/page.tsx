import Link from 'next/link'
import { PostCard } from '@/components/PostCard'
import { getCMS } from '@/lib/payload'

export const revalidate = 60
export const dynamic = 'force-dynamic'

export default async function Home() {
  const payload = await getCMS()
  const { docs } = await payload.find({ collection: 'posts', where: { status: { equals: 'published' } }, sort: '-publishedAt', limit: 6, depth: 1 })
  return <main>
    <header className="site-header"><Link href="/" className="brand">Field Notes</Link><nav><Link href="/blog">Journal</Link><Link href="/admin">Admin</Link></nav></header>
    <section className="hero"><p className="eyebrow">Ideas, considered</p><h1>Stories worth sitting with.</h1><p>A focused blog, edited in Payload and delivered by Next.js.</p><Link className="button" href="/blog">Browse the journal</Link></section>
    <section className="section"><div className="section-heading"><p className="eyebrow">Latest writing</p><Link href="/blog">View all →</Link></div>{docs.length ? <div className="grid">{docs.map((post) => <PostCard key={post.id} post={post as never} />)}</div> : <p className="empty">Your published posts will appear here. Create your first post in <Link href="/admin">Payload Admin</Link>.</p>}</section>
  </main>
}
