import { atom } from 'jotai'
import { ImageDocument } from '../../prismicio-types'

const imagePreviewAtom = atom<ImageDocument | null>(null)

export { imagePreviewAtom }
