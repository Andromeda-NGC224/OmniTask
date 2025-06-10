export const localStorageService = {
  getAccessToken: (): string | null => {
    return localStorage.getItem('accessToken');
  },

  setAccessToken: (token: string): void => {
    localStorage.setItem('accessToken', token);
  },

  removeAccessToken: (): void => {
    localStorage.removeItem('accessToken');
  },

  getLanguage: (): string => {
    return localStorage.getItem('language') || 'en';
  },

  setLanguage: (language: string): void => {
    localStorage.setItem('language', language);
  },
};
