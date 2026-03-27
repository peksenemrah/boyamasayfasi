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
  imgSrc: string
  baslik: string
}

function hexToRgba(hex: string): [number, number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return [r, g, b, 255]
}

function colorDistance(a: number[], b: number[]): number {
  return Math.sqrt(
    (a[0] - b[0]) ** 2 +
    (a[1] - b[1]) ** 2 +
    (a[2] - b[2]) ** 2
  )
}

function floodFill(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  startX: number,
  startY: number,
  fillColor: [number, number, number, number],
  tolerance = 32
) {
  const startIdx = (startY * width + startX) * 4
  const startColor = [data[startIdx], data[startIdx + 1], data[startIdx + 2], data[startIdx + 3]]

  // Aynı renge tıklanmışsa işlem yapma
  if (colorDistance(startColor, fillColor) < tolerance) return

  const visited = new Uint8Array(width * height)
  const stack: number[] = [startY * width + startX]
  visited[startY * width + startX] = 1

  while (stack.length > 0) {
    const pos = stack.pop()!
    const px = pos % width
    const py = Math.floor(pos / width)
    const idx = pos * 4

    data[idx] = fillColor[0]
    data[idx + 1] = fillColor[1]
    data[idx + 2] = fillColor[2]
    data[idx + 3] = fillColor[3]

    const neighbors = [
      px > 0 ? pos - 1 : -1,
      px < width - 1 ? pos + 1 : -1,
      py > 0 ? pos - width : -1,
      py < height - 1 ? pos + width : -1,
    ]

    for (const n of neighbors) {
      if (n < 0 || visited[n]) continue
      const nIdx = n * 4
      const nColor = [data[nIdx], data[nIdx + 1], data[nIdx + 2], data[nIdx + 3]]
      if (colorDistance(nColor, startColor) <= tolerance) {
        visited[n] = 1
        stack.push(n)
      }
    }
  }
}

export default function ColoringEngineRaster({ imgSrc, baslik }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [seciliRenk, setSeciliRenk] = useState(PALET[0])
  const [gecmis, setGecmis] = useState<ImageData[]>([])
  const [yuklendi, setYuklendi] = useState(false)
  const seciliRenkRef = useRef(PALET[0])

  useEffect(() => { seciliRenkRef.current = seciliRenk }, [seciliRenk])

  // Görseli canvas'a yükle
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    setYuklendi(false)
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      // Maksimum 800px genişlik
      const maxW = 800
      const scale = img.width > maxW ? maxW / img.width : 1
      canvas.width = Math.floor(img.width * scale)
      canvas.height = Math.floor(img.height * scale)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      setYuklendi(true)
      setGecmis([])
    }
    img.onerror = () => setYuklendi(false)
    img.src = imgSrc
  }, [imgSrc])

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas || !yuklendi) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    // Canvas koordinatlarına çevir (responsive ölçekleme)
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const x = Math.floor((e.clientX - rect.left) * scaleX)
    const y = Math.floor((e.clientY - rect.top) * scaleY)

    // Geri al için mevcut durumu kaydet
    const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height)
    setGecmis(prev => [...prev.slice(-19), snapshot])

    // Flood fill uygula
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    floodFill(imageData.data, canvas.width, canvas.height, x, y, hexToRgba(seciliRenkRef.current))
    ctx.putImageData(imageData, 0, 0)
  }, [yuklendi])

  const geriAl = useCallback(() => {
    if (gecmis.length === 0) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const onceki = gecmis[gecmis.length - 1]
    ctx.putImageData(onceki, 0, 0)
    setGecmis(prev => prev.slice(0, -1))
  }, [gecmis])

  const sifirla = useCallback(() => {
    if (!confirm('Tüm renkler silinecek. Emin misin?')) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return
    const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height)
    setGecmis(prev => [...prev, snapshot])
    // Orijinal görseli yeniden yükle
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    img.src = imgSrc
    setGecmis([])
  }, [imgSrc])

  const yazdir = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dataUrl = canvas.toDataURL('image/png')
    const win = window.open('', '_blank')
    if (!win) return
    win.document.write(`<!DOCTYPE html><html><head><title>${baslik}</title>
      <style>
        * { margin: 0; padding: 0; }
        body { display: flex; justify-content: center; align-items: center; min-height: 100vh; background: white; }
        img { max-width: 100%; max-height: 100vh; }
        @page { margin: 10mm; }
      </style></head>
      <body><img src="${dataUrl}" /></body></html>`)
    win.document.close()
    win.focus()
    setTimeout(() => { win.print(); win.close() }, 400)
  }, [baslik])

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4">
      {/* Araç Çubuğu */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <button onClick={geriAl} disabled={gecmis.length === 0}
          className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 font-bold text-sm px-3 py-2 rounded-xl transition-colors">
          ↩️ Geri Al
        </button>
        <button onClick={sifirla}
          className="flex items-center gap-1 bg-red-100 hover:bg-red-200 text-red-700 font-bold text-sm px-3 py-2 rounded-xl transition-colors">
          🗑️ Sıfırla
        </button>
        <button onClick={yazdir}
          className="flex items-center gap-1 bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold text-sm px-3 py-2 rounded-xl transition-colors">
          🖨️ Yazdır
        </button>
        <div className="text-sm text-gray-500 ml-auto">Renk seç → Resme tıkla</div>
      </div>

      <div className="flex gap-4 flex-col md:flex-row">
        {/* Renk Paleti */}
        <div className="flex flex-row md:flex-col gap-2">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 hidden md:block">Renkler</div>
          <div className="grid grid-cols-4 md:grid-cols-2 gap-1.5">
            {PALET.map(renk => (
              <button key={renk} onClick={() => setSeciliRenk(renk)}
                className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-110 ${
                  seciliRenk === renk ? 'border-gray-800 scale-110 shadow-md' : 'border-gray-200'
                }`}
                style={{ backgroundColor: renk }}
                title={renk}
              />
            ))}
          </div>
          <div className="mt-2 hidden md:block">
            <div className="text-xs text-gray-500 mb-1">Seçili:</div>
            <div className="w-12 h-12 rounded-xl border-2 border-gray-300 shadow-inner"
              style={{ backgroundColor: seciliRenk }} />
          </div>
        </div>

        {/* Canvas Boyama Alanı */}
        <div className="flex-1 flex justify-center items-start">
          {!yuklendi && (
            <div className="flex items-center justify-center min-h-80 text-gray-400 text-sm">
              Görsel yükleniyor...
            </div>
          )}
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            className={`border-2 border-dashed border-gray-200 rounded-xl cursor-crosshair max-w-full ${yuklendi ? 'block' : 'hidden'}`}
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
      </div>

      <div className="mt-4 bg-blue-50 rounded-xl p-3 text-sm text-blue-700">
        <strong>Nasıl Kullanılır?</strong> Soldan bir renk seç, sonra boyamak istediğin bölgeye tıkla — o alan otomatik dolacak!
      </div>
    </div>
  )
}
