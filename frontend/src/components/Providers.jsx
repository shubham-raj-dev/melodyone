"use client"

import { PlayerProvider } from "@/context/PlayerContext"

export default function Providers({ children }) {
  return <PlayerProvider>{children}</PlayerProvider>
}
