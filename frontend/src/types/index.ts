export interface Song {
  title: string
  artist: string
  stream_url: string
  thumbnail: string
}

export interface Playlist {
  id: string
  userId: string
  name: string
  description: string | null
  coverUrl: string | null
  isPublic: boolean
  createdAt: Date
}

export interface Track {
  id: string
  playlistId: string
  title: string
  artist: string | null
  youtubeUrl: string | null
  thumbnail: string | null
  duration: number | null
  position: number
}
