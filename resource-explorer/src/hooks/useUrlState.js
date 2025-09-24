import { useSearchParams } from 'react-router-dom';

export function useUrlState() {
  const [searchParams] = useSearchParams();
  return {
    query: searchParams.get('q') || '',
    filter: searchParams.get('filter') || '',
    sort: searchParams.get('sort') || '',
    page: Number(searchParams.get('page')) || 1,
    favorites: searchParams.get('favorites') === 'true',
  };
}