import { IconButton } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SunnyIcon from '@mui/icons-material/LightMode';
import { useColorScheme } from '@mui/material/styles';

const ThemeSwitcher = () => {
  const { mode, setMode } = useColorScheme();

  const isDark = mode === 'dark';

  return (
    <IconButton
      onClick={() => setMode(isDark ? 'light' : 'dark')}
      color='inherit'
    >
      {isDark ? <SunnyIcon /> : <DarkModeIcon color='action' />}
    </IconButton>
  );
};

export default ThemeSwitcher;
