import { Box, Typography, useColorScheme } from '@mui/material';
import { type ColumnProps } from './types';
import { memo } from 'react';

import { useDroppable } from '@dnd-kit/core';
import TaskItem from '../TaskItem/TaskItem';
import Sortable from '../Sortable/Sortable';
import { formatColumnTitle } from './utils';
import { useTranslation } from 'react-i18next';

export default memo(function Column({ title, tasks }: ColumnProps) {
  const { mode } = useColorScheme();
  const { setNodeRef, isOver } = useDroppable({ id: title });

  const { t } = useTranslation('tasks_page');

  const formattedTitle = formatColumnTitle(title, t);

  return (
    <Box
      ref={setNodeRef}
      sx={{
        minWidth: { xs: '90vw', sm: 300 },
        width: { md: '100%', sm: '100%' },
        maxWidth: { xs: '100%', sm: 340, md: 380 },
        borderRadius: 4,
        backgroundColor: isOver ? 'action.hover' : 'background.paper',
        p: { xs: 1.5, sm: 2.5 },
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 1, sm: 2 },
        height: '100%',
        flexShrink: 0,
        border: mode === 'light' ? '1px solid' : 'none',
        borderColor: 'divider',
      }}
    >
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
