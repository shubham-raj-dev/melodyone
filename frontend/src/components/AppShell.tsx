"use client"

import Sidebar from "@/components/Sidebar"
import NowPlaying from "@/components/NowPlaying"
import BottomPlayer from "@/components/BottomPlayer"

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-screen w-full font-sans text-slate-800 overflow-hidden flex flex-col">
      <div className="flex flex-1 overflow-hidden h-[calc(100vh-90px)] p-4 gap-4">
        <Sidebar />

        <main className="flex-1 h-full overflow-y-auto px-4 z-10 custom-scrollbar">
          {children}
        </main>

        <NowPlaying />
      </div>

      <BottomPlayer />
    </div>
  )
}
