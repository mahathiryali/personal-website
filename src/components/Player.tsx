import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useKeyboard } from '../hooks/useKeyboard'

const SPEED = 5

interface PlayerProps {
  onPositionChange: (pos: { x: number; y: number }) => void
}

export default function Player({ onPositionChange }: PlayerProps) {
  const ref = useRef<THREE.Mesh>(null)
  const keys = useKeyboard()

  useFrame((_, delta) => {
    if (!ref.current) return

    const dx =
      (keys.current.has('ArrowRight') || keys.current.has('d') ? 1 : 0) -
      (keys.current.has('ArrowLeft') || keys.current.has('a') ? 1 : 0)

    ref.current.position.x += dx * SPEED * delta
    // clamp so player can't walk off screen
    ref.current.position.x = THREE.MathUtils.clamp(ref.current.position.x, -8, 8)

    onPositionChange({
      x: ref.current.position.x,
      y: ref.current.position.y,
    })
  })

  return (
    <mesh ref={ref} position={[0, -1, 0]}>
      {/* Body */}
      <boxGeometry args={[0.6, 1, 0.3]} />
      <meshStandardMaterial color="#3b82f6" />
    </mesh>
  )
}