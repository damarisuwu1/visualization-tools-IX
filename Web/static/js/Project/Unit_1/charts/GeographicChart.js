// js/charts/GeographicChart.js - Geographic Salary Analysis Chart with API Integration

class GeographicChart extends ChartBase {
    constructor() {
        super('geoChart');
        this.sectionConfig = {
            id: 'geographic-section',
            title: 'Geographic Salary Analysis',
            description: 'Average salaries by country/region'
        };
        this.apiEndpoint = 'https://upy-homeworks.xpert-ia.com.mx/visualization-tools/api/unit-1/project';
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
            
            if (!geographicData) {
                console.warn('Geographic data not found in API response, using defaults');
                this.setDefaultData();
                return false;
            }

            this.data = {
                labels: geographicData.labels || [],
                data: geographicData.data || [],
                colors: geographicData.colors || null
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
        this.data = {
            labels: ['USA', 'UK', 'Germany', 'Canada', 'Australia'],
            data: [0, 0, 0, 0, 0],
            colors: null
        };
    }

    // Prepare data for chart
    prepareData(rawData) {
        const data = rawData || this.data || DashboardConfig.sampleData.geographic;
        const colors = this.getColorPalette();
        
        return {
            labels: data.labels,
            datasets: [{
                label: 'Average Salary (USD)',
                data: data.data,
                backgroundColor: data.colors || colors.slice(0, data.labels.length),
                borderColor: (data.colors || colors.slice(0, data.labels.length)).map(color => 
                    color.replace('0.8', '1')
                ),
                borderWidth: 2,
                borderRadius: 6,
                borderSkipped: false
            }]
        };
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
                    text: 'Average Salaries by Country/Region',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: 20
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
            <div class="chart-container">
                <canvas id="geoChart"></canvas>
            </div>
            <div class="chart-description">
                This chart presents average salaries by geographic location, 
                allowing identification of salary differences between countries and regions. 
                The data shows how location significantly impacts compensation.
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
        return `${country}: ${ChartConfig.formatCurrency(value)}`;
    }
}

// Make available globally
window.GeographicChart = GeographicChart;