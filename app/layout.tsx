import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import type { Metadata } from "next"
import type React from "react"
import { Suspense } from "react"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "@/components/providers"

export const metadata: Metadata = {
  title: "Jazz Web - 東京ジャズライブハウス情報",
  description:
    "Tokyo Jazz Live House Information - Find the best jazz events in Tokyo",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {/* 拡張機能（Google Analytics オプトアウトなど）でHydration Errorになるのを回避 */}
      <html lang="ja" suppressHydrationWarning>
        <body
          className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}
        >
          <Providers>
            <Suspense fallback={null}>{children}</Suspense>
          </Providers>
          <Analytics />
        </body>
      </html>
    </>
  )
}
