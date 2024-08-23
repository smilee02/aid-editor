import { html, fixture } from "@open-wc/testing";
import "./toolbar-component";
import { ToolbarComponent } from "./toolbar-component";

describe("<toolbar-component> render items", () => {
  let toolbar: ToolbarComponent;

  before(async () => {
    toolbar = await fixture(
      html`<toolbar-component .writingStyle=${"formal"}></toolbar-component>`
    );
    await toolbar.updateComplete;
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
