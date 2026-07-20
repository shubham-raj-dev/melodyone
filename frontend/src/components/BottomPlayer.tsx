"use client"

import { usePlayer } from "@/context/PlayerContext"

export default function BottomPlayer() {
  const { currentSong, isPlaying, togglePlay } = usePlayer()

  return (
    <div className="h-[90px] w-full bg-white/60 backdrop-blur-[40px] border-t border-white/80 shadow-[0_-10px_30px_rgba(0,0,0,0.02)] flex items-center justify-between px-8 z-50">
      <div className="flex items-center gap-4 w-1/4">
        <div className="w-14 h-14 bg-gray-200 rounded-xl overflow-hidden shadow-sm flex items-center justify-center">
          {currentSong?.thumbnail ? (
            <img src={currentSong.thumbnail} alt="cover" className="w-full h-full object-cover" />
          ) : (
            <span className="text-xl">🎵</span>
          )}
        </div>
        <div className="overflow-hidden">
          <h4 className="font-bold text-slate-900 truncate">{currentSong ? currentSong.title : "Not Playing"}</h4>
          <p className="text-xs text-slate-500 font-medium truncate">{currentSong ? currentSong.artist : "Select a track"}</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-2/4 max-w-[500px]">
        <div className="flex items-center gap-6 mb-2">
          <button className="text-slate-600 hover:text-indigo-600"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg></button>

          <button
            onClick={togglePlay}
            disabled={!currentSong}
            className={`w-10 h-10 flex items-center justify-center bg-indigo-500 rounded-full text-white ${currentSong ? "hover:scale-105 transition-transform cursor-pointer" : "opacity-50 cursor-not-allowed"}`}
          >
            {isPlaying ? (
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
            ) : (
              <svg width="20" height="20" fill="currentColor" className="ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            )}
          </button>

          <button className="text-slate-600 hover:text-indigo-600"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /><path d="M6 6h2v12H6zm10 0v12h2V6h-2z" transform="translate(4,0)" /></svg></button>
        </div>
        <div className="flex items-center w-full gap-3 text-[10px] font-bold text-slate-400">
          <span>0:00</span>
          <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
            <div className={`h-full bg-indigo-500 rounded-full ${isPlaying ? "w-1/3" : "w-0"} transition-all duration-1000`} />
          </div>
          <span>0:00</span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 w-1/4 text-slate-400" />
    </div>
  )
}
