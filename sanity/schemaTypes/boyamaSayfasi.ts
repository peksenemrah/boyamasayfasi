import { defineField, defineType } from 'sanity'
import { kategoriler } from '../../data/categories'

const kategoriListesi = kategoriler
  .filter(k => k.grup !== 'ozel')
  .map(k => ({ title: `${k.emoji} ${k.ad}`, value: k.slug }))

export const boyamaSayfasiType = defineType({
  name: 'boyamaSayfasi',
  title: 'Boyama Sayfası',
  type: 'document',
  fields: [
    defineField({
      name: 'baslik',
      title: 'Başlık',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL (Slug)',
      type: 'slug',
      options: { source: 'baslik', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'kategori',
      title: 'Kategori',
      type: 'string',
      options: { list: kategoriListesi },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'etiketler',
      title: 'Etiketler',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'zorluk',
      title: 'Zorluk',
      type: 'string',
      options: {
        list: [
          { title: '😊 Kolay', value: 'kolay' },
          { title: '🤔 Orta', value: 'orta' },
          { title: '🧠 Zor', value: 'zor' },
        ],
        layout: 'radio',
      },
      initialValue: 'kolay',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'yeni',
      title: 'Yeni mi?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'populerlik',
      title: 'Popülerlik (0-100)',
      type: 'number',
      initialValue: 80,
      validation: Rule => Rule.min(0).max(100),
    }),
    defineField({
      name: 'aciklama',
      title: 'Açıklama',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'dosyaTipi',
      title: 'Dosya Tipi',
      type: 'string',
      options: {
        list: [
          { title: '🎨 SVG (interaktif bölge boyama)', value: 'svg' },
          { title: '🖼️ JPG / PNG (flood-fill boyama)', value: 'raster' },
        ],
        layout: 'radio',
      },
      initialValue: 'svg',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'svgDosya',
      title: 'SVG Dosyası',
      description: 'Dosya tipi SVG seçiliyse doldurun',
      type: 'file',
      options: { accept: '.svg,image/svg+xml' },
      hidden: ({ document }) => document?.dosyaTipi !== 'svg',
    }),
    defineField({
      name: 'gorsel',
      title: 'JPG / PNG Görseli',
      description: 'Dosya tipi JPG/PNG seçiliyse doldurun',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ document }) => document?.dosyaTipi !== 'raster',
    }),
  ],
  preview: {
    select: { title: 'baslik', subtitle: 'kategori' },
    prepare({ title, subtitle }) {
      return { title, subtitle: `📁 ${subtitle}` }
    },
  },
})
