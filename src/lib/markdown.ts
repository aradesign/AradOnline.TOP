export function renderMarkdown(content: string): string {
  const lines = content.split("\n");
  const html: string[] = [];
  let inList = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
      continue;
    }

    if (trimmed.startsWith("## ")) {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
      html.push(`<h2 class="text-xl font-bold text-slate-dark mt-8 mb-3">${trimmed.slice(3)}</h2>`);
    } else if (trimmed.startsWith("- ")) {
      if (!inList) {
        html.push('<ul class="list-disc list-inside space-y-2 text-slate-muted mb-4">');
        inList = true;
      }
      html.push(`<li>${trimmed.slice(2)}</li>`);
    } else {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
      html.push(`<p class="leading-relaxed text-slate-muted mb-4">${trimmed}</p>`);
    }
  }

  if (inList) html.push("</ul>");
  return html.join("\n");
}
