import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

export async function POST(req: NextRequest) {
  try {
    const { baslik, kategori, zorluk } = await req.json()

    if (!baslik || !kategori) {
      return NextResponse.json({ error: 'baslik ve kategori zorunlu' }, { status: 400 })
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: 'GROQ_API_KEY tanımlı değil' }, { status: 500 })
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
    const bolgeAdedi = zorluk === 'kolay' ? '6-10' : zorluk === 'orta' ? '10-16' : '16-25'

    const prompt = `Sen bir çocuk boyama sayfası SVG tasarımcısısın.

Konu: ${baslik} | Kategori: ${kategori} | Zorluk: ${zorluk} (${bolgeAdedi} bölge)

KURALLAR:
- Sadece SVG kodu yaz, başka hiçbir şey yazma
- viewBox="0 0 400 400" kullan, width/height EKLEME
- fill="white", stroke="#1a1a1a", stroke-width="2.5"
- Her bölgeye data-region="N" ekle (1'den başla)
- <style>[data-region]{cursor:pointer;transition:opacity .1s}[data-region]:hover{opacity:0.8}</style> ekle
- text, gradient, filter, clipPath KULLANMA
- path, circle, ellipse, polygon, rect kullan
- Çocuk dostu, net, basit tasarım

SVG:`

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 4096,
      temperature: 0.7,
    })

    const text = completion.choices[0]?.message?.content?.trim() ?? ''
    const svgMatch = text.match(/<svg[\s\S]*<\/svg>/i)
    const svgContent = svgMatch ? svgMatch[0] : text

    return NextResponse.json({ svg: svgContent })

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('generate-svg error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
