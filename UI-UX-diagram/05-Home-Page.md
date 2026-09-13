# MelodyOne — Home Page UI/UX

## File: `src/pages/Home.tsx`

## Full Page Layout

```
┌──────────────────────────────────────────────┐
│  Good Morning, Shubham ✨                    │
│  Let the music heal your soul                │
│                                    🔍 Search │
│                                              │
│  ┌── Search Result (conditional) ──────┐     │
│  │  🖼️ Song Title                ▶️    │     │
│  │     Artist Name                      │     │
│  └────────────────────────────────────────┘    │
│                                              │
│  Trending Now                                │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐       │
│  │      │ │      │ │      │ │      │        │
│  │ Title│ │ Title│ │ Title│ │ Title│        │
│  │Artist│ │Artist│ │Artist│ │Artist│        │
│  └──────┘ └──────┘ └──────┘ └──────┘        │
└──────────────────────────────────────────────┘
```

## Header Section

```
┌──────────────────────────────────────────────┐
│  Good Morning, {firstName} ✨    🔍 Search.. │
│  Let the music heal your soul               │
└──────────────────────────────────────────────┘
```

### Desktop
- `flex-row items-center justify-between`
- Title left, search bar right
- `pt-2` (minimal top padding)

### Mobile
- `flex-col`
- Title on top, search bar below (full width)
- `pt-14` (clears hamburger button)
- Search: `w-full md:w-80`

## Search Bar
- `bg-white/60 backdrop-blur-md border border-white/80 rounded-full`
- Glass effect, `focus-within:bg-white`
- Placeholder: "Search songs... (Press Enter)"
- Enter key triggers `/api/search?song=QUERY`

## Search Result Card (conditional)
```
┌──────────────────────────────────────────────┐
│  🖼️  Song Title                       ▶️    │
│      Artist Name                             │
└──────────────────────────────────────────────┘
```
- `bg-white/40 backdrop-blur-md border border-white/60 rounded-[1.5rem]`
- Thumbnail: `w-16 h-16 rounded-xl object-cover shadow-md`
- Play button: `w-12 h-12 bg-indigo-500 rounded-full shadow-md`
- Only visible when `searchedSong !== null`

## Trending Section

### Desktop (≥1024px)
```
┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│ 🖼️   │ │ 🖼️   │ │ 🖼️   │ │ 🖼️   │
│ Title│ │ Title│ │ Title│ │ Title│
│Artist│ │Artist│ │Artist│ │Artist│
└──────┘ └──────┘ └──────┘ └──────┘
```
- `grid-cols-4 gap-4`

### Tablet (768-1023px)
- `grid-cols-2 gap-4`

### Mobile (<768px)
- `grid-cols-1 gap-4`

### Card Design
- Height: `h-48`
- Cover image: `absolute inset-0 w-full h-full object-cover`
- Hover: `group-hover:scale-110 transition-transform duration-500`
- Gradient overlay: `bg-gradient-to-t from-black/80 via-black/20 to-transparent`
- Text: white title + white/70 artist, bottom-left
- Play icon: white circle, `opacity-0 group-hover:opacity-100`, bottom-right

## States

| State | UI |
|-------|-----|
| **Initial load** | Trending loading: "Loading global charts..." |
| **Trending loaded** | 4 cards with cover images |
| **Trending error** | Fallback data from backend (Starboy, Shape of You, Blinding Lights) |
| **Search loading** | Spinner: "Searching..." |
| **Search result** | Single card with play button |
| **Search not found** | `alert(data.error)` |
| **Before search** | Search bar only, no result card |
| **Mobile header** | Stacked layout with pt-14 |
| **Not logged in** | Shows "Guest" in greeting |

## API Calls
- `GET /api/trending` — on mount
- `GET /api/search?song=QUERY` — on Enter key
- `GET /api/search?song=TRACK_TITLE+ARTIST` — on trending card click (to get stream_url)