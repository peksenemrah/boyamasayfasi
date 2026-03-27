'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

const PALET = [
  '#ef4444', '#f97316', '#f59e0b', '#84cc16',
  '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6',
  '#6366f1', '#8b5cf6', '#a855f7', '#ec4899',
  '#f472b6', '#fb923c', '#fbbf24', '#4ade80',
  '#ffffff', '#e5e7eb', '#9ca3af', '#1f2937',
]

interface Props {
  svgDosya: string
  baslik: string
}

type RenkMap = Record<string, string>

export default function ColoringEngine({ svgDosya, baslik }: Props) {
  const [seciliRenk, setSeciliRenk] = useState(PALET[0])
  const [renkler, setRenkler] = useState<RenkMap>({})
  const [gecmis, setGecmis] = useState<RenkMap[]>([])
  const [svgIcerik, setSvgIcerik] = useState<string>('')
  const containerRef = useRef<HTMLDivElement>(null)

  // renkler için ref — onClick callback'inde stale closure'ı önler
  const renklerRef = useRef<RenkMap>({})
  useEffect(() => { renklerRef.current = renkler }, [renkler])

  // SVG dosyasını yükle
  useEffect(() => {
    fetch(`/coloring/${svgDosya}`)
      .then(r => r.text())
      .then(text => setSvgIcerik(text))
      .catch(() => setSvgIcerik(''))
  }, [svgDosya])

  // SVG alanına tıklama — onClick JSX ile, seciliRenk doğrudan closure'dan okunur
  const handleContainerClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = (e.target as Element).closest('[data-region]') as SVGElement | null
    if (!target) return
    const region = target.getAttribute('data-region')
    if (!region) return

    // Anlık DOM güncellemesi
    target.style.fill = seciliRenk

    // State güncelle
    const mevcutRenkler = renklerRef.current
    const yeniRenkler = { ...mevcutRenkler, [region]: seciliRenk }
    setGecmis(prev => [...prev.slice(-19), mevcutRenkler])
    setRenkler(yeniRenkler)
    renklerRef.current = yeniRenkler
  }, [seciliRenk])

  const geriAl = useCallback(() => {
    if (gecmis.length === 0) return
    const onceki = gecmis[gecmis.length - 1]
    setGecmis(prev => prev.slice(0, -1))
    setRenkler(onceki)
    renklerRef.current = onceki
    const svg = containerRef.current?.querySelector('svg')
    if (!svg) return
    svg.querySelectorAll('[data-region]').forEach(el => {
      const id = el.getAttribute('data-region')!
      ;(el as SVGElement).style.fill = onceki[id] || ''
    })
  }, [gecmis])

  const sifirla = useCallback(() => {
    if (!confirm('Tüm renkler silinecek. Emin misin?')) return
    setGecmis(prev => [...prev, renklerRef.current])
    setRenkler({})
    renklerRef.current = {}
    const svg = containerRef.current?.querySelector('svg')
    svg?.querySelectorAll('[data-region]').forEach(el => {
      (el as SVGElement).style.fill = ''
    })
  }, [])

  const yazdir = useCallback(() => {
    const svg = containerRef.current?.querySelector('svg')
    if (!svg) return
    const klon = svg.cloneNode(true) as SVGElement
    klon.removeAttribute('width')
    klon.removeAttribute('height')
    const win = window.open('', '_blank')
    if (!win) return
    win.document.write(`<!DOCTYPE html><html><head><title>${baslik}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { width: 100%; height: 100%; }
        body { display: flex; justify-content: center; align-items: center; background: white; }
        svg { width: 100vmin; height: 100vmin; }
        @page { margin: 10mm; }
        @media print { svg { width: 100%; height: 100%; } }
      </style></head>
      <body>${klon.outerHTML}</body></html>`)
    win.document.close()
    win.focus()
    setTimeout(() => { win.print(); win.close() }, 400)
  }, [baslik])

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 no-print">
      {/* Araç Çubuğu */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <button
          onClick={geriAl}
          disabled={gecmis.length === 0}
          className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 font-bold text-sm px-3 py-2 rounded-xl transition-colors"
        >
          ↩️ Geri Al
        </button>
        <button
          onClick={sifirla}
          className="flex items-center gap-1 bg-red-100 hover:bg-red-200 text-red-700 font-bold text-sm px-3 py-2 rounded-xl transition-colors"
        >
          🗑️ Sıfırla
        </button>
        <button
          onClick={yazdir}
          className="flex items-center gap-1 bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold text-sm px-3 py-2 rounded-xl transition-colors"
        >
          🖨️ Yazdır
        </button>
        <div className="text-sm text-gray-500 ml-auto">
          Renk seç → Resme tıkla
        </div>
      </div>

      <div className="flex gap-4 flex-col md:flex-row">
        {/* Renk Paleti */}
        <div className="flex flex-row md:flex-col gap-2">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 hidden md:block">
            Renkler
          </div>
          <div className="grid grid-cols-4 md:grid-cols-2 gap-1.5">
            {PALET.map(renk => (
              <button
                key={renk}
                onClick={() => setSeciliRenk(renk)}
                className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-110 ${
                  seciliRenk === renk
                    ? 'border-gray-800 scale-110 shadow-md'
                    : 'border-gray-200'
                }`}
                style={{ backgroundColor: renk }}
                title={renk}
              />
            ))}
          </div>
          {/* Seçili renk göstergesi */}
          <div className="mt-2 hidden md:block">
            <div className="text-xs text-gray-500 mb-1">Seçili:</div>
            <div
              className="w-12 h-12 rounded-xl border-2 border-gray-300 shadow-inner"
              style={{ backgroundColor: seciliRenk }}
            />
          </div>
        </div>

        {/* SVG Boyama Alanı — onClick direkt JSX'te */}
        <div
          ref={containerRef}
          onClick={handleContainerClick}
          className="flex-1 bg-white border-2 border-dashed border-gray-200 rounded-xl overflow-hidden cursor-crosshair coloring-svg min-h-80"
          dangerouslySetInnerHTML={{ __html: svgIcerik }}
          style={{ maxWidth: '500px', margin: '0 auto' }}
        />
      </div>

      {/* Talimatlar */}
      <div className="mt-4 bg-blue-50 rounded-xl p-3 text-sm text-blue-700">
        <strong>Nasıl Kullanılır?</strong> Soldan bir renk seç, sonra boyamak istediğin alana tıkla!
        Geri al ile son işlemi iptal edebilir, sıfırla ile baştan başlayabilirsin.
      </div>
    </div>
  )
}
