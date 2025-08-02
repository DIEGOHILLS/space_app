// JavaScript for Planets page

document.addEventListener('DOMContentLoaded', function() {
    const controlBtns = document.querySelectorAll('.control-btn');
    const planetOrbits = document.querySelectorAll('.planet-orbit');
    const infoCards = document.querySelectorAll('.info-card');
    const planetDetails = document.getElementById('planet-details');

    // Planet data
    const planetData = {
        mercury: {
            name: 'Mercury',
            description: 'Mercury is the smallest planet in our solar system and the closest to the Sun. It has extreme temperature variations, with daytime temperatures reaching 427°C and nighttime temperatures dropping to -173°C.',
            facts: [
                'No atmosphere to retain heat',
                'One day lasts 176 Earth days',
                'Heavily cratered surface',
                'No moons or rings'
            ],
            distance: '58.6 million km from Sun',
            year: '88 Earth days',
            color: '#8c7853'
        },
        venus: {
            name: 'Venus',
            description: 'Venus is the hottest planet in our solar system due to its thick atmosphere that traps heat. It rotates backwards compared to most planets and has a day longer than its year.',
            facts: [
                'Surface temperature: 462°C',
                'Atmospheric pressure 90x Earth',
                'Rotates backwards (retrograde)',
                'Volcanic surface features'
            ],
            distance: '108.2 million km from Sun',
            year: '225 Earth days',
            color: '#ffc649'
        },
        earth: {
            name: 'Earth',
            description: 'Earth is the only known planet with life. It has the perfect conditions including liquid water, a protective atmosphere, and a suitable distance from the Sun.',
            facts: [
                '71% of surface covered by water',
                'Only planet with known life',
                'Protective magnetic field',
                'One natural satellite (Moon)'
            ],
            distance: '149.6 million km from Sun',
            year: '365.25 days',
            color: '#6b93d6'
        },
        mars: {
            name: 'Mars',
            description: 'Mars, the Red Planet, is a cold desert world with the largest volcano in the solar system. Evidence suggests it once had liquid water flowing on its surface.',
            facts: [
                'Home to Olympus Mons volcano',
                'Polar ice caps of water and CO2',
                'Dust storms can cover entire planet',
                'Two small moons: Phobos and Deimos'
            ],
            distance: '227.9 million km from Sun',
            year: '687 Earth days',
            color: '#c1440e'
        },
        jupiter: {
            name: 'Jupiter',
            description: 'Jupiter is the largest planet in our solar system, a gas giant with a Great Red Spot storm that has been raging for centuries. It acts as a cosmic vacuum cleaner, protecting inner planets.',
            facts: [
                'More massive than all other planets combined',
                'Great Red Spot is a giant storm',
                'At least 79 known moons',
                'Made mostly of hydrogen and helium'
            ],
            distance: '778.5 million km from Sun',
            year: '12 Earth years',
            color: '#d8ca9d'
        },
        saturn: {
            name: 'Saturn',
            description: 'Saturn is famous for its spectacular ring system made of ice and rock particles. It is less dense than water and has at least 82 known moons.',
            facts: [
                'Spectacular ring system',
                'Less dense than water',
                'At least 82 known moons',
                'Hexagonal storm at north pole'
            ],
            distance: '1.43 billion km from Sun',
            year: '29 Earth years',
            color: '#fab27b'
        },
        uranus: {
            name: 'Uranus',
            description: 'Uranus is an ice giant that rotates on its side, possibly due to an ancient collision. It has a faint ring system and extreme seasonal variations.',
            facts: [
                'Rotates on its side (98° tilt)',
                'Made of water, methane, and ammonia',
                'Faint ring system',
                'Extreme seasonal variations'
            ],
            distance: '2.87 billion km from Sun',
            year: '84 Earth years',
            color: '#4fd0e7'
        },
        neptune: {
            name: 'Neptune',
            description: 'Neptune is the windiest planet with wind speeds reaching up to 2,100 km/h. It is a cold, dark world at the edge of our solar system.',
            facts: [
                'Windiest planet (2,100 km/h winds)',
                'Deep blue color from methane',
                'Coldest temperatures in solar system',
                'Takes 165 Earth years to orbit Sun'
            ],
            distance: '4.5 billion km from Sun',
            year: '165 Earth years',
            color: '#4b70dd'
        }
    };

    // Handle control button clicks
    controlBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const planet = this.dataset.planet;
            
            // Update active button
            controlBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            if (planet === 'all') {
                showAllPlanets();
            } else {
                focusOnPlanet(planet);
            }
        });
    });

    // Handle planet orbit clicks
    planetOrbits.forEach(orbit => {
        orbit.addEventListener('click', function() {
            const planet = this.dataset.planet;
            if (planet) {
                focusOnPlanet(planet);
                // Update control button
                controlBtns.forEach(btn => btn.classList.remove('active'));
                const controlBtn = document.querySelector(`[data-planet="${planet}"]`);
                if (controlBtn) controlBtn.classList.add('active');
            }
        });
    });

    // Handle info card clicks
    infoCards.forEach(card => {
        card.addEventListener('click', function() {
            const planet = this.dataset.planet;
            if (planet) {
                focusOnPlanet(planet);
                // Update control button
                controlBtns.forEach(btn => btn.classList.remove('active'));
                const controlBtn = document.querySelector(`[data-planet="${planet}"]`);
                if (controlBtn) controlBtn.classList.add('active');
                
                // Scroll to solar system
                document.querySelector('.solar-system').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        });
    });

    function showAllPlanets() {
        planetOrbits.forEach(orbit => {
            orbit.style.opacity = '1';
            orbit.style.transform = 'scale(1)';
        });
        
        // Show default info
        showPlanetInfo();
    }

    function focusOnPlanet(planetName) {
        planetOrbits.forEach(orbit => {
            if (orbit.dataset.planet === planetName) {
                orbit.style.opacity = '1';
                orbit.style.transform = 'scale(1.5)';
                orbit.style.zIndex = '10';
            } else {
                orbit.style.opacity = '0.3';
                orbit.style.transform = 'scale(0.8)';
                orbit.style.zIndex = '1';
            }
        });
        
        showPlanetInfo(planetName);
    }

    function showPlanetInfo(planetName = null) {
        if (!planetDetails) return;
        
        if (!planetName) {
            planetDetails.innerHTML = `
                <div class="planet-card" id="default-info">
                    <h2>Our Solar System</h2>
                    <p>Click on any planet above or use the controls to learn more about each world in our solar system. Each planet has unique characteristics that make it fascinating to explore!</p>
                </div>
            `;
            return;
        }
        
        const planet = planetData[planetName];
        if (!planet) return;
        
        planetDetails.innerHTML = `
            <div class="planet-card active" style="border-left: 4px solid ${planet.color}">
                <div class="planet-header">
                    <div class="planet-icon-large" style="background: radial-gradient(circle at 30% 30%, ${planet.color}, ${adjustBrightness(planet.color, -20)})"></div>
                    <div class="planet-title">
                        <h2>${planet.name}</h2>
                        <div class="planet-stats-inline">
                            <span class="stat-pill">${planet.distance}</span>
                            <span class="stat-pill">${planet.year}</span>
                        </div>
                    </div>
                </div>
                <p class="planet-description">${planet.description}</p>
                <div class="planet-facts">
                    <h4>Key Facts:</h4>
                    <ul class="facts-list">
                        ${planet.facts.map(fact => `<li>${fact}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        // Add animation
        const planetCard = planetDetails.querySelector('.planet-card');
        planetCard.style.opacity = '0';
        planetCard.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            planetCard.style.opacity = '1';
            planetCard.style.transform = 'translateY(0)';
        }, 100);
    }

    function adjustBrightness(hex, percent) {
        // Remove # if present
        hex = hex.replace('#', '');
        
        // Parse r, g, b values
        const num = parseInt(hex, 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        
        return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }

    // Add styles for planet info cards
    if (!document.querySelector('.planet-info-styles')) {
        const styles = document.createElement('style');
        styles.className = 'planet-info-styles';
        styles.innerHTML = `
            .planet-card {
                background: rgba(99, 102, 241, 0.05);
                border: 1px solid rgba(99, 102, 241, 0.2);
                border-radius: 16px;
                padding: 2rem;
                transition: all 0.3s ease;
            }
            
            .planet-card.active {
                background: rgba(99, 102, 241, 0.1);
                box-shadow: 0 10px 30px rgba(99, 102, 241, 0.2);
            }
            
            .planet-header {
                display: flex;
                align-items: center;
                gap: 1.5rem;
                margin-bottom: 1.5rem;
            }
            
            .planet-icon-large {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
            }
            
            .planet-title h2 {
                font-family: 'Orbitron', monospace;
                font-size: 2rem;
                margin-bottom: 0.5rem;
                color: var(--text-light);
            }
            
            .planet-stats-inline {
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
            }
            
            .stat-pill {
                background: rgba(99, 102, 241, 0.2);
                color: var(--primary-color);
                padding: 0.25rem 0.75rem;
                border-radius: 20px;
                font-size: 0.9rem;
                font-weight: 500;
            }
            
            .planet-description {
                color: var(--text-gray);
                line-height: 1.7;
                margin-bottom: 1.5rem;
                font-size: 1.1rem;
            }
            
            .planet-facts h4 {
                font-family: 'Orbitron', monospace;
                color: var(--text-light);
                margin-bottom: 1rem;
            }
            
            .facts-list {
                list-style: none;
                padding: 0;
            }
            
            .facts-list li {
                color: var(--text-gray);
                padding: 0.5rem 0;
                border-bottom: 1px solid rgba(99, 102, 241, 0.1);
                position: relative;
                padding-left: 1.5rem;
            }
            
            .facts-list li::before {
                content: '✦';
                color: var(--primary-color);
                position: absolute;
                left: 0;
                top: 0.5rem;
            }
            
            .facts-list li:last-child {
                border-bottom: none;
            }
            
            @media (max-width: 768px) {
                .planet-header {
                    flex-direction: column;
                    text-align: center;
                }
                
                .planet-stats-inline {
                    justify-content: center;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    // Add hover effects to planet orbits
    planetOrbits.forEach(orbit => {
        orbit.addEventListener('mouseenter', function() {
            this.style.boxShadow = `0 0 20px ${planetData[this.dataset.planet]?.color || '#fff'}`;
        });
        
        orbit.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });

    // Initialize with all planets visible
    showAllPlanets();
});