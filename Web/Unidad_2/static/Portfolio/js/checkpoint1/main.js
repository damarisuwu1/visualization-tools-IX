/**
 * Cryptocurrency Analytics Dashboard
 * Main JavaScript Implementation
 */

// ============================================
// STATE MANAGEMENT
// ============================================

const dashboardState = {
    currentTheme: 'light',
    initialized: false
};

// ============================================
// DATA CONFIGURATION
// ============================================

// World map engagement data
const worldMapData = {
    countries: [
        { name: 'United States', code: 'USA', engagement: 9200 },
        { name: 'China', code: 'CHN', engagement: 9900 },
        { name: 'Japan', code: 'JPN', engagement: 15000 },
        { name: 'Brazil', code: 'BRA', engagement: 11000 },
        { name: 'Germany', code: 'DEU', engagement: 10000 },
        { name: 'Mexico', code: 'MEX', engagement: 10000 },
        { name: 'India', code: 'IND', engagement: 6000 },
        { name: 'South Korea', code: 'KOR', engagement: 11000 },
        { name: 'Singapore', code: 'SGP', engagement: 7000 },
        { name: 'United Kingdom', code: 'GBR', engagement: 9000 }
    ]
};

// Cross-correlation data
const correlationData = [
    { lag: -52, value: 0.10 }, { lag: -48, value: -0.06 }, { lag: -44, value: -0.02 },
    { lag: -40, value: 0.14 }, { lag: -36, value: 0.10 }, { lag: -32, value: 0.08 },
    { lag: -28, value: -0.05 }, { lag: -24, value: -0.12 }, { lag: -20, value: 0.15 },
    { lag: -16, value: 0.23 }, { lag: -12, value: 0.12 }, { lag: -8, value: 0.11 },
    { lag: -4, value: -0.03 }, { lag: 0, value: -0.10 }, { lag: 4, value: 0.02 },
    { lag: 8, value: -0.06 }, { lag: 12, value: 0.05 }, { lag: 16, value: 0.11 },
    { lag: 20, value: 0.23 }, { lag: 24, value: -0.07 }, { lag: 28, value: -0.14 },
    { lag: 32, value: 0.04 }, { lag: 36, value: 0.06 }, { lag: 40, value: 0.14 },
    { lag: 44, value: -0.07 }, { lag: 48, value: 0.03 }, { lag: 52, value: 0.11 }
];

// Mexico temporal data
const mexicoTemporalData = [
    { date: new Date('2020-10'), interest: 5, btcPrice: 0 },
    { date: new Date('2021-01'), interest: 25, btcPrice: 20 },
    { date: new Date('2021-04'), interest: 75, btcPrice: 35 },
    { date: new Date('2021-07'), interest: 85, btcPrice: 25 },
    { date: new Date('2021-10'), interest: 65, btcPrice: 40 },
    { date: new Date('2022-01'), interest: 40, btcPrice: 30 },
    { date: new Date('2022-04'), interest: 75, btcPrice: 28 },
    { date: new Date('2022-07'), interest: 30, btcPrice: 15 },
    { date: new Date('2022-10'), interest: 25, btcPrice: 12 },
    { date: new Date('2023-01'), interest: 15, btcPrice: 10 },
    { date: new Date('2023-04'), interest: 10, btcPrice: 18 },
    { date: new Date('2023-07'), interest: 10, btcPrice: 20 },
    { date: new Date('2023-10'), interest: 12, btcPrice: 22 },
    { date: new Date('2024-01'), interest: 20, btcPrice: 30 },
    { date: new Date('2024-04'), interest: 38, btcPrice: 48 },
    { date: new Date('2024-07'), interest: 30, btcPrice: 45 },
    { date: new Date('2024-10'), interest: 25, btcPrice: 50 },
    { date: new Date('2025-01'), interest: 35, btcPrice: 75 },
    { date: new Date('2025-04'), interest: 30, btcPrice: 68 },
    { date: new Date('2025-07'), interest: 20, btcPrice: 85 },
    { date: new Date('2025-10'), interest: 15, btcPrice: 95 }
];

// Scatter plot data
const scatterData = [
    { country: 'IN', engagement: 6000, preference: 100.0, size: 15 },
    { country: 'SG', engagement: 7000, preference: 99.1, size: 12 },
    { country: 'GB', engagement: 9000, preference: 97.0, size: 13 },
    { country: 'US', engagement: 9200, preference: 97.8, size: 16 },
    { country: 'CN', engagement: 9900, preference: 99.1, size: 14 },
    { country: 'DE', engagement: 10000, preference: 100.0, size: 13 },
    { country: 'MX', engagement: 10000, preference: 99.5, size: 12 },
    { country: 'BR', engagement: 11000, preference: 100.0, size: 18 },
    { country: 'KR', engagement: 11000, preference: 98.3, size: 14 },
    { country: 'JP', engagement: 15000, preference: 95.5, size: 20 }
];

// Volatility comparison data
const volatilityData = [
    { asset: 'DOGE-USD', volatility: 6.53, color: '#fb923c' },
    { asset: 'SOL-USD', volatility: 5.63, color: '#818cf8' },
    { asset: 'ETH-USD', volatility: 3.87, color: '#34d399' },
    { asset: 'BTC-USD', volatility: 2.92, color: '#fbbf24' },
    { asset: 'USDT-USD', volatility: 0.04, color: '#06b6d4' }
];

// Color scale for engagement
function getEngagementColor(value) {
    const colors = {
        low: '#fef3c7',
        mediumLow: '#fcd34d',
        medium: '#fb923c',
        mediumHigh: '#f472b6',
        high: '#a855f7'
    };
    
    if (value < 7000) return colors.low;
    if (value < 9000) return colors.mediumLow;
    if (value < 10000) return colors.medium;
    if (value < 12000) return colors.mediumHigh;
    return colors.high;
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Dashboard Initializing...');
    
    initializeTheme();
    initializeEventListeners();
    drawAllCharts();
    
    dashboardState.initialized = true;
    console.log('✅ Dashboard initialized');
});

// ============================================
// THEME MANAGEMENT
// ============================================

function initializeTheme() {
    const themeToggle = document.querySelector('[data-theme-toggle]');
    if (!themeToggle) return;
    
    dashboardState.currentTheme = 'light';
    document.documentElement.setAttribute('data-theme', 'light');
    updateThemeButton('light');
    
    themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    const current = dashboardState.currentTheme;
    const newTheme = current === 'light' ? 'dark' : 'light';
    
    dashboardState.currentTheme = newTheme;
    document.documentElement.setAttribute('data-theme', newTheme);
    updateThemeButton(newTheme);
    
    drawAllCharts();
    console.log(`🎨 Theme: ${newTheme}`);
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
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    updateLastUpdateTime();
}

function updateLastUpdateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    
    const lastUpdate = document.getElementById('last-update');
    if (lastUpdate) lastUpdate.textContent = timeString;
    
    const lastUpdateFooter = document.getElementById('last-update-footer');
    if (lastUpdateFooter) lastUpdateFooter.textContent = timeString;
}

function refreshDashboard() {
    const btn = event.target.closest('.refresh-btn');
    if (btn) {
        btn.classList.add('loading');
        
        setTimeout(() => {
            drawAllCharts();
            btn.classList.remove('loading');
            updateLastUpdateTime();
            console.log('✅ Dashboard refreshed');
        }, 500);
    }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function getThemeColor(cssVar) {
    return getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();
}

function drawAllCharts() {
    drawWorldMap();
    drawCorrelationChart();
    drawTemporalChart();
    drawScatterChart();
    drawVolatilityChart();
}

// ============================================
// CHART 1: WORLD MAP
// ============================================

function drawWorldMap() {
    const container = d3.select('#world-map-chart');
    container.html('');
    
    const margin = { top: 20, right: 30, bottom: 20, left: 30 };
    const width = container.node().getBoundingClientRect().width - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    
    const svg = container.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Create simple country boxes (since we can't load topojson in this context)
    const countryBoxes = worldMapData.countries.map((d, i) => ({
        ...d,
        x: (i % 5) * (width / 5),
        y: Math.floor(i / 5) * (height / 2)
    }));
    
    const maxEngagement = d3.max(worldMapData.countries, d => d.engagement);
    const colorScale = d3.scaleLinear()
        .domain([0, maxEngagement])
        .range(['#fef3c7', '#a855f7']);
    
    svg.selectAll('rect')
        .data(countryBoxes)
        .enter()
        .append('rect')
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('width', width / 5 - 10)
        .attr('height', height / 2 - 10)
        .attr('fill', d => colorScale(d.engagement))
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 2)
        .attr('rx', 8)
        .on('mouseover', function(event, d) {
            d3.select(this).attr('stroke-width', 4);
            const tooltip = d3.select('#tooltip');
            tooltip.style('opacity', 1)
                .html(`<strong>${d.name}</strong><br/>Engagement: ${d.engagement.toLocaleString()}`)
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 10) + 'px');
        })
        .on('mouseout', function() {
            d3.select(this).attr('stroke-width', 2);
            d3.select('#tooltip').style('opacity', 0);
        });
    
    svg.selectAll('text')
        .data(countryBoxes)
        .enter()
        .append('text')
        .attr('x', d => d.x + (width / 5 - 10) / 2)
        .attr('y', d => d.y + (height / 2 - 10) / 2)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('font-weight', 'bold')
        .attr('font-size', '14px')
        .attr('fill', d => {
            const rgb = d3.rgb(colorScale(d.engagement));
            return (rgb.r + rgb.g + rgb.b) / 3 > 128 ? '#000' : '#fff';
        })
        .text(d => d.code);
    
    console.log('✅ World map drawn');
}

// ============================================
// CHART 2: CROSS-CORRELATION
// ============================================

function drawCorrelationChart() {
    const container = d3.select('#correlation-chart');
    container.html('');
    
    const margin = { top: 20, right: 30, bottom: 60, left: 60 };
    const width = container.node().getBoundingClientRect().width - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    
    const svg = container.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const x = d3.scaleLinear()
        .domain(d3.extent(correlationData, d => d.lag))
        .range([0, width]);
    
    const y = d3.scaleLinear()
        .domain([-0.3, 0.3])
        .range([height, 0]);
    
    // Grid
    svg.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(y).tickSize(-width).tickFormat(''));
    
    // Axes
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d => d === 0 ? 'Now' : d + 'w'));
    
    svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y));
    
    // Confidence bounds
    svg.append('line')
        .attr('x1', 0)
        .attr('x2', width)
        .attr('y1', y(0.15))
        .attr('y2', y(0.15))
        .attr('stroke', '#dc2626')
        .attr('stroke-dasharray', '5,5')
        .attr('stroke-width', 2);
    
    svg.append('line')
        .attr('x1', 0)
        .attr('x2', width)
        .attr('y1', y(-0.15))
        .attr('y2', y(-0.15))
        .attr('stroke', '#dc2626')
        .attr('stroke-dasharray', '5,5')
        .attr('stroke-width', 2);
    
    svg.append('line')
        .attr('x1', 0)
        .attr('x2', width)
        .attr('y1', y(0))
        .attr('y2', y(0))
        .attr('stroke', '#6b7280')
        .attr('stroke-width', 1);
    
    // Line
    const line = d3.line()
        .x(d => x(d.lag))
        .y(d => y(d.value))
        .curve(d3.curveMonotoneX);
    
    svg.append('path')
        .datum(correlationData)
        .attr('fill', 'none')
        .attr('stroke', '#2563eb')
        .attr('stroke-width', 2.5)
        .attr('d', line);
    
    // Points
    svg.selectAll('circle')
        .data(correlationData)
        .enter()
        .append('circle')
        .attr('cx', d => x(d.lag))
        .attr('cy', d => y(d.value))
        .attr('r', 3)
        .attr('fill', '#2563eb')
        .attr('opacity', 0.6)
        .on('mouseover', function(event, d) {
            d3.select(this).attr('r', 6).attr('opacity', 1);
            const tooltip = d3.select('#tooltip');
            tooltip.style('opacity', 1)
                .html(`<strong>Lag: ${d.lag} weeks</strong><br/>Correlation: ${d.value.toFixed(3)}`)
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 10) + 'px');
        })
        .on('mouseout', function() {
            d3.select(this).attr('r', 3).attr('opacity', 0.6);
            d3.select('#tooltip').style('opacity', 0);
        });
    
    console.log('✅ Correlation chart drawn');
}

// ============================================
// CHART 3: MEXICO TEMPORAL
// ============================================

function drawTemporalChart() {
    const container = d3.select('#temporal-chart');
    container.html('');
    
    const margin = { top: 20, right: 60, bottom: 60, left: 60 };
    const width = container.node().getBoundingClientRect().width - margin.left - margin.right;
    const height = 450 - margin.top - margin.bottom;
    
    const svg = container.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const x = d3.scaleTime()
        .domain(d3.extent(mexicoTemporalData, d => d.date))
        .range([0, width]);
    
    const y1 = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);
    
    const y2 = d3.scaleLinear()
        .domain([0, 100])
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
        .attr('transform', 'rotate(-45)');
    
    svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y1))
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - margin.left)
        .attr('x', 0 - (height / 2))
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .style('font-size', '12px')
        .attr('fill', getThemeColor('--text-secondary'))
        .text('Interest (0-100)');
    
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(${width},0)`)
        .call(d3.axisRight(y2));
    
    // Line - Interest
    const line1 = d3.line()
        .x(d => x(d.date))
        .y(d => y1(d.interest))
        .curve(d3.curveMonotoneX);
    
    svg.append('path')
        .datum(mexicoTemporalData)
        .attr('fill', 'none')
        .attr('stroke', '#06b6d4')
        .attr('stroke-width', 3)
        .attr('d', line1);
    
    // Line - BTC Price
    const line2 = d3.line()
        .x(d => x(d.date))
        .y(d => y2(d.btcPrice))
        .curve(d3.curveMonotoneX);
    
    svg.append('path')
        .datum(mexicoTemporalData)
        .attr('fill', 'none')
        .attr('stroke', '#6b7280')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5')
        .attr('d', line2);
    
    console.log('✅ Temporal chart drawn');
}

// ============================================
// CHART 4: SCATTER PLOT
// ============================================

function drawScatterChart() {
    const container = d3.select('#scatter-chart');
    container.html('');
    
    const margin = { top: 20, right: 30, bottom: 60, left: 60 };
    const width = container.node().getBoundingClientRect().width - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    
    const svg = container.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const x = d3.scaleLinear()
        .domain([5000, 16000])
        .range([0, width]);
    
    const y = d3.scaleLinear()
        .domain([94, 101])
        .range([height, 0]);
    
    // Grid
    svg.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(y).tickSize(-width).tickFormat(''));
    
    // Axes
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d => (d / 1000) + 'K'));
    
    svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y));
    
    // Axis labels
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height + margin.bottom - 10)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .attr('fill', getThemeColor('--text-secondary'))
        .text('Engagement Score');
    
    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - margin.left)
        .attr('x', 0 - (height / 2))
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .style('font-size', '12px')
        .attr('fill', getThemeColor('--text-secondary'))
        .text('Volatility Preference (%)');
    
    // Bubbles
    svg.selectAll('circle')
        .data(scatterData)
        .enter()
        .append('circle')
        .attr('cx', d => x(d.engagement))
        .attr('cy', d => y(d.preference))
        .attr('r', d => d.size)
        .attr('fill', (d, i) => {
            const colors = ['#f97316', '#a855f7', '#8b5cf6', '#eab308', '#ef4444', 
                          '#22c55e', '#06b6d4', '#3b82f6', '#ec4899', '#14b8a6'];
            return colors[i];
        })
        .attr('opacity', 0.7)
        .on('mouseover', function(event, d) {
            d3.select(this).attr('opacity', 1).attr('stroke', '#000').attr('stroke-width', 2);
            const tooltip = d3.select('#tooltip');
            tooltip.style('opacity', 1)
                .html(`<strong>${d.country}</strong><br/>Engagement: ${d.engagement}<br/>Preference: ${d.preference}%`)
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 10) + 'px');
        })
        .on('mouseout', function() {
            d3.select(this).attr('opacity', 0.7).attr('stroke', 'none');
            d3.select('#tooltip').style('opacity', 0);
        });
    
    console.log('✅ Scatter chart drawn');
}

// ============================================
// CHART 5: VOLATILITY COMPARISON
// ============================================

function drawVolatilityChart() {
    const container = d3.select('#volatility-chart');
    container.html('');
    
    const margin = { top: 20, right: 30, bottom: 60, left: 100 };
    const width = container.node().getBoundingClientRect().width - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    
    const svg = container.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const x = d3.scaleLinear()
        .domain([0, 7])
        .range([0, width]);
    
    const y = d3.scaleBand()
        .domain(volatilityData.map(d => d.asset))
        .range([height, 0])
        .padding(0.3);
    
    // Grid
    svg.append('g')
        .attr('class', 'grid')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).tickSize(-height).tickFormat(''));
    
    // Axes
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));
    
    svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y));
    
    // Bars
    svg.selectAll('rect')
        .data(volatilityData)
        .enter()
        .append('rect')
        .attr('x', 0)
        .attr('y', d => y(d.asset))
        .attr('width', d => x(d.volatility))
        .attr('height', y.bandwidth())
        .attr('fill', d => d.color)
        .attr('opacity', 0.8)
        .attr('rx', 4)
        .on('mouseover', function(event, d) {
            d3.select(this).attr('opacity', 1);
            const tooltip = d3.select('#tooltip');
            tooltip.style('opacity', 1)
                .html(`<strong>${d.asset}</strong><br/>Volatility: ${d.volatility}%`)
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 10) + 'px');
        })
        .on('mouseout', function() {
            d3.select(this).attr('opacity', 0.8);
            d3.select('#tooltip').style('opacity', 0);
        });
    
    // Labels
    svg.selectAll('.vol-label')
        .data(volatilityData)
        .enter()
        .append('text')
        .attr('class', 'vol-label')
        .attr('x', d => x(d.volatility) + 5)
        .attr('y', d => y(d.asset) + y.bandwidth() / 2)
        .attr('dominant-baseline', 'middle')
        .style('font-size', '12px')
        .style('font-weight', 'bold')
        .attr('fill', getThemeColor('--text-primary'))
        .text(d => d.volatility + '%');
    
    console.log('✅ Volatility chart drawn');
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function goToPortfolio() {
    window.location.href = '/unidad2/portafolio';
}

// Handle window resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        if (dashboardState.initialized) {
            drawAllCharts();
            console.log('✅ Charts resized');
        }
    }, 250);
});

console.log('📦 Dashboard Script Loaded');