import { html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { WriterComponentStyle } from "./writer-component.style.js";
import "../modal/modal-component.js";
import "../toolbar/toolbar-component.js";

import WriteArticleService from "../../services/write-article-service.js";
import ExpandArticleService from "../../services/expand-article-service.js";
import ShortenArticleService from "../../services/shorten-article-service.js";
import {
  clearOpenAIInstance,
  getOpenAIInstance,
} from "../../services/openai-service.js";

/**
 * @summary Writer component provides the main interface for creating, expanding, and shortening articles using AI-driven services.
 * @description The Writer component allows users to generate content, expand or shorten existing text, within the AID Editor. It also includes modals for alerts and confirmations.
 *
 * @customElement writer-assistant
 * @status stable
 * @since 1.0
 *
 * @property {boolean} overlayVisible - Controls the visibility of the main assistant overlay.
 * @property {boolean} themeOverlayVisible - Controls the visibility of the theme input overlay.
 * @property {string} writingStyle - The current writing style applied to generated content.
 * @property {string} modalMessage - The message displayed in the alert or confirm modals.
 * @property {boolean} showAlertModal - Determines if the alert modal is visible.
 * @property {boolean} showConfirmModal - Determines if the confirm modal is visible.
 *
 * @csspart overlay - The container for the main assistant overlay.
 * @csspart editor - The container for the editor area.
 * @csspart theme-overlay - The container for the theme input overlay.
 * @csspart generated-text - The textarea for displaying generated text.
 *
 * @cssproperty --overlay-background-color - The background color of the overlay.
 * @cssproperty --theme-overlay-background-color - The background color of the theme overlay.
 *
 */
@customElement("writer-assistant")
export default class Writer extends LitElement {
  static styles = WriterComponentStyle;

  /**
   * Controls the visibility of the main assistant overlay.
   * @type {boolean}
   */
  @property({ type: Boolean })
  overlayVisible = false;

  /**
   * Controls the visibility of the theme input overlay.
   * @type {boolean}
   */
  @property({ type: Boolean })
  themeOverlayVisible = false;

  /**
   * The current writing style applied to generated content.
   * @type {string}
   */
  @property({ type: String })
  writingStyle: string = "formal";

  /**
   * The message displayed in the alert or confirm modals.
   * @type {string}
   */
  @property({ type: String })
  modalMessage = "";

  /**
   * Determines if the alert modal is visible.
   * @type {boolean}
   */
  @property({ type: Boolean })
  showAlertModal = false;

  /**
   * Determines if the confirm modal is visible.
   * @type {boolean}
   */
  @property({ type: Boolean })
  showConfirmModal = false;

  @query("#article-theme")
  articleThemeInput: HTMLInputElement | undefined;

  @query("#text-area-generated")
  generatedTextArea: HTMLTextAreaElement | undefined;

  /**
   * Service for writing new articles.
   * @type {WriteArticleService}
   */
  writeArticleService: WriteArticleService;

  /**
   * Service for expanding existing content.
   * @type {ExpandArticleService}
   */
  expandArticleService: ExpandArticleService;

  /**
   * Service for shortening existing content.
   * @type {ShortenArticleService}
   */
  shortenArticleService: ShortenArticleService;

  constructor() {
    super();
    this.writeArticleService = new WriteArticleService(
      this.showAlert.bind(this),
      this.showConfirm.bind(this)
    );
    this.expandArticleService = new ExpandArticleService(
      this.showAlert.bind(this),
      this.showConfirm.bind(this)
    );
    this.shortenArticleService = new ShortenArticleService(
      this.showAlert.bind(this),
      this.showConfirm.bind(this)
    );
  }

  /**
   * Handles changes to the writing style.
   * @param {Event} e - The event triggered when the writing style is changed.
   */
  private handleWritingStyleChange(e: Event) {
    this.writingStyle = (e.target as HTMLSelectElement).value;
  }

  /**
   * Toggles the visibility of the main assistant overlay.
   * Also creates an instance of OpenAI every time the editor is opened (Singleton)
   */
  private toggleOverlay() {
    this.overlayVisible = !this.overlayVisible;
    try {
      if (!this.overlayVisible) {
        clearOpenAIInstance();
      } else {
        getOpenAIInstance();
      }
    } catch (error) {
      this.showAlert((error as Error).message);
    }
  }

  /**
   * Toggles the visibility of the theme input overlay.
   */
  private toggleThemeOverlay() {
    this.themeOverlayVisible = !this.themeOverlayVisible;
  }

  /**
   * Closes all overlays (main and theme input).
   */
  private closeOverlays() {
    this.overlayVisible = false;
    this.themeOverlayVisible = false;
  }

  /**
   * Generates an article based on the provided theme and writing style.
   * @returns {Promise<void>}
   */
  private async generateArticle() {
    await this.writeArticleService.generateArticle(
      this.articleThemeInput!,
      this.generatedTextArea!,
      this.writingStyle
    );

    this.themeOverlayVisible = false;
  }

  /**
   * Expands the current content in the textarea.
   * @returns {Promise<void>}
   */
  private async expandContent() {
    await this.expandArticleService.expandArticle(
      this.generatedTextArea!,
      this.writingStyle
    );
  }

  /**
   * Shortens the current content in the textarea.
   * @returns {Promise<void>}
   */
  private async shortenContent() {
    await this.shortenArticleService.shortenArticle(
      this.generatedTextArea!,
      this.writingStyle
    );
  }

  /**
   * Displays an alert modal with a given message.
   * @param {string} message - The message to display in the alert modal.
   */
  private showAlert(message: string) {
    this.modalMessage = message;
    this.showAlertModal = true;
  }

  /**
   * Displays a confirm modal with a given message and waits for user confirmation.
   * @param {string} message - The message to display in the confirm modal.
   * @returns {Promise<boolean>} - Resolves with true if the user confirms, otherwise false.
   */
  private showConfirm(message: string): Promise<boolean> {
    this.modalMessage = message;
    this.showConfirmModal = true;
    return new Promise((resolve) => {
      this.addEventListener(
        "confirm",
        (event) => {
          const customEvent = event as CustomEvent<boolean>;
          resolve(customEvent.detail);
          this.showConfirmModal = false;
        },
        { once: true }
      );
    });
  }

  /**
   * Renders the button to toggle the assistant overlay.
   * @returns {TemplateResult}
   */
  private buttonOverlay() {
    return html`<button class="assistant-button" @click=${this.toggleOverlay}>
      Assistant
    </button>`;
  }

  /**
   * Renders the main editor overlay.
   * @returns {TemplateResult | null}
   */
  private overlay() {
    return this.overlayVisible
      ? html`<div class="overlay">${this.editor()}</div>`
      : null;
  }

  /**
   * Renders the toolbar component.
   * @returns {TemplateResult}
   */
  private toolbar() {
    return html`
      <toolbar-component
        .writingStyle=${this.writingStyle}
        .onWritingStyleChange=${this.handleWritingStyleChange.bind(this)}
        .onToggleThemeOverlay=${this.toggleThemeOverlay.bind(this)}
        .onExpandContent=${this.expandContent.bind(this)}
        .onShortenContent=${this.shortenContent.bind(this)}
        @close=${this.closeOverlays}
      ></toolbar-component>
    `;
  }

  /**
   * Renders the theme input overlay for generating articles.
   * @returns {TemplateResult | null}
   */
  private themeOverlay() {
    return this.themeOverlayVisible
      ? html`
          <div class="theme-overlay">
            <h1 class="theme-title">Theme for article</h1>
            <input id="article-theme" placeholder="Write about..."></input>
            <button class="theme-button" @click="${this.generateArticle}">Generate</button>
          </div>
        `
      : null;
  }

  /**
   * Renders the editor, including the toolbar and the text area.
   * @returns {TemplateResult}
   */
  private editor() {
    return html`<div class="editor">
      ${this.toolbar()}
      <textarea
        id="text-area-generated"
        class="generated-text"
        placeholder="Generated text..."
      ></textarea>
      ${this.themeOverlay()}
    </div>`;
  }

  render() {
    return html` ${this.buttonOverlay()} ${this.overlay()}
      <!--Alert Modal-->
      <modal-component
        .open=${this.showAlertModal}
        .type=${"alert"}
        .message=${this.modalMessage}
        @confirm=${() => {
          this.showAlertModal = false;
        }}
      ></modal-component>
      <!--Confirm Modal-->
      <modal-component
        .open=${this.showConfirmModal}
        .type=${"confirm"}
        .message=${this.modalMessage}
        @confirm=${(e: CustomEvent) => {
          const confirmed = e.detail;
          this.showConfirmModal = false;
          this.dispatchEvent(new CustomEvent("confirm", { detail: confirmed }));
        }}
      ></modal-component>`;
  }
}
