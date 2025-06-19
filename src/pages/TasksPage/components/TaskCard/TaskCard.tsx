import {
  Card,
  Typography,
  Box,
  Chip,
  useColorScheme,
  Tooltip,
  IconButton,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import { useTranslation } from 'react-i18next';
import type { TaskCardProps } from './types';
import { toolbarButtons, CardButtonAction } from './config';
import { switchNeverDefaultCase } from 'utils';
import { forwardRef } from 'react';

const TaskCard = forwardRef<HTMLDivElement, TaskCardProps>(
  ({ task, onDelete, onComplete, onDetails, onEdit }, ref) => {
    const { mode } = useColorScheme();
    const isCompleted = task.completed;
    const { t } = useTranslation('tasks_page');

    const handleAction = (action: CardButtonAction) => {
      switch (action) {
        case CardButtonAction.Edit:
          onEdit(task);
          break;
        case CardButtonAction.Details:
          onDetails(task);
          break;
        case CardButtonAction.Complete:
          onComplete(task);
          break;
        case CardButtonAction.Delete:
          onDelete(task);
          break;
        default:
          switchNeverDefaultCase(action);
      }
    };

    return (
      <Card
        ref={ref}
        variant='outlined'
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
          borderRadius: 3,
          border: mode === 'light' ? '1px solid' : 'none',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ textAlign: 'left', width: '100%' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {isCompleted ? (
              <AssignmentTurnedInIcon
                sx={{ marginTop: '4px' }}
                color='success'
              />
            ) : (
              <AssignmentLateIcon sx={{ marginTop: '4px' }} color='warning' />
            )}
            <Typography variant='h6' fontWeight='bold' gutterBottom>
              {task.title}
            </Typography>
          </Box>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {task.description}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'flex-end',
            width: '100%',
            height: '40px',
          }}
        >
          <Chip
            size='small'
            icon={
              isCompleted ? <CheckCircleOutlineIcon /> : <CancelOutlinedIcon />
            }
            label={isCompleted ? t('chips.completed') : t('chips.pending')}
            color={isCompleted ? 'success' : 'warning'}
          />
          <Box display='flex'>
            {toolbarButtons.map(({ action, icon, tooltipKey }) => (
              <Tooltip key={action} title={t(tooltipKey)}>
                <IconButton
                  size='medium'
                  color='primary'
                  onClick={() => handleAction(action)}
                >
                  {icon}
                </IconButton>
              </Tooltip>
            ))}
          </Box>
        </Box>
      </Card>
    );
  },
);

export default TaskCard;
