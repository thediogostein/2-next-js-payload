import Link from 'next/link'
import { PostCard } from '@/components/PostCard'
import { getCMS } from '@/lib/payload'

export const metadata = { title: 'Journal' }
export const revalidate = 60
export const dynamic = 'force-dynamic'

export default async function Blog() {
  const payload = await getCMS()
  const { docs } = await payload.find({ collection: 'posts', where: { status: { equals: 'published' } }, sort: '-publishedAt', depth: 1 })
  return <main><header className="site-header"><Link href="/" className="brand">Field Notes</Link><nav><Link href="/blog">Journal</Link><Link href="/admin">Admin</Link></nav></header><section className="page-intro"><p className="eyebrow">The journal</p><h1>All articles</h1></section><section className="section">{docs.length ? <div className="grid">{docs.map((post) => <PostCard key={post.id} post={post as never} />)}</div> : <p className="empty">No posts published yet.</p>}</section></main>
}
