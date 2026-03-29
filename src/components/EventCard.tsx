import { CATEGORY_COLORS, CATEGORY_LABELS, Resource } from "@/types";

interface EventCardProps {
  readonly resource: Resource;
  readonly style?: React.CSSProperties;
  readonly isPinned?: boolean;
  readonly onTogglePinned?: (resource: Resource) => void;
}

const PLACEHOLDER_IMAGES: readonly string[] = [
  "https://placehold.co/600x300/e4e1ed/5f5e68?text=Resource",
  "https://placehold.co/600x300/e2e0f9/505064?text=Resource",
  "https://placehold.co/600x300/f9d0fc/624367?text=Resource",
  "https://placehold.co/600x300/f6f2fb/32323b?text=Resource",
  "https://placehold.co/600x300/eae7f1/5f5e68?text=Resource",
];

function getPlaceholderImage(id: string): string {
  const index = id.charCodeAt(0) % PLACEHOLDER_IMAGES.length;
  return PLACEHOLDER_IMAGES[index];
}

export default function EventCard({
  resource,
  style,
  isPinned = false,
  onTogglePinned,
}: EventCardProps) {
  return (
    <div style={style} className="group block">
      <div className="relative mb-3 overflow-hidden rounded-2xl">
        <a href={resource.url} target="_blank" rel="noopener noreferrer">
          <img
            className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={getPlaceholderImage(resource.id)}
            alt={resource.title}
          />
        </a>

        <div className="absolute right-3 top-3 flex items-center gap-2">
          <div className="rounded-full bg-surface-container-lowest/90 px-3 py-1 shadow-sm backdrop-blur-md">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: CATEGORY_COLORS[resource.category] }}
            />
            <span className="ml-2 text-[10px] font-bold uppercase tracking-wider text-on-surface">
              {CATEGORY_LABELS[resource.category]}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onTogglePinned?.(resource)}
            className={`rounded-full p-2 shadow-sm backdrop-blur-md transition-colors ${
              isPinned
                ? "bg-primary text-on-primary"
                : "bg-surface-container-lowest/90 text-on-surface-variant hover:text-primary"
            }`}
            aria-label={isPinned ? "Remove pinned resource" : "Pin resource"}
          >
            <span
              className="material-symbols-outlined text-base"
              style={{ fontVariationSettings: isPinned ? "'FILL' 1" : "'FILL' 0" }}
            >
              push_pin
            </span>
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <h4 className="mb-1 line-clamp-2 text-base font-bold leading-tight text-on-surface transition-colors group-hover:text-primary">
            {resource.title}
          </h4>
        </a>

        <p className="line-clamp-2 text-sm leading-6 text-on-surface-variant">
          {resource.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-on-surface-variant">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">location_on</span>
            <span>{resource.location}</span>
          </div>
          {resource.date && (
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">event</span>
              <span>{resource.date}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
