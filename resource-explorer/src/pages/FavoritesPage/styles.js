import { styled } from '@mui/material/styles';
import { Container, Box, Typography } from '@mui/material';

export const StyledContainer = styled(Container)({
  paddingTop: 16,
  paddingBottom: 16,
});

export const StyledHeaderBox = styled(Box)({
  marginBottom: 24,
});

export const StyledTitleTypography = styled(Typography)({
  marginBottom: 8,
});

export const StyledSubtitleTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const StyledEmptyStateBox = styled(Box)({
  textAlign: 'center',
  marginTop: 32,
});