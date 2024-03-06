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
              <div key={image.uid} className="bg-[#c3dda4] rounded-lg overflow-hidden">
                <input type="checkbox" id={image.uid} className="peer hidden" />
                <label htmlFor={image.uid} className="fixed left-0 top-0 bg-black w-screen h-screen opacity-0 transition-opacity peer-checked:opacity-40 pointer-events-none peer-checked:pointer-events-auto z-20" />
                <label htmlFor={image.uid} className="relative group">
                  <span className="absolute bottom-0 left-0 font-bold py-2 px-4 truncate w-[90%]">{image.data.title}</span>
                  <PrismicNextImage
                    alt=""
                    field={image.data.image}
                    imgixParams={{ q: 75, cs: 'srgb', ar: '4:3', fit: 'crop', crop: ['focalpoint', 'entropy'] }}
                    className="transition-y-0 relative w-full h-auto object-cover aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group-hover:-translate-y-10 group-hover:drop-shadow-2xl opacity-100 transition-[filter,_transform,_opacity] group peer-checked:opacity-0 peer-checked:translate-y-full duration-200"
                  />

                </label>
                <article className="fixed w-screen h-screen md:h-auto z-20 max-w-4xl opacity-0 transition-[left,_top,_position,_aspect-ratio,_transform,_opacity] left-0 md:left-[50vw] top-0 md:top-[50vh] md:translate-y-[-40%] md:translate-x-[-50%] pointer-events-none peer-checked:opacity-100 md:peer-checked:translate-y-[-50%] peer-checked:drop-shadow-xl p-0 md:p-8 peer-checked:pointer-events-auto flex flex-col">
                  <label htmlFor={image.uid} className="top-4 left-4 md:top-10 md:left-10 md:cursor-pointer z-30 absolute p-2 w-8 h-8 bg-opacity-60 bg-black rounded-full leading-none text-lg flex items-center justify-center text-[#E6F1E1]">
                    &#10006;
                  </label>
                  <PrismicNextImage
                    alt=""
                    field={image.data.image}
                    imgixParams={{ q: 75, cs: 'srgb', ar: `${image.data.image.dimensions?.width ?? 0}:${image.data.image.dimensions?.height ?? 0}`, fit: 'crop' }}
                    className={`${getCheckedAspectRatioClass(image.data.image)} md:rounded-t-xl object-cover`}
                  />
                  <div className="p-4 bg-[#E6F1E1] md:rounded-b-xl flex-1 md:flex-0">
                    <h1 className="font-bold text-xl">{image.data.title}</h1>
                    <ul className="flex gap-1 items-center mt-2">
                      {image.tags.map(tag => (
                        <li key={`${image.uid}-${tag}`} className="rounded p-2 bg-[#5B8F21] text-[#E6F1E1] leading-none text-sm">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  )
}
