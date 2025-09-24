import { useQuery } from '@tanstack/react-query';
import { fetchPokemonDetail } from '../../api/resourceApi';
import { QUERY_KEYS } from '../../api/queryKeys';
import { useFavorites } from '../../hooks/useFavorites';

export function useItemDetailPage(id) {
  const { favorites, toggleFavorite } = useFavorites();
  const { data: pokemon, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEYS.POKEMON_DETAIL, id],
    queryFn: () => fetchPokemonDetail(id),
    staleTime: 5 * 60 * 1000,
  });

  return { pokemon, isLoading, error, refetch, favorites, toggleFavorite };
}