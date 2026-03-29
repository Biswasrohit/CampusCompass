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
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
            <div style={{ minWidth: "200px", padding: "14px 16px", fontFamily: '"Be Vietnam Pro", sans-serif' }}>
              {/* Header with category */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <div style={{
                  width: "28px", height: "28px", borderRadius: "8px",
                  backgroundColor: `${CATEGORY_COLORS[resource.category]}18`,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                }}>
                  <span className="material-symbols-outlined" style={{
                    fontSize: "14px", color: CATEGORY_COLORS[resource.category],
                    fontVariationSettings: "'FILL' 1"
                  }}>{CATEGORY_ICONS[resource.category]}</span>
                </div>
                <span style={{
                  fontSize: "10px", fontWeight: "700", textTransform: "uppercase",
                  letterSpacing: "0.06em", color: CATEGORY_COLORS[resource.category]
                }}>
                  {CATEGORY_LABELS[resource.category]}
                </span>
              </div>
              <h3 style={{ margin: "0 0 4px 0", fontSize: "13px", fontWeight: "700", color: "#1C1917", lineHeight: "1.3", fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                {resource.title}
              </h3>
              <p style={{ margin: "0 0 10px 0", fontSize: "11px", color: "#5C5652", lineHeight: "1.5", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {resource.description}
              </p>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "4px",
                  fontSize: "11px", fontWeight: "600", color: "#2A5C45",
                  textDecoration: "none", borderBottom: "1px solid currentColor", paddingBottom: "1px"
                }}
              >
                View Details →
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
