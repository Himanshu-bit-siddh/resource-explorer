import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { fetchPokemonList } from '../../api/resourceApi';
import { QUERY_KEYS } from '../../api/queryKeys';
import { useFavorites } from '../../hooks/useFavorites';
import ItemCard from '../item/ItemCard';
import LoadingSkeleton from '../common/LoadingSkeleton';
import ErrorState from '../common/ErrorState';
import EmptyState from '../common/EmptyState';
import PaginationControls from '../common/Pagination';
import { Grid, Button } from '@mui/material';
import { useUrlState } from '../../hooks/useUrlState';
import { useEffect } from 'react';

export default function FavoritesList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { page, query, filter, sort, favorites: favoritesOnly } = useUrlState();
  const { favorites, toggleFavorite } = useFavorites();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEYS.POKEMON_LIST, { query, filter, sort, page, favoritesOnly, favorites }],
    queryFn: () => fetchPokemonList({ query, filter, sort, page, favoritesOnly, favorites }),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <LoadingSkeleton variant="cards" count={6} />;
  if (error) return <ErrorState retry={refetch} />;

  const { results = [], count = 0 } = data;
  const totalPages = Math.ceil(count / 20);

  const handlePageChange = (newPage) => {
    setSearchParams({ ...Object.fromEntries(searchParams), page: newPage });
  };

  const toggleFavoritesFilter = () => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      favorites: favoritesOnly ? undefined : 'true',
      page: '1',
    });
  };


  return (
    <div>
      {results.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <Grid container spacing={2}>
            {results.map(p => (
              <Grid item xs={12} sm={6} md={4} key={p.name}>
                <ItemCard pokemon={p} favorites={favorites} toggleFavorite={toggleFavorite} />
              </Grid>
            ))}
          </Grid>
          <PaginationControls page={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      )}
      <Button
        variant="contained"
        color="secondary"
        onClick={toggleFavoritesFilter}
        sx={{ mt: 2 }}
      >
        {favoritesOnly ? 'Show All' : 'Show Favorites'}
      </Button>
    </div>
  );
}
