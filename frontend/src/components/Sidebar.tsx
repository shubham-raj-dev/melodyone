"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Show, SignInButton, UserButton } from "@clerk/nextjs"

const navItems = [
  {
    name: "Home",
    path: "/",
    icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>,
  },
  {
    name: "Liked Songs",
    path: "/liked",
    icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>,
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-[60] p-2 bg-white/80 backdrop-blur-md rounded-full shadow-md text-slate-800"
      >
        {isOpen ? (
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
        )}
      </button>

      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[40]"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`fixed md:static inset-y-0 left-0 z-[50] w-[260px] bg-white/70 md:bg-white/40 backdrop-blur-xl border-r border-white/60 shadow-[0_8px_32px_rgba(31,38,135,0.05)] flex flex-col p-6 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="flex items-center gap-3 mb-8 mt-8 md:mt-0 cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white shadow-md shrink-0">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" /></svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 truncate">MelodyOne</h1>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path
            return (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all ${
                  isActive
                    ? "bg-indigo-50 shadow-sm text-indigo-600 font-bold"
                    : "text-slate-500 font-semibold hover:bg-white/50 hover:text-slate-800"
                }`}
              >
                {item.icon}
                <span className="truncate">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="mt-4 shrink-0">
          <Show when="signed-in">
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-2 flex items-center justify-between border border-white/80 shadow-sm transition-all hover:bg-white/80">
              <div className="flex items-center gap-3 overflow-hidden">
                <UserButton />
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-bold text-slate-800 truncate">My Account</span>
                  <span className="text-[10px] font-extrabold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full w-max">PREMIUM</span>
                </div>
              </div>
            </div>
          </Show>

          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-sm font-bold shadow-md hover:shadow-lg transition-all text-center truncate">
                Sign In / Sign Up
              </button>
            </SignInButton>
          </Show>
        </div>
      </aside>
    </>
  )
}
