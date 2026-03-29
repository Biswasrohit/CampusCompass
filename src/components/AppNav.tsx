"use client";

type DashboardView = "explore" | "resources" | "analytics" | "profile";

interface AppNavProps {
  readonly activeView: DashboardView;
  readonly onChangeView: (view: DashboardView) => void;
}

const NAV_ITEMS: readonly { id: Exclude<DashboardView, "profile">; label: string }[] = [
  { id: "explore", label: "Explore" },
  { id: "resources", label: "My Resources" },
  { id: "analytics", label: "Insights" },
] as const;

export default function AppNav({ activeView, onChangeView }: AppNavProps) {
  return (
    <nav className="hidden lg:flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-2 py-1 shadow-sm">
      {NAV_ITEMS.map((item) => {
        const isActive = item.id === activeView;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChangeView(item.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              isActive
                ? "bg-primary text-on-primary shadow-md"
                : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}
