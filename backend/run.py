from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import requests

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
        response = requests.get(url, timeout=10)
        data = response.json()

        results = data.get('feed', {}).get('results', [])
        if not results:
            return jsonify({"error": "Trending data nahi mila"}), 404

        trending_tracks = []
        for track in results[:4]:
            trending_tracks.append({
                "title": track['name'],
                "artist": track['artistName'],
                "thumbnail": track['artworkUrl100'].replace('100x100', '600x600'),
                "stream_url": ""  # Search se milega jab user click kare
            })

        return jsonify(trending_tracks)

    except Exception as e:
        print(f"Apple RSS Error: {e}")
        return jsonify({"error": "Backend code mein issue hai"}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
