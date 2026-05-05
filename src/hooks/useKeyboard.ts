import { useEffect, useRef } from 'react'

export function useKeyboard() {
  const keys = useRef<Set<string>>(new Set())

  useEffect(() => {
    const down = (e: KeyboardEvent) => keys.current.add(e.key)
    const up = (e: KeyboardEvent) => keys.current.delete(e.key)
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [])

  return keys
}