import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import ColoringEngine from '@/components/ColoringEngine'
import ColoringCard from '@/components/ColoringCard'
import { kategoriler } from '@/data/categories'
import {
  getSayfaBySlug,
  getSlugListesi,
  getIlgiliSayfalar,
  getYeniSayfalar,
} from '@/lib/data'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugler = await getSlugListesi()
  return slugler
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const sayfa = await getSayfaBySlug(params.slug)
  if (!sayfa) return {}
  return {
    title: `${sayfa.baslik} Boyama Sayfası`,
    description: sayfa.aciklama.slice(0, 155),
  }
}

export default async function BoyamaSayfasi({ params }: Props) {
  const sayfa = await getSayfaBySlug(params.slug)
  if (!sayfa) notFound()

  const [ilgili, sonEklenenler] = await Promise.all([
    getIlgiliSayfalar(sayfa, 8),
    getYeniSayfalar(8),
  ])

  const kategoriAd = kategoriler.find(k => k.slug === sayfa.kategori)

  const zorlukRenk = {
    kolay: 'bg-green-100 text-green-700',
    orta: 'bg-yellow-100 text-yellow-700',
    zor: 'bg-red-100 text-red-700',
  }

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4 flex items-center gap-1 flex-wrap">
        <Link href="/" className="hover:text-purple-600">Ana Sayfa</Link>
        <span>›</span>
        <Link href={`/kategori/${sayfa.kategori}`} className="hover:text-purple-600">
          {kategoriAd?.emoji} {kategoriAd?.ad ?? sayfa.kategori}
        </Link>
        <span>›</span>
        <span className="text-gray-800 font-semibold truncate">{sayfa.baslik}</span>
      </nav>

      <h1 className="text-2xl font-black text-gray-800 mb-2">
        {sayfa.baslik} Boyama Sayfası
      </h1>

      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${zorlukRenk[sayfa.zorluk]}`}>
          {sayfa.zorluk === 'kolay' ? '😊 Kolay' : sayfa.zorluk === 'orta' ? '🤔 Orta' : '🧠 Zor'}
        </span>
        {sayfa.yeni && (
          <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">🆕 Yeni</span>
        )}
        <Link href={`/kategori/${sayfa.kategori}`}
          className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-0.5 rounded-full hover:bg-purple-200 transition-colors">
          {kategoriAd?.emoji} {kategoriAd?.ad}
        </Link>
      </div>

      <p className="text-gray-600 mb-6 leading-relaxed">{sayfa.aciklama}</p>

      <ColoringEngine svgDosya={sayfa.svgDosya} baslik={sayfa.baslik} />

      {ilgili.length > 0 && (
        <section className="mt-10">
          <h2 className="section-title">🎨 Benzer Boyama Sayfaları</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {ilgili.map(s => <ColoringCard key={s.id} sayfa={s} />)}
          </div>
        </section>
      )}

      <section className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">🆕 Son Eklenenler</h2>
          <Link href="/yeni-boyama-sayfalari" className="text-purple-600 font-bold text-sm hover:underline">
            Tümünü Gör →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {sonEklenenler.filter(s => s.id !== sayfa.id).slice(0, 8).map(s => (
            <ColoringCard key={s.id} sayfa={s} />
          ))}
        </div>
      </section>
    </div>
  )
}
