export interface Category {
  slug: string
  ad: string
  emoji: string
  grup: string
}

export const kategoriler: Category[] = [
  // Özel Sayfalar
  { slug: 'en-populer', ad: 'En Popüler', emoji: '🔥', grup: 'ozel' },
  { slug: 'yeni', ad: 'Yeni Eklenenler', emoji: '🆕', grup: 'ozel' },
  { slug: 'sayiya-gore-boya', ad: 'Sayıya Göre Boya', emoji: '🔢', grup: 'ozel' },

  // Tatil & Özel Günler
  { slug: 'halloween', ad: 'Halloween', emoji: '🎃', grup: 'tatil' },
  { slug: 'noel', ad: 'Noel', emoji: '🎄', grup: 'tatil' },
  { slug: 'noel-baba', ad: 'Noel Baba', emoji: '🎅', grup: 'tatil' },
  { slug: 'paskalya', ad: 'Paskalya', emoji: '🐣', grup: 'tatil' },
  { slug: 'aziz-patrick', ad: "Aziz Patrick Günü", emoji: '🍀', grup: 'tatil' },
  { slug: 'yeni-yil', ad: 'Mutlu Yeni Yıl', emoji: '🥂', grup: 'tatil' },
  { slug: 'dogum-gunu', ad: 'Mutlu Yıllar', emoji: '🎈', grup: 'tatil' },
  { slug: 'anneler-gunu', ad: "Anneler Günü", emoji: '👩‍👧', grup: 'tatil' },
  { slug: 'babalar-gunu', ad: "Babalar Günü", emoji: '🧔', grup: 'tatil' },
  { slug: 'sevgililer-gunu', ad: "Sevgililer Günü", emoji: '💝', grup: 'tatil' },

  // Hayvanlar
  { slug: 'hayvanlar', ad: 'Hayvanlar', emoji: '🦁', grup: 'hayvanlar' },
  { slug: 'kediler', ad: 'Kediler', emoji: '🐱', grup: 'hayvanlar' },
  { slug: 'kopekler', ad: 'Köpekler', emoji: '🐶', grup: 'hayvanlar' },
  { slug: 'atlar', ad: 'Atlar', emoji: '🐴', grup: 'hayvanlar' },
  { slug: 'kuslar', ad: 'Kuşlar', emoji: '🐦', grup: 'hayvanlar' },
  { slug: 'baliklar', ad: 'Balıklar', emoji: '🐠', grup: 'hayvanlar' },
  { slug: 'deniz-memelileri', ad: 'Deniz Canlıları', emoji: '🐬', grup: 'hayvanlar' },
  { slug: 'dinozorlar', ad: 'Dinozorlar', emoji: '🦕', grup: 'hayvanlar' },
  { slug: 'unicorn', ad: 'Unicorn', emoji: '🦄', grup: 'hayvanlar' },
  { slug: 'ciftlik', ad: 'Çiftlik Hayvanları', emoji: '🐄', grup: 'hayvanlar' },
  { slug: 'bocekler', ad: 'Böcekler', emoji: '🦋', grup: 'hayvanlar' },

  // Taşıtlar
  { slug: 'arabalar', ad: 'Arabalar', emoji: '🚗', grup: 'tasitlar' },
  { slug: 'kamyonlar', ad: 'Kamyonlar', emoji: '🚛', grup: 'tasitlar' },
  { slug: 'traktorler', ad: 'Traktörler', emoji: '🚜', grup: 'tasitlar' },
  { slug: 'insaat-araclari', ad: 'İnşaat Araçları', emoji: '🚧', grup: 'tasitlar' },
  { slug: 'ucaklar', ad: 'Uçaklar', emoji: '✈️', grup: 'tasitlar' },
  { slug: 'motosikletler', ad: 'Motosikletler', emoji: '🏍️', grup: 'tasitlar' },
  { slug: 'tekneler', ad: 'Tekneler', emoji: '⛵', grup: 'tasitlar' },
  { slug: 'uzay', ad: 'Uzay Araçları', emoji: '🚀', grup: 'tasitlar' },

  // Karakterler & Fantezi
  { slug: 'prenses', ad: 'Prenses', emoji: '👸', grup: 'karakter' },
  { slug: 'peri', ad: 'Peri Kızları', emoji: '🧚', grup: 'karakter' },
  { slug: 'denizkizi', ad: 'Deniz Kızı', emoji: '🧜', grup: 'karakter' },
  { slug: 'peri-masallari', ad: 'Peri Masalları', emoji: '🧙', grup: 'karakter' },
  { slug: 'uzaylilar', ad: 'Uzaylılar', emoji: '👽', grup: 'karakter' },
  { slug: 'canavarlar', ad: 'Canavarlar', emoji: '👾', grup: 'karakter' },
  { slug: 'robotlar', ad: 'Robotlar', emoji: '🤖', grup: 'karakter' },
  { slug: 'korsanlar', ad: 'Korsanlar', emoji: '🦜', grup: 'karakter' },
  { slug: 'superkahraman', ad: 'Süper Kahramanlar', emoji: '🦸', grup: 'karakter' },

  // İnsanlar & Günlük Hayat
  { slug: 'kizlar', ad: 'Kızlar İçin', emoji: '👧', grup: 'insanlar' },
  { slug: 'erkekler', ad: 'Erkekler İçin', emoji: '👦', grup: 'insanlar' },
  { slug: 'bebekler', ad: 'Bebekler', emoji: '👶', grup: 'insanlar' },
  { slug: 'okul', ad: 'Okul', emoji: '🏫', grup: 'insanlar' },
  { slug: 'spor', ad: 'Spor', emoji: '⚽', grup: 'insanlar' },
  { slug: 'basketbol', ad: 'Basketbol', emoji: '🏀', grup: 'insanlar' },
  { slug: 'sahil', ad: 'Sahil & Yaz', emoji: '🏖️', grup: 'insanlar' },

  // Sanat & Desen
  { slug: 'mandala', ad: 'Mandala', emoji: '🌀', grup: 'sanat' },
  { slug: 'geometrik', ad: 'Geometrik Desenler', emoji: '🔷', grup: 'sanat' },
  { slug: 'origami', ad: 'Origami', emoji: '🦢', grup: 'sanat' },

  // Doğa & Yiyecek
  { slug: 'cicekler', ad: 'Çiçekler', emoji: '🌷', grup: 'doga' },
  { slug: 'meyveler', ad: 'Meyve & Sebze', emoji: '🍎', grup: 'doga' },
  { slug: 'yiyecekler', ad: 'Yiyecekler', emoji: '🍕', grup: 'doga' },
  { slug: 'manzara', ad: 'Manzaralar', emoji: '🌄', grup: 'doga' },
  { slug: 'gokkusagi', ad: 'Gökkuşağı', emoji: '🌈', grup: 'doga' },

  // Sayılar & Harfler
  { slug: 'sayilar', ad: 'Sayılar', emoji: '1️⃣', grup: 'egitim' },
  { slug: 'harfler', ad: 'Harfler', emoji: '🔤', grup: 'egitim' },
]

export const grupAdlari: Record<string, string> = {
  ozel: 'Özel Sayfalar',
  tatil: 'Tatil & Özel Günler',
  hayvanlar: 'Hayvanlar',
  tasitlar: 'Taşıtlar',
  karakter: 'Karakterler & Fantezi',
  insanlar: 'İnsanlar & Günlük Hayat',
  sanat: 'Sanat & Desen',
  doga: 'Doğa & Yiyecek',
  egitim: 'Eğitim',
}
