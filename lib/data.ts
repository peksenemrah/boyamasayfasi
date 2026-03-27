/**
 * Veri katmanı: Sanity yapılandırılmışsa Sanity'den, yoksa statik TS dosyalarından okur.
 * Sayfalar bu dosyayı import eder, kaynak değişince sadece burası güncellenir.
 */

import { client, isSanityConfigured } from '@/sanity/lib/client'
import {
  SAYFALAR_QUERY,
  SAYFA_SLUG_QUERY,
  SAYFALAR_SLUG_LISTESI_QUERY,
} from '@/sanity/lib/queries'
import {
  boyamaSayfalari as staticSayfalar,
  type ColoringPage,
} from '@/data/coloringPages'

const REVALIDATE = 60 // saniye

async function fetchFromSanity<T>(query: string, params = {}): Promise<T | null> {
  try {
    return await client.fetch<T>(query, params, { next: { revalidate: REVALIDATE } })
  } catch {
    return null
  }
}

// Tüm boyama sayfaları
export async function getSayfalar(): Promise<ColoringPage[]> {
  if (!isSanityConfigured) return staticSayfalar
  const result = await fetchFromSanity<ColoringPage[]>(SAYFALAR_QUERY)
  return result && result.length > 0 ? result : staticSayfalar
}

// Tek sayfa (slug ile)
export async function getSayfaBySlug(slug: string): Promise<ColoringPage | undefined> {
  if (!isSanityConfigured) return staticSayfalar.find(s => s.slug === slug)
  const result = await fetchFromSanity<ColoringPage>(SAYFA_SLUG_QUERY, { slug })
  return result ?? staticSayfalar.find(s => s.slug === slug)
}

// Slug listesi (generateStaticParams için)
export async function getSlugListesi(): Promise<{ slug: string }[]> {
  if (!isSanityConfigured) return staticSayfalar.map(s => ({ slug: s.slug }))
  const result = await fetchFromSanity<{ slug: string }[]>(SAYFALAR_SLUG_LISTESI_QUERY)
  return result && result.length > 0 ? result : staticSayfalar.map(s => ({ slug: s.slug }))
}

// Kategori sayfaları
export async function getKategoriSayfalari(kategori: string): Promise<ColoringPage[]> {
  const sayfalar = await getSayfalar()
  return sayfalar.filter(s => s.kategori === kategori)
}

// En popüler
export async function getEnPopuler(limit = 16): Promise<ColoringPage[]> {
  const sayfalar = await getSayfalar()
  return [...sayfalar].sort((a, b) => b.populerlik - a.populerlik).slice(0, limit)
}

// Yeni eklenenler
export async function getYeniSayfalar(limit = 20): Promise<ColoringPage[]> {
  const sayfalar = await getSayfalar()
  return sayfalar.filter(s => s.yeni).slice(0, limit)
}

// İlgili sayfalar
export async function getIlgiliSayfalar(sayfa: ColoringPage, limit = 8): Promise<ColoringPage[]> {
  const sayfalar = await getSayfalar()
  return sayfalar
    .filter(s => s.id !== sayfa.id && (
      s.kategori === sayfa.kategori ||
      s.etiketler.some(e => sayfa.etiketler.includes(e))
    ))
    .slice(0, limit)
}
