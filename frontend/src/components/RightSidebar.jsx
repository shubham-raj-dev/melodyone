import React from 'react';
import { usePlayer } from '../context/PlayerContext';

const RightSidebar = () => {
  const { currentSong, isPlaying, togglePlay, playNext, playPrevious, queue, currentIndex } = usePlayer();

  return (
    <aside className="w-[320px] bg-white/40 backdrop-blur-[40px] border border-white/60 rounded-[2rem] shadow-[0_8px_32px_rgba(31,38,135,0.05)] flex flex-col p-6 z-10 shrink-0">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-slate-900">Now Playing</h3>
        <button className="text-slate-400 hover:text-slate-600">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
        </button>
      </div>

      <div className="w-full aspect-square rounded-[1.5rem] bg-gray-200 mb-6 overflow-hidden shadow-md flex items-center justify-center">
        {currentSong?.thumbnail ? (
          <img src={currentSong.thumbnail} alt="cover" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-300 to-purple-400"></div>
        )}
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="overflow-hidden">
          <h4 className="text-xl font-extrabold text-slate-900 truncate">
            {currentSong ? currentSong.title : "Not Playing"}
          </h4>
          <p className="text-sm font-medium text-slate-500 truncate">
            {currentSong ? currentSong.artist : "Select a track to start"}
          </p>
        </div>
        <button className="text-slate-400 hover:text-indigo-500">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </button>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-2">
          <span>0:00</span>
          <span>0:30</span>
        </div>
        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
          <div className={`h-full bg-indigo-500 rounded-full ${isPlaying ? 'w-1/3' : 'w-0'} transition-all duration-1000`}></div>
        </div>
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
          disabled={currentIndex >= queue.length - 1}
          className={`transition-colors ${currentIndex >= queue.length - 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-400 hover:text-indigo-500'}`}
        >
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/><path d="M6 6h2v12H6zm10 0v12h2V6h-2z" transform="translate(4,0)"/></svg>
        </button>
      </div>

      {/* Visual Debugger: Queue Status */}
      <div className="mb-6 bg-slate-100 rounded-xl p-3 border border-slate-200">
        <div className="flex justify-between items-center mb-2">
           <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Queue Status</h4>
           <span className="text-xs font-bold bg-indigo-200 text-indigo-700 px-2 py-0.5 rounded-full">
             {queue.length} Songs
           </span>
        </div>
        <div className="text-[10px] text-slate-500 font-medium">
           Current Index: {currentIndex}
        </div>
      </div>

      <button className="w-full py-3 bg-white/60 hover:bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 shadow-sm transition-colors flex items-center justify-center gap-2">
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
        Lyrics
      </button>
    </aside>
  );
};

export default RightSidebar;
