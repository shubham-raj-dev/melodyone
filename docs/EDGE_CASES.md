# Edge Cases — MelodyOne

## Audio Streaming

| Edge Case | Handling |
|-----------|----------|
| yt-dlp returns no results | Return `{ error: "Gaana nahi mila" }`, show toast to user |
| YouTube stream URL expired | Re-fetch from yt-dlp (URLs expire ~6 hours) |
| Backend server is down (Render sleep) | cronjob.org keeps alive; show "Backend connecting..." overlay |
| Audio playback fails on mobile | Safari blocks autoplay — user must tap play first |
| Network drops mid-stream | PWA service worker shows offline page; resume on reconnect |
| Very long songs (>1 hour) | No issue, but add duration display + seek bar optimization |

## Auth

| Edge Case | Handling |
|-----------|----------|
| Clerk webhook fails | Retry 3x; if still fails, log & alert admin |
| Session expired mid-session | Clerk auto-refreshes; if fails, redirect to sign-in |
| User deletes Clerk account | Webhook deletes user + all data from Neon |
| Anonymous user tries to create playlist | Redirect to sign-up (Clerk modal) |
| Clerk rate limit hit | Show "Too many attempts, try later" toast |

## Database

| Edge Case | Handling |
|-----------|----------|
| Neon connection pool exhausted | Retry with backoff; use connection pooling |
| Concurrent playlist edits | Drizzle handles with row-level locking |
| Duplicate track in playlist | Check on insert via unique constraint on (playlist_id, youtube_url) |
| User has 1000+ favorites | Paginate with cursor-based pagination |
| Migration fails | Rollback via `drizzle-kit rollback`; backup before migrations |

## AI Chat (Groq)

| Edge Case | Handling |
|-----------|----------|
| Groq API is down | Fallback to NVIDIA NIM API |
| Both APIs down | Return "AI is taking a break, try again later" |
| User sends empty message | Ignore and prompt for input |
| Rate limit exceeded | Queue messages and retry with backoff |
| Profane/harmful content | Groq content filter handles; log violations |
| Streaming interrupted | Show partial response with "continue?" button |

## Payments (Razorpay)

| Edge Case | Handling |
|-----------|----------|
| Payment failed but charged | Verify with Razorpay webhook; auto-refund if failed |
| User closes payment modal | Don't charge; update order status to "cancelled" |
| Duplicate webhook | Idempotency key on Razorpay webhook events |
| Subscription expired | Downgrade to free tier; notify via email (Brevo) |
| Currency mismatch | Default INR; convert via Razorpay's built-in support |

## File Uploads

| Edge Case | Handling |
|-----------|----------|
| File too large (>10MB) | Reject with error; use Backblaze B2 for large files |
| Invalid file type | Check MIME type on client + server side |
| Cloudinary upload fails | Fallback to Backblaze B2 (direct upload) |
| Upload interrupted | Resume not supported; re-upload required |
| Storage quota exceeded | Show "Storage full" message; offer upgrade |

## PWA / Offline

| Edge Case | Handling |
|-----------|----------|
| First load offline | Show cached shell with "Connect to internet" message |
| Playing track then offline | Audio keeps playing (buffered); pause/next won't work |
| Cache storage full | Clear old cached searches; keep UI shell only |
| Service worker update | Show "Update available" toast; prompt refresh |

## Discoverability / SEO

| Edge Case | Handling |
|-----------|----------|
| Google crawls while backend is down | Return cached static pages; sitemap always accessible |
| Duplicate content across pages | Canonical URLs in `<head>` |
| Noindex pages (auth, dashboard) | `robots.ts` excludes `/api/*`, `/dashboard/*` |
| Large sitemap (>50K URLs) | Split into multiple sitemaps via sitemap-index.xml |
| Bing indexing different from Google | Submit separate sitemaps; follow each webmaster guidelines |

## Performance

| Edge Case | Handling |
|-----------|----------|
| Large playlist (>500 tracks) | Virtual scrolling with react-window or infinite scroll |
| Heavy image thumbnails | Cloudinary automatic format (webp) + responsive widths |
| Slow Redis on cold start | Warm cache on deploy; fallback to direct DB query |
| Too many API requests | Rate limiter returns 429 + Retry-After header |
| Memory leak in player | Clean up audio refs on unmount; limit queue to 50 tracks |
