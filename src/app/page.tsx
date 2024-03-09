import { createClient } from '../prismicio'
import { groupByTags } from '../utils'
import Image from '../components/image'
import Previewer from '../components/previewer'

export const revalidate = 3600

export default async function Index () {
  const client = createClient()

  const allImages = await client.getAllByType('image')

  const groupedImages = Object.entries(groupByTags('year', allImages))

  return (
    <main>
      {groupedImages.map(([key, images]) => (
        <div key={key}>
          <span className="block after:content-['_—'] after:font-medium md:after:content-none col-span-3 md:text-center text-2xl font-black mt-2">{key}</span>
          <div className="grid md:grid-cols-3 gap-4 mt-2 md:mt-8">
            {images.map(image => (
              <Image key={image.uid} image={image} />
            ))}
          </div>
        </div>
      ))}
      <Previewer />
    </main>
  )
}
