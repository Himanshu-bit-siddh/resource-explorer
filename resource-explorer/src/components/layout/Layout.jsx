import Header from './Header';
import Footer from './Footer';
import { Box, Container } from '@mui/material';

export default function Layout({ children }) {
  return (
    <Box>
      <Header />
      <Container sx={{ mt: 4, minHeight: 'calc(100vh - 200px)' }}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
}