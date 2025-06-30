import { Box, Skeleton } from '@mui/material';
import { memo } from 'react';

const ColumnSkeleton = memo(() => {
  return (
    <Box
      sx={{
        width: { md: '100%', sm: '90%' },
        maxWidth: { xs: '100%', sm: 340, md: 380 },
        borderRadius: 4,
        boxShadow: 1,
        p: { xs: 1.5, sm: 2.5 },
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 1, sm: 2 },
        height: '100%',
        flexShrink: 0,
        backgroundColor: 'background.paper',
      }}
    >
      <Skeleton variant='text' width='60%' height={30} />
      {[...Array(2)].map((_, index) => (
        <Skeleton
          key={index}
          variant='rectangular'
          height={100}
          sx={{
            borderRadius: 2,
          }}
        />
      ))}
    </Box>
  );
});

export default function KanbanSkeleton() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(3, 1fr)',
        },
        gap: 3,
        margin: '0 auto',
        width: { lg: '70%', md: '100%', sm: '100%' },
        backgroundColor: 'background.default',
      }}
    >
      {[...Array(3)].map((_, index) => (
        <ColumnSkeleton key={index} />
      ))}
    </Box>
  );
}
