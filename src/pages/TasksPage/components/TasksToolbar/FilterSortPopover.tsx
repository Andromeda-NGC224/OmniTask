import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TaskFilter, TaskSort } from '../../types';

interface FilterSortPopoverProps {
  popoverType: 'filter' | 'sort' | null;
  onFilterChange: (filter: TaskFilter) => void;
  onSortChange: (sort: TaskSort) => void;
  handlePopoverClose: () => void;
}

export default function FilterSortPopover({
  popoverType,
  onFilterChange,
  onSortChange,
  handlePopoverClose,
}: FilterSortPopoverProps) {
  const { t } = useTranslation('tasks_page');

  const filterOptions = [
    { label: t('toolbar.filter.all'), value: TaskFilter.All },
    { label: t('toolbar.filter.completed'), value: TaskFilter.Completed },
    { label: t('toolbar.filter.pending'), value: TaskFilter.Pending },
  ];

  const sortOptions = [
    { label: t('toolbar.sort.completed_asc'), value: TaskSort.CompletedAsc },
    { label: t('toolbar.sort.completed_desc'), value: TaskSort.CompletedDesc },
    { label: t('toolbar.sort.created_at_desc'), value: TaskSort.CreatedAtDesc },
    { label: t('toolbar.sort.created_at_asc'), value: TaskSort.CreatedAtAsc },
    { label: t('toolbar.sort.title'), value: TaskSort.TitleAsc },
  ];

  return (
    <Box p={2} minWidth={200}>
      {popoverType === 'filter' && (
        <Box display='flex' flexDirection='column' gap={1}>
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              onClick={() => {
                onFilterChange(option.value);
                handlePopoverClose();
              }}
            >
              {option.label}
            </Button>
          ))}
        </Box>
      )}
      {popoverType === 'sort' && (
        <Box display='flex' flexDirection='column' gap={1}>
          {sortOptions.map((option) => (
            <Button
              key={option.value}
              onClick={() => {
                onSortChange(option.value);
                handlePopoverClose();
              }}
            >
              {option.label}
            </Button>
          ))}
        </Box>
      )}
    </Box>
  );
}
