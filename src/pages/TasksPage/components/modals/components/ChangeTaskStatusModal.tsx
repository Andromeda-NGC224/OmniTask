import { Button, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BaseModal from '../BaseModal';
import type { ChangeTaskStatusModalProps } from './types';
import { TaskStatus } from 'types/tasks';

export default function ChangeTaskStatusModal({
  open,
  onClose,
  onConfirm,
  currentStatus,
}: ChangeTaskStatusModalProps) {
  const { t } = useTranslation('tasks_page');

  const getButtons = () => {
    switch (currentStatus) {
      case TaskStatus.PENDING:
        return (
          <>
            <Button onClick={onClose}>{t('changeStatusModal.cancel')}</Button>
            <Button
              onClick={() => onConfirm(TaskStatus.COMPLETED)}
              variant='contained'
              color='success'
            >
              {t('changeStatusModal.pending.complete')}
            </Button>
            <Button
              onClick={() => onConfirm(TaskStatus.IN_PROGRESS)}
              variant='contained'
              color='info'
            >
              {t('changeStatusModal.pending.startProgress')}
            </Button>
          </>
        );
      case TaskStatus.IN_PROGRESS:
        return (
          <>
            <Button onClick={onClose}>{t('changeStatusModal.cancel')}</Button>
            <Button
              onClick={() => onConfirm(TaskStatus.COMPLETED)}
              variant='contained'
              color='success'
            >
              {t('changeStatusModal.inProgress.complete')}
            </Button>
            <Button
              onClick={() => onConfirm(TaskStatus.PENDING)}
              variant='contained'
              color='warning'
            >
              {t('changeStatusModal.inProgress.revertToPending')}
            </Button>
          </>
        );
      case TaskStatus.COMPLETED:
        return (
          <>
            <Button onClick={onClose}>{t('changeStatusModal.cancel')}</Button>
            <Button
              onClick={() => onConfirm(TaskStatus.PENDING)}
              variant='contained'
              color='warning'
            >
              {t('changeStatusModal.completed.revertToPending')}
            </Button>
            <Button
              onClick={() => onConfirm(TaskStatus.IN_PROGRESS)}
              variant='contained'
              color='info'
            >
              {t('changeStatusModal.completed.revertToInProgress')}
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title={t('changeStatusModal.default.title')}
    >
      <Typography sx={{ color: 'text.secondary', mb: 2 }}>
        {t('changeStatusModal.default.text')}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        {getButtons()}
      </Box>
    </BaseModal>
  );
}
