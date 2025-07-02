import { Typography } from '@mui/material';
import type { TaskDescriptionProps } from './types';

export const TaskDescription = ({ description }: TaskDescriptionProps) => {
  return (
    <Typography
      variant='body1'
      sx={{
        fontSize: '1.1rem',
        lineHeight: 1.7,
        color: 'text.secondary',
        whiteSpace: 'pre-line',
        my: 3,
      }}
    >
      {description}
    </Typography>
  );
};
