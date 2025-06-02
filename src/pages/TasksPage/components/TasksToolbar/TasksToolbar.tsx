import { useState, useRef } from 'react';
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

export default function TasksToolbar({
  viewMode,
  onChangeViewMode,
  onFilterChange,
  onSortChange,
  onSearchChange,
}: TasksToolbarProps) {
  const { t } = useTranslation('tasks_page');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [popoverType, setPopoverType] = useState<'filter' | 'sort' | null>(
    null,
  );

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
    event: React.MouseEvent<HTMLElement>,
    type: 'filter' | 'sort',
  ) => {
    setAnchorEl(event.currentTarget);
    setPopoverType(type);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setPopoverType(null);
  };

  return (
    <Box
      display='flex'
      gap={1}
      mb={2}
      justifyContent='space-between'
      sx={{
        padding: '24px 16px',
        backgroundColor: 'background.paper',
        borderRadius: 3,
      }}
    >
      <Button variant='contained' color='primary' size='small'>
        <AddBoxOutlinedIcon sx={{ mr: 1 }} />
        <Typography>{t('toolbar.addNewTask')}</Typography>
      </Button>

      <Box display='flex'>
        <Box
          sx={{
            transition: 'width 0.3s ease',
            width: searchOpen ? '200px' : '40px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            border: searchOpen ? '1px solid #7a797d' : 'none',
            borderRadius: 3,
            px: searchOpen ? 1 : 0,
            bgcolor: searchOpen ? 'background.paper' : 'transparent',
          }}
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
                onSearchChange(e.target.value);
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

        <Tooltip title={t('toolbar.list')}>
          <IconButton
            size='medium'
            color={viewMode === 'list' ? 'primary' : 'default'}
            onClick={() => onChangeViewMode('list')}
          >
            <ViewListIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('toolbar.grid')}>
          <IconButton
            size='medium'
            color={viewMode === 'grid' ? 'primary' : 'default'}
            onClick={() => onChangeViewMode('grid')}
          >
            <ViewModuleIcon />
          </IconButton>
        </Tooltip>

        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <Box p={2} minWidth={200}>
            {popoverType === 'filter' && (
              <Box display='flex' flexDirection='column' gap={1}>
                <Button
                  onClick={() => {
                    onFilterChange('all');
                    handlePopoverClose();
                  }}
                >
                  {t('toolbar.filter.all')}
                </Button>
                <Button
                  onClick={() => {
                    onFilterChange('completed');
                    handlePopoverClose();
                  }}
                >
                  {t('toolbar.filter.completed')}
                </Button>
                <Button
                  onClick={() => {
                    onFilterChange('pending');
                    handlePopoverClose();
                  }}
                >
                  {t('toolbar.filter.pending')}
                </Button>
              </Box>
            )}
            {popoverType === 'sort' && (
              <Box display='flex' flexDirection='column' gap={1}>
                <Button
                  onClick={() => {
                    onSortChange('completed-asc');
                    handlePopoverClose();
                  }}
                >
                  {t('toolbar.sort.completed_asc')}
                </Button>
                <Button
                  onClick={() => {
                    onSortChange('completed-desc');
                    handlePopoverClose();
                  }}
                >
                  {t('toolbar.sort.completed_desc')}
                </Button>
                <Button
                  onClick={() => {
                    onSortChange('createdAt-desc');
                    handlePopoverClose();
                  }}
                >
                  {t('toolbar.sort.created_at_desc')}
                </Button>
                <Button
                  onClick={() => {
                    onSortChange('createdAt-asc');
                    handlePopoverClose();
                  }}
                >
                  {t('toolbar.sort.created_at_asc')}
                </Button>
                <Button
                  onClick={() => {
                    onSortChange('title-asc');
                    handlePopoverClose();
                  }}
                >
                  {t('toolbar.sort.title')}
                </Button>
              </Box>
            )}
          </Box>
        </Popover>
      </Box>
    </Box>
  );
}
