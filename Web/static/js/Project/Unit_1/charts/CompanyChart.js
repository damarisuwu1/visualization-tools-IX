// js/charts/CompanyChart.js - Company Size Analysis Chart with API Integration

class CompanyChart extends ChartBase {
    constructor() {
        super('companyChart');
        this.sectionConfig = {
            id: 'company-section',
            title: 'Company Size Analysis',
            description: 'Salary distribution by company size'
        };
        this.apiEndpoint = 'https://upy-homeworks.xpert-ia.com.mx/visualization-tools/api/unit-1/project';
        this.data = null;
    }

    // Fetch data from API
    async fetchData() {
        try {
            console.log('Fetching company data from API...');
            
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
            
            const companyData = apiData.info?.company;
            
            if (!companyData) {
                console.warn('Company data not found in API response, using defaults');
                this.setDefaultData();
                return false;
            }

            this.data = {
                labels: companyData.labels || [],
                data: companyData.data || [],
                colors: companyData.colors || null
            };

            console.log('Company data fetched successfully:', this.data);
            return true;

        } catch (error) {
            console.error('Error fetching company data:', error);
            this.setDefaultData();
            return false;
        }
    }

    // Set default data in case of error
    setDefaultData() {
        console.log('Using default company data...');
        this.data = {
            labels: ['Small', 'Medium', 'Large', 'Enterprise'],
            data: [0, 0, 0, 0],
            colors: null
        };
    }

    // Prepare data for chart
    prepareData(rawData) {
        const data = rawData || this.data || DashboardConfig.sampleData.company;
        const colors = this.getColorPalette();
        
        return {
            labels: data.labels,
            datasets: [{
                label: 'Average Salary',
                data: data.data,
                backgroundColor: data.colors || colors.slice(0, data.labels.length),
                borderColor: '#ffffff',
                borderWidth: 3,
                hoverOffset: 10
            }]
        };
    }

    // Create doughnut chart
    createChart(data, baseOptions) {
        const options = {
            ...baseOptions,
            ...ChartConfig.getOptionsFor('doughnut'),
            plugins: {
                ...baseOptions.plugins,
                title: {
                    display: true,
                    text: 'Salary Distribution by Company Size',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: 20
                },
                legend: {
                    ...baseOptions.plugins.legend,
                    display: true,
                    position: 'right'
                },
                tooltip: {
                    ...baseOptions.plugins.tooltip,
                    callbacks: {
                        label: (context) => {
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${context.label}: ${ChartConfig.formatCurrency(value)} (${percentage}%)`;
                        }
                    }
                }
            }
        };

        return new Chart(this.ctx, {
            type: 'doughnut',
            data: data,
            options: options
        });
    }

    // Create HTML section
    static createSection() {
        const section = document.createElement('div');
        section.className = 'analysis-section';
        section.id = 'company-section';

        const config = DashboardConfig.getSectionById('company');
        const title = DashboardConfig.getSectionTitle('company');

        section.innerHTML = `
            ${title}
            <div class="columns-needed">
                <div class="columns-title">Required Columns:</div>
                <div class="columns-list">${config.requiredColumns.join(', ')}</div>
            </div>
            <div class="chart-container">
                <canvas id="companyChart"></canvas>
            </div>
            <div class="chart-description">
                This doughnut chart illustrates salary distribution by company size. 
                Generally, larger companies tend to offer higher compensation due to 
                greater resources and more established organizational structures.
            </div>
        `;

        return section;
    }

    // Initialize chart with API data
    static async initializeChart() {
        try {
            const chart = new CompanyChart();
            
            // Fetch data from API
            await chart.fetchData();
            
            setTimeout(() => {
                const success = chart.init(chart.data);
                if (success) {
                    console.log('✅ Company chart initialized');
                } else {
                    console.error('❌ Error initializing company chart');
                }
            }, 100);
            
            return chart;
        } catch (error) {
            console.error('❌ Error creating company chart:', error);
            return null;
        }
    }

    // Refresh data from API
    async refreshData() {
        console.log('Refreshing company data...');
        
        const success = await this.fetchData();
        
        if (success && this.chart) {
            const preparedData = this.prepareData(this.data);
            this.chart.data = preparedData;
            this.chart.update();
            console.log('Company data refreshed successfully');
        }
    }

    // Format custom tooltip label
    formatTooltipLabel(context) {
        const value = context.parsed;
        const total = context.dataset.data.reduce((a, b) => a + b, 0);
        const percentage = ((value / total) * 100).toFixed(1);
        return `${context.label}: ${ChartConfig.formatCurrency(value)} (${percentage}%)`;
    }
}

// Make available globally
window.CompanyChart = CompanyChart;