type Size = "sm" | "md" | "lg";

const mark: Record<Size, string> = {
  sm: "h-8 w-8 text-[15px]",
  md: "h-10 w-10 text-[18px]",
  lg: "h-12 w-12 text-[22px]",
};

const word: Record<Size, string> = {
  sm: "text-[17px]",
  md: "text-[21px]",
  lg: "text-[26px]",
};

export function BrandLogo({
  size = "md",
  onDark = false,
  showTagline = false,
}: {
  size?: Size;
  onDark?: boolean;
  showTagline?: boolean;
}) {
  return (
    <span className="flex items-center gap-2.5">
      <span
        className={`relative flex ${mark[size]} shrink-0 items-center justify-center rounded-xl bg-primary font-display-lg font-bold text-on-primary shadow-sm`}
        aria-hidden="true"
      >
        Q
        <span className="absolute -right-0.5 -bottom-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-secondary ring-2 ring-surface-container-lowest" />
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={`font-display-lg ${word[size]} font-bold tracking-tight ${
            onDark ? "text-on-primary" : "text-primary"
          }`}
        >
          Book<span className={onDark ? "text-primary-fixed-dim" : "text-secondary"}>MyQ</span>
        </span>
        {showTagline && (
          <span
            className={`mt-1 hidden whitespace-nowrap font-label-sm text-label-sm uppercase tracking-widest sm:inline ${
              onDark ? "text-primary-fixed-dim" : "text-outline"
            }`}
          >
            Book · Queue · Pay
          </span>
        )}
      </span>
    </span>
  );
}
