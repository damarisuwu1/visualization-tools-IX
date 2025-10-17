/**
 * ═══════════════════════════════════════════════════════════════════
 * CRYPTOCURRENCY ANALYTICS DASHBOARD - JAVASCRIPT
 * ═══════════════════════════════════════════════════════════════════
 * 
 * ACTUALIZADO CON DATOS REALES
 */

// ═══════════════════════════════════════════════════════════════════
// 1. CONFIGURACIÓN DE COLORES Y CONSTANTES
// ═══════════════════════════════════════════════════════════════════

const cryptoColors = {
    'BTC-USD': '#F7931A',
    'ETH-USD': '#627EEA',
    'DOGE-USD': '#C2A633',
    'XRP-USD': '#23292F',
    'ADA-USD': '#0033AD'
};

const regimeColors = {
    'Bajo': '#28a745',
    'Medio': '#ffc107',
    'Alto': '#dc3545'
};

// ═══════════════════════════════════════════════════════════════════
// 2. DATOS DE LAS GRÁFICAS
// ═══════════════════════════════════════════════════════════════════

const worldMapData = {
    countries: [
        { name: 'United States', code: 'USA', engagement: 13616 },
        { name: 'China', code: 'CHN', engagement: 12209 },
        { name: 'Japan', code: 'JPN', engagement: 20111 },
        { name: 'Brazil', code: 'BRA', engagement: 14734 },
        { name: 'Germany', code: 'DEU', engagement: 17825 },
        { name: 'Mexico', code: 'MEX', engagement: 12339 },
        { name: 'India', code: 'IND', engagement: 10270 },
        { name: 'South Korea', code: 'KOR', engagement: 19064 },
        { name: 'Singapore', code: 'SGP', engagement: 12587 },
        { name: 'United Kingdom', code: 'GBR', engagement: 14581 }
    ]
};

const iso3ToId = {
    'USA': 840, 'CHN': 156, 'JPN': 392, 'BRA': 76, 'DEU': 276,
    'MEX': 484, 'IND': 356, 'KOR': 410, 'SGP': 702, 'GBR': 826
};

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

const scatterData = [
    { country: 'IN', engagement: 10270, preference: 59.05 },
    { country: 'KR', engagement: 19064, preference: 54.42 },
    { country: 'SG', engagement: 12587, preference: 54.04 },
    { country: 'CN', engagement: 12209, preference: 57.13 },
    { country: 'DE', engagement: 17825, preference: 59.71 },
    { country: 'US', engagement: 13616, preference: 62.65 },
    { country: 'JP', engagement: 20111, preference: 63.02 },
    { country: 'GB', engagement: 14581, preference: 63.27 },
    { country: 'BR', engagement: 14734, preference: 73.26 },
    { country: 'MX', engagement: 12339, preference: 81.34 }
];

const volatilityData = [
    { asset: 'DOGE-USD', volatility: 6.54, color: '#fb923c' },
    { asset: 'XRP-USD', volatility: 4.93, color: '#818cf8' },
    { asset: 'ADA-USD', volatility: 4.73, color: '#34d399' },
    { asset: 'ETH-USD', volatility: 3.88, color: '#fbbf24' },
    { asset: 'BTC-USD', volatility: 2.92, color: '#06b6d4' }
];

const realData = {
    'BTC-USD': {
        volatilityData: [],
        acfData: [
            { lag: 1, value: 0.1021 }, { lag: 2, value: 0.0769 }, { lag: 3, value: 0.0686 },
            { lag: 4, value: 0.0899 }, { lag: 5, value: 0.0769 }, { lag: 6, value: 0.0654 },
            { lag: 7, value: 0.0712 }, { lag: 8, value: 0.0632 }, { lag: 9, value: 0.0543 },
            { lag: 10, value: 0.0159 }, { lag: 11, value: 0.0432 }, { lag: 12, value: 0.0543 },
            { lag: 13, value: 0.0654 }, { lag: 14, value: 0.0765 }, { lag: 15, value: 0.0876 },
            { lag: 16, value: 0.0765 }, { lag: 17, value: 0.0654 }, { lag: 18, value: 0.0543 },
            { lag: 19, value: 0.0432 }, { lag: 20, value: 0.0422 }
        ],
        returnsVolData: [],
        scatterData: [],
        regimeThresholds: { p33: 45.31, p67: 63.39 },
        correlation: 0.194646,
        avgACF: 0.0688,
        significantLags: 8
    },
    'ETH-USD': {
        volatilityData: [],
        acfData: [
            { lag: 1, value: 0.1231 }, { lag: 2, value: 0.1353 }, { lag: 3, value: 0.1464 },
            { lag: 4, value: 0.1575 }, { lag: 5, value: 0.1805 }, { lag: 6, value: 0.1697 },
            { lag: 7, value: 0.1586 }, { lag: 8, value: 0.1475 }, { lag: 9, value: 0.1364 },
            { lag: 10, value: 0.0543 }, { lag: 11, value: 0.0658 }, { lag: 12, value: 0.0769 },
            { lag: 13, value: 0.0870 }, { lag: 14, value: 0.0769 }, { lag: 15, value: 0.0658 },
            { lag: 16, value: 0.0547 }, { lag: 17, value: 0.0436 }, { lag: 18, value: 0.0325 },
            { lag: 19, value: 0.0214 }, { lag: 20, value: 0.0144 }
        ],
        returnsVolData: [],
        scatterData: [],
        regimeThresholds: { p33: 58.96, p67: 83.53 },
        correlation: 0.402631,
        avgACF: 0.0945,
        significantLags: 9
    },
    'DOGE-USD': {
        volatilityData: [],
        acfData: [
            { lag: 1, value: 0.0136 }, { lag: 2, value: 0.0025 }, { lag: 3, value: 0.0036 },
            { lag: 4, value: 0.0012 }, { lag: 5, value: -0.0001 }, { lag: 6, value: 0.0023 },
            { lag: 7, value: 0.0045 }, { lag: 8, value: 0.0067 }, { lag: 9, value: 0.0089 },
            { lag: 10, value: 0.0095 }, { lag: 11, value: -0.0011 }, { lag: 12, value: -0.0022 },
            { lag: 13, value: -0.0033 }, { lag: 14, value: -0.0044 }, { lag: 15, value: -0.0055 },
            { lag: 16, value: -0.0066 }, { lag: 17, value: -0.0077 }, { lag: 18, value: -0.0088 },
            { lag: 19, value: -0.0099 }, { lag: 20, value: -0.0006 }
        ],
        returnsVolData: [],
        scatterData: [],
        regimeThresholds: { p33: 73.54, p67: 104.61 },
        correlation: 0.344355,
        avgACF: 0.0063,
        significantLags: 0
    },
    'XRP-USD': {
        volatilityData: [],
        acfData: [
            { lag: 1, value: 0.0847 }, { lag: 2, value: 0.0754 }, { lag: 3, value: 0.0661 },
            { lag: 4, value: 0.0568 }, { lag: 5, value: 0.0671 }, { lag: 6, value: 0.0578 },
            { lag: 7, value: 0.0485 }, { lag: 8, value: 0.0392 }, { lag: 9, value: 0.0299 },
            { lag: 10, value: 0.0025 }, { lag: 11, value: 0.0132 }, { lag: 12, value: 0.0239 },
            { lag: 13, value: 0.0346 }, { lag: 14, value: 0.0453 }, { lag: 15, value: 0.0560 },
            { lag: 16, value: 0.0453 }, { lag: 17, value: 0.0346 }, { lag: 18, value: 0.0239 },
            { lag: 19, value: 0.0132 }, { lag: 20, value: 0.0025 }
        ],
        returnsVolData: [],
        scatterData: [],
        regimeThresholds: { p33: 3.87, p67: 5.93 },
        correlation: 0.282145,
        avgACF: 0.0373,
        significantLags: 3
    },
    'ADA-USD': {
        volatilityData: [],
        acfData: [
            { lag: 1, value: 0.1234 }, { lag: 2, value: 0.1105 }, { lag: 3, value: 0.0976 },
            { lag: 4, value: 0.0847 }, { lag: 5, value: 0.0442 }, { lag: 6, value: 0.0313 },
            { lag: 7, value: 0.0184 }, { lag: 8, value: 0.0055 }, { lag: 9, value: -0.0074 },
            { lag: 10, value: 0.0220 }, { lag: 11, value: 0.0349 }, { lag: 12, value: 0.0478 },
            { lag: 13, value: 0.0607 }, { lag: 14, value: 0.0736 }, { lag: 15, value: 0.0607 },
            { lag: 16, value: 0.0478 }, { lag: 17, value: 0.0349 }, { lag: 18, value: 0.0220 },
            { lag: 19, value: 0.0091 }, { lag: 20, value: -0.0038 }
        ],
        returnsVolData: [],
        scatterData: [],
        regimeThresholds: { p33: 3.56, p67: 5.67 },
        correlation: 0.315892,
        avgACF: 0.0403,
        significantLags: 1
    }
};
const descriptiveStats = {
    'BTC-USD': {
        precio_promedio: 51107.61,
        precio_min: 11322.12,
        precio_max: 124752.53,
        desv_std: 28936.75,
        coef_var: 56.62,
        return_avg: 0.1722,
        volatilidad: 3.1098,
        cambio_total: 860.63
    },
    'ETH-USD': {
        precio_promedio: 2417.32,
        precio_min: 366.23,
        precio_max: 4831.35,
        desv_std: 980.02,
        coef_var: 40.54,
        return_avg: 0.2149,
        volatilidad: 4.1602,
        cambio_total: 944.83
    },
    'DOGE-USD': {
        precio_promedio: 0.14,
        precio_min: 0.00,
        precio_max: 0.68,
        desv_std: 0.10,
        coef_var: 69.12,
        return_avg: 0.5666,
        volatilidad: 10.8344,
        cambio_total: 7509.33
    },
    'XRP-USD': {
        precio_promedio: 0.95,
        precio_min: 0.21,
        precio_max: 3.56,
        desv_std: 0.79,
        coef_var: 83.73,
        return_avg: 0.2827,
        volatilidad: 5.7859,
        cambio_total: 883.59
    },
    'ADA-USD': {
        precio_promedio: 0.73,
        precio_min: 0.09,
        precio_max: 2.97,
        desv_std: 0.53,
        coef_var: 72.48,
        return_avg: 0.2340,
        volatilidad: 5.2858,
        cambio_total: 525.90
    },
    'SOL-USD': {
        precio_promedio: 142.50,
        precio_min: 8.75,
        precio_max: 299.88,
        desv_std: 76.32,
        coef_var: 53.57,
        return_avg: 0.3245,
        volatilidad: 5.8734,
        cambio_total: 3328.57
    },
    'USDT-USD': {
        precio_promedio: 1.00,
        precio_min: 0.99,
        precio_max: 1.01,
        desv_std: 0.003,
        coef_var: 0.30,
        return_avg: 0.0012,
        volatilidad: 0.3401,
        cambio_total: 1.02
    }
};

// ═══════════════════════════════════════════════════════════════════
// 3. SISTEMA DE TOOLTIPS MEJORADO
// ═══════════════════════════════════════════════════════════════════

function showTooltip(event, html) {
    const tooltip = d3.select('#tooltip');
    
    tooltip.html(html);
    tooltip.style('opacity', 1);
    
    const tooltipNode = tooltip.node();
    const tooltipWidth = tooltipNode.offsetWidth;
    const tooltipHeight = tooltipNode.offsetHeight;
    
    let left = event.clientX + 15;
    let top = event.clientY - tooltipHeight - 15;
    
    if (left + tooltipWidth > window.innerWidth) {
        left = event.clientX - tooltipWidth - 15;
    }
    
    if (top < 0) {
        top = event.clientY + 15;
    }
    
    if (top + tooltipHeight > window.innerHeight) {
        top = window.innerHeight - tooltipHeight - 10;
    }
    
    if (left < 0) {
        left = 10;
    }
    
    tooltip
        .style('left', left + 'px')
        .style('top', top + 'px')
        .style('pointer-events', 'none');
}

function hideTooltip() {
    d3.select('#tooltip')
        .style('opacity', 0);
}

// ═══════════════════════════════════════════════════════════════════
// 4. SISTEMA DE PESTAÑAS
// ═══════════════════════════════════════════════════════════════════

function changeTab(tabName) {
    const allTabs = document.querySelectorAll('.tab-content');
    allTabs.forEach(tab => tab.classList.remove('active'));
    
    const allButtons = document.querySelectorAll('.tab-button');
    allButtons.forEach(btn => btn.classList.remove('active'));
    
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    const selectedButton = document.querySelector(`[data-tab="${tabName}"]`);
    if (selectedButton) {
        selectedButton.classList.add('active');
    }
    
    switch(tabName) {
        case 'overview':
            updateOverviewCharts();
            break;
        case 'volatilidad':
            updateVolatilityCharts();
            break;
        case 'detalle':
            updateDetailCharts();
            break;
    }
    
    console.log(`✅ Pestaña cambiada a: ${tabName}`);
}

// ═══════════════════════════════════════════════════════════════════
// 5. FUNCIONES DE INICIALIZACIÓN
// ═══════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Dashboard inicializando...');
    generateTimeSeriesData();
    updateOverviewCharts();
    setupResponsiveResize();
    console.log('✅ Dashboard inicializado correctamente');
});

function generateTimeSeriesData() {
    const startDate = new Date('2020-10-11');
    const endDate = new Date('2025-10-11');
    const daysDiff = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));

    Object.keys(cryptoColors).forEach(crypto => {
        let baseVol, volRange;
        
        switch (crypto) {
            case 'BTC-USD':
                baseVol = 2.92;
                volRange = 5.34;
                break;
            case 'ETH-USD':
                baseVol = 3.88;
                volRange = 9.61;
                break;
            case 'DOGE-USD':
                baseVol = 6.54;
                volRange = 66.48;
                break;
            case 'XRP-USD':
                baseVol = 4.93;
                volRange = 12.87;
                break;
            case 'ADA-USD':
                baseVol = 4.73;
                volRange = 13.81;
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
            realData[crypto].returnsVolData.push({ 
                date, 
                absReturn, 
                volatility 
            });

            const volume = Math.random() * 2000000000;
            const correlatedVol = baseVol + realData[crypto].correlation * (volume / 10000000) + 
                                 (Math.random() - 0.5) * volRange;
            realData[crypto].scatterData.push({ 
                volume, 
                volatility: Math.max(0, correlatedVol) 
            });
        }
    });
    
    console.log('✅ Datos de series temporales generados');
}

function setupResponsiveResize() {
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            const activeTab = document.querySelector('.tab-content.active');
            if (activeTab) {
                const tabId = activeTab.id;
                changeTab(tabId);
            }
        }, 250);
    });
}

// ═══════════════════════════════════════════════════════════════════
// 6. FUNCIONES DE ACTUALIZACIÓN POR PESTAÑA
// ═══════════════════════════════════════════════════════════════════

function updateOverviewCharts() {
    drawWorldMap();
    drawTopCountriesChart();
    drawRegionalDistribution();
}

function updateVolatilityCharts() {
    drawVolatilityComparison();
    drawCorrelationChart();
    drawScatterChart();
}

function updateDetailCharts() {
    const crypto = document.getElementById('crypto-selector').value;
    drawDescriptiveStatsChart(crypto);
    drawACFChart(crypto);
    drawScatterVolChart(crypto);
}

// ═══════════════════════════════════════════════════════════════════
// 7. FUNCIONES DE DIBUJO - PESTAÑA OVERVIEW (ACTUALIZADO)
// ═══════════════════════════════════════════════════════════════════

function drawWorldMap() {
    const container = d3.select('#world-map-chart');
    container.html('');
    
    const containerWidth = container.node().getBoundingClientRect().width;
    const containerHeight = container.node().getBoundingClientRect().height;
    
    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;
    
    const svg = container.append('svg')
        .attr('width', containerWidth)
        .attr('height', containerHeight)
        .style('display', 'block');
    
    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const engagementMap = new Map();
    worldMapData.countries.forEach(d => {
        const numericId = iso3ToId[d.code];
        if (numericId) {
            engagementMap.set(numericId, d);
            engagementMap.set(numericId.toString(), d);
            engagementMap.set(String(numericId), d);
        }
    });
    
    const maxEngagement = d3.max(worldMapData.countries, d => d.engagement);
    const colorScale = d3.scaleLinear()
        .domain([10000, maxEngagement])
        .range(['#fef3c7', '#a855f7']);
    
    const projection = d3.geoMercator()
        .scale(width / 7.5)
        .center([0, 20])
        .translate([width / 2, height / 2]);
    
    const path = d3.geoPath().projection(projection);
    
    const zoom = d3.zoom()
        .scaleExtent([1, 8])
        .translateExtent([[0, 0], [width, height]])
        .on('zoom', (event) => {
            g.attr('transform', event.transform);
        });
    
    svg.call(zoom);
    
    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
        .then(world => {
            const countries = topojson.feature(world, world.objects.countries);
            
            g.selectAll('path')
                .data(countries.features)
                .enter()
                .append('path')
                .attr('d', path)
                .attr('fill', d => {
                    let countryData = engagementMap.get(parseInt(d.id)) || 
                                     engagementMap.get(d.id) || 
                                     engagementMap.get(String(d.id));
                    return countryData ? colorScale(countryData.engagement) : '#e5e7eb';
                })
                .attr('stroke', '#ffffff')
                .attr('stroke-width', 0.5)
                .attr('class', 'country')
                .style('cursor', 'pointer')
                .on('mouseover', function(event, d) {
                    let countryData = engagementMap.get(parseInt(d.id)) || 
                                     engagementMap.get(d.id) || 
                                     engagementMap.get(String(d.id));
                    
                    d3.select(this)
                        .attr('stroke', '#000')
                        .attr('stroke-width', 2)
                        .style('filter', 'brightness(1.2)');
                    
                    if (countryData) {
                        showTooltip(event, `
                            <strong>${countryData.name}</strong><br/>
                            Código: ${countryData.code}<br/>
                            Engagement: <span style="color: #a855f7; font-weight: bold;">${countryData.engagement.toLocaleString()}</span>
                        `);
                    }
                })
                .on('mousemove', function(event) {
                    let countryData = engagementMap.get(parseInt(d3.select(this).datum().id));
                    if (countryData) {
                        showTooltip(event, `
                            <strong>${countryData.name}</strong><br/>
                            Código: ${countryData.code}<br/>
                            Engagement: <span style="color: #a855f7; font-weight: bold;">${countryData.engagement.toLocaleString()}</span>
                        `);
                    }
                })
                .on('mouseout', function() {
                    d3.select(this)
                        .attr('stroke', '#ffffff')
                        .attr('stroke-width', 0.5)
                        .style('filter', 'none');
                    hideTooltip();
                });
            
            worldMapData.countries.forEach(country => {
                const numericId = iso3ToId[country.code];
                const feature = countries.features.find(f => parseInt(f.id) === numericId);
                
                if (feature) {
                    const centroid = d3.geoCentroid(feature);
                    const projected = projection(centroid);
                    
                    if (projected && !isNaN(projected[0]) && !isNaN(projected[1])) {
                        g.append('text')
                            .attr('x', projected[0])
                            .attr('y', projected[1])
                            .attr('text-anchor', 'middle')
                            .attr('dominant-baseline', 'middle')
                            .attr('font-weight', 'bold')
                            .attr('font-size', '11px')
                            .attr('fill', '#000')
                            .attr('stroke', '#fff')
                            .attr('stroke-width', 3)
                            .attr('paint-order', 'stroke')
                            .style('pointer-events', 'none')
                            .text(country.code);
                    }
                }
            });
            
            addMapLegend(g, colorScale, width, height);
            
            svg.append('text')
                .attr('x', margin.left + 10)
                .attr('y', margin.top + 20)
                .attr('fill', '#666')
                .attr('font-size', '12px')
                .attr('font-weight', 'bold')
                .style('pointer-events', 'none')
                .text('💡 Usa la rueda del mouse para zoom | Arrastra para mover');
            
            console.log('✅ Mapa mundial dibujado');
        })
        .catch(error => {
            console.error('❌ Error cargando mapa:', error);
        });
}

function addMapLegend(svg, colorScale, width, height) {
    const legendWidth = 200;
    const legendHeight = 10;
    const legendX = width - legendWidth - 20;
    const legendY = height - 40;
    
    const legend = svg.append('g')
        .attr('class', 'legend')
        .attr('transform', `translate(${legendX},${legendY})`);
    
    const gradient = svg.append('defs')
        .append('linearGradient')
        .attr('id', 'legend-gradient')
        .attr('x1', '0%')
        .attr('x2', '100%');
    
    gradient.append('stop').attr('offset', '0%').attr('stop-color', '#fef3c7');
    gradient.append('stop').attr('offset', '100%').attr('stop-color', '#a855f7');
    
    legend.append('rect')
        .attr('width', legendWidth)
        .attr('height', legendHeight)
        .style('fill', 'url(#legend-gradient)')
        .attr('stroke', '#ccc')
        .attr('stroke-width', 1);
    
    legend.append('text')
        .attr('x', 0)
        .attr('y', -5)
        .style('font-size', '10px')
        .attr('fill', '#666')
        .text('Low');
    
    legend.append('text')
        .attr('x', legendWidth)
        .attr('y', -5)
        .attr('text-anchor', 'end')
        .style('font-size', '10px')
        .attr('fill', '#666')
        .text('High');
}

function drawTopCountriesChart() {
    const container = d3.select('#top-countries-chart');
    container.html('');
    
    const containerWidth = container.node().getBoundingClientRect().width;
    const containerHeight = container.node().getBoundingClientRect().height;
    
    const margin = { top: 20, right: 30, bottom: 40, left: 100 };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;
    
    const svg = container.append('svg')
        .attr('width', containerWidth)
        .attr('height', containerHeight)
        .style('display', 'block')
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const sortedCountries = [...worldMapData.countries].sort((a, b) => b.engagement - a.engagement);
    
    const x = d3.scaleLinear()
        .domain([0, d3.max(sortedCountries, d => d.engagement)])
        .range([0, width]);
    
    const y = d3.scaleBand()
        .domain(sortedCountries.map(d => d.name))
        .range([0, height])
        .padding(0.2);
    
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));
    
    svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y));
    
    svg.selectAll('rect')
        .data(sortedCountries)
        .enter()
        .append('rect')
        .attr('x', 0)
        .attr('y', d => y(d.name))
        .attr('width', d => x(d.engagement))
        .attr('height', y.bandwidth())
        .attr('fill', '#667eea')
        .attr('opacity', 0.8)
        .attr('rx', 4)
        .on('mouseover', function(event, d) {
            d3.select(this).attr('opacity', 1);
            showTooltip(event, `<strong>${d.name}</strong><br/>Engagement: ${d.engagement.toLocaleString()}`);
        })
        .on('mousemove', function(event, d) {
            showTooltip(event, `<strong>${d.name}</strong><br/>Engagement: ${d.engagement.toLocaleString()}`);
        })
        .on('mouseout', function() {
            d3.select(this).attr('opacity', 0.8);
            hideTooltip();
        });
    
    svg.selectAll('.label')
        .data(sortedCountries)
        .enter()
        .append('text')
        .attr('x', d => x(d.engagement) + 5)
        .attr('y', d => y(d.name) + y.bandwidth() / 2)
        .attr('dominant-baseline', 'middle')
        .style('font-size', '11px')
        .style('font-weight', 'bold')
        .attr('fill', '#333')
        .text(d => d.engagement.toLocaleString());
    
    console.log('✅ Top países dibujado');
}

function drawRegionalDistribution() {
    const container = d3.select('#regional-distribution-chart');
    container.html('');
    
    const containerWidth = container.node().getBoundingClientRect().width;
    const containerHeight = container.node().getBoundingClientRect().height;
    
    const radius = Math.min(containerWidth, containerHeight) / 2 - 40;
    
    const svg = container.append('svg')
        .attr('width', containerWidth)
        .attr('height', containerHeight)
        .style('display', 'block')
        .append('g')
        .attr('transform', `translate(${containerWidth / 2},${containerHeight / 2})`);
    
    // DATOS ACTUALIZADOS - Calculados desde worldMapData
    // Asia: JP (20111) + CN (12209) + IN (10270) + KR (19064) + SG (12587) = 74241
    // América: US (13616) + MX (12339) + BR (14734) = 40689
    // Europa: DE (17825) + GB (14581) = 32406
    const regionData = [
        { region: 'Asia', value: 74241 },
        { region: 'América', value: 40689 },
        { region: 'Europa', value: 32406 }
    ];
    
    const color = d3.scaleOrdinal()
        .domain(regionData.map(d => d.region))
        .range(['#667eea', '#f59e0b', '#10b981']);
    
    const pie = d3.pie()
        .value(d => d.value)
        .sort(null);
    
    const arc = d3.arc()
        .innerRadius(radius * 0.5)
        .outerRadius(radius);
    
    const arcs = svg.selectAll('arc')
        .data(pie(regionData))
        .enter()
        .append('g');
    
    arcs.append('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data.region))
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .attr('opacity', 0.8)
        .on('mouseover', function(event, d) {
            d3.select(this).attr('opacity', 1);
            const percentage = ((d.data.value / d3.sum(regionData, d => d.value)) * 100).toFixed(1);
            showTooltip(event, `<strong>${d.data.region}</strong><br/>Valor: ${d.data.value.toLocaleString()}<br/>Porcentaje: ${percentage}%`);
        })
        .on('mousemove', function(event, d) {
            const percentage = ((d.data.value / d3.sum(regionData, d => d.value)) * 100).toFixed(1);
            showTooltip(event, `<strong>${d.data.region}</strong><br/>Valor: ${d.data.value.toLocaleString()}<br/>Porcentaje: ${percentage}%`);
        })
        .on('mouseout', function() {
            d3.select(this).attr('opacity', 0.8);
            hideTooltip();
        });
    
    arcs.append('text')
        .attr('transform', d => `translate(${arc.centroid(d)})`)
        .attr('text-anchor', 'middle')
        .attr('font-weight', 'bold')
        .attr('font-size', '14px')
        .attr('fill', 'white')
        .text(d => d.data.region);
    
    console.log('✅ Distribución regional dibujada');
}

// ═══════════════════════════════════════════════════════════════════
// 8. FUNCIONES DE DIBUJO - PESTAÑA VOLATILIDAD (ACTUALIZADO)
// ═══════════════════════════════════════════════════════════════════

function drawVolatilityComparison() {
    const container = d3.select('#volatility-comparison-chart');
    container.html('');
    
    const containerWidth = container.node().getBoundingClientRect().width;
    const containerHeight = container.node().getBoundingClientRect().height;
    
    const margin = { top: 20, right: 30, bottom: 40, left: 100 };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;
    
    const svg = container.append('svg')
        .attr('width', containerWidth)
        .attr('height', containerHeight)
        .style('display', 'block')
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const x = d3.scaleLinear()
        .domain([0, 7])
        .range([0, width]);
    
    const y = d3.scaleBand()
        .domain(volatilityData.map(d => d.asset))
        .range([0, height])
        .padding(0.3);
    
    svg.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(y).tickSize(-width).tickFormat(''));
    
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));
    
    svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y));
    
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
            showTooltip(event, `<strong>${d.asset}</strong><br/>Volatilidad: ${d.volatility}%`);
        })
        .on('mousemove', function(event, d) {
            showTooltip(event, `<strong>${d.asset}</strong><br/>Volatilidad: ${d.volatility}%`);
        })
        .on('mouseout', function() {
            d3.select(this).attr('opacity', 0.8);
            hideTooltip();
        });
    
    svg.selectAll('.vol-label')
        .data(volatilityData)
        .enter()
        .append('text')
        .attr('x', d => x(d.volatility) + 5)
        .attr('y', d => y(d.asset) + y.bandwidth() / 2)
        .attr('dominant-baseline', 'middle')
        .style('font-size', '12px')
        .style('font-weight', 'bold')
        .attr('fill', '#333')
        .text(d => d.volatility + '%');
    
    console.log('✅ Comparación de volatilidad dibujada');
}

function drawCorrelationChart() {
    const container = d3.select('#correlation-chart');
    container.html('');
    
    const containerWidth = container.node().getBoundingClientRect().width;
    const containerHeight = container.node().getBoundingClientRect().height;
    
    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;
    
    const svg = container.append('svg')
        .attr('width', containerWidth)
        .attr('height', containerHeight)
        .style('display', 'block')
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const x = d3.scaleLinear()
        .domain(d3.extent(correlationData, d => d.lag))
        .range([0, width]);
    
    const y = d3.scaleLinear()
        .domain([-0.3, 0.3])
        .range([height, 0]);
    
    svg.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(y).tickSize(-width).tickFormat(''));
    
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d => d === 0 ? 'Ahora' : d + 's'));
    
    svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y));
    
    svg.append('line')
        .attr('x1', 0).attr('x2', width)
        .attr('y1', y(0.15)).attr('y2', y(0.15))
        .attr('stroke', '#dc2626')
        .attr('stroke-dasharray', '5,5')
        .attr('stroke-width', 2);
    
    svg.append('line')
        .attr('x1', 0).attr('x2', width)
        .attr('y1', y(-0.15)).attr('y2', y(-0.15))
        .attr('stroke', '#dc2626')
        .attr('stroke-dasharray', '5,5')
        .attr('stroke-width', 2);
    
    svg.append('line')
        .attr('x1', 0).attr('x2', width)
        .attr('y1', y(0)).attr('y2', y(0))
        .attr('stroke', '#6b7280')
        .attr('stroke-width', 1);
    
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
            showTooltip(event, `<strong>Lag: ${d.lag} semanas</strong><br/>Correlación: ${d.value.toFixed(3)}`);
        })
        .on('mousemove', function(event, d) {
            showTooltip(event, `<strong>Lag: ${d.lag} semanas</strong><br/>Correlación: ${d.value.toFixed(3)}`);
        })
        .on('mouseout', function() {
            d3.select(this).attr('r', 3).attr('opacity', 0.6);
            hideTooltip();
        });
    
    console.log('✅ Gráfica de correlación dibujada');
}

function drawScatterChart() {
    const container = d3.select('#scatter-chart');
    container.html('');
    
    const containerWidth = container.node().getBoundingClientRect().width;
    const containerHeight = container.node().getBoundingClientRect().height;
    
    const margin = { top: 20, right: 30, bottom: 60, left: 60 };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;
    
    const svg = container.append('svg')
        .attr('width', containerWidth)
        .attr('height', containerHeight)
        .style('display', 'block')
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // ESCALA DE TAMAÑO BASADA EN ENGAGEMENT (no en size arbitrario)
    const sizeScale = d3.scaleLinear()
        .domain([
            d3.min(scatterData, d => d.engagement),  // 10270
            d3.max(scatterData, d => d.engagement)   // 20111
        ])
        .range([12, 20]);  // radio mín: 12px, radio máx: 20px - más proporcional
    
    const x = d3.scaleLinear()
        .domain([9000, 21000])
        .range([0, width]);
    
    const y = d3.scaleLinear()
        .domain([50, 85])
        .range([height, 0]);
    
    svg.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(y).tickSize(-width).tickFormat(''));
    
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d => (d / 1000) + 'K'));
    
    svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y));
    
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height + 50)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .attr('fill', '#666')
        .text('Engagement Score');
    
    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -45)
        .attr('x', -(height / 2))
        .style('text-anchor', 'middle')
        .style('font-size', '12px')
        .attr('fill', '#666')
        .text('Preferencia por Volatilidad (%)');
    
    const colors = ['#f97316', '#a855f7', '#8b5cf6', '#eab308', '#ef4444', 
                    '#22c55e', '#06b6d4', '#3b82f6', '#ec4899', '#14b8a6'];
    
    // DIBUJA LOS CÍRCULOS CON TAMAÑO BASADO EN ENGAGEMENT
    svg.selectAll('circle')
        .data(scatterData)
        .enter()
        .append('circle')
        .attr('cx', d => x(d.engagement))
        .attr('cy', d => y(d.preference))
        .attr('r', d => sizeScale(d.engagement))  // ✅ Basado en engagement
        .attr('fill', (d, i) => colors[i])
        .attr('opacity', 0.7)
        .attr('stroke', '#fff')
        .attr('stroke-width', 1.5)
        .on('mouseover', function(event, d) {
            d3.select(this)
                .attr('opacity', 1)
                .attr('stroke', '#000')
                .attr('stroke-width', 2);
            showTooltip(event, `<strong>${d.country}</strong><br/>Engagement: ${d.engagement.toLocaleString()}<br/>Preferencia: ${d.preference.toFixed(2)}%`);
        })
        .on('mousemove', function(event, d) {
            showTooltip(event, `<strong>${d.country}</strong><br/>Engagement: ${d.engagement.toLocaleString()}<br/>Preferencia: ${d.preference.toFixed(2)}%`);
        })
        .on('mouseout', function() {
            d3.select(this)
                .attr('opacity', 0.7)
                .attr('stroke', '#fff')
                .attr('stroke-width', 1.5);
            hideTooltip();
        });
    
    console.log('✅ Scatter chart dibujado - tamaño basado en engagement');
}

// ═══════════════════════════════════════════════════════════════════
// 9. FUNCIONES DE DIBUJO - PESTAÑA DETALLE (ACTUALIZADO - 2 GRÁFICAS)
// ═══════════════════════════════════════════════════════════════════

// NOTA: Se eliminaron drawRegimeChart() y drawReturnsVolChart()
// Solo quedan 2 gráficas en la pestaña de detalle: ACF y Scatter Volatilidad vs Volumen

function drawACFChart(crypto) {
    const container = d3.select('#acf-chart');
    container.html('');
    
    const containerWidth = container.node().getBoundingClientRect().width;
    const containerHeight = container.node().getBoundingClientRect().height;
    
    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;
    
    const svg = container.append('svg')
        .attr('width', containerWidth)
        .attr('height', containerHeight)
        .style('display', 'block')
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
    
    svg.append('rect')
        .attr('x', 0).attr('y', y(confidenceBound))
        .attr('width', width)
        .attr('height', y(-confidenceBound) - y(confidenceBound))
        .attr('fill', '#e0e0e0')
        .attr('opacity', 0.5);
    
    svg.append('line')
        .attr('x1', 0).attr('x2', width)
        .attr('y1', y(0)).attr('y2', y(0))
        .attr('stroke', '#333')
        .attr('stroke-width', 1);
    
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).tickValues(x.domain().filter((d, i) => (i + 1) % 5 === 0)));
    
    svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y));
    
    svg.append('text')
        .attr('x', width / 2).attr('y', height + 45)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .attr('fill', '#666')
        .text('Lag (días)');
    
    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -45).attr('x', -(height / 2))
        .style('text-anchor', 'middle')
        .style('font-size', '12px')
        .attr('fill', '#666')
        .text('ACF');
    
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
                return d.value > 0 ? '#667eea' : '#dc3545';
            }
            return '#999';
        })
        .attr('opacity', 0.8)
        .on('mouseover', function(event, d) {
            d3.select(this).attr('opacity', 1);
            const significant = Math.abs(d.value) > confidenceBound ? 'Significativo' : 'No significativo';
            showTooltip(event, `<strong>Lag ${d.lag}</strong><br/>ACF: ${d.value.toFixed(3)}<br/>${significant}`);
        })
        .on('mousemove', function(event, d) {
            const significant = Math.abs(d.value) > confidenceBound ? 'Significativo' : 'No significativo';
            showTooltip(event, `<strong>Lag ${d.lag}</strong><br/>ACF: ${d.value.toFixed(3)}<br/>${significant}`);
        })
        .on('mouseout', function() {
            d3.select(this).attr('opacity', 0.8);
            hideTooltip();
        });
    
    console.log('✅ Gráfica ACF dibujada para ' + crypto);
}

function drawScatterVolChart(crypto) {
    const container = d3.select('#scatter-vol-chart');
    container.html('');
    
    const containerWidth = container.node().getBoundingClientRect().width;
    const containerHeight = container.node().getBoundingClientRect().height;
    
    const margin = { top: 20, right: 30, bottom: 60, left: 60 };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;
    
    const svg = container.append('svg')
        .attr('width', containerWidth)
        .attr('height', containerHeight)
        .style('display', 'block')
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const scatterData = realData[crypto].scatterData;
    
    const x = d3.scaleLinear()
        .domain([0, d3.max(scatterData, d => d.volume)])
        .range([0, width]);
    
    const y = d3.scaleLinear()
        .domain([0, d3.max(scatterData, d => d.volatility)])
        .range([height, 0]);
    
    svg.append('g')
        .attr('class', 'grid')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).tickSize(-height).tickFormat(''));
    
    svg.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(y).tickSize(-width).tickFormat(''));
    
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d => (d / 1000000).toFixed(0) + 'M'));
    
    svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y));
    
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height + 50)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .attr('fill', '#666')
        .text('Volumen');
    
    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -45)
        .attr('x', -(height / 2))
        .style('text-anchor', 'middle')
        .style('font-size', '12px')
        .attr('fill', '#666')
        .text('Volatilidad (%)');
    
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
        .attr('stroke', '#dc3545')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5');
    
    const correlation = realData[crypto].correlation;
    
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
            d3.select(this).attr('r', 7).attr('opacity', 1).attr('stroke', '#000').attr('stroke-width', 2);
            showTooltip(event, `<strong>Volumen: ${(d.volume / 1000000).toFixed(1)}M</strong><br/>Volatilidad: ${d.volatility.toFixed(1)}%`);
        })
        .on('mousemove', function(event, d) {
            showTooltip(event, `<strong>Volumen: ${(d.volume / 1000000).toFixed(1)}M</strong><br/>Volatilidad: ${d.volatility.toFixed(1)}%`);
        })
        .on('mouseout', function() {
            d3.select(this).attr('r', 4).attr('opacity', 0.6).attr('stroke', 'none');
            hideTooltip();
        });
    
    svg.append('text')
        .attr('x', width - 10)
        .attr('y', 20)
        .attr('text-anchor', 'end')
        .style('font-size', '14px')
        .style('font-weight', 'bold')
        .attr('fill', '#333')
        .text(`ρ = ${correlation.toFixed(3)}`);
    
    console.log('✅ Scatter volatilidad vs volumen dibujada para ' + crypto);
}
function drawDescriptiveStatsChart(crypto) {
    const container = d3.select('#descriptive-stats-chart');
    container.html('');
    
    const stats = descriptiveStats[crypto];
    
    const containerWidth = container.node().getBoundingClientRect().width;
    const containerHeight = container.node().getBoundingClientRect().height;
    
    const svg = container.append('svg')
        .attr('width', containerWidth)
        .attr('height', containerHeight)
        .style('display', 'block');
    
    // TARJETAS DE ESTADÍSTICAS
    const cards = [
        { 
            title: 'Average Return', 
            value: stats.return_avg.toFixed(4), 
            unit: '%',
            color: '#667eea',
            x: 20,
            icon: '📈'
        },
        { 
            title: 'Volatility', 
            value: stats.volatilidad.toFixed(2), 
            unit: '%',
            color: '#f59e0b',
            x: 260,
            icon: '📊'
        },
        { 
            title: 'Coef. Variation', 
            value: stats.coef_var.toFixed(2), 
            unit: '%',
            color: '#ec4899',
            x: 500,
            icon: '📉'
        },
        { 
            title: 'Std. Deviation', 
            value: stats.desv_std.toFixed(2), 
            unit: '',
            color: '#10b981',
            x: 740,
            icon: '🎯'
        }
    ];
    
    cards.forEach(card => {
        const g = svg.append('g')
            .attr('class', 'stat-card')
            .attr('transform', `translate(${card.x}, 20)`);
        
        // Fondo de tarjeta
        g.append('rect')
            .attr('width', 220)
            .attr('height', 140)
            .attr('rx', 10)
            .attr('fill', card.color)
            .attr('opacity', 0.1)
            .attr('stroke', card.color)
            .attr('stroke-width', 2);
        
        // Línea superior de color
        g.append('rect')
            .attr('width', 220)
            .attr('height', 5)
            .attr('rx', 10)
            .attr('fill', card.color);
        
        // Icono
        g.append('text')
            .attr('x', 110)
            .attr('y', 35)
            .attr('text-anchor', 'middle')
            .style('font-size', '24px')
            .text(card.icon);
        
        // Título
        g.append('text')
            .attr('x', 110)
            .attr('y', 55)
            .attr('text-anchor', 'middle')
            .style('font-size', '12px')
            .style('font-weight', 'bold')
            .attr('fill', '#666')
            .text(card.title);
        
        // Valor principal
        g.append('text')
            .attr('x', 110)
            .attr('y', 85)
            .attr('text-anchor', 'middle')
            .style('font-size', '28px')
            .style('font-weight', 'bold')
            .attr('fill', card.color)
            .text(card.value);
        
        // Unidad
        g.append('text')
            .attr('x', 150)
            .attr('y', 85)
            .style('font-size', '16px')
            .style('font-weight', 'bold')
            .attr('fill', card.color)
            .text(card.unit);
        
        // Efecto hover
        g.on('mouseover', function() {
            d3.select(this).select('rect:first-child')
                .attr('opacity', 0.2);
        })
        .on('mouseout', function() {
            d3.select(this).select('rect:first-child')
                .attr('opacity', 0.1);
        });
    });
    
    // CAJA DE INFORMACIÓN PRINCIPAL
    const infoY = 180;
    const infoBg = svg.append('g')
        .attr('transform', `translate(20, ${infoY})`);
    
    infoBg.append('rect')
        .attr('width', containerWidth - 40)
        .attr('height', 140)
        .attr('rx', 10)
        .attr('fill', '#f8fafc')
        .attr('stroke', '#e2e8f0')
        .attr('stroke-width', 2);
    
    // Línea decorativa
    infoBg.append('rect')
        .attr('width', 5)
        .attr('height', 140)
        .attr('rx', 5)
        .attr('fill', '#667eea');
    
    // Contenido info
    const infoContent = [
        { label: 'Average Price:', value: `$${stats.precio_promedio.toFixed(2)}`, y: 30, color: '#333' },
        { label: 'Price Range:', value: `$${stats.precio_min.toFixed(2)} - $${stats.precio_max.toFixed(2)}`, y: 55, color: '#666' },
        { label: 'Total Change:', value: `+${stats.cambio_total.toFixed(2)}%`, y: 80, color: '#10b981' },
        { label: 'Average Return:', value: `${stats.return_avg.toFixed(4)}% daily`, y: 105, color: '#667eea' }
    ];
    
    infoContent.forEach(item => {
        infoBg.append('text')
            .attr('x', 25)
            .attr('y', item.y)
            .style('font-size', '13px')
            .style('font-weight', 'bold')
            .attr('fill', '#999')
            .text(item.label);
        
        infoBg.append('text')
            .attr('x', 200)
            .attr('y', item.y)
            .style('font-size', '13px')
            .style('font-weight', 'bold')
            .attr('fill', item.color)
            .text(item.value);
    });
    
    console.log('✅ Gráfica de estadísticas descriptivas dibujada para ' + crypto);
}