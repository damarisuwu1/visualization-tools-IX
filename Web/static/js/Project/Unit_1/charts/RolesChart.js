// js/charts/RolesChart.js - Gráfica de análisis por roles

class RolesChart extends ChartBase {
    constructor() {
        super('rolesChart');
        this.sectionConfig = {
            id: 'roles-section',
            title: 'Análisis por Roles',
            description: 'Top roles mejor pagados con rangos salariales'
        };
    }

    // Preparar datos para la gráfica de roles
    prepareData(rawData) {
        const data = rawData || DashboardConfig.sampleData.roles;
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
                    text: 'Top 10 Roles Mejor Pagados',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: 20
                },
                legend: {
                    display: false
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
                    ticks: {
                        ...ChartConfig.getOptionsFor('bar').scales.x.ticks,
                        maxRotation: 45,
                        minRotation: 0
                    },
                    title: {
                        display: true,
                        text: 'Roles/Posiciones',
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
        section.id = 'roles-section';

        const config = DashboardConfig.getSectionById('roles');
        const title = DashboardConfig.getSectionTitle('roles');

        section.innerHTML = `
            ${title}
            <div class="columns-needed">
                <div class="columns-title">Columnas Necesarias:</div>
                <div class="columns-list">${config.requiredColumns.join(', ')}</div>
            </div>
            <div class="chart-container">
                <canvas id="rolesChart"></canvas>
            </div>
            <div class="chart-description">
                Esta gráfica muestra los roles y posiciones mejor compensadas en el mercado. 
                Permite identificar las especialidades más demandadas y mejor pagadas, 
                proporcionando insights valiosos para planificación de carrera y decisiones de contratación.
            </div>
        `;

        return section;
    }

    // Inicializar gráfica
    static initializeChart() {
        try {
            const chart = new RolesChart();
            const sampleData = DashboardConfig.sampleData.roles;
            
            setTimeout(() => {
                const success = chart.init(sampleData);
                if (success) {
                    console.log('✅ Gráfica de roles inicializada');
                } else {
                    console.error('❌ Error inicializando gráfica de roles');
                }
            }, 100);
            
            return chart;
        } catch (error) {
            console.error('❌ Error creando gráfica de roles:', error);
            return null;
        }
    }

    // Formatear tooltip personalizado
    formatTooltipLabel(context) {
        const value = context.parsed.y;
        const role = context.label;
        return `${role}: ${ChartConfig.formatCurrency(value)}`;
    }
}

// Hacer disponible globalmente
window.RolesChart = RolesChart;