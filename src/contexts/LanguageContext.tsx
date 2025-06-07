import React, { createContext, useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (language: string) => Promise<void>;
  supportedLanguages: { code: string; name: string; nativeName: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const LANGUAGE_STORAGE_KEY = "app_language";

export const supportedLanguages = [
  { code: "tr", name: "Turkish", nativeName: "Türkçe" },
  { code: "en", name: "English", nativeName: "English" },
];

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<string>(
    i18n.language || "tr",
  );

  useEffect(() => {
    // Load saved language on app start
    loadSavedLanguage();
  }, []);

  const loadSavedLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (savedLanguage && savedLanguage !== currentLanguage) {
        await changeLanguage(savedLanguage);
      }
    } catch (error) {
      console.error("Error loading saved language:", error);
    }
  };

  const changeLanguage = async (language: string) => {
    try {
      // Change i18n language
      await i18n.changeLanguage(language);

      // Update state
      setCurrentLanguage(language);

      // Save to AsyncStorage
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);

      console.log(`Language changed to: ${language}`);
    } catch (error) {
      console.error("Error changing language:", error);
    }
  };

  const contextValue: LanguageContextType = {
    currentLanguage,
    changeLanguage,
    supportedLanguages,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export default LanguageProvider;
