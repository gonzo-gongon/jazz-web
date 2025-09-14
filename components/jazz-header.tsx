import { Music } from "lucide-react"

export function JazzHeader() {
  return (
    <header className="relative bg-gradient-to-r from-red-600 to-red-700 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/jazz-instruments-silhouettes.jpg')] bg-cover bg-center" />
      </div>

      <div className="relative container mx-auto px-4 py-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-yellow-500 rounded-full">
            <Music className="h-8 w-8 text-yellow-900" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-balance text-white">Jazz Web</h1>
            <p className="text-xl md:text-2xl font-light opacity-90 text-white">東京ジャズライブハウス情報</p>
          </div>
        </div>
      </div>
    </header>
  )
}
