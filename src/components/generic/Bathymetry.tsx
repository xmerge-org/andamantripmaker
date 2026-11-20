type BathymetryProps = {
  /** Number of contour rings. */
  rings?: number;
  /** Ring spacing in user units. */
  step?: number;
  /** Wave amplitude in user units. */
  amplitude?: number;
  /** Picks the harmonic pair, so a section can have its own seabed shape. */
  seed?: number;
  className?: string;
  strokeClassName?: string;
};

const STEPS = 90;

function contourPath(
  cx: number,
  cy: number,
  radius: number,
  amplitude: number,
  k1: number,
  k2: number,
  phase: number,
) {
  let d = "";
  for (let s = 0; s <= STEPS; s++) {
    const a = (s / STEPS) * Math.PI * 2;
    const r =
      radius +
      amplitude * Math.sin(k1 * a + phase) +
      amplitude * 0.45 * Math.sin(k2 * a + phase * 1.7);
    const x = cx + r * Math.cos(a);
    const y = cy + r * 0.58 * Math.sin(a);
    d += `${s === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return `${d}Z`;
}

/**
 * Bathymetric contour field — the schematic seabed that grounds the chart
 * language. Harmonics are fixed, so the output is deterministic and cannot
 * disagree between server and client render.
 */
export function Bathymetry({
  rings = 9,
  step = 74,
  amplitude = 26,
  seed = 1,
  className = "",
  strokeClassName = "text-ink/12",
}: BathymetryProps) {
  const k1 = 3 + (seed % 3);
  const k2 = 5 + (seed % 4);
  const phase = seed * 0.9;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <g fill="none" stroke="currentColor" strokeWidth={1} className={strokeClassName}>
        {Array.from({ length: rings }, (_, i) => (
          <path
            key={i}
            d={contourPath(720, 450, 90 + i * step, amplitude, k1, k2, phase + i * 0.42)}
            opacity={1 - i * (0.55 / rings)}
          />
        ))}
      </g>
    </svg>
  );
}
