import { Skeleton, Grid, Box, Card, CardContent } from '@mui/material';

export default function LoadingSkeleton({ variant = 'cards', count = 8 }) {
  if (variant === 'cards') {
    return (
      <Grid container spacing={3}>
        {Array.from({ length: count }).map((_, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
            <Card sx={{ 
              borderRadius: 3, 
              overflow: 'hidden',
              backgroundColor: (theme) => theme.palette.background.paper,
              border: (theme) => `1px solid ${theme.palette.mode === 'dark'
                ? 'rgba(148, 163, 184, 0.2)'
                : 'rgba(226, 232, 240, 0.6)'
              }`,
            }}>
              <Box sx={{ 
                p: 2, 
                bgcolor: (theme) => theme.palette.mode === 'dark'
                  ? 'rgba(30, 41, 59, 0.5)'
                  : 'rgba(248, 250, 252, 0.8)'
              }}>
                <Skeleton 
                  variant="rectangular" 
                  height={180} 
                  sx={{ borderRadius: 2 }} 
                />
              </Box>
              <CardContent sx={{ p: 3 }}>
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
                <Skeleton 
                  variant="rounded" 
                  height={40} 
                  sx={{ mt: 'auto' }} 
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (variant === 'detail') {
    return (
      <Box sx={{ maxWidth: 'md', mx: 'auto', p: 2 }}>
        <Skeleton variant="rounded" width={120} height={40} sx={{ mb: 2 }} />
        
        <Card sx={{ 
          borderRadius: 3, 
          overflow: 'hidden',
          backgroundColor: (theme) => theme.palette.background.paper,
          border: (theme) => `1px solid ${theme.palette.mode === 'dark'
            ? 'rgba(148, 163, 184, 0.2)'
            : 'rgba(226, 232, 240, 0.6)'
          }`,
        }}>
          <Grid container>
            <Grid item xs={12} md={5}>
              <Box sx={{ 
                p: 3, 
                bgcolor: (theme) => theme.palette.mode === 'dark'
                  ? 'rgba(30, 41, 59, 0.5)'
                  : 'rgba(248, 250, 252, 0.8)',
                minHeight: 300 
              }}>
                <Skeleton 
                  variant="rectangular" 
                  height={250} 
                  sx={{ borderRadius: 2 }} 
                />
              </Box>
            </Grid>
            
            <Grid item xs={12} md={7}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Box>
                    <Skeleton variant="text" width={200} height={40} />
                    <Skeleton variant="text" width={80} height={24} />
                  </Box>
                  <Skeleton variant="circular" width={40} height={40} />
                </Box>
                
                <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                  <Skeleton variant="rounded" width={70} height={28} />
                  <Skeleton variant="rounded" width={60} height={28} />
                </Box>
                
                <Grid container spacing={1} sx={{ mb: 3 }}>
                  <Grid item xs={6}>
                    <Skeleton variant="rounded" height={80} />
                  </Grid>
                  <Grid item xs={6}>
                    <Skeleton variant="rounded" height={80} />
                  </Grid>
                </Grid>

                <Box sx={{ mb: 3 }}>
                  <Skeleton variant="text" width={100} height={24} sx={{ mb: 1 }} />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Skeleton variant="rounded" width={80} height={24} />
                    <Skeleton variant="rounded" width={90} height={24} />
                  </Box>
                </Box>

                <Box>
                  <Skeleton variant="text" width={100} height={24} sx={{ mb: 2 }} />
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Box key={i} sx={{ mb: 1.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Skeleton variant="text" width={100} height={20} />
                        <Skeleton variant="text" width={30} height={20} />
                      </Box>
                      <Skeleton variant="rounded" height={6} />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Box>
    );
  }

  if (variant === 'hero') {
    return (
      <Box sx={{ mb: 4 }}>
        <Card sx={{ 
          borderRadius: 4, 
          p: 4,
          backgroundColor: (theme) => theme.palette.background.paper,
          border: (theme) => `1px solid ${theme.palette.mode === 'dark'
            ? 'rgba(148, 163, 184, 0.2)'
            : 'rgba(226, 232, 240, 0.6)'
          }`,
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Skeleton variant="circular" width={64} height={64} />
              <Box>
                <Skeleton variant="text" width={250} height={40} />
                <Skeleton variant="text" width={300} height={24} />
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Skeleton variant="rounded" width={120} height={32} />
              <Skeleton variant="rounded" width={160} height={48} />
            </Box>
          </Box>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} variant="text" sx={{ mb: 1 }} />
      ))}
    </Box>
  );
}