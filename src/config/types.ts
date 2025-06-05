export type TranslationResources = {
  [language: string]: {
    [namespace: string]: Record<string, unknown>;
  };
};
