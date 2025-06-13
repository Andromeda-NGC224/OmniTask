import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { modalContainerStyle } from './styles';
import type { BaseModalProps } from './types';

export default function BaseModal({
  open,
  onClose,
  title,
  children,
}: BaseModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='base-modal-title'
      aria-describedby='base-modal-description'
    >
      <Box
        sx={{
          ...modalContainerStyle,
        }}
      >
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
        {title && (
          <Typography
            id='base-modal-title'
            variant='h6'
            component='h2'
            sx={{ pr: 4 }}
          >
            {title}
          </Typography>
        )}
        {children}
      </Box>
    </Modal>
  );
}
