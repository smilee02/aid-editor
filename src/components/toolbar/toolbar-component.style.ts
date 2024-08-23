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
  }

  .toolbar {
    display: flex;
    align-items: center;
    padding-bottom: var(--toolbar-padding-bottom);
    padding-top: var(--modal-padding);
    border-bottom: var(--toolbar-border-bottom);
    margin-bottom: var(--toolbar-margin-bottom);
    background-color: var(--toolbar-background-color);
    border-radius: var(--toolbar-border-radius);
    box-shadow: var(--toolbar-shadow);
    position: relative;
  }

  .toolbar .close-button {
    margin-left: auto;
  }

  /* Tabs */
  .toolbar-tabs {
    display: flex;
    align-items: center;
    gap: 8px;
    position: relative;
  }

  .tab-container {
    position: relative;
  }

  .tab {
    border: 1px solid transparent;
    border-radius: var(--tab-border-radius);
    padding: var(--tab-padding);
    cursor: pointer;
    font-size: var(--tab-font-size);
    margin: 0;
    background-color: var(--tab-background-color);
    color: var(--tab-text-color);
    transition: color 0.3s ease;
    font-weight: 400;
    position: relative;
  }

  .tab:hover {
    color: var(--tab-hover-text-color);
    border-bottom: 1px var(--tab-hover-text-color);
    background-color: var(--tab-hover-background-color);
  }

  .tab:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--primary-color-light),
      0 0 5px var(--primary-color);
  }

  .tab[active] {
    background-color: var(--tab-active-background-color);
    color: var(--tab-active-text-color);
  }

  .tab-container:hover .tooltip,
  .tab-container:focus-within .tooltip {
    visibility: visible;
    opacity: 1;
    transition-delay: 0.3s;
  }

  /* Tooltip */
  .tooltip {
    visibility: hidden;
    background-color: var(--tooltip-background-color);
    color: var(--tooltip-text-color);
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
    opacity: 0;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  .languages-toolbar {
    display: flex;
    gap: 2px;
    position: relative;
  }

  .dropdown-container {
    position: relative;
  }

  /* Dropdown */
  .dropdown-button {
    border-radius: var(--dropdown-button-border-radius)
      var(--dropdown-button-border-radius) 0 0;
    padding: var(--dropdown-button-padding);
    background-color: var(--dropdown-button-background-color);
    color: var(--dropdown-button-text-color);
    margin-left: 20px;
    cursor: pointer;
    font-size: var(--dropdown-button-font-size);
    outline: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .dropdown-button:hover {
    background-color: var(--dropdown-button-hover-background-color);
  }

  .dropdown-button-language {
    border-radius: var(--dropdown-button-border-radius)
      var(--dropdown-button-border-radius) 0 0;
    padding: var(--dropdown-button-padding);
    background-color: var(--dropdown-button-background-color);
    color: var(--dropdown-button-text-color);
    cursor: pointer;
    font-size: var(--dropdown-button-font-size);
    outline: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .dropdown-button-language:hover {
    background-color: var(--dropdown-button-hover-background-color);
  }

  .arrow {
    display: inline-block;
    margin-left: 8px;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    transition: transform 0.3s ease;
  }

  .arrow.down {
    border-top: 6px solid var(--dropdown-button-text-color);
  }

  .arrow.up {
    border-bottom: 6px solid var(--dropdown-button-text-color);
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--dropdown-menu-background-color);
    border: 1px solid var(--dropdown-menu-border-color);
    border-radius: var(--dropdown-menu-border-radius);
    box-shadow: var(--dropdown-menu-shadow);
    padding: var(--dropdown-menu-padding);
    z-index: var(--dropdown-menu-z-index);
    min-width: 100%;
    margin-top: 4px;
  }

  .dropdown-menu li {
    list-style: none;
  }

  .dropdown-menu button {
    background: none;
    border: none;
    padding: var(--dropdown-menu-button-padding);
    text-align: left;
    width: 100%;
    cursor: pointer;
    font-size: var(--dropdown-menu-font-size);
    color: var(--dropdown-menu-text-color);
    display: flex;
    justify-content: space-between;
  }

  .dropdown-menu button:hover {
    background-color: var(--dropdown-menu-hover-background-color);
  }

  .dropdown-menu button.selected {
    background-color: var(--dropdown-menu-selected-background-color);
    color: var(--dropdown-menu-selected-text-color);
  }

  .dropdown-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    z-index: 10;
  }

  .checkmark {
    color: var(--checkmark-color);
  }

  .languages-toolbar {
    background-color: transparent;
    box-shadow: none;
    position: absolute;
    top: -30px;
    left: 0;
    right: 0;
    z-index: 2;
  }
`;
