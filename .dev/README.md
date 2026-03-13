# Icon-Generierung

Dieses Verzeichnis enthält das Tooling zum Erzeugen der PWA-Icons.

## Voraussetzungen

- [Node.js](https://nodejs.org/) (>= 16)

## Installation

```bash
npm install
```

## Icons generieren

```bash
node generate-icons.js
```

Die PNG-Dateien werden nach `../icons/` geschrieben:

| Datei | Größe | Zweck |
|---|---|---|
| `icon-192.png` | 192 × 192 | PWA-Icon (Standard) |
| `icon-512.png` | 512 × 512 | PWA-Splash / hochauflösend |

Die Icons zeigen die Mengenlehreuhr bei **17:38** als Beispielzeit.

