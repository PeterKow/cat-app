import { useQuery } from '@tanstack/react-query'
import { fetchImages } from '@modules/cats/cat-api'

export function useCats() {
  const { data: cats, refetch, isPending } = useQuery({
    queryKey: ['cats'],
    queryFn: fetchImages,
  })

  return { cats, refetch, isPending }
}
