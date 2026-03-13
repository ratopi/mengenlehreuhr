/**
 * Generiert die PWA-Icons als PNG-Dateien mit echtem Inhalt.
 * Nutzt das Canvas-Paket von Node:
 * Erzeugt ein PNG über einen Canvas-Buffer.
 *
 * Pragmatischer Ansatz: Wir erstellen PNGs mit Canvas.
 */
const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

function generateIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  const pad = Math.round(size * 0.08);
  const innerW = size - pad * 2;
  const gap = Math.round(size * 0.02);
  const cornerR = Math.round(size * 0.15);

  // Hintergrund mit abgerundeten Ecken
  ctx.fillStyle = '#1a1a2e';
  roundRect(ctx, 0, 0, size, size, cornerR);
  ctx.fill();

  let y = pad;

  // --- Sekunden-Lampe (Kreis, an) ---
  const circleR = Math.round(size * 0.07);
  const cx = size / 2;
  const circleY = y + circleR;
  drawCircle(ctx, cx, circleY, circleR, '#eec800');
  y += circleR * 2 + gap;

  // --- Reihe 1: 4 × 5h, 3 an (rot) = 15h ---
  y = drawRow(ctx, y, pad, innerW, gap, size, 4, 3, '#e01010');

  // --- Reihe 2: 4 × 1h, 2 an (rot) = 2h → 17h ---
  y = drawRow(ctx, y, pad, innerW, gap, size, 4, 2, '#e01010');

  // --- Reihe 3: 11 × 5min, 7 an (gelb/rot) = 35min ---
  const lampH = Math.round((size - pad * 2) * 0.11);
  const w11 = Math.round((innerW - gap * 10) / 11);
  const smallR = Math.round(size * 0.025);
  for (let i = 0; i < 11; i++) {
    const x = pad + i * (w11 + gap);
    let fill = '#2a2a2a';
    if (i < 7) {
      fill = (i + 1) % 3 === 0 ? '#e01010' : '#eec800';
    }
    drawLamp(ctx, x, y, w11, lampH, smallR, fill);
  }
  y += lampH + gap;

  // --- Reihe 4: 4 × 1min, 3 an (gelb) = 3min → 17:38 ---
  drawRow(ctx, y, pad, innerW, gap, size, 4, 3, '#eec800');

  return canvas.toBuffer('image/png');
}

function drawRow(ctx, y, pad, innerW, gap, size, count, onCount, onColor) {
  const lampH = Math.round((size - pad * 2) * 0.11);
  const w = Math.round((innerW - gap * (count - 1)) / count);
  const r = Math.round(size * 0.03);
  for (let i = 0; i < count; i++) {
    const x = pad + i * (w + gap);
    const fill = i < onCount ? onColor : '#2a2a2a';
    drawLamp(ctx, x, y, w, lampH, r, fill);
  }
  return y + lampH + gap;
}

function drawLamp(ctx, x, y, w, h, r, fill) {
  ctx.strokeStyle = '#444';
  ctx.lineWidth = 1.5;
  ctx.fillStyle = fill;
  roundRect(ctx, x, y, w, h, r);
  ctx.fill();
  ctx.stroke();

  if (fill !== '#2a2a2a') {
    ctx.save();
    ctx.globalAlpha = 0.3;
    ctx.shadowColor = fill;
    ctx.shadowBlur = 10;
    ctx.fillStyle = fill;
    roundRect(ctx, x, y, w, h, r);
    ctx.fill();
    ctx.restore();
  }
}

function drawCircle(ctx, cx, cy, r, fill) {
  ctx.fillStyle = fill;
  ctx.strokeStyle = '#444';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.save();
  ctx.globalAlpha = 0.3;
  ctx.shadowColor = fill;
  ctx.shadowBlur = 12;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// --- Icons erzeugen ---
const dir = path.join(__dirname, 'icons');
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

[192, 512].forEach(size => {
  const png = generateIcon(size);
  const file = path.join(dir, `icon-${size}.png`);
  fs.writeFileSync(file, png);
  console.log(`✔ icon-${size}.png (${(png.length / 1024).toFixed(1)} KB)`);
});

console.log('\nFertig! PNG-Icons wurden erzeugt.');
