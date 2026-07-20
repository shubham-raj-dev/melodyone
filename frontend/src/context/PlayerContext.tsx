"use client"

import React, { createContext, useState, useContext, useRef, useEffect, useCallback, type ReactNode } from 'react'
import type { Song } from '@/types'

interface PlayerContextValue {
  currentSong: Song | null
  isPlaying: boolean
  togglePlay: () => void
  playSong: (song: Song) => void
  playNext: () => void
  playPrevious: () => void
  queue: Song[]
  currentIndex: number
}

const PlayerContext = createContext<PlayerContextValue | null>(null)

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [queue, setQueue] = useState<Song[]>([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const currentSong = currentIndex >= 0 && currentIndex < queue.length ? queue[currentIndex] : null

  useEffect(() => {
    audioRef.current = new Audio()
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const playSong = useCallback((songData: Song) => {
    if (!audioRef.current) return
    setQueue((prevQueue) => {
      const existingIndex = prevQueue.findIndex(s => s.stream_url === songData.stream_url)
      if (existingIndex !== -1) {
        setCurrentIndex(existingIndex)
        return prevQueue
      } else {
        const newQueue = [...prevQueue, songData]
        setCurrentIndex(newQueue.length - 1)
        return newQueue
      }
    })
  }, [])

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.stream_url
      audioRef.current.play().catch(err => console.error("Playback Error:", err))
      setIsPlaying(true)
    }
  }, [currentIndex, currentSong])

  const togglePlay = useCallback(() => {
    if (!currentSong || !audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }, [currentSong, isPlaying])

  const playNext = useCallback(() => {
    setCurrentIndex(prev => Math.min(prev + 1, queue.length - 1))
  }, [queue.length])

  const playPrevious = useCallback(() => {
    setCurrentIndex(prev => Math.max(prev - 1, 0))
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleSongEnd = () => {
      if (currentIndex < queue.length - 1) {
        playNext()
      } else {
        setIsPlaying(false)
      }
    }

    audio.addEventListener('ended', handleSongEnd)
    return () => audio.removeEventListener('ended', handleSongEnd)
  }, [currentIndex, queue.length, playNext])

  return (
    <PlayerContext.Provider value={{
      currentSong, isPlaying, togglePlay, playSong,
      playNext, playPrevious, queue, currentIndex
    }}>
      {children}
    </PlayerContext.Provider>
  )
}

const defaultCtx: PlayerContextValue = {
  currentSong: null, isPlaying: false, togglePlay: () => {},
  playSong: () => {}, playNext: () => {}, playPrevious: () => {},
  queue: [], currentIndex: -1,
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) return defaultCtx
  return ctx
}
