import { readFileSync, writeFileSync } from "node:fs";
import { feature } from "topojson-client";

// Projection de Miller, largeur 1000, latitudes 85° N à 60° S.
export const WIDTH = 1000;
const K = WIDTH / (2 * Math.PI);
const miller = (lat) => 1.25 * Math.log(Math.tan(Math.PI / 4 + (0.4 * lat * Math.PI) / 180));
const LAT_MAX = 85;
const LAT_MIN = -60;
export const project = (lon, lat) => [((lon + 180) / 360) * WIDTH, K * (miller(LAT_MAX) - miller(Math.max(LAT_MIN, Math.min(LAT_MAX, lat))))];
export const HEIGHT = Math.round(project(0, LAT_MIN)[1]);

if (process.argv[1].endsWith("build-world-map.mjs")) {
  const topology = JSON.parse(readFileSync("node_modules/world-atlas/land-110m.json", "utf8"));
  const land = feature(topology, topology.objects.land);
  const geometry = land.features ? land.features.map((f) => f.geometry) : [land.geometry];
  const polygons = geometry.flatMap((g) => (g.type === "Polygon" ? [g.coordinates] : g.coordinates));
  let path = "";
  for (const polygon of polygons) {
    const ring = polygon[0];
    if (ring.every(([, lat]) => lat < LAT_MIN)) continue;
    const unwrapped = [];
    let offset = 0;
    ring.forEach(([lon, lat], i) => {
      if (i > 0) {
        const delta = lon - ring[i - 1][0];
        if (delta > 180) offset -= 360;
        else if (delta < -180) offset += 360;
      }
      unwrapped.push([lon + offset, lat]);
    });
    const lons = unwrapped.map(([lon]) => lon);
    const shifts = [0];
    if (Math.min(...lons) < -180) shifts.push(360);
    if (Math.max(...lons) > 180) shifts.push(-360);
    for (const shift of shifts) {
      let last = "";
      const points = [];
      for (const [lon, lat] of unwrapped) {
        const [x, y] = project(lon + shift, lat);
        const key = `${x.toFixed(1)} ${y.toFixed(1)}`;
        if (key !== last) points.push(key);
        last = key;
      }
      if (points.length > 2) path += `M${points.join("L")}Z`;
    }
  }
  writeFileSync("scripts/world-land.path.txt", path);
  console.log("bytes", path.length, "height", HEIGHT);
}
