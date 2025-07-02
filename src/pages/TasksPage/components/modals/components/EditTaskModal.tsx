import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  type SelectChangeEvent,
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
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: TaskStatus.PENDING,
  });

  useEffect(() => {
    if (!task) {
      setFormData({
        title: '',
        description: '',
        status: TaskStatus.PENDING,
      });
      return;
    }

    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  }, [task]);

  const handleSave = () => {
    if (task) {
      onSave(task.id, formData.title, formData.description, formData.status);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id.replace('edit-', '')]: value,
    }));
  };

  const handleStatusChange = (e: SelectChangeEvent<TaskStatus>) => {
    setFormData((prev) => ({
      ...prev,
      status: e.target.value as TaskStatus,
    }));
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
        value={formData.title}
        onChange={handleChange}
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
        value={formData.description}
        onChange={handleChange}
      />
      <FormControl fullWidth margin='dense'>
        <InputLabel id='status-select-label'>
          {t('editTaskModal.statusLabel')}
        </InputLabel>
        <Select
          labelId='status-select-label'
          id='status-select'
          value={formData.status}
          label={t('editTaskModal.statusLabel')}
          onChange={handleStatusChange}
        >
          {Object.values(TaskStatus).map((statusOption) => (
            <MenuItem key={statusOption} value={statusOption}>
              {t(`editTaskModal.statusOptions.${statusOption}`)}
            </MenuItem>
          ))}
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
