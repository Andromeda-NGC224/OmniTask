import { Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BaseModal from '../BaseModal';
import type { CompleteTaskModalProps } from './types';

export default function CompleteTaskModal({
  open,
  onClose,
  onConfirm,
}: CompleteTaskModalProps) {
  const { t } = useTranslation('tasks_page');
  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title={t('completeTaskModal.header')}
    >
      <Box sx={{ color: 'text.secondary' }}>{t('completeTaskModal.text')}</Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <Button onClick={onClose}>{t('completeTaskModal.cancel')}</Button>
        <Button onClick={onConfirm} variant='contained' color='success'>
          {t('completeTaskModal.confirm')}
        </Button>
      </Box>
    </BaseModal>
  );
}
