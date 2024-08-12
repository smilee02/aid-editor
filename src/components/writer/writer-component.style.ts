import { css } from "lit";

export const WriterComponentStyle = css`
  :host {
    --overlay-background-color: rgba(0, 0, 0, 0.5);
    --modal-background-color: #ffffff;
    --modal-border-radius: 8px;
    --modal-box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    --modal-padding: 20px;
    --modal-z-index: 10;
    --modal-color: #333;

    --editor-width: 60%;
    --editor-height: 80%;
    --editor-min-width: 370px;
    --editor-min-height: 200px;
    --editor-background-color: #ffffff;

    --generated-text-border: 1px solid #e0e0e0;
    --generated-text-border-radius: 4px;
    --generated-text-padding: 15px;
    --generated-text-font-size: 14px;
    --generated-text-background-color: #f9f9f9;
    --generated-text-color: #333;

    --theme-overlay-width: 50%;
    --theme-overlay-max-width: 500px;
    --theme-overlay-min-width: 200px;
    --theme-overlay-top: 20%;
    --theme-overlay-transform: translateX(-50%);
    --theme-overlay-z-index: 20;
    --theme-overlay-gap: 10px;

    --input-button-padding: 10px;
    --input-button-border-radius: 4px;
    --input-button-font-size: 14px;
    --input-border: 1px solid #e0e0e0;

    --button-background-color: #e5252c;
    --button-color: white;
    --button-hover-background-color: #db1d12;
    --button-border-radius: 4px;
    --button-padding: 8px 16px;
    --button-font-size: 14px;
  }
  .assistant-button {
    border: none;
    border-radius: var(--button-border-radius);
    padding: var(--button-padding);
    cursor: pointer;
    font-size: var(--button-font-size);
    margin: 0;
    background-color: var(--button-background-color);
    color: var(--button-color);
  }
  .assistant-button:hover {
    background-color: var(--button-hover-background-color);
  }

  .overlay {
    background-color: var(--overlay-background-color);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: var(--modal-z-index);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .editor {
    background-color: var(--editor-background-color);
    border-radius: var(--modal-border-radius);
    box-shadow: var(--modal-box-shadow);
    width: var(--editor-width);
    height: var(--editor-height);
    position: relative;
    min-width: var(--editor-min-width);
    min-height: var(--editor-min-height);
    display: flex;
    flex-direction: column;
    padding: var(--modal-padding);
    box-sizing: border-box;
  }

  .generated-text {
    flex: 1;
    width: 100%;
    border: var(--generated-text-border);
    border-radius: var(--generated-text-border-radius);
    padding: var(--generated-text-padding);
    box-sizing: border-box;
    font-size: var(--generated-text-font-size);
    resize: none;
    outline: none;
    margin-top: 10px;
    background-color: var(--generated-text-background-color);
    color: var(--generated-text-color);
  }

  /* || Theme Overlay */
  .theme-overlay {
    background-color: var(--modal-background-color);
    border-radius: var(--modal-border-radius);
    box-shadow: var(--modal-box-shadow);
    width: var(--theme-overlay-width);
    max-width: var(--theme-overlay-max-width);
    min-width: var(--theme-overlay-min-width);
    padding: var(--modal-padding);
    box-sizing: border-box;
    position: absolute;
    top: var(--theme-overlay-top);
    left: 50%;
    transform: var(--theme-overlay-transform);
    z-index: var(--theme-overlay-z-index);
    display: flex;
    flex-direction: column;
    gap: var(--theme-overlay-gap);
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
  }

  .theme-overlay button:hover {
    background-color: var(--button-hover-background-color);
  }

  @media (min-width: 1367px) {
    .theme-overlay {
      flex-direction: row;
      align-items: center;
      gap: var(--theme-overlay-gap);
    }

    .theme-overlay input,
    .theme-overlay button {
      width: auto;
      flex: 1;
    }
  }
`;
