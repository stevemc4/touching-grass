import { ReactElement } from 'react'
// eslint-disable-next-line camelcase
import { Plus_Jakarta_Sans } from 'next/font/google'
import '../styles/global.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: 'variable',
  display: 'swap',
  fallback: ['system-ui', 'arial'],
  subsets: ['latin']
})

export default function Layout ({ children }: { children: ReactElement }) {
  return (
    <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body className={`${plusJakartaSans.className} font-medium bg-[#E6F1E1] text-[#5B8F21] grid md:grid-cols-[320px_minmax(0,_1fr)] md:py-10 md:px-12 gap-4`}>
      <div className="sticky top-0 mt-12 md:mt-0 z-10">
        <div className="px-8 pt-8 pb-4 md:px-0 md:pt-0 md:pb-0 bg-[#E6F1E1]">
          <span className="lowercase text-2xl md:text-[64px] font-extrabold leading-none">Touching<br />Grass</span>
        </div>
        <div className="bg-gradient-to-b from-[#E6F1E1] to-transparent h-1 w-full md:hidden" />
      </div>
      <div className="pb-8 px-8 md:pb-0 md:px-0">
        { children }
      </div>
    </body>
    </html>
  )
}
