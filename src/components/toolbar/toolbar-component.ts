import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ToolbarComponentStyle } from "./toolbar-component.style.js";
import LocalizationService from "../../services/localization-service.js";

/**
 * @summary ToolbarComponent provides a set of controls to interact with the AID - AI-Driven Editor.
 * @description This toolbar includes options for selecting writing styles, creating a new article, and expanding or shortening content. It’s designed to be used within the AID Editor environment.
 *
 * @customElement toolbar-component
 * @status stable
 * @since 1.0
 *
 * @property {string} writingStyle - The current writing style selected in the toolbar. Can be "formal", "casual", or "scientific".
 *
 * @csspart toolbar - The container for the toolbar elements.
 * @csspart select-wrapper - The wrapper around the writing style selector.
 * @csspart toolbar-buttons - The container for the toolbar buttons.
 * @csspart button-container - The container for individual buttons in the toolbar.
 * @csspart tooltip - The tooltip displayed when hovering over buttons.
 * @csspart close-button - The close button in the toolbar for the editor.
 *
 * @cssproperty --button-color - The color of the buttons in the toolbar.
 * @cssproperty --tooltip-background-color - The background color of the tooltips.
 * @cssproperty --tooltip-text-color - The text color of the tooltips.
 *
 */

@customElement("toolbar-component")
export class ToolbarComponent extends LitElement {
  /**
   * The current writing style selected.
   * @type {string}
   */
  @property({ type: String })
  writingStyle: string = "formal";

  /**
   * Callback function when the writing style is changed.
   * @type {function}
   */
  @property({ attribute: false })
  onWritingStyleChange: (e: Event) => void = () => {};

  /**
   * Callback function to toggle the theme input overlay.
   * @type {function}
   */
  @property({ attribute: false })
  onToggleThemeOverlay: () => void = () => {};

  /**
   * Callback function to expand the content.
   * @type {function}
   */
  @property({ attribute: false })
  onExpandContent: () => void = () => {};

  /**
   * Callback function to shorten the content.
   * @type {function}
   */
  @property({ attribute: false })
  onShortenContent: () => void = () => {};

  static styles = ToolbarComponentStyle;

  /**
   * Service for localization.
   * @type {LocalizationService}
   */
  i18nextService: LocalizationService;

  constructor() {
    super();
    this.i18nextService = LocalizationService.getInstance();
  }

  /**
   * Handles changes to the writing style.
   * @param {Event} e - The event triggered when the writing style is changed.
   */
  private handleWritingStyleChange(e: Event) {
    if (this.onWritingStyleChange) {
      this.onWritingStyleChange(e);
    }
  }

  render() {
    return html`
      <div class="toolbar">
        <div class="select-wrapper">
          <select
            id="writing-style-select"
            aria-label="Writing Style"
            @change="${this.handleWritingStyleChange}"
          >
            <option value="formal" ?selected=${this.writingStyle === "formal"}>
              ${this.i18nextService.t("toolbar.writingStyles.formal")}
            </option>
            <option value="casual" ?selected=${this.writingStyle === "casual"}>
              ${this.i18nextService.t("toolbar.writingStyles.casual")}
            </option>
            <option
              value="scientific"
              ?selected=${this.writingStyle === "scientific"}
            >
              ${this.i18nextService.t("toolbar.writingStyles.scientific")}
            </option>
          </select>
          <span class="tooltip"
            >${this.i18nextService.t("toolbar.tooltips.writingStyle")}</span
          >
        </div>
        <div class="toolbar-buttons">
          <div class="button-container" style="position: relative;">
            <button class="article-writer" @click=${this.onToggleThemeOverlay}>
              📝
            </button>
            <span class="tooltip"
              >${this.i18nextService.t("toolbar.tooltips.createArticle")}</span
            >
          </div>
          <div class="button-container" style="position: relative;">
            <button class="expand-content" @click=${this.onExpandContent}>
              ➕
            </button>
            <span class="tooltip"
              >${this.i18nextService.t("toolbar.tooltips.expandContent")}</span
            >
          </div>
          <div class="button-container" style="position: relative;">
            <button class="shorten-content" @click=${this.onShortenContent}>
              ➖
            </button>
            <span class="tooltip"
              >${this.i18nextService.t("toolbar.tooltips.shortenContent")}</span
            >
          </div>
        </div>
        <button
          class="close-button"
          @click=${() => this.dispatchEvent(new CustomEvent("close"))}
        >
          X
        </button>
      </div>
    `;
  }
}
