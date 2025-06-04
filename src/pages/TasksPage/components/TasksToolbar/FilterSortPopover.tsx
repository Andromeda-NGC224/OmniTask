import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TaskFilter, TaskSort } from '../../types';
import { useMemo } from 'react';
import { filterOptionsConfig, sortOptionsConfig } from './config';

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

  const filterOptions = useMemo(
    () =>
      filterOptionsConfig.map((option) => ({
        ...option,
        label: t(option.labelKey),
      })),
    [t],
  );

  const sortOptions = useMemo(
    () =>
      sortOptionsConfig.map((option) => ({
        ...option,
        label: t(option.labelKey),
      })),
    [t],
  );

  const handleFilterClick = (value: TaskFilter) => {
    onFilterChange(value);
    handlePopoverClose();
  };

  const handleSortClick = (value: TaskSort) => {
    onSortChange(value);
    handlePopoverClose();
  };

  return (
    <Box p={2} minWidth={200}>
      {popoverType === 'filter' && (
        <Box display='flex' flexDirection='column' gap={1}>
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              onClick={() => handleFilterClick(option.value)}
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
              onClick={() => handleSortClick(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </Box>
      )}
    </Box>
  );
}
