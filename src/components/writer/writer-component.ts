import { html, LitElement } from "lit";
import { property, query, state } from "lit/decorators.js";
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
import LocalizationService from "../../services/localization-service.js";
import { GlobalStyles } from "../../styles/global-style.js";
import rangy from "rangy";
import FroalaEditor from "froala-editor";

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
 * @property {string} locale - Locale that the components should use
 * @property {boolean} isLoading - Controls the visibility of the spinner
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
export default class WriterComponent extends LitElement {
  static styles = [GlobalStyles, WriterComponentStyle];

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

  /**
   * Locale of the component
   * @type {string}
   */
  @property({ type: String })
  locale = "";

  /**
   * Loading spinner
   * @type {boolean}
   */
  @property({ type: Boolean })
  isLoading: boolean = false;

  /**
   * Editor type
   * @type {string}
   */
  @property({ type: String })
  editorType = "";

  /**
   * Editor selector
   * @type {string}
   */
  @property({ type: String })
  editorSelector = "";

  @state()
  selectedText = "";

  /** Reference to the article theme input element.
   * @type {HTMLInputElement | undefined} -
   */
  @query("#article-theme")
  articleThemeInput: HTMLInputElement | undefined;

  /** Reference to the generated text area element.
   * @type {HTMLTextAreaElement | undefined} -
   */
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

  /**
   * Service for localization.
   * @type {LocalizationService}
   */
  i18nextService: LocalizationService | undefined;

  /**
   * Editor instance
   * @type {FroalaEditor | undefined}
   */
  editorInstance: FroalaEditor | undefined;

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
    this.localeSetter();
  }

  firstUpdated() {
    this.localeSetter();
    this.detectEditor();
  }

  /**
   * Sets the locale of the web component
   */

  private localeSetter() {
    if (this.locale) {
      this.i18nextService = LocalizationService.getInstance(this.locale);
    } else {
      this.i18nextService = LocalizationService.getInstance(navigator.language);
    }
  }

  /**
   * Detects the editor that is being used
   */
  private detectEditor() {
    if (this.editorType != "" && this.editorSelector != "") {
      var editorElement = this.shadowRoot!.querySelector(this.editorSelector);
      if (this.editorType == "froala-editor") {
        this.editorInstance = new FroalaEditor(this.editorSelector, {
          events: {
            initialized: () => {
              this.editorInstance = (editorElement as any).froalaEditor;
            },
          },
        });
      }
    }
  }

  /**
   * Handles changes to the writing style.
   * @param {Event} e - The event triggered when the writing style is changed.
   */
  private handleWritingStyleChangeEvent(e: CustomEvent) {
    this.writingStyle = e.detail.style;
  }

  /**
   * Handles changes to the locale.
   * @param {Event} e - The event triggered when the locale is changed.
   */
  private handleLocaleChange(e: CustomEvent) {
    this.locale = e.detail.language;
    this.i18nextService!.setLocale(this.locale);
    this.performUpdate();
  }

  /**
   * Toggles the visibility of the main assistant overlay.
   * Also creates an instance of OpenAI every time the editor is opened (Singleton)
   */
  private toggleOverlay() {
    this.overlayVisible = !this.overlayVisible;
    try {
      if (this.overlayVisible) {
        getOpenAIInstance();
        this.performUpdate();
        if (this.generatedTextArea) {
          var text = this.getTextSelectedFromEditor();
          this.generatedTextArea!.value = text;
        }
      } else {
        clearOpenAIInstance();
        this.replaceSelectedTextFromEditor();
      }
    } catch (error) {
      this.showAlert((error as Error).message);
    }
  }

  private getAllIFrames() {
    var iframes: HTMLIFrameElement[] = [];
    function findIFrames(document: Document) {
      const frames = document.querySelectorAll("iframe");
      frames.forEach((frame) => {
        iframes.push(frame);
        try {
          const innerDoc =
            frame.contentDocument || frame.contentWindow?.document;
          if (innerDoc) {
            findIFrames(innerDoc);
          }
        } catch (e) {
          console.warn("Can't access iframe");
        }
      });
    }

    findIFrames(document);

    return iframes;
  }

  private getFirstRange(document: Document | HTMLIFrameElement) {
    var sel = rangy.getSelection(document);
    return sel.rangeCount ? sel.getRangeAt(0) : null;
  }

  /**
   * Return the text of an editor
   * @return {string}
   */
  private getTextSelectedFromEditor() {
    if (this.editorInstance && this.editorType == "froala-editor") {
      var text = this.editorInstance.html.getSelected();
    } else {
      var text = this.getTextSelection();
    }
    this.selectedText = text;
    return text;
  }

  private replaceSelectedTextFromEditor() {
    if (this.editorInstance && this.editorType == "froala-editor") {
      var editorText = this.editorInstance.html.get();
      if (editorText != "") {
        editorText = editorText.replace(
          this.selectedText,
          this.generatedTextArea!.value
        );
      } else {
        editorText = this.generatedTextArea!.value;
      }

      this.editorInstance.html.set(editorText);
    } else {
      this.overwriteTextSelection();
    }
  }

  /**
   * Returns the text that was selected in the document
   * @returns {string}
   */
  private getTextSelection(): string {
    const iframes = this.getAllIFrames();
    let fullSelection = "";

    if (iframes.length > 0) {
      for (let i = 0; i < iframes.length; i++) {
        var htmlSelection = rangy.getSelection(iframes[i]).toHtml();
        if (htmlSelection != "") {
          fullSelection += htmlSelection;
        }
      }
    } else {
      var htmlSelection = rangy.getSelection(document).toHtml();
      if (htmlSelection != "") {
        fullSelection += htmlSelection;
      }
    }

    return fullSelection;
  }

  /**
   * Overwrites the text that was selected
   */
  private overwriteTextSelection() {
    const iframes = this.getAllIFrames();
    if (this.generatedTextArea!.value != "") {
      if (iframes.length > 0) {
        for (let i = 0; i < iframes.length; i++) {
          var range = this.getFirstRange(iframes[i]);
          if (range) {
            const htmlContent = this.generatedTextArea!.value;

            const fragment = document
              .createRange()
              .createContextualFragment(htmlContent);
            range.deleteContents();
            range.insertNode(fragment);
            rangy.getSelection(iframes[i]).setSingleRange(range);
          }
        }
      } else {
        var range = this.getFirstRange(document);
        if (range) {
          const htmlContent = this.generatedTextArea!.value;

          const fragment = document
            .createRange()
            .createContextualFragment(htmlContent);
          range.deleteContents();
          range.insertNode(fragment);
          rangy.getSelection(document).setSingleRange(range);
        }
      }
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
    this.themeOverlayVisible = false;
    this.toggleOverlay();
  }

  /**
   * Generates an article based on the provided theme and writing style.
   * @returns {Promise<void>}
   */
  private async generateArticle() {
    this.isLoading = true;
    try {
      await this.writeArticleService.generateArticle(
        this.articleThemeInput!,
        this.generatedTextArea!,
        this.writingStyle
      );
    } catch (error) {
      this.showAlert((error as Error).message);
    } finally {
      this.isLoading = false;
      this.themeOverlayVisible = false;
    }
  }

  /**
   * Expands the current content in the textarea.
   * @returns {Promise<void>}
   */
  private async expandContent() {
    this.isLoading = true;
    try {
      await this.expandArticleService.expandArticle(
        this.generatedTextArea!,
        this.writingStyle
      );
    } catch (error) {
      this.showAlert((error as Error).message);
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Shortens the current content in the textarea.
   * @returns {Promise<void>}
   */
  private async shortenContent() {
    this.isLoading = true;
    try {
      await this.shortenArticleService.shortenArticle(
        this.generatedTextArea!,
        this.writingStyle
      );
    } catch (error) {
      this.showAlert((error as Error).message);
    } finally {
      this.isLoading = false;
    }
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
    return html`<button
      class="assistant-button"
      part="assistant-button"
      @click=${this.toggleOverlay}
    >
      ${this.i18nextService!.t("writer.buttons.assistant")}
    </button>`;
  }

  /**
   * Renders the main editor overlay.
   * @returns {TemplateResult | null}
   */
  private overlay() {
    return this.overlayVisible
      ? html`<div class="overlay" part="overlay">${this.editor()}</div>`
      : null;
  }

  /**
   * Renders the toolbar component.
   * @returns {TemplateResult}
   */
  private toolbar() {
    return html`
      <toolbar-component
        exportparts="languages-toolbar, dropdown-container, dropdown-button, dropdown-arrow, dropdown-menu, dropdown-item, checkmark, dropdown-container-language, dropdown-button-language, dropdown-arrow-language, dropdown-menu-language, dropdown-item-language, checkmark-language, tabs-toolbar, toolbar-tabs, tab-container, tab-button, tooltip, close-button"
        .writingStyle=${this.writingStyle}
        .onWritingStyleChange=${this.handleWritingStyleChangeEvent.bind(this)}
        .onToggleThemeOverlay=${this.toggleThemeOverlay.bind(this)}
        .onExpandContent=${this.expandContent.bind(this)}
        .onShortenContent=${this.shortenContent.bind(this)}
        @locale-change=${this.handleLocaleChange}
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
          <div class="backdrop-overlay" part="backdrop-overlay" @click="${
            this.toggleThemeOverlay
          }">
            <div class="theme-overlay" part="theme-overlay" @click="${(
              e: Event
            ) => e.stopPropagation()}">
              <h1 class="theme-title" part="theme-title">${this.i18nextService!.t(
                "writer.overlays.themeTitle"
              )}</h1>
              <input id="article-theme" part="article-theme" placeholder=${this.i18nextService!.t(
                "writer.overlays.themePlaceholder"
              )}></input>
              <button class="theme-button" part="theme-button" @click="${
                this.generateArticle
              }">
                ${this.i18nextService!.t("writer.buttons.generate")}
              </button>
            </div>
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
        part="generated-text"
        placeholder=${this.i18nextService!.t(
          "writer.overlays.generatedTextPlaceholder"
        )}
      ></textarea>
      ${this.themeOverlay()}
    </div>`;
  }

  /**
   * Renders the spinner.
   * @returns {TemplateResult}
   */
  private spinner() {
    return this.isLoading
      ? html`
          <div class="spinner-overlay visible" part="spinner-overlay">
            <div class="spinner" part="spinner"></div>
          </div>
        `
      : null;
  }

  render() {
    return html` ${this.buttonOverlay()} ${this.overlay()} ${this.spinner()}
      <!--Alert Modal-->
      <modal-component
        exportparts="modal, modal-overlay, modal-buttons, modal-confirm-button, modal-cancel-button"
        .open=${this.showAlertModal}
        .type=${"alert"}
        .message=${this.modalMessage}
        @confirm=${() => {
          this.showAlertModal = false;
        }}
      ></modal-component>
      <!--Confirm Modal-->
      <modal-component
        exportparts="modal, modal-overlay, modal-buttons, modal-confirm-button, modal-cancel-button"
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
