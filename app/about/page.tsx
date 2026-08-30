import Link from 'next/link'
import type { Metadata } from 'next'
import { Code, PageShell, Section } from '@/app/components/site/PageShell'

export const metadata: Metadata = {
  title: 'About · R3F v10 Next.js Starter',
}

export default function About() {
  return (
    <PageShell
      eyebrow="about"
      title="The same scene, on the App Router"
      lede="This is the Vite v10 starter ported to Next.js 16. The scene is unchanged — what changes is where the client boundary sits and how the canvas gets its height."
    >
      <Section heading="The client boundary">
        <p>
          <Code>app/page.tsx</Code> is a server component. It renders{' '}
          <Code>&lt;SceneCanvas /&gt;</Code>, a client component whose only job is to pull in{' '}
          <Code>&lt;Experience /&gt;</Code> with <Code>next/dynamic</Code> and{' '}
          <Code>ssr: false</Code>. That flag is only legal inside a client component, which is why
          the wrapper exists at all.
        </p>
        <p>
          Everything below <Code>Experience</Code> — the stage, the cubes, Suzi — is in the client
          graph automatically, so none of those files need their own{' '}
          <Code>&apos;use client&apos;</Code> directive.
        </p>
      </Section>

      <Section heading="Why not server-render it">
        <p>
          <Code>three/webgpu</Code> reaches for browser globals when the module is evaluated, so
          importing it during SSR throws before the canvas ever mounts. There is also nothing to
          gain: the renderer has no output until it has a real <Code>&lt;canvas&gt;</Code>.
        </p>
      </Section>

      <Section heading="Layout">
        <p>
          The nav lives in the root layout, so it is shared by every route and survives navigation.
          The home route stretches the canvas with <Code>flex-1 min-h-0</Code> instead of the Vite
          version&apos;s <Code>height: 100%</Code> chain — the canvas mounts and unmounts with the
          route, which means the scene resets each time you come back to it.
        </p>
        <p>
          Assets are served from <Code>public/</Code>: drei&apos;s <Code>useGLTF</Code> loads{' '}
          <Code>/models/suzimatholder.glb</Code> at runtime, same as before.
        </p>
      </Section>

      <p className="text-sm text-zinc-500">
        The rough edges are collected in{' '}
        <Link href="/notes" className="text-violet-400 underline-offset-4 hover:underline">
          /notes
        </Link>
        , or go back to{' '}
        <Link href="/" className="text-violet-400 underline-offset-4 hover:underline">
          the scene
        </Link>
        .
      </p>
    </PageShell>
  )
}
