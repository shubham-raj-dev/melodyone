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
    <div className="flex h-screen overflow-hidden bg-[#eef2f9]">
      <Sidebar />

      <main className="flex-1 overflow-y-auto w-full pb-24 lg:pb-0 p-4 md:p-6">
        {children}
      </main>

      <div className="hidden lg:block w-[320px] shrink-0 h-full">
        <RightSidebar />
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[70] bg-white/90 backdrop-blur-xl border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <BottomPlayer />
      </div>
    </div>
  )
}
