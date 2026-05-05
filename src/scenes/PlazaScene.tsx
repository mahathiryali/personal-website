import { useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import Player from '../components/Player'
import Building from '../components/Building'
import { useGameStore } from '../store/gameStore'
import { useEffect } from 'react'

const BUILDINGS = [
  { name: 'Office', roomId: 'office', position: [-6, 0, 0] as [number, number, number], color: '#4f46e5' },
  { name: 'Theater', roomId: 'theater', position: [-2, 0, 0] as [number, number, number], color: '#dc2626' },
  { name: 'School', roomId: 'school', position: [2, 0, 0] as [number, number, number], color: '#16a34a' },
  { name: 'Research Lab', roomId: 'lab', position: [6, 0, 0] as [number, number, number], color: '#0891b2' },
]

function Scene() {
  const [playerX, setPlayerX] = useState(0)
  const setRoom = useGameStore((s) => s.setRoom)

  const handlePositionChange = useCallback((pos: { x: number; y: number }) => {
    setPlayerX(pos.x)
  }, [])

  // E key to enter building
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'e' && e.key !== 'E') return
      const nearby = BUILDINGS.find((b) => Math.abs(playerX - b.position[0]) < 2)
      if (nearby) setRoom(nearby.roomId as any)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [playerX, setRoom])

  return (
    <>
      <OrthographicCamera makeDefault position={[playerX, 0, 10]} zoom={80} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Ground */}
      <mesh position={[0, -1.8, 0]}>
        <boxGeometry args={[40, 0.3, 1]} />
        <meshStandardMaterial color="#374151" />
      </mesh>

      {/* Sky */}
      <mesh position={[0, 3, -1]}>
        <boxGeometry args={[40, 8, 0.1]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>

      <Player onPositionChange={handlePositionChange} />

      {BUILDINGS.map((b) => (
        <Building key={b.roomId} {...b} playerX={playerX} />
      ))}
    </>
  )
}

export default function PlazaScene() {
  return (
    <div className="w-screen h-screen">
      <Canvas>
        <Scene />
      </Canvas>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm opacity-60">
        ← → to move • E to enter
      </div>
    </div>
  )
}