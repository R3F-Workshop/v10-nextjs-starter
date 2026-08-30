import type { Metadata } from 'next'
import './globals.css'
import { Nav } from '@/app/components/site/Nav'

export const metadata: Metadata = {
  title: 'R3F v10 Next.js Starter',
  description: 'react-three-fiber v10 alpha in the Next.js App Router',
  icons: { icon: '/pmndrs.svg' },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className="h-full antialiased">
      {/* min-h-0 on <main> lets the home page's canvas fill the leftover
          height instead of overflowing the flex column */}
      <body className="flex min-h-full flex-col bg-[#0a0a0a] text-zinc-50">
        <Nav />
        <main className="flex min-h-0 flex-1 flex-col">{children}</main>
      </body>
    </html>
  )
}
