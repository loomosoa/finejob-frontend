import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

const gpTranslateUrl = process.env.REACT_APP_GITHUB_PAGES_TRANSLATE_URL;

i18n
  .use(HttpBackend) // Подгружает переводы с бэкенда (JSON-файлы)
  .use(LanguageDetector) // Определяет язык пользователя
  .use(initReactI18next) // Интеграция с React
  .init({
    fallbackLng: "en", // Язык по умолчанию
    supportedLngs: ["en", "ru"], // Поддерживаемые языки
    backend: {
      loadPath: gpTranslateUrl + "/locales/{{lng}}/translation.json", // Путь к файлам переводов
    },
    interpolation: {
      escapeValue: false, // React сам экранирует строки
    },
  });

export default i18n;
