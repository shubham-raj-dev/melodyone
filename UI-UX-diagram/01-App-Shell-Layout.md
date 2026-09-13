# MelodyOne — App Shell Layout UI/UX

## File: `src/components/AppShell.tsx`

## Layout Structure

```
┌──────────────────────────────────────────────────────┐
│  ┌──────────┐  ┌────────────────────┐  ┌──────────┐  │
│  │          │  │                    │  │  RIGHT   │  │
│  │  SIDEBAR │  │    MAIN CONTENT    │  │ SIDEBAR  │  │
│  │ (260px)  │  │   (flex-1, scroll) │  │ (320px)  │  │
│  │          │  │                    │  │          │  │
│  │ Home     │  │  ┌──────────────┐  │  │ ♫ Now   │  │
│  │ Liked ♥  │  │  │   Children   │  │  │ Playing │  │
│  │          │  │  │   (page)     │  │  │         │  │
│  │ ──────── │  │  │              │  │  │ 🎵 Art  │  │
│  │ 👤 User  │  │  │              │  │  │ ⏸ Prev  │  │
│  └──────────┘  │  │              │  │  │   ▶ Next │  │
│                │  └──────────────┘  │  │ 📝 Lyrics│  │
│                │                    │  └──────────┘  │
│  ┌────────────────────────────────────────────────┐  │
│  │           BOTTOM PLAYER (fixed)                │  │
│  │  🎵 Title — Artist    ◄  ▶  ♥  ⏸  ►           │  │
│  └────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

## Responsive Behavior

### Desktop (≥1024px) `lg:`
```
┌──────────┬────────────────────┬──────────┐
│ Sidebar  │     Main Content   │ Right    │
│ 260px    │     flex-1         │ Sidebar  │
│          │                    │ 320px    │
└──────────┴────────────────────┴──────────┘
```
- No bottom player visible
- RightSidebar handles playback controls

### Mobile (<1024px) `lg:hidden`
```
┌──────────────────────────────────────────┐
│  ☰  ┌────────────────────────────┐       │
│     │     Main Content           │       │
│     │     (scrollable)           │       │
│     │                            │       │
│     │                            │       │
├─────┴────────────────────────────┴───────┤
│  🎵 Title — Artist   ♥  ◄  ▶  ⏸  ►     │
│  ──────────────── MobileBottomPlayer ─── │
└──────────────────────────────────────────┘
```
- RightSidebar hidden
- MobileBottomPlayer fixed at bottom (z-[70])
- Hamburger menu replaces sidebar

## Key Classes
- `flex h-screen overflow-hidden`
- Sidebar: `hidden md:block w-[260px] shrink-0`
- Main: `flex-1 overflow-y-auto w-full pb-24 lg:pb-0 p-4 md:p-6`
- RightSidebar: `hidden lg:block w-[320px] shrink-0`
- MobilePlayer: `lg:hidden fixed bottom-0 left-0 right-0 z-[70]`

## States
- **Loading:** Not applicable (pass-through)
- **Empty:** Shows `{children}` directly
- **Error:** Not handled (parent responsibility)