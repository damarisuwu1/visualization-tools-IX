/**
 * Cryptocurrency Spatio-Temporal Dashboard
 * Main JavaScript for D3.js visualizations and data management
 */

// Application State
const dashboardState = {
    selectedCrypto: 'all',
    timeRange: '7d',
    data: {},
    initialized: false,
    charts: {}
};

// Simulated API Data (replace with actual Flask endpoint)
const simulatedData = {
    globalMetrics: {
        marketCap: '$2,150,000,000,000',
        volume24h: '$98,200,000,000',
        dominantCurrency: 'Bitcoin',
        activeWallets: '42,300,000'
    },
    cryptocurrencies: [
        { rank: 1, name: 'Bitcoin', symbol: 'BTC', price: '$43,250.50', marketCap: '$840B', change24h: 12.5, volume: '$25.6B' },
        { rank: 2, name: 'Ethereum', symbol: 'ETH', price: '$2,156.30', marketCap: '$259B', change24h: 8.3, volume: '$12.3B' },
        { rank: 3, name: 'Ripple', symbol: 'XRP', price: '$0.58', marketCap: '$31B', change24h: -2.1, volume: '$2.8B' },
        { rank: 4, name: 'Litecoin', symbol: 'LTC', price: '$145.20', marketCap: '$14B', change24h: 5.7, volume: '$1.2B' },
        { rank: 5, name: 'Cardano', symbol: 'ADA', price: '$0.95', marketCap: '$33B', change24h: 3.2, volume: '$1.5B' },
        { rank: 6, name: 'Polkadot', symbol: 'DOT', price: '$8.45', marketCap: '$12.5B', change24h: 6.8, volume: '$0.9B' },
        { rank: 7, name: 'Solana', symbol: 'SOL', price: '$125.60', marketCap: '$42B', change24h: 15.3, volume: '$2.1B' },
        { rank: 8, name: 'Avalanche', symbol: 'AVAX', price: '$85.30', marketCap: '$25B', change24h: 9.2, volume: '$1.8B' },
        { rank: 9, name: 'Polygon', symbol: 'MATIC', price: '$1.35', marketCap: '$12B', change24h: -1.5, volume: '$0.8B' },
        { rank: 10, name: 'Chainlink', symbol: 'LINK', price: '$18.75', marketCap: '$9B', change24h: 4.6, volume: '$0.6B' }
    ],
    priceHistory: generatePriceHistory(),
    regionalData: [
        { region: 'North America', volume: 35, wallets: 15.2, activity: 92 },
        { region: 'Europe', volume: 28, wallets: 12.1, activity: 87 },
        { region: 'Asia Pacific', volume: 32, wallets: 18.3, activity: 95 },
        { region: 'South America', volume: 3, wallets: 1.8, activity: 58 },
        { region: 'Africa', volume: 2, wallets: 0.9, activity: 45 }
    ]
};

// Generate price history data
function generatePriceHistory() {
    const data = [];
    const now = new Date();
    for (let i = 30; i >= 0; i--) {
        data.push({
            date: new Date(now.getTime() - i * 24 * 60 * 60 * 1000),
            btc: 40000 + Math.random() * 8000,
            eth: 2000 + Math.random() * 400,
            xrp: 0.5 + Math.random() * 0.3
        });
    }
    return data;
}

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Cryptocurrency Dashboard Initializing...');
    
    initializeTheme();
    loadDashboardData();
    initializeEventListeners();
    renderAllVisualizations();
    
    dashboardState.initialized = true;
    console.log('✅ Dashboard initialized successfully');
});

// Fetch data from API (currently using simulated data)
function loadDashboardData() {
    // Replace this with actual Flask endpoint
    // fetch('/api/crypto-data')
    //     .then(response => response.json())
    //     .then(data => {
    //         dashboardState.data = data;
    //         renderAllVisualizations();
    //     })
    //     .catch(error => console.error('Error fetching data:', error));
    
    // Using simulated data for now
    dashboardState.data = simulatedData;
    updateKPICards();
    updateCryptoTable();
    console.log('✅ Data loaded');
}

// Initialize Event Listeners
function initializeEventListeners() {
    const cryptoSelect = document.getElementById('crypto-select');
    const timeRange = document.getElementById('time-range');
    
    if (cryptoSelect) {
        cryptoSelect.addEventListener('change', (e) => {
            dashboardState.selectedCrypto = e.target.value;
            renderAllVisualizations();
        });
    }
    
    if (timeRange) {
        timeRange.addEventListener('change', (e) => {
            dashboardState.timeRange = e.target.value;
            renderAllVisualizations();
        });
    }
    
    // Update year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Set data count
    const dataCount = document.getElementById('data-count');
    if (dataCount && simulatedData.cryptocurrencies) {
        dataCount.textContent = `${simulatedData.cryptocurrencies.length} Cryptocurrencies`;
    }
}

// Render all visualizations
function renderAllVisualizations() {
    renderWorldMap();
    renderPriceChart();
    renderMarketShareChart();
    renderVolumeChart();
    renderVolatilityHeatmap();
}

// ============================================
// UPDATE KPI CARDS
// ============================================
function updateKPICards() {
    const data = dashboardState.data.globalMetrics;
    
    const marketCapEl = document.getElementById('market-cap');
    const volume24hEl = document.getElementById('volume-24h');
    const dominantEl = document.getElementById('dominant-currency');
    const walletsEl = document.getElementById('active-wallets');
    
    if (marketCapEl) marketCapEl.textContent = data.marketCap;
    if (volume24hEl) volume24hEl.textContent = data.volume24h;
    if (dominantEl) dominantEl.textContent = data.dominantCurrency;
    if (walletsEl) walletsEl.textContent = data.activeWallets;
}

// ============================================
// WORLD MAP WITH D3.js
// ============================================
function renderWorldMap() {
    const svg = d3.select('#world-map');
    if (svg.empty()) return;
    
    // Clear previous content
    svg.selectAll('*').remove();
    
    const width = svg.node().parentElement.clientWidth;
    const height = 500;
    
    svg.attr('width', width).attr('height', height);
    
    const projection = d3.geoMercator()
        .translate([width / 2, height / 2])
        .scale(150);
    
    const path = d3.geoPath().projection(projection);
    
    // Create tooltip
    const tooltip = d3.select('body').append('div')
        .attr('class', 'map-tooltip')
        .style('position', 'absolute')
        .style('background', 'rgba(0, 0, 0, 0.8)')
        .style('color', 'white')
        .style('padding', '8px 12px')
        .style('border-radius', '6px')
        .style('font-size', '12px')
        .style('pointer-events', 'none')
        .style('display', 'none');
    
    // Fetch world data
    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
        .then(world => {
            const countries = topojson.feature(world, world.objects.countries).features;
            
            // Create color scale
            const colorScale = d3.scaleLinear()
                .domain([0, 100])
                .range(['#fee5d9', '#cb181d']);
            
            // Map regions to activity levels
            const regionActivity = {
                'United States': 92,
                'China': 85,
                'Japan': 88,
                'Germany': 87,
                'United Kingdom': 86,
                'Singapore': 90,
                'South Korea': 89,
                'India': 82,
                'Brazil': 70,
                'Australia': 85
            };
            
            svg.selectAll('.country')
                .data(countries)
                .enter()
                .append('path')
                .attr('class', 'country')
                .attr('d', path)
                .attr('fill', (d) => {
                    const activity = regionActivity[d.properties.name] || Math.random() * 60;
                    return colorScale(activity);
                })
                .attr('stroke', 'white')
                .attr('stroke-width', 0.5)
                .on('mouseover', function(event, d) {
                    const activity = regionActivity[d.properties.name] || 'Unknown';
                    tooltip.style('display', 'block')
                        .html(`<strong>${d.properties.name}</strong><br>Activity: ${activity}%`)
                        .style('left', (event.pageX + 10) + 'px')
                        .style('top', (event.pageY - 28) + 'px');
                    d3.select(this).attr('stroke-width', 2).attr('stroke', '#8b5cf6');
                })
                .on('mouseout', function() {
                    tooltip.style('display', 'none');
                    d3.select(this).attr('stroke-width', 0.5).attr('stroke', 'white');
                });
        })
        .catch(error => console.error('Error loading world map:', error));
    
    console.log('✅ World map rendered');
}

// ============================================
// PRICE CHART WITH CHART.JS
// ============================================
function renderPriceChart() {
    const ctx = document.getElementById('price-chart');
    if (!ctx) return;
    
    const data = dashboardState.data.priceHistory;
    
    // Destroy existing chart if it exists
    if (dashboardState.charts.priceChart) {
        dashboardState.charts.priceChart.destroy();
    }
    
    const chartData = {
        labels: data.map(d => d.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
        datasets: [
            {
                label: 'Bitcoin (BTC)',
                data: data.map(d => d.btc),
                borderColor: '#f7931a',
                backgroundColor: 'rgba(247, 147, 26, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 2,
                pointRadius: 0,
                pointHoverRadius: 6
            },
            {
                label: 'Ethereum (ETH)',
                data: data.map(d => d.eth),
                borderColor: '#627eea',
                backgroundColor: 'rgba(98, 126, 234, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 2,
                pointRadius: 0,
                pointHoverRadius: 6
            },
            {
                label: 'Ripple (XRP)',
                data: data.map(d => d.xrp * 1000),
                borderColor: '#23292f',
                backgroundColor: 'rgba(35, 41, 47, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 2,
                pointRadius: 0,
                pointHoverRadius: 6
            }
        ]
    };
    
    dashboardState.charts.priceChart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: { size: 12, weight: 'bold' }
                    }
                },
                filler: {
                    propagate: true
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: { color: 'rgba(0, 0, 0, 0.05)' }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
    
    console.log('✅ Price chart rendered');
}

// ============================================
// MARKET SHARE PIE CHART
// ============================================
function renderMarketShareChart() {
    const ctx = document.getElementById('market-share-chart');
    if (!ctx) return;
    
    const data = dashboardState.data.cryptocurrencies.slice(0, 6);
    
    if (dashboardState.charts.marketShareChart) {
        dashboardState.charts.marketShareChart.destroy();
    }
    
    const chartData = {
        labels: data.map(d => d.symbol),
        datasets: [{
            data: [42, 19, 5, 3, 3, 2],
            backgroundColor: [
                '#f7931a',
                '#627eea',
                '#00aa6d',
                '#8b5cf6',
                '#f59e0b',
                '#3b82f6'
            ],
            borderColor: '#ffffff',
            borderWidth: 2
        }]
    };
    
    dashboardState.charts.marketShareChart = new Chart(ctx, {
        type: 'doughnut',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: { size: 11 }
                    }
                }
            }
        }
    });
    
    console.log('✅ Market share chart rendered');
}

// ============================================
// VOLUME BY REGION CHART
// ============================================
function renderVolumeChart() {
    const ctx = document.getElementById('volume-chart');
    if (!ctx) return;
    
    const data = dashboardState.data.regionalData;
    
    if (dashboardState.charts.volumeChart) {
        dashboardState.charts.volumeChart.destroy();
    }
    
    const chartData = {
        labels: data.map(d => d.region),
        datasets: [{
            label: 'Trading Volume (%)',
            data: data.map(d => d.volume),
            backgroundColor: [
                'rgba(139, 92, 246, 0.8)',
                'rgba(59, 130, 246, 0.8)',
                'rgba(34, 197, 94, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(239, 68, 68, 0.8)'
            ],
            borderColor: [
                '#8b5cf6',
                '#3b82f6',
                '#22c55e',
                '#f59e0b',
                '#ef4444'
            ],
            borderWidth: 2
        }]
    };
    
    dashboardState.charts.volumeChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 40
                }
            }
        }
    });
    
    console.log('✅ Volume chart rendered');
}

// ============================================
// VOLATILITY HEATMAP
// ============================================
function renderVolatilityHeatmap() {
    const container = document.getElementById('volatility-heatmap');
    if (!container) return;
    
    container.innerHTML = '';
    
    const cryptocurrencies = dashboardState.data.cryptocurrencies.slice(0, 5).map(c => c.symbol);
    const timeSlots = ['00:00', '06:00', '12:00', '18:00'];
    
    // Generate volatility data
    const volatilityData = cryptocurrencies.map(crypto => {
        return timeSlots.map(time => Math.random() * 100);
    });
    
    const heatmap = document.createElement('div');
    heatmap.className = 'heatmap';
    
    volatilityData.forEach((row, rowIdx) => {
        const heatmapRow = document.createElement('div');
        heatmapRow.className = 'heatmap-row';
        
        const label = document.createElement('span');
        label.className = 'heatmap-label';
        label.textContent = cryptocurrencies[rowIdx];
        heatmapRow.appendChild(label);
        
        row.forEach((value, colIdx) => {
            const cell = document.createElement('div');
            cell.className = 'heatmap-cell';
            
            // Color scale
            const intensity = value / 100;
            const hue = (1 - intensity) * 240;
            const saturation = intensity * 100;
            cell.style.backgroundColor = `hsl(${hue}, ${saturation}%, 50%)`;
            
            cell.title = `${value.toFixed(1)}% volatility at ${timeSlots[colIdx]}`;
            cell.addEventListener('mouseenter', function() {
                const tooltip = document.createElement('div');
                tooltip.style.position = 'absolute';
                tooltip.style.background = 'rgba(0, 0, 0, 0.8)';
                tooltip.style.color = 'white';
                tooltip.style.padding = '8px 12px';
                tooltip.style.borderRadius = '6px';
                tooltip.style.fontSize = '12px';
                tooltip.textContent = `${value.toFixed(1)}%`;
                this.appendChild(tooltip);
            });
        });
        
        heatmap.appendChild(heatmapRow);
    });
    
    container.appendChild(heatmap);
    console.log('✅ Volatility heatmap rendered');
}

// ============================================
// UPDATE CRYPTO TABLE
// ============================================
function updateCryptoTable() {
    const tbody = document.getElementById('crypto-table-body');
    if (!tbody) return;
    
    const cryptos = dashboardState.data.cryptocurrencies;
    
    tbody.innerHTML = cryptos.map(crypto => `
        <tr>
            <td class="crypto-rank">#${crypto.rank}</td>
            <td><strong>${crypto.name}</strong></td>
            <td class="crypto-symbol">${crypto.symbol}</td>
            <td><strong>${crypto.price}</strong></td>
            <td>${crypto.marketCap}</td>
            <td class="crypto-change-${crypto.change24h >= 0 ? 'positive' : 'negative'}">
                ${crypto.change24h >= 0 ? '↑' : '↓'} ${Math.abs(crypto.change24h)}%
            </td>
            <td>${crypto.volume}</td>
        </tr>
    `).join('');
    
    console.log('✅ Crypto table updated');
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Go back to portfolio
function goToPortfolio() {
    window.location.href = '/portfolio/unit2';
}

// Refresh data
function refreshData() {
    const btn = event.target.closest('.refresh-btn');
    if (btn) {
        btn.classList.add('loading');
        
        setTimeout(() => {
            loadDashboardData();
            renderAllVisualizations();
            btn.classList.remove('loading');
            
            const lastUpdate = document.getElementById('last-update');
            if (lastUpdate) {
                const now = new Date();
                lastUpdate.textContent = now.toLocaleTimeString();
            }
            
            console.log('✅ Data refreshed');
        }, 1000);
    }
}

// Initialize theme management
function initializeTheme() {
    const themeToggle = document.querySelector('[data-theme-toggle]');
    if (!themeToggle) return;
    
    const currentTheme = localStorage.getItem('crypto-dashboard-theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeButton(currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('crypto-dashboard-theme', newTheme);
        updateThemeButton(newTheme);
        
        console.log(`🎨 Theme changed to: ${newTheme}`);
    });
}

// Update theme button appearance
function updateThemeButton(theme) {
    const themeToggle = document.querySelector('[data-theme-toggle]');
    if (!themeToggle) return;
    
    const themeText = themeToggle.querySelector('.theme-text');
    
    if (theme === 'dark') {
        if (themeText) themeText.textContent = 'Dark Mode';
    } else {
        if (themeText) themeText.textContent = 'Light Mode';
    }
}

// Global error handling
window.addEventListener('error', (e) => {
    console.error('⚠️ Global error:', e.error);
});

console.log('📦 Cryptocurrency Dashboard - Main script loaded');