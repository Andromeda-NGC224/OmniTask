import { IconButton, Tooltip } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SunnyIcon from '@mui/icons-material/LightMode';
import { useColorScheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const ThemeSwitcher = () => {
  const { mode, setMode } = useColorScheme();
  const { t } = useTranslation('header');

  const isDark = mode === 'dark';

  return (
    <Tooltip title={t('theme')}>
      <IconButton
        onClick={() => setMode(isDark ? 'light' : 'dark')}
        color='inherit'
      >
        {isDark ? <SunnyIcon /> : <DarkModeIcon color='action' />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeSwitcher;
