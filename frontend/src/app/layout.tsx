import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "MelodyOne - Stream YouTube Music",
  description: "Search and stream your favorite YouTube tracks. Create playlists, discover new music, and enjoy premium audio.",
  authors: [{ name: "Shubham Raj", url: "https://github.com/shubhamraj" }],
  creator: "Shubham Raj",
  icons: { icon: "/logo.png", apple: "/logo.png" },
  manifest: "/manifest.json",
  openGraph: {
    title: "MelodyOne - Stream YouTube Music",
    description: "Premium YouTube audio streaming with playlists and more.",
    type: "website",
    siteName: "MelodyOne",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider appearance={{ elements: { developmentBadge: { display: "none" } } }}>
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
        <body className="min-h-full flex flex-col">{children}</body>
      </html>
    </ClerkProvider>
  )
}
