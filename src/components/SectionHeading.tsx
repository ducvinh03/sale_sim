export function SectionHeading({
  eyebrow,
  title,
  desc,
  light = false,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  light?: boolean;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span
        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${
          light ? "bg-night/5 text-river" : "bg-white/10 text-cyan"
        }`}
      >
        {eyebrow}
      </span>
      <h2
        className={`mt-4 font-display text-3xl font-extrabold sm:text-4xl ${
          light ? "text-night" : "text-white"
        }`}
      >
        {title}
      </h2>
      {desc && (
        <p className={`mt-3 text-sm sm:text-base ${light ? "text-night/65" : "text-mist/70"}`}>
          {desc}
        </p>
      )}
    </div>
  );
}
