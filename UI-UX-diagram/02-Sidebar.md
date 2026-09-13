# MelodyOne — Sidebar UI/UX

## File: `src/components/Sidebar.tsx`

## Desktop View (≥768px)

```
┌──────────────────┐
│  🔷 MelodyOne    │
│                  │
│  🏠 Home         │
│  ♥  Liked Songs  │
│                  │
│                  │
│                  │
│  ┌────────────┐  │
│  │ 👤 My Acc  │  │
│  │ PREMIUM    │  │
│  └────────────┘  │
└──────────────────┘
```

- Width: 260px
- Background: `bg-white/40 backdrop-blur-xl`
- Border: `border-r border-white/60`
- Shadow: `shadow-[0_8px_32px_rgba(31,38,135,0.05)]`

## Mobile View (<768px)

```
 Hamburger closed:          Hamburger open:
┌──┐                        ┌──────────────────┐
│☰ │ ← fixed top-left       │ 🔷 MelodyOne     │
│  │     z-[60]             │                  │
│  │                        │ 🏠 Home          │
│  │                        │ ♥  Liked Songs   │
│  │                        │                  │
│  │           ← overlay →  │   (translucent)  │
│  │         bg-black/40    │                  │
│  │         backdrop-blur  │ 👤 My Account    │
│  │                        │ PREMIUM          │
└──┘                        └──────────────────┘
```

- Default: `-translate-x-full` (hidden off-screen)
- Open: `translate-x-0` with `duration-300 ease-in-out`
- Overlay: `fixed inset-0 bg-black/40 backdrop-blur-sm z-[40]`
- Close on: overlay click, link click

## Navigation Items

| Icon | Name | Path | Protected |
|------|------|------|-----------|
| 🏠 | Home | `/` | No |
| ♥ | Liked Songs | `/liked` | No |

## Active State
- `bg-indigo-50 shadow-sm text-indigo-600 font-bold`
- Inactive: `text-slate-500 font-semibold hover:bg-white/50 hover:text-slate-800`

## Auth Section

### Signed In
```
┌──────────────────────┐
│  👤  My Account      │
│      PREMIUM badge   │
└──────────────────────┘
```
- `<UserButton />` from Clerk
- Badge: `text-[10px] font-extrabold text-indigo-600 bg-indigo-100`

### Signed Out
```
┌──────────────────────┐
│  Sign In / Sign Up   │
│  (indigo button)     │
└──────────────────────┘
```
- `bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl`
- Mode: modal (opens Clerk modal)

## States
- **Loading:** Not applicable (Clerk handles its own loading)
- **Empty:** Not applicable (always renders nav items)
- **Error:** Not handled (Clerk handles auth errors)