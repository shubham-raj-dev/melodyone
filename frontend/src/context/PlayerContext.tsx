"use client"

import React, { createContext, useState, useContext, useRef, useEffect, type ReactNode } from 'react'
import type { Song } from '@/types'

interface PlayerContextValue {
  currentSong: Song | null
  isPlaying: boolean
  playSong: (song: Song) => void
  togglePlay: () => void
}

const PlayerContext = createContext<PlayerContextValue | null>(null)

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio()
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const playSong = (songData: Song) => {
    if (!audioRef.current) return
    setCurrentSong(songData)
    audioRef.current.src = songData.stream_url
    audioRef.current.play()
    setIsPlaying(true)
  }

  const togglePlay = () => {
    if (!currentSong || !audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <PlayerContext.Provider value={{ currentSong, isPlaying, playSong, togglePlay }}>
      {children}
    </PlayerContext.Provider>
  )
}

const defaultCtx: PlayerContextValue = {
  currentSong: null,
  isPlaying: false,
  playSong: () => {},
  togglePlay: () => {},
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) return defaultCtx
  return ctx
}
