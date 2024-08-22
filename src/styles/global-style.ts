import { css } from "lit";
export const GlobalStyles = css`
  :host {
    --overlay-background-color: rgba(0, 0, 0, 0.5);
    --overlay-z-index: 10;
    --spinner-z-index: 40;
    --spinner-color: #e5252c;

    --modal-background-color: #ffffff;
    --modal-border-radius: 8px;
    --modal-box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    --modal-padding: 20px;
    --modal-color: #333;

    --editor-width: clamp(370px, 60%, 100%);
    --editor-height: clamp(200px, 80%, 100%);
    --editor-background-color: #ffffff;

    --generated-text-border: 1px solid #e0e0e0;
    --generated-text-border-radius: 4px;
    --generated-text-padding: 15px;
    --generated-text-font-size: 14px;
    --generated-text-background-color: #f9f9f9;
    --generated-text-color: #333;

    --theme-overlay-width: clamp(200px, 50%, 500px);
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

    --close-button-font-size: 18px;
    --close-button-font-weight: bold;
    --close-button-color: #555;
    --close-button-hover-color: #000;

    --toolbar-padding-bottom: 10px;
    --toolbar-border-bottom: 1px solid #e0e0e0;
    --toolbar-margin-bottom: 20px;

    --select-border-radius: 4px;
    --select-padding: 8px 16px;
    --select-border-color: #e0e0e0;
    --select-background-color: #f0f0f0;
    --select-font-size: 14px;
    --select-focus-border-color: #e5252c;

    --tooltip-background-color: #333;
    --tooltip-color: #fff;
    --tooltip-border-radius: 6px;
    --tooltip-padding: 5px;
    --tooltip-width: 120px;
    --tooltip-font-size: 12px;
    --tooltip-margin-top: 5px;
    --tooltip-opacity: 0;
    --tooltip-visible-opacity: 1;
    --tooltip-transition: opacity 0.3s, visibility 0.3s, margin-top 0.3s;
    --tooltip-arrow-size: 5px;
    --tooltip-arrow-color: #333;
    --tooltip-z-index: 30;

    --modal-background: #ffffff;
    --modal-overlay-background: rgba(0, 0, 0, 0.5);
    --modal-padding: 20px;
    --modal-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    --modal-min-width: 300px;
    --modal-font-size: 16px;
    --modal-text-color: #333;
    --modal-z-index: 51;
    --modal-z-index-overlay: 50;

    --modal-confirm-button-background: #e5252c;
    --modal-confirm-button-hover-background: #db1d12;

    --modal-cancel-button-background: #3b3b3b;
    --modal-cancel-button-hover-background: #4a4a4a;

    --gap-between-buttons: 0.75em;

    --button-background-color: #e5252c;
    --button-text-color: white;
    --button-hover-background-color: #db1d12;
    --button-border-radius: 6px;
    --button-padding: 10px 20px;
    --button-font-size: 14px;

    font-family: "Inter", sans-serif;
  }
`;
