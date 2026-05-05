import * as React from 'react'
import { useGameStore } from '../store/gameStore'
import PlazaScene from './PlazaScene'

const OfficeScene = () => (
  <div className="w-screen h-screen bg-gray-900 flex items-center justify-center">
    <div className="text-white text-2xl">💼 Office — coming soon</div>
    <button
      className="absolute top-4 left-4 text-white underline"
      onClick={() => useGameStore.getState().setRoom('plaza')}
    >
      ← Back to Plaza
    </button>
  </div>
)

export default function SceneManager() {
  const currentRoom = useGameStore((s) => s.currentRoom)

  const scenes: Record<string, React.ReactElement> = {
    plaza: <PlazaScene />,
    office: <OfficeScene />,
  }

  return (
    <div className="w-screen h-screen bg-gray-900">
      {scenes[currentRoom] ?? <PlazaScene />}
    </div>
  )
}