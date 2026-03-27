import type { Metadata } from 'next'
import ColoringCard from '@/components/ColoringCard'
import { getEnPopuler } from '@/lib/data'

export const metadata: Metadata = {
  title: 'En Popüler Boyama Sayfaları',
  description: 'En çok sevilen ücretsiz boyama sayfaları. Online boyayın veya yazdırın!',
}

export default async function EnPopuler() {
  const sayfalar = await getEnPopuler(100)
  return (
    <div>
      <h1 className="text-2xl font-black text-gray-800 mb-2">🔥 En Popüler Boyama Sayfaları</h1>
      <p className="text-gray-600 mb-6">En çok sevilen ve boyanan sayfalar burada!</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {sayfalar.map((s, i) => <ColoringCard key={s.id} sayfa={s} sira={i + 1} />)}
      </div>
    </div>
  )
}
