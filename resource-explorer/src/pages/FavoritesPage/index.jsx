import { useFavoritesPage } from './useFavoritesPage';
import ItemCard from '../../components/item/ItemCard';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import ErrorState from '../../components/common/ErrorState';
import PaginationControls from '../../components/common/Pagination';
import EmptyState from '../../components/common/EmptyState';
import { Container, Grid, Typography, Box } from '@mui/material';
import { ITEMS_PER_PAGE } from '../../utils/constants';
import {
  StyledContainer,
  StyledHeaderBox,
  StyledTitleTypography,
  StyledSubtitleTypography,
  StyledEmptyStateBox,
} from './styles';

export default function FavoritesPage() {
  const {
    data,
    isLoading,
    error,
    refetch,
    page,
    favorites,
    toggleFavorite,
    handlePageChange,
  } = useFavoritesPage();

  if (isLoading) {
    return (
      <StyledContainer>
        <StyledHeaderBox>
          <StyledTitleTypography variant="h4" component="h1">
            Your Favorites
          </StyledTitleTypography>
        </StyledHeaderBox>
        <LoadingSkeleton variant="cards" count={6} />
      </StyledContainer>
    );
  }
  if (error) return <ErrorState retry={refetch} />;
  if (!data?.results?.length) {
    return (
      <StyledContainer>
        <StyledEmptyStateBox>
          <StyledTitleTypography variant="h4" component="h1">
            Your Favorites
          </StyledTitleTypography>
          <EmptyState message="No favorite Pokémon yet. Add some from the main page!" />
        </StyledEmptyStateBox>
      </StyledContainer>
    );
  }

  const totalPages = Math.ceil(data.count / ITEMS_PER_PAGE);

  return (
    <StyledContainer>
      <StyledHeaderBox>
        <StyledTitleTypography variant="h4" component="h1">
          Your Favorite Pokémon
        </StyledTitleTypography>
        <StyledSubtitleTypography variant="body1">
          {data.count} favorite{data.count !== 1 ? 's' : ''} found
        </StyledSubtitleTypography>
      </StyledHeaderBox>
      
      <Grid container spacing={3}>
        {data.results.map((pokemon) => (
          <Grid item xs={12} sm={6} md={4} key={pokemon.name}>
            <ItemCard
              pokemon={pokemon}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          </Grid>
        ))}
      </Grid>
      
      {totalPages > 1 && (
        <PaginationControls
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </StyledContainer>
  );
}