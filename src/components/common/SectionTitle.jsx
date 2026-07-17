export default function SectionTitle({ eyebrow, title, desc, align = "center", className = "mb-12 sm:mb-16" }) {
  const alignment = align === "left" ? "text-left items-start" : "text-center items-center";
  return (
    <div className={`flex flex-col ${alignment} gap-4 ${className}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-heartbeat" />
          {eyebrow}
        </span>
      )}
      <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 max-w-2xl leading-tight">
        {title}
      </h2>
      {desc && <p className="text-gray-500 max-w-xl text-base sm:text-lg leading-relaxed">{desc}</p>}
    </div>
  );
}