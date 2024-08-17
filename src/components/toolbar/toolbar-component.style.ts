import { css } from "lit";

export const ToolbarComponentStyle = css`
  .close-button {
    background-color: transparent;
    font-size: var(--close-button-font-size);
    font-weight: var(--close-button-font-weight);
    color: var(--close-button-color);
    cursor: pointer;
    transition: color 0.3s ease;
    outline: none;
    border: none;
  }

  .close-button:hover {
    color: var(--close-button-hover-color);
    outline: none;
    border: none;
  }

  /* Toolbar */
  .toolbar {
    display: flex;
    align-items: center;
    padding-bottom: var(--toolbar-padding-bottom);
    border-bottom: var(--toolbar-border-bottom);
    margin-bottom: var(--toolbar-margin-bottom);
    background-color: var(--toolbar-background-color);
    border-radius: var(--toolbar-border-radius);
    box-shadow: var(--toolbar-shadow);
  }

  .toolbar .toolbar-buttons {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .toolbar .close-button {
    margin-left: auto;
  }

  .toolbar .toolbar-buttons button {
    border: 1px solid transparent;
    border-radius: var(--button-border-radius);
    padding: var(--button-padding);
    cursor: pointer;
    font-size: var(--button-font-size);
    margin: 0;
    background-color: var(--button-background-color);
    color: var(--button-text-color);
    transition: background-color 0.3s ease, transform 0.2s ease,
      box-shadow 0.2s ease;
    font-weight: 600;
  }

  .toolbar .toolbar-buttons button:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--primary-color-light),
      0 0 5px var(--primary-color);
  }

  .toolbar .toolbar-buttons button:hover {
    background-color: var(--button-hover-background-color);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }

  .toolbar select {
    border-radius: var(--select-border-radius);
    padding: var(--select-padding);
    border: 1px solid var(--select-border-color);
    background-color: var(--select-background-color);
    font-size: var(--select-font-size);
    outline: none;
    margin-right: 4px;
    cursor: pointer;
    transition: border-color 0.3s ease, box-shadow 0.2s ease;
  }

  .toolbar select:focus {
    border-color: var(--select-focus-border-color);
    box-shadow: 0 0 0 2px var(--select-focus-border-color-light);
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
    z-index: var(--tooltip-z-index);
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: var(--tooltip-margin-top);
    width: var(--tooltip-width);
    font-size: var(--tooltip-font-size);
    opacity: var(--tooltip-opacity);
    transition: var(--tooltip-transition);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  .button-container:hover .tooltip,
  .select-wrapper:hover .tooltip {
    visibility: visible;
    opacity: var(--tooltip-visible-opacity);
    transition-delay: 0.3s;
  }

  .button-container:focus-within .tooltip,
  .select-wrapper:focus-within .tooltip {
    visibility: hidden;
    opacity: var(--tooltip-visible-opacity);
    transition-delay: 0s;
  }
`;
