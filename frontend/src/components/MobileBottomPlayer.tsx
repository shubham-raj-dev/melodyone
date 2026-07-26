"use client"

import { useState, useEffect } from 'react';
import { usePlayer } from '@/context/PlayerContext';
import { useUser } from '@clerk/nextjs';

export default function MobileBottomPlayer() {
  const { currentSong, isPlaying, togglePlay, playNext, currentTime, duration } = usePlayer();
  const { user, isSignedIn } = useUser();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (isSignedIn && user && currentSong) {
      fetch(`http://127.0.0.1:5000/api/user/liked?clerk_id=${user.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.songs) {
            setIsLiked(data.songs.some((s: any) => s.videoId === currentSong.videoId));
          }
        })
        .catch(err => console.error(err));
    }
  }, [currentSong, isSignedIn, user]);

  const handleLike = async () => {
    if (!isSignedIn || !user || !currentSong) return;
    try {
      const res = await fetch('http://127.0.0.1:5000/api/user/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clerk_id: user.id,
          song: { videoId: currentSong.videoId, title: currentSong.title, artist: currentSong.artist, thumbnail: currentSong.thumbnail }
        })
      });
      const data = await res.json();
      setIsLiked(data.liked);
    } catch (err) {
      console.error("Like Error:", err);
    }
  };

  if (!currentSong) return null;

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full bg-white/95 backdrop-blur-xl border-t border-slate-200 pb-safe relative">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-slate-200">
        <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="flex items-center justify-between px-4 py-2 gap-3">
        <div className="flex items-center gap-3 overflow-hidden flex-1">
          <img src={currentSong.thumbnail} alt="cover" className="w-10 h-10 rounded-lg object-cover shadow-sm shrink-0" />
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold text-slate-900 truncate">{currentSong.title}</span>
            <span className="text-[11px] font-medium text-slate-500 truncate">{currentSong.artist}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <button onClick={handleLike} className="transition-colors">
            {isLiked ? (
              <span className="text-red-500 text-lg">♥</span>
            ) : (
              <span className="text-slate-400 text-lg">♡</span>
            )}
          </button>

          <button onClick={togglePlay} className="w-10 h-10 flex items-center justify-center bg-indigo-500 text-white rounded-full shadow-md">
            {isPlaying ? (
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            ) : (
              <svg width="18" height="18" fill="currentColor" className="ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>

          <button onClick={playNext} className="text-slate-400 hover:text-indigo-500">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/><path d="M6 6h2v12H6zm10 0v12h2V6h-2z" transform="translate(4,0)"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
