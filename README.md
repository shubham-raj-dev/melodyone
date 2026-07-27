# MelodyOne 🎵

A full-stack, responsive music streaming platform designed for seamless audio playback, real-time search, and personalized music libraries. Built with a decoupled architecture to ensure high performance and scalability.

## 🚀 Key Features

*   **Secure Authentication:** User login, SSO, and session management powered by Clerk.
*   **Dynamic Music Discovery:** Real-time search functionality and global trending charts.
*   **Personalized Library (Liked Songs):** Users can 'Like' tracks to build a custom library, instantly synced to a cloud database.
*   **Responsive Audio Player:** 
    *   **Desktop:** Persistent right-sidebar player with detailed controls and lyrics toggle.
    *   **Mobile:** App-like, compact bottom-sticky player for uninterrupted browsing.
*   **Decoupled Architecture:** Independent frontend and API communication, ensuring no UI blocking during heavy data fetches.

## 🛠️ Tech Stack

### Frontend (User Interface)
*   **Framework:** Next.js (App Router) & React
*   **Styling:** Tailwind CSS
*   **Authentication:** Clerk
*   **Deployment:** Vercel

### Backend (REST API)
*   **Framework:** Python (Flask)
*   **Database:** MongoDB Atlas (PyMongo)
*   **Server:** Gunicorn
*   **Security:** Flask-CORS
*   **Deployment:** Render

## 📂 Project Structure

```text
MelodyOne/
├── backend/                # Python Flask API
│   ├── api/                # Core logic & external API integrations
│   ├── database/           # MongoDB connection handling
│   ├── requirements.txt    # Python dependencies
│   └── run.py              # WSGI entry point (Gunicorn)
│
├── frontend/               # Next.js Application
│   ├── src/app/            # App Router pages (Home, Liked, Search)
│   ├── src/components/     # Reusable UI (Sidebar, BottomPlayer)
│   ├── src/context/        # Global State (PlayerContext)
│   └── middleware.ts       # Clerk route pr
otection



