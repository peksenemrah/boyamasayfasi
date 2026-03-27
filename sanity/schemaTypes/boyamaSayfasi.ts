import { defineField, defineType } from 'sanity'

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
      description: 'Örn: kediler, kopekler, arabalar, prenses...',
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
      name: 'svgDosya',
      title: 'SVG Dosyası',
      type: 'file',
      options: { accept: '.svg,image/svg+xml' },
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'baslik', subtitle: 'kategori' },
    prepare({ title, subtitle }) {
      return { title, subtitle: `📁 ${subtitle}` }
    },
  },
})
