import Link from 'next/link'
import type { Metadata } from 'next'
import { kategoriler } from '@/data/categories'
import { getSayfalar } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Site Haritası',
}

export default async function SiteHaritasi() {
  const boyamaSayfalari = await getSayfalar()

  return (
    <div>
      <h1 className="text-2xl font-black text-gray-800 mb-6">🗺️ Site Haritası</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="font-black text-lg text-gray-700 mb-3 border-b pb-2">Ana Sayfalar</h2>
          <ul className="space-y-2">
            <li><Link href="/" className="text-purple-600 hover:underline font-semibold">🏠 Ana Sayfa</Link></li>
            <li><Link href="/en-populer-boyama-sayfalari" className="text-purple-600 hover:underline font-semibold">🔥 En Popüler Boyama Sayfaları</Link></li>
            <li><Link href="/yeni-boyama-sayfalari" className="text-purple-600 hover:underline font-semibold">🆕 Yeni Boyama Sayfaları</Link></li>
            <li><Link href="/sayiya-gore-boya" className="text-purple-600 hover:underline font-semibold">🔢 Sayıya Göre Boya</Link></li>
            <li><Link href="/iletisim" className="text-purple-600 hover:underline font-semibold">📧 İletişim</Link></li>
          </ul>

          <h2 className="font-black text-lg text-gray-700 mb-3 border-b pb-2 mt-6">Kategoriler</h2>
          <ul className="space-y-1 columns-2">
            {kategoriler.filter(k => k.grup !== 'ozel').map(k => (
              <li key={k.slug}>
                <Link href={`/kategori/${k.slug}`} className="text-purple-600 hover:underline text-sm">
                  {k.emoji} {k.ad}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-black text-lg text-gray-700 mb-3 border-b pb-2">
            Tüm Boyama Sayfaları ({boyamaSayfalari.length})
          </h2>
          <ul className="space-y-1">
            {boyamaSayfalari.map((s, i) => (
              <li key={s.id} className="flex items-center gap-2">
                <span className="text-gray-400 text-xs font-mono w-6">#{i + 1}</span>
                <Link href={`/boyama/${s.slug}`} className="text-purple-600 hover:underline text-sm">
                  {s.baslik}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
