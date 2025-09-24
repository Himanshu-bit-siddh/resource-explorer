import { Link } from 'react-router-dom';
import FavoritesButton from '../favorites/FavoritesButton';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Box,
  Chip,
  alpha,
  useTheme,
  Skeleton
} from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { memo } from 'react';

function ItemCard({ pokemon, favorites, toggleFavorite, isLoading = false }) {
  const theme = useTheme();
  
  const pokemonTypes = pokemon?.types?.map(t => t.type.name) || [];
  const pokemonId = pokemon?.url ? pokemon.url.split('/').filter(Boolean).pop() : pokemon?.id;
  
  if (isLoading || !pokemon) {
    return (
      <Card 
        sx={{
          maxWidth: 345,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ p: 2, bgcolor: 'grey.50', position: 'relative' }}>
          <Skeleton variant="rectangular" height={180} sx={{ borderRadius: 2 }} />
          <Skeleton variant="rounded" width={40} height={20} sx={{ position: 'absolute', top: 12, right: 12 }} />
          <Skeleton variant="circular" width={40} height={40} sx={{ position: 'absolute', top: 12, left: 12 }} />
        </Box>
        <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Skeleton variant="text" width="80%" height={32} sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Skeleton variant="rounded" width={60} height={24} />
            <Skeleton variant="rounded" width={50} height={24} />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Skeleton variant="rounded" height={40} />
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card 
      sx={{
        maxWidth: 345,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
        backdropFilter: 'blur(10px)',
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.1)}`,
        '&:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.2)}`,
          borderColor: alpha(theme.palette.primary.main, 0.3),
        },
      }}
    >
      <Box 
        sx={{ 
          position: 'relative',
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
          p: 2,
        }}
      >
        <CardMedia
          component="img"
          height="180"
          image={pokemon.sprites?.front_default || '/placeholder-pokemon.png'}
          alt={pokemon.name}
          sx={{
            objectFit: 'contain',
            borderRadius: 2,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
        />
        <Chip
          label={`#${String(pokemonId).padStart(3, '0')}`}
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            background: alpha(theme.palette.background.paper, 0.9),
            backdropFilter: 'blur(10px)',
            fontWeight: 700,
            fontSize: '0.75rem',
          }}
        />
        
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
          }}
        >
          <FavoritesButton 
            name={pokemon.name} 
            favorites={favorites} 
            toggleFavorite={toggleFavorite} 
          />
        </Box>
      </Box>

      <CardContent 
        sx={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 3,
        }}
      >
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            textTransform: 'capitalize',
            fontWeight: 700,
            mb: 2,
            fontSize: '1.25rem',
            background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.main} 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {pokemon.name}
        </Typography>
        
        {pokemonTypes.length > 0 && (
          <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {pokemonTypes.map((type) => (
              <Chip
                key={type}
                label={type}
                size="small"
                sx={{
                  textTransform: 'capitalize',
                  fontWeight: 600,
                  background: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  '&:hover': {
                    background: alpha(theme.palette.primary.main, 0.2),
                  },
                }}
              />
            ))}
          </Box>
        )}

        <Box sx={{ flexGrow: 1 }} />
        
        <Button 
          component={Link} 
          to={`/items/${pokemon.name}`} 
          variant="contained"
          fullWidth
          startIcon={<Visibility />}
          sx={{
            borderRadius: 2,
            py: 1.5,
            fontWeight: 600,
            textTransform: 'none',
            fontSize: '1rem',
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            boxShadow: `0 4px 15px ${alpha(theme.palette.primary.main, 0.3)}`,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.4)}`,
              background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
            },
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}

export default memo(ItemCard, (prevProps, nextProps) => {
  return (
    prevProps.pokemon?.name === nextProps.pokemon?.name &&
    prevProps.isLoading === nextProps.isLoading &&
    prevProps.favorites.includes(prevProps.pokemon?.name) === 
    nextProps.favorites.includes(nextProps.pokemon?.name)
  );
});