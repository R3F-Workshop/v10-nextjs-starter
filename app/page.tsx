import { SceneCanvas } from '@/app/components/SceneCanvas'
import { Footer } from '@/app/components/overlay/Footer'

export default function Home() {
  return (
    // A server component: the client boundary starts inside <SceneCanvas>
    <div className="relative min-h-0 flex-1">
      <SceneCanvas />
      <Footer />
    </div>
  )
}
