import { ImageField } from '@prismicio/client'
import { createClient } from '../prismicio'
import { PrismicNextImage } from '@prismicio/next'
import { groupByTags } from '../utils'

export default async function Index () {
  const client = createClient()

  const allImages = await client.getAllByType('image')

  const getCheckedAspectRatioClass = (image: ImageField) => {
    switch ((image.dimensions?.width ?? 0) / (image.dimensions?.height ?? 0)) {
      case 4 / 3: return 'peer-checked:aspect-[4/3]'
      case 3 / 4: return 'peer-checked:aspect-[3/4]'
      case 9 / 16: return 'peer-checked:aspect-[9/16]'
      default: return 'peer-checked:aspect-video'
    }
  }

  const groupedImages = Object.entries(groupByTags('year', allImages))

  return (
    <main>
      {groupedImages.map(([key, images]) => (
        <div key={key}>
          <span className="block col-span-3 text-center text-2xl font-bold mt-2">{key}</span>
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {images.map(image => (
              <label htmlFor={image.uid} key={image.uid} className="relative rounded-lg overflow-hidden bg-[#c3dda4] group">
                <input type="checkbox" id={image.uid} className="peer hidden" />
                <span className="absolute bottom-0 left-0 font-bold py-2 px-4 truncate w-[90%]">{image.data.title}</span>
                <div className="fixed left-0 top-0 bg-black w-screen h-screen opacity-0 transition-opacity peer-checked:opacity-40 pointer-events-none peer-checked:pointer-events-auto z-20" />
                <PrismicNextImage
                  alt=""
                  field={image.data.image}
                  imgixParams={{ q: 75, cs: 'srgb', ar: '4:3', fit: 'crop', crop: ['focalpoint', 'entropy'] }}
                  className="transition-y-0 relative w-full h-auto object-cover aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group-hover:-translate-y-10 group-hover:drop-shadow-2xl opacity-100 transition-[filter,_transform,_opacity] peer-checked:opacity-0 peer-checked:translate-y-full duration-200"
                />

                <PrismicNextImage
                  alt=""
                  field={image.data.image}
                  imgixParams={{ q: 75, cs: 'srgb', ar: `${image.data.image.dimensions?.width ?? 0}:${image.data.image.dimensions?.height ?? 0}`, fit: 'crop' }}
                  className={`aspect-[4/3] fixed w-full h-auto object-cover rounded-lg cursor-pointer z-20 max-w-6xl opacity-0 transition-[left,_top,_position,_aspect-ratio,_transform,_opacity] left-[50vw] top-[50vh] translate-y-[0%] translate-x-[-50%] pointer-events-none peer-checked:opacity-100 ${getCheckedAspectRatioClass(image.data.image)} peer-checked:translate-y-[-50%] peer-checked:drop-shadow-xl p-4 md:p-8 peer-checked:pointer-events-auto`}
                />
              </label>
            ))}
          </div>
        </div>
      ))}
    </main>
  )
}
