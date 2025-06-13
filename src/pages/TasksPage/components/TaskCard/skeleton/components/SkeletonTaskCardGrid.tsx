import { Card, Box, Skeleton, useColorScheme } from '@mui/material';
import { toolbarButtons } from '../../config';

export default function SkeletonTaskCardGrid() {
  const { mode } = useColorScheme();

  return (
    <Card
      variant='outlined'
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 3,
        gap: 2,
        border: mode === 'light' ? '1px solid' : 'none',
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          flexDirection: 'column',
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Skeleton variant='circular' width={24} height={24} />
          <Skeleton variant='text' width='60%' />
        </Box>
        <Skeleton variant='text' width='80%' />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: '40px',
        }}
      >
        <Skeleton variant='rounded' width={80} height={24} />
        <Box display='flex' gap={1}>
          {toolbarButtons.map((_, index) => (
            <Skeleton key={index} variant='circular' width={24} height={24} />
          ))}
        </Box>
      </Box>
    </Card>
  );
}
