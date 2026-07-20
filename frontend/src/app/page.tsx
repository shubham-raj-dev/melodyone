"use client"

import { useState, useRef, useEffect } from "react"
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
  const [activeTab, setActiveTab] = useState("Home")
  const audioRef = useRef<HTMLAudioElement>(null)

  const { currentSong, isPlaying, queue, setSong, togglePlay, setIsPlaying, addToQueue, next, prev } = usePlayerStore()

  useEffect(() => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false))
    } else {
      audioRef.current.pause()
    }
  }, [currentSong, isPlaying, setIsPlaying])

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

  const handlePlay = (song: Song) => {
    setSong(song)
  }

  const handleAddToQueue = (song: Song) => {
    addToQueue(song)
  }

  const handleNext = () => {
    next()
  }

  const handlePrev = () => {
    prev()
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  return (
    <div className="relative h-screen w-full font-sans text-slate-800 overflow-hidden flex flex-col bg-[#eef2f9]">
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-200/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-fuchsia-100/50 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[20%] left-[30%] w-[40vw] h-[40vw] bg-blue-100/40 rounded-full blur-[100px] pointer-events-none" />

      {currentSong && (
        <audio
          ref={audioRef}
          src={currentSong.stream_url}
          autoPlay
          onEnded={handleNext}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      )}

      <div className="flex flex-1 overflow-hidden h-[calc(100vh-90px)] p-4 gap-4">
        <aside className="w-[260px] bg-white/40 backdrop-blur-[40px] border border-white/60 rounded-[2rem] shadow-[0_8px_32px_rgba(31,38,135,0.05)] flex flex-col p-6 z-10">
          <div className="flex items-center gap-3 mb-8 cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white shadow-md">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" /></svg>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">MelodyOne</h1>
          </div>

          <nav className="flex-1 space-y-1">
            {[
              { name: 'Home', icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg> },
              { name: 'Explore', icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z"/></svg> },
              { name: 'Library', icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"/></svg> },
              { name: 'Playlists', icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"/></svg> },
              { name: 'Artists', icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg> },
              { name: 'Albums', icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"/></svg> }
            ].map((item) => {
              const isActive = activeTab === item.name
              return (
                <div
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all ${
                    isActive
                      ? 'bg-indigo-50 shadow-sm text-indigo-600 font-bold'
                      : 'text-slate-500 font-semibold hover:bg-white/50 hover:text-slate-800'
                  }`}
                >
                  {item.icon}
                  {item.name}
                </div>
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

        <main className="flex-1 h-full overflow-y-auto px-4 z-10 custom-scrollbar">
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
                      <button
                        onClick={() => handlePlay(song)}
                        className="w-9 h-9 flex items-center justify-center bg-indigo-500 text-white rounded-full shadow-sm hover:scale-105 transition-transform"
                      >
                        <svg width="14" height="14" fill="currentColor" className="ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </button>
                      <button
                        onClick={() => handleAddToQueue(song)}
                        className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-indigo-500 bg-white rounded-full shadow-sm transition-colors"
                        title="Add to queue"
                      >
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
        </main>

        <aside className="w-[300px] bg-white/40 backdrop-blur-[40px] border border-white/60 rounded-[2rem] shadow-[0_8px_32px_rgba(31,38,135,0.05)] flex flex-col p-6 z-10">
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
            <button onClick={handlePrev} className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:scale-105 transition-transform text-slate-700"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg></button>
            <button
              onClick={currentSong ? togglePlay : undefined}
              className={`w-14 h-14 flex items-center justify-center bg-indigo-500 rounded-full shadow-[0_8px_15px_rgba(99,102,241,0.3)] text-white transition-transform ${currentSong ? "hover:scale-110 active:scale-95" : "opacity-50"}`}
            >
              {isPlaying ? <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg> : <svg width="24" height="24" fill="currentColor" className="ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>}
            </button>
            <button onClick={handleNext} className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:scale-105 transition-transform text-slate-700"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /><path d="M6 6h2v12H6zm10 0v12h2V6h-2z" transform="translate(4,0)" /></svg></button>
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
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-xl hover:bg-white/50 transition-colors cursor-pointer group" onClick={() => handlePlay(song)}>
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
      </div>

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
            <button onClick={handlePrev} className="text-slate-600 hover:text-indigo-600"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg></button>
            <button onClick={currentSong ? togglePlay : undefined} className={`w-10 h-10 flex items-center justify-center bg-indigo-500 rounded-full text-white hover:scale-105 transition-transform ${currentSong ? "" : "opacity-50"}`}>
              {isPlaying ? <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg> : <svg width="20" height="20" fill="currentColor" className="ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>}
            </button>
            <button onClick={handleNext} className="text-slate-600 hover:text-indigo-600"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /><path d="M6 6h2v12H6zm10 0v12h2V6h-2z" transform="translate(4,0)" /></svg></button>
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
    </div>
  )
}
