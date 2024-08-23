import { css } from "lit";

export const WriterComponentStyle = css`
  /* Assistant Button */
  .assistant-button {
    border: 1px solid transparent;
    border-radius: var(--button-border-radius);
    padding: var(--button-padding);
    cursor: pointer;
    font-size: var(--button-font-size);
    margin: 0;
    background-color: var(--button-background-color);
    color: var(--button-color);
    transition: background-color 0.3s ease, transform 0.2s ease,
      box-shadow 0.2s ease;
    font-weight: 600;
  }

  .assistant-button:hover {
    background-color: var(--button-hover-background-color);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }

  .assistant-button:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--primary-color-light),
      0 0 5px var(--primary-color);
  }

  /* Overlay */
  .overlay {
    background-color: var(--overlay-background-color);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: var(--overlay-z-index);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Editor */
  .editor {
    background-color: var(--editor-background-color);
    border-radius: var(--modal-border-radius);
    box-shadow: var(--modal-box-shadow);
    width: var(--editor-width);
    height: var(--editor-height);
    position: relative;
    display: flex;
    flex-direction: column;
    padding-left: var(--modal-padding);
    padding-right: var(--modal-padding);
    padding-bottom: var(--modal-padding);
    box-sizing: border-box;
  }

  /* Generated Text */
  .generated-text {
    flex: 1;
    width: 100%;
    border: var(--generated-text-border);
    border-radius: var(--generated-text-border-radius);
    padding: var(--generated-text-padding);
    box-sizing: border-box;
    font-size: var(--generated-text-font-size);
    resize: none;
    white-space: pre-wrap;
    outline: none;
    margin-top: 10px;
    background-color: var(--generated-text-background-color);
    color: var(--generated-text-color);
  }

  .backdrop-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--overlay-background-color);
    z-index: var(--theme-overlay-z-index);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Theme Overlay */
  .theme-overlay {
    background-color: var(--modal-background-color);
    border-radius: var(--modal-border-radius);
    box-shadow: var(--modal-box-shadow);
    width: var(--theme-overlay-width);
    padding: var(--modal-padding);
    box-sizing: border-box;
    position: absolute;
    top: var(--theme-overlay-top);
    left: 50%;
    transform: var(--theme-overlay-transform);
    z-index: calc(var(--theme-overlay-z-index) + 1);
    display: flex;
    flex-direction: column;
    gap: var(--theme-overlay-gap);
    cursor: default;
  }

  .theme-overlay * {
    box-sizing: border-box;
  }

  .theme-overlay input,
  .theme-overlay button {
    width: 100%;
    padding: var(--input-button-padding);
    border-radius: var(--input-button-border-radius);
    font-size: var(--input-button-font-size);
  }

  .theme-overlay input {
    border: var(--input-border);
  }

  .theme-overlay button {
    background-color: var(--button-background-color);
    color: var(--button-color);
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .theme-overlay button:hover {
    background-color: var(--button-hover-background-color);
  }

  @media (min-width: 1367px) {
    .theme-overlay {
      flex-direction: row;
      align-items: center;
    }

    .theme-overlay input,
    .theme-overlay button {
      width: auto;
      flex: 1;
    }
  }

  /* Spinner Overlay */
  .spinner-overlay {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: var(--spinner-z-index);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .spinner-overlay.visible {
    opacity: 1;
    pointer-events: auto;
  }

  .spinner {
    border: 8px solid rgba(0, 0, 0, 0.1);
    border-left: 8px solid var(--spinner-color);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
