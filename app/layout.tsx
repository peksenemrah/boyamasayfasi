import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CategorySidebar from '@/components/CategorySidebar'

export const metadata: Metadata = {
  title: {
    default: 'Boyama Sayfası - Ücretsiz Çocuk Boyama Sayfaları',
    template: '%s | boyamasayfasi.com',
  },
  description: 'Çocuklar için ücretsiz online boyama sayfaları. 1000+ boyama sayfasını online boyayın veya yazdırın!',
  keywords: 'boyama sayfası, çocuk boyama, ücretsiz boyama, online boyama, boyama kitabı',
  openGraph: {
    siteName: 'boyamasayfasi.com',
    locale: 'tr_TR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-6 items-start">
            <CategorySidebar />
            <main className="flex-1 min-w-0">
              {children}
            </main>
          </div>
        </div>
        <Footer />
      </body>
    </html>
  )
}
