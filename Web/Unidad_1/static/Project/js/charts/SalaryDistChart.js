// js/charts/SalaryDistChart.js - Salary Distribution Chart: Pre-AI vs Post-AI Era

class SalaryDistChart extends ChartBase {
    constructor() {
        super('salaryDistChart');
        this.sectionConfig = {
            id: 'distributional-section',
            title: 'Salary Evolution: Pre-AI vs Post-AI Era',
            description: 'Comparison of salary distribution before (2020-2022) and after (2023-2025) AI boom'
        };
        this.apiEndpoint = window.ENV?.API_ENDPOINT;
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
            
            // VERIFICACIÓN MÁS ESTRICTA - Comprobar si los arrays de datos están vacíos
            const hasValidPreAIData = distributionalData?.preAI?.data && 
                                    Array.isArray(distributionalData.preAI.data) && 
                                    distributionalData.preAI.data.length > 0;
            
            const hasValidPostAIData = distributionalData?.postAI?.data && 
                                     Array.isArray(distributionalData.postAI.data) && 
                                     distributionalData.postAI.data.length > 0;

            if (!distributionalData || !hasValidPreAIData || !hasValidPostAIData) {
                console.warn('Distributional data not found or has empty arrays in API response, using defaults');
                this.setDefaultData();
                return false;
            }

            // La API debe devolver datos en formato: { labels, preAI: {data, label, color}, postAI: {data, label, color}, growth }
            this.data = {
                labels: distributionalData.labels || [],
                preAI: distributionalData.preAI || {},
                postAI: distributionalData.postAI || {},
                growth: distributionalData.growth || []
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
        console.log('Default data:', DashboardConfig.sampleData.distributional);
        this.data = DashboardConfig.sampleData.distributional;
    }

    // Prepare data for chart
    prepareData(rawData) {
        let data = rawData || this.data;
        
        // Si no hay datos o los datos son inválidos, usar los datos por defecto
        if (!data || !data.labels || !data.preAI || !data.postAI || 
            !Array.isArray(data.preAI.data) || data.preAI.data.length === 0 ||
            !Array.isArray(data.postAI.data) || data.postAI.data.length === 0) {
            
            console.warn('Invalid or empty data in prepareData(), using defaults');
            data = DashboardConfig.sampleData.distributional;
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
                    borderRadius: 8,
                    borderSkipped: false
                },
                {
                    label: data.postAI.label || 'Post-AI Era (2023-2025)',
                    data: data.postAI.data || [],
                    backgroundColor: data.postAI.color || '#3b82f6',
                    borderColor: this.adjustColorOpacity(data.postAI.color || '#3b82f6', 1),
                    borderWidth: 2,
                    borderRadius: 8,
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

    // Calculate growth percentage
    calculateGrowth(preValue, postValue) {
        if (!preValue || preValue === 0) return 0;
        return (((postValue - preValue) / preValue) * 100).toFixed(1);
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
                    text: 'Salary Evolution: Pre-AI vs Post-AI Boom',
                    font: {
                        size: 18,
                        weight: 'bold'
                    },
                    padding: 20
                },
                subtitle: {
                    display: true,
                    text: 'Comparison of average salaries before (2020-2022) and after (2023-2025) ChatGPT launch',
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
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Average Annual Salary (USD)',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        callback: function(value) {
                            // Use DashboardConfig instead of ChartConfig
                            if (window.DashboardConfig && window.DashboardConfig.formatters) {
                                return window.DashboardConfig.formatters.currency(value);
                            }
                            // Fallback formatting
                            if (value >= 1000000) {
                                return '$' + (value / 1000000).toFixed(1) + 'M';
                            } else if (value >= 1000) {
                                return '$' + (value / 1000).toFixed(0) + 'K';
                            }
                            return '$' + value.toLocaleString();
                        }
                    },
                    grid: {
                        color: 'rgba(156, 163, 175, 0.2)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Experience Level',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false
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
            <div class="chart-container" style="height: 450px;">
                <canvas id="salaryDistChart"></canvas>
            </div>
            <div class="chart-description">
                <h3>📊 Key Insights:</h3>
                <ul>
                    <li><strong>Pre-AI Era (2020-2022):</strong> Period before ChatGPT launch and widespread AI adoption</li>
                    <li><strong>Post-AI Era (2023-2025):</strong> Salary evolution following the AI revolution</li>
                    <li><strong>Analysis:</strong> Compare salary growth across all experience levels to identify which positions benefited most from the AI boom</li>
                </ul>
                <p><em>Note: ChatGPT was launched in November 2022, marking the beginning of mainstream AI adoption in the workforce.</em></p>
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
        const formatted = window.ChartConfig && typeof window.ChartConfig.formatCurrency === 'function'
            ? window.ChartConfig.formatCurrency(value)
            : `$${value.toLocaleString()}`;
        return `${context.dataset.label}: ${formatted}`;
    }
}

// Make available globally
window.SalaryDistChart = SalaryDistChart;