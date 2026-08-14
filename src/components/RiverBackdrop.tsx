export function RiverBackdrop({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="riverGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4cd3e8" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#1e6fff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#4cd3e8" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <path
        d="M-100 680 C 260 560, 380 760, 620 620 S 980 420, 1180 520 S 1500 380, 1600 300"
        fill="none"
        stroke="url(#riverGrad)"
        strokeWidth="2"
        className="river-path"
        opacity="0.5"
      />
      <path
        d="M-100 760 C 300 660, 420 820, 700 700 S 1020 520, 1220 600 S 1500 460, 1620 380"
        fill="none"
        stroke="url(#riverGrad)"
        strokeWidth="1.4"
        className="river-path"
        opacity="0.35"
        style={{ animationDelay: "-6s" }}
      />
    </svg>
  );
}
