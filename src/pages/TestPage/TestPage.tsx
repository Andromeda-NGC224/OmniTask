import {
  Box,
  Grid,
  Button,
  Checkbox,
  Fab,
  Radio,
  Switch,
  Slider,
  Select,
  MenuItem,
  Typography,
  TextField,
  Alert,
  Badge,
  Avatar,
  Chip,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useTranslation } from 'react-i18next';

const colors: Array<
  'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
> = ['primary', 'secondary', 'error', 'info', 'success', 'warning'];

const alertColors = ['error', 'warning', 'info', 'success'] as const;

const TestPage = () => {
  const { t } = useTranslation('test_page');
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant='h4' gutterBottom>
        Test components
      </Typography>
      <Typography variant='h4' gutterBottom>
        {t('title')}
      </Typography>

      <Grid container spacing={2}>
        <Grid size={5}>
          <Box
            sx={{
              border: '1px solid #ccc',
              p: 2,
              borderRadius: 2,
            }}
          >
            <Typography variant='h6' gutterBottom>
              Buttons
            </Typography>
            {colors.map((color) => (
              <Box
                key={color}
                sx={{
                  mb: 1,
                  display: 'flex',
                  direction: 'column',

                  justifyContent: 'center',
                  gap: 1,
                }}
              >
                <Button
                  variant='contained'
                  size='large'
                  color={color}
                  sx={{ mr: 1 }}
                >
                  {color}
                </Button>
                <Button
                  variant='outlined'
                  size='medium'
                  color={color}
                  sx={{ mr: 1 }}
                >
                  {color}
                </Button>
                <Button variant='text' size='small' color={color}>
                  {color}
                </Button>
              </Box>
            ))}
            <Button variant='contained' color='sea' sx={{ mr: 1 }}>
              Sea (custom)
            </Button>
            <Button variant='outlined' color='sea' sx={{ mr: 1 }}>
              Sea (custom)
            </Button>
            <Button variant='text' color='sea'>
              Sea (custom)
            </Button>
          </Box>
        </Grid>

        <Grid size={4}>
          <Box sx={{ border: '1px solid #ccc', p: 2, borderRadius: 2 }}>
            <Typography variant='h6' gutterBottom>
              Checkbox
            </Typography>
            {colors.map((color) => (
              <Checkbox
                key={color}
                color={color}
                defaultChecked
                sx={{ mr: 1 }}
              />
            ))}
            <Checkbox disabled />
          </Box>
        </Grid>

        <Grid size={4}>
          <Box sx={{ border: '1px solid #ccc', p: 2, borderRadius: 2 }}>
            <Typography variant='h6' gutterBottom>
              Floating Action Button
            </Typography>
            {colors.map((color) => (
              <Fab key={color} color={color} sx={{ mr: 1, mb: 1 }}>
                <AddIcon />
              </Fab>
            ))}
          </Box>
        </Grid>

        <Grid size={4}>
          <Box sx={{ border: '1px solid #ccc', p: 2, borderRadius: 2 }}>
            <Typography variant='h6' gutterBottom>
              Radio
            </Typography>
            {colors.map((color) => (
              <Radio key={color} color={color} defaultChecked sx={{ mr: 1 }} />
            ))}
            <Radio disabled />
          </Box>
        </Grid>

        <Grid size={4}>
          <Box sx={{ border: '1px solid #ccc', p: 2, borderRadius: 2 }}>
            <Typography variant='h6' gutterBottom>
              Switch
            </Typography>
            {colors.map((color) => (
              <Switch key={color} color={color} defaultChecked sx={{ mr: 1 }} />
            ))}
            <Switch disabled />
          </Box>
        </Grid>

        <Grid size={4}>
          <Box sx={{ border: '1px solid #ccc', p: 2, borderRadius: 2 }}>
            <Typography variant='h6' gutterBottom>
              Slider
            </Typography>
            {colors.map((color) => (
              <Slider
                key={color}
                defaultValue={30}
                color={color}
                sx={{ mr: 1 }}
              />
            ))}
            <Slider defaultValue={60} color='primary' />
          </Box>
        </Grid>

        <Grid
          size={6}
          sx={{
            border: '1px solid #ccc',
            p: 2,
            borderRadius: 2,
            height: '150px',
          }}
        >
          <Typography variant='h6' gutterBottom>
            Select
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Select
              defaultValue={10}
              sx={{ minWidth: 120, mr: 1 }}
              variant='filled'
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
            <Select
              defaultValue={20}
              sx={{ minWidth: 120, mr: 1 }}
              variant='outlined'
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
            <Select defaultValue={30} sx={{ minWidth: 120 }} variant='standard'>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </Box>
        </Grid>

        <Grid size={4}>
          <Box sx={{ border: '1px solid #ccc', p: 2, borderRadius: 2 }}>
            <Typography variant='h6' gutterBottom>
              TextField
            </Typography>
            <TextField
              label='Standard'
              variant='standard'
              sx={{ mb: 1 }}
              fullWidth
            />
            <TextField
              label='Outlined'
              variant='outlined'
              sx={{ mb: 1 }}
              fullWidth
            />
            <TextField label='Filled' variant='filled' fullWidth />
          </Box>
        </Grid>

        <Grid size={4}>
          <Box sx={{ border: '1px solid #ccc', p: 2, borderRadius: 2 }}>
            <Typography variant='h6' gutterBottom>
              Alerts
            </Typography>
            {alertColors.map((color) => (
              <Alert
                key={color}
                severity={color}
                variant='filled'
                sx={{ mb: 1 }}
              >
                {color} alert filled
              </Alert>
            ))}
            {alertColors.map((color) => (
              <Alert
                key={color}
                severity={color}
                variant='outlined'
                sx={{ mb: 1 }}
              >
                {color} alert outlined
              </Alert>
            ))}
            {alertColors.map((color) => (
              <Alert
                key={color}
                severity={color}
                variant='standard'
                sx={{ mb: 1 }}
              >
                {color} alert standard
              </Alert>
            ))}
          </Box>
        </Grid>

        <Grid size={4}>
          <Box sx={{ border: '1px solid #ccc', p: 2, borderRadius: 2 }}>
            <Typography variant='h6' gutterBottom>
              Badge & Avatar
            </Typography>

            <Badge
              badgeContent={4}
              color='error'
              variant='standard'
              overlap='rectangular'
              sx={{ mr: 1 }}
            >
              <NotificationsIcon />
            </Badge>
            <Badge
              badgeContent={1}
              color='primary'
              variant='dot'
              overlap='rectangular'
            >
              <NotificationsIcon />
            </Badge>

            <Avatar variant='circular' sx={{ bgcolor: 'primary.main', mb: 1 }}>
              A
            </Avatar>
            <Avatar variant='rounded' sx={{ bgcolor: 'secondary.main', mb: 1 }}>
              B
            </Avatar>
            <Avatar variant='square' sx={{ bgcolor: 'error.main' }}>
              C
            </Avatar>
          </Box>
        </Grid>

        <Grid size={4}>
          <Box sx={{ border: '1px solid #ccc', p: 2, borderRadius: 2 }}>
            <Typography variant='h6' gutterBottom>
              Chips
            </Typography>
            {colors.map((color) => (
              <Chip
                key={color}
                label={`${color} chip outlined`}
                color={color}
                variant='outlined'
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
            {colors.map((color) => (
              <Chip
                key={color}
                label={`${color} chip filled`}
                color={color}
                variant='filled'
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
            <Chip label='Deletable' onDelete={() => {}} color='primary' />
          </Box>
        </Grid>

        <Grid size={4}>
          <Box sx={{ border: '1px solid #ccc', p: 2, borderRadius: 2 }}>
            <Typography variant='h6' gutterBottom>
              Icon Buttons small
            </Typography>
            {colors.map((color) => (
              <IconButton key={color} size='small' color={color} sx={{ mr: 1 }}>
                <DeleteIcon />
              </IconButton>
            ))}
            <Typography variant='h6' gutterBottom>
              Icon Buttons large
            </Typography>
            {colors.map((color) => (
              <IconButton key={color} size='large' color={color} sx={{ mr: 1 }}>
                <DeleteIcon />
              </IconButton>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TestPage;
