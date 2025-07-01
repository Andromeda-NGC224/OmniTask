import {
  Card,
  Typography,
  Box,
  Chip,
  useColorScheme,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  getTaskStatusChipConfig,
  getTaskStatusIconConfig,
} from 'pages/KanbanPage/components/TaskItem/config';
import { useTranslation } from 'react-i18next';
import type { TaskCardProps } from './types';
import { toolbarButtons, CardButtonAction } from './config';
import { switchNeverDefaultCase } from 'utils';
import { actionsContainerStyles, cardStyles } from './styles';

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
    return getTaskStatusIconConfig(task.status);
  };

  const getStatusChip = () => {
    const config = getTaskStatusChipConfig(task.status, t);
    if (!config) return null;

    return (
      <Chip
        size='small'
        icon={config.icon}
        label={config.label}
        color={config.color}
      />
    );
  };

  return (
    <Card ref={ref} variant='outlined' sx={cardStyles(mode ?? 'light')}>
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
      <Box sx={actionsContainerStyles}>
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
