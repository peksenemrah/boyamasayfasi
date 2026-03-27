export const revalidate = 60

import Link from 'next/link'
import ColoringCard from '@/components/ColoringCard'
import { sayiyaGoreBoyaSayfalari } from '@/data/colorByNumbers'
import { getSayfalar, getEnPopuler, getYeniSayfalar } from '@/lib/data'

export default async function AnaSayfa() {
  const [populer, yeni, tumSayfalar] = await Promise.all([
    getEnPopuler(8),
    getYeniSayfalar(8),
    getSayfalar(),
  ])
  const rastgele = [...tumSayfalar].sort(() => Math.random() - 0.5).slice(0, 8)

  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-purple-500 via-pink-400 to-orange-300 rounded-3xl p-8 text-white text-center shadow-xl">
        <div className="text-6xl mb-3">🎨</div>
        <h1 className="text-3xl font-black mb-2 drop-shadow">Ücretsiz Boyama Sayfaları!</h1>
        <p className="text-white/90 font-semibold text-lg mb-4">
          1000+ boyama sayfası — online boyayın veya yazdırın!
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/en-populer-boyama-sayfalari"
            className="bg-white text-purple-600 font-black px-6 py-3 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm">
            🔥 En Popüler
          </Link>
          <Link href="/yeni-boyama-sayfalari"
            className="bg-white/20 text-white border-2 border-white/50 font-bold px-6 py-3 rounded-2xl hover:bg-white/30 transition-all text-sm">
            🆕 Yeni Sayfalar
          </Link>
          <Link href="/sayiya-gore-boya"
            className="bg-yellow-400 text-yellow-900 font-black px-6 py-3 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm">
            🔢 Sayıya Göre Boya
          </Link>
        </div>
      </div>

      {/* Yeni Eklenenler */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">🆕 Yeni Eklenenler</h2>
          <Link href="/yeni-boyama-sayfalari" className="text-purple-600 font-bold text-sm hover:underline">
            Tümünü Gör →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {yeni.map(s => <ColoringCard key={s.id} sayfa={s} />)}
        </div>
      </section>

      {/* Sayıya Göre Boya Tanıtım */}
      <section className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
        <div className="flex items-start gap-4 flex-wrap">
          <div className="text-5xl">🔢</div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-black text-gray-800 mb-1">Sayıya Göre Boya</h2>
            <p className="text-gray-600 text-sm mb-3">
              Her bölgedeki sayıya karşılık gelen rengi seçerek boyama yapabilirsin! Hem eğlenceli hem öğretici.
            </p>
            <div className="flex gap-3 flex-wrap">
              {sayiyaGoreBoyaSayfalari.slice(0, 3).map(s => (
                <Link key={s.id} href={`/sayiya-gore-boya/${s.slug}`}
                  className="bg-white border border-yellow-300 hover:border-yellow-500 text-gray-700 font-bold text-sm px-4 py-2 rounded-xl transition-all hover:shadow-md">
                  {s.baslik}
                </Link>
              ))}
              <Link href="/sayiya-gore-boya"
                className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-black text-sm px-4 py-2 rounded-xl transition-all">
                Tümünü Gör →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* En Popüler */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">🔥 En Popüler Boyamalar</h2>
          <Link href="/en-populer-boyama-sayfalari" className="text-purple-600 font-bold text-sm hover:underline">
            Tümünü Gör →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {populer.map((s, i) => <ColoringCard key={s.id} sayfa={s} sira={i + 1} />)}
        </div>
      </section>

      {/* Rastgele Seçki */}
      <section>
        <h2 className="section-title">🎲 Keşfet</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {rastgele.map(s => <ColoringCard key={s.id} sayfa={s} />)}
        </div>
      </section>
    </div>
  )
}
