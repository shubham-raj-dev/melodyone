# MelodyOne — UI/UX Deep Dive Files

## Folder Structure

```
UI-UX-diagram/
├── 01-App-Shell-Layout.md          # Root layout structure
├── 02-Sidebar.md                   # Left navigation
├── 03-RightSidebar-Desktop-Player.md  # Desktop player panel
├── 04-MobileBottomPlayer.md        # Mobile compact player
├── 05-Home-Page.md                 # Home page (search + trending)
├── 06-Liked-Songs-Page.md          # Liked songs library
├── 07-Authentication-UI.md         # Auth flows (Clerk)
├── 08-BottomPlayer-Desktop.md      # Desktop bottom bar
├── 09-PlayerContext-State-Management.md  # State architecture
├── 10-Like-System.md               # Like/unlike flow
└── README.md                       # This file
```

## How to Use

1. Upload each `.md` file individually to **Stitch** (or your AI agent)
2. Give the agent the prompt: *"Generate UI/UX code for MelodyOne based on this design spec"*
3. The agent will output production-ready React/Next.js components

## Design Principles

- **Glassmorphism:** All panels use `bg-white/40 backdrop-blur-[40px]`
- **No dead UI:** Every button has a functional `onClick`
- **Mobile-first:** All components work on 375px screens
- **State coverage:** Loading, empty, error, populated states for every component
- **Consistent tokens:** indigo-500 accent, slate-900 headings, red-500 likes