"use client";

import { useRef, useState, useCallback } from "react";

type FontState = {
  mode: "preset" | "custom";
  presetId: string;
  customFamilyName: string;
  customFileUrl: string;
};

type Props = {
  font: FontState;
  onChange: (font: FontState) => void;
};

function fontFormat(url: string): string {
  if (url.endsWith(".woff2")) return "woff2";
  if (url.endsWith(".woff")) return "woff";
  if (url.endsWith(".otf")) return "opentype";
  if (url.endsWith(".ttf")) return "truetype";
  return "woff2";
}

export function FontUploadZone({ font, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{
    type: "ok" | "err";
    text: string;
  } | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const uploadFile = useCallback(
    async (file: File) => {
      setMessage(null);
      setUploading(true);

      const ext = file.name.split(".").pop()?.toLowerCase();
      if (!ext || !["woff", "woff2", "ttf", "otf"].includes(ext)) {
        setMessage({
          type: "err",
          text: "فرمت مجاز: woff, woff2, ttf, otf",
        });
        setUploading(false);
        return;
      }

      const fd = new FormData();
      fd.append("file", file);

      try {
        const res = await fetch("/api/admin/upload-font", {
          method: "POST",
          body: fd,
          credentials: "same-origin",
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          setMessage({
            type: "err",
            text: data.error || `خطا در آپلود (${res.status})`,
          });
          return;
        }

        const family =
          font.customFamilyName ||
          data.suggestedFamily ||
          "AradCustom";

        onChange({
          mode: "custom",
          presetId: font.presetId,
          customFileUrl: data.url,
          customFamilyName: family.replace(/['"\\]/g, "").slice(0, 64),
        });

        setMessage({
          type: "ok",
          text: `فونت «${file.name}» آپلود شد. حتماً دکمه «ذخیره تنظیمات» را بزنید.`,
        });
      } catch {
        setMessage({ type: "err", text: "خطای شبکه — دوباره تلاش کنید" });
      } finally {
        setUploading(false);
        if (inputRef.current) inputRef.current.value = "";
      }
    },
    [font.customFamilyName, font.presetId, onChange]
  );

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onChange({ ...font, mode: "custom" });
      uploadFile(file);
    }
  }

  const previewFormat = font.customFileUrl
    ? fontFormat(font.customFileUrl)
    : "woff2";

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        id="font-upload-input"
        type="file"
        accept=".woff,.woff2,.ttf,.otf,font/woff,font/woff2,font/ttf,font/otf"
        onChange={onInputChange}
        className="sr-only"
      />

      <label
        htmlFor="font-upload-input"
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 transition-all ${
          dragOver
            ? "border-primary bg-primary/5"
            : "border-gray-300 bg-gray-50/80 hover:border-primary hover:bg-primary/5 dark:border-[rgba(0,255,200,0.3)] dark:bg-[rgba(0,255,200,0.05)]"
        } ${uploading ? "pointer-events-none opacity-60" : ""}`}
      >
        <svg
          className="h-10 w-10 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            d="M12 16V4m0 0l-4 4m4-4l4 4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="text-center">
          <p className="font-semibold text-slate-dark dark:text-[var(--color-text-dark)]">
            {uploading ? "در حال آپلود..." : "کلیک کنید یا فایل را اینجا رها کنید"}
          </p>
          <p className="mt-1 text-xs text-slate-muted">
            woff2 · woff · ttf · otf — حداکثر ۵ مگابایت
          </p>
        </div>
      </label>

      {message && (
        <p
          className={`rounded-lg px-4 py-3 text-sm ${
            message.type === "ok"
              ? "bg-green-50 text-green-800 dark:bg-green-950/50 dark:text-green-300"
              : "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300"
          }`}
        >
          {message.text}
        </p>
      )}

      {font.customFileUrl && (
        <div className="rounded-lg border border-green-200 bg-green-50/50 px-4 py-2 text-sm text-green-800 dark:border-green-800 dark:bg-green-950/30 dark:text-green-300">
          <span dir="ltr" className="font-mono text-xs">
            {font.customFileUrl}
          </span>
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-sm font-medium">نام خانواده فونت</label>
        <input
          value={font.customFamilyName}
          onChange={(e) =>
            onChange({ ...font, customFamilyName: e.target.value })
          }
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 outline-none focus:border-primary dark:border-[rgba(0,255,200,0.2)] dark:bg-[var(--color-surface)]"
          placeholder="AradCustom"
          dir="ltr"
        />
      </div>

      {font.customFileUrl && (
        <div
          className="rounded-xl border border-gray-100 bg-white p-5 text-lg dark:border-[rgba(0,255,200,0.15)] dark:bg-[var(--color-surface)]"
          style={{
            fontFamily: `'${font.customFamilyName || "AradCustom"}', sans-serif`,
          }}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `@font-face {
                font-family: '${font.customFamilyName || "AradCustom"}';
                src: url('${font.customFileUrl}') format('${previewFormat}');
                font-display: swap;
              }`,
            }}
          />
          پیش‌نمایش: سایت‌هایی که قطعی اینترنت هم نمی‌بنددشان
        </div>
      )}
    </div>
  );
}
