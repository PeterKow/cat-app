import {useInfiniteQuery} from '@tanstack/react-query'
import { fetchImages } from '@modules/cats/cat-api'

export function useCats({ limit = 200 }) {
  const query = useInfiniteQuery({
    queryKey: ['cats'],
    queryFn: ({ pageParam = 0 }) =>
      fetchImages({ pageParam, limit }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.flat().length
      return totalFetched % limit === 0 ? allPages.length : undefined
    }
  })

  const cats = query.data?.pages.flat() || []

  return {
    ...query,
    cats,
  }
}
