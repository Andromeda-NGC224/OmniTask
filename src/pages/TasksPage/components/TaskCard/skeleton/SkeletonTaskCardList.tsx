import { Card, Box, Skeleton, useColorScheme } from '@mui/material';
import { toolbarButtons } from '../config';

export default function SkeletonTaskCardList() {
  const { mode } = useColorScheme();

  return (
    <Card
      variant='outlined'
      sx={{
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 3,
        gap: 2,
        border: mode === 'light' ? '1px solid' : 'none',
        borderColor: 'divider',
      }}
    >
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Skeleton variant='circular' width={24} height={24} />
            <Skeleton variant='text' width='50%' />
          </Box>
          <Skeleton variant='text' width='80%' />
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Skeleton variant='rounded' width={80} height={24} />
          <Box sx={{ display: 'flex', gap: 1 }}>
            {toolbarButtons.map((_, index) => (
              <Skeleton key={index} variant='circular' width={24} height={24} />
            ))}
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
