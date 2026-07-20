"use client"

import { useRef, useEffect } from "react"
import { usePlayerStore } from "@/store/player-store"

export default function AudioProvider() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const { currentSong, isPlaying, setIsPlaying, next } = usePlayerStore()

  useEffect(() => {
    if (!audioRef.current) return
    if (isPlaying && currentSong) {
      audioRef.current.play().catch(() => setIsPlaying(false))
    } else {
      audioRef.current.pause()
    }
  }, [currentSong, isPlaying, setIsPlaying])

  return currentSong ? (
    <audio
      ref={audioRef}
      src={currentSong.stream_url}
      autoPlay
      onEnded={next}
      onPlay={() => setIsPlaying(true)}
      onPause={() => setIsPlaying(false)}
    />
  ) : null
}
