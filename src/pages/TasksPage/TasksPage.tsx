import { useState } from 'react';
import { Box } from '@mui/material';
import { TaskList, TasksToolbar } from './components';
import { ViewMode } from './types';

const TasksPage = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Grid);

  const [tasksRefreshKey, setTasksRefreshKey] = useState(0);

  const handleTaskAdded = () => {
    setTasksRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <Box>
      <TasksToolbar
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
        onTaskAdded={handleTaskAdded}
      />
      <TaskList viewMode={viewMode} refreshKey={tasksRefreshKey} />
    </Box>
  );
};

export default TasksPage;
