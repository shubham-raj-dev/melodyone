import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import requests
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "https://melodyone.vercel.app"])
limiter = Limiter(get_remote_address, app=app, default_limits=["200 per day", "50 per hour"])

# MongoDB Connection Setup
try:
    mongo_uri = os.getenv("MONGO_URI")
    if not mongo_uri:
        raise ValueError("MONGO_URI .env file mein nahi mila!")

    client = MongoClient(mongo_uri)
    db = client.get_database()
    users_collection = db['users']

    client.admin.command('ping')
    print("MongoDB Atlas successfully connected!")
except Exception as e:
    print(f"Database Connection Error: {e}")

@app.after_request
def add_security_headers(response):
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
    return response

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "service": "melodyone-backend", "source": "itunes"})

@app.route('/', methods=['GET'])
def home():
    return "<h1>MelodyOne Backend</h1><p>API: /api/search?song=NAME</p>"

@app.route('/api/search', methods=['GET'])
@limiter.limit("30 per minute")
def search_song():
    query = request.args.get('song')
    if not query:
        return jsonify({"error": "Bhai, query toh bhej"}), 400

    print(f"Searching iTunes for: {query}")

    try:
        url = f"https://itunes.apple.com/search?term={query}&limit=1&entity=song"
        response = requests.get(url, timeout=10)
        data = response.json()

        if data['resultCount'] == 0:
            return jsonify({"error": "Gaana nahi mila"}), 404

        track = data['results'][0]

        result = {
            "videoId": str(track['trackId']),
            "title": track['trackName'],
            "artist": track['artistName'],
            "thumbnail": track.get('artworkUrl100', '').replace('100x100', '600x600'),
            "stream_url": track.get('previewUrl', '')
        }

        return jsonify(result)

    except Exception as e:
        print(f"iTunes API Error: {e}")
        return jsonify({"error": "Backend failed to fetch data"}), 500

@app.route('/api/trending', methods=['GET'])
def get_trending():
    print("Fetching trending tracks from Apple RSS...")
    try:
        url = "https://rss.applemarketingtools.com/api/v2/in/music/most-played/10/songs.json"
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        data = response.json()

        results = data.get('feed', {}).get('results', [])
        if not results:
            raise ValueError("Empty results from Apple RSS")

        trending_tracks = []
        for track in results[:4]:
            trending_tracks.append({
                "title": track['name'],
                "artist": track['artistName'],
                "thumbnail": track['artworkUrl100'].replace('100x100', '600x600'),
                "stream_url": ""
            })

        return jsonify(trending_tracks)

    except Exception as e:
        print(f"Apple RSS API Failed or Timed Out: {e}")

        fallback_data = [
            {
                "videoId": "fallback_starboy",
                "title": "Starboy",
                "artist": "The Weeknd",
                "thumbnail": "https://i.ytimg.com/vi/34Na4j8HLjc/hqdefault.jpg",
                "stream_url": ""
            },
            {
                "videoId": "fallback_shape_of_you",
                "title": "Shape of You",
                "artist": "Ed Sheeran",
                "thumbnail": "https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg",
                "stream_url": ""
            },
            {
                "videoId": "fallback_blinding_lights",
                "title": "Blinding Lights",
                "artist": "The Weeknd",
                "thumbnail": "https://i.ytimg.com/vi/4NRXx6U8ABQ/hqdefault.jpg",
                "stream_url": ""
            }
        ]
        return jsonify(fallback_data), 200

@app.route('/api/lyrics', methods=['GET'])
def get_lyrics():
    artist = request.args.get('artist')
    title = request.args.get('title')

    if not artist or not title:
        return jsonify({"error": "Artist aur title dono zaroori hain"}), 400

    print(f"Fetching lyrics for: {title} by {artist}")
    try:
        url = f"https://api.lyrics.ovh/v1/{artist}/{title}"
        response = requests.get(url)
        data = response.json()

        if 'lyrics' in data:
            return jsonify({"lyrics": data['lyrics']})
        else:
            return jsonify({"error": "Is gaane ke lyrics API par available nahi hain"}), 404

    except Exception as e:
        print(f"Lyrics API Error: {e}")
        return jsonify({"error": "Backend failed to fetch lyrics"}), 500

@app.route('/api/user/sync', methods=['POST'])
def sync_user():
    data = request.json
    clerk_id = data.get('clerk_id')
    email = data.get('email')

    if not clerk_id:
        return jsonify({"error": "Clerk ID is strictly required"}), 400

    try:
        user = users_collection.find_one({"clerk_id": clerk_id})

        if not user:
            new_user = {
                "clerk_id": clerk_id,
                "email": email,
                "full_name": data.get('full_name', ''),
                "liked_songs": [],
                "playlists": []
            }
            users_collection.insert_one(new_user)
            print(f"New user created in Database: {email}")
            return jsonify({"message": "User profile initialized", "status": "new"}), 201

        return jsonify({"message": "User verified", "status": "existing"}), 200
    except Exception as e:
        print(f"User Sync Error: {e}")
        return jsonify({"error": "Database operation failed"}), 500

@app.route('/api/user/like', methods=['POST'])
def toggle_like():
    data = request.json
    clerk_id = data.get('clerk_id')
    song = data.get('song')

    if not clerk_id or not song or not song.get('videoId'):
        return jsonify({"error": "Missing user ID or song videoId"}), 400

    try:
        user = users_collection.find_one({"clerk_id": clerk_id})
        if not user:
            return jsonify({"error": "User not found"}), 404

        video_id = song.get('videoId')
        liked_songs = user.get('liked_songs', [])

        is_liked = any(s.get('videoId') == video_id for s in liked_songs)

        if is_liked:
            users_collection.update_one(
                {"clerk_id": clerk_id},
                {"$pull": {"liked_songs": {"videoId": video_id}}}
            )
            return jsonify({"message": "Removed from liked", "liked": False}), 200
        else:
            users_collection.update_one(
                {"clerk_id": clerk_id},
                {"$push": {"liked_songs": song}}
            )
            return jsonify({"message": "Added to liked", "liked": True}), 200

    except Exception as e:
        print(f"Like System Error: {e}")
        return jsonify({"error": "Failed to update liked songs"}), 500

@app.route('/api/user/liked', methods=['GET'])
def get_liked_songs():
    clerk_id = request.args.get('clerk_id')
    if not clerk_id:
        return jsonify({"error": "Clerk ID required"}), 400
    try:
        user = users_collection.find_one({"clerk_id": clerk_id})
        if not user:
            return jsonify({"songs": []}), 200
        return jsonify({"songs": user.get('liked_songs', [])}), 200
    except Exception as e:
        print(f"Get Liked Error: {e}")
        return jsonify({"error": "Failed to fetch liked songs"}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
