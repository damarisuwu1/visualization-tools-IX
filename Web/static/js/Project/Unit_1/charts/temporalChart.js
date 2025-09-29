// js/charts/TemporalChart.js - Temporal Analysis Chart with API Integration

class TemporalChart extends ChartBase {
    constructor() {
        super('temporalChart');
        this.sectionConfig = {
            id: 'temporal-section',
            title: 'Temporal Analysis',
            description: 'Salary trends by year and experience level'
        };
        this.apiEndpoint = window.ENV?.API_ENDPOINT;
        this.data = null;
    }

    // Fetch data from API
    async fetchData() {
        try {
            console.log('Fetching temporal data from API...');
            
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
            
            if (!temporalData) {
                console.warn('Temporal data not found in API response, using defaults');
                this.setDefaultData();
                return false;
            }

            this.data = {
                labels: temporalData.labels || [],
                datasets: temporalData.datasets || []
            };

            console.log('Temporal data fetched successfully:', this.data);
            return true;

        } catch (error) {
            console.error('Error fetching temporal data:', error);
            this.setDefaultData();
            return false;
        }
    }

    // Set default data in case of error
    setDefaultData() {
        console.log('Using default temporal data...');
        this.data = {
            labels: ['2020', '2021', '2022', '2023', '2024'],
            datasets: [
                {
                    label: 'Junior',
                    data: [0, 0, 0, 0, 0],
                    color: 'rgba(52, 152, 219, 1)'
                },
                {
                    label: 'Mid-Level',
                    data: [0, 0, 0, 0, 0],
                    color: 'rgba(46, 204, 113, 1)'
                },
                {
                    label: 'Senior',
                    data: [0, 0, 0, 0, 0],
                    color: 'rgba(231, 76, 60, 1)'
                }
            ]
        };
    }

    // Prepare data for chart
    prepareData(rawData) {
        const data = rawData || this.data || DashboardConfig.sampleData.temporal;
        const colors = this.getColorPalette();
        
        return {
            labels: data.labels,
            datasets: data.datasets.map((dataset, index) => ({
                label: dataset.label,
                data: dataset.data,
                borderColor: dataset.color || colors[index],
                backgroundColor: (dataset.color || colors[index]).replace('1)', '0.1)'),
                borderWidth: 3,
                fill: true,
                tension: 0.3,
                pointBackgroundColor: dataset.color || colors[index],
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointHoverBorderWidth: 3
            }))
        };
    }

    // Create multi-line chart
    createChart(data, baseOptions) {
        const options = {
            ...baseOptions,
            ...ChartConfig.getOptionsFor('line'),
            plugins: {
                ...baseOptions.plugins,
                title: {
                    display: true,
                    text: 'Salary Evolution by Year and Experience Level',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: 20
                },
                legend: {
                    ...baseOptions.plugins.legend,
                    display: true,
                    position: 'top'
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
                    }
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            }
        };

        return new Chart(this.ctx, {
            type: 'line',
            data: data,
            options: options
        });
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
            <div class="chart-container">
                <canvas id="temporalChart"></canvas>
            </div>
            <div class="chart-description">
                This chart shows the temporal evolution of salaries, allowing identification of growth trends 
                by experience level over the years. It's useful for understanding how the salary market has evolved 
                and projecting future trends.
            </div>
        `;

        return section;
    }

    // Initialize chart with API data
    static async initializeChart() {
        try {
            const chart = new TemporalChart();
            
            // Fetch data from API
            await chart.fetchData();
            
            setTimeout(() => {
                const success = chart.init(chart.data);
                if (success) {
                    console.log('✅ Temporal chart initialized');
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
        return `${level} (${year}): ${ChartConfig.formatCurrency(value)}`;
    }
}

// Make available globally
window.TemporalChart = TemporalChart;