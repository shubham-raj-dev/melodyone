# MelodyOne — Player Context (State Management) UI/UX

## File: `src/context/PlayerContext.tsx`

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    PlayerProvider                     │
│  ┌─────────────────────────────────────────────────┐│
│  │              React Context                       ││
│  │  ┌────────────┐  ┌──────────┐  ┌────────────┐  ││
│  │  │  currentSong│  │  queue   │  │currentIndex │  ││
│  │  │  isPlaying  │  │  Song[]  │  │   number    │  ││
│  │  └────────────┘  └──────────┘  └────────────┘  ││
│  │  ┌────────────┐  ┌──────────┐  ┌────────────┐  ││
│  │  │ currentTime │  │ duration │  │  audioRef  │  ││
│  │  └────────────┘  └──────────┘  └────────────┘  ││
│  └─────────────────────────────────────────────────┘│
│                                                      │
│  ┌─────────────────────────────────────────────────┐│
│  │          <audio ref={audioRef} />                ││
│  │  Events: timeupdate, loadedmetadata, ended       ││
│  └─────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────┘
```

## Exposed Methods

| Method | Description |
|--------|-------------|
| `playSong(song)` | Sets song, adds to queue, plays |
| `togglePlay()` | Play / Pause toggle |
| `playNext()` | Advance to next in queue |
| `playPrevious()` | Go to previous in queue |
| `seek(time)` | Seek to position (seconds) |

## Data Flow

### Play Song
```
User clicks play → playSong(songData)
  ├── Updates currentSong
  ├── Adds to queue (dedup by stream_url)
  ├── Sets audioRef.src = songData.stream_url
  ├── audioRef.play()
  └── Sets isPlaying = true
```

### Time Update
```
<audio> fires timeupdate (every 250ms)
  ├── Updates currentTime state
  └── Components re-render progress bar
```

### Song End
```
<audio> fires ended event
  ├── Calls playNext()
  └── Auto-advances to next song
```

## Queue Behavior

```
Queue: [Song1, Song2, Song3, Song4, Song5]
               ↑
         currentIndex = 2
         
playPrevious → currentIndex = 1
playNext     → currentIndex = 3
```

- Duplicate prevention: `prevQueue.findIndex(s => s.stream_url === songData.stream_url)`
- If duplicate found at index ≠ currentIndex → jump to that index
- If duplicate is current song → do nothing
- Functional `setQueue` to avoid stale closures

## Edge Cases

| Scenario | Behavior |
|----------|----------|
| Empty queue | playNext/playPrevious disabled |
| Single song | Both prev/next disabled |
| End of queue | Next disabled, ended → stops |
| Start of queue | Prev disabled |
| No currentSong | All controls disabled, audio src cleared |
| duration=0 | Range slider max=100, seek has no effect |
| Rapid playSong calls | Each call overwrites audioRef.src |
| Browser autoplay policy | `audioRef.play()` may fail silently (user must interact first) |