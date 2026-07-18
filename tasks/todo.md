# Task List — MelodyOne

> Ordered by dependency. Each task is one focused session.

---

## Phase 1: Foundation

- [ ] **Task 1.1: Scaffold Next.js + TypeScript project**
  - Create `frontend/` with `create-next-app` (App Router, TypeScript, Tailwind)
  - Configure `tsconfig.json` path aliases (`@/` → `src/`)
  - Acceptance: `npm run dev` starts on port 3000
  - Files: `frontend/package.json`, `frontend/tsconfig.json`, `frontend/next.config.ts`

- [ ] **Task 1.2: Install and configure base dependencies**
  - `npm install drizzle-orm @neondatabase/serverless @upstash/redis zustand @clerk/nextjs @clerk/themes`
  - `npm install -D drizzle-kit dotenv-cli`
  - Acceptance: All packages import without errors
  - Files: `frontend/package.json`

- [ ] **Task 1.3: Set up Neon + Drizzle schema**
  - Create `src/lib/db/index.ts` (Neon connection)
  - Create `src/lib/db/schema.ts` (users, playlists, tracks, favorites, subscriptions, chat_history)
  - Create `drizzle.config.ts`
  - Acceptance: `npm run db:generate` produces SQL
  - Files: `src/lib/db/*`, `drizzle.config.ts`

- [ ] **Task 1.4: Set up Clerk auth**
  - Create `.env.local` with Clerk keys
  - Wrap layout with `<ClerkProvider>`
  - Create sign-in/sign-up pages
  - Create webhook handler at `/api/webhooks/clerk`
  - Acceptance: User can sign up and session persists
  - Files: `src/app/(auth)/*`, `src/app/api/webhooks/clerk/*`

- [ ] **Task 1.5: Set up Tailwind glass theme**
  - Configure `tailwind.config.ts` with glass utility classes
  - Create global CSS with glass morphism primitives
  - Acceptance: Glass card renders in dev
  - Files: `src/app/globals.css`, `tailwind.config.ts`

## Phase 2: Core Streaming

- [ ] **Task 2.1: Refactor Flask backend**
  - Add `/health` endpoint for cronjob.org
  - Add CORS headers for Vercel frontend
  - Ensure `fetch_audio_stream()` returns artist field
  - Acceptance: `GET /api/search?song=pasoori` returns valid stream_url
  - Files: `backend/run.py`, `backend/engine.py`

- [ ] **Task 2.2: Create search API route in Next.js**
  - `src/app/api/search/route.ts` — proxies to Flask backend
  - Add Redis caching layer (check cache first, fallback to Flask)
  - Acceptance: `GET /api/search?song=pasoori` returns response
  - Files: `src/app/api/search/route.ts`

- [ ] **Task 2.3: Build audio player component**
  - Zustand store for player state (currentTrack, isPlaying, queue, volume)
  - `<audio>` element with ref for play/pause/seek
  - Player bar component with play/pause, next, prev buttons
  - Acceptance: Click play → audio streams from Flask
  - Files: `src/store/player-store.ts`, `src/components/player/*`

- [ ] **Task 2.4: Build search UI**
  - Search input with debounce + Enter key
  - Results grid (glass cards with hover play overlay)
  - Loading state with spinner + "Fetching audio stream..."
  - Acceptance: Search "pasoori" → shows result card → click plays
  - Files: `src/components/search/*`, `src/app/page.tsx`

- [ ] **Task 2.5: Build home page with trending grid**
  - Mock data trending cards (clickable → triggers searchAndPlay)
  - "Made for you" section
  - Filter tabs (All, Music, Podcasts)
  - Acceptance: Home page shows rich grid layout
  - Files: `src/app/page.tsx`, `src/components/home/*`

## Phase 3: User Features

- [ ] **Task 3.1: Playlists CRUD**
  - API routes: create, read, update, delete
  - Zustand store for playlist state
  - UI: playlist list, create modal, track management
  - Acceptance: User creates playlist → adds tracks → sees them
  - Files: `src/app/api/playlists/*`, `src/components/playlist/*`

- [ ] **Task 3.2: Favorites**
  - API routes: add, remove, list
  - Heart/favorite button on track cards
  - Zustand store for favorites
  - Acceptance: Click heart → saves to DB → shows in favorites list
  - Files: `src/app/api/favorites/*`, `src/components/favorites/*`

- [ ] **Task 3.3: Queue management**
  - "Add to queue" from search results
  - Up Next panel in right sidebar
  - Drag-to-reorder (future)
  - Acceptance: Add 3 songs → queue shows all 3 → plays in order
  - Files: `src/store/queue-store.ts`, `src/components/player/Queue.tsx`

## Phase 4: Premium Features

- [ ] **Task 4.1: AI Chat with Groq**
  - API route `/api/chat` → calls Groq API (fallback: NVIDIA NIM)
  - Chat UI component (messages, input, streaming response)
  - Rate limiting via Upstash Redis
  - Acceptance: Type message → AI responds
  - Files: `src/app/api/chat/*`, `src/components/chat/*`

- [ ] **Task 4.2: Razorpay payments**
  - Create order API route
  - Payment verification webhook
  - Premium subscription UI (price cards, upgrade flow)
  - Update user subscription status in DB
  - Acceptance: Click "Subscribe" → Razorpay modal → payment confirmed
  - Files: `src/app/api/payments/*`, `src/components/payments/*`

- [ ] **Task 4.3: File uploads (Cloudinary + Backblaze B2)**
  - Cloudinary image upload API
  - Backblaze B2 document upload API
  - Multer middleware for file handling
  - Upload UI component with drag-and-drop
  - Acceptance: Upload image → appears in Cloudinary dashboard
  - Files: `src/app/api/upload/*`, `src/components/upload/*`

- [ ] **Task 4.4: Map feature (Leaflet)**
  - Show venue/music event locations on map
  - Server component with Leaflet client-side import
  - Acceptance: Map renders with markers
  - Files: `src/components/map/*`

## Phase 5: Infrastructure

- [ ] **Task 5.1: Upstash Redis caching**
  - Cache search results (TTL: 1 hour)
  - Cache popular playlists
  - Rate limiter middleware
  - Acceptance: Second search for same song returns from cache (faster)
  - Files: `src/lib/redis/*`, `src/middleware.ts`

- [ ] **Task 5.2: BullMQ job queue**
  - Set up Redis connection for BullMQ
  - Define jobs: `process-upload`, `send-email`, `cleanup-temp-files`
  - Worker entry point
  - Acceptance: Job enqueued → worker processes it
  - Files: `src/lib/queue/*`, `worker/index.ts`

- [ ] **Task 5.3: Security (Helmet, CORS, CSRF)**
  - Configure Helmet in Next.js middleware
  - CORS policy (only allow Vercel domain)
  - CSRF token generation + validation on mutation endpoints
  - Acceptance: Security headers present in response
  - Files: `src/middleware.ts`, `src/lib/csrf.ts`

## Phase 6: Discoverability

- [ ] **Task 6.1: SEO fundamentals**
  - `sitemap.ts` → generates sitemap.xml
  - `robots.ts` → allows AI crawlers, disallows /api/ /dashboard/
  - JSON-LD schemas in layout (WebApplication, Person, MusicGroup)
  - Meta tags (title, description, OG, Twitter)
  - Acceptance: sitemap.xml loads at /sitemap.xml
  - Files: `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/layout.tsx`

- [ ] **Task 6.2: AI discoverability**
  - `public/llms.txt` — LLM context file
  - `public/llms-full.txt` — extended version
  - FAQ schema on landing page
  - Acceptance: llms.txt loads at /llms.txt
  - Files: `public/llms.txt`, `public/llms-full.txt`

- [ ] **Task 6.3: PWA setup**
  - `public/manifest.json` — app name, icons, theme color
  - Service worker (next-pwa or custom)
  - Offline fallback page
  - Acceptance: Lighthouse PWA badge passes
  - Files: `public/manifest.json`, `src/app/sw.ts`

- [ ] **Task 6.4: E-E-A-T identity setup**
  - Author JSON-LD in layout
  - Consistent author name across all platforms
  - About page with author bio
  - Acceptance: Schema validators pass
  - Files: `src/app/about/page.tsx`

## Phase 7: Deployment

- [ ] **Task 7.1: Deploy frontend to Vercel**
  - Connect GitHub repo to Vercel
  - Set all environment variables
  - Configure build settings
  - Acceptance: `https://melodyone.vercel.app` loads

- [ ] **Task 7.2: Deploy backend to Render**
  - Create Web Service on Render
  - Set start command: `python run.py`
  - Add health endpoint
  - Acceptance: `https://melodyone-backend.onrender.com/health` returns ok

- [ ] **Task 7.3: Set up cronjob.org**
  - Create job pinging Render health endpoint
  - Interval: 10 minutes
  - Acceptance: Backend stays alive

- [ ] **Task 7.4: Submit to search consoles**
  - Google Search Console — add site, verify, submit sitemap
  - Bing Webmaster — same process
  - Acceptance: Both consoles show "Submitted"

---

## Total Tasks: 26
## Estimated Duration: ~2-3 weeks (part-time)
