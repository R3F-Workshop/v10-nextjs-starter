# R3F v10 Next.js Starter

The [v10-starter](https://github.com/R3F-Workshop/v10-starter) scene, ported to the **Next.js 16 App Router** — [react-three-fiber **v10 alpha**](https://github.com/pmndrs/react-three-fiber), [drei v11 alpha](https://github.com/pmndrs/drei), Tailwind v4, and [Leva](https://github.com/pmndrs/leva), plus two DOM-only routes so you can see how the canvas behaves across navigation.

```bash
npm install
npm run dev
```

## Routes

| Route | What it is |
| --- | --- |
| `/` | The 3D scene — cubes, pyramid, Suzanne. Client-only. |
| `/about` | How the port works: the client boundary, why no SSR, how the canvas gets its height. |
| `/notes` | The v10 / v11 alpha rough edges we hit. |

The nav lives in the root layout, so it is shared by all three and survives navigation.

## Project tour

```
app/
├── layout.tsx                 # <html>/<body>, shared <Nav>, flex column
├── page.tsx                   # server component → <SceneCanvas>
├── about/page.tsx             # DOM only
├── notes/page.tsx             # DOM only
└── globals.css                # Tailwind v4 (@import 'tailwindcss')
components/
├── SceneCanvas.tsx            # 'use client' — dynamic({ ssr: false }) boundary
├── Experience.tsx             # the <Canvas>, fog, Leva background control
├── site/                      # Nav (usePathname active state), PageShell
├── stage/                     # CameraRig, Lights, Floor
├── content/                   # LogoCubes, Cube, Pyramid, Suzi
└── overlay/                   # Footer, PmndrsMark (DOM, Tailwind)
public/models/                 # suzimatholder.glb, loaded by drei's useGLTF
```

## What's different from the Vite starter

Everything inside `<Canvas>` is byte-for-byte the same. Three things had to change:

1. **The canvas is client-only, behind a wrapper.** `app/page.tsx` is a server component; it renders `<SceneCanvas>`, a client component that pulls in `<Experience>` with `next/dynamic` and `ssr: false`. That flag is only legal inside a client component — hence the wrapper. `three/webgpu` reaches for browser globals when the module is evaluated, so a server render throws before the canvas ever mounts.
2. **Only the boundary needs `'use client'`.** Everything below `Experience` — stage, content, the TSL hooks — is in the client graph automatically. No directive needed per file.
3. **Height comes from flexbox, not `height: 100%`.** The Vite app sets `html, body, #root { height: 100% }` and hides overflow. Here the body is a flex column, `<main>` is `flex-1 min-h-0`, and the home route stretches into it — so the content routes can scroll normally.

Leva gets the same `ssr: false` treatment, and is mounted on the home route only.

**The canvas unmounts when you navigate away.** Hover state, accent clicks, and camera position all reset when you come back to `/`. Keeping the scene alive across routes means hoisting one `<Canvas>` into the layout and tunnelling page content into it (`tunnel-rat`) — deliberately not done here.

## Stack

| Package | Version | Notes |
| --- | --- | --- |
| `next` | `16.3.3` | App Router, Turbopack |
| `@react-three/fiber` | `10.0.0-alpha.4` | pinned — alpha |
| `@react-three/drei` | `11.0.0-alpha.5` | pinned — alpha |
| `three` | `^0.185` | v10 requires ≥ 0.185 |
| `react` | `19.2` | v10 requires 19.x |
| `leva` | `^0.10` | control panel |
| `tailwindcss` | 4 | via `@tailwindcss/postcss` |

## The v10 headline: TSL uniforms with `useUniforms` + `useLocalNodes`

[Cube.tsx](components/content/Cube.tsx) is the demo:

```
useControls (Leva) ──► useUniforms('cubes' scope) ──► useLocalNodes ──► meshStandardNodeMaterial
```

- `useUniforms({ uBaseColor, uHoverColor }, 'cubes')` puts shared `UniformNode`s in the R3F store. All six cubes call it with the same scope — the first creates the nodes, the rest get the **same instances** back, and a Leva change is written onto the existing node. The shader never recompiles.
- Per-cube uniforms (`uniform(0)` from `three/tsl`) drive the hover mix, animated in `useFrame` with `MathUtils.damp`. They live in a plain `useMemo(…, [])` because they hold mutable state that must survive a graph rebuild.
- `useLocalNodes(creator)` builds the node graph from the store's uniforms. Its deps are the store's uniforms/nodes/textures **plus the HMR version**, so editing the TSL hot-reloads the material instead of leaving it stale until a remount.

See [/notes](app/notes/page.tsx) for the gotchas — including why the creator needs `useCallback`.

## Things to try

- Give `/about` or `/notes` a small canvas of its own and watch two renderers coexist
- Hoist the `<Canvas>` into `app/layout.tsx` with `tunnel-rat` so the scene persists across routes
- Change the `PATTERN` grid in [LogoCubes.tsx](components/content/LogoCubes.tsx)
- Extend the cube node graph — try `positionNode` for a TSL vertex wobble
