import { Skeleton, Card, CardContent, Box } from '@mui/material';

export default function PokemonCardSkeleton() {
  return (
    <Card 
      sx={{ 
        borderRadius: 3, 
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ p: 2, bgcolor: 'grey.50', position: 'relative' }}>
        <Skeleton 
          variant="rectangular" 
          height={180} 
          sx={{ borderRadius: 2 }} 
        />

        <Skeleton 
          variant="rounded" 
          width={40} 
          height={20} 
          sx={{ 
            position: 'absolute', 
            top: 12, 
            right: 12 
          }} 
        />

        <Skeleton 
          variant="circular" 
          width={40} 
          height={40} 
          sx={{ 
            position: 'absolute', 
            top: 12, 
            left: 12 
          }} 
        />
      </Box>
      
      <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Skeleton 
          variant="text" 
          width="80%" 
          height={32} 
          sx={{ mb: 2 }} 
        />

        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Skeleton variant="rounded" width={60} height={24} />
          <Skeleton variant="rounded" width={50} height={24} />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Skeleton 
          variant="rounded" 
          height={40} 
          sx={{ mt: 'auto' }} 
        />
      </CardContent>
    </Card>
  );
}