import LocalizationService from "./localization-service";
import { sendRequest } from "./openai-service";

/**
 * @summary SHortenArticleService handles shortening of selected text in a textarea using Generative AI.
 * @description The service allows users to shorten the selected text within a textarea by rewriting it in a specified writing style.
 *
 * @property {(message: string) => void} showAlert - Callback function to display an alert.
 * @property {(message: string) => Promise<boolean>} showConfirm - Callback function to display a confirmation dialog.
 *
 * @since 1.0
 * @status stable
 */
export default class ShortenArticleService {
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
   * Shortens the selected text in the provided textarea.
   * @param {HTMLTextAreaElement} textArea - The textarea element containing the text to shorten.
   * @param {string} writingStyle - The writing style to apply when shortening the text.
   * @returns {Promise<void>}
   */
  async shortenArticle(textArea: HTMLTextAreaElement, writingStyle: string) {
    if (!textArea) return;

    const selectedText = textArea.value.substring(
      textArea.selectionStart,
      textArea.selectionEnd
    );

    if (selectedText === "") {
      this.showAlert(
        this.localizationService.t("modal.messages.alert.selectText")
      );
      return;
    }

    this.showConfirm(
      this.localizationService.t("modal.messages.confirm.overwriteSelectedText")
    ).then(async (overwrite) => {
      if (overwrite) {
        await this.fetchShortenContent(textArea, writingStyle);
      }
    });
  }

  /**
   * Fetches the shorten content from the OpenAI service and replaces the selected text.
   * @param {HTMLTextAreaElement} textArea - The textarea element containing the text to shorten.
   * @param {string} writingStyle - The writing style to apply when shorten the text.
   * @private
   * @returns {Promise<void>}
   */
  private async fetchShortenContent(
    textArea: HTMLTextAreaElement,
    writingStyle: string
  ) {
    if (!textArea) return;

    const prompt =
      `Rewrite me this text "${textArea.value}" in ${writingStyle} writing style while shortening it in ` +
      this.localizationService.getLocale();

    const response = await this.sendRequest(prompt);
    if (response) {
      textArea.setRangeText(response);
    }
  }

  /**
   * Sends the request to the OpenAI service.
   * @param {string} prompt - The prompt to send to the OpenAI service.
   * @private
   * @returns {Promise<string>}
   */
  private async sendRequest(prompt: string) {
    return sendRequest(prompt, this.showAlert.bind(this));
  }
}
