"use client";

type Props = {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
};

export function ColorPicker({ label, hint, value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <label className="text-sm font-medium text-slate-dark">{label}</label>
        {hint && <p className="text-xs text-slate-muted">{hint}</p>}
      </div>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-14 cursor-pointer rounded-lg border border-gray-200 bg-white p-1"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-28 rounded-lg border border-gray-200 px-3 py-2 font-mono text-sm outline-none focus:border-primary"
          dir="ltr"
          pattern="^#[0-9A-Fa-f]{6}$"
        />
      </div>
    </div>
  );
}
