// js/charts/SalaryDistChart.js - Gráfica de distribución salarial

class SalaryDistChart extends ChartBase {
    constructor() {
        super('salaryDistChart');
        this.sectionConfig = {
            id: 'distributional-section',
            title: 'Análisis Distribucional de Salarios',
            description: 'Distribución de salarios por nivel de experiencia'
        };
    }

    // Preparar datos para la gráfica distribucional
    prepareData(rawData) {
        // Si no hay datos reales, usar datos de ejemplo
        const data = rawData || SalaryConfig.sampleData.distributional;
        
        const colors = this.getColorPalette();
        
        return {
            labels: data.labels,
            datasets: [{
                label: 'Salario Promedio (USD)',
                data: data.data,
                backgroundColor: data.colors || colors.slice(0, data.labels.length),
                borderColor: (data.colors || colors.slice(0, data.labels.length)).map(color => color.replace('0.8', '1')),
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false
            }]
        };
    }

    // Crear gráfica de barras
    createChart(data, baseOptions) {
        const options = {
            ...baseOptions,
            ...ChartConfig.getOptionsFor('bar'),
            plugins: {
                ...baseOptions.plugins,
                title: {
                    display: true,
                    text: 'Distribución de Salarios por Nivel de Experiencia',
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
                        text: 'Salario Anual (USD)',
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
                        text: 'Nivel de Experiencia',
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

    // Crear sección HTML
    static createSection() {
        const section = document.createElement('div');
        section.className = 'analysis-section';
        section.id = 'distributional-section';

        const config = SalaryConfig.getSectionById('distributional');
        const title = SalaryConfig.getSectionTitle('distributional');

        section.innerHTML = `
            ${title}
            <div class="columns-needed">
                <div class="columns-title">Columnas Necesarias:</div>
                <div class="columns-list">${config.requiredColumns.join(', ')}</div>
            </div>
            <div class="chart-container">
                <canvas id="salaryDistChart"></canvas>
            </div>
            <div class="chart-description">
                Esta gráfica muestra la distribución de salarios promedio según el nivel de experiencia. 
                Los datos revelan una progresión clara desde puestos junior hasta ejecutivos, 
                permitiendo identificar las brechas salariales entre diferentes niveles.
            </div>
        `;

        return section;
    }

    // Inicializar gráfica con datos de ejemplo
    static initializeChart() {
        try {
            const chart = new SalaryDistChart();
            const sampleData = SalaryConfig.sampleData.distributional;
            
            setTimeout(() => {
                const success = chart.init(sampleData);
                if (success) {
                    console.log('✅ Gráfica distribucional inicializada');
                } else {
                    console.error('❌ Error inicializando gráfica distribucional');
                }
            }, 100);
            
            return chart;
        } catch (error) {
            console.error('❌ Error creando gráfica distribucional:', error);
            return null;
        }
    }

    // Formatear tooltip personalizado
    formatTooltipLabel(context) {
        const value = context.parsed.y;
        return `${context.dataset.label}: ${ChartConfig.formatCurrency(value)}`;
    }
}

// Hacer disponible globalmente
window.SalaryDistChart = SalaryDistChart;