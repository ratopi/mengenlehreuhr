# Berliner Mengenlehreuhr

🇬🇧 [English Version](README.md)

👉 **[Live Demo](https://ratopi.github.io/mengenlehreuhr/)**

Eine reine HTML/SVG/JS-Umsetzung der berühmten **Berliner Mengenlehreuhr**, die seit 1975 am Europa-Center in Berlin steht. Entworfen von Dieter Binninger, ist sie die weltweit erste öffentliche Uhr, die die Uhrzeit nach dem Prinzip der Mengenlehre darstellt.

## Wie liest man die Uhr?

Die Uhr besteht aus **5 Reihen**, die Stunden, Minuten und Sekunden codieren:

| Reihe | Elemente | Farbe | Wert |
|-------|----------|-------|------|
| **Kreis oben** | 1 Lampe | Gelb | Blinkt jede gerade Sekunde |
| **Reihe 1** | 4 Felder | Rot | Je **5 Stunden** (max. 20 h) |
| **Reihe 2** | 4 Felder | Rot | Je **1 Stunde** (max. 4 h) |
| **Reihe 3** | 11 Felder | Gelb / Rot | Je **5 Minuten** — jedes 3. Feld (Viertelstunden) ist rot |
| **Reihe 4** | 4 Felder | Gelb | Je **1 Minute** (max. 4 Min.) |

### Berechnung der Uhrzeit

- **Stunden** = (leuchtende Lampen in Reihe 1 × 5) + (leuchtende Lampen in Reihe 2)
- **Minuten** = (leuchtende Lampen in Reihe 3 × 5) + (leuchtende Lampen in Reihe 4)
- **Sekunden** = Kreis AN → gerade Sekunde, AUS → ungerade Sekunde

### Beispiel: 17:38

| Reihe | Leuchtende Lampen | Berechnung |
|-------|-------------------|------------|
| Reihe 1 | 🔴🔴🔴⬛ | 3 × 5 = 15 Stunden |
| Reihe 2 | 🔴🔴⬛⬛ | 2 × 1 = 2 Stunden |
| **Gesamt** | | **17 Stunden** |
| Reihe 3 | 🟡🟡🔴🟡🟡🔴🟡⬛⬛⬛⬛ | 7 × 5 = 35 Minuten |
| Reihe 4 | 🟡🟡🟡⬛ | 3 × 1 = 3 Minuten |
| **Gesamt** | | **38 Minuten** |

## Verwendung

Einfach `index.html` in einem modernen Browser öffnen. Keine Build-Tools, keine Abhängigkeiten — nur eine einzige, eigenständige HTML-Datei.

```bash
# oder einen lokalen Server starten
npx serve .
```

## Features

- Reines **SVG**-Rendering — scharf in jeder Auflösung
- CSS **Glow-Effekte** für einen authentischen Neon-Look
- **Digitale Zeitanzeige** unter der Uhr
- Aktualisierung jede Sekunde
- **Progressive Web App (PWA)** — installierbar auf Handy und Desktop
- Funktioniert **offline** dank Service Worker Caching
- Keine Abhängigkeiten

## Lizenz

MIT

