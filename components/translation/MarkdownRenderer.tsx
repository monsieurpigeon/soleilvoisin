import { ReactElement, ReactNode } from "react";

function renderInlineMarkdown(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts
    .filter((part) => part.length > 0)
    .map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={`strong-${index}`}>{part.slice(2, -2)}</strong>;
      }
      return <span key={`span-${index}`}>{part}</span>;
    });
}

export function renderMarkdown(markdown: string): ReactElement[] {
  const lines = markdown.split("\n");
  const elements: ReactElement[] = [];
  let paragraphBuffer: string[] = [];
  let listBuffer: string[] = [];
  let quoteBuffer: string[] = [];

  const flushParagraph = () => {
    if (paragraphBuffer.length === 0) return;
    elements.push(
      <p
        key={`p-${elements.length}`}
        className="mt-3 text-sm leading-6 text-zinc-200 sm:text-base sm:leading-7"
      >
        {renderInlineMarkdown(paragraphBuffer.join(" "))}
      </p>
    );
    paragraphBuffer = [];
  };

  const flushList = () => {
    if (listBuffer.length === 0) return;
    elements.push(
      <ul
        key={`ul-${elements.length}`}
        className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-6 text-zinc-200 sm:mt-4 sm:space-y-2 sm:text-base sm:leading-7"
      >
        {listBuffer.map((item, index) => (
          <li key={`${item}-${index}`}>{renderInlineMarkdown(item)}</li>
        ))}
      </ul>
    );
    listBuffer = [];
  };

  const flushQuote = () => {
    if (quoteBuffer.length === 0) return;
    elements.push(
      <blockquote
        key={`blockquote-${elements.length}`}
        className="mt-3 border-l-2 border-sky-400/70 pl-3 text-sm italic leading-6 text-zinc-200 sm:mt-4 sm:pl-4 sm:text-base sm:leading-7"
      >
        {quoteBuffer.map((item, index) => (
          <p key={`quote-${index}`} className={index === 0 ? "" : "mt-2"}>
            {renderInlineMarkdown(item)}
          </p>
        ))}
      </blockquote>
    );
    quoteBuffer = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line.length === 0) {
      flushParagraph();
      flushList();
      flushQuote();
      continue;
    }

    if (line.startsWith("# ")) {
      flushParagraph();
      flushList();
      flushQuote();
      elements.push(
        <h1 key={`h1-${elements.length}`} className="mt-2 text-xl font-bold leading-7 text-white sm:text-2xl">
          {renderInlineMarkdown(line.slice(2))}
        </h1>
      );
      continue;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      flushQuote();
      elements.push(
        <h2
          key={`h2-${elements.length}`}
          className="mt-5 text-base font-semibold leading-6 text-white sm:text-lg"
        >
          {renderInlineMarkdown(line.slice(3))}
        </h2>
      );
      continue;
    }

    if (line === "---") {
      flushParagraph();
      flushList();
      flushQuote();
      elements.push(<hr key={`hr-${elements.length}`} className="my-4 border-zinc-700 sm:my-6" />);
      continue;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      flushQuote();
      listBuffer.push(line.slice(2));
      continue;
    }

    if (line.startsWith("> ")) {
      flushParagraph();
      flushList();
      quoteBuffer.push(line.slice(2));
      continue;
    }

    flushQuote();
    flushList();
    paragraphBuffer.push(line);
  }

  flushParagraph();
  flushList();
  flushQuote();

  return elements;
}
