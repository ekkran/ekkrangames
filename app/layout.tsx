import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EKKRAN GAMES",
  description: "Game dev studio based in Costa Rica",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " flex flex-col h-screen"}>
        {children}
      </body>
    </html>
  )
}
