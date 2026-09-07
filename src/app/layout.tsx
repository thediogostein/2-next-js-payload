import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'Field Notes', template: '%s | Field Notes' },
  description: 'A clean, editor-managed blog powered by Next.js and Payload.',
}

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
