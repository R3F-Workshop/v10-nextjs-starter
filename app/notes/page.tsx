import Link from 'next/link'
import type { Metadata } from 'next'
import { Code, PageShell, Section } from '@/components/site/PageShell'

export const metadata: Metadata = {
  title: 'Notes · R3F v10 Next.js Starter',
}

export default function Notes() {
  return (
    <PageShell
      eyebrow="notes"
      title="Alpha rough edges"
      lede="Everything here cost us time at least once. Both alphas move fast, so check the dates on anything you read elsewhere."
    >
      <Section heading="You must pass renderer to <Canvas>">
        <p>
          The bare flag or a config object — either gets you the new{' '}
          <Code>WebGPURenderer</Code> (the WebGL2 fallback is automatic). Without it the alpha
          quietly builds the legacy <Code>WebGLRenderer</Code>, and node materials take it down with
          a cryptic <Code>Cannot read properties of undefined (reading &apos;replace&apos;)</Code>{' '}
          from inside shader compilation.
        </p>
      </Section>

      <Section heading="The TSL hooks live on a separate entry">
        <p>
          <Code>useUniforms</Code> and <Code>useLocalNodes</Code> come from{' '}
          <Code>@react-three/fiber/webgpu</Code>, not the main entry. The two share a React context
          through <Code>globalThis</Code>, so the hooks work inside the regular{' '}
          <Code>&lt;Canvas&gt;</Code> next to drei.
        </p>
      </Section>

      <Section heading="useLocalNodes has the creator in its dep array">
        <p>
          It is a <Code>useMemo</Code> keyed on the store&apos;s uniforms, nodes and textures plus
          the HMR version — which is the point, since the node graph then rebuilds when you edit the
          shader. But an inline arrow is a new identity every render, so wrap the creator in{' '}
          <Code>useCallback</Code> or the graph rebuilds on every render.
        </p>
      </Section>

      <Section heading="Uniforms read back out of the store need a cast">
        <p>
          They come back typed <Code>UniformNode&lt;unknown&gt;</Code>, which three&apos;s TSL
          operators reject. Launder it in one place rather than at every call site.
        </p>
      </Section>

      <Section heading="useFrame state has no clock">
        <p>
          The scheduler moved out into <Code>@pmndrs/scheduler</Code> and timing sits directly on
          the state: <Code>state.elapsed</Code>, <Code>state.delta</Code>, <Code>state.frame</Code>,{' '}
          <Code>state.time</Code>. v10 also renames <Code>state.gl</Code> to{' '}
          <Code>state.renderer</Code>.
        </p>
      </Section>

      <Section heading="drei v11 alpha ships a trimmed export set">
        <p>
          <Code>CameraControls</Code>, <Code>Grid</Code> and <Code>ContactShadows</Code> have not
          landed yet — this starter uses <Code>OrbitControls</Code> (which has{' '}
          <Code>autoRotate</Code> built in) and three&apos;s <Code>gridHelper</Code> instead.
        </p>
      </Section>

      <p className="text-sm text-zinc-500">
        Background on the port is in{' '}
        <Link href="/about" className="text-violet-400 underline-offset-4 hover:underline">
          /about
        </Link>
        .
      </p>
    </PageShell>
  )
}
