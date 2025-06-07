import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import language resources
import tr from "./locales/tr.json";
import en from "./locales/en.json";

const LANGUAGE_STORAGE_KEY = "app_language";

// Language detector that uses AsyncStorage
const languageDetector = {
  type: "languageDetector" as const,
  async: true,
  detect: async (callback: (lang: string) => void) => {
    try {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      callback(savedLanguage || "tr"); // Default to Turkish
    } catch (error) {
      console.error("Error loading saved language:", error);
      callback("tr");
    }
  },
  init: () => {},
  cacheUserLanguage: async (language: string) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch (error) {
      console.error("Error saving language:", error);
    }
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      tr: {
        translation: tr,
      },
      en: {
        translation: en,
      },
    },
    fallbackLng: "tr",
    debug: __DEV__,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
