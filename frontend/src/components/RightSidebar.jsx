import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { usePlayer } from '../context/PlayerContext';

const formatTime = (time) => {
  if (isNaN(time)) return "0:00";
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const RightSidebar = () => {
  const { user, isSignedIn } = useUser();
  const { currentSong, isPlaying, togglePlay, playNext, playPrevious, queue, currentIndex, currentTime, duration, seek } = usePlayer();

  const [showLyrics, setShowLyrics] = useState(false);
  const [lyrics, setLyrics] = useState(null);
  const [loadingLyrics, setLoadingLyrics] = useState(false);
  const [likedSongs, setLikedSongs] = useState(new Set());

  useEffect(() => {
    if (isSignedIn && user) {
      fetch(`http://127.0.0.1:5000/api/user/liked?clerk_id=${user.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.songs) {
            setLikedSongs(new Set(data.songs.map(s => s.videoId)));
          }
        })
        .catch(() => {});
    }
  }, [isSignedIn, user]);

  const toggleLike = async () => {
    if (!isSignedIn || !user || !currentSong) return;
    try {
      const res = await fetch('http://127.0.0.1:5000/api/user/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clerk_id: user.id,
          song: { videoId: currentSong.videoId, title: currentSong.title, artist: currentSong.artist, thumbnail: currentSong.thumbnail, stream_url: currentSong.stream_url }
        })
      });
      const data = await res.json();
      setLikedSongs(prev => {
        const next = new Set(prev);
        if (data.liked) next.add(currentSong.videoId);
        else next.delete(currentSong.videoId);
        return next;
      });
    } catch (err) {
      console.error("Like Error:", err);
    }
  };

  useEffect(() => {
    setShowLyrics(false);
    setLyrics(null);
  }, [currentSong]);

  const handleLyricsToggle = async () => {
    if (!currentSong) return;

    if (showLyrics) {
      setShowLyrics(false);
      return;
    }

    setShowLyrics(true);

    if (lyrics) return;

    setLoadingLyrics(true);
    try {
      const cleanTitle = currentSong.title.replace(/\([^()]*\)/g, '').trim();
      const cleanArtist = currentSong.artist.split(',')[0].trim();

      const response = await fetch(`http://127.0.0.1:5000/api/lyrics?artist=${encodeURIComponent(cleanArtist)}&title=${encodeURIComponent(cleanTitle)}`);
      const data = await response.json();

      if (data.lyrics) {
        setLyrics(data.lyrics);
      } else {
        setLyrics("Lyrics not found for this track.\n(API limitation)");
      }
    } catch (error) {
      console.error("Lyrics Error:", error);
      setLyrics("Failed to load lyrics.");
    }
    setLoadingLyrics(false);
  };

  return (
    <aside className="w-[320px] bg-white/40 backdrop-blur-[40px] border border-white/60 rounded-[2rem] shadow-[0_8px_32px_rgba(31,38,135,0.05)] flex flex-col p-6 z-10 shrink-0">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-slate-900">Now Playing</h3>
        <button className="text-slate-400 hover:text-slate-600">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
        </button>
      </div>

      <div className="w-full aspect-square rounded-[1.5rem] bg-gray-200 mb-6 overflow-hidden shadow-md relative group">
        {!showLyrics ? (
          <>
            {currentSong?.thumbnail ? (
              <img src={currentSong.thumbnail} alt="cover" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-indigo-300 to-purple-400"></div>
            )}
            <button
              onClick={toggleLike}
              disabled={!currentSong}
              className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-sm transition-all ${
                !currentSong ? 'opacity-0' :
                currentSong && likedSongs.has(currentSong.videoId)
                  ? 'bg-red-500 text-white opacity-100'
                  : 'bg-white/30 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 hover:bg-white/50'
              }`}
            >
              {currentSong && likedSongs.has(currentSong.videoId) ? '♥' : '♡'}
            </button>
          </>
        ) : (
          <div className="w-full h-full overflow-y-auto p-4 bg-white/80 backdrop-blur-md custom-scrollbar flex flex-col items-center">
            {loadingLyrics ? (
              <div className="flex-1 flex items-center justify-center text-sm font-bold text-indigo-500 animate-pulse">
                Fetching lyrics...
              </div>
            ) : (
              <pre className="text-xs font-semibold text-slate-700 whitespace-pre-wrap font-sans text-center leading-relaxed">
                {lyrics}
              </pre>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="overflow-hidden min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-xl font-extrabold text-slate-900 truncate">
              {currentSong ? currentSong.title : "Not Playing"}
            </h4>
            <button
              onClick={toggleLike}
              disabled={!currentSong}
              className={`shrink-0 text-lg transition-colors ${
                !currentSong ? 'opacity-30 cursor-not-allowed' :
                currentSong && likedSongs.has(currentSong.videoId) ? 'text-red-500' : 'text-slate-400 hover:text-red-400'
              }`}
            >
              {currentSong && likedSongs.has(currentSong.videoId) ? '♥' : '♡'}
            </button>
          </div>
          <p className="text-sm font-medium text-slate-500 truncate">
            {currentSong ? currentSong.artist : "Select a track to start"}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={(e) => seek(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-500 block"
        />
      </div>

      <div className="flex items-center justify-center gap-6 mb-8">
        <button
          onClick={playPrevious}
          disabled={currentIndex <= 0}
          className={`transition-colors ${currentIndex <= 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-400 hover:text-indigo-500'}`}
        >
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
        </button>

        <button
          onClick={togglePlay}
          disabled={!currentSong}
          className={`w-14 h-14 flex items-center justify-center bg-indigo-500 rounded-full text-white shadow-lg ${currentSong ? 'hover:scale-105 transition-transform cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
        >
          {isPlaying ? (
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          ) : (
            <svg width="24" height="24" fill="currentColor" className="ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          )}
        </button>

        <button
          onClick={playNext}
          disabled={!queue.length || currentIndex >= queue.length - 1}
          className={`transition-colors ${(!queue.length || currentIndex >= queue.length - 1) ? 'text-slate-300 cursor-not-allowed' : 'text-slate-400 hover:text-indigo-500'}`}
        >
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/><path d="M6 6h2v12H6zm10 0v12h2V6h-2z" transform="translate(4,0)"/></svg>
        </button>
      </div>

      <button
        onClick={handleLyricsToggle}
        disabled={!currentSong}
        className={`w-full py-3 border rounded-xl text-sm font-bold shadow-sm transition-colors flex items-center justify-center gap-2 ${showLyrics ? 'bg-indigo-500 text-white border-indigo-500 hover:bg-indigo-600' : 'bg-white/60 hover:bg-white border-slate-200 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed'}`}
      >
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
        {showLyrics ? 'Hide Lyrics' : 'Show Lyrics'}
      </button>
    </aside>
  );
};

export default RightSidebar;
