import { Box, Typography, useColorScheme } from '@mui/material';
import { type ColumnProps } from './types';
import { memo } from 'react';

import { useDroppable } from '@dnd-kit/core';
import TaskItem from '../TaskItem/TaskItem';
import Sortable from '../Sortable/Sortable';
import { formatColumnTitle } from './utils';
import { useTranslation } from 'react-i18next';
import { getColumnStyles } from './styles';

export default memo(function Column({ title, tasks }: ColumnProps) {
  const { mode } = useColorScheme();
  const { setNodeRef, isOver } = useDroppable({ id: title });

  const { t } = useTranslation('tasks_page');

  const formattedTitle = formatColumnTitle(title, t);

  return (
    <Box ref={setNodeRef} sx={getColumnStyles(mode ?? 'light', isOver)}>
      <Typography
        variant='h6'
        sx={{
          textTransform: 'capitalize',
          fontWeight: 700,
          letterSpacing: 1,
          mb: 1,
        }}
      >
        {formattedTitle}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {tasks.map((task) => {
          return (
            <Sortable
              key={task.id}
              id={task.id}
              activeItem={task}
              render={(sortActivatorProps) => (
                <TaskItem task={task} sortActivatorProps={sortActivatorProps} />
              )}
            />
          );
        })}
      </Box>
    </Box>
  );
});
