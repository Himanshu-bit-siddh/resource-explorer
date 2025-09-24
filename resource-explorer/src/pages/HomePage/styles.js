import { styled } from '@mui/material/styles';
import { Box, Container, Paper, Typography, Button, Grid, alpha } from '@mui/material';

export const StyledMainBox = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: theme.palette.mode === 'light' ? theme.palette.background.default : theme.palette.background.paper,
  paddingBottom: 32,
}));

export const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: 32,
  maxWidth: 'xl',
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  background: alpha(theme.palette.background.paper, 0.95),
  backdropFilter: 'blur(20px)',
  borderRadius: 16,
  // padding: 24,
  marginBottom: 24,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: theme.palette.primary.main,
  },
}));

export const StyledHeroBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 16,
  '& > div': {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
});

export const StyledIconBox = styled(Box)(({ theme }) => ({
  background: theme.palette.primary.main,
  borderRadius: '50%',
  padding: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& .MuiSvgIcon-root': {
    fontSize: 32,
    color: theme.palette.common.white,
  },
}));

export const StyledTitleTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  color: theme.palette.text.primary,
  marginBottom: 4,
}));

export const StyledSubtitleTypography = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  color: theme.palette.text.secondary,
  '& .MuiSvgIcon-root': {
    fontSize: 18,
  },
}));

export const StyledChipBox = styled(Box)({
  display: 'flex',
  gap: 16,
  alignItems: 'center',
  flexWrap: 'wrap',
  '& .MuiChip-root': {
    borderColor: theme => theme.palette.primary.main,
    color: theme => theme.palette.primary.main,
    fontWeight: 600,
  },
});

export const StyledToggleButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: '12px 24px',
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '1rem',
  boxShadow: theme => `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme => `0 12px 32px ${alpha(theme.palette.primary.main, 0.4)}`,
  },
}));

export const StyledGridBox = styled(Box)({
  '&:hover': {
    transform: 'translateY(-8px)',
    transition: 'transform 0.3s ease',
  },
});

export const StyledGridContainer = styled(Grid)({
  display: 'flex',
  justifyContent: 'space-between',
});

