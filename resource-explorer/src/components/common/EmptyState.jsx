import { Typography, Box } from '@mui/material';

export default function EmptyState({ message = "No Pokémon found. Try adjusting your search or filters." }) {
  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h6" color="textSecondary">
        {message}
      </Typography>
    </Box>
  );
}