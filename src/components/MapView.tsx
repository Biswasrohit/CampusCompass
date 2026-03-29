"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Resource,
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  CATEGORY_ICONS,
} from "@/types";

interface MapViewProps {
  readonly resources: readonly Resource[];
  readonly center: [number, number];
  readonly zoom?: number;
}

function createCircularIcon(color: string, icon: string, size: number): L.DivIcon {
  const ringWidth = size === 40 ? 4 : 2;
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      border: ${ringWidth}px solid white;
    ">
      <span class="material-symbols-outlined" style="
        color: white;
        font-size: ${size === 40 ? 18 : 14}px;
        font-variation-settings: 'FILL' 1;
      ">${icon}</span>
    </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2)],
  });
}

const ICONS: Record<string, L.DivIcon> = {
  scholarships: createCircularIcon(CATEGORY_COLORS.scholarships, CATEGORY_ICONS.scholarships, 40),
  "mental-health": createCircularIcon(CATEGORY_COLORS["mental-health"], CATEGORY_ICONS["mental-health"], 32),
  "food-security": createCircularIcon(CATEGORY_COLORS["food-security"], CATEGORY_ICONS["food-security"], 32),
  housing: createCircularIcon(CATEGORY_COLORS.housing, CATEGORY_ICONS.housing, 32),
  "career-prep": createCircularIcon(CATEGORY_COLORS["career-prep"], CATEGORY_ICONS["career-prep"], 32),
};

function RecenterMap({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function MapView({
  resources,
  center,
  zoom = 14,
}: MapViewProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="h-full w-full"
      style={{ borderRadius: "2rem" }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RecenterMap center={center} />
      {resources.map((resource) => (
        <Marker
          key={resource.id}
          position={[resource.lat, resource.lng]}
          icon={ICONS[resource.category]}
        >
          <Popup>
            <div className="min-w-[180px]">
              <h3 className="mb-1 text-sm font-semibold text-on-surface font-headline">
                {resource.title}
              </h3>
              <span
                className="mb-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium text-white"
                style={{
                  backgroundColor: CATEGORY_COLORS[resource.category],
                }}
              >
                {CATEGORY_LABELS[resource.category]}
              </span>
              <p className="mt-1 text-xs text-on-surface-variant line-clamp-2">
                {resource.description}
              </p>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-xs font-medium text-primary hover:underline"
              >
                Learn More &rarr;
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
