export const SAYFALAR_QUERY = `
  *[_type == "boyamaSayfasi"] | order(populerlik desc) {
    "id": _id,
    baslik,
    "slug": slug.current,
    kategori,
    etiketler,
    zorluk,
    yeni,
    populerlik,
    aciklama,
    "svgDosya": svgDosya.asset->url
  }
`

export const SAYFA_SLUG_QUERY = `
  *[_type == "boyamaSayfasi" && slug.current == $slug][0] {
    "id": _id,
    baslik,
    "slug": slug.current,
    kategori,
    etiketler,
    zorluk,
    yeni,
    populerlik,
    aciklama,
    "svgDosya": svgDosya.asset->url
  }
`

export const SAYFALAR_SLUG_LISTESI_QUERY = `
  *[_type == "boyamaSayfasi"] { "slug": slug.current }
`
