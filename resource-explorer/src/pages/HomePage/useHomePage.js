import { useSearchParams } from 'react-router-dom';
import { usePokemonListInfinite } from '../../api/resourceExplorerQuery';
import { useFavorites } from '../../hooks/useFavorites';
import { useUrlState } from '../../hooks/useUrlState';
import { useCallback, useMemo, useEffect } from 'react';

export function useHomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { query, filter, sort } = useUrlState();
  const { favorites: favoriteItems, toggleFavorite } = useFavorites();
  const showFavoritesOnly = searchParams.get('favorites') === 'true';

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
    refetch
  } = usePokemonListInfinite({
    query,
    filter,
    sort,
    limit: 20,
    favoritesOnly: showFavoritesOnly,
    favorites: favoriteItems,
  });

  const allPokemon = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap(page => page.results || []);
  }, [data]);

  const totalResults = data?.pages?.[0]?.count || 0;

  const toggleShowFavorites = useCallback(() => {
    const newParams = new URLSearchParams(searchParams);
    if (showFavoritesOnly) {
      newParams.delete('favorites');
    } else {
      newParams.set('favorites', 'true');
    }
    setSearchParams(newParams);
  }, [searchParams, showFavoritesOnly, setSearchParams]);

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    const saveScrollPosition = () => {
      sessionStorage.setItem('homePageScrollPosition', window.scrollY.toString());
    };

    window.addEventListener('beforeunload', saveScrollPosition);

    return () => {
      saveScrollPosition();
      window.removeEventListener('beforeunload', saveScrollPosition);
    };
  }, []);

  useEffect(() => {
    const savedPosition = sessionStorage.getItem('homePageScrollPosition');
    if (savedPosition && allPokemon.length > 0) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedPosition));
        sessionStorage.removeItem('homePageScrollPosition');
      }, 100);
    }
  }, [allPokemon.length]);

  return {
    pokemon: allPokemon,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    loadMore,
    error,
    refetch,
    favorites: favoriteItems,
    toggleFavorite,
    showFavoritesOnly,
    toggleShowFavorites,
    totalResults,
  };
}