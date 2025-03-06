import {apiFetch, createRequest} from '../services/api-client'

export const uploadImage = async (imageUri: string) => {
  const formData = new FormData()
  const filename = imageUri.split('/').pop() || 'image.jpg'
  const match = /\.(\w+)$/.exec(filename)
  const type = match ? `image/${match[1].toLowerCase()}` : 'image/jpeg'
  formData.append('file', { uri: imageUri, name: filename, type } as any)
  return apiFetch('/images/upload', createRequest('POST', formData))
}

export const fetchImages = async () => {
  return apiFetch('/images/search?limit=4')
}

export const favouriteCat = async (image_id: string) => {
  return apiFetch('/favourites', createRequest('POST', { image_id }))
}

export const unfavouriteCat = async (favourite_id: number | string) => {
  return apiFetch(`/favourites/${favourite_id}`, { method: 'DELETE' })
}

export const voteCat = async (image_id: string, value: number) => {
  return apiFetch('/votes', createRequest('POST', { image_id, value }))
}
