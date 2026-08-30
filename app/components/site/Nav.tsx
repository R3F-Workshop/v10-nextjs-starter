'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

/** Internal routes — App Router pages under app/ */
const ROUTES = [
  { label: 'about', href: '/about' },
  { label: 'notes', href: '/notes' },
] as const

const EXTERNAL = [
  { label: 'react-three-fiber', href: 'https://github.com/pmndrs/react-three-fiber' },
  { label: 'drei', href: 'https://github.com/pmndrs/drei' },
]

/**
 * The site header, rendered once in the root layout so it survives navigation.
 * It's a client component only because of usePathname for the active state —
 * <Link> itself works fine in a server component.
 */
export function Nav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-20 flex shrink-0 items-center justify-between border-b border-white/10 bg-black/30 px-6 py-3 backdrop-blur-md">
      <div className="flex items-baseline gap-3">
        <Link href="/" className="text-sm font-semibold tracking-tight text-zinc-50 hover:underline focus:outline-none focus:ring-2 focus:ring-violet-400">
          R3F <span className="text-violet-400">v10</span>
        </Link>
   
        <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-2 py-0.5 font-mono text-[10px] text-violet-300">
          next
        </span>

        <nav className="flex items-center gap-1 pl-2">
          {ROUTES.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`rounded-md px-2.5 py-1.5 font-mono text-xs transition-colors hover:bg-white/5 hover:text-zinc-50 ${
                pathname === route.href ? 'bg-white/5 text-zinc-50' : 'text-zinc-400'
              }`}
            >
              /{route.label}
            </Link>
          ))}
        </nav>
      </div>

      <nav className="flex items-center gap-1">
        {EXTERNAL.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-mono text-xs text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-50"
          >
            <GitHubIcon className="size-3.5" />
            <span className="hidden sm:inline">{link.label}</span>
          </a>
        ))}
      </nav>
    </header>
  )
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}
