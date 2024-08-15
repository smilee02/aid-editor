import enUS from "./locale/en-US";
import ptPT from "./locale/pt-PT";

export type Phrases = {
  [key: string]: Phrases | string | undefined;
};

const phrases: { [key: string]: { translation: Phrases } } = {
  "en-US": { translation: enUS },
  "pt-PT": { translation: ptPT },
};

export default phrases;
