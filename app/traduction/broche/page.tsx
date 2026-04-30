import { TranslationViewer } from "@/components/translation/TranslationViewer";
import { brocheTranslation } from "@/lib/translations/broche";

export default function BrocheTraductionPage() {
  return <TranslationViewer document={brocheTranslation} />;
}
