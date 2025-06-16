import { Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BaseModal from '../BaseModal';
import type { CompleteTaskModalProps } from './types';

export default function CompleteTaskModal({
  open,
  onClose,
  onConfirm,
  isAlreadyCompleted,
}: CompleteTaskModalProps) {
  const { t } = useTranslation('tasks_page');

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title={
        isAlreadyCompleted
          ? t('completeTaskModal.headerAlreadyCompleted')
          : t('completeTaskModal.header')
      }
    >
      <Box sx={{ color: 'text.secondary' }}>
        {isAlreadyCompleted
          ? t('completeTaskModal.textAlreadyCompleted')
          : t('completeTaskModal.text')}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <Button onClick={onClose}>{t('completeTaskModal.cancel')}</Button>
        <Button
          onClick={onConfirm}
          variant='contained'
          color={isAlreadyCompleted ? 'warning' : 'success'}
        >
          {isAlreadyCompleted
            ? t('completeTaskModal.revertToPending')
            : t('completeTaskModal.confirm')}
        </Button>
      </Box>
    </BaseModal>
  );
}
