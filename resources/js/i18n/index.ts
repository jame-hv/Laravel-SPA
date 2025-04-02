import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import japanese from "./lang/ja.json";
import english from "./lang/en.json";

i18n.use(initReactI18next).init({
  resources: {
    ja: {
      translation: japanese,
    },
    en: {
      translation: english,
    },
  },

  fallbackLng: "en",
  lng: "ja",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
