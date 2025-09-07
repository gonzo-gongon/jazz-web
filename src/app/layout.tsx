import type React from "react"
import { Providers } from "../components/providers"
import "./globals.css"

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    // 拡張機能（Google Analytics オプトアウトなど）でHydration Errorになるのを回避
    <html lang="ja" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Jazz Web - 東京ジャズライブハウス情報</title>
      </head>
      <body>
        <Providers>
          <main className="container mx-auto px-4 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
