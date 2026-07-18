# Assumptions — MelodyOne

**Surface assumptions before spec.** Correct me now or I'll proceed with these.

1. **MelodyOne is a Music Player** — YouTube audio streaming (yt-dlp backend), playlists, search, playback controls. Same core as LiquidBeats but rebuilt with full stack.
2. **Next.js App Router** (not Pages Router) — `app/` directory, server components, API routes.
3. **PostgreSQL on Neon** — Drizzle ORM for schema/migrations.
4. **Clerk** handles auth — user signup/login, session management, webhooks.
5. **Vercel** hosts frontend (Next.js), **Render** hosts backend (Flask/FastAPI for yt-dlp).
6. **Upstash Redis** — caching search results, session store, rate limiter.
7. **Backblaze B2** — large file storage (album art, user uploads).
8. **Cloudinary + Multer** — image uploads/transformations.
9. **Groq API** — AI chat feature within the app.
10. **Zustand** — client-side state management for player state, queue, UI.
11. **Razorpay** — payments (premium subscriptions).
12. **BullMQ + Redis** — job queues for async tasks.
13. **PWA** — service worker, manifest, offline support.
14. **Target:** Modern browsers (Chrome, Firefox, Safari, Edge — last 2 versions).
