# MelodyOne — Like System UI/UX

## Files: `RightSidebar.jsx`, `MobileBottomPlayer.tsx`, `Liked.tsx`, `run.py`

## Architecture

```
┌─────────┐     ┌──────────┐     ┌─────────┐
│  User   │     │  Flask   │     │  Mongo  │
│ clicks  │────▶│ Backend  │────▶│   DB    │
│  ♥/♡   │     │          │     │         │
│         │     │ POST     │     │ users   │
│         │     │ /api/    │     │ collect │
│         │     │ user/    │     │         │
│         │     │ like     │     │ liked_  │
│         │     │          │     │ songs[] │
│         │     │ {videoId │     │         │
│         │     │  title,  │     │ $push/  │
│         │     │  artist, │     │ $pull   │
│         │     │ thumb}   │     │         │
└─────────┘     └──────────┘     └─────────┘
```

## Unlike Behavior

```
┌─────────┐     ┌──────────┐     ┌─────────┐
│  User   │     │  Flask   │     │  Mongo  │
│ clicks  │────▶│ Backend  │────▶│   DB    │
│  ♥ → ♡ │     │          │     │         │
│         │     │ POST     │     │ $pull   │
│         │     │ /api/    │     │ liked_  │
│         │     │ user/    │     │ songs   │
│         │     │ like     │     │ where   │
│         │     │          │     │ videoId │
│         │     │ same     │     │ matches │
│         │     │ endpoint │     │         │
│         │     │ (toggle) │     │         │
└─────────┘     └──────────┘     └─────────┘
```

## Toggle Logic (Backend)

```python
if video_id already in liked_songs:
    $pull from liked_songs  → unlike
else:
    $push to liked_songs    → like
```

## Unique Identifier
- Using `videoId` (iTunes `trackId`) — NOT song title
- Prevents collision: two songs with same title "Perfect" by different artists
- Future-proof: can be replaced with any globally unique ID

## Like Button Locations

### 1. RightSidebar (Desktop)
```
Album Art Overlay:     Title Area:
  ┌────────────┐      Song Title ♡/♥
  │     ♡/♥    │      Artist Name
  └────────────┘
```
- Overlay: `opacity-0 group-hover:opacity-100` (hidden until hover)
- Liked: `bg-red-500 text-white opacity-100` (always visible)
- Title area: always visible, `text-slate-400 hover:text-red-400`

### 2. MobileBottomPlayer
```
┌──────────────────────────────────────┐
│ 🖼️ Title...  ♥  ◄  ▶  ⏸  ►        │
│    Artist...                          │
└──────────────────────────────────────┘
```
- `text-xl`, always visible
- Liked: `text-red-500`
- Not liked: `text-slate-400`

## Liked Songs Page (`/liked`)
- Fetches `GET /api/user/liked?clerk_id=USER_ID`
- Shows all liked songs with album art, title, artist
- Play button overlay on hover
- Empty state: "You haven't liked any songs yet"

## States

| State | UI |
|-------|-----|
| **Not liked** | Outline heart (♡), slate-400 |
| **Liked** | Filled heart (♥), red-500 |
| **Loading like status** | Handled by fetch in useEffect |
| **Not signed in** | Heart clicks do nothing (early return) |
| **Network error** | `console.error`, state not updated |
| **Fresh page load** | Fetch liked songs from backend, populate state |
| **After like** | Optimistic UI update via state change |
| **After unlike** | Optimistic UI update, remove from set |

## API

### POST /api/user/like
```json
Request:
{
  "clerk_id": "user_xxx",
  "song": {
    "videoId": "1440870375",
    "title": "Starboy",
    "artist": "The Weeknd",
    "thumbnail": "https://...",
    "stream_url": "https://..."
  }
}

Response (Like):
{ "message": "Added to liked", "liked": true }

Response (Unlike):
{ "message": "Removed from liked", "liked": false }
```

### GET /api/user/liked?clerk_id=USER_ID
```json
{
  "songs": [
    {
      "videoId": "1440870375",
      "title": "Starboy",
      "artist": "The Weeknd",
      "thumbnail": "https://...",
      "stream_url": "https://..."
    }
  ]
}
```