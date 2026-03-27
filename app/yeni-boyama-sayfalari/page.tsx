import type { Metadata } from 'next'
import ColoringCard from '@/components/ColoringCard'
import { getYeniSayfalar } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Yeni Boyama Sayfaları',
  description: 'Son eklenen ücretsiz boyama sayfaları. Online boyayın veya yazdırın!',
}

export default async function YeniSayfalar() {
  const sayfalar = await getYeniSayfalar(50)
  return (
    <div>
      <h1 className="text-2xl font-black text-gray-800 mb-2">🆕 Yeni Boyama Sayfaları</h1>
      <p className="text-gray-600 mb-6">En son eklenen boyama sayfaları burada!</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {sayfalar.map(s => <ColoringCard key={s.id} sayfa={s} />)}
      </div>
    </div>
  )
}
