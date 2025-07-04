import { Typography } from '@mui/material';

import type { TaskDescriptionProps } from './types';
import { RichTextEditor } from './components';
import { useTranslation } from 'react-i18next';

export const TaskDescription = ({
  description,
  onChange,
  value,
}: TaskDescriptionProps) => {
  const { t } = useTranslation('tasks_details_page');

  return (
    <>
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

      <RichTextEditor
        onChange={onChange}
        placeholder={t('toolbar.placeholder')}
        minHeight={200}
        value={value}
      />
    </>
  );
};
