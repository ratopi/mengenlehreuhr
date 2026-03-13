# Berlin Clock (Mengenlehreuhr)

🇩🇪 [Deutsche Version](README.de.md)

A pure HTML/SVG/JS implementation of the famous **Berlin Set Theory Clock** (_Mengenlehreuhr_), located at the Europa-Center in Berlin since 1975. Designed by Dieter Binninger, it is the world's first public clock to display time using set theory principles.

## How to Read the Clock

The clock consists of **5 rows** that encode hours, minutes, and seconds:

| Row | Elements | Color | Value |
|-----|----------|-------|-------|
| **Top circle** | 1 lamp | Yellow | Blinks every even second |
| **Row 1** | 4 blocks | Red | Each = **5 hours** (max 20h) |
| **Row 2** | 4 blocks | Red | Each = **1 hour** (max 4h) |
| **Row 3** | 11 blocks | Yellow / Red | Each = **5 minutes** — every 3rd block (quarter hours) is red |
| **Row 4** | 4 blocks | Yellow | Each = **1 minute** (max 4 min) |

### Calculating the Time

- **Hours** = (lit lamps in Row 1 × 5) + (lit lamps in Row 2)
- **Minutes** = (lit lamps in Row 3 × 5) + (lit lamps in Row 4)
- **Seconds** = top circle ON → even second, OFF → odd second

### Example: 17:38

| Row | Lit Lamps | Calculation |
|-----|-----------|-------------|
| Row 1 | 🔴🔴🔴⬛ | 3 × 5 = 15 hours |
| Row 2 | 🔴🔴⬛⬛ | 2 × 1 = 2 hours |
| **Total** | | **17 hours** |
| Row 3 | 🟡🟡🔴🟡🟡🔴🟡⬛⬛⬛⬛ | 7 × 5 = 35 minutes |
| Row 4 | 🟡🟡🟡⬛ | 3 × 1 = 3 minutes |
| **Total** | | **38 minutes** |

## Usage

Simply open `index.html` in any modern browser. No build tools, no dependencies — just a single self-contained HTML file.

```bash
# or start a local server
npx serve .
```

## Features

- Pure **SVG** rendering — crisp at any resolution
- CSS **glow effects** for an authentic neon look
- **Digital time** display below the clock
- Updates every second
- Zero dependencies

## License

MIT

