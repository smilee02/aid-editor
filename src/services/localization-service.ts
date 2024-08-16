import i18next from "i18next";
import phrases from "../i18n/index";
import LanguageDetector from "i18next-browser-languagedetector";

class LocalizationService {
  private static instance: LocalizationService;
  private defaultLocale = "en-US";
  private fallbackLocale = "en-US";
  private locale = "";

  private constructor(locale?: string) {
    this.initializeI18next(locale);
  }

  public static getInstance(locale?: string): LocalizationService {
    if (!LocalizationService.instance) {
      LocalizationService.instance = new LocalizationService(locale);
    } else if (locale && locale !== LocalizationService.instance.locale) {
      LocalizationService.instance.setLocale(locale);
    }
    return LocalizationService.instance;
  }

  private initializeI18next(locale?: string): void {
    i18next.use(LanguageDetector).init({
      resources: phrases,
      fallbackLng: this.fallbackLocale,
      lng: locale ? locale : this.defaultLocale,
      interpolation: {
        escapeValue: false,
      },
    });
    this.locale = locale ? locale : this.defaultLocale;
  }

  public getLocale(): string {
    return i18next.language;
  }

  public setLocale(locale: string): void {
    i18next.changeLanguage(locale);
    this.locale = locale;
  }

  public t(key: string, options?: any): string {
    return i18next.t(key, options).toString();
  }
}

export default LocalizationService;
