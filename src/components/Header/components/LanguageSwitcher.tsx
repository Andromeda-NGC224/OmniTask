import { useTranslation } from 'react-i18next';
import { IconButton, Tooltip } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation('header');

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ua' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <Tooltip title={t('language')}>
      <IconButton onClick={toggleLanguage}>
        <LanguageIcon color='action' />
      </IconButton>
    </Tooltip>
  );
};

export default LanguageSwitcher;
