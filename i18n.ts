import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import uzTranslation from './locales/uz.json';
import ruTranslation from './locales/ru.json';
import enTranslation from './locales/en.json';

const STORAGE_KEY = 'kelajak_lang';
const supportedLanguages = ['uz', 'ru', 'en'] as const;
export type SupportedLanguage = typeof supportedLanguages[number];

function detectInitialLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'uz';
  
  const saved = localStorage.getItem(STORAGE_KEY) as SupportedLanguage | null;
  if (saved && supportedLanguages.includes(saved)) {
    return saved;
  }

  // Browser language detection on first visit
  try {
    const browserLang = (navigator.language || '').toLowerCase();
    if (browserLang.startsWith('ru')) return 'ru';
    if (browserLang.startsWith('en')) return 'en';
  } catch {
    // fallback
  }

  return 'uz';
}

const initialLanguage = detectInitialLanguage();

// Synchronize <html lang="...">
if (typeof document !== 'undefined') {
  document.documentElement.lang = initialLanguage;
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      uz: { translation: uzTranslation },
      ru: { translation: ruTranslation },
      en: { translation: enTranslation },
    },
    lng: initialLanguage,
    fallbackLng: 'uz',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

i18n.on('languageChanged', (lng: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, lng);
    document.documentElement.lang = lng;
  }
});

export default i18n;
