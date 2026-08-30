import type { ReactNode } from 'react'

/** Shared chrome for the DOM-only routes — keeps /about and /notes consistent */
export function PageShell({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string
  title: string
  lede: string
  children: ReactNode
}) {
  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-16">
      <p className="font-mono text-xs tracking-widest text-violet-400 uppercase">{eyebrow}</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-50">{title}</h1>
      <p className="mt-4 text-zinc-400">{lede}</p>
      <div className="mt-10 flex flex-col gap-8">{children}</div>
    </article>
  )
}

export function Section({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-mono text-sm text-zinc-300">{heading}</h2>
      <div className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-zinc-400">
        {children}
      </div>
    </section>
  )
}

export function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[13px] text-zinc-200">
      {children}
    </code>
  )
}
