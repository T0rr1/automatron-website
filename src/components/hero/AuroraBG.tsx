export function AuroraBG() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="mx-auto h-[80vh] w-[120vw] max-w-none blur-3xl opacity-40 animate-aurora"
        style={{ background: "var(--gradient-aurora)" }}
      />
    </div>
  );
}