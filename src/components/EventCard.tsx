import { useState, useEffect } from "react";
import { Resource, CATEGORY_COLORS, CATEGORY_LABELS } from "@/types";

interface EventCardProps {
  readonly resource: Resource;
  readonly style?: React.CSSProperties;
}

function getPreviewUrl(url: string): string {
  try {
    return `https://api.microlink.io/?url=${encodeURIComponent(
      url
    )}&screenshot=true&meta=false`;
  } catch {
    return "";
  }
}

function getInitials(title: string): string {
  return title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("");
}

function getRandomGradient(id: string): string {
  const gradients = [
    "from-indigo-500 to-purple-600",
    "from-blue-500 to-cyan-600",
    "from-emerald-500 to-teal-600",
    "from-orange-500 to-amber-600",
    "from-pink-500 to-rose-600",
    "from-violet-500 to-fuchsia-600",
  ];
  const index = id.charCodeAt(0) % gradients.length;
  return gradients[index];
}

export default function EventCard({ resource, style }: EventCardProps) {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchPreview = async () => {
      const apiUrl = getPreviewUrl(resource.url);
      if (!apiUrl) {
        setLoading(false);
        setImageError(true);
        return;
      }

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data?.data?.screenshot?.url) {
          setPreviewUrl(data.data.screenshot.url);
        } else {
          setImageError(true);
        }
      } catch {
        setImageError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPreview();
  }, [resource.url]);

  const showFallback = !previewUrl || imageError;
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
        {showFallback ? (
          <div
            className={`w-full h-full bg-gradient-to-br ${getRandomGradient(
              resource.id
            )} flex items-center justify-center`}
          >
            <span className="text-4xl font-bold text-white/90">
              {getInitials(resource.title)}
            </span>
          </div>
        ) : loading ? (
          <div className="w-full h-full bg-surface-container-low flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src={previewUrl}
            alt={resource.title}
            onError={() => setImageError(true)}
          />
        )}
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
