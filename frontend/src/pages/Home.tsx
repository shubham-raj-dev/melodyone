"use client"

import { useState } from "react"
import { usePlayerStore } from "@/store/player-store"
import type { Song } from "@/types"

const forYouCards = [
  { title: "Daily Mix", desc: "Your daily favourites", img: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=400&q=80" },
  { title: "Chill Vibes", desc: "50+ Songs", img: "https://images.unsplash.com/photo-1558507652-2d9626c4e67a?auto=format&fit=crop&w=400&q=80" },
  { title: "Love Songs", desc: "70+ Songs", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80" },
  { title: "Lofi Beats", desc: "100+ Songs", img: "https://images.unsplash.com/photo-1536697246787-1f7ae568d89a?auto=format&fit=crop&w=400&q=80" },
]

const recentlyPlayed = [
  { title: "Ranjheya Ve", artist: "B Praak", img: "https://images.unsplash.com/photo-1493225457124-a1a2a5f56468?auto=format&fit=crop&w=300&q=80" },
  { title: "Apna Bana Le", artist: "Arijit Singh", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80" },
  { title: "Iktara", artist: "Amit Trivedi", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=300&q=80" },
  { title: "Kesariya", artist: "Arijit Singh", img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=300&q=80" },
]

const trendingNow = [
  { title: "Kesariya", artist: "Arijit Singh", img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=150&q=80" },
  { title: "Ranjheya Ve", artist: "B Praak", img: "https://images.unsplash.com/photo-1493225457124-a1a2a5f56468?auto=format&fit=crop&w=150&q=80" },
  { title: "Raabta", artist: "Arijit Singh", img: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=150&q=80" },
]

const topArtists = [
  { name: "Arijit Singh", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80" },
  { name: "Atif Aslam", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" },
  { name: "B Praak", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" },
]

export default function Home() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Song[]>([])
  const [loading, setLoading] = useState(false)

  const { setSong, addToQueue } = usePlayerStore()

  const searchSongs = async (searchQuery = query) => {
    if (!searchQuery) return
    setQuery(searchQuery)
    setLoading(true)
    setResults([])

    try {
      const res = await fetch(`http://127.0.0.1:5000/api/search?song=${encodeURIComponent(searchQuery)}`)
      const data = await res.json()
      if (data.stream_url) {
        setResults([data])
      }
    } catch {
      console.error("Backend error")
    }
    setLoading(false)
  }

  return (
    <>
      <header className="flex items-center justify-between gap-6 mb-8 mt-2">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
            Good Morning, Shubham ✨
          </h2>
          <p className="text-slate-500 mt-1 font-medium text-sm">Let the music heal your soul</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex items-center bg-white/60 backdrop-blur-md shadow-sm border border-white/80 rounded-full px-5 py-2.5 w-80 focus-within:bg-white transition-all">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-400 mr-2 shrink-0" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchSongs()}
              placeholder="Search songs, artists, albums..."
              className="bg-transparent border-none outline-none w-full text-sm font-semibold placeholder-slate-400 text-slate-800"
            />
          </div>
          <button className="w-10 h-10 bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm border border-white/80 hover:bg-white transition-colors text-slate-500 text-lg">🔔</button>
          <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm border border-white">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      {loading && (
        <div className="flex items-center gap-3 text-indigo-600 font-bold mb-6 bg-white/50 backdrop-blur-md p-4 rounded-2xl border border-white/80 shadow-sm w-max">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
          Searching for the best stream...
        </div>
      )}

      {results.length > 0 && (
        <section className="mb-8">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Search Results</h3>
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

      <section className="mb-8">
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-xl font-bold text-slate-900">For You</h3>
          <span className="text-xs font-bold text-slate-400 hover:text-indigo-500 cursor-pointer">See All &gt;</span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {forYouCards.map((card, idx) => (
            <div key={idx} className="relative h-40 rounded-[1.5rem] overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow">
              <img src={card.img} alt={card.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                <h4 className="text-white text-lg font-bold drop-shadow-md">{card.title}</h4>
                <p className="text-white/80 text-xs font-medium drop-shadow-md">{card.desc}</p>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 backdrop-blur-md border border-white/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-xl font-bold text-slate-900">Recently Played</h3>
          <span className="text-xs font-bold text-slate-400 hover:text-indigo-500 cursor-pointer">See All &gt;</span>
        </div>
        <div className="grid grid-cols-4 gap-5">
          {recentlyPlayed.map((item, idx) => (
            <div key={idx} onClick={() => searchSongs(item.title)} className="group cursor-pointer">
              <div className="relative rounded-[1.5rem] overflow-hidden shadow-sm mb-3 aspect-square border border-white/40">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute bottom-2 right-2 w-10 h-10 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all shadow-sm">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>
              <h4 className="font-bold text-[15px] text-slate-900 truncate">{item.title}</h4>
              <p className="text-xs font-medium text-slate-500 truncate">{item.artist}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-2 gap-6 pb-6">
        <section className="bg-white/40 backdrop-blur-[30px] border border-white/60 rounded-[2rem] p-5 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Trending Now</h3>
          <div className="space-y-2">
            {trendingNow.map((item, idx) => (
              <div key={idx} onClick={() => searchSongs(item.title)} className="flex items-center justify-between p-2 rounded-[1.25rem] hover:bg-white/60 transition-all cursor-pointer group">
                <div className="flex items-center gap-3">
                  <img src={item.img} alt="" className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">{item.title}</h4>
                    <p className="text-xs font-medium text-slate-500">{item.artist}</p>
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-indigo-500 bg-white rounded-full shadow-sm">
                    <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-700 bg-white rounded-full shadow-sm">•••</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white/40 backdrop-blur-[30px] border border-white/60 rounded-[2rem] p-5 shadow-sm flex flex-col">
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-lg font-bold text-slate-900">Top Artists</h3>
            <span className="text-xs font-bold text-slate-400 hover:text-indigo-500 cursor-pointer">See All &gt;</span>
          </div>
          <div className="flex justify-between flex-1 items-center px-4">
            {topArtists.map((artist, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 cursor-pointer group">
                <div className="w-20 h-20 rounded-full overflow-hidden shadow-sm border-[3px] border-transparent group-hover:border-indigo-100 transition-all">
                  <img src={artist.img} alt={artist.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-xs font-bold text-slate-700">{artist.name}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
