import { create } from 'zustand'

type Room = 'plaza' | 'office' | 'theater' | 'school' | 'salon' | 'lab' | 'garage' | 'shop' | 'dance'

interface AvatarConfig {
  hairColor: string
  outfitColor: string
  skinTone: string
  hairStyle: 'short' | 'long' | 'curly'
  accessory: 'none' | 'glasses' | 'hat'
}

interface GameState {
  currentRoom: Room
  playerPos: { x: number; y: number }
  avatarConfig: AvatarConfig
  modalOpen: string | null

  setRoom: (room: Room) => void
  setPlayerPos: (pos: { x: number; y: number }) => void
  setAvatarConfig: (config: Partial<AvatarConfig>) => void
  openModal: (id: string) => void
  closeModal: () => void
}

export const useGameStore = create<GameState>((set) => ({
  currentRoom: 'plaza',
  playerPos: { x: 0, y: 0 },
  avatarConfig: {
    hairColor: '#4a2c0a',
    outfitColor: '#3b82f6',
    skinTone: '#f5cba7',
    hairStyle: 'long',
    accessory: 'none',
  },
  modalOpen: null,

  setRoom: (room) => set({ currentRoom: room }),
  setPlayerPos: (pos) => set({ playerPos: pos }),
  setAvatarConfig: (config) =>
    set((state) => ({ avatarConfig: { ...state.avatarConfig, ...config } })),
  openModal: (id) => set({ modalOpen: id }),
  closeModal: () => set({ modalOpen: null }),
}))