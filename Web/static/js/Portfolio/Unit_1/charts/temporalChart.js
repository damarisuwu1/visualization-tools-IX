// js/charts/temporalChart.js - Análisis temporal y cohortes

const TemporalChart = {
    // Configuración de la sección
    sectionConfig: {
        id: 'temporal-section',
        title: DashboardConfig.getSectionTitle('temporal'),
        csv1Columns: 'user_id, watch_date, watch_duration_minutes',
        csv2Columns: 'user_id, registration_date, total_watch_time_hours'
    },

    // Datos de ejemplo para cohortes
    data: {
        labels: ['Mes 1', 'Mes 2', 'Mes 3', 'Mes 4', 'Mes 5', 'Mes 6'],
        cohorts: {
            enero: [100, 85, 72, 65, 58, 52],
            febrero: [100, 88, 78, 70, 65, 60],
            marzo: [100, 92, 82, 75, 72, 68]
        }
    },

    // Crear la sección
    createSection: function() {
        const section = TabManager.createSection(this.sectionConfig);
        
        // Crear contenedor de gráfica simple
        const chartContainer = document.createElement('div');
        chartContainer.className = 'chart-container';
        
        const canvas = document.createElement('canvas');
        canvas.id = 'temporalChart';
        chartContainer.appendChild(canvas);
        
        const description = document.createElement('div');
        description.className = 'chart-description';
        description.innerHTML = '📝 Análisis de cohortes mostrando la evolución del engagement de usuarios según su fecha de registro, identificando patrones de retención a largo plazo.';
        
        section.appendChild(chartContainer);
        section.appendChild(description);
        
        return section;
    },

    // Inicializar la gráfica
    initializeChart: function() {
        const ctx = document.getElementById('temporalChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.data.labels,
                datasets: [
                    {
                        label: 'Cohorte Enero',
                        data: this.data.cohorts.enero,
                        borderColor: ChartConfig.colors.danger.replace('0.8', '1'),
                        backgroundColor: ChartConfig.colors.danger.replace('0.8', '0.1')
                    },
                    {
                        label: 'Cohorte Febrero',
                        data: this.data.cohorts.febrero,
                        borderColor: ChartConfig.colors.success.replace('0.8', '1'),
                        backgroundColor: ChartConfig.colors.success.replace('0.8', '0.1')
                    },
                    {
                        label: 'Cohorte Marzo',
                        data: this.data.cohorts.marzo,
                        borderColor: ChartConfig.colors.secondary.replace('0.8', '1'),
                        backgroundColor: ChartConfig.colors.secondary.replace('0.8', '0.1')
                    }
                ]
            },
            options: {
                ...ChartConfig.getOptionsFor('line'),
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'Retención (%)'
                        },
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
};