import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="text-4xl group-hover:scale-110 transition-transform">🎨</div>
            <div>
              <div className="text-white font-black text-xl leading-tight drop-shadow">
                boyamasayfasi.com
              </div>
              <div className="text-white/80 text-xs font-semibold">
                Ücretsiz Boyama Sayfaları
              </div>
            </div>
          </Link>

          {/* Nav */}
          <nav className="flex flex-wrap items-center gap-1">
            <Link
              href="/en-populer-boyama-sayfalari"
              className="bg-white/20 hover:bg-white/30 text-white font-bold text-sm px-4 py-2 rounded-full transition-all"
            >
              🔥 En Popüler
            </Link>
            <Link
              href="/yeni-boyama-sayfalari"
              className="bg-white/20 hover:bg-white/30 text-white font-bold text-sm px-4 py-2 rounded-full transition-all"
            >
              🆕 Yeni Sayfalar
            </Link>
            <Link
              href="/sayiya-gore-boya"
              className="bg-yellow-300 hover:bg-yellow-400 text-yellow-900 font-black text-sm px-4 py-2 rounded-full transition-all shadow"
            >
              🔢 Sayıya Göre Boya
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
