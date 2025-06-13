import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { AddTaskModalProps } from './types';
import BaseModal from '../BaseModal';

export default function AddTaskModal({
  open,
  onClose,
  onAddTask,
}: AddTaskModalProps) {
  const { t } = useTranslation('tasks_page');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = () => {
    onAddTask(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <BaseModal open={open} onClose={onClose} title={t('addTaskModal.header')}>
      <TextField
        autoFocus
        margin='dense'
        id='title'
        label={t('addTaskModal.title')}
        type='text'
        fullWidth
        variant='outlined'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        margin='dense'
        id='description'
        label={t('addTaskModal.description')}
        type='text'
        fullWidth
        variant='outlined'
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <Button onClick={onClose}>{t('addTaskModal.cancel')}</Button>
        <Button onClick={handleAddTask} variant='contained'>
          {t('addTaskModal.add')}
        </Button>
      </Box>
    </BaseModal>
  );
}
