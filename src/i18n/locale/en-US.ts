import { Phrases } from "../index";

const enUS: Phrases = {
  writer: {
    buttons: {
      assistant: "Assistant",
      generate: "Generate",
    },
    overlays: {
      themeTitle: "Theme for article",
      themePlaceholder: "Write about...",
      generatedTextPlaceholder: "Generated text...",
    },
  },
  toolbar: {
    writingStyles: {
      formal: "Formal",
      casual: "Casual",
      scientific: "Scientific",
    },
    tooltips: {
      writingStyle: "Writing style",
      createArticle: "Write a new article",
      expandContent: "Expand the selected content",
      shortenContent: "Shorten the selected content",
    },
    tabs: {
      createArticle: "Write",
      shortenContent: "Shorten",
      expandContent: "Expand",
    },
    languages: {
      "en-US": "English (US)",
      "pt-PT": "Portuguese",
    },
  },
  modal: {
    messages: {
      alert: {
        selectText: "Please select text to rewrite.",
        emptyInputThemeField:
          "Input field is empty. It's not possible to send an empty theme.",
      },
      confirm: {
        overwriteSelectedText: "Do you want to overwrite the selected text?",
        overwriteExistingText: "Do you want to overwrite the existing text?",
      },
    },
    buttons: {
      ok: "Ok",
      cancel: "Cancel",
    },
  },
};

export default enUS;
