'use client'
import { useAtom } from 'jotai'
import { MouseEvent, useEffect, useState } from 'react'
import { imagePreviewAtom } from '../atoms'
import { PrismicNextImage } from '@prismicio/next'
import { ImageField } from '@prismicio/client'
import Tag from './tag'

export default function Previewer () {
  const [image, setImage] = useAtom(imagePreviewAtom)
  const [openState, setOpenState] = useState<'CLOSED' | 'OPENED' | 'CLOSING'>('CLOSED')

  useEffect(() => {
    if (image !== null) {
      setOpenState('OPENED')
    }
  }, [image])

  useEffect(() => {
    if (openState === 'CLOSING') {
      setTimeout(() => {
        setImage(null)
      }, 250)
    }
  }, [openState])

  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target !== e.currentTarget) {
      return
    }

    setOpenState('CLOSING')
  }

  const getAspectRatioClass = (image?: ImageField) => {
    if (!image) return 'peer-checked:aspect-video'

    switch ((image.dimensions?.width ?? 0) / (image.dimensions?.height ?? 0)) {
      case 4 / 3: return 'peer-checked:aspect-[4/3]'
      case 3 / 4: return 'peer-checked:aspect-[3/4]'
      case 9 / 16: return 'peer-checked:aspect-[9/16]'
      default: return 'peer-checked:aspect-video'
    }
  }

  return (
    <div className={`fixed w-full h-full bg-black/40 left-0 top-0 z-30 flex items-center justify-center transition-[opacity] duration-200 md:p-8 overflow-y-auto ${openState === 'OPENED' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={handleBackdropClick}>
      <div className={`max-w-4xl relative bg-[#E6F1E1] h-screen md:h-auto md:rounded-xl flex flex-col transition-transform duration-200 ${openState === 'OPENED' ? 'translate-y-0' : 'translate-y-[5%]'}`}>
        <button
          onClick={() => setOpenState('CLOSING')}
          className="top-2 left-2 md:top-4 md:left-4 md:cursor-pointer z-30 absolute p-2 w-8 h-8 bg-opacity-60 bg-black rounded-full leading-none text-lg flex items-center justify-center text-[#E6F1E1]"
        >
            &#10006;
        </button>
        <PrismicNextImage
          alt=""
          field={image?.data.image}
          width={3860}
          imgixParams={{ q: 75, cs: 'srgb', ar: `${image?.data.image.dimensions?.width ?? 0}:${image?.data.image.dimensions?.height ?? 0}`, fit: 'crop', maxW: 3860 }}
          className={`${getAspectRatioClass(image?.data.image)} md:rounded-t-xl object-cover`}
        />
        <div className="p-4 flex-1 md:flex-0">
          <h1 className="font-bold text-xl">{image?.data.title}</h1>
          <ul className="flex gap-1.5 items-center mt-2">
            {image?.tags.map(tag => (
              <Tag key={`${image.uid}-${tag}`}>{tag}</Tag>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
