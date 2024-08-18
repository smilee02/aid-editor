import { html, fixture, expect } from "@open-wc/testing";
import "./writer-component";
import Writer from "./writer-component";
import { ToolbarComponent } from "../toolbar/toolbar-component";
import WriteArticleService from "../../services/write-article-service";
import sinon, { SinonStub } from "sinon";

describe("<writer-assistant>", () => {
  let element: Writer;

  beforeEach(async () => {
    element = await fixture(html`<writer-assistant></writer-assistant>`);
    await element.updateComplete;
  });

  it("should render the assistant button", async () => {
    const button = element.shadowRoot!.querySelector("button");
    expect(button).to.exist;
    expect(button!.textContent?.trim()).to.equal("Assistant");

    await expect(button).to.be.accessible();
  });

  it("should render overlay when button clicked", async () => {
    const button = element.shadowRoot!.querySelector("button");
    expect(button).to.exist;

    button!.click();
    await element.updateComplete;

    expect(element.overlayVisible).to.be.true;

    const overlay = element.shadowRoot!.querySelector(".overlay");
    expect(overlay).to.exist;

    await expect(overlay).to.be.accessible();
  });
});

describe("<writer-assistant> with overlay visible", () => {
  let element: Writer;

  beforeEach(async () => {
    element = await fixture(
      html`<writer-assistant .overlayVisible=${true}></writer-assistant>`
    );
    await element.updateComplete;
  });

  it("should have the overlay visible initially", async () => {
    expect(element.overlayVisible).to.be.true;

    const overlay = element.shadowRoot!.querySelector(".overlay");
    expect(overlay).to.exist;

    await expect(overlay).to.be.accessible();
  });

  it("should have the editor", async () => {
    const editor = element.shadowRoot!.querySelector(".editor");

    expect(editor).to.exist;
    await expect(editor).to.be.accessible();
  });

  it("should have the toolbar in the editor", async () => {
    const toolbar = element.shadowRoot!.querySelector("toolbar-component");

    expect(toolbar).to.exist;
    await expect(toolbar).to.be.accessible();
  });

  it("should have the textarea in the editor", async () => {
    const textarea = element.shadowRoot!.querySelector("#text-area-generated");

    expect(textarea).to.exist;
    await expect(textarea).to.be.accessible();
  });
});

describe("<writer-assistant> toolbar", () => {
  let element: Writer;
  let toolbar: ToolbarComponent;

  beforeEach(async () => {
    element = await fixture(
      html`<writer-assistant .overlayVisible=${true}></writer-assistant>`
    );
    await element.updateComplete;
    toolbar = element.shadowRoot!.querySelector("toolbar-component")!;
  });

  it("should open theme overlay", async () => {
    const articleButton = toolbar.shadowRoot!.querySelector(
      ".article-writer"
    ) as HTMLButtonElement;
    expect(articleButton).to.exist;

    articleButton!.click();
    await element.updateComplete;

    expect(element.themeOverlayVisible).to.be.true;

    const themeOverlay = element.shadowRoot!.querySelector(".theme-overlay");
    expect(themeOverlay).to.exist;

    await expect(themeOverlay).to.be.accessible();
  });

  it("should close editor overlay", async () => {
    const closeButton = toolbar.shadowRoot!.querySelector(
      ".close-button"
    ) as HTMLButtonElement;
    expect(closeButton).to.exist;

    closeButton!.click();
    await element.updateComplete;

    expect(element.overlayVisible).to.be.false;

    const overlay = element.shadowRoot!.querySelector(".overlay");
    expect(overlay).to.not.exist;
  });

  it("should have components of theme overlay", async () => {
    const articleButton = toolbar.shadowRoot!.querySelector(
      ".article-writer"
    ) as HTMLButtonElement;
    expect(articleButton).to.exist;

    articleButton!.click();
    await element.updateComplete;

    expect(element.themeOverlayVisible).to.be.true;

    const themeOverlay = element.shadowRoot!.querySelector(".theme-overlay");
    expect(themeOverlay).to.exist;

    const title = element.shadowRoot!.querySelector(".theme-title");
    expect(title).to.exist;
    expect(title?.textContent).to.equal("Theme for article");

    const input = element.shadowRoot!.querySelector(
      "#article-theme"
    ) as HTMLInputElement;
    expect(input).to.exist;
    expect(input?.value).to.equal("");
    expect(input?.placeholder).to.equal("Write about...");

    const button = element.shadowRoot?.querySelector(".theme-button");
    expect(button).to.exist;
    expect(button?.textContent?.trim()).to.equal("Generate");
  });
});

describe("<writer-assistant> functionalities", () => {
  let element: Writer;
  let toolbar: ToolbarComponent;
  let sendRequestStub: SinonStub;

  before(async () => {
    sendRequestStub = sinon.stub(
      WriteArticleService.prototype,
      <any>"sendRequest"
    );

    sendRequestStub.callsFake((prompt) => {
      return prompt;
    });

    element = await fixture(
      html`<writer-assistant .overlayVisible=${true}></writer-assistant>`
    );

    await element.updateComplete;

    toolbar = element.shadowRoot!.querySelector("toolbar-component")!;
  });

  it("should write article", async () => {
    const articleButton = toolbar.shadowRoot!.querySelector(
      ".article-writer"
    ) as HTMLButtonElement;
    expect(articleButton).to.exist;

    articleButton!.click();
    await element.updateComplete;

    const themeOverlay = element.shadowRoot!.querySelector(".theme-overlay");
    expect(themeOverlay).to.exist;

    const input = element.shadowRoot!.querySelector(
      "#article-theme"
    ) as HTMLInputElement;
    input!.value = "Test Article";
    input!.dispatchEvent(new Event("input"));

    const generateButton = element.shadowRoot?.querySelector(
      ".theme-button"
    ) as HTMLButtonElement;
    generateButton.click();

    await element.updateComplete;

    expect(element.generatedTextArea!.value).to.equal(
      "Write me an article about Test Article in formal writing style in en-US"
    );

    expect(element.themeOverlayVisible).to.be.true;

    sendRequestStub.restore();
  });

  it("should expand article", async () => {
    element.generatedTextArea!.value = "This is some content";

    await element.updateComplete;
    element.generatedTextArea?.select();
    await element.updateComplete;

    const expandButton = toolbar.shadowRoot!.querySelector(
      ".expand-content"
    ) as HTMLButtonElement;
    expect(expandButton).to.exist;

    expandButton!.click();

    await element.updateComplete;

    //Click modal OK

    /*
    const modal = element.shadowRoot!.querySelector(
      "modal-component"
    )! as ModalComponent;

    console.log(modal.open);

    const confirmButton = modal.shadowRoot!.querySelector(
      ".confirm"
    ) as HTMLButtonElement;

    expect(confirmButton).to.exist;

    confirmButton!.click();

    await element.updateComplete;

    sendRequestStub.restore();
    */
    //TODO Mock service
  });

  it("should shorten article", async () => {
    const shortenButton = toolbar.shadowRoot!.querySelector(
      ".shorten-content"
    ) as HTMLButtonElement;
    expect(shortenButton).to.exist;

    shortenButton!.click();

    //TODO Mock service
  });
});

//Check modals appear
