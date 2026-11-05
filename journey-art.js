const r = (x, y, w, h, c = "") => `<rect class="${c}" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/>`;
const c = (x, y, rad, cls = "") => `<circle class="${cls}" cx="${x}" cy="${y}" r="${rad}"/>`;
const l = (x1, y1, x2, y2, cls = "") => `<line class="${cls}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
const p = (d, cls = "") => `<path class="${cls}" d="${d}"/>`;
const packet = (path, dur, begin = 0) =>
  `<circle class="ji-packet" r="3.5"><animateMotion dur="${dur}s" begin="${-begin}s" repeatCount="indefinite" path="${path}"/></circle>`;
const racks = (xs, y = 40) => xs.map((x, i) => r(x, y, 34, 64) + [0, 1, 2, 3].map((k) => l(x + 8, y + 12 + k * 13, x + 26, y + 12 + k * 13, `ji-blink ji-d${(i + k) % 4}`)).join("")).join("");
const node = (x, y, rad = 5, d = 0) => c(x, y, rad, `ji-pulse ji-d${d}`);

export const journeyArt = {
  "journey-requete": [
    r(70, 18, 100, 66) + l(80, 34, 130, 34, "ji-type") + l(80, 48, 115, 48, "ji-type ji-d1") + l(80, 62, 140, 62, "ji-type ji-d2") + r(52, 98, 136, 20) + l(62, 108, 178, 108, "ji-dash") + p("M170 50 H228", "ji-flow") + packet("M170 50 H228", 2.4),
    c(120, 70, 46) + p("M74 70 H166 M120 24 V116", "ji-faint") + `<ellipse class="ji-faint" cx="120" cy="70" rx="20" ry="46"/>` + p("M30 100 Q120 10 210 100", "ji-flow") + packet("M30 100 Q120 10 210 100", 3.2) + packet("M30 100 Q120 10 210 100", 3.2, 1.6) + node(30, 100, 5) + node(210, 100, 5, 2),
    racks([40, 94, 148]) + node(120, 18, 6) + p("M120 24 L57 40 M120 24 V40 M120 24 L165 40", "ji-flow") + packet("M120 24 V40", 1.6),
    r(80, 30, 80, 80, "ji-core") + r(98, 48, 44, 44, "ji-faint") + c(120, 70, 7, "ji-pulse") + [0, 1, 2, 3].map((k) => l(92 + k * 18, 30, 92 + k * 18, 18) + l(92 + k * 18, 110, 92 + k * 18, 122) + l(80, 42 + k * 18, 68, 42 + k * 18) + l(160, 42 + k * 18, 172, 42 + k * 18)).join(""),
    r(60, 18, 120, 70) + l(72, 34, 160, 34, "ji-type") + l(72, 48, 148, 48, "ji-type ji-d1") + l(72, 62, 130, 62, "ji-type ji-d2") + p("M228 104 H70 L84 94 M70 104 L84 114", "ji-flow") + packet("M228 104 H70", 2.4),
  ],
  "journey-puce": [
    c(120, 70, 52) + p("M68 70 H172 M120 18 V122 M84 36 H156 M84 104 H156", "ji-faint") + [[96, 52], [120, 52], [144, 52], [96, 76], [120, 76], [144, 76]].map(([x, y], i) => r(x - 9, y - 9, 18, 18, `ji-die ji-d${i % 4}`)).join(""),
    r(40, 20, 160, 100) + p("M40 55 H200 M40 90 H200 M90 20 V120 M150 20 V120", "ji-faint") + p("M60 100 H100 V60 H140 V40 H180", "ji-flow") + packet("M60 100 H100 V60 H140 V40 H180", 4) + node(60, 100, 4) + node(180, 40, 4, 2),
    p("M96 18 H144 L128 60 H112 Z", "ji-beam") + l(120, 60, 120, 82, "ji-dash") + r(60, 88, 120, 12, "ji-core") + p("M80 106 H160", "ji-faint") + c(120, 82, 3, "ji-pulse"),
    r(70, 90, 100, 14, "ji-core") + r(80, 74, 80, 12) + r(80, 58, 80, 12, "ji-d1") + r(80, 42, 80, 12, "ji-d2") + r(94, 24, 52, 14, "ji-core") + [0, 1, 2].map((k) => l(100 + k * 20, 90, 100 + k * 20, 38, "ji-flow")).join(""),
    racks([66, 118, 170], 24) + p("M60 112 H210", "ji-faint") + node(83, 120, 3) + node(135, 120, 3, 1) + node(187, 120, 3, 2),
  ],
  "journey-modele": [
    r(50, 24, 56, 18) + r(50, 48, 56, 18, "ji-d1") + r(50, 72, 56, 18, "ji-d2") + p("M120 57 H150", "ji-flow") + packet("M120 57 H150", 1.6) + `<ellipse class="ji-core" cx="180" cy="40" rx="26" ry="8"/>` + p("M154 40 V90 M206 40 V90 M154 90 Q180 102 206 90", "") + p("M154 65 Q180 77 206 65", "ji-faint"),
    [[50, 44], [50, 70], [50, 96]].map(([x, y], i) => node(x, y, 6, i)).join("") + [[110, 32], [110, 58], [110, 84], [110, 110]].map(([x, y], i) => node(x, y, 6, i)).join("") + [[170, 50], [170, 90]].map(([x, y], i) => node(x, y, 6, i)).join("") + p("M50 44 L110 32 M50 44 L110 84 M50 70 L110 58 M50 70 L110 110 M50 96 L110 84 M110 32 L170 50 M110 58 L170 90 M110 84 L170 50 M110 110 L170 90", "ji-flow") + packet("M50 70 L110 58 L170 90", 3),
    [0, 1, 2].map((k) => l(50, 34 + k * 30, 50 + [120, 90, 60][k], 34 + k * 30, "ji-bar")).join("") + p("M184 34 l8 8 l14 -16", "ji-check") + p("M184 64 l8 8 l14 -16", "ji-check ji-d1") + p("M184 94 l8 8 l14 -16", "ji-check ji-d2"),
    r(86, 20, 68, 38, "ji-core") + l(96, 32, 120, 32, "ji-blink") + l(96, 44, 130, 44, "ji-blink ji-d1") + r(30, 84, 40, 30) + r(170, 74, 22, 44) + r(200, 84, 26, 30) + p("M110 58 L50 84 M130 58 L180 74 M140 58 L212 84", "ji-flow") + packet("M110 58 L50 84", 2) + packet("M130 58 L180 74", 2.4, 1),
    p("M120 26 A44 44 0 0 1 164 70", "ji-spin-a") + p("M164 70 A44 44 0 0 1 120 114", "ji-spin-a ji-d1") + p("M120 114 A44 44 0 0 1 76 70", "ji-spin-a ji-d2") + p("M76 70 A44 44 0 0 1 120 26", "ji-spin-a ji-d3") + c(120, 70, 8, "ji-pulse"),
  ],
  "journey-energie": [
    p("M80 120 L100 30 L120 120 M70 50 H130 M78 76 H122", "") + p("M130 50 H228 M122 76 H228", "ji-flow") + packet("M130 50 H228", 2) + packet("M122 76 H228", 2.6, 1) + p("M184 98 l-12 18 h10 l-6 14", "ji-bolt"),
    r(46, 40, 70, 60) + r(116, 58, 8, 24) + l(60, 56, 60, 84, "ji-bar") + l(76, 56, 76, 84, "ji-bar ji-d1") + l(92, 56, 92, 84, "ji-bar ji-d2") + p("M124 70 H200", "ji-flow") + packet("M124 70 H200", 1.8) + c(210, 70, 12, "ji-core"),
    r(80, 30, 80, 80, "ji-core") + p("M122 48 l-16 24 h14 l-8 22 l24 -30 h-14 l10 -16 Z", "ji-bolt") + p("M20 70 H80", "ji-flow") + packet("M20 70 H80", 1.6) + p("M160 70 H222", "ji-flow") + packet("M160 70 H222", 1.6, .8),
    r(70, 60, 100, 50, "ji-core") + [0, 1, 2, 3].map((k) => p(`M${86 + k * 22} 52 q-9 -10 0 -20 q9 -10 0 -20`, `ji-heat ji-d${k}`)).join(""),
    c(120, 62, 30) + [0, 60, 120].map((a) => `<ellipse class="ji-fan" cx="120" cy="62" rx="26" ry="8" transform="rotate(${a} 120 62)"/>`).join("") + c(120, 62, 4, "ji-pulse") + [[44, 112], [76, 118], [164, 118], [196, 112]].map(([x, y], i) => p(`M${x} ${y - 10} q-6 8 0 12 q6 -4 0 -12`, `ji-drop ji-d${i}`)).join(""),
  ],
  "journey-jeton": [
    r(40, 24, 160, 72) + l(54, 42, 186, 42, "ji-type") + l(54, 58, 170, 58, "ji-type ji-d1") + l(54, 74, 150, 74, "ji-type ji-d2") + l(54, 90, 120, 90, "ji-type ji-d3"),
    [[28, 40, 50], [84, 40, 30], [120, 40, 56], [182, 40, 34], [28, 80, 36], [70, 80, 60], [136, 80, 28]].map(([x, y, w], i) => r(x, y, w, 26, `ji-chip ji-d${i % 4}`)).join(""),
    p("M40 110 V22 M40 110 H210", "ji-faint") + [[80, 80], [100, 70], [150, 40], [170, 52]].map(([x, y], i) => node(x, y, 5, i)).join("") + p("M40 110 L80 80 M40 110 L150 40", "ji-flow") + p("M150 40 l-10 2 M150 40 l-3 9", ""),
    [30, 70, 110, 150, 190].map((x, i) => r(x, 90, 34, 24, `ji-chip ji-d${i % 4}`)).join("") + p("M47 90 Q110 20 207 90", "ji-flow") + p("M87 90 Q128 40 207 90", "ji-flow ji-d1") + p("M127 90 Q150 60 207 90", "ji-flow ji-d2"),
    [24, 62, 100, 138].map((x, i) => r(x, 56, 32, 28, "ji-chip")) .join("") + r(176, 56, 40, 28, "ji-new") + p("M168 70 h-4", "") + l(192, 28, 192, 48, "ji-flow") + p("M186 42 l6 8 l6 -8", ""),
  ],
  "journey-robot": [
    c(80, 70, 22, "ji-core") + c(80, 70, 8, "ji-pulse") + p("M102 70 L214 26 M102 70 L214 114", "ji-faint") + `<path class="ji-scan" d="M102 70 L214 26 V114 Z"/>` + packet("M102 70 H214", 2.6),
    r(30, 30, 56, 70, "ji-box") + r(104, 52, 50, 48, "ji-box ji-d1") + r(170, 40, 46, 60, "ji-box ji-d2") + c(58, 54, 8) + c(129, 76, 8) + c(193, 62, 8) + p("M24 24 h12 M24 24 v12 M92 106 h-12 M92 106 v-12", "ji-faint"),
    node(30, 70, 6) + p("M36 70 H80 L110 40 H170 M80 70 L110 100 H170", "ji-flow") + packet("M36 70 H80 L110 40 H170", 2.4) + r(170, 28, 44, 24, "ji-core") + r(170, 88, 44, 24, "ji-d2"),
    p("M60 118 H130 L130 70 L180 40", "ji-arm") + c(130, 118, 9, "ji-pulse") + c(130, 70, 9, "ji-pulse ji-d1") + c(180, 40, 7, "ji-pulse ji-d2") + p("M146 70 A16 16 0 0 0 138 56", "ji-faint"),
    c(120, 70, 22, "ji-core") + c(120, 70, 6, "ji-pulse") + `<circle class="ji-zone" cx="120" cy="70" r="52"/>` + p("M120 22 l26 10 v20 q0 18 -26 28 q-26 -10 -26 -28 v-20 z", "ji-shield"),
  ],
};

export function renderJourneyArt(journeyId, index) {
  const inner = journeyArt[journeyId]?.[index];
  if (!inner) return "";
  return `<div class="journey-art" aria-hidden="true"><svg viewBox="0 0 240 140" class="ji" focusable="false">${inner}</svg></div>`;
}
