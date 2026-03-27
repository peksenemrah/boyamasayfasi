import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div>
            <div className="text-white font-black text-lg mb-2">🎨 boyamasayfasi.com</div>
            <p className="text-sm text-gray-400">
              Çocuklar için ücretsiz boyama sayfaları. Online boya veya yazdır!
            </p>
          </div>
          <div>
            <div className="font-bold text-white mb-2">Sayfalar</div>
            <ul className="space-y-1 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link></li>
              <li><Link href="/en-populer-boyama-sayfalari" className="hover:text-white transition-colors">En Popüler</Link></li>
              <li><Link href="/yeni-boyama-sayfalari" className="hover:text-white transition-colors">Yeni Sayfalar</Link></li>
              <li><Link href="/sayiya-gore-boya" className="hover:text-white transition-colors">Sayıya Göre Boya</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-bold text-white mb-2">Kategoriler</div>
            <ul className="space-y-1 text-sm">
              <li><Link href="/kategori/hayvanlar" className="hover:text-white transition-colors">🦁 Hayvanlar</Link></li>
              <li><Link href="/kategori/arabalar" className="hover:text-white transition-colors">🚗 Arabalar</Link></li>
              <li><Link href="/kategori/prenses" className="hover:text-white transition-colors">👸 Prenses</Link></li>
              <li><Link href="/kategori/mandala" className="hover:text-white transition-colors">🌀 Mandala</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-bold text-white mb-2">Bilgi</div>
            <ul className="space-y-1 text-sm">
              <li><Link href="/site-haritasi" className="hover:text-white transition-colors">Site Haritası</Link></li>
              <li><Link href="/iletisim" className="hover:text-white transition-colors">İletişim</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} boyamasayfasi.com — Tüm hakları saklıdır. Kişisel ve eğitim amaçlı kullanım serbesttir.
        </div>
      </div>
    </footer>
  )
}
