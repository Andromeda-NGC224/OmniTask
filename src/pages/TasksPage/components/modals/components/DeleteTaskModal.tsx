import { Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BaseModal from '../BaseModal';
import type { DeleteTaskModalProps } from './types';

export default function DeleteTaskModal({
  open,
  onClose,
  onConfirm,
}: DeleteTaskModalProps) {
  const { t } = useTranslation('tasks_page');
  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title={t('deleteTaskModal.header')}
    >
      <Box sx={{ color: 'text.secondary' }}>{t('deleteTaskModal.text')}</Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <Button onClick={onClose}>{t('deleteTaskModal.cancel')}</Button>
        <Button onClick={onConfirm} variant='contained' color='error'>
          {t('deleteTaskModal.confirm')}
        </Button>
      </Box>
    </BaseModal>
  );
}
