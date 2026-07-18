# MelodyOne — UI/UX Design Brief for Google Stitch

## Project Overview

**MelodyOne** is a premium music streaming web app. Users search YouTube tracks, stream high-quality audio, build playlists, chat with AI, and subscribe for premium features. The visual identity is Liquid Glass — frosted glass panels, deep blurs, purple-blue gradients, and a floating atmospheric background.

---

## Design System

### Color Palette (Tailwind Defaults Only)

- **Primary:** purple-600 (#9333EA), purple-500 (#A855F7)
- **Secondary:** blue-500 (#3B82F6), blue-600 (#2563EB)
- **Surface/Glass:** white/10 → white/30 with backdrop-blur
- **Text:** slate-900 (#0F172A) for headings, slate-700 for body
- **Accent:** Gradient from purple-500 to blue-600
- **Borders:** Directional light/dark borders for 3D glass effect (top/left = lighter, bottom/right = darker)

### Typography

- **Font:** Inter (system font stack fallback)
- **Headings:** Font-black (900), tracking-tight, drop-shadow-sm
- **Body:** Font-semibold (600), text-slate-700/800/900
- **Scale:** text-xs (12px) → text-3xl (30px)

### Glass Morphism Tokens

```
backdrop-blur-[40px] backdrop-blur-[50px]
bg-white/10 bg-white/20 bg-white/30
border-t border-l border-white/60  → light edge
border-b border-r border-white/10  → dark edge
shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]
ring-1 ring-white/20 ring-white/30
```

### Components

```
GlassCard    → rounded-[2rem], glass bg, directional border
GlassButton  → rounded-full, purple gradient or glass style
InputField   → rounded-full, glass bg, shadow inset
Navbar       → glass header, centered search bar
PlayerPanel  → right sidebar with album art + controls
GridCard     → song card with hover play overlay
```

---

## Layout Structure

```
┌─────────────────────────────────────────────────────┐
│  NAVBAR: Logo | Centered Search Bar | Profile Avatar │
├──────────────────────────────┬──────────────────────┤
│                              │                      │
│  LEFT PANEL (Feed)           │  RIGHT PANEL         │
│  ┌─────────────────────┐    │  ┌────────────────┐  │
│  │ Filter Tabs (All,   │    │  │ Album Art      │  │
│  │ Music, Podcasts)    │    │  │ (w-40 h-40)    │  │
│  ├─────────────────────┤    │  ├────────────────┤  │
│  │                     │    │  │ Track Title    │  │
│  │ Trending Grid       │    │  │ Artist Name    │  │
│  │ ┌───┬───┬───┬───┐  │    │  ├────────────────┤  │
│  │ │ C │ C │ C │ C │  │    │  │ Controls:      │  │
│  │ │ a │ a │ a │ a │  │    │  │ ◄⏸► (Prev/   │  │
│  │ │ r │ r │ r │ r │  │    │  │ Play/Next)     │  │
│  │ │ d │ d │ d │ d │  │    │  ├────────────────┤  │
│  │ └───┴───┴───┴───┘  │    │  │ Up Next Queue  │  │
│  │                     │    │  │ ┌─1. Raabta──┐ │  │
│  │ Made For You Row    │    │  │ └────────────┘ │  │
│  │ ┌────┬────┬────┬──┐│    │  │ ┌─2. Kabira──┐ │  │
│  │ │Mix1│Mix2│Mix3│..││    │  │ └────────────┘ │  │
│  │ └────┴────┴────┴──┘│    │  └────────────────┘  │
│  └─────────────────────┘    └──────────────────────┘
└─────────────────────────────────────────────────────┘
```

---

## Pages & Screens

### 1. Home / Discover Page
- **Header:** Glass navbar with LiquidBeats logo + search bar (40%) + profile avatar
- **Filter tabs:** All | Music | Podcasts (pill buttons, active=white bg)
- **Trending grid:** 4-5 column responsive grid of song cards
  - Each card: cover image (aspect-square), hover play button overlay, title, artist
- **Made for you row:** Gradient cards with mix name + description
- **Loading state:** Pulsing glass card with spinner
- **Empty state:** "Discover New Music" with music note icon

### 2. Search Results
- Search bar focuses on input
- Results appear in the left panel (grid of cards)
- Right panel shows current playing track

### 3. Player Interface
- **Now Playing:** Album art (w-40 h-40 fixed), track title, artist
- **Controls:** Previous (skip back), Play/Pause (gradient circle), Next (skip forward)
- **Queue:** Numbered list below controls
- **Progress bar:** Purple-600 slider (when track is playing)

### 4. Playlist View
- Playlist header with cover, name, track count
- Scrollable track list with reorder handles
- Play all button

### 5. Auth Pages (Clerk)
- Sign In / Sign Up modal or page
- User profile dropdown

### 6. AI Chat Panel (optional)
- Slide-out chat panel from right
- Message bubbles, input field, Groq AI responses

---

## Interactive States

| State | Effect |
|-------|--------|
| Card Hover | hover:-translate-y-2, hover:shadow-xl, bg-white/30 |
| Play Overlay | hidden → visible on group hover, scale in from bottom |
| Button Hover | hover:scale-110 |
| Button Active | active:scale-95 (click press effect) |
| Button Disabled | disabled:opacity-50, pointer-events-none |
| Glass Card Default | bg-white/10, directional border, blur backdrop |
| Loading | animate-pulse glass card with spinner icon |

---

## Micro-Interactions

1. **Play button pop:** On card hover, play button slides up from bottom-right with opacity transition
2. **Glass reflection** (CSS): Subtle white border on top/left surfaces
3. **Search bar focus:** Glass becomes more opaque (bg-white/50)
4. **Vinyl spin** (optional future): Album art rotates when playing
5. **Queue item hover:** Background brightens, text shifts purple

---

## Responsive Breakpoints

| Breakpoint | Layout Change |
|------------|---------------|
| < 768px | Stack panels vertically, grid goes 2 columns |
| 768-1024px | Reduce right panel width, 3 column grid |
| > 1024px | Full layout with 4-5 column grid |

---

## Mood & Atmosphere

- **Background:** Unsplash fluid abstract image (fixed, cover, blend-overlay)
- **Vibe:** Dark but not black — translucent glass overlays on colorful ambient background
- **Feel:** Premium, modern, Spotify-meets-Apple-Music with Indian music soul
- **Animations:** Subtle — pulse on loading, scale on hover, glass blur transitions

---

## Google Stitch Instructions

Copy the sections above into Google Stitch. Key constraints:

1. Use **Tailwind CSS** class names exactly as specified
2. All colors must be from Tailwind's **default palette** (no custom hex codes)
3. Glass cards use `bg-white/10 backdrop-blur-[40px]` pattern
4. Directional borders: `border-t border-l border-white/60 border-b border-r border-white/10`
5. Icons via inline SVG (Heroicons-style)
6. Background image: Unsplash abstract fluid photo
7. Player is right sidebar, feed is main left area
