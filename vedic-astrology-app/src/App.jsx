import React, { useState, useMemo } from 'react';
import { 
  PLANETS, RASHIS, calculatePlanetStrength, getStrengthColor,
  getNextTransitDate, calculateAspect, generateBirthChartData,
  calculateNavamsa, getUpcomingTransits, ASPECTS
} from './astrologyUtils';
import './App.css';

function App() {
  const [birthDetails, setBirthDetails] = useState({
    date: '1990-01-15',
    time: '10:30',
    place: 'New Delhi, India'
  });
  
  const [activeChart, setActiveChart] = useState('D1');
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  
  // Generate chart data
  const chartData = useMemo(() => {
    return generateBirthChartData(birthDetails.date, birthDetails.time, birthDetails.place);
  }, [birthDetails]);
  
  // Calculate D9 chart
  const d9Data = useMemo(() => {
    return calculateNavamsa(chartData.planets);
  }, [chartData.planets]);
  
  // Get upcoming transits
  const upcomingTransits = useMemo(() => {
    return getUpcomingTransits(chartData.planets);
  }, [chartData.planets]);
  
  // Calculate planet strengths and aspects
  const planetAnalysis = useMemo(() => {
    const analysis = {};
    const planets = Object.keys(PLANETS);
    const currentDate = new Date();
    
    planets.forEach(planet => {
      const position = activeChart === 'D1' ? chartData.planets[planet] : d9Data[planet];
      if (!position) return;
      
      const strength = calculatePlanetStrength(planet, position, currentDate);
      const nextTransit = getNextTransitDate(planet, currentDate);
      const nextStrongDate = new Date(currentDate);
      nextStrongDate.setDate(nextStrongDate.getDate() + Math.random() * 180);
      const nextWeakDate = new Date(currentDate);
      nextWeakDate.setDate(nextWeakDate.getDate() + Math.random() * 180 + 180);
      
      // Calculate aspects with other planets
      const aspects = [];
      planets.forEach(otherPlanet => {
        if (planet === otherPlanet) return;
        const otherPosition = activeChart === 'D1' ? chartData.planets[otherPlanet] : d9Data[otherPlanet];
        if (!otherPosition) return;
        
        const aspect = calculateAspect(position, otherPosition);
        if (aspect) {
          const aspectDate = new Date(currentDate);
          aspectDate.setDate(aspectDate.getDate() + Math.random() * 90);
          const aspectEndDate = new Date(aspectDate);
          aspectEndDate.setDate(aspectEndDate.getDate() + Math.floor(Math.random() * 30) + 7);
          
          aspects.push({
            ...aspect,
            withPlanet: otherPlanet,
            exactDate: aspectDate,
            endDate: aspectEndDate,
            duration: Math.floor((aspectEndDate - aspectDate) / (1000 * 60 * 60 * 24))
          });
        }
      });
      
      analysis[planet] = {
        position,
        strength,
        strengthColor: getStrengthColor(strength),
        isStrong: strength >= 70,
        isWeak: strength < 50,
        nextTransit,
        nextStrongDate,
        nextWeakDate,
        strongDuration: Math.floor(Math.random() * 90) + 30,
        weakDuration: Math.floor(Math.random() * 60) + 20,
        aspects
      };
    });
    
    return analysis;
  }, [chartData.planets, d9Data, activeChart]);
  
  const handlePlanetHover = (planet) => {
    setHoveredPlanet(planet);
  };
  
  const renderChart = () => {
    const positions = activeChart === 'D1' ? chartData.planets : d9Data;
    const analysis = planetAnalysis;
    
    return (
      <div className="chart-container">
        <div className="chart-header">
          <h2>{activeChart === 'D1' ? 'D1 Chart (Rashi)' : 'D9 Chart (Navamsa)'}</h2>
        </div>
        
        <div className="chart-grid">
          {/* Traditional North Indian Chart Style */}
          <div className="north-indian-chart">
            {/* House 12 */}
            <div className="house house-12">
              <div className="house-number">12</div>
              <div className="house-content">
                {renderPlanetsInHouse(12, positions, analysis)}
              </div>
            </div>
            
            {/* House 1 */}
            <div className="house house-1">
              <div className="house-number">1</div>
              <div className="house-content">
                {renderPlanetsInHouse(1, positions, analysis)}
              </div>
            </div>
            
            {/* House 2 */}
            <div className="house house-2">
              <div className="house-number">2</div>
              <div className="house-content">
                {renderPlanetsInHouse(2, positions, analysis)}
              </div>
            </div>
            
            {/* House 11 */}
            <div className="house house-11">
              <div className="house-number">11</div>
              <div className="house-content">
                {renderPlanetsInHouse(11, positions, analysis)}
              </div>
            </div>
            
            {/* Center - Ascendant Info */}
            <div className="house center-house">
              <div className="ascendant-info">
                <div>Lagna: {chartData.ascendant.sign}</div>
                <div>{chartData.ascendant.degree}°</div>
              </div>
            </div>
            
            {/* House 3 */}
            <div className="house house-3">
              <div className="house-number">3</div>
              <div className="house-content">
                {renderPlanetsInHouse(3, positions, analysis)}
              </div>
            </div>
            
            {/* House 10 */}
            <div className="house house-10">
              <div className="house-number">10</div>
              <div className="house-content">
                {renderPlanetsInHouse(10, positions, analysis)}
              </div>
            </div>
            
            {/* House 4 */}
            <div className="house house-4">
              <div className="house-number">4</div>
              <div className="house-content">
                {renderPlanetsInHouse(4, positions, analysis)}
              </div>
            </div>
            
            {/* House 9 */}
            <div className="house house-9">
              <div className="house-number">9</div>
              <div className="house-content">
                {renderPlanetsInHouse(9, positions, analysis)}
              </div>
            </div>
            
            {/* House 5 */}
            <div className="house house-5">
              <div className="house-number">5</div>
              <div className="house-content">
                {renderPlanetsInHouse(5, positions, analysis)}
              </div>
            </div>
            
            {/* House 8 */}
            <div className="house house-8">
              <div className="house-number">8</div>
              <div className="house-content">
                {renderPlanetsInHouse(8, positions, analysis)}
              </div>
            </div>
            
            {/* House 6 */}
            <div className="house house-6">
              <div className="house-number">6</div>
              <div className="house-content">
                {renderPlanetsInHouse(6, positions, analysis)}
              </div>
            </div>
            
            {/* House 7 */}
            <div className="house house-7">
              <div className="house-number">7</div>
              <div className="house-content">
                {renderPlanetsInHouse(7, positions, analysis)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderPlanetsInHouse = (houseNumber, positions, analysis) => {
    const planetsInHouse = Object.entries(positions)
      .filter(([_, pos]) => pos.house === houseNumber)
      .map(([planet, _]) => planet);
    
    return planetsInHouse.map(planet => {
      const planetInfo = analysis[planet];
      if (!planetInfo) return null;
      
      return (
        <div
          key={planet}
          className={`planet-marker ${planetInfo.isStrong ? 'strong' : ''} ${planetInfo.isWeak ? 'weak' : ''}`}
          style={{ backgroundColor: planetInfo.strengthColor }}
          onMouseEnter={() => handlePlanetHover(planet)}
          onMouseLeave={() => handlePlanetHover(null)}
        >
          {planet}
        </div>
      );
    });
  };
  
  const renderTooltip = () => {
    if (!hoveredPlanet || !planetAnalysis[hoveredPlanet]) return null;
    
    const info = planetAnalysis[hoveredPlanet];
    
    return (
      <div className="planet-tooltip">
        <div className="tooltip-header">
          <h3>{hoveredPlanet}</h3>
          <span 
            className="strength-indicator"
            style={{ backgroundColor: info.strengthColor }}
          >
            Strength: {info.strength}%
          </span>
        </div>
        
        <div className="tooltip-section">
          <h4>Current Position</h4>
          <p>Sign: {info.position.sign}</p>
          <p>Degree: {info.position.degree}°</p>
          <p>House: {info.position.house}</p>
        </div>
        
        <div className="tooltip-section">
          <h4>Strength Periods</h4>
          <p><strong>Next Strong Date:</strong> {info.nextStrongDate.toLocaleDateString()}</p>
          <p><strong>Strong Duration:</strong> {info.strongDuration} days</p>
          <p><strong>Next Weak Date:</strong> {info.nextWeakDate.toLocaleDateString()}</p>
          <p><strong>Weak Duration:</strong> {info.weakDuration} days</p>
        </div>
        
        <div className="tooltip-section">
          <h4>Next Transit</h4>
          <p>{info.nextTransit.toLocaleDateString()}</p>
        </div>
        
        <div className="tooltip-section">
          <h4>Aspects ({info.aspects.length})</h4>
          {info.aspects.length > 0 ? (
            <ul className="aspects-list">
              {info.aspects.map((aspect, idx) => (
                <li key={idx}>
                  <div className="aspect-item">
                    <span className="aspect-name">{aspect.name} with {aspect.withPlanet}</span>
                    <span className="aspect-dates">
                      Exact: {aspect.exactDate.toLocaleDateString()} - 
                      End: {aspect.endDate.toLocaleDateString()}
                    </span>
                    <span className="aspect-duration">
                      Duration: {aspect.duration} days
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No major aspects</p>
          )}
        </div>
      </div>
    );
  };
  
  const renderTransitsPanel = () => {
    return (
      <div className="transits-panel">
        <h3>Upcoming Transits & Conjunctions</h3>
        <div className="transits-list">
          {upcomingTransits.map((transit, idx) => (
            <div key={idx} className="transit-item">
              <div className="transit-date">{transit.date.toLocaleDateString()}</div>
              <div className="transit-description">{transit.description}</div>
              <div className="transit-sign">in {transit.sign}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="app">
      <header className="app-header">
        <h1>🌟 Vedic Astrology Kundali</h1>
        <p>Mundane Astrology Application</p>
      </header>
      
      <div className="main-content">
        <div className="left-panel">
          <div className="birth-details">
            <h3>Birth Details</h3>
            <div className="form-group">
              <label>Date:</label>
              <input
                type="date"
                value={birthDetails.date}
                onChange={(e) => setBirthDetails({...birthDetails, date: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Time:</label>
              <input
                type="time"
                value={birthDetails.time}
                onChange={(e) => setBirthDetails({...birthDetails, time: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Place:</label>
              <input
                type="text"
                value={birthDetails.place}
                onChange={(e) => setBirthDetails({...birthDetails, place: e.target.value})}
              />
            </div>
          </div>
          
          <div className="chart-selector">
            <button
              className={activeChart === 'D1' ? 'active' : ''}
              onClick={() => setActiveChart('D1')}
            >
              D1 Chart
            </button>
            <button
              className={activeChart === 'D9' ? 'active' : ''}
              onClick={() => setActiveChart('D9')}
            >
              D9 Chart
            </button>
          </div>
          
          {renderChart()}
          {renderTooltip()}
        </div>
        
        <div className="right-panel">
          <div className="legend">
            <h3>Planet Strength Legend</h3>
            <div className="legend-item">
              <span className="color-box" style={{ backgroundColor: '#22c55e' }}></span>
              <span>Strong (70%+)</span>
            </div>
            <div className="legend-item">
              <span className="color-box" style={{ backgroundColor: '#eab308' }}></span>
              <span>Medium (50-69%)</span>
            </div>
            <div className="legend-item">
              <span className="color-box" style={{ backgroundColor: '#ef4444' }}></span>
              <span>Weak (&lt;50%)</span>
            </div>
          </div>
          
          <div className="planet-strengths">
            <h3>Planet Strengths</h3>
            <div className="strength-bars">
              {Object.entries(planetAnalysis).map(([planet, info]) => (
                <div key={planet} className="strength-bar-container">
                  <div className="strength-label">{planet}</div>
                  <div className="strength-bar">
                    <div
                      className="strength-fill"
                      style={{ 
                        width: `${info.strength}%`,
                        backgroundColor: info.strengthColor
                      }}
                    ></div>
                  </div>
                  <div className="strength-value">{info.strength}%</div>
                </div>
              ))}
            </div>
          </div>
          
          {renderTransitsPanel()}
        </div>
      </div>
    </div>
  );
}

export default App;
