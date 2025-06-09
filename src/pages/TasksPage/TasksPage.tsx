import { useState } from 'react';
import { Box } from '@mui/material';
import { TaskList, TasksToolbar } from './components';
import { ViewMode } from './types';

const TasksPage = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Grid);

  return (
    <Box>
      <TasksToolbar viewMode={viewMode} onChangeViewMode={setViewMode} />
      <TaskList viewMode={viewMode} />
    </Box>
  );
};

export default TasksPage;
