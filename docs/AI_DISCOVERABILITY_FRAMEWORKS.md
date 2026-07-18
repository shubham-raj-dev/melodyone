# AI Discoverability Frameworks — MelodyOne

Ensuring MelodyOne is indexed and understood by search engines, AI assistants, LLMs, and answer engines.

---

## 1. AEO (Answer Engine Optimization)

Optimize for AI answer engines (Google SGE, Bing Chat, Perplexity, etc.)

### Implementation
```html
<!-- FAQ Schema for direct answers -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What is MelodyOne?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "MelodyOne is a music streaming platform that lets you search and play YouTube audio tracks."
    }
  }]
}
</script>
```

### Key Practices
- FAQ schema on landing page
- HowTo schema for features
- Structured API responses with JSON-LD
- Bullet-point summaries for key features
- "People also ask" style content sections

---

## 2. GEO (Generative Engine Optimization)

Optimize for generative AI search (Google Gemini, ChatGPT Search, etc.)

### Implementation
```html
<!-- Organization Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  "name": "MelodyOne",
  "description": "Stream YouTube music with premium audio quality",
  "url": "https://melodyone.vercel.app",
  "foundingDate": "2026",
  "founder": {
    "@type": "Person",
    "name": "Shubham Raj"
  }
}
</script>
```

### Key Practices
- Authoritative content about music streaming
- Clear brand identity and unique value propositions
- Entity linking throughout content
- Citation-worthy data and statistics

---

## 3. LLMO (Large Language Model Optimization)

Optimize for LLM training data inclusion (ChatGPT, Claude, Gemini, etc.)

### Key Practices
- `llms.txt` file at root (standard proposed by llmstxt.dev)
- `llms-full.txt` with extended content for deep context
- Robots.txt allowing AI crawlers
- Well-structured markdown documentation
- Clear entity relationships

---

## 4. AISEO / AI Search Optimization

Optimize for AI-powered search engines (Google AI Overviews, etc.)

### Key Practices
- Conversational content that matches natural language queries
- Long-tail keyword phrases used in conversation
- "What is", "How to", "Best" style content
- Audio and video content with transcripts
- Clear headings and hierarchical content structure

---

## 5. E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)

Google's quality framework for content ranking.

### Implementation
```html
<!-- Author schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Shubham Raj",
  "jobTitle": "Full-Stack Developer & Music Enthusiast",
  "url": "https://github.com/shubhamraj",
  "sameAs": [
    "https://linkedin.com/in/shubhamraj",
    "https://github.com/shubhamraj"
  ]
}
</script>
```

### Key Practices
- **Experience:** Real music player, functional streaming
- **Expertise:** Clean code, proper architecture, modern stack
- **Authoritativeness:** GitHub profile, consistent identity
- **Trustworthiness:** HTTPS, privacy policy, secure payments

### Identity Consistency
```
Author Name:  Shubham Raj
Job Title:    Full-Stack Developer & Music Enthusiast
Use the EXACT same across:
  - GitHub profile
  - LinkedIn
  - Website meta tags
  - JSON-LD schemas
  - Social media
  - brevo email signatures
```

---

## 6. SEO (Search Engine Optimization)

### Sitemap (app/sitemap.ts)
```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://melodyone.vercel.app', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://melodyone.vercel.app/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://melodyone.vercel.app/features', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]
}
```

### Robots (app/robots.ts)
```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/dashboard/', '/admin/'] },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
    ],
    sitemap: 'https://melodyone.vercel.app/sitemap.xml',
  }
}
```

### llms.txt (public/llms.txt)
```
# MelodyOne - AI Context File
> This file helps LLMs understand MelodyOne's capabilities.

## About
MelodyOne is a full-stack music streaming web application.
Users search for YouTube tracks and stream high-quality audio.

## Key Features
- YouTube audio search and streaming
- User playlists with drag-and-drop reorder
- AI chat assistant (powered by Groq API)
- Premium subscriptions via Razorpay
- PWA support (installable on mobile/desktop)

## Tech Stack
- Frontend: Next.js 15, TypeScript, Tailwind CSS, Zustand
- Backend: Flask, yt-dlp
- Database: Neon PostgreSQL, Drizzle ORM
- Cache: Upstash Redis
- Auth: Clerk
- Storage: Backblaze B2, Cloudinary
- AI: Groq API, NVIDIA NIM

## Links
- Website: https://melodyone.vercel.app
- Documentation: https://melodyone.vercel.app/docs

## Author
Shubham Raj — Full-Stack Developer & Music Enthusiast

## JSON-LD
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "MelodyOne",
  "applicationCategory": "MusicStreaming",
  "operatingSystem": "Web",
  "author": { "@type": "Person", "name": "Shubham Raj" }
}
```

### Meta Tags (app/layout.tsx)
```typescript
export const metadata: Metadata = {
  title: 'MelodyOne - Stream YouTube Music',
  description: 'Search and stream your favorite YouTube tracks with premium audio quality. Create playlists, chat with AI, and more.',
  keywords: ['music streaming', 'YouTube audio', 'playlist', 'music player', 'online music'],
  authors: [{ name: 'Shubham Raj', url: 'https://github.com/shubhamraj' }],
  creator: 'Shubham Raj',
  openGraph: {
    title: 'MelodyOne - Stream YouTube Music',
    description: 'Premium YouTube audio streaming with playlists, AI chat, and more.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'MelodyOne',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MelodyOne - Stream YouTube Music',
    description: 'Premium YouTube audio streaming',
  },
  robots: { index: true, follow: true },
}
```

## PageSpeed Insights Targets

| Metric | Target |
|--------|--------|
| Performance | ≥ 90 |
| Accessibility | ≥ 95 |
| Best Practices | ≥ 95 |
| SEO | ≥ 95 |
| PWA | Installed |

## Search Console Submission

### Google Search Console
1. Add property: `https://melodyone.vercel.app`
2. Verify ownership (DNS TXT or meta tag)
3. Submit sitemap: `https://melodyone.vercel.app/sitemap.xml`
4. Request indexing for key pages

### Bing Webmaster
1. Add site: `https://melodyone.vercel.app`
2. Verify ownership
3. Submit sitemap
4. Configure crawl rate

### Monitoring
- Weekly: Check Search Console for errors
- Monthly: Review indexed pages count
- Per-deploy: Validate sitemap.xml and robots.ts
