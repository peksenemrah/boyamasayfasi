'use client'

import { useState } from 'react'
import { kategoriler } from '@/data/categories'

const kategorilerFiltreli = kategoriler.filter(k => k.grup !== 'ozel')

export default function GeneratePage() {
  const [baslik, setBaslik] = useState('')
  const [kategori, setKategori] = useState(kategorilerFiltreli[0].slug)
  const [zorluk, setZorluk] = useState<'kolay' | 'orta' | 'zor'>('kolay')
  const [svg, setSvg] = useState('')
  const [yukleniyor, setYukleniyor] = useState(false)
  const [kaydediliyor, setKaydediliyor] = useState(false)
  const [mesaj, setMesaj] = useState('')

  const olustur = async () => {
    if (!baslik.trim()) { setMesaj('Başlık girin'); return }
    setYukleniyor(true)
    setMesaj('')
    setSvg('')
    try {
      const res = await fetch('/api/generate-svg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ baslik, kategori, zorluk }),
      })
      const data = await res.json()
      if (data.svg) setSvg(data.svg)
      else setMesaj('SVG üretilemedi, tekrar dene.')
    } catch {
      setMesaj('Hata oluştu.')
    } finally {
      setYukleniyor(false)
    }
  }

  const kaydet = async () => {
    if (!svg) return
    setKaydediliyor(true)
    setMesaj('')
    try {
      const res = await fetch('/api/save-to-sanity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ baslik, kategori, zorluk, svgContent: svg }),
      })
      const data = await res.json()
      if (data.success) {
        setMesaj(`✅ Kaydedildi! Sayfa: /boyama/${data.slug}`)
        setSvg('')
        setBaslik('')
      } else {
        setMesaj('Kayıt başarısız.')
      }
    } catch {
      setMesaj('Kayıt hatası.')
    } finally {
      setKaydediliyor(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-black text-gray-800 mb-6">🤖 AI ile Boyama Sayfası Üret</h1>

        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="md:col-span-1">
              <label className="block text-sm font-bold text-gray-700 mb-1">Kategori</label>
              <select
                value={kategori}
                onChange={e => setKategori(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-purple-400"
              >
                {kategorilerFiltreli.map(k => (
                  <option key={k.slug} value={k.slug}>{k.emoji} {k.ad}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm font-bold text-gray-700 mb-1">Başlık</label>
              <input
                type="text"
                value={baslik}
                onChange={e => setBaslik(e.target.value)}
                placeholder="Örn: Sevimli Kedi"
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-purple-400"
                onKeyDown={e => e.key === 'Enter' && olustur()}
              />
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm font-bold text-gray-700 mb-1">Zorluk</label>
              <select
                value={zorluk}
                onChange={e => setZorluk(e.target.value as 'kolay' | 'orta' | 'zor')}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-purple-400"
              >
                <option value="kolay">😊 Kolay</option>
                <option value="orta">🤔 Orta</option>
                <option value="zor">🧠 Zor</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={olustur}
              disabled={yukleniyor}
              className="bg-purple-500 hover:bg-purple-600 disabled:opacity-50 text-white font-black px-6 py-2.5 rounded-xl transition-colors"
            >
              {yukleniyor ? '⏳ Üretiliyor...' : '✨ Üret'}
            </button>

            {svg && (
              <button
                onClick={olustur}
                disabled={yukleniyor}
                className="bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-700 font-bold px-6 py-2.5 rounded-xl transition-colors"
              >
                🔄 Yeniden Üret
              </button>
            )}

            {svg && (
              <button
                onClick={kaydet}
                disabled={kaydediliyor}
                className="bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white font-black px-6 py-2.5 rounded-xl transition-colors ml-auto"
              >
                {kaydediliyor ? '💾 Kaydediliyor...' : '💾 Sanity\'e Kaydet'}
              </button>
            )}
          </div>

          {mesaj && (
            <p className={`mt-3 text-sm font-semibold ${mesaj.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
              {mesaj}
            </p>
          )}
        </div>

        {svg && (
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-black text-gray-700 mb-4">Önizleme — {baslik}</h2>
            <div
              className="border-2 border-dashed border-gray-200 rounded-xl overflow-hidden"
              style={{ maxWidth: 400 }}
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
