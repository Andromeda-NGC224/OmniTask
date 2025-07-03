import { useEffect, useState } from 'react';
import { Box, Container, Card, CardContent, Button } from '@mui/material';
import { TasksStats, UserAvatar, UserInfo } from './components';
import { TasksService } from 'api/services';
import type { TasksStatsResponse } from 'api/services/TasksService/types';
import { useUserStore } from 'store';
import EditIcon from '@mui/icons-material/Edit';
import { EditProfileModal } from './components/modals';
import { useTranslation } from 'react-i18next';
import { errorHandler } from 'api/utils';

export default function ProfilePage() {
  const user = useUserStore((state) => state.user);
  const [tasksStats, setTasksStats] = useState<TasksStatsResponse | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { t } = useTranslation('profile_page');

  useEffect(() => {
    const fetchTasksStats = async () => {
      try {
        const response = await TasksService.getTasksStats();

        setTasksStats(response.data);
      } catch (error) {
        errorHandler(error);
        setTasksStats(null);
      }
    };

    fetchTasksStats();
  }, []);

  const handleOpenEditModal = () => setIsEditModalOpen(true);
  const handleCloseEditModal = () => setIsEditModalOpen(false);

  if (!user) {
    return <Box>{t('user_not_found')}</Box>;
  }

  return (
    <Container
      maxWidth='sm'
      sx={{
        py: 4,
      }}
    >
      <Card
        sx={{ borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 4,
          }}
        >
          <Box sx={{ position: 'relative', mb: 2 }}>
            <UserAvatar avatar={user.avatar} user={user} />
            <Button
              variant='contained'
              color='primary'
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                minWidth: 'unset',
                width: 40,
                height: 40,
                borderRadius: '50%',
                p: 0,
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              }}
              onClick={handleOpenEditModal}
            >
              <EditIcon />
            </Button>
          </Box>
          <UserInfo user={user} />
          <TasksStats tasksStats={tasksStats} />
        </CardContent>
      </Card>
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        user={user}
      />
    </Container>
  );
}
