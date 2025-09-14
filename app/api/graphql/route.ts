import type { NextRequest } from "next/server"

export const runtime = 'edge'

// Cloudflare環境変数の型定義
interface CloudflareEnv {
  GQL: {
    fetch: (url: string, init?: RequestInit) => Promise<Response>
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()

    // Cloudflare service binding経由でGraphQLにアクセス
    const env = process.env as unknown as CloudflareEnv
    if (!env.GQL) {
      return new Response("GraphQL service not available", { status: 503 })
    }

    const response = await env.GQL.fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 必要なヘッダーを転送
        ...(request.headers.get("authorization") && {
          authorization: request.headers.get("authorization") as string,
        }),
      },
      body,
    })

    const data = await response.text()

    return new Response(data, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("GraphQL proxy error:", error)
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export async function OPTIONS() {
  return new Response(null, { status: 200 })
}
