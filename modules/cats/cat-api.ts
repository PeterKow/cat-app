import {apiFetch, createRequest} from '@services/api-client'
import { Cat } from '@modules/cats/cat-types'

const getBreedIdByName = async (search: string): Promise<string | undefined> => {
  const breeds = await apiFetch('/breeds')
  const match = breeds.find((b: any) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  )
  return match?.id
}

export const uploadImage = async (imageUri: string) => {
  const formData = new FormData()
  const filename = imageUri.split('/').pop() || 'image.jpg'
  const match = /\.(\w+)$/.exec(filename)
  const type = match ? `image/${match[1].toLowerCase()}` : 'image/jpeg'
  formData.append('file', { uri: imageUri, name: filename, type } as any)
  return apiFetch('/images/upload', createRequest('POST', formData))
}

export const fetchImages: (props: { pageParam?: number, limit?: number, search?: string }) => Promise<[Cat]> = async ({
  pageParam = 0,
  limit = 200,
  search = ''
}) => {
  let breedQuery = ''
  if (search) {
    const breedId = await getBreedIdByName(search)
    if (breedId) {
      breedQuery = `&breed_id=${breedId}`
    } else {
      return Promise.resolve([])
    }
  }

  return apiFetch(`/images/search?limit=${limit}&page=${pageParam}${breedQuery}`)
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
