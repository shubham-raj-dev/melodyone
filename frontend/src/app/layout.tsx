import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"
import Providers from "@/components/Providers"
import AppShell from "@/components/AppShell"

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
        <body className="min-h-full flex flex-col">
          <div className="fixed inset-0 bg-[#eef2f9] -z-10" />
          <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-200/40 rounded-full blur-[120px] pointer-events-none -z-10" />
          <div className="fixed bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-fuchsia-100/50 rounded-full blur-[150px] pointer-events-none -z-10" />
          <div className="fixed top-[20%] left-[30%] w-[40vw] h-[40vw] bg-blue-100/40 rounded-full blur-[100px] pointer-events-none -z-10" />
          <Providers><AppShell>{children}</AppShell></Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
