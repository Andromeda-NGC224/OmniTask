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

  setViewMode: (viewMode: string): void => {
    localStorage.setItem('viewMode', viewMode);
  },

  getViewMode: (): string | null => {
    return localStorage.getItem('viewMode');
  },
};
