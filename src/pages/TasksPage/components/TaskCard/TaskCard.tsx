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
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { useTranslation } from 'react-i18next';
import type { TaskCardProps } from './types';
import { toolbarButtons, CardButtonAction } from './config';
import { switchNeverDefaultCase } from 'utils';
import { TaskStatus } from 'types/tasks';

const TaskCard = ({
  task,
  onDelete,
  onComplete,
  onDetails,
  onEdit,
  ref,
}: TaskCardProps) => {
  const { mode } = useColorScheme();
  const { t } = useTranslation('tasks_page');

  const handleAction = (action: CardButtonAction) => {
    switch (action) {
      case CardButtonAction.EDIT:
        onEdit(task);
        break;
      case CardButtonAction.DETAILS:
        onDetails(task);
        break;
      case CardButtonAction.CHANGE_STATUS:
        onComplete(task);
        break;
      case CardButtonAction.DELETE:
        onDelete(task);
        break;
      default:
        switchNeverDefaultCase(action);
    }
  };

  const getStatusIcon = () => {
    switch (task.status) {
      case TaskStatus.COMPLETED:
        return (
          <AssignmentTurnedInIcon sx={{ marginTop: '4px' }} color='success' />
        );
      case TaskStatus.PENDING:
        return <AssignmentLateIcon sx={{ marginTop: '4px' }} color='warning' />;
      case TaskStatus.IN_PROGRESS:
        return <PendingActionsIcon sx={{ marginTop: '4px' }} color='info' />;
      default:
        return null;
    }
  };

  const getStatusChip = () => {
    switch (task.status) {
      case TaskStatus.COMPLETED:
        return (
          <Chip
            size='small'
            icon={<CheckCircleOutlineIcon />}
            label={t('chips.completed')}
            color='success'
          />
        );
      case TaskStatus.PENDING:
        return (
          <Chip
            size='small'
            icon={<CancelOutlinedIcon />}
            label={t('chips.pending')}
            color='warning'
          />
        );
      case TaskStatus.IN_PROGRESS:
        return (
          <Chip
            size='small'
            icon={<HourglassEmptyIcon />}
            label={t('chips.inProgress')}
            color='info'
          />
        );
      default:
        return null;
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
          {getStatusIcon()}
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
        {getStatusChip()}
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
};

export default TaskCard;
