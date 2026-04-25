# Vedic Astrology Kundali Application

A comprehensive Vedic astrology application featuring D1 (Rashi) and D9 (Navamsa) charts with detailed planetary analysis.

## Features

### Chart Display
- **D1 Chart (Rashi)**: Main birth chart showing planetary positions in 12 houses
- **D9 Chart (Navamsa)**: Divisional chart for marriage and dharma analysis
- Traditional North Indian chart style with diamond pattern

### Planetary Strength Analysis
- **Color-coded planets**:
  - 🟢 Green: Strong planets (70%+ strength)
  - 🟡 Yellow: Medium strength (50-69%)
  - 🔴 Red: Weak planets (<50% strength)

- Strength calculation based on:
  - Exaltation/Debilitation status
  - Own sign placement
  - Friendly/enemy sign placement

### Interactive Planet Information (Hover)
When hovering over any planet, you'll see:
- Current position (Sign, Degree, House)
- Next strong date and duration
- Next weak date and duration
- Next transit date
- All aspects with other planets including:
  - Aspect type (Conjunction, Opposition, Trine, Square, Sextile)
  - Exact aspect date
  - Aspect end date
  - Duration of aspect

### Transit Predictions
- Upcoming planetary transits
- Conjunction dates (e.g., Mars conjunct Saturn)
- Sign changes for all planets
- Duration predictions for strong/weak periods

### Mundane Astrology Features
- Planetary war calculations
- Retrograde status indicators
- Nakshatra positions
- Speed of planets

## Technical Stack
- React 19
- Vite (Build tool)
- CSS3 with modern features
- Date-fns for date calculations

## Getting Started

### Installation
```bash
cd vedic-astrology-app
npm install
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Usage

1. Enter birth details (Date, Time, Place)
2. View the D1 chart by default
3. Switch to D9 chart using the toggle button
4. Hover over any planet to see detailed information
5. Check the right panel for:
   - Planet strength indicators
   - Upcoming transits and conjunctions

## Chart Layout

The application uses the traditional North Indian chart style:
```
    12 |  1  |  2
   ----+-----+----
    11 |  C  |  3
   ----+-----+----
    10 |  8  |  4
   ----+-----+----
     9 |  5  |  6  |  7
```

Where C represents the center showing Lagna (Ascendant) information.

## Planetary Aspects

### General Aspects
- All planets aspect the 7th house from their position

### Special Aspects
- **Mars**: 4th, 7th, 8th aspects
- **Jupiter**: 5th, 7th, 9th aspects
- **Saturn**: 3rd, 7th, 10th aspects

## Future Enhancements

- Integration with Swiss Ephemeris for precise calculations
- Birth time rectification tools
- Muhurta (electional astrology) features
- Compatibility matching (Synastry)
- Dashas and Antardashas calculations
- Remedial measures suggestions

## License

ISC

## Author

Vedic Astrology Application Team
