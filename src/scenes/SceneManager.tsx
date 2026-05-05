import { useGameStore } from '../store/gameStore'

// Placeholder scenes — you'll build these out in later phases
const PlazaScene = () => <div className="text-white text-2xl">🏙️ Plaza</div>
const OfficeScene = () => <div className="text-white text-2xl">💼 Office</div>

export default function SceneManager() {
  const currentRoom = useGameStore((s) => s.currentRoom)

  const scenes: Record<string, JSX.Element> = {
    plaza: <PlazaScene />,
    office: <OfficeScene />,
    // add more as you build them
  }

  return (
    <div className="w-screen h-screen bg-gray-900 flex items-center justify-center">
      {scenes[currentRoom] ?? <div className="text-white">Room not found</div>}
    </div>
  )
}