export interface TaskListProps {
  viewMode: 'grid' | 'list';
  filter: 'all' | 'completed' | 'pending';
  sort:
    | 'completed-asc'
    | 'completed-desc'
    | 'createdAt-desc'
    | 'createdAt-asc'
    | 'title-asc';
  searchQuery: string;
}
