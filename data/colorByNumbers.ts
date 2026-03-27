export interface ColorByNumberPage {
  id: number
  slug: string
  baslik: string
  renkSayisi: number
  zorluk: 'kolay' | 'orta' | 'zor'
  yeni: boolean
  populerlik: number
  aciklama: string
  svgDosya: string
  renkHaritasi: { sayi: number; renk: string; ad: string }[]
}

export const sayiyaGoreBoyaSayfalari: ColorByNumberPage[] = [
  {
    id: 101,
    slug: 'kedi-sayiya-gore-101',
    baslik: 'Sevimli Kedi - Sayıya Göre Boya',
    renkSayisi: 4,
    zorluk: 'kolay',
    yeni: true,
    populerlik: 95,
    aciklama: 'Her bölgedeki sayıya bakarak doğru rengi seç ve bu tatlı kediyi tamamla! 4 farklı renk kullanarak harika bir kedi portresi oluşturabilirsin.',
    svgDosya: 'cbn-kedi-101.svg',
    renkHaritasi: [
      { sayi: 1, renk: '#f97316', ad: 'Turuncu' },
      { sayi: 2, renk: '#ffffff', ad: 'Beyaz' },
      { sayi: 3, renk: '#1f2937', ad: 'Siyah' },
      { sayi: 4, renk: '#fbbf24', ad: 'Sarı' },
    ],
  },
  {
    id: 102,
    slug: 'kelebek-sayiya-gore-102',
    baslik: 'Renkli Kelebek - Sayıya Göre Boya',
    renkSayisi: 5,
    zorluk: 'kolay',
    yeni: true,
    populerlik: 93,
    aciklama: 'Bu güzel kelebeğin kanatlarındaki sayılara göre renkleri doldur! 5 farklı parlak renk kullanarak muhteşem bir kelebek tablosu oluştur.',
    svgDosya: 'cbn-kelebek-102.svg',
    renkHaritasi: [
      { sayi: 1, renk: '#f472b6', ad: 'Pembe' },
      { sayi: 2, renk: '#a855f7', ad: 'Mor' },
      { sayi: 3, renk: '#fbbf24', ad: 'Sarı' },
      { sayi: 4, renk: '#34d399', ad: 'Yeşil' },
      { sayi: 5, renk: '#1f2937', ad: 'Siyah' },
    ],
  },
  {
    id: 103,
    slug: 'ev-sayiya-gore-103',
    baslik: 'Güzel Ev - Sayıya Göre Boya',
    renkSayisi: 6,
    zorluk: 'orta',
    yeni: false,
    populerlik: 88,
    aciklama: 'Her odasını ve bahçesini farklı renklerde boyayacağın bu güzel evi tamamla! 6 renk kullanarak renkli bir yuva oluştur.',
    svgDosya: 'cbn-ev-103.svg',
    renkHaritasi: [
      { sayi: 1, renk: '#ef4444', ad: 'Kırmızı' },
      { sayi: 2, renk: '#f97316', ad: 'Turuncu' },
      { sayi: 3, renk: '#fbbf24', ad: 'Sarı' },
      { sayi: 4, renk: '#34d399', ad: 'Yeşil' },
      { sayi: 5, renk: '#60a5fa', ad: 'Mavi' },
      { sayi: 6, renk: '#ffffff', ad: 'Beyaz' },
    ],
  },
]

export function cbnBulSlug(slug: string): ColorByNumberPage | undefined {
  return sayiyaGoreBoyaSayfalari.find(s => s.slug === slug)
}
