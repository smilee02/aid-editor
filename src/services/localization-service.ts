import i18next from "i18next";
import phrases from "../i18n/index";
import LanguageDetector from "i18next-browser-languagedetector";

class LocalizationService {
  private static instance: LocalizationService;
  private defaultLocale = "en-US";
  private fallbackLocale = "en-US";

  private constructor() {
    i18next.use(LanguageDetector).init({
      resources: phrases,
      fallbackLng: this.fallbackLocale,
      lng: this.defaultLocale,
      interpolation: {
        escapeValue: false,
      },
    });
  }

  public static getInstance(): LocalizationService {
    if (!LocalizationService.instance) {
      LocalizationService.instance = new LocalizationService();
    }
    return LocalizationService.instance;
  }

  public getLocale(): string {
    return i18next.language;
  }

  public setLocale(locale: string): void {
    i18next.changeLanguage(locale);
  }

  public t(key: string, options?: any): string {
    return i18next.t(key, options).toString();
  }
}

export default LocalizationService;
