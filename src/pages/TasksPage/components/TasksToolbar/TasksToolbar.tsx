import { useState, useRef, type MouseEvent, useEffect } from 'react';
import {
  Box,
  IconButton,
  InputBase,
  Tooltip,
  Popover,
  Button,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import type { TasksToolbarProps } from './types';
import { useTranslation } from 'react-i18next';
import FilterSortPopover from './FilterSortPopover';

import { useTaskParams } from 'pages/TasksPage/hooks';
import { useSearchParams } from 'react-router-dom';
import { errorHandler } from 'api/utils';

import { ViewMode } from 'pages/TasksPage/types';
import { showToast } from 'utils/toast';
import { TasksService } from 'api/services';
import { AddTaskModal } from '../modals';

export default function TasksToolbar({
  viewMode,
  onChangeViewMode,

  onTaskAdded,
}: TasksToolbarProps) {
  const { t } = useTranslation('tasks_page');
  const [searchParams] = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { handleSortChange, handleFilterChange, handleSearchChange } =
    useTaskParams();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [popoverType, setPopoverType] = useState<'filter' | 'sort' | null>(
    null,
  );
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setSearchValue(search);
      setSearchOpen(true);
    }
  }, [searchParams]);

  const handleSearchClick = () => {
    setSearchOpen(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };

  const handleSearchBlur = () => {
    if (searchValue === '') {
      setSearchOpen(false);
    }
  };

  const handlePopoverOpen = (
    event: MouseEvent<HTMLElement>,
    type: 'filter' | 'sort',
  ) => {
    setAnchorEl(event.currentTarget);
    setPopoverType(type);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setPopoverType(null);
  };

  const handleOpenAddTaskModal = () => {
    setIsAddTaskModalOpen(true);
  };

  const handleCloseAddTaskModal = () => {
    setIsAddTaskModalOpen(false);
  };

  const handleAddTask = async (title: string, description: string) => {
    try {
      await TasksService.createTask({ title, description });

      showToast.success(t('addTaskModal.successMessage'));

      handleCloseAddTaskModal();
      onTaskAdded();
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 1,
        mb: 2,
        padding: '24px 16px',
        backgroundColor: 'background.paper',
        borderRadius: 3,
        flexWrap: 'wrap',
        boxSizing: 'content-box',
      }}
    >
      <Button
        variant='contained'
        color='primary'
        size='small'
        sx={{ height: '40px', minWidth: '231px' }}
        onClick={handleOpenAddTaskModal}
      >
        <AddBoxOutlinedIcon sx={{ mr: 1 }} />
        <Typography>{t('toolbar.addNewTask')}</Typography>
      </Button>

      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        <Box
          sx={(theme) => ({
            transition: 'width 0.3s ease',
            width: searchOpen ? '200px' : '40px',
            height: '40px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            border: searchOpen
              ? `1px solid ${theme.palette.text.secondary}`
              : 'none',
            borderRadius: 3,
            bgcolor: searchOpen ? 'background.paper' : 'transparent',
          })}
        >
          <Tooltip title={t('toolbar.search')}>
            <IconButton size='small' onClick={handleSearchClick}>
              <SearchIcon />
            </IconButton>
          </Tooltip>
          {searchOpen && (
            <InputBase
              inputRef={searchInputRef}
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                handleSearchChange(e.target.value);
              }}
              onBlur={handleSearchBlur}
              placeholder={`${t('toolbar.search')}...`}
              fullWidth
              sx={{ ml: 1 }}
            />
          )}
        </Box>

        <Button
          startIcon={<SortIcon />}
          size='small'
          onClick={(e) => handlePopoverOpen(e, 'filter')}
          color='inherit'
        >
          {t('toolbar.filter.filter')}
        </Button>

        <Button
          startIcon={<FilterListIcon />}
          size='small'
          onClick={(e) => handlePopoverOpen(e, 'sort')}
          color='inherit'
        >
          {t('toolbar.sort.sort')}
        </Button>

        <Box>
          <Tooltip title={t('toolbar.list')}>
            <IconButton
              size='medium'
              color={viewMode === ViewMode.List ? 'primary' : 'default'}
              onClick={() => onChangeViewMode(ViewMode.List)}
            >
              <ViewListIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('toolbar.grid')}>
            <IconButton
              size='medium'
              color={viewMode === ViewMode.Grid ? 'primary' : 'default'}
              onClick={() => onChangeViewMode(ViewMode.Grid)}
            >
              <ViewModuleIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <FilterSortPopover
            popoverType={popoverType}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            handlePopoverClose={handlePopoverClose}
          />
        </Popover>
      </Box>

      <AddTaskModal
        open={isAddTaskModalOpen}
        onClose={handleCloseAddTaskModal}
        onAddTask={handleAddTask}
      />
    </Box>
  );
}
