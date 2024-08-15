import { Phrases } from "../index";

const ptPT: Phrases = {
  writer: {
    buttons: {
      assistant: "Assistente",
      generate: "Criar",
    },
    overlays: {
      themeTitle: "Tema para o artigo",
      themePlaceholder: "Escreve sobre...",
      generatedTextPlaceholder: "Texto escrito...",
    },
  },
  toolbar: {
    writingStyles: {
      formal: "Formal",
      casual: "Casual",
      scientific: "Científico",
    },
    tooltips: {
      writingStyle: "Estilo de escrita",
      createArticle: "Criar um novo artigo",
      expandContent: "Expandir o conteúdo selecionado",
      shortenContent: "Resumir o conteúdo selecionado",
    },
  },
  modal: {
    messages: {
      alert: {
        selectText: "Por favor, selecione o texto para reescrever.",
        emptyInputThemeField:
          "O campo de entrada está vazio. Não é possível enviar um tema vazio.",
      },
      confirm: {
        overwriteSelectedText: "Deseja substituir o texto selecionado?",
        overwriteExistingText: "Deseja substituir o texto existente?",
      },
    },
    buttons: {
      ok: "Ok",
      cancel: "Cancelar",
    },
  },
};

export default ptPT;
