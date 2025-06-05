import { useState } from 'react';
import { Box } from '@mui/material';
import { TaskList, TasksToolbar } from './components';
import { TaskFilter, TaskSort, ViewMode } from './types';

const TasksPage = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Grid);
  const [filter, setFilter] = useState<TaskFilter>(TaskFilter.All);
  const [sort, setSort] = useState<TaskSort>(TaskSort.CompletedDesc);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Box>
      <TasksToolbar
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
        onFilterChange={setFilter}
        onSortChange={setSort}
        onSearchChange={setSearchQuery}
      />
      <TaskList
        viewMode={viewMode}
        filter={filter}
        sort={sort}
        searchQuery={searchQuery}
      />
    </Box>
  );
};

export default TasksPage;
