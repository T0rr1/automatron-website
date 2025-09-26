import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean };

export function GradientButton({ className, ...props }: Props) {
  return (
    <button
      {...props}
      className={cn(
        "relative inline-flex h-11 items-center justify-center rounded-md px-5 font-semibold",
        "text-accent-foreground",
        "bg-[var(--gradient-accent)] bg-[length:200%_200%] [background-position:0%_50%]",
        "transition-[transform,box-shadow,background-position] duration-200 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "active:scale-[.98] hover:[background-position:100%_50%] hover:shadow-glow",
        className
      )}
    />
  );
}