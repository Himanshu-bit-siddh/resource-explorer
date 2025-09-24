import { useParams, useNavigate } from 'react-router-dom';
import { useItemDetailPage } from './useItemDetailPage';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import ErrorState from '../../components/common/ErrorState';
import FavoritesButton from '../../components/favorites/FavoritesButton';
import {
  Box,
  CardMedia,
  Typography,
  Grid,
  Chip,
  Stack,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import {
  StyledContainer,
  StyledBackButton,
  StyledCard,
  StyledCardContent,
  StyledPokemonName,
  StyledStatBar,
  StyledInfoCard,
} from './styles';

export default function ItemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pokemon, isLoading, error, refetch, favorites, toggleFavorite } = useItemDetailPage(id);

  if (isLoading) return <LoadingSkeleton variant="detail" />;
  if (error) return <ErrorState retry={refetch} />;
  if (!pokemon) return <LoadingSkeleton variant="detail" />;

  return (
    <StyledContainer maxWidth="md">
      <StyledBackButton
        variant="outlined"
        startIcon={<ArrowBack />}
        onClick={() => navigate('/')}
      >
        Back to Home
      </StyledBackButton>
      <StyledCard>
        <Grid container>
          <Grid item xs={12} md={5}>
            <Box sx={{ p: 2, textAlign: 'center', bgcolor: 'grey.50' }}>
              <CardMedia
                component="img"
                image={
                  pokemon.sprites?.other?.['official-artwork']?.front_default ||
                  pokemon.sprites?.front_default
                }
                alt={pokemon.name}
                sx={{
                  height: 250,
                  objectFit: 'contain',
                  mx: 'auto',
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <StyledCardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box>
                  <StyledPokemonName variant="h4">
                    {pokemon.name}
                  </StyledPokemonName>
                  <Typography variant="subtitle1" color="text.secondary">
                    #{String(pokemon.id).padStart(3, '0')}
                  </Typography>
                </Box>
                <FavoritesButton
                  name={pokemon.name}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              </Box>

              <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                {pokemon.types?.map((type) => (
                  <Chip
                    key={type.type.name}
                    label={type.type.name}
                    size="small"
                    color="primary"
                    sx={{ textTransform: 'capitalize', fontWeight: 500 }}
                  />
                ))}
              </Stack>

              <Grid container spacing={1} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <StyledInfoCard elevation={0}>
                    <Typography variant="caption" color="text.secondary">
                      Height
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {(pokemon.height / 10).toFixed(1)}m
                    </Typography>
                  </StyledInfoCard>
                </Grid>
                <Grid item xs={6}>
                  <StyledInfoCard elevation={0}>
                    <Typography variant="caption" color="text.secondary">
                      Weight
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {(pokemon.weight / 10).toFixed(1)}kg
                    </Typography>
                  </StyledInfoCard>
                </Grid>
              </Grid>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                  Abilities
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {pokemon.abilities?.map((ability) => (
                    <Chip
                      key={ability.ability.name}
                      label={ability.ability.name.replace('-', ' ')}
                      variant="outlined"
                      size="small"
                      sx={{ textTransform: 'capitalize' }}
                    />
                  ))}
                </Stack>
              </Box>

              <Box>
                <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                  Base Stats
                </Typography>
                {pokemon.stats?.slice(0, 6).map((stat) => (
                  <Box key={stat.stat.name} sx={{ mb: 1.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" sx={{ textTransform: 'capitalize', fontSize: '0.9rem' }}>
                        {stat.stat.name.replace('-', ' ')}
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {stat.base_stat}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: '100%',
                        height: 6,
                        backgroundColor: 'grey.200',
                        borderRadius: 3,
                        overflow: 'hidden',
                      }}
                    >
                      <StyledStatBar
                        statvalue={stat.base_stat}
                        sx={{
                          width: `${Math.min((stat.base_stat / 200) * 100, 100)}%`,
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            </StyledCardContent>
          </Grid>
        </Grid>
      </StyledCard>
    </StyledContainer>
  );
}
