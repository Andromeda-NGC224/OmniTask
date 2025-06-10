export enum ViewMode {
  Grid = 'grid',
  List = 'list',
}

export enum TaskFilter {
  All = 'all',
  Completed = 'completed',
  Pending = 'pending',
}

export enum TaskSort {
  CompletedAsc = 'completed-desc',
  CompletedDesc = 'completed-asc',
  CreatedAtDesc = 'createdAt-desc',
  CreatedAtAsc = 'createdAt-asc',
  TitleAsc = 'title-asc',
  TitleDesc = 'title-desc',
}
