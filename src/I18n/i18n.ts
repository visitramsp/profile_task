import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import fr from './fr.json';

export const langauageResources = {
  en: { translation: en },
  fr: { translation: fr }
};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: langauageResources
});

export default i18next;
