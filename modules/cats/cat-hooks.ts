import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchImages } from '@modules/cats/cat-api'

export function useCats({ limit = 200, search = '' }) {
  const query = useInfiniteQuery({
    queryKey: ['cats', search],
    queryFn: ({ pageParam = 0 }) =>
      fetchImages({ pageParam, limit, search }),
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
