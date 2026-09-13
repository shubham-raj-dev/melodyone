# MelodyOne — Mobile Bottom Player UI/UX

## File: `src/components/MobileBottomPlayer.tsx`

## Visible Only on Mobile (<1024px)

```
┌──────────────────────────────────────────────┐
│ ═══════════ indigo progress line (2px) ══════ │
│                                              │
│  ┌────┐  Title Here...   ♥  ◄  ▶  ⏸  ►     │
│  │    │  Artist Name...                      │
│  └────┘                                      │
│  40x40                                       │
│  thumbnail                                   │
└──────────────────────────────────────────────┘
```

- Width: 100% (full screen width)
- Background: `bg-white/95 backdrop-blur-xl`
- Border: `border-t border-slate-200`
- Z-index: `z-[70]` (above Clerk badge)

## Layout

### Progress Line (top edge)
- Height: 2px
- Track: `bg-slate-200`
- Fill: `bg-indigo-500` with `transition-all duration-300`
- Width: `(currentTime / duration) * 100%`

### Thumbnail + Text (left side)
- Thumbnail: `w-10 h-10 rounded-lg object-cover shadow-sm shrink-0`
- Title: `text-sm font-bold text-slate-900 truncate`
- Artist: `text-[11px] font-medium text-slate-500 truncate`
- Container: `flex items-center gap-3 overflow-hidden flex-1`

### Controls (right side)
- `flex items-center gap-3 md:gap-4 shrink-0`
- **Like:** `text-xl`, red when liked (♥), slate-400 when not (♡)
- **Previous:** SVG icon, `text-slate-400 hover:text-indigo-500`
- **Play/Pause:** `w-10 h-10 bg-indigo-500 rounded-full shadow-md`
- **Next:** SVG icon, `text-slate-400 hover:text-indigo-500`

## States

| State | Behavior |
|-------|----------|
| **No song** | `return null` (completely hidden) |
| **Playing** | Pause icon, progress line animating |
| **Paused** | Play icon, progress line static |
| **Liked** | Red heart (♥) |
| **Not liked** | Outline heart (♡) |

## Edge Cases
- Long titles: truncated with `truncate` class
- No thumbnail: shows broken image (no fallback — future improvement)
- Progress when duration=0: progress bar stays at 0%