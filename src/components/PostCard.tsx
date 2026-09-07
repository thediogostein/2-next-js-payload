import Image from 'next/image'
import Link from 'next/link'

type Media = { url?: string | null; alt?: string | null; sizes?: { card?: { url?: string | null } } } | number | null
type Post = { title: string; slug: string; excerpt: string; publishedAt?: string | null; thumbnail: Media }

export function PostCard({ post }: { post: Post }) {
  const image = typeof post.thumbnail === 'object' && post.thumbnail ? post.thumbnail : null
  const src = image?.sizes?.card?.url || image?.url

  return <article className="card">
    {src ? <Image className="card-image" src={src} alt={image?.alt || post.title} width={960} height={640} /> : <div className="image-placeholder" />}
    <div className="card-content">
      {post.publishedAt && <time>{new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(post.publishedAt))}</time>}
      <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
      <p>{post.excerpt}</p>
      <Link className="read-more" href={`/blog/${post.slug}`}>Read article →</Link>
    </div>
  </article>
}
