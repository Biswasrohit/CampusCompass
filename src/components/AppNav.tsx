"use client";

type DashboardView = "explore" | "resources" | "analytics" | "profile";

interface AppNavProps {
  readonly activeView: DashboardView;
  readonly onChangeView: (view: DashboardView) => void;
}

const NAV_ITEMS: readonly { id: Exclude<DashboardView, "profile">; label: string }[] = [
  { id: "explore", label: "Explore" },
  { id: "resources", label: "Saved" },
  { id: "analytics", label: "Insights" },
] as const;

export default function AppNav({ activeView, onChangeView }: AppNavProps) {
  return (
    <nav className="flex items-center gap-0.5 rounded-full border border-outline-variant/40 bg-surface-container-low/60 px-1.5 py-1.5">
      {NAV_ITEMS.map((item) => {
        const isActive = item.id === activeView;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChangeView(item.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold font-headline transition-all duration-200 ${
              isActive
                ? "bg-surface-container-lowest text-on-surface shadow-card border border-outline-variant/20"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}
