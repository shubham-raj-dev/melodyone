import sqlite3
from api.config import DATABASE_PATH


def get_connection():
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS playlists (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS playlist_songs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            playlist_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            artist TEXT DEFAULT '',
            duration TEXT DEFAULT '',
            thumbnail TEXT DEFAULT '',
            video_url TEXT NOT NULL,
            audio_url TEXT DEFAULT '',
            added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (playlist_id) REFERENCES playlists(id) ON DELETE CASCADE
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS favorites (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            artist TEXT DEFAULT '',
            duration TEXT DEFAULT '',
            thumbnail TEXT DEFAULT '',
            video_url TEXT NOT NULL,
            audio_url TEXT DEFAULT '',
            added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()


def create_playlist(name):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO playlists (name) VALUES (?)", (name,))
    conn.commit()
    playlist_id = cursor.lastrowid
    conn.close()
    return playlist_id


def get_playlists():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM playlists ORDER BY created_at DESC")
    rows = cursor.fetchall()
    conn.close()
    return [dict(r) for r in rows]


def add_song_to_playlist(playlist_id, song_data):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO playlist_songs (playlist_id, title, artist, duration, thumbnail, video_url, audio_url)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (playlist_id, song_data["title"], song_data.get("artist", ""),
          song_data.get("duration", ""), song_data.get("thumbnail", ""),
          song_data["video_url"], song_data.get("audio_url", "")))
    conn.commit()
    song_id = cursor.lastrowid
    conn.close()
    return song_id


def get_playlist_songs(playlist_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM playlist_songs WHERE playlist_id = ? ORDER BY added_at DESC", (playlist_id,))
    rows = cursor.fetchall()
    conn.close()
    return [dict(r) for r in rows]


def remove_song_from_playlist(song_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM playlist_songs WHERE id = ?", (song_id,))
    conn.commit()
    conn.close()


def add_favorite(song_data):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO favorites (title, artist, duration, thumbnail, video_url, audio_url)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (song_data["title"], song_data.get("artist", ""),
          song_data.get("duration", ""), song_data.get("thumbnail", ""),
          song_data["video_url"], song_data.get("audio_url", "")))
    conn.commit()
    fav_id = cursor.lastrowid
    conn.close()
    return fav_id


def get_favorites():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM favorites ORDER BY added_at DESC")
    rows = cursor.fetchall()
    conn.close()
    return [dict(r) for r in rows]


def remove_favorite(fav_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM favorites WHERE id = ?", (fav_id,))
    conn.commit()
    conn.close()
