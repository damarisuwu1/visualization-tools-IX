// js/charts/RemoteWorkChart.js - Gráfica de análisis de trabajo remoto

class RemoteWorkChart extends ChartBase {
    constructor() {
        super('remoteChart');
        this.sectionConfig = {
            id: 'remote-section',
            title: 'Análisis de Trabajo Remoto',
            description: 'Evolución salarial por modalidad de trabajo remoto'
        };
    }

    // Preparar datos para la gráfica de trabajo remoto
    prepareData(rawData) {
        const data = rawData || DashboardConfig.sampleData.remote;
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

    // Crear gráfica de líneas
    createChart(data, baseOptions) {
        const options = {
            ...baseOptions,
            ...ChartConfig.getOptionsFor('line'),
            plugins: {
                ...baseOptions.plugins,
                title: {
                    display: true,
                    text: 'Evolución Salarial por Modalidad de Trabajo Remoto',
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
        section.id = 'remote-section';

        const config = DashboardConfig.getSectionById('remote');
        const title = DashboardConfig.getSectionTitle('remote');

        section.innerHTML = `
            ${title}
            <div class="columns-needed">
                <div class="columns-title">Columnas Necesarias:</div>
                <div class="columns-list">${config.requiredColumns.join(', ')}</div>
            </div>
            <div class="chart-container">
                <canvas id="remoteChart"></canvas>
            </div>
            <div class="chart-description">
                Esta gráfica muestra cómo han evolucionado los salarios según la modalidad de trabajo remoto a lo largo del tiempo. 
                Se puede observar la tendencia creciente de compensación para trabajos completamente remotos y híbridos, 
                reflejando el cambio en el mercado laboral post-pandemia.
            </div>
        `;

        return section;
    }

    // Inicializar gráfica
    static initializeChart() {
        try {
            const chart = new RemoteWorkChart();
            const sampleData = DashboardConfig.sampleData.remote;
            
            setTimeout(() => {
                const success = chart.init(sampleData);
                if (success) {
                    console.log('✅ Gráfica de trabajo remoto inicializada');
                } else {
                    console.error('❌ Error inicializando gráfica de trabajo remoto');
                }
            }, 100);
            
            return chart;
        } catch (error) {
            console.error('❌ Error creando gráfica de trabajo remoto:', error);
            return null;
        }
    }

    // Formatear tooltip personalizado
    formatTooltipLabel(context) {
        const value = context.parsed.y;
        const modalidad = context.dataset.label;
        const year = context.label;
        return `${modalidad} (${year}): ${ChartConfig.formatCurrency(value)}`;
    }
}

// Hacer disponible globalmente
window.RemoteWorkChart = RemoteWorkChart;