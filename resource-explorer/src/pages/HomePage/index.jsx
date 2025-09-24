import ItemCard from '../../components/item/ItemCard';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import PokemonCardSkeleton from '../../components/common/PokemonCardSkeleton';
import ErrorState from '../../components/common/ErrorState';
import EmptyState from '../../components/common/EmptyState';
import { 
  Container, 
  Grid, 
  Box, 
  Typography, 
  Chip,
  CircularProgress,
  Button,
} from '@mui/material';
import { 
  FavoriteOutlined, 
  ViewList, 
  CatchingPokemon,
  AutoAwesome,
  ExpandMore
} from '@mui/icons-material';
import { useHomePage } from './useHomePage';
import { useEffect, useCallback } from 'react';
import {
  StyledMainBox,
  StyledContainer,
  StyledPaper,
  StyledHeroBox,
  StyledIconBox,
  StyledTitleTypography,
  StyledSubtitleTypography,
  StyledChipBox,
  StyledToggleButton,
  StyledGridBox,
  StyledGridContainer,
} from './styles';

export default function HomePage() {
  const {
    pokemon,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    loadMore,
    error,
    refetch,
    favorites,
    toggleFavorite,
    showFavoritesOnly,
    toggleShowFavorites,
    totalResults,
  } = useHomePage();

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 1000
    ) {
      loadMore();
    }
  }, [loadMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (isLoading && pokemon.length === 0) {
    return (
      <StyledMainBox>
        <StyledContainer>
          <LoadingSkeleton variant="hero" />
          <LoadingSkeleton variant="cards" count={12} />
        </StyledContainer>
      </StyledMainBox>
    );
  }
  if (error) return <ErrorState retry={refetch} />;
  if (!isLoading && pokemon.length === 0) {
    return (
      <StyledContainer>
        <Box>
          <EmptyState message={showFavoritesOnly ? "No favorite Pokemon found" : "No Pokemon found"} />
        </Box>
      </StyledContainer>
    );
  }

  return (
    <StyledMainBox>
      <StyledContainer>
        <StyledPaper elevation={0}>
          <StyledHeroBox>
            <Box>
              <StyledIconBox>
                <CatchingPokemon />
              </StyledIconBox>
              <Box>
                <StyledTitleTypography variant="h3" component="h1">
                  Pokemon Explorer
                </StyledTitleTypography>
                <StyledSubtitleTypography variant="subtitle1">
                  <AutoAwesome />
                  Discover and collect your favorite Pokémon
                </StyledSubtitleTypography>
              </Box>
            </Box>
            <StyledChipBox>
              <Chip
                icon={<ViewList />}
                label={`${pokemon.length} of ${totalResults} loaded`}
                variant="outlined"
              />
              <StyledToggleButton
                variant={showFavoritesOnly ? "contained" : "outlined"}
                onClick={toggleShowFavorites}
                startIcon={<FavoriteOutlined />}
              >
                {showFavoritesOnly ? "Show All Pokémon" : "Show Favorites Only"}
              </StyledToggleButton>
            </StyledChipBox>
          </StyledHeroBox>
        </StyledPaper>
        
        <StyledGridContainer container spacing={3}>
          {pokemon.map((pokemonItem, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={`${pokemonItem.name}-${index}`}>
              <StyledGridBox>
                <ItemCard
                  pokemon={pokemonItem}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              </StyledGridBox>
            </Grid>
          ))}
        </StyledGridContainer>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          mt: 4,
          mb: 2,
          flexDirection: 'column',
          gap: 2
        }}>
          {isFetchingNextPage && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CircularProgress size={24} />
              <Typography variant="body2" color="text.secondary">
                Loading more Pokémon...
              </Typography>
            </Box>
          )}
          
          {isFetchingNextPage && (
            <Box sx={{ mt: 3, width: '100%' }}>
              <Grid container spacing={3}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={`skeleton-${i}`}>
                    <PokemonCardSkeleton />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
          
          {hasNextPage && !isFetchingNextPage && (
            <Button
              variant="outlined"
              size="large"
              onClick={loadMore}
              startIcon={<ExpandMore />}
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                },
              }}
            >
              Load More Pokémon
            </Button>
          )}
          
          {!hasNextPage && pokemon.length > 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              You've seen all available Pokémon! 🎉
            </Typography>
          )}
        </Box>
      </StyledContainer>
    </StyledMainBox>
  );
}