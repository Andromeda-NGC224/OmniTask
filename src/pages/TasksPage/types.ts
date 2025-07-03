export enum ViewMode {
  Grid = 'grid',
  List = 'list',
}

export enum TaskFilter {
  All = 'all',
  Completed = 'completed',
  Pending = 'pending',
  InProgress = 'in_progress',
}

export enum TaskSort {
  CreatedAtDesc = 'createdAt-desc',
  CreatedAtAsc = 'createdAt-asc',
  TitleAsc = 'title-asc',
  TitleDesc = 'title-desc',
}

export enum ModalType {
  Delete = 'delete',
  ChangeStatus = 'change_status',
  Edit = 'edit',
}
