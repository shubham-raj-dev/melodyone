# MelodyOne — Authentication UI/UX

## File: `src/middleware.ts` + `src/components/Sidebar.tsx`

## Route Protection (middleware.ts)

| Route | Access |
|-------|--------|
| `/` (Home) | Public |
| `/liked` | Public |
| `/search` | Public |
| `/explore` | Public |
| `/albums` | Public |
| `/artists` | Public |
| `/library` | 🔒 Protected → redirect to sign-in |
| `/playlists` | 🔒 Protected → redirect to sign-in |

### Behavior
- Uses Clerk's `auth.protect()` in middleware
- Unauthenticated users → redirected to Clerk sign-in page
- After sign-in → redirected back to original route

## Auth UI in Sidebar

### Signed Out State
```
┌──────────────────────┐
│  Sign In / Sign Up   │
│  (indigo button)     │
└──────────────────────┘
```
- Full width: `w-full`
- `py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white`
- `rounded-2xl text-sm font-bold shadow-md hover:shadow-lg`
- Mode: `modal` (opens Clerk modal overlay, doesn't navigate away)

### Signed In State
```
┌──────────────────────────┐
│  👤   My Account         │
│       PREMIUM            │
└──────────────────────────┘
```
- `bg-white/60 backdrop-blur-md rounded-2xl p-2`
- `UserButton` from Clerk (avatar, dropdown on click)
- "My Account": `text-sm font-bold text-slate-800 truncate`
- "PREMIUM": `text-[10px] font-extrabold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full`

## User Sync Flow

```
┌─────────┐     ┌──────────┐     ┌─────────┐
│  User   │     │  Clerk   │     │  Flask  │
│ signs   │────▶│ returns  │────▶│  Backend │
│ in      │     │ user.id  │     │         │
└─────────┘     └──────────┘     │ POST    │
                                 │ /api/   │
                                 │ user/   │
                                 │ sync    │
                                 │         │
                                 │ ┌─────┐ │
                                 │ │Mongo│ │
                                 │ │  DB  │ │
                                 │ └─────┘ │
                                 │ Create  │
                                 │ user if │
                                 │ new     │
                                 └─────────┘
```

### Sync Payload
```json
{
  "clerk_id": "user_xxx",
  "email": "user@email.com",
  "full_name": "User Name"
}
```

## Clerk Badge (Development Mode)
- Shows on localhost in development
- Hidden via CSS: `.cl-internal-b3al6g { display: none !important; }`
- In production (with real API keys), automatically disappears