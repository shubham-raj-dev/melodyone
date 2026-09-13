# MelodyOne — Liked Songs Page UI/UX

## File: `src/pages/Liked.tsx`

## Full Page Layout

```
┌──────────────────────────────────────────────┐
│  ❤️ Liked Songs                              │
│  Your personal collection                    │
│                                              │
│  ┌──────────────────────────────────────┐    │
│  │  🖼️  Song Title                 ▶️   │    │
│  │      Artist Name                      │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  ┌──────────────────────────────────────┐    │
│  │  🖼️  Song Title                 ▶️   │    │
│  │      Artist Name                      │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  ┌──────────────────────────────────────┐    │
│  │  🖼️  Song Title                 ▶️   │    │
│  │      Artist Name                      │    │
│  └──────────────────────────────────────┘    │
└──────────────────────────────────────────────┘
```

## Header
- `pt-14 md:pt-2` (mobile padding for hamburger)
- Red heart icon (SVG, `fill="#ef4444"`) + "Liked Songs"
- Subtitle: "Your personal collection" (`text-slate-500 mt-1 font-medium text-sm`)

## Song List

### Card Design
```
┌──────────────────────────────────────────────┐
│  ┌──────────┐  Song Title                    │
│  │  🖼️     │  Artist Name                   │
│  │  40x40  │                                │
│  │  ▶️ on  │                                │
│  │  hover  │                                │
│  └──────────┘                                │
└──────────────────────────────────────────────┘
```
- `bg-white/40 backdrop-blur-md border border-white/60 rounded-[1.5rem]`
- `p-3 flex items-center justify-between`
- Hover: `hover:bg-white/60 transition-colors`

### Thumbnail + Play Overlay
- Container: `w-14 h-14 rounded-xl overflow-hidden shadow-md`
- Image: `w-full h-full object-cover`
- Play overlay: `absolute inset-0 bg-black/40`, `opacity-0 group-hover:opacity-100`
- Play icon: white SVG triangle, `backdrop-blur-[2px]`

### Text
- Title: `font-bold text-slate-900 line-clamp-1`
- Artist: `text-sm font-medium text-slate-500 line-clamp-1`

## Key Behavior
- Key: `track.videoId || index` (falls back to index if no videoId)
- Click play: calls `playLikedSong(track)`
  - If `track.stream_url` exists → play directly
  - Otherwise → `GET /api/search` first, then play

## States

| State | UI |
|-------|-----|
| **Loading** | Animated spinner + "Loading your library..." |
| **Empty** | Glass card: "You haven't liked any songs yet. Go find some tracks!" |
| **Has songs** | List of song cards with play-on-hover |
| **Not signed in** | Shows empty state (no fetch attempted) |
| **Network error** | Falls back to empty array, console.error |

## API Calls
- `GET /api/user/liked?clerk_id=USER_ID` — on mount (only if signed in)
- `GET /api/search?song=TITLE+ARTIST` — on play click (if no stream_url)