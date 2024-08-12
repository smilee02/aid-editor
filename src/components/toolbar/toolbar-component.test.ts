import { html, fixture } from "@open-wc/testing";
import "./toolbar-component";
import { ToolbarComponent } from "./toolbar-component";
import { expect } from "chai";

describe("<toolbar-component> render items", () => {
  let toolbar: ToolbarComponent;

  before(async () => {
    toolbar = await fixture(
      html`<toolbar-component .writingStyle=${"formal"}></toolbar-component>`
    );
    await toolbar.updateComplete;
  });

  it("should render the select element", () => {
    expect(toolbar).to.exist;

    const select = toolbar.shadowRoot!.querySelector("select");

    expect(select).to.exist;
    expect(select?.value).to.equal("formal");
  });
  it("should render the article button", () => {
    const articleButton = toolbar.shadowRoot!.querySelector(
      "button.article-writer"
    );

    expect(articleButton).to.exist;
    expect(articleButton?.textContent?.trim()).to.equal("📝");
  });
  it("should render the expand button", () => {
    const articleButton = toolbar.shadowRoot!.querySelector(
      "button.expand-content"
    );

    expect(articleButton).to.exist;
    expect(articleButton?.textContent?.trim()).to.equal("➕");
  });
  it("should render the shorten button", () => {
    const articleButton = toolbar.shadowRoot!.querySelector(
      "button.shorten-content"
    );

    expect(articleButton).to.exist;
    expect(articleButton?.textContent?.trim()).to.equal("➖");
  });
  it("should render the close button", () => {
    const articleButton = toolbar.shadowRoot!.querySelector(
      "button.close-button"
    );

    expect(articleButton).to.exist;
    expect(articleButton?.textContent?.trim()).to.equal("X");
  });
});

describe("<toolbar-component> select", () => {
  let toolbar: ToolbarComponent;

  before(async () => {
    toolbar = await fixture(
      html`<toolbar-component .writingStyle=${"formal"}></toolbar-component>`
    );
    await toolbar.updateComplete;
  });

  it("should change the value of select", () => {
    const select = toolbar.shadowRoot!.querySelector("select")!;

    expect(select).to.exist;
    expect(select.value).to.equal("formal");

    select.selectedIndex = 1;

    expect(select.value).to.equal("casual");

    select.selectedIndex = 2;

    expect(select.value).to.equal("scientific");
  });
});

describe("<toolbar-component> render hover items", () => {
  let toolbar: ToolbarComponent;

  before(async () => {
    toolbar = await fixture(
      html`<toolbar-component .writingStyle=${"formal"}></toolbar-component>`
    );
    await toolbar.updateComplete;
  });

  it("should render the hover select element", () => {});
  it("should render the hover article button", () => {});
  it("should render the hover expand button", () => {});
  it("should render the hover shorten button", () => {});
});

//Render
//Interactivity buttons
//Display modals
//Hover tooltip
