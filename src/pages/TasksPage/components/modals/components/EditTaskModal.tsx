import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import BaseModal from '../BaseModal';
import type { EditTaskModalProps } from './types';

export default function EditTaskModal({
  open,
  onClose,
  onSave,
  task,
}: EditTaskModalProps) {
  const { t } = useTranslation('tasks_page');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setCompleted(task.completed);
    } else {
      setTitle('');
      setDescription('');
      setCompleted(false);
    }
  }, [task]);

  const handleSave = () => {
    if (task) {
      onSave(task.id, title, description, completed);
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
      <FormControlLabel
        control={
          <Switch
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        }
        label={t('editTaskModal.completed')}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <Button onClick={onClose}>{t('editTaskModal.cancel')}</Button>
        <Button onClick={handleSave} variant='contained'>
          {t('editTaskModal.save')}
        </Button>
      </Box>
    </BaseModal>
  );
}
