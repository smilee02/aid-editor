import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ModalComponentStyle } from "./modal-component.style.js";

/**
 * @summary ModalComponent provides a basic modal dialog for displaying messages.
 * @description The modal can be used to show a simple alert or to ask for confirmation with "Ok" and "Cancel" buttons. It dispatches a "confirm" event with a boolean indicating the user's choice.
 *
 * @customElement modal-component
 * @status stable
 * @since 1.0
 *
 * @property {boolean} open - Controls the visibility of the modal.
 * @property {string} message - The message displayed in the modal.
 * @property {string} type - The type of modal, either 'alert' or 'confirm'.
 *
 * @csspart modal-overlay - The overlay behind the modal.
 * @csspart modal - The container for the modal content.
 * @csspart modal-buttons - The container for the modal buttons.
 * @csspart confirm - The "Ok" button in the modal.
 * @csspart close - The "Cancel" button in the modal.
 *
 * @cssproperty --modal-background-color - The background color of the modal.
 * @cssproperty --modal-overlay-color - The color of the overlay behind the modal.
 *
 */
@customElement("modal-component")
export class ModalComponent extends LitElement {
  static styles = ModalComponentStyle;

  /**
   * Controls the visibility of the modal.
   * @type {boolean}
   */
  @property({ type: Boolean })
  open = false;

  /**
   * The message displayed in the modal.
   * @type {string}
   */
  @property({ type: String })
  message = "";

  /**
   * The type of modal, either 'alert' or 'confirm'.
   * @type {string}
   */
  @property({ type: String })
  type = "";

  /**
   * Closes the modal and dispatches a "confirm" event with `false` as the detail.
   * This is used to cancel the action when the user clicks outside the modal or on the cancel button.
   */
  private close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent("confirm", { detail: false }));
  }

  /**
   * Handles the confirmation action. Dispatches a "confirm" event with `true` as the detail.
   * This is used to confirm the action when the user clicks on the "Ok" button.
   */
  private handleConfirm() {
    this.dispatchEvent(new CustomEvent("confirm", { detail: true }));
    this.close();
  }

  /**
   * Handles the cancel action. Dispatches a "confirm" event with `false` as the detail.
   * This is used when the user clicks on the "Cancel" button.
   */
  private handleCancel() {
    this.dispatchEvent(new CustomEvent("confirm", { detail: false }));
    this.close();
  }

  render() {
    if (!this.open) return null;

    return html`
      <div class="modal-overlay" @click=${this.close}></div>
      <div class="modal">
        <p>${this.message}</p>
        <div class="modal-buttons">
          ${this.type === "confirm"
            ? html`
                <button class="confirm" @click=${this.handleConfirm}>Ok</button>
                <button class="close" @click=${this.handleCancel}>
                  Cancel
                </button>
              `
            : html`<button class="confirm" @click=${this.close}>Ok</button>`}
        </div>
      </div>
    `;
  }
}
