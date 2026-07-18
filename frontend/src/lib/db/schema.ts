import { pgTable, text, uuid, timestamp, boolean, integer } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  imageUrl: text('image_url'),
  subscriptionId: text('subscription_id'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const playlists = pgTable('playlists', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  coverUrl: text('cover_url'),
  isPublic: boolean('is_public').default(false),
  createdAt: timestamp('created_at').defaultNow(),
})

export const tracks = pgTable('tracks', {
  id: uuid('id').defaultRandom().primaryKey(),
  playlistId: uuid('playlist_id').references(() => playlists.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  artist: text('artist'),
  youtubeUrl: text('youtube_url'),
  thumbnail: text('thumbnail'),
  duration: integer('duration'),
  position: integer('position').notNull(),
  addedAt: timestamp('added_at').defaultNow(),
})

export const favorites = pgTable('favorites', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  artist: text('artist'),
  streamUrl: text('stream_url'),
  thumbnail: text('thumbnail'),
  createdAt: timestamp('created_at').defaultNow(),
})
