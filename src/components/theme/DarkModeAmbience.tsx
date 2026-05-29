/** لایهٔ ثابت افکت‌های دارک — فقط با CSS در html.dark نمایش داده می‌شود */
export function DarkModeAmbience() {
  return (
    <div className="dark-ambience" aria-hidden>
      <div className="dark-orb dark-orb-primary" />
      <div className="dark-orb dark-orb-accent" />
      <div className="dark-orb dark-orb-warm" />
      <div className="dark-grid" />
      <div className="dark-vignette" />
      <div className="dark-noise" />
    </div>
  );
}
