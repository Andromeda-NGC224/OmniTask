import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTasksPage from '../locales/en/tasks_page.json';
import uaTasksPage from '../locales/ua/tasks_page.json';
import enTestPage from '../locales/en/test_page.json';
import uaTestPage from '../locales/ua/test_page.json';

i18n.use(initReactI18next).init({
  lng: localStorage.getItem('language') || 'en',
  fallbackLng: 'en',
  debug: true,
  // debug: false - что бы не было logs в консоли,
  resources: {
    en: {
      tasks_page: enTasksPage,
      test_page: enTestPage,
    },
    ua: {
      tasks_page: uaTasksPage,
      test_page: uaTestPage,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
