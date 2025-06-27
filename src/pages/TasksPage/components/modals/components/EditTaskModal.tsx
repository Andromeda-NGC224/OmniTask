import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import BaseModal from '../BaseModal';
import type { EditTaskModalProps } from './types';
import { TaskStatus } from 'types/tasks';

export default function EditTaskModal({
  open,
  onClose,
  onSave,
  task,
}: EditTaskModalProps) {
  const { t } = useTranslation('tasks_page');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.PENDING);

  useEffect(() => {
    if (!task) {
      setTitle('');
      setDescription('');
      setStatus(TaskStatus.PENDING);
      return;
    }

    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
  }, [task]);

  const handleSave = () => {
    if (task) {
      onSave(task.id, title, description, status);
    }
  };

  return (
    <BaseModal open={open} onClose={onClose} title={t('editTaskModal.header')}>
      <TextField
        autoFocus
        margin='dense'
        id='edit-title'
        label={t('editTaskModal.title')}
        type='text'
        fullWidth
        variant='outlined'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        margin='dense'
        id='edit-description'
        label={t('editTaskModal.description')}
        type='text'
        fullWidth
        variant='outlined'
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <FormControl fullWidth margin='dense'>
        <InputLabel id='status-select-label'>
          {t('editTaskModal.statusLabel')}
        </InputLabel>
        <Select
          labelId='status-select-label'
          id='status-select'
          value={status}
          label={t('editTaskModal.statusLabel')}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
        >
          <MenuItem value={TaskStatus.PENDING}>
            {t('editTaskModal.statusOptions.pending')}
          </MenuItem>
          <MenuItem value={TaskStatus.IN_PROGRESS}>
            {t('editTaskModal.statusOptions.inProgress')}
          </MenuItem>
          <MenuItem value={TaskStatus.COMPLETED}>
            {t('editTaskModal.statusOptions.completed')}
          </MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <Button onClick={onClose}>{t('editTaskModal.cancel')}</Button>
        <Button onClick={handleSave} variant='contained'>
          {t('editTaskModal.save')}
        </Button>
      </Box>
    </BaseModal>
  );
}
