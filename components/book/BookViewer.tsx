"use client";

import { BOOK_PDF_DRIVE_URL, BOOK_PDF_META_URL } from "@/lib/book/constants";
import { getBookPdfUrl } from "@/lib/book/pdf-cache";
import {
  getDocument,
  GlobalWorkerOptions,
  type PDFDocumentProxy,
} from "pdfjs-dist";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

type Spread = {
  left: number | null;
  right: number | null;
};

function getSpreads(totalPages: number): Spread[] {
  if (totalPages <= 0) return [];

  const spreads: Spread[] = [{ left: null, right: 1 }];

  for (let left = 2; left <= totalPages; left += 2) {
    spreads.push({
      left,
      right: left + 1 <= totalPages ? left + 1 : null,
    });
  }

  return spreads;
}

function getSpreadIndexForPage(page: number, spreads: Spread[]): number {
  const index = spreads.findIndex(
    (spread) => spread.left === page || spread.right === page,
  );
  return index >= 0 ? index : 0;
}

function spreadLabel(spread: Spread): string {
  if (spread.left === null && spread.right !== null) return "Couverture";
  if (spread.left !== null && spread.right !== null) {
    return `Pages ${spread.left}–${spread.right}`;
  }
  if (spread.left !== null) return `Page ${spread.left}`;
  return "";
}

type BookPageProps = {
  pageNumber: number | null;
  pdf: PDFDocumentProxy;
  pdfVersion: string;
  onZoom: (pageNumber: number) => void;
  cache: Map<string, string>;
};

function BookPage({ pageNumber, pdf, pdfVersion, onZoom, cache }: BookPageProps) {
  const cellRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rendering, setRendering] = useState(false);

  useEffect(() => {
    if (!pageNumber || !cellRef.current || !canvasRef.current) return;

    let cancelled = false;

    async function render() {
      const cell = cellRef.current;
      const canvas = canvasRef.current;
      if (!cell || !canvas || !pageNumber) return;

      const maxWidth = cell.clientWidth;
      const maxHeight = cell.clientHeight;
      if (maxWidth <= 0 || maxHeight <= 0) return;

      const cacheKey = `${pdfVersion}-${pageNumber}-${maxWidth}x${maxHeight}`;
      const cached = cache.get(cacheKey);
      if (cached) {
        const img = new Image();
        img.onload = () => {
          if (!canvasRef.current || cancelled) return;
          const ctx = canvasRef.current.getContext("2d");
          if (!ctx) return;
          canvasRef.current.width = img.width;
          canvasRef.current.height = img.height;
          ctx.drawImage(img, 0, 0);
          if (!cancelled) setRendering(false);
        };
        img.src = cached;
        return;
      }

      setRendering(true);

      try {
        const page = await pdf.getPage(pageNumber);
        const baseViewport = page.getViewport({ scale: 1 });
        const scale = Math.min(
          maxWidth / baseViewport.width,
          maxHeight / baseViewport.height,
        );
        const viewport = page.getViewport({ scale });

        if (!canvasRef.current || cancelled) return;

        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        canvasRef.current.width = viewport.width;
        canvasRef.current.height = viewport.height;

        await page.render({
          canvas: canvasRef.current,
          canvasContext: ctx,
          viewport,
        }).promise;

        if (!cancelled) {
          cache.set(cacheKey, canvasRef.current.toDataURL("image/jpeg", 0.92));
        }
      } finally {
        if (!cancelled) setRendering(false);
      }
    }

    const observer = new ResizeObserver(() => {
      void render();
    });

    observer.observe(cellRef.current);
    void render();

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [pageNumber, pdf, pdfVersion, cache]);

  return (
    <div
      ref={cellRef}
      className="flex min-h-0 min-w-0 flex-1 items-center justify-center bg-[#120e0b]"
    >
      {pageNumber ? (
        <button
          type="button"
          onClick={() => onZoom(pageNumber)}
          aria-label={`Agrandir la page ${pageNumber}`}
          className="flex h-full w-full cursor-pointer items-center justify-center p-2 transition hover:brightness-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50"
        >
          <canvas
            ref={canvasRef}
            className={`max-h-full max-w-full object-contain bg-[#f4efe6] shadow-sm ${rendering ? "opacity-40" : "opacity-100"} transition-opacity`}
          />
        </button>
      ) : null}
    </div>
  );
}

function NavButton({
  direction,
  disabled,
  onClick,
  label,
}: {
  direction: "left" | "right";
  disabled: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="cursor-pointer rounded-full border border-zinc-700/80 bg-zinc-900/90 p-2.5 text-zinc-300 transition hover:border-amber-400/40 hover:text-amber-100 disabled:cursor-not-allowed disabled:opacity-30"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path
          d={direction === "left" ? "M12.5 4.5L7 10l5.5 5.5" : "M7.5 4.5L13 10l-5.5 5.5"}
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

type ZoomPhase =
  | "enter-initial"
  | "enter-forward"
  | "enter-backward"
  | "exit-forward"
  | "exit-backward"
  | "idle";

const MAGNIFIER_BASE_WIDTH = 350;
const MAGNIFIER_BASE_HEIGHT = 140;
const MAGNIFIER_MAX_WIDTH = 500;
const MAGNIFIER_MAX_HEIGHT = 194;
const MAGNIFIER_VIEWPORT_PADDING = 8;

function getMagnifierSize(zoomLevel: number) {
  const progress =
    (zoomLevel - MIN_MAGNIFIER_ZOOM) / (MAX_MAGNIFIER_ZOOM - MIN_MAGNIFIER_ZOOM);
  const t = Math.max(0, Math.min(1, progress));

  return {
    width: Math.round(
      MAGNIFIER_BASE_WIDTH + t * (MAGNIFIER_MAX_WIDTH - MAGNIFIER_BASE_WIDTH),
    ),
    height: Math.round(
      MAGNIFIER_BASE_HEIGHT + t * (MAGNIFIER_MAX_HEIGHT - MAGNIFIER_BASE_HEIGHT),
    ),
  };
}

function getMagnifierViewportPosition(
  clientX: number,
  clientY: number,
  width: number,
  height: number,
) {
  let left = clientX - width / 2;
  let top = clientY - height / 2;

  const maxLeft = window.innerWidth - width - MAGNIFIER_VIEWPORT_PADDING;
  const maxTop = window.innerHeight - height - MAGNIFIER_VIEWPORT_PADDING;

  left = Math.max(MAGNIFIER_VIEWPORT_PADDING, Math.min(maxLeft, left));
  top = Math.max(MAGNIFIER_VIEWPORT_PADDING, Math.min(maxTop, top));

  return { left, top };
}

type MagnifierState = {
  clientX: number;
  clientY: number;
  left: number;
  top: number;
};

type PageZoomOverlayProps = {
  pageNumber: number;
  totalPages: number;
  pdf: PDFDocumentProxy;
  pdfVersion: string;
  onClose: (page: number) => void;
  onPageChange: (page: number) => void;
  cache: Map<string, string>;
};

const MIN_MAGNIFIER_ZOOM = 1.4;
const MAX_MAGNIFIER_ZOOM = 5.5;
const DEFAULT_MAGNIFIER_ZOOM = 2.4;

function PageZoomOverlay({
  pageNumber,
  totalPages,
  pdf,
  pdfVersion,
  onClose,
  onPageChange,
  cache,
}: PageZoomOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const magnifierCanvasRef = useRef<HTMLCanvasElement>(null);
  const pageWrapperRef = useRef<HTMLDivElement>(null);
  const [rendering, setRendering] = useState(true);
  const [displayPage, setDisplayPage] = useState(pageNumber);
  const [phase, setPhase] = useState<ZoomPhase>("enter-initial");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [magnifier, setMagnifier] = useState<MagnifierState | null>(null);
  const [magnifierZoom, setMagnifierZoom] = useState(DEFAULT_MAGNIFIER_ZOOM);
  const [isReadingHover, setIsReadingHover] = useState(false);
  const [clickZone, setClickZone] = useState<"left" | "right" | null>(null);
  const lastPointerRef = useRef<MagnifierState | null>(null);
  const timersRef = useRef<number[]>([]);

  const showMagnifier =
    isReadingHover &&
    magnifier !== null &&
    !rendering &&
    !isTransitioning &&
    phase === "idle";

  const lensSize = getMagnifierSize(magnifierZoom);

  const updateMagnifier = useCallback(
    (clientX: number, clientY: number, zoomLevel: number) => {
      const canvas = canvasRef.current;
      const magnifierCanvas = magnifierCanvasRef.current;
      if (!canvas || !magnifierCanvas || canvas.width === 0) return;

      const { width: lensWidth, height: lensHeight } =
        getMagnifierSize(zoomLevel);

      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        setMagnifier(null);
        return;
      }

      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const cx = x * scaleX;
      const cy = y * scaleY;

      const sourceW = (lensWidth / zoomLevel) * scaleX;
      const sourceH = (lensHeight / zoomLevel) * scaleY;
      const sx = Math.max(0, Math.min(canvas.width - sourceW, cx - sourceW / 2));
      const sy = Math.max(0, Math.min(canvas.height - sourceH, cy - sourceH / 2));

      if (
        magnifierCanvas.width !== lensWidth ||
        magnifierCanvas.height !== lensHeight
      ) {
        magnifierCanvas.width = lensWidth;
        magnifierCanvas.height = lensHeight;
      }

      const ctx = magnifierCanvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, lensWidth, lensHeight);
      ctx.drawImage(
        canvas,
        sx,
        sy,
        sourceW,
        sourceH,
        0,
        0,
        lensWidth,
        lensHeight,
      );

      const { left, top } = getMagnifierViewportPosition(
        clientX,
        clientY,
        lensWidth,
        lensHeight,
      );
      const next = { clientX, clientY, left, top };
      lastPointerRef.current = next;
      setMagnifier(next);
    },
    [],
  );

  const canGoPrev = displayPage > 1;
  const canGoNext = displayPage < totalPages;

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, delay: number) => {
    const id = window.setTimeout(fn, delay);
    timersRef.current.push(id);
  }, []);

  const navigateTo = useCallback(
    (nextPage: number) => {
      if (isTransitioning || nextPage === displayPage) return;
      if (nextPage < 1 || nextPage > totalPages) return;

      const goingForward = nextPage > displayPage;
      clearTimers();
      setIsTransitioning(true);
      setPhase(goingForward ? "exit-forward" : "exit-backward");
      setMagnifier(null);

      schedule(() => {
        setDisplayPage(nextPage);
        onPageChange(nextPage);
        setPhase(goingForward ? "enter-forward" : "enter-backward");

        schedule(() => {
          setPhase("idle");
          setIsTransitioning(false);
        }, 720);
      }, 300);
    },
    [
      clearTimers,
      displayPage,
      isTransitioning,
      onPageChange,
      schedule,
      totalPages,
    ],
  );

  const goPrev = useCallback(() => {
    if (canGoPrev) navigateTo(displayPage - 1);
  }, [canGoPrev, displayPage, navigateTo]);

  const goNext = useCallback(() => {
    if (canGoNext) navigateTo(displayPage + 1);
  }, [canGoNext, displayPage, navigateTo]);

  const handlePageClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (isTransitioning) return;

      const rect = pageWrapperRef.current?.getBoundingClientRect();
      if (!rect) return;

      const isLeftHalf = event.clientX < rect.left + rect.width / 2;

      setMagnifier(null);

      if (isLeftHalf) {
        if (canGoPrev) goPrev();
      } else if (canGoNext) {
        goNext();
      }
    },
    [canGoNext, canGoPrev, goNext, goPrev, isTransitioning],
  );

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    schedule(() => setPhase("idle"), 720);

    return () => {
      document.body.style.overflow = previousOverflow;
      clearTimers();
    };
  }, [clearTimers, schedule]);

  useEffect(() => {
    if (pageNumber !== displayPage && !isTransitioning) {
      setDisplayPage(pageNumber);
    }
  }, [displayPage, isTransitioning, pageNumber]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose(displayPage);
      }
      if (isTransitioning) return;
      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        goPrev();
      }
      if (event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        goNext();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [displayPage, goNext, goPrev, isTransitioning, onClose]);

  useEffect(() => {
    let cancelled = false;

    async function renderPage() {
      setRendering(true);

      const maxHeight = window.innerHeight;
      const maxWidth = window.innerWidth;
      const cacheKey = `${pdfVersion}-${displayPage}-zoom-${maxWidth}x${maxHeight}`;

      const cached = cache.get(cacheKey);
      if (cached && canvasRef.current) {
        const img = new Image();
        img.onload = () => {
          const canvas = canvasRef.current;
          if (!canvas || cancelled) return;
          const ctx = canvas.getContext("2d");
          if (!ctx) return;
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          if (!cancelled) setRendering(false);
        };
        img.src = cached;
        return;
      }

      try {
        const page = await pdf.getPage(displayPage);
        const baseViewport = page.getViewport({ scale: 1 });

        let scale = maxHeight / baseViewport.height;
        if (baseViewport.width * scale > maxWidth) {
          scale = maxWidth / baseViewport.width;
        }

        const viewport = page.getViewport({ scale });

        const canvas = canvasRef.current;
        if (!canvas || cancelled) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvas, canvasContext: ctx, viewport }).promise;

        if (!cancelled) {
          cache.set(cacheKey, canvas.toDataURL("image/jpeg", 0.95));
          setRendering(false);
        }
      } catch {
        if (!cancelled) setRendering(false);
      }
    }

    void renderPage();

    window.addEventListener("resize", renderPage);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", renderPage);
    };
  }, [displayPage, pdf, pdfVersion, cache]);

  useEffect(() => {
    if (
      isTransitioning ||
      phase !== "idle" ||
      rendering ||
      !isReadingHover ||
      !lastPointerRef.current
    ) {
      return;
    }

    const { clientX, clientY } = lastPointerRef.current;
    updateMagnifier(clientX, clientY, magnifierZoom);
  }, [
    isReadingHover,
    isTransitioning,
    magnifierZoom,
    phase,
    rendering,
    updateMagnifier,
  ]);

  const motionClass: Record<ZoomPhase, string> = {
    "enter-initial": "zoom-enter-initial",
    "enter-forward": "zoom-enter-forward",
    "enter-backward": "zoom-enter-backward",
    "exit-forward": "zoom-exit-forward",
    "exit-backward": "zoom-exit-backward",
    idle: "",
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#030510]"
      role="dialog"
      aria-modal="true"
      aria-label={`Page ${displayPage} en grand`}
    >
      <div
        className="relative flex h-svh w-full"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          ref={pageWrapperRef}
          role="button"
          tabIndex={0}
          aria-label="Clic gauche page précédente, clic droit page suivante"
          className={`relative flex h-full w-full items-stretch justify-center ${
            showMagnifier
              ? "cursor-none"
              : isTransitioning
                ? "cursor-default"
                : clickZone === "left" && canGoPrev
                  ? "cursor-w-resize"
                  : clickZone === "right" && canGoNext
                    ? "cursor-e-resize"
                    : "cursor-default"
          }`}
          onClick={handlePageClick}
          onMouseEnter={() => setIsReadingHover(true)}
          onMouseMove={(event) => {
            const rect = pageWrapperRef.current?.getBoundingClientRect();
            if (rect) {
              setClickZone(
                event.clientX < rect.left + rect.width / 2 ? "left" : "right",
              );
            }
            updateMagnifier(event.clientX, event.clientY, magnifierZoom);
          }}
          onMouseLeave={() => {
            setIsReadingHover(false);
            setClickZone(null);
            setMagnifier(null);
            lastPointerRef.current = null;
          }}
          onWheel={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setMagnifierZoom((current) => {
              const next = Math.max(
                MIN_MAGNIFIER_ZOOM,
                Math.min(MAX_MAGNIFIER_ZOOM, current - event.deltaY * 0.004),
              );
              if (lastPointerRef.current) {
                window.requestAnimationFrame(() => {
                  updateMagnifier(
                    lastPointerRef.current!.clientX,
                    lastPointerRef.current!.clientY,
                    next,
                  );
                });
              }
              return next;
            });
          }}
        >
          <div
            className={`flex h-full items-stretch justify-center ${motionClass[phase]}`}
          >
            <canvas
              ref={canvasRef}
              className={`block h-full w-auto max-w-full bg-[#f4efe6] ${rendering ? "opacity-50" : "opacity-100"} transition-opacity duration-200`}
            />
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-20 bg-gradient-to-b from-black/75 via-black/35 to-transparent px-4 pb-10 pt-4 sm:px-6"
          aria-hidden
        />

        <button
          type="button"
          onClick={() => onClose(displayPage)}
          aria-label="Fermer le zoom"
          className="absolute right-4 top-4 z-30 cursor-pointer rounded-full border border-zinc-600/90 bg-zinc-900/90 px-3.5 py-1.5 text-xs font-medium text-zinc-200 backdrop-blur-sm transition hover:border-amber-400/40 hover:text-amber-100 sm:right-6"
        >
          Fermer
        </button>



        <div className="absolute left-3 top-1/2 z-30 -translate-y-1/2 sm:left-5">
          <NavButton
            direction="left"
            disabled={!canGoPrev || isTransitioning}
            onClick={goPrev}
            label="Page précédente"
          />
        </div>

        <div className="absolute right-3 top-1/2 z-30 -translate-y-1/2 sm:right-5">
          <NavButton
            direction="right"
            disabled={!canGoNext || isTransitioning}
            onClick={goNext}
            label="Page suivante"
          />
        </div>


      </div>

      {createPortal(
        <div
          className={`pointer-events-none fixed z-[70] overflow-hidden rounded-2xl bg-[#f4efe6] transition-[opacity,width,height] duration-150 ease-out ${showMagnifier ? "opacity-100" : "opacity-0"
            }`}
          style={{
            width: lensSize.width,
            height: lensSize.height,
            left: magnifier?.left ?? 0,
            top: magnifier?.top ?? 0,
            visibility: showMagnifier ? "visible" : "hidden",
          }}
          aria-hidden
        >
          <div className="magnifier-lens-mask relative h-full w-full">
            <canvas
              ref={magnifierCanvasRef}
              width={lensSize.width}
              height={lensSize.height}
              className="block h-full w-full"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-2xl" aria-hidden>
            <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-amber-400/75 via-amber-300/25 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-amber-400/75 via-amber-300/25 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-amber-400/65 via-amber-300/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-amber-400/65 via-amber-300/20 to-transparent" />
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}

export function BookViewer() {
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [pdfVersion, setPdfVersion] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [zoomedPage, setZoomedPage] = useState<number | null>(null);
  const cacheRef = useRef(new Map<string, string>());
  const pdfVersionRef = useRef<string | null>(null);

  const loadPdfDocument = useCallback(async (version: string) => {
    const doc = await getDocument({ url: getBookPdfUrl(version) }).promise;
    cacheRef.current.clear();
    pdfVersionRef.current = version;
    setPdfVersion(version);
    setPdf(doc);
    setError(null);
    return doc;
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      try {
        const metaResponse = await fetch(BOOK_PDF_META_URL, { cache: "no-store" });
        if (!metaResponse.ok) throw new Error("meta");

        const { version } = (await metaResponse.json()) as { version: string };
        if (cancelled) return;

        await loadPdfDocument(version);
      } catch {
        if (!cancelled) {
          setError(
            "Le livre n'a pas pu être chargé. Vérifiez que le fichier est bien partagé sur Google Drive.",
          );
        }
      }
    }

    void bootstrap();

    return () => {
      cancelled = true;
    };
  }, [loadPdfDocument]);

  useEffect(() => {
    async function checkForUpdate() {
      if (document.visibilityState !== "visible") return;

      try {
        const metaResponse = await fetch(BOOK_PDF_META_URL, { cache: "no-store" });
        if (!metaResponse.ok) return;

        const { version } = (await metaResponse.json()) as { version: string };
        if (version === pdfVersionRef.current) return;

        await loadPdfDocument(version);
      } catch {
        // Ignore background refresh errors.
      }
    }

    function onVisibilityChange() {
      void checkForUpdate();
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [loadPdfDocument]);

  const spreads = pdf ? getSpreads(pdf.numPages) : [];
  const currentSpread = spreads[spreadIndex];
  const canGoBack = spreadIndex > 0;
  const canGoForward = spreadIndex < spreads.length - 1;

  const goBack = useCallback(() => {
    if (canGoBack) setSpreadIndex((index) => index - 1);
  }, [canGoBack]);

  const goForward = useCallback(() => {
    if (canGoForward) setSpreadIndex((index) => index + 1);
  }, [canGoForward]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (zoomedPage !== null) return;

      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        goBack();
      }
      if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
        event.preventDefault();
        goForward();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goBack, goForward, zoomedPage]);

  const handleCloseZoom = useCallback(
    (page: number) => {
      setSpreadIndex(getSpreadIndexForPage(page, spreads));
      setZoomedPage(null);
    },
    [spreads],
  );

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
        <p className="text-sm text-zinc-400">{error}</p>
        <a
          href={BOOK_PDF_DRIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer text-sm text-sky-400 underline-offset-2 hover:underline"
        >
          Ouvrir le PDF sur Google Drive
        </a>
      </div>
    );
  }

  if (!pdf || !pdfVersion || !currentSpread) {
    return (
      <div className="flex min-h-[40svh] items-center justify-center">
        <p className="animate-pulse font-mono text-xs uppercase tracking-[0.35em] text-zinc-500">
          Ouverture du livre…
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="flex items-stretch gap-2 sm:gap-3">
        <button
          type="button"
          onClick={goBack}
          disabled={!canGoBack}
          aria-label="Double page précédente"
          className="flex w-10 shrink-0 cursor-pointer items-center justify-center self-stretch rounded-lg border border-zinc-800/80 bg-[#1a1410] text-zinc-300 transition hover:border-amber-400/40 hover:bg-[#221a15] hover:text-amber-100 disabled:cursor-not-allowed disabled:opacity-30 sm:w-12"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path
              d="M12.5 4.5L7 10l5.5 5.5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="min-w-0 flex-1 overflow-hidden rounded-xl border border-zinc-800/80 bg-[#1a1410] p-3 sm:p-4">
          <div className="flex aspect-[3/2] w-full overflow-hidden rounded-lg bg-[#120e0b]">
            <BookPage
              pageNumber={currentSpread.left}
              pdf={pdf}
              pdfVersion={pdfVersion}
              onZoom={setZoomedPage}
              cache={cacheRef.current}
            />

            <div
              className="w-px shrink-0 bg-gradient-to-b from-zinc-800/20 via-zinc-700/50 to-zinc-800/20"
              aria-hidden
            />

            <BookPage
              pageNumber={currentSpread.right}
              pdf={pdf}
              pdfVersion={pdfVersion}
              onZoom={setZoomedPage}
              cache={cacheRef.current}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={goForward}
          disabled={!canGoForward}
          aria-label="Double page suivante"
          className="flex w-10 shrink-0 cursor-pointer items-center justify-center self-stretch rounded-lg border border-zinc-800/80 bg-[#1a1410] text-zinc-300 transition hover:border-amber-400/40 hover:bg-[#221a15] hover:text-amber-100 disabled:cursor-not-allowed disabled:opacity-30 sm:w-12"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path
              d="M7.5 4.5L13 10l-5.5 5.5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="mt-5 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
          {spreadLabel(currentSpread)}
        </p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
          {spreadIndex + 1} / {spreads.length}
        </p>
      </div>

      <p className="mt-3 text-center text-xs text-zinc-600">
        Clic sur une page pour agrandir · flèches ou Espace pour tourner
      </p>

      {zoomedPage !== null && (
        <PageZoomOverlay
          pageNumber={zoomedPage}
          totalPages={pdf.numPages}
          pdf={pdf}
          pdfVersion={pdfVersion}
          onClose={handleCloseZoom}
          onPageChange={setZoomedPage}
          cache={cacheRef.current}
        />
      )}
    </div>
  );
}
