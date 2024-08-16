import { css } from "lit";

export const ModalComponentStyle = css`
  :host {
    --modal-background: white;
    --modal-overlay-background: rgba(0, 0, 0, 0.5);
    --modal-border-radius: 8px;
    --modal-padding: 1em;
    --modal-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    --modal-min-width: 300px;
    --modal-font-size: 14px;

    --button-border-radius: 4px;
    --button-padding: 8px 16px;
    --button-font-size: 14px;

    --confirm-background: #e5252c;
    --confirm-hover-background: #db1d12;

    --close-background: #3b3b3b;
    --close-hover-background: #4a4a4a;

    --gap-between-buttons: 0.5em;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: var(--modal-overlay-background);
    z-index: 400;
  }

  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--modal-background);
    border-radius: var(--modal-border-radius);
    padding: var(--modal-padding);
    box-shadow: var(--modal-shadow);
    z-index: 401;
    min-width: var(--modal-min-width);
  }

  .modal p {
    margin-bottom: var(--modal-padding);
    font-size: var(--modal-font-size);
    cursor: default;
  }

  .modal-buttons {
    display: flex;
    justify-content: flex-end;
    gap: var(--gap-between-buttons);
  }

  .modal-buttons button {
    border: none;
    border-radius: var(--button-border-radius);
    padding: var(--button-padding);
    cursor: pointer;
    font-size: var(--button-font-size);
    margin: 0;
  }

  .modal-buttons .confirm {
    background-color: var(--confirm-background);
  }

  .modal-buttons .confirm:hover {
    background-color: var(--confirm-hover-background);
  }

  .modal-buttons .close {
    background-color: var(--close-background);
  }

  .modal-buttons .close:hover {
    background-color: var(--close-hover-background);
  }
`;
