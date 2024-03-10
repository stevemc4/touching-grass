import { ReactElement } from 'react'
// eslint-disable-next-line camelcase
import { Plus_Jakarta_Sans } from 'next/font/google'
import '../styles/global.css'
import { Metadata } from 'next'
import { Provider } from 'jotai'

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: 'variable',
  display: 'swap',
  fallback: ['system-ui', 'arial'],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Touching Grass',
  description: 'Waktunya Menyentuh Rumput',
  metadataBase: new URL('https://touching-grass.dhikarizky.me'),
  authors: {
    name: 'Dhika Rizky',
    url: 'https://dhikarizky.me'
  },
  openGraph: {
    title: 'Touching Grass',
    url: 'https://touching-grass.dhikarizky.me',
    description: 'Waktunya Menyentuh Rumput',
    type: 'website'
  }
}

export default function Layout ({ children }: { children: ReactElement }) {
  return (
    <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <Provider>
      <body className={`${plusJakartaSans.className} font-medium bg-[#E6F1E1] text-[#5B8F21] grid lg:grid-cols-[320px_minmax(0,_1fr)] md:py-10 md:px-12 gap-4`}>
        <div className="sticky top-0 mt-12 lg:mt-0 z-10">
          <div className="px-8 pt-8 pb-4 md:px-0 md:pb-8 lg:pt-0 lg:pb-0 bg-[#E6F1E1]">
            <span className="lowercase text-2xl md:text-[64px] font-extrabold leading-none">Touching<br />Grass</span>
          </div>
          <div className="bg-gradient-to-b from-[#E6F1E1] to-transparent h-1 w-full lg:hidden" />
        </div>
        <div className="pb-8 px-8 lg:pb-0 md:px-0">
          { children }
        </div>
      </body>
    </Provider>
    </html>
  )
}
