/**
 * ═══════════════════════════════════════════════════════════════════
 * CRYPTOCURRENCY ANALYTICS DASHBOARD - JAVASCRIPT
 * ═══════════════════════════════════════════════════════════════════
 * 
 * CAMBIOS PRINCIPALES:
 * - Tooltips funcionando en TODAS las gráficas
 * - Posicionamiento inteligente del tooltip junto al cursor
 * - Sistema de tooltip mejorado y consistente
 */

// ═══════════════════════════════════════════════════════════════════
// 1. CONFIGURACIÓN DE COLORES Y CONSTANTES
// ═══════════════════════════════════════════════════════════════════

const cryptoColors = {
    'BTC-USD': '#F7931A',
    'ETH-USD': '#627EEA',
    'DOGE-USD': '#C2A633',
    'SOL-USD': '#14F195',
    'USDT-USD': '#26A17B'
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
        { name: 'United States', code: 'USA', engagement: 9054 },
        { name: 'China', code: 'CHN', engagement: 8909 },
        { name: 'Japan', code: 'JPN', engagement: 14565 },
        { name: 'Brazil', code: 'BRA', engagement: 10906 },
        { name: 'Germany', code: 'DEU', engagement: 10261 },
        { name: 'Mexico', code: 'MEX', engagement: 10182 },
        { name: 'India', code: 'IND', engagement: 6081 },
        { name: 'South Korea', code: 'KOR', engagement: 10948 },
        { name: 'Singapore', code: 'SGP', engagement: 6973 },
        { name: 'United Kingdom', code: 'GBR', engagement: 8758 }
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

const volatilityData = [
    { asset: 'DOGE-USD', volatility: 6.53, color: '#fb923c' },
    { asset: 'SOL-USD', volatility: 5.63, color: '#818cf8' },
    { asset: 'ETH-USD', volatility: 3.87, color: '#34d399' },
    { asset: 'BTC-USD', volatility: 2.92, color: '#fbbf24' },
    { asset: 'USDT-USD', volatility: 0.04, color: '#06b6d4' }
];

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

// ═══════════════════════════════════════════════════════════════════
// 3. SISTEMA DE TOOLTIPS MEJORADO
// ═══════════════════════════════════════════════════════════════════

function showTooltip(event, html) {
    const tooltip = d3.select('#tooltip');
    
    // Actualizar contenido
    tooltip.html(html);
    
    // Hacer visible primero para obtener dimensiones correctas
    tooltip.style('opacity', 1);
    
    // Obtener dimensiones del tooltip
    const tooltipNode = tooltip.node();
    const tooltipWidth = tooltipNode.offsetWidth;
    const tooltipHeight = tooltipNode.offsetHeight;
    
    // Usar clientX/clientY en lugar de pageX/pageY para position: fixed
    let left = event.clientX + 15; // 15px a la derecha del cursor
    let top = event.clientY - tooltipHeight - 15; // 15px arriba del cursor
    
    // Ajustar si se sale por la derecha
    if (left + tooltipWidth > window.innerWidth) {
        left = event.clientX - tooltipWidth - 15; // Mover a la izquierda
    }
    
    // Ajustar si se sale por arriba
    if (top < 0) {
        top = event.clientY + 15; // Mover abajo del cursor
    }
    
    // Ajustar si se sale por abajo
    if (top + tooltipHeight > window.innerHeight) {
        top = window.innerHeight - tooltipHeight - 10;
    }
    
    // Ajustar si se sale por la izquierda
    if (left < 0) {
        left = 10;
    }
    
    // Aplicar posición
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
    drawRegimeChart(crypto);
    drawACFChart(crypto);
    drawReturnsVolChart(crypto);
    drawScatterVolChart(crypto);
}

// ═══════════════════════════════════════════════════════════════════
// 7. FUNCIONES DE DIBUJO - PESTAÑA OVERVIEW
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
        .domain([0, maxEngagement])
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
    
    const regionData = [
        { region: 'Asia', value: 48000 },
        { region: 'América', value: 30200 },
        { region: 'Europa', value: 19000 },
        { region: 'Otros', value: 7000 }
    ];
    
    const color = d3.scaleOrdinal()
        .domain(regionData.map(d => d.region))
        .range(['#667eea', '#f59e0b', '#10b981', '#ef4444']);
    
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
// 8. FUNCIONES DE DIBUJO - PESTAÑA VOLATILIDAD
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
    
    const x = d3.scaleLinear()
        .domain([5000, 16000])
        .range([0, width]);
    
    const y = d3.scaleLinear()
        .domain([94, 101])
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
    
    svg.selectAll('circle')
        .data(scatterData)
        .enter()
        .append('circle')
        .attr('cx', d => x(d.engagement))
        .attr('cy', d => y(d.preference))
        .attr('r', d => d.size)
        .attr('fill', (d, i) => colors[i])
        .attr('opacity', 0.7)
        .on('mouseover', function(event, d) {
            d3.select(this).attr('opacity', 1).attr('stroke', '#000').attr('stroke-width', 2);
            showTooltip(event, `<strong>${d.country}</strong><br/>Engagement: ${d.engagement}<br/>Preferencia: ${d.preference}%`);
        })
        .on('mousemove', function(event, d) {
            showTooltip(event, `<strong>${d.country}</strong><br/>Engagement: ${d.engagement}<br/>Preferencia: ${d.preference}%`);
        })
        .on('mouseout', function() {
            d3.select(this).attr('opacity', 0.7).attr('stroke', 'none');
            hideTooltip();
        });
    
    console.log('✅ Scatter chart dibujado');
}

// ═══════════════════════════════════════════════════════════════════
// 9. FUNCIONES DE DIBUJO - PESTAÑA DETALLE
// ═══════════════════════════════════════════════════════════════════

function drawRegimeChart(crypto) {
    const container = d3.select('#regime-chart');
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
    
    const cryptoData = realData[crypto].volatilityData;
    const { p33, p67 } = realData[crypto].regimeThresholds;
    
    const x = d3.scaleTime()
        .domain(d3.extent(cryptoData, d => d.date))
        .range([0, width]);
    
    const y = d3.scaleLinear()
        .domain([0, d3.max(cryptoData, d => d.volatility)])
        .range([height, 0]);
    
    svg.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(y).tickSize(-width).tickFormat(''));
    
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
    
    svg.append('rect')
        .attr('x', 0).attr('y', y(p33))
        .attr('width', width).attr('height', height - y(p33))
        .attr('fill', regimeColors['Bajo'])
        .attr('opacity', 0.2);
    
    svg.append('rect')
        .attr('x', 0).attr('y', y(p67))
        .attr('width', width).attr('height', y(p33) - y(p67))
        .attr('fill', regimeColors['Medio'])
        .attr('opacity', 0.2);
    
    svg.append('rect')
        .attr('x', 0).attr('y', 0)
        .attr('width', width).attr('height', y(p67))
        .attr('fill', regimeColors['Alto'])
        .attr('opacity', 0.2);
    
    svg.append('line')
        .attr('x1', 0).attr('x2', width)
        .attr('y1', y(p33)).attr('y2', y(p33))
        .attr('stroke', regimeColors['Bajo'])
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5');
    
    svg.append('line')
        .attr('x1', 0).attr('x2', width)
        .attr('y1', y(p67)).attr('y2', y(p67))
        .attr('stroke', regimeColors['Alto'])
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5');
    
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
            const regime = d.volatility < p33 ? 'Bajo' : d.volatility < p67 ? 'Medio' : 'Alto';
            showTooltip(event, `<strong>${d3.timeFormat('%Y-%m-%d')(d.date)}</strong><br/>Volatilidad: ${d.volatility.toFixed(1)}%<br/>Régimen: ${regime}`);
        })
        .on('mousemove', function(event, d) {
            const regime = d.volatility < p33 ? 'Bajo' : d.volatility < p67 ? 'Medio' : 'Alto';
            showTooltip(event, `<strong>${d3.timeFormat('%Y-%m-%d')(d.date)}</strong><br/>Volatilidad: ${d.volatility.toFixed(1)}%<br/>Régimen: ${regime}`);
        })
        .on('mouseout', function() {
            d3.select(this).attr('r', 3).attr('opacity', 0.7);
            hideTooltip();
        });
    
    const legend = [
        { label: 'Bajo', color: regimeColors['Bajo'] },
        { label: 'Medio', color: regimeColors['Medio'] },
        { label: 'Alto', color: regimeColors['Alto'] }
    ];
    
    const legendGroup = svg.append('g')
        .attr('transform', `translate(${width - 100}, 20)`);
    
    legend.forEach((item, i) => {
        legendGroup.append('rect')
            .attr('x', 0).attr('y', i * 25)
            .attr('width', 15).attr('height', 15)
            .attr('fill', item.color)
            .attr('opacity', 0.7);
        
        legendGroup.append('text')
            .attr('x', 20).attr('y', i * 25 + 12)
            .text(item.label)
            .style('font-size', '12px')
            .style('fill', '#333');
    });
    
    console.log('✅ Gráfica de regímenes dibujada para ' + crypto);
}

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

function drawReturnsVolChart(crypto) {
    const container = d3.select('#returns-vol-chart');
    container.html('');
    
    const containerWidth = container.node().getBoundingClientRect().width;
    const containerHeight = container.node().getBoundingClientRect().height;
    
    const margin = { top: 20, right: 60, bottom: 60, left: 60 };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;
    
    const svg = container.append('svg')
        .attr('width', containerWidth)
        .attr('height', containerHeight)
        .style('display', 'block')
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
    
    svg.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(y1).tickSize(-width).tickFormat(''));
    
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
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .style('font-size', '12px')
        .style('font-weight', 'bold')
        .attr('fill', cryptoColors[crypto])
        .text('Returns Absolutos (%)');
    
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(${width},0)`)
        .call(d3.axisRight(y2))
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 45)
        .attr('x', -height / 2)
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .style('font-size', '12px')
        .style('font-weight', 'bold')
        .attr('fill', '#dc3545')
        .text('Volatilidad (%)');
    
    const barWidth = width / combinedData.length;
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
        .attr('opacity', 0.3)
        .on('mouseover', function(event, d) {
            d3.select(this).attr('opacity', 0.6);
            showTooltip(event, `<strong>${d3.timeFormat('%Y-%m-%d')(d.date)}</strong><br/>Return Abs: ${d.absReturn.toFixed(2)}%<br/>Volatilidad: ${d.volatility.toFixed(2)}%`);
        })
        .on('mousemove', function(event, d) {
            showTooltip(event, `<strong>${d3.timeFormat('%Y-%m-%d')(d.date)}</strong><br/>Return Abs: ${d.absReturn.toFixed(2)}%<br/>Volatilidad: ${d.volatility.toFixed(2)}%`);
        })
        .on('mouseout', function() {
            d3.select(this).attr('opacity', 0.3);
            hideTooltip();
        });
    
    const line = d3.line()
        .x(d => x(d.date))
        .y(d => y2(d.volatility))
        .curve(d3.curveMonotoneX);
    
    svg.append('path')
        .datum(combinedData)
        .attr('fill', 'none')
        .attr('stroke', '#dc3545')
        .attr('stroke-width', 2.5)
        .attr('d', line);
    
    // Agregar puntos en la línea para mejor interacción
    svg.selectAll('.vol-point')
        .data(combinedData)
        .enter()
        .append('circle')
        .attr('class', 'vol-point')
        .attr('cx', d => x(d.date))
        .attr('cy', d => y2(d.volatility))
        .attr('r', 3)
        .attr('fill', '#dc3545')
        .attr('opacity', 0)
        .on('mouseover', function(event, d) {
            d3.select(this).attr('opacity', 1).attr('r', 5);
            showTooltip(event, `<strong>${d3.timeFormat('%Y-%m-%d')(d.date)}</strong><br/>Return Abs: ${d.absReturn.toFixed(2)}%<br/>Volatilidad: ${d.volatility.toFixed(2)}%`);
        })
        .on('mousemove', function(event, d) {
            showTooltip(event, `<strong>${d3.timeFormat('%Y-%m-%d')(d.date)}</strong><br/>Return Abs: ${d.absReturn.toFixed(2)}%<br/>Volatilidad: ${d.volatility.toFixed(2)}%`);
        })
        .on('mouseout', function() {
            d3.select(this).attr('opacity', 0).attr('r', 3);
            hideTooltip();
        });
    
    console.log('✅ Gráfica returns vs volatilidad dibujada para ' + crypto);
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

console.log('📦 Dashboard JavaScript cargado completamente');