import { Resource, CATEGORY_COLORS, CATEGORY_LABELS } from "@/types";

interface EventCardProps {
  readonly resource: Resource;
  readonly style?: React.CSSProperties;
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

export default function EventCard({ resource, style }: EventCardProps) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      style={style}
      className="group block cursor-pointer"
    >
      {/* Image thumbnail */}
      <div className="relative h-40 w-full rounded-2xl overflow-hidden mb-3">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={getPlaceholderImage(resource.id)}
          alt={resource.title}
        />
        {/* Category badge */}
        <div className="absolute top-3 right-3 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: CATEGORY_COLORS[resource.category] }}
          />
          <span className="text-[10px] font-bold text-on-surface uppercase tracking-wider">
            {CATEGORY_LABELS[resource.category]}
          </span>
        </div>
      </div>

      {/* Title */}
      <h4 className="text-base font-bold text-on-surface group-hover:text-primary transition-colors leading-tight mb-1 line-clamp-2">
        {resource.title}
      </h4>

      {/* Meta */}
      <div className="flex items-center gap-4 text-on-surface-variant text-xs">
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
    </a>
  );
}
