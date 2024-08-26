import { css } from "lit";
export const GlobalStyles = css`
  :host {
    --overlay-background-color: rgba(0, 0, 0, 0.5);
    --overlay-z-index: 10;
    --spinner-z-index: 40;
    --spinner-color: #555555;

    --modal-border-radius: 8px;
    --modal-box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
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

    --button-background-color: #454545;
    --button-color: white;
    --button-hover-background-color: #424242;
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

    --tooltip-background-color: #8b8b8b;
    --tooltip-text-color: #fff;
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
    --tooltip-z-index: 10;

    --modal-background-color: #ffffff;
    --modal-overlay-background: rgba(0, 0, 0, 0.5);
    --modal-padding: 20px;
    --modal-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    --modal-min-width: 300px;
    --modal-font-size: 14px;
    --modal-text-color: #333;
    --modal-z-index: 51;
    --modal-z-index-overlay: 50;

    --modal-confirm-button-background: #555555;
    --modal-confirm-button-hover-background: #414141;
    --modal-cancel-button-background: #454545;
    --modal-cancel-button-hover-background: #424242;

    --gap-between-buttons: 0.75em;

    --tab-border-radius: 4px;
    --tab-padding: 8px 12px;
    --tab-font-size: 14px;
    --tab-background-color: #ffffff;
    --tab-text-color: #333;
    --tab-hover-background-color: #f7f7f7c6;
    --tab-active-background-color: #e0e0e0;
    --tab-active-text-color: #000;
    --tab-hover-text-color: #454545;

    font-family: "Inter", sans-serif;
    /* Dropdown Button */
    --dropdown-button-border-radius: 4px;
    --dropdown-button-padding: 7px 12px;
    --dropdown-button-font-size: 14px;
    --dropdown-button-text-color: #333;
    --dropdown-button-border-color: #ddd;
    --dropdown-button-hover-background-color: #efefef;
    --dropdown-button-background-color: #fff;

    /* Dropdown Menu */
    --dropdown-menu-background-color: #fff;
    --dropdown-menu-border-color: #ddd;
    --dropdown-menu-border-radius: 4px;
    --dropdown-menu-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    --dropdown-menu-padding: 8px;
    --dropdown-menu-font-size: 14px;
    --dropdown-menu-button-padding: 4px;
    --dropdown-menu-text-color: #333;
    --dropdown-menu-hover-background-color: #f1f1f1c5;
    --dropdown-menu-selected-background-color: #dedede;
    --dropdown-menu-selected-text-color: #000;
    --dropdown-menu-z-index: 20;
  }
`;
