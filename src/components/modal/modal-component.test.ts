import { html, fixture } from "@open-wc/testing";
import "./modal-component";
import { ModalComponent } from "./modal-component";

describe("<modal-component> render items", () => {
  let element: ModalComponent;

  beforeEach(async () => {
    element = await fixture(
      html`<modal-component
        .open=${true}
        .type=${"alert"}
        .message=${"No text selected"}
      ></modal-component>`
    );

    await element.updateComplete;
  });
  /*
  it("should render the paragraph", () => {
    const text = element.shadowRoot!.querySelector("p");

    expect(text).to.exist;
    expect(text).to.be.equal("No text selected");
  });
  it("should render the OK button", () => {
    const button = element.shadowRoot!.querySelector(
      "button .confirm"
    ) as HTMLButtonElement;

    expect(button).to.exist;
    expect(button!.textContent?.trim()).to.equal("Ok");
  });*/

  beforeEach(async () => {
    element = await fixture(
      html`<modal-component
        .open=${true}
        .type=${"confirm"}
        .message=${"Can the text be overwritten"}
      ></modal-component>`
    );
    await element.updateComplete;
  });

  it("should render the paragraph", () => {});
  it("should render the OK button", () => {});
  it("should render the Cancel button", () => {});
});

describe("<modal-component> click items", () => {
  let element: ModalComponent;

  before(async () => {
    element = await fixture(
      html`<modal-component
        .open=${true}
        .type=${"alert"}
        .message=${"No text selected"}
      ></modal-component>`
    );
    await element.updateComplete;
  });

  it("should close the modal", () => {});

  before(async () => {
    element = await fixture(
      html`<modal-component
        .open=${true}
        .type=${"confirm"}
        .message=${"Can the text be overwritten"}
      ></modal-component>`
    );
    await element.updateComplete;
  });

  it("should click ok close modal and value be true", () => {});
  it("should click cancel close modal and value be false", () => {});
});

//Render
//Interactivity buttons
//Display messages
//Accessibility
