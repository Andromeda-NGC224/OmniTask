export interface TasksToolbarProps {
  viewMode: 'list' | 'grid';
  onChangeViewMode: (mode: 'list' | 'grid') => void;
  onFilterChange: (filter: 'all' | 'completed' | 'pending') => void;
  onSortChange: (
    sort:
      | 'completed-asc'
      | 'completed-desc'
      | 'createdAt-desc'
      | 'createdAt-asc'
      | 'title-asc',
  ) => void;
  onSearchChange: (searchQuery: string) => void;
}
