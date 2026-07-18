from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from engine import fetch_audio_stream

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "https://melodyone.vercel.app"])
limiter = Limiter(get_remote_address, app=app, default_limits=["200 per day", "50 per hour"])

@app.after_request
def add_security_headers(response):
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
    return response

SPOTIPY_CLIENT_ID = 'your_spotify_client_id'
SPOTIPY_CLIENT_SECRET = 'your_spotify_client_secret'

sp = None
try:
    sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(
        client_id=SPOTIPY_CLIENT_ID,
        client_secret=SPOTIPY_CLIENT_SECRET
    ))
except:
    print("Spotify credentials not configured. Falling back to yt-dlp only.")

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "service": "melodyone-backend"})

@app.route('/', methods=['GET'])
def home():
    return "<h1>MelodyOne Backend is Running</h1><p>API: /api/search?song=NAME</p>"

@app.route('/api/search', methods=['GET'])
@limiter.limit("30 per minute")
def search_song():
    query = request.args.get('song')
    if not query:
        return jsonify({"error": "Song name required"}), 400

    # Try Spotify first
    if sp:
        try:
            results = sp.search(q=query, limit=1, type='track')
            tracks = results['tracks']['items']
            if tracks:
                track = tracks[0]
                data = {
                    "title": track['name'],
                    "artist": track['artists'][0]['name'],
                    "thumbnail": track['album']['images'][0]['url'] if track['album']['images'] else None,
                    "stream_url": track['preview_url']
                }
                if data['stream_url']:
                    return jsonify(data)
        except Exception as e:
            print(f"Spotify error: {e}")

    # Fallback to yt-dlp
    print(f"Falling back to yt-dlp for: {query}")
    result = fetch_audio_stream(query)
    if result:
        return jsonify(result)
    return jsonify({"error": "Gaana nahi mila"}), 404

if __name__ == '__main__':
    app.run(debug=True)
