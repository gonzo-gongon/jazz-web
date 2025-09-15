import type { NextRequest } from "next/server"

export const runtime = "edge"

// Cloudflare環境変数の型定義
interface CloudflareEnv {
  GQL: Fetcher
}

export async function POST(request: NextRequest) {
  try {
    // Cloudflare service binding経由でGraphQLにアクセス
    const env = process.env as unknown as CloudflareEnv
    if (!env.GQL) {
      return new Response("GraphQL service not available", { status: 503 })
    }

    const response = await env.GQL.fetch(request)

    const data = await response.text()

    return new Response(data, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("GraphQL proxy error:", error)
    return new Response(
      JSON.stringify({
        error: "Internal server error" + `${error}`,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}

export async function OPTIONS() {
  return new Response(null, { status: 200 })
}
