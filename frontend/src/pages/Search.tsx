"use client"

import { useState } from "react"
import { usePlayerStore } from "@/store/player-store"
import type { Song } from "@/types"

export default function Search() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Song[]>([])
  const [loading, setLoading] = useState(false)

  const { setSong, addToQueue } = usePlayerStore()

  const searchSongs = async () => {
    if (!query) return
    setLoading(true)
    setResults([])

    try {
      const res = await fetch(`http://127.0.0.1:5000/api/search?song=${encodeURIComponent(query)}`)
      const data = await res.json()
      if (data.stream_url) {
        setResults([data])
      } else {
        setResults([])
      }
    } catch {
      console.error("Backend error")
    }
    setLoading(false)
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8 mt-2">
        <div className="flex-1 flex items-center bg-white/60 backdrop-blur-md shadow-sm border border-white/80 rounded-full px-5 py-2.5 focus-within:bg-white transition-all">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-400 mr-2 shrink-0" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchSongs()}
            placeholder="Search for any song..."
            className="bg-transparent border-none outline-none w-full text-sm font-semibold placeholder-slate-400 text-slate-800"
          />
        </div>
        <button onClick={searchSongs} className="px-6 py-2.5 bg-indigo-500 text-white rounded-full font-bold text-sm shadow-sm hover:bg-indigo-600 transition-colors">
          Search
        </button>
      </div>

      {loading && (
        <div className="flex items-center gap-3 text-indigo-600 font-bold mb-6 bg-white/50 backdrop-blur-md p-4 rounded-2xl border border-white/80 shadow-sm w-max">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
          Searching...
        </div>
      )}

      {results.length > 0 && (
        <section>
          <h3 className="text-xl font-bold text-slate-900 mb-4">Results</h3>
          <div className="space-y-2">
            {results.map((song, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-[1.25rem] bg-white/50 backdrop-blur-md border border-white/80 hover:bg-white/80 transition-all group">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <img src={song.thumbnail} alt="" className="w-12 h-12 rounded-xl object-cover shadow-sm shrink-0" />
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm text-slate-900 truncate">{song.title}</h4>
                    <p className="text-xs font-medium text-slate-500 truncate">{song.artist}</p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => setSong(song)} className="w-9 h-9 flex items-center justify-center bg-indigo-500 text-white rounded-full shadow-sm hover:scale-105 transition-transform">
                    <svg width="14" height="14" fill="currentColor" className="ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </button>
                  <button onClick={() => addToQueue(song)} className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-indigo-500 bg-white rounded-full shadow-sm transition-colors" title="Add to queue">
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {!loading && results.length === 0 && query && (
        <div className="text-center py-20 text-slate-400 font-semibold">
          No results found for &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  )
}
