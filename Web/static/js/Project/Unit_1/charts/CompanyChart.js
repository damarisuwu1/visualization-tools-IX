// js/charts/CompanyChart.js - Gráfica de análisis por tamaño de empresa

class CompanyChart extends ChartBase {
    constructor() {
        super('companyChart');
        this.sectionConfig = {
            id: 'company-section',
            title: 'Análisis por Tamaño de Empresa',
            description: 'Distribución salarial según el tamaño de la empresa'
        };
    }

    // Preparar datos para la gráfica de empresas
    prepareData(rawData) {
        const data = rawData || DashboardConfig.sampleData.company;
        const colors = this.getColorPalette();
        
        return {
            labels: data.labels,
            datasets: [{
                label: 'Salario Promedio',
                data: data.data,
                backgroundColor: data.colors || colors.slice(0, data.labels.length),
                borderColor: '#ffffff',
                borderWidth: 3,
                hoverOffset: 10
            }]
        };
    }

    // Crear gráfica de dona
    createChart(data, baseOptions) {
        const options = {
            ...baseOptions,
            ...ChartConfig.getOptionsFor('doughnut'),
            plugins: {
                ...baseOptions.plugins,
                title: {
                    display: true,
                    text: 'Distribución Salarial por Tamaño de Empresa',
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

    // Crear sección HTML
    static createSection() {
        const section = document.createElement('div');
        section.className = 'analysis-section';
        section.id = 'company-section';

        const config = DashboardConfig.getSectionById('company');
        const title = DashboardConfig.getSectionTitle('company');

        section.innerHTML = `
            ${title}
            <div class="columns-needed">
                <div class="columns-title">Columnas Necesarias:</div>
                <div class="columns-list">${config.requiredColumns.join(', ')}</div>
            </div>
            <div class="chart-container">
                <canvas id="companyChart"></canvas>
            </div>
            <div class="chart-description">
                Esta gráfica de dona ilustra cómo se distribuyen los salarios según el tamaño de la empresa. 
                Generalmente, las empresas más grandes tienden a ofrecer compensaciones más altas debido a 
                mayores recursos y estructuras organizacionales más establecidas.
            </div>
        `;

        return section;
    }

    // Inicializar gráfica
    static initializeChart() {
        try {
            const chart = new CompanyChart();
            const sampleData = DashboardConfig.sampleData.company;
            
            setTimeout(() => {
                const success = chart.init(sampleData);
                if (success) {
                    console.log('✅ Gráfica de empresa inicializada');
                } else {
                    console.error('❌ Error inicializando gráfica de empresa');
                }
            }, 100);
            
            return chart;
        } catch (error) {
            console.error('❌ Error creando gráfica de empresa:', error);
            return null;
        }
    }

    // Formatear tooltip personalizado
    formatTooltipLabel(context) {
        const value = context.parsed;
        const total = context.dataset.data.reduce((a, b) => a + b, 0);
        const percentage = ((value / total) * 100).toFixed(1);
        return `${context.label}: ${ChartConfig.formatCurrency(value)} (${percentage}%)`;
    }
}

// Hacer disponible globalmente
window.CompanyChart = CompanyChart;