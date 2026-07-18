import yt_dlp

def fetch_audio_stream(song_name):
    print(f"Searching YouTube for: '{song_name}'\n")

    ydl_opts = {
        'format': 'bestaudio/best',
        'noplaylist': True,
        'quiet': True,
        'extract_flat': False,
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            result = ydl.extract_info(f"ytsearch1:{song_name}", download=False)

            if 'entries' in result and len(result['entries']) > 0:
                song = result['entries'][0]

                print("Song Found Successfully!")
                print("-" * 30)
                print(f"Title: {song.get('title')}")
                print(f"Duration: {song.get('duration')} seconds")
                print(f"Thumbnail: {song.get('thumbnail')}")
                print(f"Direct Audio Stream URL:\n{song.get('url')}\n")

                return {
                    "title": song.get('title'),
                    "stream_url": song.get('url'),
                    "thumbnail": song.get('thumbnail'),
                    "artist": song.get('uploader', 'Unknown Artist')
                }
            else:
                print("Koi gaana nahi mila.")
                return None

    except Exception as e:
        print(f"Error aa gaya bhai: {e}")
        return None

if __name__ == "__main__":
    test_song = "Pasoori Coke Studio"
    fetch_audio_stream(test_song)
