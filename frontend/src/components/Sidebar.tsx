"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

const navItems = [
  {
    name: "Home",
    path: "/",
    icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>,
  },
  {
    name: "Explore",
    path: "/explore",
    icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z"/></svg>,
  },
  {
    name: "Library",
    path: "/library",
    icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"/></svg>,
  },
  {
    name: "Playlists",
    path: "/playlists",
    icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"/></svg>,
  },
  {
    name: "Artists",
    path: "/artists",
    icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>,
  },
  {
    name: "Albums",
    path: "/albums",
    icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"/></svg>,
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-[260px] bg-white/40 backdrop-blur-[40px] border border-white/60 rounded-[2rem] shadow-[0_8px_32px_rgba(31,38,135,0.05)] flex flex-col p-6 z-10 shrink-0">
      <div className="flex items-center gap-3 mb-8 cursor-pointer">
        <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white shadow-md">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" /></svg>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">MelodyOne</h1>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.path
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all ${
                isActive
                  ? "bg-indigo-50 shadow-sm text-indigo-600 font-bold"
                  : "text-slate-500 font-semibold hover:bg-white/50 hover:text-slate-800"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto space-y-4">
        <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-4 shadow-sm border border-white/60 text-center relative overflow-hidden group cursor-pointer">
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className="text-xs font-bold text-indigo-900 mb-2">Let the music<br />heal your soul.</p>
          <span className="text-2xl">🎵</span>
        </div>

        <div className="bg-white/60 border border-white/80 rounded-[1.25rem] p-3 flex items-center gap-3 shadow-sm cursor-pointer hover:bg-white transition-colors">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white shadow-sm">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-slate-800">Shubham Raj</h4>
            <span className="text-[10px] bg-indigo-500 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">Premium</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
