import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from '../locales/ru/translation.json';
import en from '../locales/en/translation.json';
import useSettingStore from "@/stores/setting-store.ts";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ru: {
        translation: ru
      },
      en: {
        translation: en
      }
    },
    lng: useSettingStore.getState().language.key,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    debug: true,
  });

useSettingStore.subscribe((state) => {
  if (i18n.language !== state.language.key) {
    i18n.changeLanguage(state.language.key);
  }
});

export default i18n;
