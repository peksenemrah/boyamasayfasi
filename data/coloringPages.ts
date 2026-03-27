export interface ColoringPage {
  id: number
  slug: string
  baslik: string
  kategori: string
  etiketler: string[]
  zorluk: 'kolay' | 'orta' | 'zor'
  yeni: boolean
  populerlik: number
  aciklama: string
  svgDosya: string
}

export const boyamaSayfalari: ColoringPage[] = [
  {
    id: 1,
    slug: 'sevimli-kedi-1',
    baslik: 'Sevimli Kedi',
    kategori: 'kediler',
    etiketler: ['hayvan', 'kedi', 'kolay'],
    zorluk: 'kolay',
    yeni: true,
    populerlik: 98,
    aciklama: 'Bu sevimli kedi boyama sayfasında tüylü dostunuzu dilediğiniz renklere boyayabilirsiniz! Minik patileri, meraklı gözleri ve yumuşak kuyruğuyla bu kedi seni bekliyor. Turuncu, siyah, beyaz veya çizgili — sen karar ver!',
    svgDosya: 'kedi-1.svg',
  },
  {
    id: 2,
    slug: 'neşeli-köpek-2',
    baslik: 'Neşeli Köpek',
    kategori: 'kopekler',
    etiketler: ['hayvan', 'köpek', 'kolay'],
    zorluk: 'kolay',
    yeni: true,
    populerlik: 95,
    aciklama: 'Kuyruğunu sallayan bu neşeli köpeği boyamaya ne dersin? Dili dışarıda, kulakları havada bekleyen bu tatlı köpek senin fırçanı bekliyor. Sarı, kahverengi ya da benekli yapabilirsin!',
    svgDosya: 'kopek-2.svg',
  },
  {
    id: 3,
    slug: 'renkli-kelebek-3',
    baslik: 'Renkli Kelebek',
    kategori: 'bocekler',
    etiketler: ['böcek', 'kelebek', 'kolay', 'doğa'],
    zorluk: 'kolay',
    yeni: true,
    populerlik: 96,
    aciklama: 'Bu güzel kelebeğin kanatları renk renk boyaman için seni bekliyor! Kanatlarındaki desenleri parlak sarı, pembe ve mor tonlarıyla doldurabilirsin. Bahar çiçeklerinin üzerinde süzülen bu kelebeği özgürce boyamanın tadını çıkar!',
    svgDosya: 'kelebek-3.svg',
  },
  {
    id: 4,
    slug: 'hizli-araba-4',
    baslik: 'Hızlı Araba',
    kategori: 'arabalar',
    etiketler: ['araç', 'araba', 'kolay'],
    zorluk: 'kolay',
    yeni: false,
    populerlik: 91,
    aciklama: 'Vroom vroom! Bu süper hızlı araba pist için hazır bekliyor, sadece senin renklerine ihtiyacı var! Kırmızı bir yarış arabası mı, yoksa mavi bir spor araba mı yapmak istersin? Sen karar ver ve fırçanı konuştur!',
    svgDosya: 'araba-4.svg',
  },
  {
    id: 5,
    slug: 'guzel-cicek-5',
    baslik: 'Güzel Çiçek',
    kategori: 'cicekler',
    etiketler: ['doğa', 'çiçek', 'kolay'],
    zorluk: 'kolay',
    yeni: false,
    populerlik: 88,
    aciklama: 'Bahçenin en güzel çiçeği senin fırçanı bekliyor! Yapraklarını yeşil, taç yapraklarını pembe, kırmızı veya mor yapabilirsin. Ortasını parlak sarıyla renklendirince nasıl görüneceğini hayal et!',
    svgDosya: 'cicek-5.svg',
  },
  {
    id: 6,
    slug: 'prenses-kale-6',
    baslik: 'Prenses',
    kategori: 'prenses',
    etiketler: ['prenses', 'fantezi', 'orta'],
    zorluk: 'orta',
    yeni: true,
    populerlik: 97,
    aciklama: 'Masalların güzel prensesi bugün senin fırçanı bekliyor! Elbisesini pembe, mavi ya da altın sarısıyla renklendirebilir, taçını en parlak renklerle süsleyebilirsin. Bu prenses senin hayal gücünle hayat buluyor!',
    svgDosya: 'prenses-6.svg',
  },
  {
    id: 7,
    slug: 'dinozor-rex-7',
    baslik: 'Dinozor Rex',
    kategori: 'dinozorlar',
    etiketler: ['dinozor', 'hayvan', 'orta'],
    zorluk: 'orta',
    yeni: false,
    populerlik: 93,
    aciklama: 'RAWR! Bu dev T-Rex boyamanı bekliyor! Yeşil, mor veya turuncu yapabilirsin — dinozorlar istediğin renkte olabilir! Dişlerini beyaz, gözlerini sarı yap ve bu dev dinozorun hayata gelişini izle.',
    svgDosya: 'dinozor-7.svg',
  },
  {
    id: 8,
    slug: 'uzay-roketi-8',
    baslik: 'Uzay Roketi',
    kategori: 'uzay',
    etiketler: ['uzay', 'roket', 'kolay'],
    zorluk: 'kolay',
    yeni: true,
    populerlik: 89,
    aciklama: 'Yıldızların arasında bir yolculuğa çıkmaya hazır mısın? Bu süper hızlı uzay roketini dilediğin renklerde boyayabilirsin. Gümüş gövde, kırmızı kanatlar ve mavi alevler... Uzayı fethetmeye hazır ol!',
    svgDosya: 'roket-8.svg',
  },
  {
    id: 9,
    slug: 'guzel-balik-9',
    baslik: 'Güzel Balık',
    kategori: 'baliklar',
    etiketler: ['deniz', 'balık', 'kolay'],
    zorluk: 'kolay',
    yeni: false,
    populerlik: 85,
    aciklama: 'Okyanusun derinliklerinden gelen bu renkli balık boyamanı bekliyor! Pullarını gökkuşağının tüm renkleriyle doldurabilir, yüzgeçlerini ve kuyruğunu farklı tonlarda boyayabilirsin. Denizin en renkli balığını sen yarat!',
    svgDosya: 'balik-9.svg',
  },
  {
    id: 10,
    slug: 'robot-arkadas-10',
    baslik: 'Robot Arkadaş',
    kategori: 'robotlar',
    etiketler: ['robot', 'teknoloji', 'orta'],
    zorluk: 'orta',
    yeni: true,
    populerlik: 90,
    aciklama: 'Bip bip! Bu metal arkadaşın boyaya ihtiyacı var! Gövdesini gümüş, mavi veya kırmızı yapabilir, gözlerini parlak sarı fenerler gibi renklendirip onu hayata kavuşturabilirsin.',
    svgDosya: 'robot-10.svg',
  },
  {
    id: 11,
    slug: 'mandala-cicek-11',
    baslik: 'Mandala Çiçek',
    kategori: 'mandala',
    etiketler: ['mandala', 'geometrik', 'zor'],
    zorluk: 'zor',
    yeni: false,
    populerlik: 92,
    aciklama: 'Bu büyüleyici mandala deseni sabırlı eller için! Simetrik yapraklarını ve geometrik desenlerini farklı renk kombinasyonlarıyla boyayarak nefes kesici bir sanat eseri oluşturabilirsin. Her tekrar eden desen farklı bir renk tonuyla parlar!',
    svgDosya: 'mandala-11.svg',
  },
  {
    id: 12,
    slug: 'unicorn-12',
    baslik: 'Unicorn',
    kategori: 'unicorn',
    etiketler: ['unicorn', 'fantezi', 'orta'],
    zorluk: 'orta',
    yeni: true,
    populerlik: 99,
    aciklama: 'Gökkuşağı boynuzlu bu sihirli unicorn senin renklerini bekliyor! Yelelerine gökkuşağının tüm renklerini yansıtabilir, gövdesini kar beyazı ya da açık pembe yapabilirsin. Bu sihirli yaratığı hayallerin kadar parlak yap!',
    svgDosya: 'unicorn-12.svg',
  },
  {
    id: 13,
    slug: 'ucak-gokyuzu-13',
    baslik: 'Uçak',
    kategori: 'ucaklar',
    etiketler: ['uçak', 'taşıt', 'kolay'],
    zorluk: 'kolay',
    yeni: false,
    populerlik: 83,
    aciklama: 'Bulutların arasında süzülen bu uçağı boyamaya ne dersin? Gövdesini beyaz, kanatlarını mavi, pencereleri sarı yapabilirsin. Uçağın üzerindeki sembolü de kendi tasarımınla oluşturabilirsin!',
    svgDosya: 'ucak-13.svg',
  },
  {
    id: 14,
    slug: 'deniz-kizi-14',
    baslik: 'Deniz Kızı',
    kategori: 'denizkizi',
    etiketler: ['deniz kızı', 'fantezi', 'orta'],
    zorluk: 'orta',
    yeni: true,
    populerlik: 96,
    aciklama: 'Mercan kayalıklarının arasında yüzen bu güzel deniz kızını boyamanın tam zamanı! Kuyruğunu okyanus mavisi veya yeşiliyle, saçlarını kızıl veya sarıyla, deniz yıldızı aksesuarlarını parlak mercanla boyayabilirsin.',
    svgDosya: 'denizkizi-14.svg',
  },
  {
    id: 15,
    slug: 'kelebek-bahce-15',
    baslik: 'Bahçe Kelebeği',
    kategori: 'bocekler',
    etiketler: ['kelebek', 'bahçe', 'orta'],
    zorluk: 'orta',
    yeni: false,
    populerlik: 87,
    aciklama: 'Laleler ve papatyaların arasında dans eden bu zarif kelebeği boyamanın tadını çıkar! Büyük kanatlarındaki nokta desenlerini farklı renklerle doldurabilir, çiçek çiçek atlayan bu güzel varlığı senin hayal gücünle süsleyebilirsin.',
    svgDosya: 'kelebek-15.svg',
  },
]

export function sayfaBulSlug(slug: string): ColoringPage | undefined {
  return boyamaSayfalari.find(s => s.slug === slug)
}

export function kategoriSayfalari(kategori: string): ColoringPage[] {
  return boyamaSayfalari.filter(s => s.kategori === kategori)
}

export function enPopulerSayfalar(limit = 16): ColoringPage[] {
  return [...boyamaSayfalari].sort((a, b) => b.populerlik - a.populerlik).slice(0, limit)
}

export function yeniSayfalar(limit = 20): ColoringPage[] {
  return boyamaSayfalari.filter(s => s.yeni).slice(0, limit)
}

export function ilgiliSayfalar(sayfa: ColoringPage, limit = 8): ColoringPage[] {
  return boyamaSayfalari
    .filter(s => s.id !== sayfa.id && (
      s.kategori === sayfa.kategori ||
      s.etiketler.some(e => sayfa.etiketler.includes(e))
    ))
    .slice(0, limit)
}
