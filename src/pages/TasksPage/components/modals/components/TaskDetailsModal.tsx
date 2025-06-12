import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BaseModal from '../BaseModal';
import type { TaskDetailsModalProps } from './types';

export default function TaskDetailsModal({
  open,
  onClose,
  title,
  description,
}: TaskDetailsModalProps) {
  const { t } = useTranslation('tasks_page');
  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title={t('taskDetailsModal.header')}
      maxWidth={500}
    >
      <Box>
        <Typography variant='subtitle1' fontWeight={600} gutterBottom>
          {t('taskDetailsModal.title')}: {title}
        </Typography>
        <Typography variant='body1'>
          {t('taskDetailsModal.description')}: {description}
        </Typography>
      </Box>
    </BaseModal>
  );
}
