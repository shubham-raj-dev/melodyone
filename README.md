# MelodyOne 🎵

**MelodyOne** is a full-stack music streaming application. Search for songs, discover trending tracks, build a queue, and enjoy seamless audio playback — all wrapped in a soft, icy glassmorphism UI.

> Built for music lovers who want a clean, fast, and reliable streaming experience without premium paywalls.

---

## ✨ Features

- **🔍 Smart Search** — Search any song via iTunes API. Real results with album art and 30-second previews.
- **📈 Trending Charts** — Live top-played charts from Apple Music RSS, updated automatically.
- **🎶 Queue Management** — Add songs to a dynamic queue. Next/Previous navigation with auto-advance.
- **▶️ Persistent Player** — Bottom player bar stays fixed. Music keeps playing across page navigation.
- **📦 Now Playing Panel** — Right sidebar with album art, progress bar, and full playback controls.
- **🎨 Glassmorphism UI** — Soft frosted glass panels, blurred gradients, and smooth animations.
- **📱 PWA Ready** — Installable on mobile/desktop via manifest.json. SEO-optimized with sitemap & robots.
- **🔐 Clerk Auth** — (Coming Soon) Sign-in/Sign-up pages scaffolded. Ready for production keys.
- **📋 Playlists & Favorites** — (Coming Soon) PostgreSQL + Drizzle ORM schema ready. Awaiting DB connection.

---

## 🏗 Architecture

```
melodyone/
├── frontend/          # Next.js 16 (App Router) + TypeScript + Tailwind v4
│   ├── src/
│   │   ├── app/       # Routes: /, /search, /albums, /explore, /library, /artists, /playlists
│   │   ├── components/# Persistent: Sidebar, BottomPlayer, RightSidebar, AudioProvider
│   │   ├── context/   # PlayerContext — global audio state (queue, currentIndex, play/pause)
│   │   ├── pages/     # Page-level components: Home, Search, Albums
│   │   ├── store/     # Zustand store (legacy — being migrated to Context API)
│   │   └── lib/db/    # Drizzle schema (users, playlists, tracks, favorites)
│   └── public/        # Static assets, manifest.json, llms.txt
├── backend/           # Flask + Python
│   ├── run.py         # API endpoints: /api/search, /api/trending, /health
│   ├── engine.py      # yt-dlp audio extraction (fallback)
│   └── requirements.txt
├── docs/              # SPEC, API, ARCHITECTURE, DB_SCHEMA, DEPLOYMENT, etc.
├── skills/            # Agent skills for AI-assisted development
├── agents/            # Reusable agent personas (code-review, security, test)
└── references/        # Checklists: definition-of-done, performance, security, a11y
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Python 3.11+
- npm or yarn

### 1. Backend

```bash
cd backend
pip install -r requirements.txt
python run.py
```

Backend starts at `http://127.0.0.1:5000`

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend starts at `http://localhost:3000`

---

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/search?song=NAME` | GET | Search for a song. Returns title, artist, thumbnail, stream_url |
| `/api/trending` | GET | Fetch top 4 trending songs from Apple Music charts |
| `/health` | GET | Health check with service status |

### Search Response
```json
{
  "title": "Tum Hi Ho",
  "artist": "Arijit Singh",
  "thumbnail": "https://.../600x600bb.jpg",
  "stream_url": "https://audio-ssl.itunes.apple.com/..."
}
```

### Trending Response
```json
[
  {
    "title": "Low Fade",
    "artist": "Karan Aujla & MXRCI",
    "thumbnail": "https://.../600x600bb.jpg",
    "stream_url": ""
  }
]
```

> **Note:** Trending cards search for preview URLs on click via `/api/search`.

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16 (App Router), TypeScript, Tailwind CSS v4 |
| **State** | React Context API (PlayerContext) + Zustand |
| **Auth** | Clerk (scaffolded) |
| **Backend** | Flask 3.0, Flask-CORS, Flask-Limiter |
| **APIs** | iTunes Search API, Apple Music RSS |
| **Database** | PostgreSQL (Neon) + Drizzle ORM (schema ready) |
| **Cache** | Upstash Redis (planned) |
| **Deploy** | Vercel (frontend), Render (backend) |

---

## 📸 UI Preview

```
┌────────────┬────────────────────────────────┬────────────┐
│  Sidebar   │    Main Feed                   │ Now Playing│
│  ───────   │  ┌──┐ ┌──┐ ┌──┐ ┌──┐          │ ┌────────┐ │
│  Home      │  │  │ │  │ │  │ │  │          │ │  Album  │ │
│  Explore   │  └──┘ └──┘ └──┘ └──┘          │ │  Art    │ │
│  Library   │  Trending Now ← Live Data      │ └────────┘ │
│  Playlists │                                │ Title      │
│  Artists   │  ┌──────┐ ┌──────┐             │ Artist     │
│  Albums    │  │      │ │      │             │ ═══░░░░░  │
│            │  └──────┘ └──────┘             │ ▶️ ⏭️      │
│  👤 User   │  Recently Played               │ Queue: 3   │
└────────────┴────────────────────────────────┴────────────┘
└─────────────────────── Bottom Player ───────────────────────┘
```

---

## 📁 Environment Variables

Create `.env.local` in `frontend/`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
DATABASE_URL=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

Create `.env` in `backend/`:

```env
SPOTIPY_CLIENT_ID=
SPOTIPY_CLIENT_SECRET=
```

> Without these keys, the app still works — iTunes API is free and auth-free.

---

## 🧪 Development Notes

- All player state is managed via `PlayerContext` (`src/context/PlayerContext.tsx`)
- The `<audio>` element is managed globally in the context — never unmounts on route change
- Sidebar uses `usePathname()` for active route highlighting (no `react-router-dom` needed)
- Rate limiting: 30 req/min on search, 200 req/day globally (Flask-Limiter)
- Security headers: HSTS, XSS Protection, X-Frame-Options, Permissions-Policy

---

## 📜 License

MIT — Free to use, modify, and distribute.

---

## 👤 Author

**Shubham Raj**  
Full-Stack Developer & Music Enthusiast  
[GitHub](https://github.com/shubham-raj-dev)
