import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { type TranslationResources } from './types';

const loadTranslations = async (): Promise<TranslationResources> => {
  const resources: TranslationResources = {};

  const translationFiles = import.meta.glob('../locales/**/*.json', {
    eager: true,
  });

  for (const path in translationFiles) {
    const match = path.match(/\.\.\/locales\/(en|ua)\/(.*?)\.json/);
    if (!match) continue;

    const [, language, namespace] = match;
    const translation = (
      translationFiles[path] as { default: Record<string, unknown> }
    ).default;

    if (!resources[language]) {
      resources[language] = {};
    }

    resources[language][namespace] = translation;
  }

  return resources;
};

const initializeI18n = async () => {
  const resources = await loadTranslations();
  const defaultLanguage = localStorage.getItem('language') || 'en';

  i18n.use(initReactI18next).init({
    lng: defaultLanguage,
    fallbackLng: 'en',
    debug: true,
    resources,
    interpolation: {
      escapeValue: false,
    },
  });
};

initializeI18n().catch((error) => {
  console.error('Failed to initialize i18n:', error);
});

export default i18n;

// debug: false - что бы не было logs в консоли
