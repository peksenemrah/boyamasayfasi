import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'boyamasayfasi.com ile iletişime geçin.',
}

export default function Iletisim() {
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-black text-gray-800 mb-2">📧 İletişim</h1>
      <p className="text-gray-600 mb-8">
        Öneri, geri bildirim veya işbirliği için bize ulaşabilirsiniz.
      </p>

      <form className="bg-white rounded-2xl shadow-md p-6 space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Adınız</label>
          <input type="text" placeholder="Adınız Soyadınız"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">E-posta</label>
          <input type="email" placeholder="ornek@email.com"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Mesajınız</label>
          <textarea placeholder="Mesajınızı buraya yazın..." rows={5}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 resize-none" />
        </div>
        <button type="submit"
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-black py-3 rounded-xl transition-colors shadow-md hover:shadow-lg">
          Gönder 📨
        </button>
      </form>
    </div>
  )
}
