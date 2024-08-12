import { css } from "lit";

export const ToolbarComponentStyle = css`
  :host {
    --button-border-radius: 4px;
    --button-padding: 8px 16px;
    --button-font-size: 14px;
    --button-background-color: #e5252c;
    --button-color: white;
    --button-hover-background-color: #db1d12;

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
  }

  /* General Styles */
  button {
    border: none;
    border-radius: var(--button-border-radius);
    padding: var(--button-padding);
    cursor: pointer;
    font-size: var(--button-font-size);
    margin: 0;
  }

  button:focus {
    outline: none;
  }

  .close-button {
    background-color: transparent;
    font-size: var(--close-button-font-size);
    font-weight: var(--close-button-font-weight);
    color: var(--close-button-color);
    cursor: pointer;
  }

  .close-button:hover {
    color: var(--close-button-hover-color);
  }

  /* Toolbar */
  .toolbar {
    display: flex;
    align-items: center;
    padding-bottom: var(--toolbar-padding-bottom);
    border-bottom: var(--toolbar-border-bottom);
    margin-bottom: var(--toolbar-margin-bottom);
  }

  .toolbar .toolbar-buttons {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  .toolbar .close-button {
    margin-left: auto;
  }

  .toolbar .toolbar-buttons button {
    background-color: var(--button-background-color);
    color: var(--button-color);
  }

  .toolbar .toolbar-buttons button:hover {
    background-color: var(--button-hover-background-color);
  }

  .toolbar select {
    border-radius: var(--select-border-radius);
    padding: var(--select-padding);
    border: 1px solid var(--select-border-color);
    background-color: var(--select-background-color);
    font-size: var(--select-font-size);
    outline: none;
    margin-right: 2px;
    cursor: pointer;
  }

  .toolbar select:focus {
    border-color: var(--select-focus-border-color);
  }

  .toolbar .select-wrapper {
    position: relative;
  }

  /* Tooltip */
  .tooltip {
    visibility: hidden;
    background-color: var(--tooltip-background-color);
    color: var(--tooltip-color);
    text-align: center;
    border-radius: var(--tooltip-border-radius);
    padding: var(--tooltip-padding);
    position: absolute;
    z-index: 100;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: var(--tooltip-margin-top);
    width: var(--tooltip-width);
    font-size: var(--tooltip-font-size);
    opacity: var(--tooltip-opacity);
    transition: var(--tooltip-transition);
  }

  /**Arrow Tooltip */
  /* .tooltip::after {
    content: "";
    position: absolute;
    top: calc(var(--tooltip-arrow-size) * -2);
    left: 50%;
    margin-left: calc(var(--tooltip-arrow-size) * -1);
    border-width: var(--tooltip-arrow-size);
    border-style: solid;
    border-color: transparent transparent var(--tooltip-arrow-color) transparent;
  }*/

  .button-container:hover .tooltip,
  .select-wrapper:hover .tooltip {
    visibility: visible;
    opacity: var(--tooltip-visible-opacity);
    transition-delay: 0.5s;
  }

  .button-container:focus-within .tooltip,
  .select-wrapper:focus-within .tooltip {
    visibility: hidden;
    opacity: var(--tooltip-visible-opacity);
    transition-delay: 0s;
  }
`;
