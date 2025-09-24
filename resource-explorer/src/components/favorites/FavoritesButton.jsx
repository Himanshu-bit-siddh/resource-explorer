import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { IconButton, alpha, useTheme } from '@mui/material';

export default function FavoritesButton({ name, favorites, toggleFavorite }) {
  const theme = useTheme();
  const isFavorite = favorites.includes(name);

  return (
    <IconButton 
      onClick={() => toggleFavorite(name)}
      sx={{
        background: alpha(theme.palette.background.paper, 0.9),
        backdropFilter: 'blur(10px)',
        border: `1px solid ${alpha(
          isFavorite ? theme.palette.secondary.main : 
          (theme.palette.mode === 'dark' ? '#94A3B8' : theme.palette.grey[400]), 
          0.3
        )}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          background: alpha(
            isFavorite ? theme.palette.secondary.main : 
            (theme.palette.mode === 'dark' ? '#94A3B8' : theme.palette.grey[400]), 
            0.1
          ),
          transform: 'scale(1.1)',
          boxShadow: `0 4px 15px ${alpha(
            isFavorite ? theme.palette.secondary.main : 
            (theme.palette.mode === 'dark' ? '#94A3B8' : theme.palette.grey[400]), 
            0.3
          )}`,
        },
        '&:active': {
          transform: 'scale(0.95)',
        },
      }}
    >
      {isFavorite ? (
        <Favorite 
          sx={{ 
            color: theme.palette.secondary.main,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
          }} 
        />
      ) : (
        <FavoriteBorder 
          sx={{ 
            color: theme.palette.mode === 'dark' ? '#94A3B8' : theme.palette.grey[600],
            transition: 'color 0.3s ease',
          }} 
        />
      )}
    </IconButton>
  );
}