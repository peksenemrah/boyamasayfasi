import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/client'

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u')
    .replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    + '-' + Date.now().toString(36)
}

export async function POST(req: NextRequest) {
  const { baslik, kategori, zorluk, svgContent } = await req.json()

  if (!baslik || !kategori || !svgContent) {
    return NextResponse.json({ error: 'Eksik alan' }, { status: 400 })
  }

  // SVG'yi Sanity'e file asset olarak yükle
  const buffer = Buffer.from(svgContent, 'utf-8')
  const slug = toSlug(baslik)

  const asset = await writeClient.assets.upload('file', buffer, {
    filename: `${slug}.svg`,
    contentType: 'image/svg+xml',
  })

  // Boyama sayfası belgesi oluştur
  const doc = await writeClient.create({
    _type: 'boyamaSayfasi',
    baslik,
    slug: { _type: 'slug', current: slug },
    kategori,
    zorluk: zorluk || 'kolay',
    yeni: true,
    populerlik: 80,
    etiketler: [kategori],
    dosyaTipi: 'svg',
    svgDosya: {
      _type: 'file',
      asset: { _type: 'reference', _ref: asset._id },
    },
  })

  // Yayınla
  await writeClient.patch(doc._id).set({ _id: doc._id }).commit()

  return NextResponse.json({ success: true, slug, documentId: doc._id })
}
