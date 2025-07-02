import { Box, Skeleton } from '@mui/material';
import { memo } from 'react';
import { columnSkeletonStyles, kanbanSkeletonStyles } from './styles';

const ColumnSkeleton = () => {
  return (
    <Box sx={columnSkeletonStyles}>
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
};

const KanbanSkeleton = memo(() => {
  return (
    <Box sx={kanbanSkeletonStyles}>
      {[...Array(3)].map((_, index) => (
        <ColumnSkeleton key={index} />
      ))}
    </Box>
  );
});

export default KanbanSkeleton;
