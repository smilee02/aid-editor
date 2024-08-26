import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ToolbarComponentStyle } from "./toolbar-component.style.js";
import LocalizationService from "../../services/localization-service.js";
import { GlobalStyles } from "../../styles/global-style.js";

/**
 * @summary Toolbar component provides controls for selecting writing styles, languages, and content manipulation.
 * @description The Toolbar component allows users to change writing styles and languages and perform actions such as creating, expanding, and shortening articles. It includes dropdowns for writing style and language selection and buttons for each action.
 *
 * @customElement toolbar-component
 * @status stable
 * @since 1.0
 *
 * @property {string} writingStyle - The currently selected writing style.
 * @property {string} language - The currently selected language.
 * @property {function} onWritingStyleChange - Callback function invoked when writing style changes.
 * @property {function} onLocaleChange - Callback function invoked when language changes.
 * @property {function} onToggleThemeOverlay - Callback function invoked when the theme overlay is toggled.
 * @property {function} onExpandContent - Callback function invoked when the expand content action is triggered.
 * @property {function} onShortenContent - Callback function invoked when the shorten content action is triggered.
 *
 * @csspart languages-toolbar - The container for the writing styles and languages toolbar.
 * @csspart dropdown-container - The container for the writing styles dropdown.
 * @csspart dropdown-container-language - The container for the languages dropdown.
 * @csspart dropdown-button - The button for toggling the writing styles dropdown.
 * @csspart dropdown-button-language - The button for toggling the languages dropdown.
 * @csspart dropdown-arrow - The arrow indicating the dropdown state for writing styles.
 * @csspart dropdown-arrow-language - The arrow indicating the dropdown state for languages.
 * @csspart dropdown-menu - The menu for writing style selections.
 * @csspart dropdown-menu-language - The menu for language selections.
 * @csspart dropdown-item - The individual item in the writing style dropdown.
 * @csspart dropdown-item-language - The individual item in the language dropdown.
 * @csspart toolbar-tabs - The container for the toolbar action buttons.
 * @csspart tab-container - The container for each toolbar tab.
 * @csspart tab-button - The button for each toolbar action.
 * @csspart tooltip - The tooltip for each toolbar action.
 * @csspart close-button - The button to close the toolbar.
 *
 * @cssproperty --toolbar-background-color - The background color of the toolbar.
 * @cssproperty --dropdown-background-color - The background color of the dropdown menus.
 * @cssproperty --button-hover-color - The hover color for the buttons.
 */
@customElement("toolbar-component")
export class ToolbarComponent extends LitElement {
  /**
   * The currently selected writing style.
   *  @type {string}
   */
  @property({ type: String })
  writingStyle: string = "formal";

  /**
   * The currently selected language.
   * @type {string}
   */
  @property({ type: String })
  language: string = "";

  /**
   * Callback function invoked when writing style changes.
   * @type {(e: CustomEvent) => void}
   */
  @property({ attribute: false })
  onWritingStyleChange: (e: CustomEvent) => void = () => {};

  /**
   * Callback function invoked when language changes.
   * @type {(e: CustomEvent) => void}
   */
  @property({ attribute: false })
  onLocaleChange: (e: CustomEvent) => void = () => {};

  /**
   * Callback function invoked when the theme overlay is toggled.
   * @type {() => void}
   */
  @property({ attribute: false })
  onToggleThemeOverlay: () => void = () => {};

  /**
   * Callback function invoked when the expand content action is triggered.
   * @type {() => void}
   */
  @property({ attribute: false })
  onExpandContent: () => void = () => {};

  /**
   * Callback function invoked when the shorten content action is triggered.
   * @type {() => void}
   */
  @property({ attribute: false })
  onShortenContent: () => void = () => {};

  /**
   * Indicates whether the writing style dropdown is open.
   *  @type {boolean}
   */
  @state()
  private isDropdownOpen: boolean = false;

  /**
   * Indicates whether the language dropdown is open.
   * @type {boolean}
   */
  @state()
  private isDropdownLanguageOpen: boolean = false;

  static styles = [GlobalStyles, ToolbarComponentStyle];

  /**
   * Instance of the localization service.
   * @type {LocalizationService}
   */
  i18nextService: LocalizationService;

  /**
   * List of available languages.
   * @type {readonly string[]}
   */
  languages: readonly string[];

  constructor() {
    super();
    this.i18nextService = LocalizationService.getInstance();
    this.language = this.i18nextService.getLocale();
    this.languages = this.i18nextService.getLocales();
  }

  /**
   * Handles changes to the writing style.
   * @param {string} newStyle - The new writing style selected by the user.
   */
  private handleWritingStyleChange(newStyle: string) {
    this.writingStyle = newStyle;
    this.isDropdownOpen = false;
    if (this.onWritingStyleChange) {
      this.onWritingStyleChange(
        new CustomEvent("change", { detail: { style: newStyle } })
      );
    }
  }

  /**
   * Handles changes to the language.
   * @param {string} language - The new language selected by the user.
   */
  private handleLocaleChange(language: string) {
    this.i18nextService.setLocale(language);
    this.language = language;
    this.isDropdownLanguageOpen = false;

    this.performUpdate();

    this.dispatchEvent(
      new CustomEvent("locale-change", {
        detail: { language },
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Toggles the visibility of the writing style dropdown.
   */
  private toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  /**
   * Toggles the visibility of the language dropdown.
   */
  private toggleDropdownLanguage() {
    this.isDropdownLanguageOpen = !this.isDropdownLanguageOpen;
  }

  /**
   * Renders the toolbar layout including writing style dropdown, language dropdown, and action buttons.
   * @returns {TemplateResult} The template result for the component's layout.
   */
  render() {
    return html`
      <div class="languages-toolbar" part="languages-toolbar">
        <!-- Writing Style Dropdown -->
        <div class="dropdown-container" part="dropdown-container">
          <button
            @click="${this.toggleDropdown}"
            class="dropdown-button"
            part="dropdown-button"
          >
            ${this.i18nextService.t(
              `toolbar.writingStyles.${this.writingStyle}`
            )}
            <span
              class="arrow ${this.isDropdownOpen ? "up" : "down"}"
              part="dropdown-arrow"
            ></span>
          </button>
          ${this.isDropdownOpen
            ? html`
                <ul class="dropdown-menu" part="dropdown-menu">
                  ${["formal", "casual", "scientific"].map(
                    (style) => html`
                      <li>
                        <button
                          @click="${() => this.handleWritingStyleChange(style)}"
                          class="${this.writingStyle === style
                            ? "selected"
                            : ""}"
                          part="dropdown-item"
                        >
                          ${this.i18nextService.t(
                            `toolbar.writingStyles.${style}`
                          )}
                          ${this.writingStyle === style
                            ? html`<span class="checkmark" part="checkmark">
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="m9 16.2-3.5-3.5a.9839.9839 0 0 0-1.4 0c-.39.39-.39 1.01 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7c.39-.39.39-1.01 0-1.4a.9839.9839 0 0 0-1.4 0L9 16.2z"
                                    fill="#0a0"
                                  />
                                </svg>
                              </span>`
                            : ""}
                        </button>
                      </li>
                    `
                  )}
                </ul>
              `
            : ""}
        </div>

        <!-- Language Dropdown -->
        <div class="dropdown-container" part="dropdown-container-language">
          <button
            @click="${this.toggleDropdownLanguage}"
            class="dropdown-button-language"
            part="dropdown-button-language"
          >
            ${this.i18nextService.t(`toolbar.languages.${this.language}`)}
            <span
              class="arrow ${this.isDropdownLanguageOpen ? "up" : "down"}"
              part="dropdown-arrow-language"
            ></span>
          </button>
          ${this.isDropdownLanguageOpen
            ? html`
                <ul class="dropdown-menu" part="dropdown-menu-language">
                  ${this.languages.map(
                    (language) => html`
                      <li>
                        <button
                          @click="${() => this.handleLocaleChange(language)}"
                          class="${this.language === language
                            ? "selected"
                            : ""}"
                          part="dropdown-item-language"
                        >
                          ${this.i18nextService.t(
                            `toolbar.languages.${language}`
                          )}
                          ${this.language === language
                            ? html`<span
                                class="checkmark"
                                part="checkmark-language"
                              >
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="m9 16.2-3.5-3.5a.9839.9839 0 0 0-1.4 0c-.39.39-.39 1.01 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7c.39-.39.39-1.01 0-1.4a.9839.9839 0 0 0-1.4 0L9 16.2z"
                                    fill="#0a0"
                                  />
                                </svg>
                              </span>`
                            : ""}
                        </button>
                      </li>
                    `
                  )}
                </ul>
              `
            : ""}
        </div>
      </div>

      <!-- Functionalities Toolbar -->
      <div class="toolbar" part="tabs-toolbar">
        <div class="toolbar-tabs" part="toolbar-tabs">
          <div class="tab-container" part="tab-container">
            <button
              class="tab"
              @click=${this.onToggleThemeOverlay}
              ?active=${false}
              part="tab-button"
            >
              ${this.i18nextService.t("toolbar.tabs.createArticle")}
            </button>
            <span class="tooltip" part="tooltip">
              ${this.i18nextService.t("toolbar.tooltips.createArticle")}
            </span>
          </div>
          <div class="tab-container" part="tab-container">
            <button
              class="tab"
              @click=${this.onExpandContent}
              ?active=${false}
              part="tab-button"
            >
              ${this.i18nextService.t("toolbar.tabs.expandContent")}
            </button>
            <span class="tooltip" part="tooltip">
              ${this.i18nextService.t("toolbar.tooltips.expandContent")}
            </span>
          </div>
          <div class="tab-container" part="tab-container">
            <button
              class="tab"
              @click=${this.onShortenContent}
              ?active=${false}
              part="tab-button"
            >
              ${this.i18nextService.t("toolbar.tabs.shortenContent")}
            </button>
            <span class="tooltip" part="tooltip">
              ${this.i18nextService.t("toolbar.tooltips.shortenContent")}
            </span>
          </div>
        </div>
        <button
          class="close-button"
          part="close-button"
          @click=${() => this.dispatchEvent(new CustomEvent("close"))}
        >
          X
        </button>
      </div>
    `;
  }
}
