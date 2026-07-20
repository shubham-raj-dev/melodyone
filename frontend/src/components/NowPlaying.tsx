"use client"

import { usePlayerStore } from "@/store/player-store"

export default function NowPlaying() {
  const { currentSong, isPlaying, queue, setSong, togglePlay, next, prev } = usePlayerStore()

  return (
    <aside className="w-[300px] bg-white/40 backdrop-blur-[40px] border border-white/60 rounded-[2rem] shadow-[0_8px_32px_rgba(31,38,135,0.05)] flex flex-col p-6 z-10 shrink-0">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-slate-900">Now Playing</h3>
        <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-800 bg-white/50 rounded-full shadow-sm">•••</button>
      </div>

      <div className="w-full aspect-square rounded-[2rem] overflow-hidden shadow-lg mb-6 relative">
        {currentSong?.thumbnail ? (
          <img src={currentSong.thumbnail} alt="" className="w-full h-full object-cover" />
        ) : (
          <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80" alt="" className="w-full h-full object-cover opacity-90" />
        )}
        <div className="absolute top-3 right-3 w-8 h-8 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-white/50 transition-colors shadow-sm text-sm">❤</div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-extrabold text-slate-900 truncate flex items-center justify-between">
          {currentSong ? currentSong.title : "Not Playing"}
          <button className="text-indigo-500 text-sm">❤</button>
        </h2>
        <p className="text-slate-500 font-medium text-sm truncate">{currentSong ? currentSong.artist : "Select a track to start"}</p>
      </div>

      <div className="mb-6">
        <div className="w-full h-1.5 bg-slate-200/60 rounded-full overflow-hidden mb-2">
          <div className={`h-full bg-indigo-500 rounded-full ${isPlaying ? "animate-pulse w-1/3" : "w-0"} transition-all duration-1000`} />
        </div>
        <div className="flex justify-between text-[10px] font-bold text-slate-400">
          <span>{isPlaying ? "1:32" : "0:00"}</span>
          <span>{isPlaying ? "4:12" : "0:00"}</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <button className="text-slate-400 hover:text-indigo-500 transition-colors"><svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" /></svg></button>
        <button onClick={prev} className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:scale-105 transition-transform text-slate-700"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg></button>
        <button
          onClick={currentSong ? togglePlay : undefined}
          className={`w-14 h-14 flex items-center justify-center bg-indigo-500 rounded-full shadow-[0_8px_15px_rgba(99,102,241,0.3)] text-white transition-transform ${currentSong ? "hover:scale-110 active:scale-95" : "opacity-50"}`}
        >
          {isPlaying ? <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg> : <svg width="24" height="24" fill="currentColor" className="ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>}
        </button>
        <button onClick={next} className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:scale-105 transition-transform text-slate-700"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /><path d="M6 6h2v12H6zm10 0v12h2V6h-2z" transform="translate(4,0)" /></svg></button>
        <button className="text-slate-400 hover:text-indigo-500 transition-colors"><svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" /></svg></button>
      </div>

      <button className="w-full py-3 bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl font-bold text-slate-700 shadow-sm hover:bg-white transition-colors flex items-center justify-center gap-2">
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
        Lyrics
      </button>

      {queue.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-bold text-slate-900 mb-3">Queue ({queue.length})</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
            {queue.map((song, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 rounded-xl hover:bg-white/50 transition-colors cursor-pointer group" onClick={() => setSong(song)}>
                <img src={song.thumbnail} alt="" className="w-8 h-8 rounded-lg object-cover shadow-sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800 truncate">{song.title}</p>
                  <p className="text-[10px] text-slate-500 truncate">{song.artist}</p>
                </div>
                <button className="text-slate-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all text-xs">✕</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}
