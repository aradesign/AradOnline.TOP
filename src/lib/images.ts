export function parseGalleryImages(raw: string | null | undefined): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((u): u is string => typeof u === "string" && u.startsWith("/uploads/"));
  } catch {
    return [];
  }
}

export function stringifyGalleryImages(urls: string[]): string {
  return JSON.stringify(urls.filter((u) => u.startsWith("/uploads/")));
}
