import type { GetTasksParams } from 'api/services/TasksService/types';

export const getQueryParams = (
  searchParams: URLSearchParams,
): GetTasksParams => {
  return {
    order: (searchParams.get('order') || 'desc') as 'asc' | 'desc',
    sortBy: searchParams.get('sortBy') || 'createdAt',
    filter: searchParams.get('filter') || null,
    per_page: Number(searchParams.get('per_page')) || 6,
    page: Number(searchParams.get('page')) || 1,
    search: searchParams.get('search') || '',
  };
};
