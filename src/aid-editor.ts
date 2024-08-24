import WriterComponent from "./components/writer/writer-component";

export * from "./components/writer/writer-component";

export default WriterComponent;

customElements.define("aid-editor", WriterComponent);

declare global {
  interface HTMLElementTagNameMap {
    "aid-editor": WriterComponent;
  }
}
