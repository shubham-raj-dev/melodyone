# Deployment — MelodyOne

```mermaid
flowchart LR
  subgraph Vercel
    NX[Next.js]
    VA[Analytics]
    SM[Sitemap]
  end

  subgraph Render
    FL[Flask Backend]
  end

  subgraph Services
    NP[(Neon DB)]
    UR[(Upstash Redis)]
    CK[Clerk]
  end

  CJ[cronjob.org] -->|GET /health| FL
  
  NX --> NP
  NX --> UR
  NX --> CK
  FL --> NX
```

## Frontend → Vercel

### Setup
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Variables (Vercel)
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
DATABASE_URL=
UPSTASH_REDIS_URL=
UPSTASH_REDIS_TOKEN=
NEXT_PUBLIC_RAZORPAY_KEY=
GROQ_API_KEY=
NVIDIA_API_KEY=
BREVO_API_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
BACKBLAZE_APP_KEY_ID=
BACKBLAZE_APP_KEY=
BACKBLAZE_BUCKET_ID=
```

### Build Settings
| Setting | Value |
|---------|-------|
| Framework | Next.js |
| Build Command | `npm run build` |
| Output Dir | `.next` |
| Node Version | 20.x |

## Backend → Render

### Setup
1. Create new **Web Service** on Render
2. Connect GitHub repo (`/backend` directory)
3. Start command: `python run.py`

### Health Check
Add `/health` endpoint to Flask:
```python
@app.route('/health')
def health():
    return {"status": "ok"}
```

### cronjob.org
1. Go to cronjob.org
2. Create job: `https://your-render-app.onrender.com/health`
3. Interval: Every 10 minutes
4. This prevents Render free tier from sleeping

## Database → Neon

```bash
# Get connection string from Neon dashboard
DATABASE_URL="postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb"

# Push schema
npm run db:push
```

## Redis → Upstash

```bash
# Get REST URL and token from Upstash console
UPSTASH_REDIS_URL="https://xxx.upstash.io"
UPSTASH_REDIS_TOKEN="xxx"
```

## File Storage

### Backblaze B2
1. Create bucket (private)
2. Generate Application Key
3. Use `b2-sdk` in API routes

### Cloudinary
1. Create account
2. Get cloud name, API key, API secret
3. Upload via unsigned presets for frontend

## Search Console

### Google
```bash
# Upload sitemap
https://melodyone.vercel.app/sitemap.xml

# Add to Google Search Console
# Verify with TXT record or meta tag
```

### Bing Webmaster
```bash
# Same sitemap URL
# Submit via Bing Webmaster Tools
```

## CI/CD (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - uses: amondnet/vercel-action@v25
```
