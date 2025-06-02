import { useState } from 'react';
import { Box } from '@mui/material';
import { TaskList, TasksToolbar } from './components';

const TasksPage = () => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [sort, setSort] = useState<
    | 'completed-asc'
    | 'completed-desc'
    | 'createdAt-desc'
    | 'createdAt-asc'
    | 'title-asc'
  >('createdAt-desc');
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
