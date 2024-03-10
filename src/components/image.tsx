'use client'

import { PrismicNextImage } from '@prismicio/next'
import { ImageDocument } from '../../prismicio-types'
import { useAtom } from 'jotai'
import { imagePreviewAtom } from '../atoms'

interface Props {
  image: ImageDocument
}

export default function Image ({ image }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setImagePreview] = useAtom(imagePreviewAtom)

  return (
    <li className="bg-[#c3dda4] rounded-lg overflow-hidden relative group" onClick={() => setImagePreview(image)}>
      <span className="absolute bottom-0 left-0 font-bold py-2 px-4 truncate w-[90%]">{image.data.title}</span>
      <PrismicNextImage
        alt=""
        field={image.data.image}
        width={480}
        imgixParams={{ q: 50, cs: 'srgb', w: 480, ar: '4:3', fit: 'crop', crop: ['focalpoint', 'entropy'] }}
        className="transition-y-0 relative w-full h-auto object-cover aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group-hover:-translate-y-10 group-hover:drop-shadow-2xl opacity-100 transition-[filter,_transform,_opacity] group peer-checked:opacity-0 peer-checked:translate-y-full delay-150 group-hover:delay-0"
      />
    </li>
  )
}
