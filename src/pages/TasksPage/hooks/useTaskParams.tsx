import { useSearchParams } from 'react-router-dom';
import { TaskFilter, TaskSort } from 'pages/TasksPage/types';
import { useEffect, useState } from 'react';
import { getQueryParams } from 'api/services/taskService/utils';

export const useTaskParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { search } = getQueryParams(searchParams);
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(search);

  const handleSortChange = (sort: TaskSort) => {
    const [sortBy, order] = sort.split('-');
    searchParams.set('sortBy', sortBy);
    searchParams.set('order', order);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  const handleFilterChange = (filter: TaskFilter) => {
    if (filter === TaskFilter.All) {
      searchParams.delete('filter');
    } else {
      searchParams.set('filter', filter);
    }
    setSearchParams(searchParams);
  };

  const handleSearchChange = (searchValue: string) => {
    setDebouncedSearchValue(searchValue);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (debouncedSearchValue === '') {
        searchParams.delete('search');
      } else {
        searchParams.set('search', debouncedSearchValue as string);
      }
      setSearchParams(searchParams);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [debouncedSearchValue, searchParams, setSearchParams]);

  return { handleSortChange, handleFilterChange, handleSearchChange };
};
