import type { GetTasksParams } from 'api/services/TasksService/types';

export const getQueryParams = (
  searchParams: URLSearchParams,
): GetTasksParams => {
  return {
    order: (searchParams.get('order') as 'asc' | 'desc') || undefined,
    sortBy: searchParams.get('sortBy') || undefined,
    filter: searchParams.get('filter') || undefined,
    per_page: Number(searchParams.get('per_page')) || 6,
    page: Number(searchParams.get('page')) || 1,
    search: searchParams.get('search') || undefined,
  };
};
