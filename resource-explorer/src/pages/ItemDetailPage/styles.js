import { styled } from '@mui/material/styles';
import { Box, Container, Card, CardContent, Typography, Button, Paper, alpha } from '@mui/material';

export const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: 16,
  paddingBottom: 16,
  minHeight: '100vh',
}));

export const StyledBackButton = styled(Button)(({ theme }) => ({
  marginBottom: 16,
  borderRadius: 8,
  textTransform: 'none',
  fontWeight: 500,
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 32px rgba(0, 0, 0, 0.4)'
    : '0 8px 32px rgba(74, 144, 226, 0.15)',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.mode === 'dark'
    ? 'rgba(148, 163, 184, 0.2)'
    : 'rgba(226, 232, 240, 0.6)'
  }`,
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: 24,
}));

export const StyledPokemonName = styled(Typography)(({ theme }) => ({
  textTransform: 'capitalize',
  fontWeight: 700,
  marginBottom: 8,
}));

export const StyledStatBar = styled(Box)(({ theme, statvalue }) => {
  const getColor = (value) => {
    if (value > 80) return theme.palette.success.main;
    if (value > 50) return theme.palette.warning.main;
    return theme.palette.error.main;
  };
  
  return {
    height: 6,
    borderRadius: 3,
    backgroundColor: getColor(statvalue),
    transition: 'width 0.5s ease',
  };
});

export const StyledInfoCard = styled(Paper)(({ theme }) => ({
  padding: 16,
  textAlign: 'center',
  borderRadius: 8,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.mode === 'dark'
    ? alpha('#1E293B', 0.8)
    : alpha('#FFFFFF', 0.9),
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 12px rgba(0, 0, 0, 0.3)'
    : '0 4px 12px rgba(74, 144, 226, 0.1)',
}));