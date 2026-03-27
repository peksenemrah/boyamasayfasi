import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import ColoringCard from '@/components/ColoringCard'
import { kategoriler } from '@/data/categories'
import { kategoriSayfalari } from '@/data/coloringPages'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return kategoriler.map(k => ({ slug: k.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const kat = kategoriler.find(k => k.slug === params.slug)
  if (!kat) return {}
  return {
    title: `${kat.ad} Boyama Sayfaları`,
    description: `${kat.ad} temalı ücretsiz boyama sayfaları. Online boyayın veya yazdırın!`,
  }
}

export default function KategoriSayfasi({ params }: Props) {
  const kat = kategoriler.find(k => k.slug === params.slug)
  if (!kat) notFound()

  const sayfalar = kategoriSayfalari(kat.slug)

  return (
    <div>
      <nav className="text-sm text-gray-500 mb-4 flex items-center gap-1">
        <Link href="/" className="hover:text-purple-600">Ana Sayfa</Link>
        <span>›</span>
        <span className="text-gray-800 font-semibold">{kat.emoji} {kat.ad}</span>
      </nav>

      <h1 className="text-2xl font-black text-gray-800 mb-2">
        {kat.emoji} {kat.ad} Boyama Sayfaları
      </h1>
      <p className="text-gray-600 mb-6">
        {kat.ad} temalı ücretsiz boyama sayfaları. Online boyayabilir veya yazdırabilirsiniz!
      </p>

      {sayfalar.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-6xl mb-4">{kat.emoji}</div>
          <p className="font-semibold">Bu kategori yakında eklenecek!</p>
          <Link href="/" className="mt-4 inline-block text-purple-600 hover:underline font-bold">
            Ana Sayfaya Dön
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {sayfalar.map(s => <ColoringCard key={s.id} sayfa={s} />)}
        </div>
      )}
    </div>
  )
}
