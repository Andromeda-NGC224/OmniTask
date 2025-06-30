import { format, parseISO } from 'date-fns';

export const formatDate = (date?: string | Date | null): string => {
  if (!date) return 'Не вказано';

  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, 'PPP');
  } catch (error) {
    console.error('Помилка форматування дати:', error);
    return 'Некоректна дата';
  }
};
