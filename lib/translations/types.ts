export type TranslationLanguage = {
  code: string;
  label: string;
  file: string;
};

export type TranslationDocument = {
  slug: string;
  title: string;
  description: string;
  defaultLanguage: string;
  languages: TranslationLanguage[];
};
