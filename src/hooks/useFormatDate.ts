import { format, parseISO } from 'date-fns';
import { useTranslation } from 'react-i18next';

export const useFormatDate = () => {
  const { t } = useTranslation('profile_page');

  return (date?: string | Date | null): string => {
    if (!date) return t('date.notSpecified');

    try {
      const dateObj = typeof date === 'string' ? parseISO(date) : date;
      return format(dateObj, 'PPP');
    } catch (error) {
      console.error('Date format error:', error);
      return t('date.invalid');
    }
  };
};
