import FavoritesButton from '../favorites/FavoritesButton';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box,
  Chip,
  Grid,
  Paper,
  alpha,
  useTheme,
  Divider
} from '@mui/material';
import { 
  Height as HeightIcon,
  FitnessCenter as WeightIcon,
  Category as TypeIcon
} from '@mui/icons-material';

export default function ItemDetail({ pokemon, favorites, toggleFavorite }) {
  const theme = useTheme();
  
  if (!pokemon) return null;

  const pokemonId = pokemon.id || pokemon.url?.split('/').filter(Boolean).pop();
  const pokemonTypes = pokemon.types?.map(t => t.type.name) || [];
  const pokemonAbilities = pokemon.abilities?.map(a => a.ability.name) || [];
  const pokemonStats = pokemon.stats || [];

  return (
    <Card 
      sx={{ 
        maxWidth: 800, 
        mx: 'auto',
        borderRadius: 4,
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.paper, 0.98)} 100%)`,
        backdropFilter: 'blur(20px)',
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
      }}
    >
      <Box
        sx={{
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
          p: 4,
          position: 'relative',
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  height: 300,
                  width: 300,
                  objectFit: 'contain',
                  borderRadius: 3,
                  background: alpha(theme.palette.background.paper, 0.5),
                  p: 2,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
                image={pokemon.sprites?.front_default || '/placeholder-pokemon.png'}
                alt={pokemon.name}
              />
              
              <Chip
                label={`#${String(pokemonId).padStart(3, '0')}`}
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  background: alpha(theme.palette.background.paper, 0.9),
                  backdropFilter: 'blur(10px)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  px: 2,
                  py: 1,
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, mb: 3 }}>
                <Typography 
                  variant="h3" 
                  component="h1" 
                  sx={{ 
                    textTransform: 'capitalize',
                    fontWeight: 800,
                    mr: 2,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {pokemon.name}
                </Typography>
                <FavoritesButton 
                  name={pokemon.name} 
                  favorites={favorites} 
                  toggleFavorite={toggleFavorite} 
                />
              </Box>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <TypeIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.secondary }}>
                    Types
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  {pokemonTypes.map((type) => (
                    <Chip
                      key={type}
                      label={type}
                      sx={{
                        textTransform: 'capitalize',
                        fontWeight: 600,
                        background: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                        fontSize: '1rem',
                        py: 1,
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {pokemonAbilities.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: theme.palette.text.secondary }}>
                    Abilities
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                    {pokemonAbilities.map((ability) => (
                      <Chip
                        key={ability}
                        label={ability.replace('-', ' ')}
                        variant="outlined"
                        sx={{
                          textTransform: 'capitalize',
                          fontWeight: 500,
                          borderColor: theme.palette.secondary.main,
                          color: theme.palette.secondary.main,
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
      
      <CardContent sx={{ p: 4 }}>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                background: alpha(theme.palette.primary.main, 0.05),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                textAlign: 'center',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                <HeightIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
                  Height
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {(pokemon.height / 10).toFixed(1)} m
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                background: alpha(theme.palette.secondary.main, 0.05),
                border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
                textAlign: 'center',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                <WeightIcon sx={{ mr: 1, color: theme.palette.secondary.main }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.secondary.main }}>
                  Weight
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {(pokemon.weight / 10).toFixed(1)} kg
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        {pokemonStats.length > 0 && (
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
              Base Stats
            </Typography>
            <Grid container spacing={2}>
              {pokemonStats.map((stat) => {
                const statPercentage = Math.min((stat.base_stat / 255) * 100, 100);
                return (
                  <Grid item xs={12} sm={6} key={stat.stat.name}>
                    <Box sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            textTransform: 'capitalize',
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                          }}
                        >
                          {stat.stat.name.replace('-', ' ')}
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 700 }}>
                          {stat.base_stat}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          width: '100%',
                          height: 8,
                          borderRadius: 4,
                          background: alpha(theme.palette.grey[300], 0.5),
                          overflow: 'hidden',
                        }}
                      >
                        <Box
                          sx={{
                            width: `${statPercentage}%`,
                            height: '100%',
                            background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                            borderRadius: 4,
                            transition: 'width 1s ease-in-out',
                          }}
                        />
                      </Box>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}