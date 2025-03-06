// TODO use .env to inject api key
const API_KEY = ''
const BASE_URL = 'https://api.thecatapi.com/v1'

const handleResponse = async (response: Response) => {
  const text = await response.text()
  let data
  try {
    data = JSON.parse(text)
  } catch (e) {
    data = text
  }
  if (!response.ok) {
    throw new Error(JSON.stringify(data))
  }
  return data
}

const defaultHeaders = {
  'x-api-key': API_KEY
}

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  options.headers = {
    ...defaultHeaders,
    ...options.headers,
  }
  const response = await fetch(`${BASE_URL}${endpoint}`, options)
  return handleResponse(response)
}

export const createRequest = (method: string, data?: any) => {
  let headers = {}
  let body

  if (data) {
    if (data instanceof FormData) {
      body = data
    } else {
      headers = { 'Content-Type': 'application/json' }
      body = JSON.stringify(data)
    }
  }
  return {
    method,
    headers,
    body,
  }
}
