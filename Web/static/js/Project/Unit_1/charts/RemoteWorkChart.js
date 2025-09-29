// js/charts/RemoteWorkChart.js - Remote Work Analysis Chart with API Integration

class RemoteWorkChart extends ChartBase {
    constructor() {
        super('remoteChart');
        this.sectionConfig = {
            id: 'remote-section',
            title: 'Remote Work Analysis',
            description: 'Salary evolution by remote work modality'
        };
        this.apiEndpoint = window.ENV?.API_ENDPOINT;;
        this.data = null;
    }

    // Fetch data from API
    async fetchData() {
        try {
            console.log('Fetching remote work data from API...');
            
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
            
            const remoteData = apiData.info?.remote;
            
            if (!remoteData) {
                console.warn('Remote work data not found in API response, using defaults');
                this.setDefaultData();
                return false;
            }

            this.data = {
                labels: remoteData.labels || [],
                datasets: remoteData.datasets || []
            };

            console.log('Remote work data fetched successfully:', this.data);
            return true;

        } catch (error) {
            console.error('Error fetching remote work data:', error);
            this.setDefaultData();
            return false;
        }
    }

    // Set default data in case of error
    setDefaultData() {
        console.log('Using default remote work data...');
        this.data = {
            labels: ['2020', '2021', '2022', '2023', '2024'],
            datasets: [
                {
                    label: 'Remote',
                    data: [0, 0, 0, 0, 0],
                    color: 'rgba(52, 152, 219, 1)'
                },
                {
                    label: 'Hybrid',
                    data: [0, 0, 0, 0, 0],
                    color: 'rgba(46, 204, 113, 1)'
                },
                {
                    label: 'On-site',
                    data: [0, 0, 0, 0, 0],
                    color: 'rgba(231, 76, 60, 1)'
                }
            ]
        };
    }

    // Prepare data for chart
    prepareData(rawData) {
        const data = rawData || this.data || DashboardConfig.sampleData.remote;
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
                tension: 0.4,
                pointBackgroundColor: dataset.color || colors[index],
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }))
        };
    }

    // Create line chart
    createChart(data, baseOptions) {
        const options = {
            ...baseOptions,
            ...ChartConfig.getOptionsFor('line'),
            plugins: {
                ...baseOptions.plugins,
                title: {
                    display: true,
                    text: 'Salary Evolution by Remote Work Modality',
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
        section.id = 'remote-section';

        const config = DashboardConfig.getSectionById('remote');
        const title = DashboardConfig.getSectionTitle('remote');

        section.innerHTML = `
            ${title}
            <div class="columns-needed">
                <div class="columns-title">Required Columns:</div>
                <div class="columns-list">${config.requiredColumns.join(', ')}</div>
            </div>
            <div class="chart-container">
                <canvas id="remoteChart"></canvas>
            </div>
            <div class="chart-description">
                This chart shows how salaries have evolved according to remote work modality over time. 
                You can observe the growing compensation trend for fully remote and hybrid jobs, 
                reflecting the shift in the post-pandemic job market.
            </div>
        `;

        return section;
    }

    // Initialize chart with API data
    static async initializeChart() {
        try {
            const chart = new RemoteWorkChart();
            
            // Fetch data from API
            await chart.fetchData();
            
            setTimeout(() => {
                const success = chart.init(chart.data);
                if (success) {
                    console.log('✅ Remote work chart initialized');
                } else {
                    console.error('❌ Error initializing remote work chart');
                }
            }, 100);
            
            return chart;
        } catch (error) {
            console.error('❌ Error creating remote work chart:', error);
            return null;
        }
    }

    // Refresh data from API
    async refreshData() {
        console.log('Refreshing remote work data...');
        
        const success = await this.fetchData();
        
        if (success && this.chart) {
            const preparedData = this.prepareData(this.data);
            this.chart.data = preparedData;
            this.chart.update();
            console.log('Remote work data refreshed successfully');
        }
    }

    // Format custom tooltip label
    formatTooltipLabel(context) {
        const value = context.parsed.y;
        const modality = context.dataset.label;
        const year = context.label;
        return `${modality} (${year}): ${ChartConfig.formatCurrency(value)}`;
    }
}

// Make available globally
window.RemoteWorkChart = RemoteWorkChart;