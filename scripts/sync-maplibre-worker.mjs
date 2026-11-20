/**
 * MapLibre starts its tile worker at `./maplibre-gl-worker.mjs` next to the
 * module URL it was loaded from. The bundler renames that module, so the
 * sibling request 404s, the worker dies and the map paints blank paper.
 * A copy in /public has a URL no build step can move.
 *
 * Wired to `npm postinstall` so it follows the installed package version.
 */
import { createRequire } from "node:module";
import { copyFile, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const target = join(root, "public", "maplibre-gl-worker.mjs");

let source;
try {
  source = require.resolve("maplibre-gl/dist/maplibre-gl-worker.mjs");
} catch {
  // An install without maplibre yet (or a layout change) should not fail the build.
  console.warn("[sync-maplibre-worker] maplibre-gl worker not found, skipped");
  process.exit(0);
}

const [wanted, present] = await Promise.all([
  readFile(source),
  readFile(target).catch(() => null),
]);

if (present?.equals(wanted)) process.exit(0);

await copyFile(source, target);
console.log(
  `[sync-maplibre-worker] ${present ? "refreshed" : "installed"} public/maplibre-gl-worker.mjs (${wanted.length} bytes)`,
);
