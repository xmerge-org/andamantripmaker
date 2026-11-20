"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Map, { Layer, Marker, Source } from "react-map-gl/maplibre";
import { setWorkerUrl, type Map as MapLibreMap } from "maplibre-gl";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import "maplibre-gl/dist/maplibre-gl.css";
import islands from "@/utility/json/islands.json";

// MapLibre derives its tile worker from the URL of the module that ships it,
// which the bundler renames — the sibling request then 404s and the map paints
// blank. /public holds a copy at a path no build can move; scripts/
// sync-maplibre-worker.mjs keeps it matched to the installed version.
setWorkerUrl("/maplibre-gl-worker.mjs");

const STYLE = "https://tiles.openfreemap.org/styles/positron";

/* The aerial alternative: Esri's World Imagery serves real satellite tiles
   with no key and no signup. Both basemaps' licence credits are collected in
   the footer colophon, so nothing at all sits over the map. */
const AERIAL = {
  version: 8 as const,
  sources: {
    esri: {
      type: "raster" as const,
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      maxzoom: 19,
    },
  },
  layers: [{ id: "imagery", type: "raster" as const, source: "esri" }],
};

/* The caption is part of the chart, not a data-credit strip: the tile credits
   that the basemaps require sit in the footer, where they read as a colophon
   instead of a watermark over the work. */
const CAPTION = {
  chart: "Andaman Islands · The chain from Baratang to Neil, charted at Phoenix Bay",
  aerial: "Andaman Islands · The archipelago, North Andaman to Little Andaman",
};

/* Positron ships in flat greys. Retinted to the chart palette so the map
   reads as paper laid on the ink section, not as a screenshot of a web map. */
const PAPER = "#f4eee0";

const FILL: Record<string, string> = {
  background: PAPER,
  park: "#e2e9d8",
  water: "#c9dedd",
  landcover_wood: "#e6ecdb",
  landcover_glacier: "#edf1e8",
  landcover_ice_shelf: "#edf1e8",
  landuse_residential: "#efe6d2",
  building: "#e2d7bf",
};

const LINE: Record<string, string> = {
  waterway: "#a3c6c6",
  road_pier: "#e6dcc6",
  highway_path: "#dbcfb2",
  highway_minor: "#d9ccaf",
  highway_major_casing: "#c5b693",
  highway_major_inner: "#fdf8ec",
  highway_major_subtle: "#d4c7a9",
  highway_motorway_casing: "#c5b693",
  highway_motorway_inner: "#fdf8ec",
  highway_motorway_subtle: "#d4c7a9",
  tunnel_motorway_casing: "#c5b693",
  tunnel_motorway_inner: "#fdf8ec",
  railway: "#c8ba99",
  boundary_3: "#bca77d",
  boundary_2: "#bca77d",
  boundary_disputed: "#bca77d",
  "aeroway-runway-casing": "#e2d7bf",
  "aeroway-runway": "#e2d7bf",
  "aeroway-taxiway": "#dbcfb2",
  "aeroway-area": "#efe6d2",
};

const LABEL_INK = "#2c4750";
const LABEL_HALO = "rgba(244, 238, 224, 0.92)";

/* The markers carry the five settlement names, so the style's own ones are
   duplicates at this scale. Island and water names stay — that is the
   geography the crossing is read against. */
const SETTLEMENT_LABELS = new Set([
  "label_city",
  "label_city_capital",
  "label_town",
  "label_village",
]);

type Stop = (typeof islands)[number];

const BY_CODE = Object.fromEntries(islands.map((i) => [i.code, i])) as Record<
  string,
  Stop
>;

const coord = (code: string): [number, number] => [
  BY_CODE[code].lng,
  BY_CODE[code].lat,
];

/** The chain as it is travelled, north to south: the trunk road down from
    Baratang, then the ferry hops out to Neil. Every neighbour pair is a leg,
    so no dot hangs off the route. */
const CHAIN = ["BAR", "POR", "ROS", "HAV", "NEI"] as const;

const LEGS: { mode: "land" | "sea"; chain: string[] }[] = CHAIN.slice(0, -1).map(
  (code, i) => ({ mode: i === 0 ? "land" : "sea", chain: [code, CHAIN[i + 1]] }),
);

const ROUTE = {
  type: "FeatureCollection" as const,
  features: LEGS.map((leg) => ({
    type: "Feature" as const,
    properties: { mode: leg.mode },
    geometry: {
      type: "LineString" as const,
      coordinates: leg.chain.map(coord),
    },
  })),
};

/** Phoenix Bay and Ross Island are 5 km apart, so their labels face apart. */
const SIDE: Record<(typeof CHAIN)[number], "west" | "east" | "none"> = {
  BAR: "west",
  POR: "west",
  ROS: "none",
  HAV: "east",
  NEI: "east",
};

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${BY_CODE.POR.lat},${BY_CODE.POR.lng}`;

const BASEMAPS = [
  { label: "Chart", aerial: false },
  { label: "Aerial", aerial: true },
];

const MAX_BOUNDS: [number, number, number, number] = [91.2, 9.9, 95.0, 14.2];

/** The aerial plate is framed on the archipelago, not on the five stops: from
    this height the whole route is one cluster on South Andaman, so the story is
    the chain itself — North Andaman down to Little Andaman. */
const ARCHIPELAGO: [number, number, number, number] = [
  91.9, 10.35, 93.9, 13.45,
];

/** Names the plate carries itself instead of leaving to the basemap: island
    bodies and the water they are read against. Centroids are the OpenStreetMap
    island relations' own, nudged onto the landmass where a label can sit. */
const PLACES = [
  { name: "North Andaman", lat: 13.1, lng: 92.92 },
  { name: "Middle Andaman", lat: 12.62, lng: 92.82 },
  { name: "South Andaman", lat: 11.72, lng: 92.86 },
  { name: "Little Andaman", lat: 10.71, lng: 92.49 },
  { name: "Bay of Bengal", lat: 12.28, lng: 91.9 },
];

const SCALE_PX = 96;
const NICE_METRES = [500, 1e3, 2e3, 5e3, 1e4, 2e4, 5e4, 1e5, 2e5];

/** Measured off the canvas rather than written down, so the rule stays true at
    whatever zoom the reader leaves it on and at this latitude. */
function readScale(map: MapLibreMap) {
  const y = map.getCanvas().clientHeight - 96;
  const from = map.unproject([24, y]);
  const perPx = from.distanceTo(map.unproject([24 + SCALE_PX, y])) / SCALE_PX;
  const under = NICE_METRES.filter((metres) => metres / perPx <= SCALE_PX);
  const metres = under[under.length - 1] ?? NICE_METRES[0];
  return {
    px: Math.round(metres / perPx),
    label: metres >= 1e3 ? `${metres / 1e3} km` : `${metres} m`,
  };
}

/** Positron's own layer ids, so the retint survives a style refresh only as
    far as those ids do — anything unrecognised is left alone. */
function tint(map: MapLibreMap) {
  for (const layer of map.getStyle().layers ?? []) {
    if (layer.type === "background") {
      map.setPaintProperty(layer.id, "background-color", PAPER);
    } else if (layer.type === "fill" && FILL[layer.id]) {
      map.setPaintProperty(layer.id, "fill-color", FILL[layer.id]);
    } else if (layer.type === "line" && LINE[layer.id]) {
      map.setPaintProperty(layer.id, "line-color", LINE[layer.id]);
    } else if (layer.type === "symbol") {
      if (SETTLEMENT_LABELS.has(layer.id)) {
        map.setLayoutProperty(layer.id, "visibility", "none");
        continue;
      }
      map.setPaintProperty(layer.id, "text-color", LABEL_INK);
      map.setPaintProperty(layer.id, "text-halo-color", LABEL_HALO);
      map.setPaintProperty(layer.id, "text-halo-blur", 1);
      map.setPaintProperty(layer.id, "text-halo-width", 1.4);
    }
  }
}

export default function AndamanChart() {
  const reduced = useReducedMotion();
  const styled = useRef(false);
  const aerialRef = useRef(false);
  const [aerial, setAerial] = useState(false);
  const [scale, setScale] = useState<{ px: number; label: string } | null>(
    null,
  );
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  /* A style swap re-tints and re-frames — the two basemaps are drawn at
     different extents, so the route plate and the archipelago plate cannot
     share one view. The pan a reader makes inside a mode survives, though. */
  function showBasemap(next: boolean) {
    if (next === aerial) return;
    aerialRef.current = next;
    styled.current = false;
    setAerial(next);
  }

  // Tile failures surface per request and one blocked tile is not worth
  // blanking the map for, so the honest signal is that the style itself never
  // arrived. styledata fires again on every paint change, hence the guard.
  useEffect(() => {
    if (loaded) return;
    const timer = setTimeout(() => setFailed(true), 20000);
    return () => clearTimeout(timer);
  }, [loaded]);

  const bounds = useMemo(() => {
    const lngs = islands.map((i) => i.lng);
    const lats = islands.map((i) => i.lat);
    return [
      Math.min(...lngs),
      Math.min(...lats),
      Math.max(...lngs),
      Math.max(...lats),
    ] as [number, number, number, number];
  }, []);

  if (failed) {
    return (
      <div className="flex h-full min-h-[300px] flex-col items-start justify-center gap-3 rounded-2xl border border-foam/15 bg-deep/60 p-6">
        <p className="text-sm leading-relaxed text-foam/60">
          The chart tiles did not load, but the office is still where it always
          is — Phoenix Bay, Port Blair.
        </p>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-reef/40 px-4 py-2 text-sm font-semibold text-reef transition-colors hover:border-reef hover:bg-reef/10"
        >
          Open in Google Maps
          <ArrowUpRight className="size-4" />
        </a>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-[360px] w-full flex-col sm:min-h-[400px]">
      <div className="relative min-h-0 flex-1">
        <Map
          initialViewState={{
            longitude: BY_CODE.POR.lng,
            latitude: BY_CODE.POR.lat,
            zoom: 5.5,
          }}
          mapStyle={aerial ? AERIAL : STYLE}
          style={{ width: "100%", height: "100%" }}
          attributionControl={false}
          renderWorldCopies={false}
          scrollZoom={false}
          dragRotate={false}
          pitchWithRotate={false}
          maxPitch={0}
          minZoom={8}
          maxZoom={13}
          maxBounds={MAX_BOUNDS}
          onMove={(event) => {
            if (!aerialRef.current) return;
            const next = readScale(event.target);
            setScale((prev) =>
              prev?.px === next.px && prev?.label === next.label ? prev : next,
            );
          }}
          onStyleData={(event) => {
            const map = event.target;
            if (styled.current || !map.getStyle().layers?.length) return;
            styled.current = true;
            if (!aerialRef.current) tint(map);
            /* react-map-gl only forwards minZoom while building the map, so the
               floor the archipelago plate needs has to go on the instance. */
            map.setMinZoom(aerialRef.current ? 6.2 : 8);
            (window as unknown as { __atmMap: unknown }).__atmMap = map;
            map.fitBounds(aerialRef.current ? ARCHIPELAGO : bounds, {
              padding: { top: 44, bottom: 52, left: 44, right: 44 },
              maxZoom: aerialRef.current ? 8 : 11.4,
              duration: reduced ? 0 : 700,
            });
            setLoaded(true);
          }}
        >
          <Source id="legs" type="geojson" data={ROUTE}>
            {/* A paper casing under the dashes keeps the route legible where it
                crosses roads and town fill, and reads as a printed route line
                laid over the imagery. Every leg is a straight two-point
                segment, so no cap or join paint is called for. */}
            <Layer
              id="legs-casing"
              type="line"
              paint={{
                "line-color": PAPER,
                "line-width": aerial ? 5 : 4.5,
                "line-opacity": 0.9,
              }}
            />
            {/* The ink-blue land leg reads as a hairline on paper but vanishes
                on the forest, so the aerial basemap lifts it to reef. */}
            <Layer
              id="legs-land"
              type="line"
              filter={["==", ["get", "mode"], "land"]}
              paint={{
                "line-color": aerial ? "#57cfc6" : "#0c5468",
                "line-width": aerial ? 2 : 1.75,
                "line-dasharray": [2, 2.5],
                "line-opacity": aerial ? 0.95 : 0.75,
              }}
            />
            <Layer
              id="legs-sea"
              type="line"
              filter={["==", ["get", "mode"], "sea"]}
              paint={{
                "line-color": "#e1532b",
                "line-width": aerial ? 2.5 : 2.25,
                "line-dasharray": [3, 2.5],
                "line-opacity": 0.95,
              }}
            />
          </Source>

          {CHAIN.map((code) => {
            const stop = BY_CODE[code];
            /* Aerial is a 100 km frame: five ferry-stop pills would sit on top
               of each other, so the dots carry the route and the island names
               below carry the place. */
            const side = aerial ? "none" : SIDE[code];
            const base = code === "POR";
            return (
              <Marker
                key={code}
                longitude={stop.lng}
                latitude={stop.lat}
                anchor={
                  side === "west"
                    ? "right"
                    : side === "east"
                      ? "left"
                      : "center"
                }
              >
                <span
                  className={`flex items-center gap-1.5 ${
                    side === "west" ? "flex-row-reverse" : ""
                  }`}
                >
                  <span
                    className={
                      base
                        ? "size-4 shrink-0 rounded-full border-2 border-foam bg-coral shadow-[0_0_0_3px_rgba(225,83,43,0.25)]"
                        : "size-3 shrink-0 rounded-full border-2 border-foam bg-sea shadow-[0_0_0_2.5px_rgba(12,84,104,0.2)]"
                    }
                  />
                  {side === "none" ? null : (
                    <span className="rounded-full bg-foam/90 px-2 py-0.5 font-mono text-[0.5625rem] uppercase tracking-[0.12em] whitespace-nowrap text-[#2c4750] ring-1 ring-[#04202a]/10">
                      {stop.name}
                    </span>
                  )}
                </span>
              </Marker>
            );
          })}

          {aerial
            ? PLACES.map((place) => (
                <Marker
                  key={place.name}
                  longitude={place.lng}
                  latitude={place.lat}
                  anchor="center"
                  className="pointer-events-none"
                >
                  <span className="font-display text-[0.8125rem] italic whitespace-nowrap text-foam drop-shadow-[0_1px_5px_rgba(4,32,42,0.95)]">
                    {place.name}
                  </span>
                </Marker>
              ))
            : null}
        </Map>

        {/* The two instruments that make an aerial plate read as a chart rather
            than a screenshot. Kept out of the route view, where the top-left
            corner belongs to the Baratang label. */}
        {aerial ? (
          <div
            aria-hidden
            className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-2 rounded-2xl bg-foam/85 px-2.5 py-2 ring-1 ring-[#04202a]/10 backdrop-blur-sm"
          >
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 10 12" className="size-3" aria-hidden>
                <path d="M5 0 8.4 9H1.6z" fill="#e1532b" />
              </svg>
              <span className="font-mono text-[0.5625rem] tracking-[0.14em] text-[#2c4750]">
                N
              </span>
            </span>
            {scale ? (
              <span className="flex items-center gap-1.5">
                <span
                  className="border-x-2 border-b-2 border-[#2c4750]/55"
                  style={{ width: scale.px, height: 5 }}
                />
                <span className="font-mono text-[0.5625rem] tracking-[0.1em] text-[#2c4750]/80">
                  {scale.label}
                </span>
              </span>
            ) : null}
          </div>
        ) : null}

        {/* The basemap choice, in the one corner the framing leaves as open
            water at every width. The licence credits sit in the caption under
            the chart instead, so nothing floats over the map. */}
        <div
          role="group"
          aria-label="Basemap"
          className="absolute right-3 top-3 flex gap-1 rounded-full bg-foam/85 p-1 ring-1 ring-[#04202a]/10 backdrop-blur-sm"
        >
          {BASEMAPS.map((option) => {
            const active = option.aerial === aerial;
            return (
              <button
                key={option.label}
                type="button"
                aria-pressed={active}
                onClick={() => showBasemap(option.aerial)}
                className={`rounded-full px-2.5 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.12em] transition-colors duration-300 ${
                  active
                    ? "bg-sea text-foam"
                    : "text-[#2c4750]/70 hover:text-[#2c4750]"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3">
          <p
            className={`rounded-full px-3 py-1.5 font-mono text-[0.5625rem] uppercase tracking-[0.14em] backdrop-blur-sm ${
              aerial
                ? "bg-foam/85 text-[#2c4750]"
                : "bg-[#04202a]/75 text-foam/80"
            }`}
          >
            {BY_CODE.POR.lat}° N {BY_CODE.POR.lng}° E
          </p>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto inline-flex items-center gap-1 rounded-full bg-foam/90 px-3 py-1.5 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-[#2c4750] transition-colors hover:bg-foam"
          >
            Directions
            <ArrowUpRight className="size-3" />
          </a>
        </div>
      </div>

      <p className="border-t border-ink/10 px-3 py-2 font-mono text-[0.5625rem] uppercase leading-relaxed tracking-[0.12em] text-[#2c4750]/60">
        {aerial ? CAPTION.aerial : CAPTION.chart}
      </p>
    </div>
  );
}
