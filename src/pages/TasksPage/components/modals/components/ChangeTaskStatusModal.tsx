import { Button, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BaseModal from '../BaseModal';
import type { ChangeTaskStatusModalProps } from './types';
import { getChangeStatusButtonsConfig } from './config';

export default function ChangeTaskStatusModal({
  open,
  onClose,
  onConfirm,
  currentStatus,
}: ChangeTaskStatusModalProps) {
  const { t } = useTranslation('tasks_page');

  const getButtons = () => {
    const buttonsConfig = getChangeStatusButtonsConfig(currentStatus);

    return (
      <>
        <Button onClick={onClose}>{t('changeStatusModal.cancel')}</Button>
        {buttonsConfig.map((button) => (
          <Button
            key={button.targetStatus}
            onClick={() => onConfirm(button.targetStatus)}
            variant='contained'
            color={button.color}
          >
            {t(button.labelKey)}
          </Button>
        ))}
      </>
    );
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
