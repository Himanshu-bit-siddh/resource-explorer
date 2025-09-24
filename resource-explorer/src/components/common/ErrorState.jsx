import { Button, Typography } from '@mui/material';

export default function ErrorState({ retry }) {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <Typography color="error">Something went wrong. Please try again.</Typography>
      <Button variant="contained" color="primary" onClick={retry} sx={{ mt: 2 }}>
        Retry
      </Button>
    </div>
  );
}