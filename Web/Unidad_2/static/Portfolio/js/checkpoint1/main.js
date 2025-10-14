/**
 * ═══════════════════════════════════════════════════════════════════
 * CRYPTOCURRENCY ANALYTICS DASHBOARD - JAVASCRIPT
 * ═══════════════════════════════════════════════════════════════════
 * 
 * ESTRUCTURA DEL ARCHIVO:
 * 1. Configuración de colores y constantes
 * 2. Datos de las gráficas
 * 3. Sistema de pestañas
 * 4. Funciones de inicialización
 * 5. Funciones de dibujo de gráficas (una por cada gráfica)
 * 6. Funciones auxiliares
 * 
 * INSTRUCCIONES PARA MODIFICAR:
 * - Cada sección está claramente marcada
 * - Lee los comentarios antes de hacer cambios
 * - Las funciones están organizadas por pestaña
 */

// ═══════════════════════════════════════════════════════════════════
// 1. CONFIGURACIÓN DE COLORES Y CONSTANTES
// ═══════════════════════════════════════════════════════════════════

/**
 * COLORES POR CRIPTOMONEDA
 * Para agregar una nueva crypto, añade su color aquí
 */
const cryptoColors = {
    'BTC-USD': '#F7931A',
    'ETH-USD': '#627EEA',
    'DOGE-USD': '#C2A633',
    'SOL-USD': '#14F195',
    'USDT-USD': '#26A17B'
};

/**
 * COLORES PARA REGÍMENES DE VOLATILIDAD
 */
const regimeColors = {
    'Bajo': '#28a745',
    'Medio': '#ffc107',
    'Alto': '#dc3545'
};

// ═══════════════════════════════════════════════════════════════════
// 2. DATOS DE LAS GRÁFICAS
// ═══════════════════════════════════════════════════════════════════

/**
 * DATOS DEL MAPA MUNDIAL
 * Para agregar un país:
 * 1. Añade el objeto con { name, code (ISO3), engagement }
 * 2. Asegúrate de usar el código ISO3 correcto (ej: USA, JPN, MEX)
 */
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

/**
 * MAPEO DE CÓDIGOS ISO3 A IDs NUMÉRICOS
 * Necesario para TopoJSON
 */
const iso3ToId = {
    'USA': 840, 'CHN': 156, 'JPN': 392, 'BRA': 76, 'DEU': 276,
    'MEX': 484, 'IND': 356, 'KOR': 410, 'SGP': 702, 'GBR': 826
};

/**
 * DATOS DE CORRELACIÓN CRUZADA
 * Análisis de correlación entre interés y volatilidad
 */
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

/**
 * DATOS SCATTER: ENGAGEMENT VS VOLATILIDAD
 */
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

/**
 * DATOS DE VOLATILIDAD COMPARATIVA
 * Para agregar una nueva crypto, añade un objeto aquí
 */
const volatilityData = [
    { asset: 'DOGE-USD', volatility: 6.53, color: '#fb923c' },
    { asset: 'SOL-USD', volatility: 5.63, color: '#818cf8' },
    { asset: 'ETH-USD', volatility: 3.87, color: '#34d399' },
    { asset: 'BTC-USD', volatility: 2.92, color: '#fbbf24' },
    { asset: 'USDT-USD', volatility: 0.04, color: '#06b6d4' }
];

/**
 * DATOS DETALLADOS POR CRIPTOMONEDA
 * Esta estructura contiene TODOS los datos para la pestaña "Detalle"
 * 
 * PARA AGREGAR UNA NUEVA CRIPTOMONEDA:
 * 1. Copia todo el bloque de una crypto existente (ej: 'BTC-USD')
 * 2. Cambia el nombre de la clave (ej: 'ADA-USD')
 * 3. Actualiza todos los valores de datos
 * 4. Añade el color en cryptoColors arriba
 * 5. Añade la opción en el <select> del HTML
 */
const realData = {
    'BTC-USD': {
        volatilityData: [],      // Se genera automáticamente
        acfData: [               // Datos de Autocorrelación
            { lag: 1, value: 0.1022 }, { lag: 2, value: 0.0831 }, { lag: 3, value: 0.0765 },
            { lag: 4, value: 0.0899 }, { lag: 5, value: 0.0772 }, { lag: 6, value: 0.0654 },
            { lag: 7, value: 0.0712 }, { lag: 8, value: 0.0632 }, { lag: 9, value: 0.0543 },
            { lag: 10, value: 0.0160 }, { lag: 11, value: 0.0432 }, { lag: 12, value: 0.0543 },
            { lag: 13, value: 0.0654 }, { lag: 14, value: 0.0765 }, { lag: 15, value: 0.0876 },
            { lag: 16, value: 0.0765 }, { lag: 17, value: 0.0654 }, { lag: 18, value: 0.0543 },
            { lag: 19, value: 0.0432 }, { lag: 20, value: 0.0422 }
        ],
        returnsVolData: [],      // Se genera automáticamente
        scatterData: [],         // Se genera automáticamente
        regimeThresholds: { p33: 45.31, p67: 63.39 },  // Umbrales de régimen
        correlation: 0.194646    // Correlación volumen-volatilidad
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
// 3. SISTEMA DE PESTAÑAS
// ═══════════════════════════════════════════════════════════════════

/**
 * FUNCIÓN PRINCIPAL PARA CAMBIAR DE PESTAÑA
 * Esta función se llama desde el HTML con onclick="changeTab('nombre')"
 * 
 * @param {string} tabName - El nombre de la pestaña a activar
 * 
 * PARA AGREGAR UNA NUEVA PESTAÑA:
 * 1. Agregar el botón en el HTML con data-tab="mi-pestana"
 * 2. Agregar la sección con id="mi-pestana" y class="tab-content"
 * 3. Agregar un case en el switch de abajo con las funciones a ejecutar
 */
function changeTab(tabName) {
    // Ocultar todas las pestañas
    const allTabs = document.querySelectorAll('.tab-content');
    allTabs.forEach(tab => tab.classList.remove('active'));
    
    // Desactivar todos los botones
    const allButtons = document.querySelectorAll('.tab-button');
    allButtons.forEach(btn => btn.classList.remove('active'));
    
    // Activar la pestaña seleccionada
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Activar el botón correspondiente
    const selectedButton = document.querySelector(`[data-tab="${tabName}"]`);
    if (selectedButton) {
        selectedButton.classList.add('active');
    }
    
    // Ejecutar las funciones de dibujo específicas de cada pestaña
    switch(tabName) {
        case 'overview':
            // Dibujar gráficas de la pestaña Overview
            updateOverviewCharts();
            break;
        case 'volatilidad':
            // Dibujar gráficas de la pestaña Volatilidad
            updateVolatilityCharts();
            break;
        case 'detalle':
            // Dibujar gráficas de la pestaña Detalle
            updateDetailCharts();
            break;
        // PARA AGREGAR NUEVA PESTAÑA, añade un nuevo case:
        // case 'mi-nueva-pestana':
        //     updateMiNuevaPestanaCharts();
        //     break;
    }
    
    console.log(`✅ Pestaña cambiada a: ${tabName}`);
}

// ═══════════════════════════════════════════════════════════════════
// 4. FUNCIONES DE INICIALIZACIÓN
// ═══════════════════════════════════════════════════════════════════

/**
 * INICIALIZACIÓN AL CARGAR LA PÁGINA
 * Esta función se ejecuta automáticamente cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Dashboard inicializando...');
    
    // Generar datos sintéticos para series temporales
    generateTimeSeriesData();
    
    // Dibujar las gráficas de la pestaña activa (Overview por defecto)
    updateOverviewCharts();
    
    // Configurar resize responsivo
    setupResponsiveResize();
    
    console.log('✅ Dashboard inicializado correctamente');
});

/**
 * GENERAR DATOS DE SERIES TEMPORALES
 * Genera datos sintéticos para volatilidad, returns y scatter
 * Se ejecuta una sola vez al cargar la página
 */
function generateTimeSeriesData() {
    const startDate = new Date('2020-10-11');
    const endDate = new Date('2025-10-11');
    const daysDiff = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));

    Object.keys(cryptoColors).forEach(crypto => {
        let baseVol, volRange;
        
        // Configurar parámetros según la crypto
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

        // Generar datos semanales
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

/**
 * CONFIGURAR RESIZE RESPONSIVO
 * Redibuja las gráficas cuando cambia el tamaño de la ventana
 */
function setupResponsiveResize() {
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Obtener la pestaña activa
            const activeTab = document.querySelector('.tab-content.active');
            if (activeTab) {
                const tabId = activeTab.id;
                changeTab(tabId); // Redibujar la pestaña activa
            }
        }, 250);
    });
}

// ═══════════════════════════════════════════════════════════════════
// 5. FUNCIONES DE ACTUALIZACIÓN POR PESTAÑA
// ═══════════════════════════════════════════════════════════════════

/**
 * ACTUALIZAR GRÁFICAS DE LA PESTAÑA OVERVIEW
 * Llama a todas las funciones de dibujo de esta pestaña
 * 
 * PARA AGREGAR UNA NUEVA GRÁFICA:
 * 1. Crear la función draw___ abajo
 * 2. Llamarla aquí
 */
function updateOverviewCharts() {
    drawWorldMap();
    drawTopCountriesChart();
    drawRegionalDistribution();
}

/**
 * ACTUALIZAR GRÁFICAS DE LA PESTAÑA VOLATILIDAD
 */
function updateVolatilityCharts() {
    drawVolatilityComparison();
    drawCorrelationChart();
    drawScatterChart();
}

/**
 * ACTUALIZAR GRÁFICAS DE LA PESTAÑA DETALLE
 * Se llama cuando se cambia la criptomoneda en el selector
 */
function updateDetailCharts() {
    const crypto = document.getElementById('crypto-selector').value;
    drawRegimeChart(crypto);
    drawACFChart(crypto);
    drawReturnsVolChart(crypto);
    drawScatterVolChart(crypto);
}

// ═══════════════════════════════════════════════════════════════════
// 6. FUNCIONES DE DIBUJO - PESTAÑA OVERVIEW
// ═══════════════════════════════════════════════════════════════════

/**
 * DIBUJAR MAPA MUNDIAL
 * Visualiza el engagement por país usando TopoJSON
 * 
 * IMPORTANTE: Requiere D3.js y TopoJSON
 */
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
    
    // Crear mapa de engagement por ID numérico
    const engagementMap = new Map();
    worldMapData.countries.forEach(d => {
        const numericId = iso3ToId[d.code];
        if (numericId) {
            engagementMap.set(numericId.toString(), d);
        }
    });
    
    // Escala de colores
    const maxEngagement = d3.max(worldMapData.countries, d => d.engagement);
    const colorScale = d3.scaleLinear()
        .domain([0, maxEngagement])
        .range(['#fef3c7', '#a855f7']);
    
    // Proyección del mapa
    const projection = d3.geoMercator()
        .scale(width / 6.5)
        .translate([width / 2, height / 1.5]);
    
    const path = d3.geoPath().projection(projection);
    
    // Cargar TopoJSON y dibujar
    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
        .then(world => {
            const countries = topojson.feature(world, world.objects.countries);
            
            // Dibujar países
            svg.selectAll('path')
                .data(countries.features)
                .enter()
                .append('path')
                .attr('d', path)
                .attr('fill', d => {
                    const countryData = engagementMap.get(d.id);
                    return countryData ? colorScale(countryData.engagement) : '#e5e7eb';
                })
                .attr('stroke', '#ffffff')
                .attr('stroke-width', 0.5)
                .attr('class', 'country')
                .on('mouseover', function(event, d) {
                    const countryData = engagementMap.get(d.id);
                    if (countryData) {
                        d3.select(this).attr('stroke', '#000').attr('stroke-width', 2);
                        showTooltip(event, `<strong>${countryData.name}</strong><br/>Engagement: ${countryData.engagement.toLocaleString()}`);
                    }
                })
                .on('mouseout', function() {
                    d3.select(this).attr('stroke', '#ffffff').attr('stroke-width', 0.5);
                    hideTooltip();
                });
            
            // Etiquetas de países
            worldMapData.countries.forEach(country => {
                const numericId = iso3ToId[country.code];
                const feature = countries.features.find(f => f.id === numericId.toString());
                
                if (feature) {
                    const centroid = d3.geoCentroid(feature);
                    const projected = projection(centroid);
                    
                    if (projected && !isNaN(projected[0]) && !isNaN(projected[1])) {
                        svg.append('text')
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
            
            // Leyenda
            addMapLegend(svg, colorScale, width, height);
            console.log('✅ Mapa mundial dibujado');
        })
        .catch(error => {
            console.error('Error cargando mapa:', error);
        });
}

/**
 * AGREGAR LEYENDA AL MAPA
 */
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

/**
 * DIBUJAR TOP 10 PAÍSES
 * Gráfica de barras con los países de mayor engagement
 */
function drawTopCountriesChart() {
    const container = d3.select('#top-countries-chart');
    container.html('');
    
    const margin = { top: 20, right: 30, bottom: 60, left: 100 };
    const width = container.node().getBoundingClientRect().width - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;
    
    const svg = container.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Ordenar países por engagement
    const sortedCountries = [...worldMapData.countries].sort((a, b) => b.engagement - a.engagement);
    
    const x = d3.scaleLinear()
        .domain([0, d3.max(sortedCountries, d => d.engagement)])
        .range([0, width]);
    
    const y = d3.scaleBand()
        .domain(sortedCountries.map(d => d.name))
        .range([0, height])
        .padding(0.2);
    
    // Ejes
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));
    
    svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y));
    
    // Barras
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
        .on('mouseout', function() {
            d3.select(this).attr('opacity', 0.8);
            hideTooltip();
        });
    
    // Etiquetas de valor
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

/**
 * DIBUJAR DISTRIBUCIÓN REGIONAL
 * Gráfica de pie/donut mostrando distribución por región
 */
function drawRegionalDistribution() {
    const container = d3.select('#regional-distribution-chart');
    container.html('');
    
    const width = container.node().getBoundingClientRect().width;
    const height = 350;
    const radius = Math.min(width, height) / 2 - 40;
    
    const svg = container.append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);
    
    // Agrupar por región (simplificado)
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
        .on('mouseout', function() {
            d3.select(this).attr('opacity', 0.8);
            hideTooltip();
        });
    
    // Etiquetas
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
// 7. FUNCIONES DE DIBUJO - PESTAÑA VOLATILIDAD
// ═══════════════════════════════════════════════════════════════════

/**
 * DIBUJAR COMPARACIÓN DE VOLATILIDAD
 * Gráfica de barras horizontales
 */
function drawVolatilityComparison() {
    const container = d3.select('#volatility-comparison-chart');
    container.html('');
    
    const margin = { top: 20, right: 30, bottom: 60, left: 100 };
    const width = container.node().getBoundingClientRect().width - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;
    
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
        .range([0, height])
        .padding(0.3);
    
    // Grid
    svg.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(y).tickSize(-width).tickFormat(''));
    
    // Ejes
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));
    
    svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y));
    
    // Barras
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
        .on('mouseout', function() {
            d3.select(this).attr('opacity', 0.8);
            hideTooltip();
        });
    
    // Etiquetas
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

/**
 * DIBUJAR GRÁFICA DE CORRELACIÓN CRUZADA
 */
function drawCorrelationChart() {
    const container = d3.select('#correlation-chart');
    container.html('');
    
    const margin = { top: 20, right: 30, bottom: 60, left: 60 };
    const width = container.node().getBoundingClientRect().width - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;
    
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
    
    // Ejes
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d => d === 0 ? 'Ahora' : d + 's'));
    
    svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y));
    
    // Líneas de confianza
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
    
    // Línea de correlación
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
    
    // Puntos
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
        .on('mouseout', function() {
            d3.select(this).attr('r', 3).attr('opacity', 0.6);
            hideTooltip();
        });
    
    console.log('✅ Gráfica de correlación dibujada');
}

/**
 * DIBUJAR SCATTER ENGAGEMENT VS VOLATILIDAD
 */
function drawScatterChart() {
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
    
    // Ejes
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d => (d / 1000) + 'K'));
    
    svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y));
    
    // Etiquetas de ejes
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
    
    // Burbujas
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
        .on('mouseout', function() {
            d3.select(this).attr('opacity', 0.7).attr('stroke', 'none');
            hideTooltip();
        });
    
    console.log('✅ Scatter chart dibujado');
}

// ═══════════════════════════════════════════════════════════════════
// 8. FUNCIONES DE DIBUJO - PESTAÑA DETALLE
// ═══════════════════════════════════════════════════════════════════

/**
 * DIBUJAR GRÁFICA DE REGÍMENES DE VOLATILIDAD
 * Muestra la volatilidad clasificada en tres regímenes
 * 
 * @param {string} crypto - Símbolo de la criptomoneda (ej: 'BTC-USD')
 */
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
        .domain([0, d3.max(cryptoData, d => d.volatility)])
        .range([height, 0]);
    
    // Grid
    svg.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(y).tickSize(-width).tickFormat(''));
    
    // Ejes
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
    
    // Zonas de régimen
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
    
    // Líneas de umbral
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
    
    // Puntos de datos
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
        .on('mouseout', function() {
            d3.select(this).attr('r', 3).attr('opacity', 0.7);
            hideTooltip();
        });
    
    // Leyenda
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

/**
 * DIBUJAR FUNCIÓN DE AUTOCORRELACIÓN (ACF)
 * Muestra la persistencia de la volatilidad
 * 
 * @param {string} crypto - Símbolo de la criptomoneda
 */
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
    
    // Zona de confianza
    svg.append('rect')
        .attr('x', 0).attr('y', y(confidenceBound))
        .attr('width', width)
        .attr('height', y(-confidenceBound) - y(confidenceBound))
        .attr('fill', '#e0e0e0')
        .attr('opacity', 0.5);
    
    // Línea cero
    svg.append('line')
        .attr('x1', 0).attr('x2', width)
        .attr('y1', y(0)).attr('y2', y(0))
        .attr('stroke', '#333')
        .attr('stroke-width', 1);
    
    // Ejes
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).tickValues(x.domain().filter((d, i) => (i + 1) % 5 === 0)));
    
    svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y));
    
    // Etiquetas
    svg.append('text')
        .attr('x', width / 2).attr('y', height + 50)
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
    
    // Barras
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
        .on('mouseout', function() {
            d3.select(this).attr('opacity', 0.8);
            hideTooltip();
        });
    
    console.log('✅ Gráfica ACF dibujada para ' + crypto);
}

/**
 * DIBUJAR RETURNS ABSOLUTOS VS VOLATILIDAD
 * Superpone returns con volatilidad rolling
 * 
 * @param {string} crypto - Símbolo de la criptomoneda
 */
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
    
    // Ejes
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
    
    // Barras de returns
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
        .attr('opacity', 0.3);
    
    // Línea de volatilidad
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
    
    console.log('✅ Gráfica returns vs volatilidad dibujada para ' + crypto);
}

/**
 * DIBUJAR SCATTER VOLATILIDAD VS VOLUMEN
 * Analiza la relación entre volumen y volatilidad
 * 
 * @param {string} crypto - Símbolo de la criptomoneda
 */
function drawScatterVolChart(crypto) {
    const container = d3.select('#scatter-vol-chart');
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
    
    // Ejes
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d => (d / 1000000).toFixed(0) + 'M'));
    
    svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y));
    
    // Etiquetas
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
    
    // Línea de tendencia
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
    
    // Puntos
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
            showTooltip(event, `Volumen: ${(d.volume / 1000000).toFixed(1)}M<br/>Volatilidad: ${d.volatility.toFixed(1)}%`);
        })
        .on('mouseout', function() {
            d3.select(this).attr('r', 4).attr('opacity', 0.6);
            hideTooltip();
        });
    
    // Mostrar correlación
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

// ═══════════════════════════════════════════════════════════════════
// 9. FUNCIONES AUXILIARES - TOOLTIP
// ═══════════════════════════════════════════════════════════════════

/**
 * MOSTRAR TOOLTIP
 * Función auxiliar para mostrar el tooltip con contenido HTML
 * 
 * @param {Event} event - Evento del mouse
 * @param {string} html - Contenido HTML del tooltip
 */
function showTooltip(event, html) {
    const tooltip = d3.select('#tooltip');
    tooltip.style('opacity', 1)
        .html(html)
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 10) + 'px');
}

/**
 * OCULTAR TOOLTIP
 * Función auxiliar para ocultar el tooltip
 */
function hideTooltip() {
    d3.select('#tooltip').style('opacity', 0);
}

// ═══════════════════════════════════════════════════════════════════
// 10. FUNCIONES AUXILIARES - UTILIDADES
// ═══════════════════════════════════════════════════════════════════

/**
 * FUNCIÓN PARA OBTENER COLOR DE ENGAGEMENT
 * Útil para escalar colores basados en valores
 * 
 * @param {number} value - Valor de engagement
 * @returns {string} - Color hexadecimal
 */
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

// ═══════════════════════════════════════════════════════════════════
// FIN DEL ARCHIVO
// ═══════════════════════════════════════════════════════════════════

/**
 * ═══════════════════════════════════════════════════════════════════
 * GUÍA RÁPIDA PARA AGREGAR NUEVAS GRÁFICAS
 * ═══════════════════════════════════════════════════════════════════
 * 
 * PASO 1: AGREGAR DATOS
 * - Crear un nuevo objeto de datos en la sección 2
 * - Ejemplo:
 *   const miNuevosDatos = [
 *     { categoria: 'A', valor: 100 },
 *     { categoria: 'B', valor: 200 }
 *   ];
 * 
 * PASO 2: CREAR FUNCIÓN DE DIBUJO
 * - Copiar una función draw___ existente como plantilla
 * - Renombrar la función (ej: drawMiNuevaGrafica)
 * - Modificar el selector del container
 * - Ajustar escalas, ejes y elementos visuales según tus datos
 * 
 * PASO 3: AGREGAR AL HTML
 * - En dashboard.html, agregar un <div id="mi-nueva-grafica"></div>
 * - Envolver en un .chart-container con título y descripción
 * 
 * PASO 4: LLAMAR LA FUNCIÓN
 * - En la función update___Charts() correspondiente
 * - Agregar: drawMiNuevaGrafica();
 * 
 * PASO 5 (OPCIONAL): NUEVA PESTAÑA
 * - Agregar botón en HTML: <button data-tab="mi-tab" onclick="changeTab('mi-tab')">
 * - Agregar sección: <div id="mi-tab" class="tab-content">
 * - Agregar case en changeTab() switch
 * - Crear función updateMiTabCharts()
 * 
 * ═══════════════════════════════════════════════════════════════════
 * GUÍA RÁPIDA PARA ELIMINAR GRÁFICAS
 * ═══════════════════════════════════════════════════════════════════
 * 
 * PASO 1: ELIMINAR DEL HTML
 * - Borrar el bloque .chart-container completo
 * 
 * PASO 2: ELIMINAR FUNCIÓN DE DIBUJO
 * - Borrar la función draw___ correspondiente
 * 
 * PASO 3: ELIMINAR LLAMADA
 * - En update___Charts(), eliminar la línea que llama a la función
 * 
 * PASO 4: LIMPIAR DATOS (OPCIONAL)
 * - Si los datos ya no se usan, eliminarlos de la sección 2
 * 
 * ═══════════════════════════════════════════════════════════════════
 * EJEMPLO COMPLETO: AGREGAR GRÁFICA DE LÍNEA SIMPLE
 * ═══════════════════════════════════════════════════════════════════
 * 
 * // 1. DATOS (agregar en sección 2)
 * const misDatos = [
 *   { fecha: new Date('2024-01'), valor: 50 },
 *   { fecha: new Date('2024-02'), valor: 75 },
 *   { fecha: new Date('2024-03'), valor: 60 }
 * ];
 * 
 * // 2. FUNCIÓN DE DIBUJO (agregar en sección apropiada)
 * function drawMiGrafica() {
 *   const container = d3.select('#mi-grafica');
 *   container.html(''); // Limpiar contenido previo
 *   
 *   // Configurar dimensiones
 *   const margin = { top: 20, right: 30, bottom: 60, left: 60 };
 *   const width = container.node().getBoundingClientRect().width - margin.left - margin.right;
 *   const height = 350 - margin.top - margin.bottom;
 *   
 *   // Crear SVG
 *   const svg = container.append('svg')
 *     .attr('width', width + margin.left + margin.right)
 *     .attr('height', height + margin.top + margin.bottom)
 *     .append('g')
 *     .attr('transform', `translate(${margin.left},${margin.top})`);
 *   
 *   // Escalas
 *   const x = d3.scaleTime()
 *     .domain(d3.extent(misDatos, d => d.fecha))
 *     .range([0, width]);
 *   
 *   const y = d3.scaleLinear()
 *     .domain([0, d3.max(misDatos, d => d.valor)])
 *     .range([height, 0]);
 *   
 *   // Ejes
 *   svg.append('g')
 *     .attr('transform', `translate(0,${height})`)
 *     .call(d3.axisBottom(x));
 *   
 *   svg.append('g')
 *     .call(d3.axisLeft(y));
 *   
 *   // Línea
 *   const line = d3.line()
 *     .x(d => x(d.fecha))
 *     .y(d => y(d.valor));
 *   
 *   svg.append('path')
 *     .datum(misDatos)
 *     .attr('fill', 'none')
 *     .attr('stroke', '#667eea')
 *     .attr('stroke-width', 2)
 *     .attr('d', line);
 *   
 *   console.log('✅ Mi gráfica dibujada');
 * }
 * 
 * // 3. HTML (agregar en dashboard.html)
 * // <div class="chart-container">
 * //   <div class="chart-title">Mi Gráfica</div>
 * //   <div class="chart-description">Descripción...</div>
 * //   <div id="mi-grafica"></div>
 * // </div>
 * 
 * // 4. LLAMAR (agregar en función update correspondiente)
 * // function updateOverviewCharts() {
 * //   drawWorldMap();
 * //   drawMiGrafica(); // <- Agregar esta línea
 * // }
 * 
 * ═══════════════════════════════════════════════════════════════════
 */

console.log('📦 Dashboard JavaScript cargado completamente');