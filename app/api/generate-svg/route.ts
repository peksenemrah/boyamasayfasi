import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: NextRequest) {
  const { baslik, kategori, zorluk } = await req.json()

  if (!baslik || !kategori) {
    return NextResponse.json({ error: 'baslik ve kategori zorunlu' }, { status: 400 })
  }

  const bolgeAdedi = zorluk === 'kolay' ? '6-10' : zorluk === 'orta' ? '10-16' : '16-25'

  const prompt = `Sen bir çocuk boyama sayfası SVG tasarımcısısın.

Aşağıdaki konuda basit ve çocuk dostu bir boyama sayfası SVG'si üret:
- Konu: ${baslik}
- Kategori: ${kategori}
- Zorluk: ${zorluk} (${bolgeAdedi} ayrı bölge olmalı)

KESINLIKLE uyulacak kurallar:
1. Sadece SVG kodu döndür, açıklama veya markdown YAZMA
2. viewBox="0 0 400 400" kullan, width ve height attribute'u EKLEME
3. Tüm dolgular fill="white" olmalı
4. Tüm çizgiler stroke="#1a1a1a" stroke-width="2.5" olmalı
5. Her renklenebilir bölge data-region="N" attribute'una sahip olmalı (1'den başlayarak)
6. <style> tagı ekle: [data-region]{cursor:pointer;transition:opacity .1s}[data-region]:hover{opacity:0.8}
7. <text> elementi KULLANMA
8. Gradient, filter, clipPath KULLANMA
9. Şekiller: path, circle, ellipse, polygon, rect kullanabilirsin
10. Tasarım net, yuvarlak kenarlı ve çocuklara uygun olsun

Sadece SVG kodunu yaz:`

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
  const result = await model.generateContent(prompt)
  const text = result.response.text().trim()

  // Sadece SVG içeriğini çıkar (markdown code block varsa temizle)
  const svgMatch = text.match(/<svg[\s\S]*<\/svg>/i)
  const svgContent = svgMatch ? svgMatch[0] : text

  return NextResponse.json({ svg: svgContent })
}
