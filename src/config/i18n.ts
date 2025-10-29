import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import en from '@assets/locales/en.json';
import ro from '@assets/locales/ro.json';

const resources = {
  en: { translation: en },
  ro: { translation: ro },
};

const languageDetector = {
  type: 'languageDetector' as const,
  async: true,
  detect: (callback: (lang: string) => void) => {
    const locales = RNLocalize.getLocales();
    const languageTag = locales[0]?.languageCode || 'en';
    callback(languageTag);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

export const initializeI18n = async () => {
  await i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      compatibilityJSON: 'v3',
      interpolation: {
        escapeValue: false,
      },
    });
};

export default i18n;
