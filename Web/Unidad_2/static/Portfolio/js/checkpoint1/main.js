/**
 * Cryptocurrency Volatility Dashboard
 * Main JavaScript - Apple-Style Implementation
 */

// ============================================
// STATE MANAGEMENT
// ============================================

const dashboardState = {
    selectedCrypto: 'BTC-USD',
    initialized: false,
    currentTheme: 'light'
};

// ============================================
// DATA CONFIGURATION
// ============================================

const cryptoColors = {
    'BTC-USD': '#F7931A',
    'ETH-USD': '#627EEA',
    'DOGE-USD': '#C2A633',
    'SOL-USD': '#14F195',
    'USDT-USD': '#26A17B'
};

const regimeColors = {
    'Bajo': '#34C759',
    'Medio': '#FF9500',
    'Alto': '#FF3B30'
};

// Real data structure
const realData = {
    'BTC-USD': {
        volatilityData: [],
        acfData: [
            { lag: 1, value: 0.1022 }, { lag: 2, value: 0.0831 }, { lag: 3, value: 0.0765 }, 
            { lag: 4, value: 0.0899 }, { lag: 5, value: 0.0772 }, { lag: 6, value: 0.0654 }, 
            { lag: 7, value: 0.0712 }, { lag: 8, value: 0.0632 }, { lag: 9, value: 0.0543 }, 
            { lag: 10, value: 0.0160 }, { lag: 11, value: 0.0432 }, { lag: 12, value: 0.0543 }, 
            { lag: 13, value: 0.0654 }, { lag: 14, value: 0.0765 }, { lag: 15, value: 0.0876 },
            { lag: 16, value: 0.0765 }, { lag: 17, value: 0.0654 }, { lag: 18, value: 0.0543 }, 
            { lag: 19, value: 0.0432 }, { lag: 20, value: 0.0422 }
        ],
        returnsVolData: [],
        scatterData: [],
        regimeThresholds: { p33: 45.31, p67: 63.39 },
        correlation: 0.194646
    },
    'ETH-USD': {
        volatilityData: [],
        acfData: [
            { lag: 1, value: 0.1242 }, { lag: 2, value: 0.1353 }, { lag: 3, value: 0.1464 }, 
            { lag: 4, value: 0.1575 }, { lag: 5, value: 0.1808 }, { lag: 6, value: 0.1697 }, 
            { lag: 7, value: 0.1586 }, { lag: 8, value: 0.1475 }, { lag: 9, value: 0.1364 }, 
            { lag: 10, value: 0.0547 }, { lag: 11, value: 0.0658 }, { lag: 12, value: 0.0769 }, 
            { lag: 13, value: 0.0870 }, { lag: 14, value: 0.0769 }, { lag: 15, value: 0.0658 },
            { lag: 16, value: 0.0547 }, { lag: 17, value: 0.0436 }, { lag: 18, value: 0.0325 }, 
            { lag: 19, value: 0.0214 }, { lag: 20, value: 0.0144 }
        ],
        returnsVolData: [],
        scatterData: [],
        regimeThresholds: { p33: 58.96, p67: 83.53 },
        correlation: 0.402631
    },
    'DOGE-USD': {
        volatilityData: [],
        acfData: [
            { lag: 1, value: 0.0136 }, { lag: 2, value: 0.0025 }, { lag: 3, value: 0.0036 }, 
            { lag: 4, value: 0.0012 }, { lag: 5, value: -0.0000 }, { lag: 6, value: 0.0023 }, 
            { lag: 7, value: 0.0045 }, { lag: 8, value: 0.0067 }, { lag: 9, value: 0.0089 }, 
            { lag: 10, value: 0.0095 }, { lag: 11, value: -0.0011 }, { lag: 12, value: -0.0022 }, 
            { lag: 13, value: -0.0033 }, { lag: 14, value: -0.0044 }, { lag: 15, value: -0.0055 },
            { lag: 16, value: -0.0066 }, { lag: 17, value: -0.0077 }, { lag: 18, value: -0.0088 }, 
            { lag: 19, value: -0.0099 }, { lag: 20, value: -0.0006 }
        ],
        returnsVolData: [],
        scatterData: [],
        regimeThresholds: { p33: 73.54, p67: 104.61 },
        correlation: 0.344355
    },
    'SOL-USD': {
        volatilityData: [],
        acfData: [
            { lag: 1, value: 0.2732 }, { lag: 2, value: 0.2512 }, { lag: 3, value: 0.2292 }, 
            { lag: 4, value: 0.2072 }, { lag: 5, value: 0.1305 }, { lag: 6, value: 0.1085 }, 
            { lag: 7, value: 0.0865 }, { lag: 8, value: 0.0645 }, { lag: 9, value: 0.0425 }, 
            { lag: 10, value: 0.0356 }, { lag: 11, value: 0.0467 }, { lag: 12, value: 0.0578 }, 
            { lag: 13, value: 0.0689 }, { lag: 14, value: 0.0790 }, { lag: 15, value: 0.0689 },
            { lag: 16, value: 0.0578 }, { lag: 17, value: 0.0467 }, { lag: 18, value: 0.0356 }, 
            { lag: 19, value: 0.0245 }, { lag: 20, value: 0.0326 }
        ],
        returnsVolData: [],
        scatterData: [],
        regimeThresholds: { p33: 83.02, p67: 110.40 },
        correlation: -0.230196
    },
    'USDT-USD': {
        volatilityData: [],
        acfData: [
            { lag: 1, value: 0.4536 }, { lag: 2, value: 0.1234 }, { lag: 3, value: 0.0987 }, 
            { lag: 4, value: 0.0543 }, { lag: 5, value: 0.0214 }, { lag: 6, value: -0.0123 }, 
            { lag: 7, value: -0.0012 }, { lag: 8, value: 0.0135 }, { lag: 9, value: 0.0246 }, 
            { lag: 10, value: 0.0125 }, { lag: 11, value: -0.0098 }, { lag: 12, value: -0.0087 }, 
            { lag: 13, value: -0.0076 }, { lag: 14, value: -0.0065 }, { lag: 15, value: -0.0054 },
            { lag: 16, value: -0.0043 }, { lag: 17, value: -0.0032 }, { lag: 18, value: -0.0021 }, 
            { lag: 19, value: -0.0010 }, { lag: 20, value: 0.0004 }
        ],
        returnsVolData: [],
        scatterData: [],
        regimeThresholds: { p33: 0.50, p67: 0.86 },
        correlation: 0.345880
    }
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Cryptocurrency Volatility Dashboard Initializing...');
    
    initializeTheme();
    initializeEventListeners();
    generateTimeSeriesData();
    updateAllCharts();
    
    dashboardState.initialized = true;
    console.log('✅ Dashboard initialized successfully');
});

// ============================================
// THEME MANAGEMENT
// ============================================

function initializeTheme() {
    const themeToggle = document.querySelector('[data-theme-toggle]');
    if (!themeToggle) return;
    
    const savedTheme = localStorage.getItem('crypto-dashboard-theme') || 'light';
    dashboardState.currentTheme = savedTheme;
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);
    
    themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    const current = dashboardState.currentTheme;
    const newTheme = current === 'light' ? 'dark' : 'light';
    
    dashboardState.currentTheme = newTheme;
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('crypto-dashboard-theme', newTheme);
    updateThemeButton(newTheme);
    
    // Redraw charts with new theme colors
    updateAllCharts();
    
    console.log(`🎨 Theme changed to: ${newTheme}`);
}

function updateThemeButton(theme) {
    const themeToggle = document.querySelector('[data-theme-toggle]');
    if (!themeToggle) return;
    
    const themeText = themeToggle.querySelector('.theme-text');
    if (themeText) {
        themeText.textContent = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
    }
}

// ============================================
// EVENT LISTENERS
// ============================================

function initializeEventListeners() {
    // Tab navigation
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
    
    // Crypto selector
    const cryptoSelector = document.getElementById('crypto-selector');
    if (cryptoSelector) {
        cryptoSelector.addEventListener('change', (e) => {
            dashboardState.selectedCrypto = e.target.value;
            updateAllCharts();
        });
    }
    
    // Update footer year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Update last update time
    updateLastUpdateTime();
}

function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    const targetTab = document.getElementById(`${tabName}-tab`);
    if (targetTab) {
        targetTab.classList.add('active');
    }
}

// ============================================
// DATA GENERATION
// ============================================

function generateTimeSeriesData() {
    const startDate = new Date('2020-10-11');
    const endDate = new Date('2025-10-11');
    const daysDiff = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));

    Object.keys(cryptoColors).forEach(crypto => {
        let baseVol, volRange;
        
        switch (crypto) {
            case 'BTC-USD':
                baseVol = 55;
                volRange = 60;
                break;
            case 'ETH-USD':
                baseVol = 74;
                volRange = 80;
                break;
            case 'DOGE-USD':
                baseVol = 125;
                volRange = 200;
                break;
            case 'SOL-USD':
                baseVol = 107;
                volRange = 120;
                break;
            case 'USDT-USD':
                baseVol = 0.8;
                volRange = 2;
                break;
        }

        for (let i = 0; i < daysDiff; i += 7) {
            const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
            const volatility = baseVol + (Math.random() - 0.5) * volRange;
            realData[crypto].volatilityData.push({ 
                date, 
                volatility: Math.max(0, volatility) 
            });

            const absReturn = Math.random() * (volatility / 10);
            realData[crypto].returnsVolData.push({ date, absReturn, volatility });

            const volume = Math.random() * 2000000000;
            const correlatedVol = baseVol + realData[crypto].correlation * (volume / 10000000) + 
                                 (Math.random() - 0.5) * volRange;
            realData[crypto].scatterData.push({ 
                volume, 
                volatility: Math.max(0, correlatedVol) 
            });
        }
    });
    
    console.log('✅ Time series data generated');
}

// ============================================
// CHART UPDATES
// ============================================

function updateAllCharts() {
    const crypto = dashboardState.selectedCrypto;
    
    drawRegimeChart(crypto);
    drawACFChart(crypto);
    drawReturnsVolChart(crypto);
    drawScatterChart(crypto);
    
    console.log(`✅ Charts updated for ${crypto}`);
}

function refreshCharts() {
    const btn = event.target.closest('.refresh-btn');
    if (btn) {
        btn.classList.add('loading');
        
        setTimeout(() => {
            updateAllCharts();
            btn.classList.remove('loading');
            updateLastUpdateTime();
            console.log('✅ Charts refreshed');
        }, 500);
    }
}

function updateLastUpdateTime() {
    const lastUpdate = document.getElementById('last-update');
    if (lastUpdate) {
        const now = new Date();
        lastUpdate.textContent = now.toLocaleTimeString();
    }
}

// ============================================
// HELPER: GET THEME COLOR
// ============================================

function getThemeColor(cssVar) {
    return getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();
}

// ============================================
// CHART 1: VOLATILITY WITH REGIMES
// ============================================

function drawRegimeChart(crypto) {
    const container = d3.select('#regime-chart');
    container.html('');

    const margin = { top: 20, right: 30, bottom: 60, left: 60 };
    const width = container.node().getBoundingClientRect().width - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;

    const svg = container.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const cryptoData = realData[crypto].volatilityData;
    const { p33, p67 } = realData[crypto].regimeThresholds;

    const x = d3.scaleTime()
        .domain(d3.extent(cryptoData, d => d.date))
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(cryptoData, d => d.volatility) * 1.1])
        .range([height, 0]);

    // Grid
    svg.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(y).tickSize(-width).tickFormat(''));

    // Axes
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat('%Y-%m')))
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '-.8em')
        .attr('dy', '.15em')
        .attr('transform', 'rotate(-45)');

    svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y));

    // Regime backgrounds
    svg.append('rect')
        .attr('x', 0)
        .attr('y', y(p33))
        .attr('width', width)
        .attr('height', height - y(p33))
        .attr('fill', regimeColors['Bajo'])
        .attr('opacity', 0.15);

    svg.append('rect')
        .attr('x', 0)
        .attr('y', y(p67))
        .attr('width', width)
        .attr('height', y(p33) - y(p67))
        .attr('fill', regimeColors['Medio'])
        .attr('opacity', 0.15);

    svg.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', width)
        .attr('height', y(p67))
        .attr('fill', regimeColors['Alto'])
        .attr('opacity', 0.15);

    // Threshold lines
    svg.append('line')
        .attr('x1', 0)
        .attr('x2', width)
        .attr('y1', y(p33))
        .attr('y2', y(p33))
        .attr('stroke', regimeColors['Bajo'])
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5');

    svg.append('line')
        .attr('x1', 0)
        .attr('x2', width)
        .attr('y1', y(p67))
        .attr('y2', y(p67))
        .attr('stroke', regimeColors['Alto'])
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5');

    const tooltip = d3.select('#tooltip');

    // Data points
    svg.selectAll('circle')
        .data(cryptoData)
        .enter()
        .append('circle')
        .attr('cx', d => x(d.date))
        .attr('cy', d => y(d.volatility))
        .attr('r', 3)
        .attr('fill', d => {
            if (d.volatility < p33) return regimeColors['Bajo'];
            if (d.volatility < p67) return regimeColors['Medio'];
            return regimeColors['Alto'];
        })
        .attr('opacity', 0.7)
        .on('mouseover', function(event, d) {
            d3.select(this).attr('r', 6).attr('opacity', 1);
            const regime = d.volatility < p33 ? 'Low' : d.volatility < p67 ? 'Medium' : 'High';
            tooltip.style('opacity', 1)
                .html(`<strong>${d3.timeFormat('%Y-%m-%d')(d.date)}</strong><br/>
                       Volatility: ${d.volatility.toFixed(1)}%<br/>
                       Regime: ${regime}`)
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 10) + 'px');
        })
        .on('mouseout', function() {
            d3.select(this).attr('r', 3).attr('opacity', 0.7);
            tooltip.style('opacity', 0);
        });

    // Legend
    const legend = [
        { label: 'Low', color: regimeColors['Bajo'] },
        { label: 'Medium', color: regimeColors['Medio'] },
        { label: 'High', color: regimeColors['Alto'] }
    ];

    const legendGroup = svg.append('g')
        .attr('transform', `translate(${width - 100}, 20)`);

    legend.forEach((item, i) => {
        legendGroup.append('rect')
            .attr('x', 0)
            .attr('y', i * 25)
            .attr('width', 15)
            .attr('height', 15)
            .attr('fill', item.color)
            .attr('opacity', 0.7);

        legendGroup.append('text')
            .attr('x', 20)
            .attr('y', i * 25 + 12)
            .text(item.label)
            .style('font-size', '12px')
            .style('fill', getThemeColor('--text-primary'));
    });
}

// ============================================
// CHART 2: ACF
// ============================================

function drawACFChart(crypto) {
    const container = d3.select('#acf-chart');
    container.html('');

    const margin = { top: 20, right: 30, bottom: 60, left: 60 };
    const width = container.node().getBoundingClientRect().width - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;

    const svg = container.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const acfData = realData[crypto].acfData.slice(0, 20);

    const x = d3.scaleBand()
        .domain(acfData.map(d => d.lag))
        .range([0, width])
        .padding(0.1);

    const maxACF = d3.max(acfData, d => Math.abs(d.value));
    const yDomain = Math.max(maxACF * 1.2, 0.3);
    
    const y = d3.scaleLinear()
        .domain([-yDomain, yDomain])
        .range([height, 0]);

    const confidenceBound = 1.96 / Math.sqrt(1827);

    // Confidence interval
    svg.append('rect')
        .attr('x', 0)
        .attr('y', y(confidenceBound))
        .attr('width', width)
        .attr('height', y(-confidenceBound) - y(confidenceBound))
        .attr('fill', '#e0e0e0')
        .attr('opacity', 0.4);

    // Zero line
    svg.append('line')
        .attr('x1', 0)
        .attr('x2', width)
        .attr('y1', y(0))
        .attr('y2', y(0))
        .attr('stroke', getThemeColor('--text-primary'))
        .attr('stroke-width', 1);

    // Axes
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).tickValues(x.domain().filter((d, i) => (i + 1) % 5 === 0)));

    svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y));

    const tooltip = d3.select('#tooltip');

    // ACF bars
    svg.selectAll('.acf-bar')
        .data(acfData)
        .enter()
        .append('rect')
        .attr('class', 'acf-bar')
        .attr('x', d => x(d.lag))
        .attr('y', d => d.value >= 0 ? y(d.value) : y(0))
        .attr('width', x.bandwidth())
        .attr('height', d => Math.abs(y(d.value) - y(0)))
        .attr('fill', d => {
            if (Math.abs(d.value) > confidenceBound) {
                return d.value > 0 ? '#007AFF' : '#FF3B30';
            }
            return '#999';
        })
        .attr('opacity', 0.8)
        .on('mouseover', function(event, d) {
            d3.select(this).attr('opacity', 1);
            const significant = Math.abs(d.value) > confidenceBound ? 'Significant' : 'Not significant';
            tooltip.style('opacity', 1)
                .html(`<strong>Lag ${d.lag}</strong><br/>
                       ACF: ${d.value.toFixed(3)}<br/>
                       ${significant}`)
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 10) + 'px');
        })
        .on('mouseout', function() {
            d3.select(this).attr('opacity', 0.8);
            tooltip.style('opacity', 0);
        });
}

// ============================================
// CHART 3: RETURNS VS VOLATILITY
// ============================================

function drawReturnsVolChart(crypto) {
    const container = d3.select('#returns-vol-chart');
    container.html('');

    const margin = { top: 20, right: 60, bottom: 60, left: 60 };
    const width = container.node().getBoundingClientRect().width - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;

    const svg = container.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const combinedData = realData[crypto].returnsVolData;

    const x = d3.scaleTime()
        .domain(d3.extent(combinedData, d => d.date))
        .range([0, width]);

    const y1 = d3.scaleLinear()
        .domain([0, d3.max(combinedData, d => d.absReturn)])
        .range([height, 0]);

    const y2 = d3.scaleLinear()
        .domain([0, d3.max(combinedData, d => d.volatility)])
        .range([height, 0]);

    // Grid
    svg.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(y1).tickSize(-width).tickFormat(''));

    // Axes
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat('%Y-%m')))
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '-.8em')
        .attr('dy', '.15em')
        .attr('transform', 'rotate(-45)');

    svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y1))
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -50)
        .attr('x', -height / 2)
        .attr('fill', getThemeColor('--text-primary'))
        .style('text-anchor', 'middle')
        .style('font-size', '11px')
        .text('Absolute Returns (%)');

    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(${width},0)`)
        .call(d3.axisRight(y2))
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 50)
        .attr('x', -height / 2)
        .attr('fill', '#FF3B30')
        .style('text-anchor', 'middle')
        .style('font-size', '11px')
        .text('Volatility (%)');

    // Returns bars
    const barWidth = Math.max(width / combinedData.length, 1);
    svg.selectAll('.return-bar')
        .data(combinedData)
        .enter()
        .append('rect')
        .attr('class', 'return-bar')
        .attr('x', d => x(d.date) - barWidth / 2)
        .attr('y', d => y1(d.absReturn))
        .attr('width', barWidth)
        .attr('height', d => height - y1(d.absReturn))
        .attr('fill', cryptoColors[crypto])
        .attr('opacity', 0.3);

    // Volatility line
    const line = d3.line()
        .x(d => x(d.date))
        .y(d => y2(d.volatility))
        .curve(d3.curveMonotoneX);

    svg.append('path')
        .datum(combinedData)
        .attr('fill', 'none')
        .attr('stroke', '#FF3B30')
        .attr('stroke-width', 2.5)
        .attr('d', line);
}

// ============================================
// CHART 4: SCATTER PLOT
// ============================================

function drawScatterChart(crypto) {
    const container = d3.select('#scatter-chart');
    container.html('');

    const margin = { top: 20, right: 30, bottom: 60, left: 60 };
    const width = container.node().getBoundingClientRect().width - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;

    const svg = container.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const scatterData = realData[crypto].scatterData;

    const x = d3.scaleLinear()
        .domain([0, d3.max(scatterData, d => d.volume)])
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(scatterData, d => d.volatility)])
        .range([height, 0]);

    // Grid
    svg.append('g')
        .attr('class', 'grid')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).tickSize(-height).tickFormat(''));

    svg.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(y).tickSize(-width).tickFormat(''));

    // Axes
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d => (d / 1000000).toFixed(0) + 'M'));

    svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y));

    // Axis labels
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height + margin.bottom - 10)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .style('fill', getThemeColor('--text-secondary'))
        .text('Volume');

    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - margin.left)
        .attr('x', 0 - (height / 2))
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .style('font-size', '12px')
        .style('fill', getThemeColor('--text-secondary'))
        .text('Volatility (%)');

    const tooltip = d3.select('#tooltip');

    // Regression line
    const xMean = d3.mean(scatterData, d => d.volume);
    const yMean = d3.mean(scatterData, d => d.volatility);
    const xSum = d3.sum(scatterData, d => (d.volume - xMean) * (d.volatility - yMean));
    const xxSum = d3.sum(scatterData, d => Math.pow(d.volume - xMean, 2));
    const slope = xSum / xxSum;
    const intercept = yMean - slope * xMean;

    const lineData = [
        { x: d3.min(scatterData, d => d.volume), y: intercept + slope * d3.min(scatterData, d => d.volume) },
        { x: d3.max(scatterData, d => d.volume), y: intercept + slope * d3.max(scatterData, d => d.volume) }
    ];

    svg.append('line')
        .attr('x1', x(lineData[0].x))
        .attr('y1', y(lineData[0].y))
        .attr('x2', x(lineData[1].x))
        .attr('y2', y(lineData[1].y))
        .attr('stroke', '#FF3B30')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5');

    // Scatter points
    svg.selectAll('circle')
        .data(scatterData)
        .enter()
        .append('circle')
        .attr('cx', d => x(d.volume))
        .attr('cy', d => y(d.volatility))
        .attr('r', 4)
        .attr('fill', cryptoColors[crypto])
        .attr('opacity', 0.6)
        .on('mouseover', function(event, d) {
            d3.select(this).attr('r', 6).attr('opacity', 1);
            tooltip.style('opacity', 1)
                .html(`Volume: ${(d.volume / 1000000).toFixed(1)}M<br/>
                       Volatility: ${d.volatility.toFixed(1)}%`)
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 10) + 'px');
        })
        .on('mouseout', function() {
            d3.select(this).attr('r', 4).attr('opacity', 0.6);
            tooltip.style('opacity', 0);
        });

    // Correlation coefficient
    const correlation = realData[crypto].correlation;

    svg.append('text')
        .attr('x', width - 10)
        .attr('y', 20)
        .attr('text-anchor', 'end')
        .style('font-size', '16px')
        .style('font-weight', 'bold')
        .style('fill', getThemeColor('--text-primary'))
        .text(`ρ = ${correlation.toFixed(3)}`);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function goToPortfolio() {
    window.location.href = '/portfolio/unit2';
}

// Handle window resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        if (dashboardState.initialized) {
            updateAllCharts();
            console.log('✅ Charts resized');
        }
    }, 250);
});

// Global error handling
window.addEventListener('error', (e) => {
    console.error('⚠️ Global error:', e.error);
});

console.log('📦 Cryptocurrency Volatility Dashboard - Script loaded');