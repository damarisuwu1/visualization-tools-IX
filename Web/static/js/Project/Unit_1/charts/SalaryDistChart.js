// js/charts/SalaryDistChart.js - Salary Distribution Chart with API Integration

class SalaryDistChart extends ChartBase {
    constructor() {
        super('salaryDistChart');
        this.sectionConfig = {
            id: 'distributional-section',
            title: 'Salary Distribution Analysis',
            description: 'Salary distribution by experience level'
        };
        this.apiEndpoint = 'https://upy-homeworks.xpert-ia.com.mx/visualization-tools/api/unit-1/project';
        this.data = null;
    }

    // Fetch data from API
    async fetchData() {
        try {
            console.log('Fetching salary distribution data from API...');
            
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
            
            const distributionalData = apiData.info?.distributional;
            
            if (!distributionalData) {
                console.warn('Distributional data not found in API response, using defaults');
                this.setDefaultData();
                return false;
            }

            this.data = {
                labels: distributionalData.labels || [],
                data: distributionalData.data || [],
                colors: distributionalData.colors || null
            };

            console.log('Salary distribution data fetched successfully:', this.data);
            return true;

        } catch (error) {
            console.error('Error fetching salary distribution data:', error);
            this.setDefaultData();
            return false;
        }
    }

    // Set default data in case of error
    setDefaultData() {
        console.log('Using default salary distribution data...');
        this.data = {
            labels: ['Entry Level', 'Junior', 'Mid-Level', 'Senior', 'Lead', 'Executive'],
            data: [0, 0, 0, 0, 0, 0],
            colors: null
        };
    }

    // Prepare data for chart
    prepareData(rawData) {
        // Si rawData ya tiene la estructura correcta del API
        const data = rawData || this.data || DashboardConfig.sampleData.distributional;
        const colors = this.getColorPalette();
        
        // IMPORTANTE: Asegurarse de que los datos existen
        if (!data || !data.labels || !data.data) {
            console.error('Invalid data structure:', data);
            return {
                labels: [],
                datasets: [{
                    label: 'Average Salary (USD)',
                    data: [],
                    backgroundColor: [],
                    borderColor: [],
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            };
        }
        
        return {
            labels: data.labels,
            datasets: [{
                label: 'Average Salary (USD)',
                data: data.data, // Asegúrate que esto sea un array de números
                backgroundColor: data.colors || colors.slice(0, data.labels.length),
                borderColor: (data.colors || colors.slice(0, data.labels.length)).map(color => 
                    color.replace('0.8', '1')
                ),
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false
            }]
        };
    }

    // Create bar chart
    createChart(data, baseOptions) {
        const options = {
            ...baseOptions,
            ...ChartConfig.getOptionsFor('bar'),
            plugins: {
                ...baseOptions.plugins,
                title: {
                    display: true,
                    text: 'Salary Distribution by Experience Level',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: 20
                }
            },
            scales: {
                ...ChartConfig.getOptionsFor('bar').scales,
                y: {
                    ...ChartConfig.getOptionsFor('bar').scales.y,
                    title: {
                        display: true,
                        text: 'Annual Salary (USD)',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                x: {
                    ...ChartConfig.getOptionsFor('bar').scales.x,
                    title: {
                        display: true,
                        text: 'Experience Level',
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
        section.id = 'distributional-section';

        const config = DashboardConfig.getSectionById('distributional');
        const title = DashboardConfig.getSectionTitle('distributional');

        section.innerHTML = `
            ${title}
            <div class="columns-needed">
                <div class="columns-title">Required Columns:</div>
                <div class="columns-list">${config.requiredColumns.join(', ')}</div>
            </div>
            <div class="chart-container">
                <canvas id="salaryDistChart"></canvas>
            </div>
            <div class="chart-description">
                This chart shows the distribution of average salaries by experience level. 
                The data reveals a clear progression from junior positions to executive roles, 
                allowing identification of salary gaps between different levels.
            </div>
        `;

        return section;
    }

    // Initialize chart with API data
    static async initializeChart() {
        try {
            const chart = new SalaryDistChart();
            
            // Fetch data from API
            await chart.fetchData();
            
            setTimeout(() => {
                const success = chart.init(chart.data);
                if (success) {
                    console.log('✅ Salary distribution chart initialized');
                } else {
                    console.error('❌ Error initializing salary distribution chart');
                }
            }, 100);
            
            return chart;
        } catch (error) {
            console.error('❌ Error creating salary distribution chart:', error);
            return null;
        }
    }

    // Refresh data from API
    async refreshData() {
        console.log('Refreshing salary distribution data...');
        
        const success = await this.fetchData();
        
        if (success && this.chart) {
            const preparedData = this.prepareData(this.data);
            this.chart.data = preparedData;
            this.chart.update();
            console.log('Salary distribution data refreshed successfully');
        }
    }

    // Format custom tooltip label
    formatTooltipLabel(context) {
        const value = context.parsed.y;
        return `${context.dataset.label}: ${ChartConfig.formatCurrency(value)}`;
    }
}

// Make available globally
window.SalaryDistChart = SalaryDistChart;