# Spec: MelodyOne — Full-Stack Music Player

## Objective

Build a production-grade music player web app where users search YouTube tracks, stream audio, create playlists, chat with AI, and subscribe for premium features. Rebuild the LiquidBeats concept with a complete full-stack architecture.

**User:** Music listeners who want ad-free, high-quality YouTube audio streaming with a beautiful UI.

**Success criteria:**
- User can search and stream any YouTube track
- User can create/manage playlists
- AI chat (Groq) works within the app
- Premium subscriptions via Razorpay
- PWA installable on mobile/desktop
- Google Discoverability score ≥ 90
- PageSpeed Insights score ≥ 85 across all four metrics

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 |
| State | Zustand |
| Auth | Clerk |
| Database | Neon PostgreSQL + Drizzle ORM |
| Cache | Upstash Redis |
| Queue | BullMQ (powered by Redis) |
| Storage | Backblaze B2 (files) + Cloudinary (images) |
| Payments | Razorpay |
| AI Chat | Groq API + NVIDIA NIM API |
| Maps | Leaflet (for event/venue features) |
| Email | Brevo API |
| Backend | Render (Flask/FastAPI for yt-dlp streaming) |
| Analytics | Vercel Analytics |
| PWA | next-pwa + service worker |
| Job Scheduler | cronjob.org (keep Render alive) |

## Commands

```bash
# Development
npm run dev              # Next.js dev server (port 3000)
cd backend && python run.py  # Flask streaming server (port 5000)

# Build & Deploy
npm run build            # Production build
npm run lint             # ESLint check
npm run typecheck        # TypeScript check
npm run test             # Jest + Testing Library

# Database
npm run db:generate      # Drizzle schema → SQL
npm run db:push          # Push schema to Neon
npm run db:studio        # Drizzle Studio (GUI)

# Workers
npm run worker           # BullMQ worker process
```

## Project Structure

```
melodyone/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Auth pages (Clerk)
│   │   ├── (dashboard)/        # Main app pages
│   │   ├── api/                # API routes
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/             # React components
│   │   ├── ui/                 # Reusable UI primitives
│   │   ├── player/             # Audio player components
│   │   ├── playlist/           # Playlist components
│   │   └── chat/               # AI chat components
│   ├── lib/                    # Utilities
│   │   ├── db/                 # Drizzle schema & client
│   │   ├── redis/              # Upstash client
│   │   ├── queue/              # BullMQ definitions
│   │   └── ai/                 # Groq/NVIDIA clients
│   ├── store/                  # Zustand stores
│   ├── hooks/                  # Custom React hooks
│   └── types/                  # TypeScript types
├── backend/                    # Flask streaming server
│   ├── run.py
│   └── engine.py
├── public/                     # Static assets
├── docs/                       # Documentation
├── worker/                     # BullMQ worker entry
├── drizzle.config.ts
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## Code Style

```typescript
// Components: PascalCase, default export
// Utilities: camelCase, named export
// Files: kebab-case for pages, PascalCase for components

// Example component
export default function PlayerBar() {
  // Zustand store — no prop drilling
  const { currentTrack, isPlaying, toggle } = usePlayerStore()
  return <div>...</div>
}

// API route handler
export async function GET(req: NextRequest) {
  return NextResponse.json({ data })
}
```

## Database Schema (Drizzle ORM)

```typescript
// Users — synced via Clerk webhook
export const users = pgTable('users', {
  id: text('id').primaryKey(),        // Clerk user ID
  email: text('email').notNull(),
  name: text('name'),
  imageUrl: text('image_url'),
  subscriptionId: text('subscription_id'),
  createdAt: timestamp('created_at').defaultNow(),
})

// Playlists
export const playlists = pgTable('playlists', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => users.id),
  name: text('name').notNull(),
  description: text('description'),
  coverUrl: text('cover_url'),
  isPublic: boolean('is_public').default(false),
  createdAt: timestamp('created_at').defaultNow(),
})

// Tracks
export const tracks = pgTable('tracks', {
  id: uuid('id').defaultRandom().primaryKey(),
  playlistId: uuid('playlist_id').references(() => playlists.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  artist: text('artist'),
  youtubeUrl: text('youtube_url'),
  thumbnail: text('thumbnail'),
  duration: integer('duration'),
  position: integer('position').notNull(),
  addedAt: timestamp('added_at').defaultNow(),
})

// Favorites
export const favorites = pgTable('favorites', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => users.id),
  title: text('title').notNull(),
  artist: text('artist'),
  streamUrl: text('stream_url'),
  thumbnail: text('thumbnail'),
  createdAt: timestamp('created_at').defaultNow(),
})
```

## Testing Strategy

- **Unit:** Vitest + React Testing Library for components
- **API:** Vitest for API route handlers
- **E2E:** Playwright (future)
- Coverage: ≥ 80% for lib/, store/, hooks/
- Tests live next to source files: `component.test.tsx`

## Boundaries

**Always do:**
- Run `npm run typecheck` before commits
- Run `npm run lint --fix`
- Write tests for new features
- Use Zustand for client state (not useState lifting)
- Use Drizzle migrations for schema changes

**Ask first:**
- Adding new npm dependencies
- Changing database schema
- Modifying CI/CD pipeline
- Changing auth flow (Clerk)
- Adding new API integrations

**Never do:**
- Commit API keys or secrets
- Hardcode environment variables
- Remove tests without discussion
- Push to main without PR
- Use `any` type (use `unknown` instead)

## Success Criteria

- [ ] YouTube search + audio streaming works (yt-dlp backend)
- [ ] Clerk auth (login/signup/session)
- [ ] Playlists CRUD (create, add tracks, reorder, delete)
- [ ] Favorites (save/unsave tracks)
- [ ] PWA installable (manifest + service worker)
- [ ] AI Chat (Groq API) accessible from app
- [ ] Razorpay premium subscription flow
- [ ] BullMQ job queue for async tasks
- [ ] Backblaze B2 file uploads
- [ ] Cloudinary image uploads
- [ ] Redis caching (search results, sessions)
- [ ] SEO: sitemap.xml, robots.ts, llms.txt
- [ ] E-E-A-T: author bio, consistent identity across platforms
- [ ] Rate limiter on API routes
- [ ] Security: Helmet, CORS, CSRF
- [ ] Mermaid.js diagrams in docs
- [ ] Docs: TECH_STACK, API, ARCHITECTURE, DB_SCHEMA, DEPLOYMENT, EDGE_CASES, WORKFLOW, AI_DISCOVERABILITY

## Open Questions

1. Flask ya FastAPI — kaunsa backend streaming ke liye? (Currently Flask in run.py)
2. LLMS.txt ka exact format — OpenAI standard follow karein?
3. Backblaze B2 — direct uploads from frontend (presigned URLs) ya backend proxy?
