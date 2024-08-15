import LocalizationService from "./localization-service";
import { sendRequest } from "./openai-service";

/**
 * @summary WriteArticleService handles the generation of articles using AI based on a given theme and writing style.
 * @description The service allows users to generate articles by providing a theme and selecting a writing style. It also manages alert and confirmation dialogs.
 *
 * @property {(message: string) => void} showAlert - Callback function to display an alert.
 * @property {(message: string) => Promise<boolean>} showConfirm - Callback function to display a confirmation dialog.
 *
 * @since 1.0
 * @status stable
 */
export default class WriteArticleService {
  showAlert;
  showConfirm;

  /**
   * Service for localization.
   * @type {LocalizationService}
   */
  localizationService: LocalizationService;
  /**
   * @param {(message: string) => void} alertCallback - Callback function to display an alert.
   * @param {(message: string) => Promise<boolean>} confirmCallback - Callback function to display a confirmation dialog.
   */
  constructor(
    alertCallback: (message: string) => void,
    confirmCallback: (message: string) => Promise<boolean>
  ) {
    this.showAlert = alertCallback;
    this.showConfirm = confirmCallback;
    this.localizationService = LocalizationService.getInstance();
  }

  /**
   * Generates an article based on the provided theme and writing style.
   * If the text area has existing content, it prompts the user to confirm if they want to overwrite it.
   *
   * @param {HTMLInputElement} articleThemeInput - The input element containing the article theme.
   * @param {HTMLTextAreaElement} textArea - The textarea element where the generated article will be inserted.
   * @param {string} writingStyle - The writing style to apply when generating the article.
   * @returns {Promise<void>}
   */
  async generateArticle(
    articleThemeInput: HTMLInputElement,
    textArea: HTMLTextAreaElement,
    writingStyle: string
  ) {
    if (!articleThemeInput || articleThemeInput.value.trim() === "") {
      this.showAlert(
        this.localizationService.t("modal.messages.alert.emptyInputThemeField")
      );
      return;
    }

    const hasExistingContent = textArea && textArea.value.trim() !== "";

    if (hasExistingContent) {
      const overwrite = await this.showConfirm(
        this.localizationService.t(
          "modal.messages.confirm.overwriteExistingText"
        )
      );
      if (overwrite) {
        await this.fetchGeneratedContent(
          articleThemeInput,
          textArea,
          writingStyle
        );
      }
    } else {
      await this.fetchGeneratedContent(
        articleThemeInput,
        textArea,
        writingStyle
      );
    }
  }

  /**
   * Fetches the generated article content from the OpenAI service based on the theme and writing style.
   * The content is then inserted into the provided textarea.
   *
   * @param {HTMLInputElement} articleThemeInput - The input element containing the article theme.
   * @param {HTMLTextAreaElement} textArea - The textarea element where the generated article will be inserted.
   * @param {string} writingStyle - The writing style to apply when generating the article.
   * @private
   * @returns {Promise<void>}
   */
  private async fetchGeneratedContent(
    articleThemeInput: HTMLInputElement,
    textArea: HTMLTextAreaElement,
    writingStyle: string
  ) {
    if (!articleThemeInput) return;

    const inputValue = articleThemeInput.value.trim();
    const prompt = `Write me an article about ${inputValue} in ${writingStyle} writing style`;

    const response = await this.sendRequest(prompt);
    if (response) {
      textArea.setRangeText(response);
    }
  }

  /**
   * Sends the request to the OpenAI service and returns the generated content.
   * @param {string} prompt - The prompt to send to the OpenAI service.
   * @private
   * @returns {Promise<string>}
   */
  async sendRequest(prompt: string) {
    return sendRequest(prompt, this.showAlert.bind(this));
  }
}
