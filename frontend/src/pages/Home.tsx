"use client"

import { useState, useEffect } from 'react';
import { usePlayer } from '@/context/PlayerContext';
import type { Song } from '@/types';

export default function Home() {
  const [query, setQuery] = useState('');
  const [searchedSong, setSearchedSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(false);
  const [trending, setTrending] = useState<Song[]>([]);
  const [trendingLoading, setTrendingLoading] = useState(true);

  const { playSong } = usePlayer();

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/trending');
        const data = await response.json();
        if (!data.error) {
          setTrending(data);
        }
      } catch (error) {
        console.error("Failed to fetch trending:", error);
      } finally {
        setTrendingLoading(false);
      }
    };
    fetchTrending();
  }, []);

  const playTrending = async (track: Song) => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/api/search?song=${encodeURIComponent(track.title + ' ' + track.artist)}`);
      const data = await res.json();
      if (data.stream_url) {
        playSong(data);
      }
    } catch (error) {
      console.error("Failed to play trending:", error);
    }
  };

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim() !== '') {
      setLoading(true);
      setSearchedSong(null);
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/search?song=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (data.error) {
          alert(data.error);
        } else {
          setSearchedSong(data);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        alert("Backend se connect nahi ho pa raha hai.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="pb-10">
      <header className="flex items-center justify-between gap-6 mb-8 mt-2">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
            Good Morning, Shubham ✨
          </h2>
          <p className="text-slate-500 mt-1 font-medium text-sm">Let the music heal your soul</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white/60 backdrop-blur-md shadow-sm border border-white/80 rounded-full px-5 py-2.5 w-80 focus-within:bg-white transition-all">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-400 mr-2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search songs... (Press Enter)"
              className="bg-transparent border-none outline-none w-full text-sm font-semibold placeholder-slate-400 text-slate-800"
            />
          </div>
        </div>
      </header>

      {loading && (
        <div className="mb-8 p-4 bg-white/50 backdrop-blur-md rounded-2xl border border-white/80 w-max text-indigo-600 font-bold flex items-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          Searching Deezer API...
        </div>
      )}

      {searchedSong && (
        <section className="mb-8">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Search Result</h3>
          <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-[1.5rem] p-4 flex items-center justify-between shadow-sm hover:bg-white/60 transition-colors">
            <div className="flex items-center gap-4">
              <img src={searchedSong.thumbnail} alt="cover" className="w-16 h-16 rounded-xl object-cover shadow-md" />
              <div>
                <h4 className="font-bold text-lg text-slate-900">{searchedSong.title}</h4>
                <p className="text-sm font-medium text-slate-500">{searchedSong.artist}</p>
              </div>
            </div>

            <button
              onClick={() => playSong(searchedSong)}
              className="w-12 h-12 flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 text-white rounded-full shadow-md transition-all hover:scale-105"
            >
              <svg width="24" height="24" fill="currentColor" className="ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </div>
        </section>
      )}

      <section className="mb-8">
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-xl font-bold text-slate-900">Trending Now</h3>
        </div>

        {trendingLoading ? (
          <div className="text-slate-500 font-medium text-sm">Loading global charts...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trending.map((track, index) => (
              <div
                key={index}
                onClick={() => playTrending(track)}
                className="relative h-48 rounded-[1.5rem] overflow-hidden group shadow-sm cursor-pointer hover:shadow-lg transition-all"
              >
                <img src={track.thumbnail} alt={track.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 w-full flex justify-between items-end gap-3">
                  <div className="overflow-hidden flex-1">
                    <h4 className="text-white text-md font-bold truncate">{track.title}</h4>
                    <p className="text-white/70 text-xs font-medium truncate">{track.artist}</p>
                  </div>
                  <div className="w-8 h-8 shrink-0 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg width="16" height="16" fill="currentColor" className="ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
