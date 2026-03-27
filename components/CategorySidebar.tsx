import Link from 'next/link'
import { kategoriler, grupAdlari } from '@/data/categories'

export default function CategorySidebar() {
  const gruplar = Object.keys(grupAdlari).filter(g => g !== 'ozel')

  return (
    <aside className="w-56 shrink-0 hidden lg:block">
      <div className="bg-white rounded-2xl shadow-md p-4 sticky top-4">
        <h2 className="font-black text-gray-700 text-sm uppercase tracking-wide mb-3 px-1">
          Kategoriler
        </h2>
        {gruplar.map(grup => {
          const items = kategoriler.filter(k => k.grup === grup)
          return (
            <div key={grup} className="mb-3">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1 mb-1">
                {grupAdlari[grup]}
              </div>
              {items.map(kat => (
                <Link
                  key={kat.slug}
                  href={`/kategori/${kat.slug}`}
                  className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-purple-50 hover:text-purple-700 text-gray-600 text-sm font-semibold transition-colors group"
                >
                  <span className="text-base">{kat.emoji}</span>
                  <span className="truncate group-hover:text-purple-700">{kat.ad}</span>
                </Link>
              ))}
            </div>
          )
        })}
      </div>
    </aside>
  )
}
