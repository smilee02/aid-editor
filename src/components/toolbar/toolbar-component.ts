import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ToolbarComponentStyle } from "./toolbar-component.style.js";
import LocalizationService from "../../services/localization-service.js";
import { GlobalStyles } from "../../styles/global-style.js";

@customElement("toolbar-component")
export class ToolbarComponent extends LitElement {
  @property({ type: String })
  writingStyle: string = "formal";

  @property({ type: String })
  language: string = "";

  @property({ attribute: false })
  onWritingStyleChange: (e: CustomEvent) => void = () => {};

  @property({ attribute: false })
  onLocaleChange: (e: CustomEvent) => void = () => {};

  @property({ attribute: false })
  onToggleThemeOverlay: () => void = () => {};

  @property({ attribute: false })
  onExpandContent: () => void = () => {};

  @property({ attribute: false })
  onShortenContent: () => void = () => {};

  @state()
  private isDropdownOpen: boolean = false;

  @state()
  private isDropdownLanguageOpen: boolean = false;

  static styles = [GlobalStyles, ToolbarComponentStyle];

  i18nextService: LocalizationService;

  languages: readonly string[];

  constructor() {
    super();
    this.i18nextService = LocalizationService.getInstance();
    this.language = this.i18nextService.getLocale();
    this.languages = this.i18nextService.getLocales();
  }

  private handleWritingStyleChange(newStyle: string) {
    this.writingStyle = newStyle;
    this.isDropdownOpen = false;
    if (this.onWritingStyleChange) {
      this.onWritingStyleChange(
        new CustomEvent("change", { detail: { style: newStyle } })
      );
    }
  }

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

  private toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  private toggleDropdownLanguage() {
    this.isDropdownLanguageOpen = !this.isDropdownLanguageOpen;
  }

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
