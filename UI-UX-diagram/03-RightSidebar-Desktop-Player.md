# MelodyOne — RightSidebar (Desktop Player) UI/UX

## File: `src/components/RightSidebar.jsx`

## Visible Only on Desktop (≥1024px)

```
┌──────────────────────────┐
│  Now Playing       ⋮     │
│                          │
│  ┌────────────────────┐  │
│  │                    │  │
│  │    ALBUM ART       │  │
│  │    (square)     ♡  │  │
│  │                    │  │
│  └────────────────────┘  │
│                          │
│  Song Title         ♥/♡ │
│  Artist Name             │
│                          │
│  1:32 ─────●──── 4:12   │
│         [=====○=====]    │
│                          │
│     ◄  ⏹/▶  ►           │
│         (indigo)         │
│                          │
│  🎵 Show Lyrics          │
│  ────────────────────    │
│  Queue Status: 5 Songs   │
│  Current Index: 2        │
└──────────────────────────┘
```

## Components

### Album Art Area
- `w-full aspect-square rounded-[1.5rem]`
- Default: gradient `from-indigo-300 to-purple-400`
- On song: cover image `object-cover`
- Hover heart overlay: top-right, `opacity-0 group-hover:opacity-100`
- Liked: always visible `bg-red-500 text-white`

### Song Info
- Title: `text-xl font-extrabold text-slate-900 truncate`
- Artist: `text-sm font-medium text-slate-500 truncate`
- Heart toggle next to title

### Progress Bar
- Format: `"M:SS"` for both currentTime and duration
- Range input: `h-1.5 bg-slate-200 rounded-full accent-indigo-500`
- `onChange` calls `seek(Number(e.target.value))`

### Playback Controls
- Previous: `text-slate-400`, disabled at index 0
- Play/Pause: `w-14 h-14 bg-indigo-500 rounded-full text-white shadow-lg`
- Next: `text-slate-400`, disabled at end of queue
- All disabled when no currentSong

### Lyrics Toggle
- Button: `w-full py-3 border rounded-xl text-sm font-bold`
- Default: `bg-white/60 border-slate-200 text-slate-700`
- Active (showing): `bg-indigo-500 text-white border-indigo-500`
- On click: replaces album art with scrollable lyrics text
- Loading: animated pulse "Fetching lyrics..."
- Fallback: "Lyrics not found for this track.\n(API limitation)"

### Queue Status Debugger
- `bg-slate-100 rounded-xl p-3`
- Shows: "Queue Status" + song count badge + current index

## States

| State | UI |
|-------|-----|
| **No song playing** | Gradient placeholder, "Not Playing" title, controls disabled |
| **Playing** | Album art, animated progress, playing icon |
| **Lyrics loading** | Pulse animation in art area |
| **Lyrics loaded** | Scrollable pre-formatted text |
| **Lyrics error** | Fallback message text |
| **Song liked** | Red heart (♥) in both places |
| **Song not liked** | Outline heart (♡) in both places |
| **Queue empty** | "0 Songs" badge, next/prev disabled |
| **First song** | Previous button disabled |
| **Last song** | Next button disabled |