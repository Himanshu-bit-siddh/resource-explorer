import { Typography, Container } from '@mui/material';

export default function Footer() {
  return (
    <Container sx={{ py: 2, textAlign: 'center', mt: 4 }}>
      <Typography variant="body2">
        © 2025 Pokemon Explorer. Powered by Resorce Explorer.
      </Typography>
    </Container>
  );
}