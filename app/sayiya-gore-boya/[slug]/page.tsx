'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { useState, useRef, useEffect, useCallback } from 'react'
import { sayiyaGoreBoyaSayfalari, cbnBulSlug } from '@/data/colorByNumbers'

interface Props { params: { slug: string } }

export default function SayiyaGoreBoyaSayfasi({ params }: Props) {
  const sayfa = cbnBulSlug(params.slug)
  if (!sayfa) notFound()

  const [seciliSayi, setSeciliSayi] = useState<number>(1)
  const [renkler, setRenkler] = useState<Record<string, string>>({})
  const [gecmis, setGecmis] = useState<Record<string, string>[]>([])
  const [svgIcerik, setSvgIcerik] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  const seciliRenk = sayfa.renkHaritasi.find(r => r.sayi === seciliSayi)?.renk || '#ffffff'

  useEffect(() => {
    fetch(`/coloring/${sayfa.svgDosya}`)
      .then(r => r.text())
      .then(setSvgIcerik)
      .catch(() => {
        // CBN SVG yoksa placeholder göster
        setSvgIcerik(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
          <rect width="400" height="400" fill="#f9fafb" rx="12"/>
          <text x="200" y="190" text-anchor="middle" font-size="18" fill="#9ca3af" font-family="sans-serif">Sayıya Göre Boya</text>
          <text x="200" y="220" text-anchor="middle" font-size="14" fill="#d1d5db" font-family="sans-serif">${sayfa.baslik}</text>
        </svg>`)
      })
  }, [sayfa.svgDosya, sayfa.baslik])

  useEffect(() => {
    if (!containerRef.current || !svgIcerik) return
    const svg = containerRef.current.querySelector('svg')
    if (!svg) return
    Object.entries(renkler).forEach(([id, renk]) => {
      const el = svg.querySelector(`[data-region="${id}"]`) as SVGElement | null
      if (el) el.style.fill = renk
    })
  }, [renkler, svgIcerik])

  useEffect(() => {
    if (!containerRef.current) return
    const handleClick = (e: MouseEvent) => {
      const target = e.target as SVGElement
      const region = target.getAttribute('data-region')
      if (!region) return
      setGecmis(prev => [...prev.slice(-19), { ...renkler }])
      setRenkler(prev => ({ ...prev, [region]: seciliRenk }))
    }
    containerRef.current.addEventListener('click', handleClick)
    return () => containerRef.current?.removeEventListener('click', handleClick)
  }, [seciliRenk, renkler])

  const geriAl = useCallback(() => {
    if (!gecmis.length) return
    const onceki = gecmis[gecmis.length - 1]
    setGecmis(p => p.slice(0, -1))
    setRenkler(onceki)
    if (containerRef.current) {
      const svg = containerRef.current.querySelector('svg')
      svg?.querySelectorAll('[data-region]').forEach(el => {
        const id = el.getAttribute('data-region')!
        ;(el as SVGElement).style.fill = onceki[id] || 'white'
      })
    }
  }, [gecmis])

  const sifirla = () => {
    if (!confirm('Tüm renkler silinecek. Emin misin?')) return
    setRenkler({})
    containerRef.current?.querySelector('svg')?.querySelectorAll('[data-region]').forEach(el => {
      (el as SVGElement).style.fill = 'white'
    })
  }

  return (
    <div>
      <nav className="text-sm text-gray-500 mb-4 flex items-center gap-1 flex-wrap">
        <Link href="/" className="hover:text-purple-600">Ana Sayfa</Link>
        <span>›</span>
        <Link href="/sayiya-gore-boya" className="hover:text-purple-600">Sayıya Göre Boya</Link>
        <span>›</span>
        <span className="text-gray-800 font-semibold">{sayfa.baslik}</span>
      </nav>

      <h1 className="text-2xl font-black text-gray-800 mb-4">{sayfa.baslik}</h1>

      <div className="bg-white rounded-2xl shadow-lg p-4">
        {/* Renk tablosu */}
        <div className="mb-4">
          <div className="font-bold text-gray-700 mb-2 text-sm">Renk Tablosu — Sayıya tıklayarak seç:</div>
          <div className="flex gap-3 flex-wrap">
            {sayfa.renkHaritasi.map(r => (
              <button
                key={r.sayi}
                onClick={() => setSeciliSayi(r.sayi)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 transition-all font-bold ${
                  seciliSayi === r.sayi
                    ? 'border-gray-800 shadow-md scale-105'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <span className="w-8 h-8 rounded-lg border-2 border-gray-200 flex items-center justify-center font-black text-lg"
                  style={{ backgroundColor: r.renk, color: r.renk === '#ffffff' || r.renk === '#fbbf24' ? '#374151' : 'white' }}>
                  {r.sayi}
                </span>
                <span className="text-sm text-gray-600">{r.ad}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Araç çubuğu */}
        <div className="flex gap-2 mb-4 flex-wrap">
          <button onClick={geriAl} disabled={!gecmis.length}
            className="bg-gray-100 hover:bg-gray-200 disabled:opacity-40 text-gray-700 font-bold text-sm px-3 py-2 rounded-xl">
            ↩️ Geri Al
          </button>
          <button onClick={sifirla}
            className="bg-red-100 hover:bg-red-200 text-red-700 font-bold text-sm px-3 py-2 rounded-xl">
            🗑️ Sıfırla
          </button>
          <button onClick={() => window.print()}
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold text-sm px-3 py-2 rounded-xl">
            🖨️ Yazdır
          </button>
          <div className="ml-auto flex items-center gap-2 text-sm text-gray-500">
            <span>Seçili:</span>
            <span className="w-8 h-8 rounded-lg border-2 border-gray-300 inline-block"
              style={{ backgroundColor: seciliRenk }} />
            <span className="font-bold">{seciliSayi}</span>
          </div>
        </div>

        {/* SVG Alanı */}
        <div
          ref={containerRef}
          className="border-2 border-dashed border-gray-200 rounded-xl overflow-hidden cursor-crosshair"
          dangerouslySetInnerHTML={{ __html: svgIcerik }}
          style={{ maxWidth: '500px', margin: '0 auto' }}
        />

        <div className="mt-4 bg-yellow-50 rounded-xl p-3 text-sm text-yellow-800">
          <strong>Nasıl oynanır?</strong> Yukarıdaki renk tablosundan bir sayıya tıkla, sonra resimdeki o numaralı bölgeye tıkla!
        </div>
      </div>

      {/* Diğer CBN sayfaları */}
      <div className="mt-8">
        <h2 className="section-title">🔢 Diğer Sayıya Göre Boya Sayfaları</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sayiyaGoreBoyaSayfalari.filter(s => s.id !== sayfa.id).map(s => (
            <Link key={s.id} href={`/sayiya-gore-boya/${s.slug}`}
              className="card p-4 flex items-center gap-3 group">
              <div className="text-3xl">{s.renkSayisi <= 4 ? '😊' : s.renkSayisi <= 6 ? '🤔' : '🧠'}</div>
              <div>
                <div className="font-bold text-gray-800 group-hover:text-purple-600 transition-colors text-sm">{s.baslik}</div>
                <div className="text-xs text-gray-500">{s.renkSayisi} renk · {s.zorluk}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
