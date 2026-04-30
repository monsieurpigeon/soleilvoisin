import { TranslationDocument } from "./types";

export const brocheTranslation: TranslationDocument = {
  slug: "broche",
  title: "Discours de Guillaume BROCHE",
  description: "Choisis une langue pour afficher le texte associe.",
  defaultLanguage: "en",
  languages: [
    { code: "en", label: "English", file: "/translations/broche/english.md" },
    { code: "fr", label: "Francais", file: "/translations/broche/francais.md" },
    { code: "zh", label: "中文", file: "/translations/broche/chinois.md" },
  ],
};
