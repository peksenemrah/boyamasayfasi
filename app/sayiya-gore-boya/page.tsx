import Link from 'next/link'
import type { Metadata } from 'next'
import { sayiyaGoreBoyaSayfalari } from '@/data/colorByNumbers'

export const metadata: Metadata = {
  title: 'Sayıya Göre Boya',
  description: 'Çocuklar için sayıya göre boyama sayfaları. Hem eğlenceli hem öğretici!',
}

const zorlukRenk = {
  kolay: 'bg-green-100 text-green-700 border-green-200',
  orta: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  zor: 'bg-red-100 text-red-700 border-red-200',
}

export default function SayiyaGoreBoya() {
  return (
    <div>
      <h1 className="text-2xl font-black text-gray-800 mb-2">🔢 Sayıya Göre Boya</h1>
      <p className="text-gray-600 mb-2">
        Her bölgedeki sayıya karşılık gelen rengi seçerek boyama yapabilirsiniz!
        Hem eğlenceli hem de öğretici bu aktiviteyi deneyin.
      </p>
      <div className="bg-blue-50 rounded-xl p-4 mb-6 text-sm text-blue-700">
        <strong>Nasıl Oynanır?</strong> Renk tablosundaki sayı-renk eşleşmesine bakın.
        Her bölgedeki sayıya göre doğru rengi seçin ve boyayın!
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sayiyaGoreBoyaSayfalari.map(s => (
          <Link key={s.id} href={`/sayiya-gore-boya/${s.slug}`}
            className="card block group">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 aspect-square flex items-center justify-center p-6 relative">
              <div className="text-6xl group-hover:scale-110 transition-transform">
                {s.renkSayisi <= 4 ? '😊' : s.renkSayisi <= 6 ? '🤔' : '🧠'}
              </div>
              <div className="absolute top-2 right-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${zorlukRenk[s.zorluk]}`}>
                  {s.zorluk}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-extrabold text-gray-800 mb-2">{s.baslik}</h3>
              {/* Renk haritası önizleme */}
              <div className="flex gap-1 flex-wrap mb-3">
                {s.renkHaritasi.map(r => (
                  <div key={r.sayi} className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg px-1.5 py-0.5">
                    <span className="w-4 h-4 rounded-full border border-gray-200 shrink-0"
                      style={{ backgroundColor: r.renk }} />
                    <span className="text-xs font-bold text-gray-500">{r.sayi}</span>
                  </div>
                ))}
              </div>
              <span className="text-purple-600 font-bold text-sm group-hover:underline">
                Oynamaya Başla →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
