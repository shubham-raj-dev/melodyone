# Tech Stack — MelodyOne

```mermaid
graph TD
  subgraph Frontend
    NX[Next.js 15 + TypeScript]
    TW[Tailwind CSS v4]
    ZU[Zustand]
    PW[PWA Service Worker]
  end

  subgraph Backend
    FL[Flask / FastAPI]
    YT[yt-dlp]
    BQ[BullMQ Worker]
  end

  subgraph Database & Cache
    PG[(Neon PostgreSQL)]
    DR[Drizzle ORM]
    RD[(Upstash Redis)]
  end

  subgraph Storage & Media
    B2[Backblaze B2]
    CL[Cloudinary]
  end

  subgraph Auth & Email
    CK[Clerk]
    BR[Brevo API]
  end

  subgraph AI & APIs
    GQ[Groq API]
    NV[NVIDIA NIM]
    LF[Leaflet Maps]
  end

  subgraph Payments
    RZ[Razorpay]
  end

  subgraph Infrastructure
    VR[Vercel - Frontend]
    RD2[Render - Backend]
    CJ[cronjob.org]
    VA[Vercel Analytics]
  end

  subgraph Discoverability
    SEO[SEO / Sitemap]
    AEO[AEO / GEO / LLMO]
    EAT[E-E-A-T]
  end

  NX -->|auth| CK
  NX -->|API| FL
  NX -->|state| ZU
  FL -->|stream| YT
  FL -->|cache| RD
  BQ -->|queue| RD
  NX -->|db| DR --> PG
  NX -->|files| B2
  NX -->|images| CL
  NX -->|AI| GQ
  NX -->|AI| NV
  NX -->|maps| LF
  NX -->|pay| RZ
  NX -->|email| BR
  VR -->|analytics| VA
  FL -->|keep alive| CJ
```

## Frontend

| Library | Version | Purpose |
|---------|---------|---------|
| Next.js | ^15.0 | React framework (App Router) |
| TypeScript | ^5.6 | Type safety |
| Tailwind CSS | ^4.0 | Utility-first styling |
| Zustand | ^5.0 | Client state management |
| Clerk | latest | Authentication |
| @upstash/redis | latest | Redis client |
| drizzle-orm | latest | ORM |
| @neondatabase/serverless | latest | PG driver |
| next-pwa | latest | PWA support |
| razorpay | latest | Payments |
| leaflet | latest | Maps |
| @vercel/analytics | latest | Analytics |

## Backend

| Library | Purpose |
|---------|---------|
| Flask / FastAPI | HTTP server for yt-dlp |
| yt-dlp | YouTube audio extraction |
| bullmq | Job queue |
| ioredis | Redis client for worker |

## Infrastructure

| Service | Purpose | Cost |
|---------|---------|------|
| Vercel | Frontend hosting | Free tier |
| Render | Backend hosting | Free tier |
| Neon | PostgreSQL | Free tier |
| Upstash | Redis | Free tier |
| Backblaze B2 | File storage | Free 10GB |
| Cloudinary | Image CDN | Free tier |
| Clerk | Auth | Free tier |
| Brevo | Email | Free 300/day |
| Razorpay | Payments | Per transaction |
| cronjob.org | Uptime pings | Free |
