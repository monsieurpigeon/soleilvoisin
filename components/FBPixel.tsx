"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";
import * as pixel from "@/lib/metaPixel";

type FBPixelProps = {
  eventId?: string;
};

export function FBPixel({ eventId }: FBPixelProps) {
  const [loaded, setLoaded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!loaded) return;

    pixel.pageview();
  }, [loaded, pathname]);

  return (
    <Script
      id="fb-pixel"
      src="/scripts/pixel.js"
      strategy="afterInteractive"
      onLoad={() => setLoaded(true)}
      data-pixel-id={eventId ?? pixel.FB_PIXEL_ID}
    />
  );
}
