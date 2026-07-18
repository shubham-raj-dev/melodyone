from flask import Blueprint, request, jsonify
from api.models import (
    create_playlist,
    get_playlists,
    add_song_to_playlist,
    get_playlist_songs,
    remove_song_from_playlist,
    add_favorite,
    get_favorites,
    remove_favorite,
)
from api.ytdlp_engine import search_songs, get_audio_url

api_bp = Blueprint("api", __name__, url_prefix="/api")


@api_bp.route("/search", methods=["GET"])
def search():
    query = request.args.get("q", "")
    if not query:
        return jsonify({"error": "Query parameter 'q' is required"}), 400
    try:
        results = search_songs(query)
        return jsonify({"results": results})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api_bp.route("/audio", methods=["GET"])
def audio():
    video_url = request.args.get("url", "")
    if not video_url:
        return jsonify({"error": "URL parameter 'url' is required"}), 400
    try:
        data = get_audio_url(video_url)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api_bp.route("/playlists", methods=["GET"])
def list_playlists():
    playlists = get_playlists()
    return jsonify({"playlists": playlists})


@api_bp.route("/playlists", methods=["POST"])
def new_playlist():
    data = request.get_json(silent=True) or {}
    name = data.get("name", "New Playlist")
    playlist_id = create_playlist(name)
    return jsonify({"id": playlist_id, "name": name}), 201


@api_bp.route("/playlists/<int:playlist_id>/songs", methods=["GET"])
def playlist_songs(playlist_id):
    songs = get_playlist_songs(playlist_id)
    return jsonify({"songs": songs})


@api_bp.route("/playlists/<int:playlist_id>/songs", methods=["POST"])
def add_song(playlist_id):
    data = request.get_json(silent=True) or {}
    if not data.get("title") or not data.get("video_url"):
        return jsonify({"error": "title and video_url are required"}), 400
    song_id = add_song_to_playlist(playlist_id, data)
    return jsonify({"id": song_id}), 201


@api_bp.route("/playlists/songs/<int:song_id>", methods=["DELETE"])
def remove_song(song_id):
    remove_song_from_playlist(song_id)
    return jsonify({"message": "Song removed"}), 200


@api_bp.route("/favorites", methods=["GET"])
def list_favorites():
    favorites = get_favorites()
    return jsonify({"favorites": favorites})


@api_bp.route("/favorites", methods=["POST"])
def add_fav():
    data = request.get_json(silent=True) or {}
    if not data.get("title") or not data.get("video_url"):
        return jsonify({"error": "title and video_url are required"}), 400
    fav_id = add_favorite(data)
    return jsonify({"id": fav_id}), 201


@api_bp.route("/favorites/<int:fav_id>", methods=["DELETE"])
def remove_fav(fav_id):
    remove_favorite(fav_id)
    return jsonify({"message": "Favorite removed"}), 200
