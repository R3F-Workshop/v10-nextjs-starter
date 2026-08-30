'use client'

import dynamic from 'next/dynamic'

/**
 * The whole scene is client-only: `three/webgpu` reaches for browser globals at
 * import time, and there is nothing meaningful to render on the server anyway.
 * `ssr: false` is only allowed inside a client component, which is why this
 * thin wrapper exists between the server page and <Experience>.
 */
const Experience = dynamic(() => import('./Experience'), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center font-mono text-xs text-zinc-600">
      booting renderer…
    </div>
  ),
})

/** Leva reads from window on import, so it gets the same treatment */
const Leva = dynamic(() => import('leva').then((m) => m.Leva), { ssr: false })

export function SceneCanvas() {
  return (
    <>
      <Experience />

      {/* Leva renders into this container (via `fill`) so it clears the nav */}
      <div className="absolute top-4 right-4 z-20 w-72">
        <Leva fill />
      </div>
    </>
  )
}
