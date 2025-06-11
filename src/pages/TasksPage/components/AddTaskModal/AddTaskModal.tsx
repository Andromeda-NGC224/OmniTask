import { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { modalContainerStyle } from './styles';

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  onAddTask: (title: string, description: string) => void;
}

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
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={{ ...modalContainerStyle, position: 'relative' }}>
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 10,
            top: 10,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          id='modal-modal-title'
          variant='h6'
          component='h2'
          sx={{ pr: 4 }}
        >
          {t('addTaskModal.header')}
        </Typography>
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
      </Box>
    </Modal>
  );
}
