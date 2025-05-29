import { Card, Typography, Box, Chip } from '@mui/material';
import type { Task } from '../../../../types/tasks';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const isCompleted = task.completed;

  return (
    <Card
      variant='outlined'
      sx={{
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2,
        borderRadius: 3,
      }}
    >
      <Box sx={{ textAlign: 'left' }}>
        <Typography variant='h6' fontWeight='bold' gutterBottom>
          {task.title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {task.description}
        </Typography>
      </Box>

      <Chip
        size='small'
        icon={isCompleted ? <CheckCircleOutlineIcon /> : <CancelOutlinedIcon />}
        label={isCompleted ? 'Completed' : 'Pending'}
        sx={{
          bgcolor: isCompleted ? '#E6F4EA' : '#FFF4E5',
          color: isCompleted ? '#2E7D32' : '#ED6C02',
          border: '1px solid',
          borderColor: isCompleted ? '#A5D6A7' : '#FFCC80',
          '.MuiChip-icon': {
            color: isCompleted ? '#66BB6A' : '#FFA726',
            ml: '4px',
          },
        }}
      />
    </Card>
  );
}
