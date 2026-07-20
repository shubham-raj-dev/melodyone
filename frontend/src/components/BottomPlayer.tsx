"use client"

import { usePlayerStore } from "@/store/player-store"

export default function BottomPlayer() {
  const { currentSong, isPlaying, togglePlay, next, prev } = usePlayerStore()

  return (
    <div className="h-[90px] w-full bg-white/60 backdrop-blur-[40px] border-t border-white/80 shadow-[0_-10px_30px_rgba(0,0,0,0.02)] flex items-center justify-between px-8 z-50">
      <div className="flex items-center gap-4 w-1/4">
        <img src={currentSong ? currentSong.thumbnail : "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&q=80"} className="w-14 h-14 rounded-xl object-cover shadow-sm" alt="" />
        <div className="overflow-hidden">
          <h4 className="font-bold text-slate-900 truncate">{currentSong ? currentSong.title : "Not Playing"}</h4>
          <p className="text-xs text-slate-500 font-medium truncate">{currentSong ? currentSong.artist : "Select a track"}</p>
        </div>
        <button className="ml-2 text-slate-400 hover:text-indigo-500 text-sm">❤</button>
      </div>

      <div className="flex flex-col items-center justify-center w-2/4 max-w-[500px]">
        <div className="flex items-center gap-6 mb-2">
          <button className="text-slate-400 hover:text-indigo-500"><svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" /></svg></button>
          <button onClick={prev} className="text-slate-600 hover:text-indigo-600"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg></button>
          <button onClick={currentSong ? togglePlay : undefined} className={`w-10 h-10 flex items-center justify-center bg-indigo-500 rounded-full text-white hover:scale-105 transition-transform ${currentSong ? "" : "opacity-50"}`}>
            {isPlaying ? <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg> : <svg width="20" height="20" fill="currentColor" className="ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>}
          </button>
          <button onClick={next} className="text-slate-600 hover:text-indigo-600"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /><path d="M6 6h2v12H6zm10 0v12h2V6h-2z" transform="translate(4,0)" /></svg></button>
          <button className="text-slate-400 hover:text-indigo-500"><svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" /></svg></button>
        </div>
        <div className="flex items-center w-full gap-3 text-[10px] font-bold text-slate-400">
          <span>{isPlaying ? "1:32" : "0:00"}</span>
          <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
            <div className={`h-full bg-indigo-500 rounded-full ${isPlaying ? "animate-pulse w-1/3" : "w-0"} transition-all duration-1000`} />
          </div>
          <span>{isPlaying ? "4:12" : "0:00"}</span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 w-1/4 text-slate-400">
        <button className="hover:text-slate-700"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg></button>
        <button className="hover:text-slate-700"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" /></svg></button>
        <div className="w-20 h-1 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-400 w-2/3 rounded-full" />
        </div>
      </div>
    </div>
  )
}
