// js/charts/CompanyChart.js - Company Size Analysis: Post-AI Era

class CompanyChart extends ChartBase {
    constructor() {
        super('companyChart');
        this.sectionConfig = {
            id: 'company-section',
            title: 'Company Size Analysis: Post-AI Era',
            description: 'Salary distribution by company size after AI boom (2023-2025)'
        };
        // Usar variable de entorno en lugar de hardcodear
        this.apiEndpoint = window.ENV?.API_ENDPOINT;
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
            
            // VERIFICACIÓN MÁS ESTRICTA - Comprobar si los arrays de datos están vacíos
            const hasValidData = companyData?.data && 
                               Array.isArray(companyData.data) && 
                               companyData.data.length > 0;

            if (!companyData || !hasValidData) {
                console.warn('Company data not found or has empty arrays in API response, using defaults');
                this.setDefaultData();
                return false;
            }

            this.data = {
                labels: companyData.labels || [],
                data: companyData.data || [],
                colors: companyData.colors || null,
                description: companyData.description || 'Post-AI Era (2023-2025)'
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
        console.log('Default data:', DashboardConfig.sampleData.company);
        this.data = DashboardConfig.sampleData.company;
    }

    // Prepare data for chart
    prepareData(rawData) {
        let data = rawData || this.data;
        
        // Si no hay datos o los datos son inválidos, usar los datos por defecto
        if (!data || !data.labels || !data.data || 
            !Array.isArray(data.data) || data.data.length === 0) {
            
            console.warn('Invalid or empty data in prepareData(), using defaults');
            data = DashboardConfig.sampleData.company;
        }
        
        const colors = this.getColorPalette();
        
        return {
            labels: data.labels,
            datasets: [{
                label: 'Average Salary (USD)',
                data: data.data,
                backgroundColor: data.colors || colors.slice(0, data.labels.length),
                borderColor: '#ffffff',
                borderWidth: 3,
                hoverOffset: 15
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
                    text: 'Salary Distribution by Company Size - Post-AI Era (2023-2025)',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: 20
                },
                subtitle: {
                    display: true,
                    text: 'Average salaries after the AI revolution across different company sizes',
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
                    position: 'right',
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
                        label: (context) => {
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${context.label}: ${ChartConfig.formatCurrency(value)} (${percentage}%)`;
                        },
                        afterLabel: (context) => {
                            const value = context.parsed;
                            if (value >= 150000) {
                                return '💼 Premium compensation tier';
                            } else if (value >= 120000) {
                                return '🚀 Competitive market rate';
                            } else {
                                return '📈 Growth potential';
                            }
                        }
                    }
                }
            },
            cutout: '50%',
            animation: {
                animateScale: true,
                animateRotate: true
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
            <div class="chart-container" style="height: 500px;">
                <canvas id="companyChart"></canvas>
            </div>
            <div class="chart-description">
                <h3>🏢 Key Insights - Post-AI Era:</h3>
                <ul>
                    <li><strong>Enterprise Companies (XL):</strong> Highest salaries due to AI investment capabilities and established infrastructure</li>
                    <li><strong>Large Companies (L):</strong> Competitive compensation to attract AI talent and drive digital transformation</li>
                    <li><strong>Medium Companies (M):</strong> Balanced approach with competitive packages for strategic AI roles</li>
                    <li><strong>Startups (S):</strong> Lower base salaries but often compensate with equity and innovation opportunities</li>
                </ul>
                <p><em>Note: Post-AI boom, larger companies show 20-30% higher salary premiums for AI/tech roles compared to pre-AI levels.</em></p>
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