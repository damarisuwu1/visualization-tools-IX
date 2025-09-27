// js/charts/GeographicChart.js - Gráfica de análisis geográfico

class GeographicChart extends ChartBase {
    constructor() {
        super('geoChart');
        this.sectionConfig = {
            id: 'geographic-section',
            title: 'Análisis Geográfico de Salarios',
            description: 'Salarios promedio por país/región'
        };
    }

    // Preparar datos para la gráfica geográfica
    prepareData(rawData) {
        const data = rawData || DashboardConfig.sampleData.geographic;
        const colors = this.getColorPalette();
        
        return {
            labels: data.labels,
            datasets: [{
                label: 'Salario Promedio (USD)',
                data: data.data,
                backgroundColor: data.colors || colors.slice(0, data.labels.length),
                borderColor: (data.colors || colors.slice(0, data.labels.length)).map(color => 
                    color.replace('0.8', '1')
                ),
                borderWidth: 2,
                borderRadius: 6,
                borderSkipped: false
            }]
        };
    }

    // Crear gráfica de barras horizontales
    createChart(data, baseOptions) {
        const options = {
            ...baseOptions,
            indexAxis: 'y',
            plugins: {
                ...baseOptions.plugins,
                title: {
                    display: true,
                    text: 'Salarios Promedio por País/Región',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: 20
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        color: ChartConfig.getCurrentThemeColors().gridColor
                    },
                    ticks: {
                        color: ChartConfig.getCurrentThemeColors().textSecondary,
                        font: {
                            size: 12,
                            weight: '500'
                        },
                        callback: function(value) {
                            return ChartConfig.formatCurrency(value);
                        }
                    },
                    title: {
                        display: true,
                        text: 'Salario Anual (USD)',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                y: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: ChartConfig.getCurrentThemeColors().textSecondary,
                        font: {
                            size: 12,
                            weight: '500'
                        }
                    },
                    title: {
                        display: true,
                        text: 'País/Región',
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
        section.id = 'geographic-section';

        const config = DashboardConfig.getSectionById('geographic');
        const title = DashboardConfig.getSectionTitle('geographic');

        section.innerHTML = `
            ${title}
            <div class="columns-needed">
                <div class="columns-title">Columnas Necesarias:</div>
                <div class="columns-list">${config.requiredColumns.join(', ')}</div>
            </div>
            <div class="chart-container">
                <canvas id="geoChart"></canvas>
            </div>
            <div class="chart-description">
                Esta gráfica presenta los salarios promedio por ubicación geográfica, 
                permitiendo identificar las diferencias salariales entre países y regiones. 
                Los datos muestran cómo la ubicación impacta significativamente en la compensación.
            </div>
        `;

        return section;
    }

    // Inicializar gráfica
    static initializeChart() {
        try {
            const chart = new GeographicChart();
            const sampleData = DashboardConfig.sampleData.geographic;
            
            setTimeout(() => {
                const success = chart.init(sampleData);
                if (success) {
                    console.log('✅ Gráfica geográfica inicializada');
                } else {
                    console.error('❌ Error inicializando gráfica geográfica');
                }
            }, 100);
            
            return chart;
        } catch (error) {
            console.error('❌ Error creando gráfica geográfica:', error);
            return null;
        }
    }

    // Formatear tooltip personalizado
    formatTooltipLabel(context) {
        const value = context.parsed.x;
        const country = context.label;
        return `${country}: ${ChartConfig.formatCurrency(value)}`;
    }
}

// Hacer disponible globalmente
window.GeographicChart = GeographicChart;