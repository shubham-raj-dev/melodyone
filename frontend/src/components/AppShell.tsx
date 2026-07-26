"use client"

import { useUser } from "@clerk/nextjs"
import { useEffect } from "react"
import Sidebar from "@/components/Sidebar"
import RightSidebar from "@/components/RightSidebar"
import BottomPlayer from "@/components/BottomPlayer"

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { user, isSignedIn } = useUser()

  useEffect(() => {
    if (isSignedIn && user) {
      fetch('http://127.0.0.1:5000/api/user/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clerk_id: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          full_name: user.fullName
        })
      })
      .then(res => res.json())
      .then(data => console.log("Backend Sync Status:", data))
      .catch(err => console.error("Failed to sync user with backend:", err))
    }
  }, [isSignedIn, user])

  return (
    <div className="relative h-screen w-full font-sans text-slate-800 overflow-hidden flex flex-col">
      <div className="flex flex-1 overflow-hidden h-[calc(100vh-90px)] p-4 gap-4">
        <Sidebar />

        <main className="flex-1 h-full overflow-y-auto px-4 z-10 custom-scrollbar">
          {children}
        </main>

        <RightSidebar />
      </div>

      <BottomPlayer />
    </div>
  )
}
