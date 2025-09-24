import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { fetchPokemonList } from '../../api/resourceApi';
import { QUERY_KEYS } from '../../api/queryKeys';
import { useFavorites } from '../../hooks/useFavorites';
import { useUrlState } from '../../hooks/useUrlState';

export function useFavoritesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { page, query, filter, sort } = useUrlState();
  const { favorites, toggleFavorite } = useFavorites();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEYS.POKEMON_LIST, { query, filter, sort, page, favoritesOnly: true, favorites }],
    queryFn: () => fetchPokemonList({ query, filter, sort, page, favoritesOnly: true, favorites }),
    staleTime: 5 * 60 * 1000,
  });

  const handlePageChange = (newPage) => {
    setSearchParams({ ...Object.fromEntries(searchParams), page: newPage });
  };

  return {
    data,
    isLoading,
    error,
    refetch,
    page,
    favorites,
    toggleFavorite,
    handlePageChange,
  };
}