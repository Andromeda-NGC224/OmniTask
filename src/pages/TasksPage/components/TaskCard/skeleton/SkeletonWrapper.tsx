import { Box } from '@mui/material';
import type { SkeletonWrapperProps } from './types';
import { SkeletonTaskCardGrid, SkeletonTaskCardList } from './components';

export default function SkeletonWrapper({ viewMode }: SkeletonWrapperProps) {
  return (
    <Box
      display={viewMode === 'grid' ? 'grid' : 'flex'}
      gridTemplateColumns={
        viewMode === 'grid'
          ? 'repeat(auto-fill, minmax(285px, 1fr))'
          : undefined
      }
      flexDirection={viewMode === 'list' ? 'column' : undefined}
      gap={2}
    >
      {Array.from({ length: 6 }).map((_, i) =>
        viewMode === 'grid' ? (
          <SkeletonTaskCardGrid key={i} />
        ) : (
          <SkeletonTaskCardList key={i} />
        ),
      )}
    </Box>
  );
}
