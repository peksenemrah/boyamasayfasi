import Link from 'next/link'
import { ColoringPage } from '@/data/coloringPages'

interface Props {
  sayfa: ColoringPage
  sira?: number
}

const zorlukRenk = {
  kolay: 'bg-green-100 text-green-700',
  orta: 'bg-yellow-100 text-yellow-700',
  zor: 'bg-red-100 text-red-700',
}

export default function ColoringCard({ sayfa, sira }: Props) {
  return (
    <Link href={`/boyama/${sayfa.slug}`} className="card group block">
      {/* Görsel alanı */}
      <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 aspect-square flex items-center justify-center overflow-hidden">
        {sira && (
          <div className="absolute top-2 left-2 bg-purple-500 text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center z-10">
            {sira}
          </div>
        )}
        {sayfa.yeni && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full z-10">
            YENİ
          </div>
        )}
        {/* SVG önizleme */}
        <div className="w-full h-full p-3 group-hover:scale-105 transition-transform duration-300">
          <img
            src={`/coloring/${sayfa.svgDosya}`}
            alt={sayfa.baslik}
            className="w-full h-full object-contain"
          />
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/10 transition-colors flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-purple-500 text-white font-bold text-sm px-4 py-2 rounded-full shadow-lg">
            🎨 Boyamaya Başla
          </span>
        </div>
      </div>
      {/* Alt bilgi */}
      <div className="p-3">
        <h3 className="font-extrabold text-gray-800 text-sm truncate">{sayfa.baslik}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${zorlukRenk[sayfa.zorluk]}`}>
            {sayfa.zorluk === 'kolay' ? '😊 Kolay' : sayfa.zorluk === 'orta' ? '🤔 Orta' : '🧠 Zor'}
          </span>
        </div>
      </div>
    </Link>
  )
}
