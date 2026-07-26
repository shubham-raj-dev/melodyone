"use client"

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { usePlayer } from '@/context/PlayerContext';
import type { Song } from '@/types';

function LikedContent() {
  const { user, isSignedIn } = useUser();
  const { playSong } = usePlayer();
  const [likedSongs, setLikedSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSignedIn && user) {
      fetch(`http://127.0.0.1:5000/api/user/liked?clerk_id=${user.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.songs) setLikedSongs(data.songs);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch liked songs:", err);
          setLoading(false);
        });
    } else if (!isSignedIn) {
        setLoading(false);
    }
  }, [isSignedIn, user]);

  const playLikedSong = async (track: Song) => {
    if (track.stream_url) {
      playSong(track);
    } else {
      try {
        const res = await fetch(`http://127.0.0.1:5000/api/search?song=${encodeURIComponent(track.title + ' ' + track.artist)}`);
        const data = await res.json();
        if (data.stream_url) playSong(data);
      } catch (err) {
        console.error("Failed to play liked song:", err);
      }
    }
  };

  return (
    <div className="pb-10">
      <header className="mb-8 pt-14 md:pt-2">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
          <svg width="28" height="28" fill="#ef4444" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          Liked Songs
        </h2>
        <p className="text-slate-500 mt-1 font-medium text-sm">Your personal collection</p>
      </header>

      {loading ? (
        <div className="text-indigo-600 font-bold flex items-center gap-2">
           <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
           Loading your library...
        </div>
      ) : likedSongs.length === 0 ? (
        <div className="p-6 bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 text-slate-500 font-medium shadow-sm">
          You haven&apos;t liked any songs yet. Go find some tracks!
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {likedSongs.map((track, index) => (
            <div
              key={track.videoId || index}
              className="bg-white/40 backdrop-blur-md border border-white/60 rounded-[1.5rem] p-3 flex items-center justify-between shadow-sm hover:bg-white/60 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 relative rounded-xl overflow-hidden shadow-md">
                  <img src={track.thumbnail} alt={track.title} className="w-full h-full object-cover" />
                  <div
                    onClick={() => playLikedSong(track)}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-[2px]"
                  >
                    <svg width="24" height="24" fill="white" className="ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 line-clamp-1">{track.title}</h4>
                  <p className="text-sm font-medium text-slate-500 line-clamp-1">{track.artist}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function LikedPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="pb-10"><header className="mb-8 mt-2"><h2 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3"><svg width="28" height="28" fill="#ef4444" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg> Liked Songs</h2></header></div>;
  return <LikedContent />;
}
