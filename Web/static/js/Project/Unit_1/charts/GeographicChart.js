// js/charts/GeographicChart.js - Geographic Salary Analysis: Pre-AI vs Post-AI Era

class GeographicChart extends ChartBase {
    constructor() {
        super('geoChart');
        this.sectionConfig = {
            id: 'geographic-section',
            title: 'Geographic Analysis: Pre-AI vs Post-AI Era',
            description: 'Average salaries by country/region before and after AI boom'
        };
        this.apiEndpoint = window.ENV?.API_ENDPOINT;
        this.data = null;
    }

    // Fetch data from API
    async fetchData() {
        try {
            console.log('Fetching geographic data from API...');
            
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
            
            const geographicData = apiData.info?.geographic;
            
            // VERIFICACIÓN MÁS ESTRICTA - Comprobar si los arrays de datos están vacíos
            const hasValidPreAIData = geographicData?.preAI?.data && 
                                    Array.isArray(geographicData.preAI.data) && 
                                    geographicData.preAI.data.length > 0;
            
            const hasValidPostAIData = geographicData?.postAI?.data && 
                                     Array.isArray(geographicData.postAI.data) && 
                                     geographicData.postAI.data.length > 0;

            if (!geographicData || !hasValidPreAIData || !hasValidPostAIData) {
                console.warn('Geographic data not found or has empty arrays in API response, using defaults');
                this.setDefaultData();
                return false;
            }

            this.data = {
                labels: geographicData.labels || [],
                preAI: geographicData.preAI || {},
                postAI: geographicData.postAI || {},
                growth: geographicData.growth || []
            };

            console.log('Geographic data fetched successfully:', this.data);
            return true;

        } catch (error) {
            console.error('Error fetching geographic data:', error);
            this.setDefaultData();
            return false;
        }
    }

    // Set default data in case of error
    setDefaultData() {
        console.log('Using default geographic data...');
        console.log('Default data:', DashboardConfig.sampleData.geographic);
        this.data = DashboardConfig.sampleData.geographic;
    }

    // Prepare data for chart
    prepareData(rawData) {
        let data = rawData || this.data;
        
        // Si no hay datos o los datos son inválidos, usar los datos por defecto
        if (!data || !data.labels || !data.preAI || !data.postAI || 
            !Array.isArray(data.preAI.data) || data.preAI.data.length === 0 ||
            !Array.isArray(data.postAI.data) || data.postAI.data.length === 0) {
            
            console.warn('Invalid or empty data in prepareData(), using defaults');
            data = DashboardConfig.sampleData.geographic;
        }
        
        return {
            labels: data.labels,
            datasets: [
                {
                    label: data.preAI.label || 'Pre-AI Era (2020-2022)',
                    data: data.preAI.data || [],
                    backgroundColor: data.preAI.color || '#94a3b8',
                    borderColor: this.adjustColorOpacity(data.preAI.color || '#94a3b8', 1),
                    borderWidth: 2,
                    borderRadius: 6,
                    borderSkipped: false
                },
                {
                    label: data.postAI.label || 'Post-AI Era (2023-2025)',
                    data: data.postAI.data || [],
                    backgroundColor: data.postAI.color || '#3b82f6',
                    borderColor: this.adjustColorOpacity(data.postAI.color || '#3b82f6', 1),
                    borderWidth: 2,
                    borderRadius: 6,
                    borderSkipped: false
                }
            ]
        };
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

    // Create horizontal bar chart
    createChart(data, baseOptions) {
        const options = {
            ...baseOptions,
            indexAxis: 'y',
            plugins: {
                ...baseOptions.plugins,
                title: {
                    display: true,
                    text: 'Geographic Salary Evolution: Pre-AI vs Post-AI Era',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: 20
                },
                subtitle: {
                    display: true,
                    text: 'Comparison of average salaries by country before and after AI boom',
                    font: {
                        size: 12,
                        style: 'italic'
                    },
                    padding: {
                        bottom: 15
                    }
                },
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    }
                },
                tooltip: {
                    ...baseOptions.plugins.tooltip,
                    callbacks: {
                        label: (context) => this.formatTooltipLabel(context),
                        afterLabel: (context) => {
                            // Mostrar crecimiento en el tooltip
                            const dataIndex = context.dataIndex;
                            const growth = this.data?.growth?.[dataIndex];
                            
                            if (growth !== undefined && context.datasetIndex === 1) {
                                return `Growth: +${growth}%`;
                            }
                            return '';
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        color: ChartConfig.getCurrentThemeColors().gridColor
                    },
                    ticks: {
                        color: ChartConfig.getCurrentThemeColors().textSecondary,
                        font: {
                            size: 12,
                            weight: '500'
                        },
                        callback: function(value) {
                            return ChartConfig.formatCurrency(value);
                        }
                    },
                    title: {
                        display: true,
                        text: 'Annual Salary (USD)',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                y: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: ChartConfig.getCurrentThemeColors().textSecondary,
                        font: {
                            size: 12,
                            weight: '500'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Country/Region',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                }
            }
        };

        return new Chart(this.ctx, {
            type: 'bar',
            data: data,
            options: options
        });
    }

    // Create HTML section
    static createSection() {
        const section = document.createElement('div');
        section.className = 'analysis-section';
        section.id = 'geographic-section';

        const config = DashboardConfig.getSectionById('geographic');
        const title = DashboardConfig.getSectionTitle('geographic');

        section.innerHTML = `
            ${title}
            <div class="columns-needed">
                <div class="columns-title">Required Columns:</div>
                <div class="columns-list">${config.requiredColumns.join(', ')}</div>
            </div>
            <div class="chart-container" style="height: 500px;">
                <canvas id="geoChart"></canvas>
            </div>
            <div class="chart-description">
                <h3>🌍 Key Insights:</h3>
                <ul>
                    <li><strong>Pre-AI Era (2020-2022):</strong> Salaries by country before widespread AI adoption</li>
                    <li><strong>Post-AI Era (2023-2025):</strong> Salary evolution following the AI revolution across different regions</li>
                    <li><strong>Analysis:</strong> Compare how different countries adapted to the AI boom and which regions saw the highest salary growth</li>
                </ul>
                <p><em>Note: Countries with strong tech ecosystems (like US, Canada, Australia) typically show higher growth rates post-AI boom.</em></p>
            </div>
        `;

        return section;
    }

    // Initialize chart with API data
    static async initializeChart() {
        try {
            const chart = new GeographicChart();
            
            // Fetch data from API
            await chart.fetchData();
            
            setTimeout(() => {
                const success = chart.init(chart.data);
                if (success) {
                    console.log('✅ Geographic chart initialized');
                } else {
                    console.error('❌ Error initializing geographic chart');
                }
            }, 100);
            
            return chart;
        } catch (error) {
            console.error('❌ Error creating geographic chart:', error);
            return null;
        }
    }

    // Refresh data from API
    async refreshData() {
        console.log('Refreshing geographic data...');
        
        const success = await this.fetchData();
        
        if (success && this.chart) {
            const preparedData = this.prepareData(this.data);
            this.chart.data = preparedData;
            this.chart.update();
            console.log('Geographic data refreshed successfully');
        }
    }

    // Format custom tooltip label
    formatTooltipLabel(context) {
        const value = context.parsed.x;
        const country = context.label;
        return `${context.dataset.label}: ${ChartConfig.formatCurrency(value)}`;
    }
}

// Make available globally
window.GeographicChart = GeographicChart;