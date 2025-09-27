// js/charts/TemporalChart.js - Gráfica de análisis temporal

class TemporalChart extends ChartBase {
    constructor() {
        super('temporalChart');
        this.sectionConfig = {
            id: 'temporal-section',
            title: 'Análisis Temporal',
            description: 'Tendencias salariales por año y nivel de experiencia'
        };
    }

    // Preparar datos para la gráfica temporal
    prepareData(rawData) {
        const data = rawData || DashboardConfig.sampleData.temporal;
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

    // Crear gráfica de líneas múltiples
    createChart(data, baseOptions) {
        const options = {
            ...baseOptions,
            ...ChartConfig.getOptionsFor('line'),
            plugins: {
                ...baseOptions.plugins,
                title: {
                    display: true,
                    text: 'Evolución Salarial por Año y Nivel de Experiencia',
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
                        text: 'Año',
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
                        text: 'Salario Anual (USD)',
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

    // Crear sección HTML
    static createSection() {
        const section = document.createElement('div');
        section.className = 'analysis-section';
        section.id = 'temporal-section';

        const config = DashboardConfig.getSectionById('temporal');
        const title = DashboardConfig.getSectionTitle('temporal');

        section.innerHTML = `
            ${title}
            <div class="columns-needed">
                <div class="columns-title">Columnas Necesarias:</div>
                <div class="columns-list">${config.requiredColumns.join(', ')}</div>
            </div>
            <div class="chart-container">
                <canvas id="temporalChart"></canvas>
            </div>
            <div class="chart-description">
                Esta gráfica muestra la evolución temporal de los salarios, permitiendo identificar tendencias de crecimiento 
                por nivel de experiencia a lo largo de los años. Es útil para entender cómo ha evolucionado el mercado salarial 
                y proyectar tendencias futuras.
            </div>
        `;

        return section;
    }

    // Inicializar gráfica
    static initializeChart() {
        try {
            const chart = new TemporalChart();
            const sampleData = DashboardConfig.sampleData.temporal;
            
            setTimeout(() => {
                const success = chart.init(sampleData);
                if (success) {
                    console.log('✅ Gráfica temporal inicializada');
                } else {
                    console.error('❌ Error inicializando gráfica temporal');
                }
            }, 100);
            
            return chart;
        } catch (error) {
            console.error('❌ Error creando gráfica temporal:', error);
            return null;
        }
    }

    // Formatear tooltip personalizado
    formatTooltipLabel(context) {
        const value = context.parsed.y;
        const level = context.dataset.label;
        const year = context.label;
        return `${level} (${year}): ${ChartConfig.formatCurrency(value)}`;
    }
}

// Hacer disponible globalmente
window.TemporalChart = TemporalChart;