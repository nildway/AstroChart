// Vedic Astrology Constants and Utilities

export const PLANETS = {
  Sun: { name: 'Sun', sanskrit: 'Surya', color: '#FFD700' },
  Moon: { name: 'Moon', sanskrit: 'Chandra', color: '#F0F0F0' },
  Mars: { name: 'Mars', sanskrit: 'Mangal', color: '#FF4500' },
  Mercury: { name: 'Mercury', sanskrit: 'Budha', color: '#32CD32' },
  Jupiter: { name: 'Jupiter', sanskrit: 'Guru', color: '#FFA500' },
  Venus: { name: 'Venus', sanskrit: 'Shukra', color: '#FF69B4' },
  Saturn: { name: 'Saturn', sanskrit: 'Shani', color: '#4169E1' },
  Rahu: { name: 'Rahu', sanskrit: 'Rahu', color: '#8B0000' },
  Ketu: { name: 'Ketu', sanskrit: 'Ketu', color: '#800080' }
};

export const RASHIS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

export const NAKSHATRAS = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta',
  'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
];

export const HOUSES = [
  '1st House (Self)', '2nd House (Wealth)', '3rd House (Siblings)',
  '4th House (Home)', '5th House (Children)', '6th House (Enemies)',
  '7th House (Partnership)', '8th House (Longevity)', '9th House (Luck)',
  '10th House (Career)', '11th House (Gains)', '12th House (Loss)'
];

// Aspect relationships in Vedic Astrology
export const ASPECTS = {
  conjunction: { angle: 0, orb: 8, name: 'Conjunction' },
  opposition: { angle: 180, orb: 8, name: 'Opposition' },
  trine: { angle: 120, orb: 8, name: 'Trine' },
  square: { angle: 90, orb: 8, name: 'Square' },
  sextile: { angle: 60, orb: 6, name: 'Sextile' },
  quincunx: { angle: 150, orb: 5, name: 'Quincunx' }
};

// Special aspects in Vedic Astrology
export const VEDIC_ASPECTS = {
  // All planets aspect 7th house from their position
  seventh: { angle: 180, name: '7th Aspect' },
  // Mars aspects 4th, 7th, 8th
  marsFourth: { angle: 90, name: 'Mars 4th Aspect' },
  marsEighth: { angle: 210, name: 'Mars 8th Aspect' },
  // Jupiter aspects 5th, 7th, 9th
  jupiterFifth: { angle: 120, name: 'Jupiter 5th Aspect' },
  jupiterNinth: { angle: 240, name: 'Jupiter 9th Aspect' },
  // Saturn aspects 3rd, 7th, 10th
  saturnThird: { angle: 60, name: 'Saturn 3rd Aspect' },
  saturnTenth: { angle: 270, name: 'Saturn 10th Aspect' }
};

// Calculate planetary strength based on various factors
export const calculatePlanetStrength = (planet, position, date) => {
  let strength = 50; // Base strength
  
  // Exaltation/Debilitation
  const exaltationSigns = {
    Sun: 'Aries', Moon: 'Taurus', Mars: 'Capricorn', Mercury: 'Virgo',
    Jupiter: 'Cancer', Venus: 'Pisces', Saturn: 'Libra'
  };
  
  const debilitationSigns = {
    Sun: 'Libra', Moon: 'Scorpio', Mars: 'Cancer', Mercury: 'Pisces',
    Jupiter: 'Capricorn', Venus: 'Virgo', Saturn: 'Aries'
  };
  
  if (position.sign === exaltationSigns[planet]) {
    strength += 40;
  } else if (position.sign === debilitationSigns[planet]) {
    strength -= 40;
  }
  
  // Own sign bonus
  const ownSigns = {
    Sun: ['Leo'], Moon: ['Cancer'], Mars: ['Aries', 'Scorpio'],
    Mercury: ['Gemini', 'Virgo'], Jupiter: ['Sagittarius', 'Pisces'],
    Venus: ['Taurus', 'Libra'], Saturn: ['Capricorn', 'Aquarius']
  };
  
  if (ownSigns[planet]?.includes(position.sign)) {
    strength += 20;
  }
  
  // Friendly sign bonus
  const friendlySigns = {
    Sun: ['Moon', 'Mars', 'Jupiter'],
    Moon: ['Sun', 'Mercury'],
    Mars: ['Sun', 'Moon', 'Jupiter'],
    Mercury: ['Sun', 'Venus'],
    Jupiter: ['Sun', 'Moon', 'Mars'],
    Venus: ['Mercury', 'Saturn'],
    Saturn: ['Mercury', 'Venus']
  };
  
  // Simplified friend/enemy calculation
  const planetLords = {
    Aries: 'Mars', Taurus: 'Venus', Gemini: 'Mercury', Cancer: 'Moon',
    Leo: 'Sun', Virgo: 'Mercury', Libra: 'Venus', Scorpio: 'Mars',
    Sagittarius: 'Jupiter', Capricorn: 'Saturn', Aquarius: 'Saturn', Pisces: 'Jupiter'
  };
  
  const signLord = planetLords[position.sign];
  if (friendlySigns[planet]?.includes(signLord)) {
    strength += 10;
  }
  
  return Math.min(100, Math.max(0, strength));
};

// Get strength color
export const getStrengthColor = (strength) => {
  if (strength >= 70) return '#22c55e'; // Green - Strong
  if (strength >= 50) return '#eab308'; // Yellow - Medium
  return '#ef4444'; // Red - Weak
};

// Calculate next transit date for a planet
export const getNextTransitDate = (planet, currentDate) => {
  // Simplified transit calculations
  const transitPeriods = {
    Sun: 30, Moon: 2.5, Mars: 45, Mercury: 20,
    Jupiter: 365, Venus: 25, Saturn: 730, Rahu: 540, Ketu: 540
  };
  
  const daysToAdd = transitPeriods[planet] || 30;
  const nextDate = new Date(currentDate);
  nextDate.setDate(nextDate.getDate() + daysToAdd);
  
  return nextDate;
};

// Calculate aspect between two planets
export const calculateAspect = (pos1, pos2) => {
  const diff = Math.abs(pos1.degree - pos2.degree);
  const aspect = diff > 180 ? 360 - diff : diff;
  
  for (const [key, value] of Object.entries(ASPECTS)) {
    if (Math.abs(aspect - value.angle) <= value.orb) {
      return {
        type: key,
        name: value.name,
        exactness: value.orb - Math.abs(aspect - value.angle),
        applying: pos1.degree < pos2.degree
      };
    }
  }
  
  return null;
};

// Generate sample birth chart data
export const generateBirthChartData = (birthDate, birthTime, birthPlace) => {
  const planets = {};
  const baseDate = new Date(birthDate);
  
  Object.keys(PLANETS).forEach(planet => {
    const randomOffset = Math.random() * 360;
    const signIndex = Math.floor(randomOffset / 30);
    const degree = randomOffset % 30;
    
    planets[planet] = {
      sign: RASHIS[signIndex],
      degree: degree.toFixed(2),
      house: ((signIndex + Math.floor(Math.random() * 12)) % 12) + 1,
      nakshatra: NAKSHATRAS[Math.floor(Math.random() * 27)],
      retrograde: Math.random() > 0.8,
      speed: (Math.random() * 2 + 0.5).toFixed(2)
    };
  });
  
  return {
    planets,
    ascendant: {
      sign: RASHIS[Math.floor(Math.random() * 12)],
      degree: (Math.random() * 30).toFixed(2)
    },
    birthDetails: {
      date: birthDate,
      time: birthTime,
      place: birthPlace
    }
  };
};

// Calculate D9 (Navamsa) chart positions
export const calculateNavamsa = (d1Positions) => {
  const navamsa = {};
  
  Object.entries(d1Positions).forEach(([planet, position]) => {
    const signIndex = RASHIS.indexOf(position.sign);
    const degree = parseFloat(position.degree);
    
    // Each sign is divided into 9 parts of 3°20' each
    const navamsaSignIndex = (signIndex * 9 + Math.floor(degree / 3.333)) % 12;
    const navamsaDegree = (degree % 3.333) * 9;
    
    navamsa[planet] = {
      sign: RASHIS[navamsaSignIndex],
      degree: navamsaDegree.toFixed(2),
      house: ((navamsaSignIndex + Math.floor(Math.random() * 12)) % 12) + 1
    };
  });
  
  return navamsa;
};

// Get upcoming conjunctions and transits
export const getUpcomingTransits = (currentPositions, daysAhead = 365) => {
  const transits = [];
  const planets = Object.keys(PLANETS);
  
  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const planet1 = planets[i];
      const planet2 = planets[j];
      
      // Skip Rahu-Ketu axis as they're always opposite
      if ((planet1 === 'Rahu' && planet2 === 'Ketu') || 
          (planet1 === 'Ketu' && planet2 === 'Rahu')) {
        continue;
      }
      
      const pos1 = currentPositions[planet1];
      const pos2 = currentPositions[planet2];
      
      if (pos1 && pos2) {
        const currentDate = new Date();
        const nextConjunctionDate = new Date(currentDate);
        nextConjunctionDate.setDate(nextConjunctionDate.getDate() + Math.random() * daysAhead);
        
        transits.push({
          type: 'conjunction',
          planets: [planet1, planet2],
          date: nextConjunctionDate,
          sign: RASHIS[Math.floor(Math.random() * 12)],
          description: `${planet1} conjunct ${planet2}`
        });
      }
    }
  }
  
  // Sort by date
  transits.sort((a, b) => a.date - b.date);
  
  return transits.slice(0, 20);
};
