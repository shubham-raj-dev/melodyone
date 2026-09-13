# MelodyOne — Bottom Player (Desktop) UI/UX

## File: `src/components/BottomPlayer.tsx`

## Visible on Desktop (≥1024px)

Currently: Hidden via `lg:hidden` in AppShell — the desktop uses RightSidebar for controls.

This component exists but is **only used on mobile** via `MobileBottomPlayer.tsx`.

## Layout (if shown)

```
┌──────────────────────────────────────────────────────────┐
│  ┌──────┐  Song Title                    ◄  ⏸  ►       │
│  │ 🖼️  │  Artist Name        0:00 ──●── 4:12           │
│  └──────┘                                                │
│                                                        │
└──────────────────────────────────────────────────────────┘
```

Height: 90px

## Components

### Left Section (25%)
- Thumbnail: `w-14 h-14 bg-gray-200 rounded-xl`
- Default: emoji "🎵" when no thumbnail
- Title: `font-bold text-slate-900 truncate`
- Artist: `text-xs text-slate-500 font-medium truncate`

### Center Section (50%, max 500px)
- Controls: Previous | Play/Pause | Next
- Play/Pause: `w-10 h-10 bg-indigo-500 rounded-full text-white`
- Progress: `flex items-center w-full gap-3`
- Time format: `"M:SS"`
- Range input: `flex-1 h-1.5 bg-slate-200 rounded-full accent-indigo-500`

### Right Section (25%)
- Empty placeholder: `text-slate-400`
- Reserved for future: volume, shuffle, repeat

## States

| State | UI |
|-------|-----|
| **No song** | "Not Playing" / "Select a track", play button disabled |
| **Playing** | Pause icon, pulsing progress |
| **Paused** | Play icon, static progress |

## Edge Cases
- Title overflow: `truncate`
- Artist overflow: `truncate`
- duration=0: range slider max=100, progress stuck at 0
- currentIndex=0: prev disabled (`text-slate-300 cursor-not-allowed`)
- currentIndex=last: next disabled