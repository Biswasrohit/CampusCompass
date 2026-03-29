import { Resource, CATEGORY_COLORS, CATEGORY_ICONS, CATEGORY_LABELS } from "@/types";

interface EventCardProps {
  readonly resource: Resource;
  readonly style?: React.CSSProperties;
  readonly pinned?: boolean;
  readonly onTogglePinned?: (resource: Resource) => void;
  readonly compact?: boolean;
}

export default function EventCard({ resource, style, pinned = false, onTogglePinned, compact = false }: EventCardProps) {
  const color = CATEGORY_COLORS[resource.category];
  const icon = CATEGORY_ICONS[resource.category];

  if (compact) {
    // ── Compact horizontal card for the resource grid ──
    return (
      <div
        style={style}
        className="group bg-surface-container-lowest rounded-xl border border-outline-variant/20 hover:border-outline-variant/40 hover:shadow-card-hover transition-all duration-200 overflow-hidden animate-fade-in-up"
      >
        <div className="flex gap-3 p-3">
          {/* Category icon block */}
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${color}18` }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: "17px",
                color,
                fontVariationSettings: "'FILL' 1",
              }}
            >
              {icon}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-on-surface leading-tight mb-0.5 line-clamp-2 group-hover:text-primary transition-colors tracking-wide">
              {resource.title}
            </h4>
            <p className="text-xs text-on-surface-variant line-clamp-1 leading-snug mb-1.5">
              {resource.description}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {/* Category badge */}
              <span
                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold"
                style={{ backgroundColor: `${color}15`, color }}
              >
                {CATEGORY_LABELS[resource.category]}
              </span>
              {resource.location && (
                <span className="text-[11px] text-on-surface-variant flex items-center gap-0.5">
                  <span className="material-symbols-outlined" style={{ fontSize: "11px" }}>location_on</span>
                  {resource.location}
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col items-end justify-between shrink-0">
            {onTogglePinned && (
              <button
                onClick={(e) => { e.preventDefault(); onTogglePinned(resource); }}
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150 active:scale-90 ${
                  pinned
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface"
                }`}
                aria-label={pinned ? "Unpin resource" : "Pin resource"}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "14px", fontVariationSettings: pinned ? "'FILL' 1" : "'FILL' 0" }}
                >
                  bookmark
                </span>
              </button>
            )}
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[10px] font-semibold text-primary hover:underline"
            >
              Open →
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ── Full card (for mobile/other views) ──
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      style={style}
      className="group block cursor-pointer animate-fade-in-up"
    >
      {/* Color accent strip + icon header */}
      <div
        className="relative h-28 w-full rounded-2xl overflow-hidden mb-3 flex items-center justify-center"
        style={{ backgroundColor: `${color}12` }}
      >
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
            backgroundSize: "24px 24px",
            color,
          }}
        />
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-card"
          style={{ backgroundColor: `${color}20` }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "28px", color, fontVariationSettings: "'FILL' 1" }}
          >
            {icon}
          </span>
        </div>

        {/* Category badge top-right */}
        <div
          className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
          style={{ backgroundColor: `${color}20`, color }}
        >
          {CATEGORY_LABELS[resource.category]}
        </div>

        {/* Pin button top-left */}
        {onTogglePinned && (
          <button
            onClick={(e) => { e.preventDefault(); onTogglePinned(resource); }}
            className={`absolute top-3 left-3 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150 active:scale-90 ${
              pinned ? "bg-primary text-on-primary" : "bg-surface-container-lowest/80 backdrop-blur-sm text-on-surface-variant hover:text-on-surface"
            }`}
            aria-label={pinned ? "Unpin" : "Pin"}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "14px", fontVariationSettings: pinned ? "'FILL' 1" : "'FILL' 0" }}>
              bookmark
            </span>
          </button>
        )}
      </div>

      <h4 className="text-[15px] font-bold text-on-surface group-hover:text-primary transition-colors leading-tight mb-1.5 line-clamp-2 font-headline">
        {resource.title}
      </h4>

      <div className="flex items-center gap-3 text-on-surface-variant text-xs">
        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined" style={{ fontSize: "13px" }}>location_on</span>
          <span>{resource.location}</span>
        </div>
        {resource.date && (
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined" style={{ fontSize: "13px" }}>event</span>
            <span>{resource.date}</span>
          </div>
        )}
      </div>
    </a>
  );
}
