import { create } from 'zustand'
import type { Song } from '@/types'

interface PlayerState {
  currentSong: Song | null
  isPlaying: boolean
  queue: Song[]
  setSong: (song: Song) => void
  togglePlay: () => void
  setIsPlaying: (playing: boolean) => void
  addToQueue: (song: Song) => void
  removeFromQueue: (index: number) => void
  next: () => void
  prev: () => void
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  setSong: (song) => set({ currentSong: song, isPlaying: true }),
  togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  addToQueue: (song) => set((s) => ({ queue: [...s.queue, song] })),
  removeFromQueue: (index) =>
    set((s) => ({ queue: s.queue.filter((_, i) => i !== index) })),
  next: () => {
    const { queue, currentSong } = get()
    if (queue.length === 0) return
    const [nextSong, ...rest] = queue
    set({
      currentSong: nextSong,
      queue: [...rest, currentSong!].filter(Boolean),
      isPlaying: true,
    })
  },
  prev: () => {
    // Simple restart for now
    const { isPlaying } = get()
    if (isPlaying) {
      // Could add history later
    }
  },
}))
