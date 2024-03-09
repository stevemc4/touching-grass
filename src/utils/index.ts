import { AllDocumentTypes } from '../../prismicio-types'

export const TYPED_TAGS = ['city', 'country', 'year'] as const
// eslint-disable-next-line @typescript-eslint/ban-types
export type TypedTags = typeof TYPED_TAGS[number]

export function groupByTags (tagToGroup: TypedTags, documents: AllDocumentTypes[]) {
  const returnValue: Record<string, AllDocumentTypes[]> = {}
  for (const document of documents) {
    const currentTag = document.tags.filter(tag => tag.startsWith(`${tagToGroup}:`))
    if (currentTag.length === 0) {
      continue
    }

    const tag = currentTag[0].split(':')[1]

    if (tag === '') continue

    if (returnValue[tag]) {
      returnValue[tag].push(document)
      continue
    }

    returnValue[tag] = [document]
  }

  return returnValue
}
