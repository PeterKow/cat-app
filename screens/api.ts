import axios from 'axios'

const API = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
  headers: {
    // TODO move to ENV
    'x-api-key': 'live_tpiAXTOxiJP3SzO74s5mwjvIrjRefWNiK0Mxzac9vxpoToc3b1moNK5w40I4LCax'
  }
})

export const uploadImage = async (imageUri: string) => {
  const formData = new FormData()
  const filename = imageUri.split('/').pop() || 'image.jpg'
  const match = /\.(\w+)$/.exec(filename)
  const type = match ? `image/${match[1].toLowerCase()}` : 'image/jpeg'
  formData.append('file', { uri: imageUri, name: filename, type } as any)

  const response = await fetch('https://api.thecatapi.com/v1/images/upload', {
    method: 'POST',
    headers: {
      'x-api-key': 'live_tpiAXTOxiJP3SzO74s5mwjvIrjRefWNiK0Mxzac9vxpoToc3b1moNK5w40I4LCax'
    },
    body: formData
  })

  const text = await response.text()
  let data
  try {
    data = JSON.parse(text)
  } catch (e) {
    data = text
  }

  if (!response.ok) {
    console.error('Upload error:', data)
    throw new Error(JSON.stringify(data))
  }
  return data
}

export const fetchImages = async () => {
  const res = await API.get('/images')
  return res.data
}

export const favouriteCat = async (image_id: string) => {
  return await API.post('/favourites', { image_id })
}

export const unfavouriteCat = async (favourite_id: number | string) => {
  return await API.delete(`/favourites/${favourite_id}`)
}

export const voteCat = async (image_id: string, value: number) => {
  return await API.post('/votes', { image_id, value })
}
