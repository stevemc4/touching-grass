import { AllDocumentTypes } from '../../prismicio-types'

type TypedTags = 'country' | 'city' | 'year'

export function groupByTags (tagToGroup: TypedTags, documents: AllDocumentTypes[]) {
  const returnValue: Record<string, AllDocumentTypes[]> = {}
  for (const document of documents) {
    const currentTag = document.tags.filter(tag => tag.startsWith(`${tagToGroup}:`))
    if (currentTag.length === 0) {
      returnValue.untagged.push(document)
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
