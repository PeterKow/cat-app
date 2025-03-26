import React from 'react'
import { render } from '@testing-library/react-native'
import CatCard from './cat-card'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {Cat} from '@modules/cats/cat-types'

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)


const queryClient = new QueryClient()

const renderWithClient = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  )
}
const cat: Cat = { "favourite_id": 232522887,"id": "2ob", "url": "https://cdn2.thecatapi.com/images/2ob.jpg"}

test('renders correctly', () => {
  const { getByTestId } = renderWithClient(<CatCard cat={cat} />)
  expect(getByTestId('vote-up-button')).toBeTruthy()
})

