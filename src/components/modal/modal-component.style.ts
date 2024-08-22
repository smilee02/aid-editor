import { css } from "lit";

export const ModalComponentStyle = css`
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: var(--modal-overlay-background);
    z-index: var(--modal-z-index-overlay);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease, visibility 0.3s ease;
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
    z-index: var(--modal-z-index);
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .modal p {
    margin-bottom: var(--modal-padding);
    font-size: var(--modal-font-size);
    line-height: 1.5;
    color: var(--modal-text-color);
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
    font-weight: 600;
    color: var(--button-text-color);
    background-color: var(--button-background-color);
    transition: background-color 0.3s ease, transform 0.2s ease;
    border: 1px solid transparent;
  }

  .modal-buttons button:hover,
  .modal-buttons button:focus {
    background-color: var(--button-hover-background-color);
    outline: none;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }

  .modal-buttons .modal-confirm-button {
    background-color: var(--modal-confirm-button-background);
    color: white;
  }

  .modal-buttons .modal-confirm-button:hover {
    background-color: var(--modal-confirm-button-hover-background);
  }

  .modal-buttons .modal-cancel-button {
    background-color: var(--modal-cancel-button-background);
    color: white;
  }

  .modal-buttons .modal-cancel-button:hover {
    background-color: var(--modal-cancel-button-hover-background);
  }

  .modal-buttons button:focus {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  }
`;
