// js/charts/TemporalChart.js - Temporal Analysis: Pre-AI vs Post-AI Evolution

class TemporalChart extends ChartBase {
    constructor() {
        super('temporalChart');
        this.sectionConfig = {
            id: 'temporal-section',
            title: 'Temporal Analysis: Pre-AI vs Post-AI Evolution',
            description: 'Salary trends evolution by experience level before and after AI boom'
        };
        this.apiEndpoint = window.ENV?.API_ENDPOINT;
        this.data = null;
        
        // DEBUG: Verificar que DashboardConfig esté disponible
        console.log('🔍 TemporalChart constructor - DashboardConfig available:', typeof DashboardConfig !== 'undefined');
        if (typeof DashboardConfig !== 'undefined') {
            console.log('🔍 TemporalChart - sampleData available:', !!DashboardConfig.sampleData);
            console.log('🔍 TemporalChart - temporal sampleData:', DashboardConfig.sampleData?.temporal);
        }
    }

    // Fetch data from API
    async fetchData() {
        try {
            console.log('🔍 Fetching temporal data from API...');
            
            // DEBUG: Verificar endpoint
            console.log('🔍 API Endpoint:', this.apiEndpoint);
            
            if (!this.apiEndpoint) {
                console.warn('⚠️ No API endpoint configured, using default data immediately');
                this.setDefaultData();
                return false;
            }
            
            const response = await fetch(this.apiEndpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const apiData = await response.json();
            
            if (apiData.status !== 'success') {
                throw new Error('API returned error status');
            }
            
            const temporalData = apiData.info?.temporal;
            
            // DEBUG: Verificar datos del API
            console.log('🔍 API temporal data received:', temporalData);
            
            // VERIFICACIÓN MÁS ESTRICTA - Comprobar si tiene TODOS los datasets necesarios
            const hasValidDatasets = temporalData?.datasets && 
                                Array.isArray(temporalData.datasets) && 
                                temporalData.datasets.length >= 6 && // ← CAMBIO IMPORTANTE: Requerir al menos 6 datasets
                                temporalData.datasets.every(dataset => 
                                    Array.isArray(dataset.data) && dataset.data.length > 0
                                );

            console.log('🔍 API temporal data validation:', {
                hasTemporalData: !!temporalData,
                hasValidDatasets: hasValidDatasets,
                datasetCount: temporalData?.datasets?.length || 0,
                datasetLabels: temporalData?.datasets?.map(d => d.label) || [],
                requiredDatasets: 6,
                hasAllLevels: temporalData?.datasets?.length >= 6
            });

            // SI NO TIENE TODOS LOS DATASETS, USAR DEFAULTS
            if (!temporalData || !hasValidDatasets || temporalData.datasets.length < 6) {
                console.warn('⚠️ Temporal data missing required datasets from API response, using defaults');
                console.warn('⚠️ Expected 6 datasets, got:', temporalData?.datasets?.length || 0);
                this.setDefaultData();
                return false;
            }

            this.data = {
                labels: temporalData.labels || [],
                datasets: temporalData.datasets || [],
                growth: temporalData.growth || {}
            };

            console.log('✅ Temporal data fetched successfully from API');
            console.log('📊 Final data structure:', this.data);
            return true;

        } catch (error) {
            console.error('❌ Error fetching temporal data:', error);
            this.setDefaultData();
            return false;
        }
    }

    // Set default data in case of error
    setDefaultData() {
        console.log('🔄 Using default temporal data...');
        
        // DEBUG: Verificar que DashboardConfig tenga los datos correctos
        if (typeof DashboardConfig === 'undefined') {
            console.error('❌ CRITICAL: DashboardConfig is not defined!');
            this.data = {
                labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
                datasets: [
                    { label: 'Entry Level', data: [48000, 52000, 56000, 58000, 62000, 65000], color: '#3498db' },
                    { label: 'Junior', data: [62000, 65000, 68000, 75000, 78000, 82000], color: '#2ecc71' },
                    { label: 'Mid-Level', data: [85000, 90000, 95000, 115000, 120000, 125000], color: '#f39c12' },
                    { label: 'Senior', data: [120000, 128000, 135000, 155000, 165000, 175000], color: '#e74c3c' },
                    { label: 'Lead', data: [150000, 160000, 165000, 195000, 205000, 215000], color: '#9b59b6' },
                    { label: 'Executive', data: [195000, 205000, 210000, 245000, 255000, 265000], color: '#34495e' }
                ],
                growth: {
                    'Entry Level': [8.3, 7.7, 3.6, 6.9, 4.8],
                    'Junior': [4.8, 4.6, 10.3, 4.0, 5.1],
                    'Mid-Level': [5.9, 5.6, 21.1, 4.3, 4.2],
                    'Senior': [6.7, 5.5, 14.8, 6.5, 6.1],
                    'Lead': [6.7, 3.1, 18.2, 5.1, 4.9],
                    'Executive': [5.1, 2.4, 16.7, 4.1, 3.9]
                }
            };
        } else {
            console.log('🔍 Default data from DashboardConfig:', DashboardConfig.sampleData?.temporal);
            this.data = DashboardConfig.sampleData.temporal;
        }
        
        console.log('✅ Default data set with', this.data.datasets.length, 'datasets');
        console.log('📊 Default dataset labels:', this.data.datasets.map(d => d.label));
    }

    // Prepare data for chart
    prepareData(rawData) {
        console.log('🔍 prepareData called with rawData:', rawData);
        
        let data = rawData || this.data;
        
        // Si no hay datos o los datos son inválidos, usar los datos por defecto
        if (!data || !data.labels || !data.datasets || 
            !Array.isArray(data.datasets) || data.datasets.length === 0) {
            
            console.warn('⚠️ Invalid or empty data in prepareData(), using defaults');
            data = DashboardConfig.sampleData.temporal;
        }
        
        console.log('📊 Preparing temporal data with', data.datasets.length, 'datasets:');
        data.datasets.forEach((dataset, index) => {
            console.log(`  ${index + 1}. ${dataset.label}: [${dataset.data.join(', ')}]`);
        });
        
        const colors = this.getColorPalette();
        console.log('🎨 Color palette available:', colors.length, 'colors');
        
        const preparedData = {
            labels: data.labels,
            datasets: data.datasets.map((dataset, index) => {
                const color = dataset.color || colors[index % colors.length];
                console.log(`  🎨 Dataset ${index} (${dataset.label}): using color ${color}`);
                
                return {
                    label: dataset.label,
                    data: dataset.data,
                    borderColor: color,
                    backgroundColor: this.adjustColorOpacity(color, 0.1),
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4,
                    pointBackgroundColor: color,
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 8,
                    pointHoverBorderWidth: 3,
                    spanGaps: false
                };
            })
        };

        console.log('✅ Final prepared data structure:', preparedData);
        console.log('📈 Dataset labels in prepared data:', preparedData.datasets.map(d => d.label));
        return preparedData;
    }

    // Adjust color opacity
    adjustColorOpacity(color, opacity) {
        if (color.startsWith('#')) {
            const r = parseInt(color.slice(1, 3), 16);
            const g = parseInt(color.slice(3, 5), 16);
            const b = parseInt(color.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${opacity})`;
        }
        return color.replace(/[\d.]+\)$/g, `${opacity})`);
    }

    // Create multi-line chart
    createChart(data, baseOptions) {
        console.log('🔍 createChart called with data:', data);
        console.log('📈 Chart datasets being created:', data.datasets.map(d => d.label));
        
        const options = {
            ...baseOptions,
            ...ChartConfig.getOptionsFor('line'),
            plugins: {
                ...baseOptions.plugins,
                title: {
                    display: true,
                    text: 'Salary Evolution by Experience Level: Pre-AI vs Post-AI Era',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: 20
                },
                subtitle: {
                    display: true,
                    text: 'Tracking salary trends across all experience levels before (2020-2022) and after (2023-2025) AI boom',
                    font: {
                        size: 12,
                        style: 'italic'
                    },
                    padding: {
                        bottom: 15
                    }
                },
                legend: {
                    ...baseOptions.plugins.legend,
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 10,
                        font: {
                            size: 11,
                            weight: 'bold'
                        }
                    }
                },
                tooltip: {
                    ...baseOptions.plugins.tooltip,
                    callbacks: {
                        label: (context) => this.formatTooltipLabel(context),
                        afterLabel: (context) => {
                            // Mostrar crecimiento anual en el tooltip
                            const dataIndex = context.dataIndex;
                            const datasetLabel = context.dataset.label;
                            const growth = this.data?.growth?.[datasetLabel];
                            
                            if (growth && dataIndex > 0 && dataIndex - 1 < growth.length) {
                                const growthValue = growth[dataIndex - 1];
                                return `YoY Growth: +${growthValue}%`;
                            }
                            return '';
                        },
                        footer: (tooltipItems) => {
                            // Mostrar era en el footer del tooltip
                            const year = parseInt(tooltipItems[0].label);
                            if (year <= 2022) {
                                return '🕐 Pre-AI Era (2020-2022)';
                            } else {
                                return '🚀 Post-AI Era (2023-2025)';
                            }
                        }
                    }
                }
            },
            scales: {
                x: {
                    ...ChartConfig.getOptionsFor('line').scales.x,
                    title: {
                        display: true,
                        text: 'Year',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: ChartConfig.getCurrentThemeColors().gridColor,
                        drawOnChartArea: true
                    }
                },
                y: {
                    ...ChartConfig.getOptionsFor('line').scales.y,
                    title: {
                        display: true,
                        text: 'Annual Salary (USD)',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        callback: function(value) {
                            return ChartConfig.formatCurrency(value);
                        }
                    }
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            },
            elements: {
                line: {
                    tension: 0.4
                }
            }
        };

        const chart = new Chart(this.ctx, {
            type: 'line',
            data: data,
            options: options
        });

        console.log('✅ Chart created successfully');
        console.log('📊 Final chart datasets:', chart.data.datasets.map(d => d.label));
        return chart;
    }

    // Create HTML section
    static createSection() {
        const section = document.createElement('div');
        section.className = 'analysis-section';
        section.id = 'temporal-section';

        const config = DashboardConfig.getSectionById('temporal');
        const title = DashboardConfig.getSectionTitle('temporal');

        section.innerHTML = `
            ${title}
            <div class="columns-needed">
                <div class="columns-title">Required Columns:</div>
                <div class="columns-list">${config.requiredColumns.join(', ')}</div>
            </div>
            <div class="chart-container" style="height: 600px;">
                <canvas id="temporalChart"></canvas>
            </div>
            <div class="chart-description">
                <h3>📅 Key Insights - Temporal Evolution:</h3>
                <ul>
                    <li><strong>Entry Level - Junior:</strong> Moderate but consistent growth throughout both eras</li>
                    <li><strong>Mid-Level:</strong> Highest growth spike in 2023 (+21.1%) due to AI skill demand</li>
                    <li><strong>Senior - Lead:</strong> Strong sustained growth in Post-AI era with leadership premiums</li>
                    <li><strong>Executive:</strong> Steady growth with significant Post-AI compensation increases</li>
                    <li><strong>AI Impact (2023):</strong> All levels experienced accelerated growth, especially Mid-Level and Senior roles</li>
                </ul>
                <p><em>Note: The 2023 salary jump reflects the immediate market response to AI technology adoption, with Mid-Level roles showing the most dramatic increase as companies competed for AI-proficient professionals.</em></p>
            </div>
        `;

        return section;
    }

    // Initialize chart with API data
    static async initializeChart() {
        try {
            console.log('🚀 Initializing TemporalChart...');
            const chart = new TemporalChart();
            
            // Fetch data from API
            await chart.fetchData();
            
            setTimeout(() => {
                console.log('🔍 DEBUG - Current data before init:', chart.data);
                console.log('🔍 DEBUG - DashboardConfig sampleData:', DashboardConfig.sampleData.temporal);
                
                const success = chart.init(chart.data);
                if (success) {
                    console.log('✅ Temporal chart initialized');
                    // Verificar qué datasets se cargaron
                    if (chart.chart && chart.chart.data && chart.chart.data.datasets) {
                        console.log('📈 Chart loaded datasets:', chart.chart.data.datasets.map(d => d.label));
                    }
                } else {
                    console.error('❌ Error initializing temporal chart');
                }
            }, 100);
            
            return chart;
        } catch (error) {
            console.error('❌ Error creating temporal chart:', error);
            return null;
        }
    }

    // Refresh data from API
    async refreshData() {
        console.log('Refreshing temporal data...');
        
        const success = await this.fetchData();
        
        if (success && this.chart) {
            const preparedData = this.prepareData(this.data);
            this.chart.data = preparedData;
            this.chart.update();
            console.log('Temporal data refreshed successfully');
        }
    }

    // Format custom tooltip label
    formatTooltipLabel(context) {
        const value = context.parsed.y;
        const level = context.dataset.label;
        const year = context.label;
        return `${level}: ${ChartConfig.formatCurrency(value)}`;
    }
}

// Make available globally
window.TemporalChart = TemporalChart;