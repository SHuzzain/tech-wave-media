import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function mediaFileName(url: string): string {
  const file = url.split("?")[0].split("/").pop() ?? "";
  return file.replace(/-\d+x\d+(?=\.\w+$)/, "");
}

/** Drop the first body image when it is the same file as the featured image. */
export function stripDuplicateFeaturedImage(
  html: string,
  featuredUrl?: string | null
): string {
  if (!html || !featuredUrl) return html;

  const featuredFile = mediaFileName(featuredUrl);
  const figure = html.match(
    /<figure\b[^>]*class="[^"]*wp-block-image[\s\S]*?<\/figure>/i
  );
  const first = figure?.[0] ?? html.match(/<img\b[^>]*>/i)?.[0];
  if (!first) return html;

  const src = first.match(/src=["']([^"']+)["']/i)?.[1];
  if (!src || mediaFileName(src) !== featuredFile) return html;

  return html.replace(first, "").replace(/^\s+/, "");
}
