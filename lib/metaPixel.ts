import { META_PIXEL_ID } from "@/lib/site";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export const FB_PIXEL_ID = META_PIXEL_ID;

export function pageview() {
  window.fbq?.("track", "PageView");
}
