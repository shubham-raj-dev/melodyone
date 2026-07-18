import yt_dlp
from api.config import YTDLP_OPTIONS


def search_songs(query, max_results=5):
    search_query = f"ytsearch{max_results}:{query}"
    options = {**YTDLP_OPTIONS, "noplaylist": True}
    with yt_dlp.YoutubeDL(options) as ydl:
        info = ydl.extract_info(search_query, download=False)
        entries = info.get("entries", [])
        results = []
        for entry in entries:
            results.append({
                "title": entry.get("title", "Unknown Title"),
                "artist": entry.get("uploader", "Unknown Artist"),
                "duration": _format_duration(entry.get("duration", 0)),
                "thumbnail": entry.get("thumbnail", ""),
                "video_url": f"https://www.youtube.com/watch?v={entry.get('id', '')}",
                "audio_url": _get_audio_url(entry),
            })
        return results


def get_audio_url(video_url):
    options = {**YTDLP_OPTIONS, "noplaylist": True}
    with yt_dlp.YoutubeDL(options) as ydl:
        info = ydl.extract_info(video_url, download=False)
        return {
            "title": info.get("title", "Unknown Title"),
            "artist": info.get("uploader", "Unknown Artist"),
            "duration": _format_duration(info.get("duration", 0)),
            "thumbnail": info.get("thumbnail", ""),
            "video_url": video_url,
            "audio_url": _get_audio_url(info),
        }


def _get_audio_url(info):
    # Priority 1: Direct url from yt-dlp's format selection
    direct_url = info.get("url")
    if direct_url:
        return direct_url

    # Priority 2: Best audio from formats list
    formats = info.get("formats", [])
    preferred = ["m4a", "webm", "mp4"]
    for ext in preferred:
        for fmt in formats:
            if fmt.get("acodec") and fmt.get("acodec") != "none":
                if fmt.get("ext") == ext and fmt.get("url"):
                    return fmt.get("url")
    for fmt in formats:
        if fmt.get("acodec") and fmt.get("acodec") != "none" and fmt.get("url"):
            return fmt.get("url")

    return ""


def _format_duration(seconds):
    if not seconds:
        return "0:00"
    minutes = seconds // 60
    secs = seconds % 60
    return f"{minutes}:{secs:02d}"
