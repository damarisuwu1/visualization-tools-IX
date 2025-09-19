// js/charts/segmentationChart.js - Gráfica de segmentación de usuarios

const SegmentationChart = {
    // Configuración de la sección
    sectionConfig: {
        id: 'segmentation-section',
        title: '2. 👥 Análisis de Segmentación de Usuarios',
        csv1Columns: 'user_id, watch_duration_minutes, completion_percentage, device_type',
        csv2Columns: 'user_id, age, country, subscription_type, total_watch_time_hours'
    },

    // Datos de ejemplo para los segmentos
    data: {
        heavyUsers: [{x: 45, y: 85}, {x: 52, y: 78}, {x: 38, y: 92}],
        regularUsers: [{x: 25, y: 65}, {x: 28, y: 58}, {x: 32, y: 72}],
        casualViewers: [{x: 12, y: 35}, {x: 8, y: 28}, {x: 15, y: 42}]
    },

    // Crear la sección
    createSection: function() {
        const section = TabManager.createSection(this.sectionConfig);
        
        // Crear contenedor de gráfica simple (sin tabs)
        const chartContainer = document.createElement('div');
        chartContainer.className = 'chart-container';
        
        const canvas = document.createElement('canvas');
        canvas.id = 'segmentationChart';
        chartContainer.appendChild(canvas);
        
        const description = document.createElement('div');
        description.className = 'chart-description';
        description.innerHTML = '📝 Scatter plot de segmentación mostrando usuarios agrupados por comportamiento de consumo y valor, identificando segmentos como "Heavy Users", "Casual Viewers", etc.';
        
        section.appendChild(chartContainer);
        section.appendChild(description);
        
        return section;
    },

    // Inicializar la gráfica
    initializeChart: function() {
        const ctx = document.getElementById('segmentationChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        label: 'Heavy Users',
                        data: this.data.heavyUsers,
                        backgroundColor: ChartConfig.colors.danger,
                        pointRadius: 8
                    },
                    {
                        label: 'Regular Users',
                        data: this.data.regularUsers,
                        backgroundColor: ChartConfig.colors.success,
                        pointRadius: 8
                    },
                    {
                        label: 'Casual Viewers',
                        data: this.data.casualViewers,
                        backgroundColor: ChartConfig.colors.warning,
                        pointRadius: 8
                    }
                ]
            },
            options: {
                ...ChartConfig.getOptionsFor('scatter'),
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Tiempo Total de Visualización (horas)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Engagement Score (%)'
                        }
                    }
                }
            }
        });
    }
};