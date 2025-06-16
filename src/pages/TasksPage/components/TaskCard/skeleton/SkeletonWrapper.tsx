import { Box } from '@mui/material';
import type { SkeletonWrapperProps } from './types';
import { SkeletonTaskCardGrid, SkeletonTaskCardList } from './components';
import { ViewMode } from 'pages/TasksPage/types';

export default function SkeletonWrapper({ viewMode }: SkeletonWrapperProps) {
  return (
    <Box
      display={viewMode === ViewMode.Grid ? 'grid' : 'flex'}
      gridTemplateColumns={
        viewMode === ViewMode.Grid
          ? 'repeat(auto-fill, minmax(285px, 1fr))'
          : undefined
      }
      flexDirection={viewMode === ViewMode.List ? 'column' : undefined}
      gap={2}
    >
      {Array.from({ length: 6 }).map((_, i) =>
        viewMode === ViewMode.Grid ? (
          <SkeletonTaskCardGrid key={i} />
        ) : (
          <SkeletonTaskCardList key={i} />
        ),
      )}
    </Box>
  );
}
