/**
 * Generiert die PWA-Icons als einfache PNG-Dateien.
 * Nutzt nur Node-Bordmittel (kein Canvas-Paket nötig):
 * Erzeugt ein unkomprimiertes BMP-artiges PNG via Buffer.
 *
 * Alternativ: Wir schreiben ein minimales valides PNG
 * mit einfarbigem Hintergrund + SVG-Overlay ist im Browser okay,
 * aber für "richtige" PNGs brauchen wir ein Paket.
 *
 * Pragmatischer Ansatz: Wir erstellen SVG-Icons und referenzieren diese.
 */
const fs = require('fs');
const path = require('path');

function generateSVGIcon(size) {
  const s = size;
  const pad = Math.round(s * 0.1);
  const lampH = Math.round((s - pad * 2) * 0.13);
  const gap = Math.round(s * 0.02);
  const r = Math.round(s * 0.04);
  const circleR = Math.round(s * 0.07);

  let y = pad;
  const cx = s / 2;

  // Sekunden-Kreis
  const circleY = y + circleR;
  y += circleR * 2 + gap;

  // Reihe 1: 4 rote Blöcke (3 an, 1 aus) – zeigt ~15h
  const blockW = Math.round((s - pad * 2 - gap * 3) / 4);

  function row(yPos, count, onCount, onColor) {
    const w = Math.round((s - pad * 2 - gap * (count - 1)) / count);
    let rects = '';
    for (let i = 0; i < count; i++) {
      const x = pad + i * (w + gap);
      const fill = i < onCount ? onColor : '#2a2a2a';
      rects += `<rect x="${x}" y="${yPos}" width="${w}" height="${lampH}" rx="${r}" fill="${fill}" stroke="#333" stroke-width="1"/>`;
    }
    return rects;
  }

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">`;
  svg += `<rect width="${s}" height="${s}" fill="#1a1a2e" rx="${Math.round(s*0.15)}"/>`;

  // Sekunden-Lampe (an)
  svg += `<circle cx="${cx}" cy="${circleY}" r="${circleR}" fill="#eec800" stroke="#333" stroke-width="1"/>`;

  // Reihe 1: 3 von 4 rot (= 15 Stunden)
  svg += row(y, 4, 3, '#e01010');
  y += lampH + gap;

  // Reihe 2: 2 von 4 rot (= 2 Stunden) → 17:00
  svg += row(y, 4, 2, '#e01010');
  y += lampH + gap;

  // Reihe 3: 7 von 11 (= 35 min), jedes 3. rot
  const w11 = Math.round((s - pad * 2 - gap * 10) / 11);
  let r3 = '';
  for (let i = 0; i < 11; i++) {
    const x = pad + i * (w11 + gap);
    let fill = '#2a2a2a';
    if (i < 7) {
      fill = (i + 1) % 3 === 0 ? '#e01010' : '#eec800';
    }
    r3 += `<rect x="${x}" y="${y}" width="${w11}" height="${lampH}" rx="${Math.round(r*0.7)}" fill="${fill}" stroke="#333" stroke-width="1"/>`;
  }
  svg += r3;
  y += lampH + gap;

  // Reihe 4: 3 von 4 gelb (= 3 min) → 17:38
  svg += row(y, 4, 3, '#eec800');

  svg += '</svg>';
  return svg;
}

const dir = path.join(__dirname, 'icons');

// SVG-Icons erstellen
[192, 512].forEach(size => {
  const svg = generateSVGIcon(size);
  // Als SVG speichern
  fs.writeFileSync(path.join(dir, `icon-${size}.svg`), svg);
  console.log(`✔ icons/icon-${size}.svg erstellt`);
});

console.log('\nHinweis: Die Icons sind als SVG erstellt.');
console.log('Das Manifest wird auf .svg-Endungen angepasst.');

