import { useState } from 'react'
import { Text } from '@react-three/drei'
import { useGameStore } from '../store/gameStore'

interface BuildingProps {
  name: string
  position: [number, number, number]
  color: string
  roomId: string
  playerX: number
}

export default function Building({ name, position, color, roomId, playerX }: BuildingProps) {
  const setRoom = useGameStore((s) => s.setRoom)
  const [hovered, setHovered] = useState(false)

  // player is "near" if within 2 units
  const isNear = Math.abs(playerX - position[0]) < 2

  return (
    <group position={position}>
      {/* Building body */}
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => isNear && setRoom(roomId as any)}
      >
        <boxGeometry args={[2, 2.5, 0.5]} />
        <meshStandardMaterial color={hovered && isNear ? '#ffffff' : color} />
      </mesh>

      {/* Door */}
      <mesh position={[0, -0.6, 0.3]}>
        <boxGeometry args={[0.5, 0.8, 0.1]} />
        <meshStandardMaterial color="#4a2c0a" />
      </mesh>

      {/* Label */}
      <Text
        position={[0, 1.6, 0.3]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>

      {/* Press E prompt */}
      {isNear && (
        <Text
          position={[0, 2.1, 0.3]}
          fontSize={0.2}
          color="#facc15"
          anchorX="center"
          anchorY="middle"
        >
          Press E to enter
        </Text>
      )}
    </group>
  )
}