import { cn } from "@/lib/utils";

export function GradientButton({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "relative inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 font-semibold",
        "text-accent-foreground",
        "bg-[var(--gradient-accent)] bg-[length:200%_200%] [background-position:0%_50%]",
        "transition-[transform,box-shadow,background-position] duration-200 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "active:scale-[.98] hover:[background-position:100%_50%] hover:shadow-glow",
        className
      )}
    >
      <span className="relative z-10">{children}</span>
      {/* glossy shine */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-md"
      >
        <span className="absolute inset-y-0 -left-1/4 w-1/3 rotate-12 bg-white/35 blur-md will-change-transform
                         [mask-image:linear-gradient(90deg,transparent,white,transparent)]"
              style={{ transform: "translateX(-100%)" }} />
      </span>
    </button>
  );
}