// js/charts/valueChart.js - Análisis de valor del cliente

const ValueChart = {
    // Configuración de la sección
    sectionConfig: {
        id: 'value-section',
        title: DashboardConfig.getSectionTitle('value'),
        csv1Columns: 'user_id, watch_duration_minutes',
        csv2Columns: 'user_id, subscription_type, total_watch_time_hours, registration_date'
    },

    // Datos de ejemplo
    data: {
        basic: [{x: 3, y: 15, r: 8}, {x: 8, y: 25, r: 12}],
        standard: [{x: 6, y: 35, r: 15}, {x: 12, y: 45, r: 20}],
        premium: [{x: 15, y: 65, r: 25}, {x: 24, y: 85, r: 30}]
    },

    // Crear la sección
    createSection: function() {
        const section = TabManager.createSection(this.sectionConfig);
        
        // Crear contenedor de gráfica simple
        const chartContainer = document.createElement('div');
        chartContainer.className = 'chart-container';
        
        const canvas = document.createElement('canvas');
        canvas.id = 'valueChart';
        chartContainer.appendChild(canvas);
        
        const description = document.createElement('div');
        description.className = 'chart-description';
        description.innerHTML = '📝 Gráfica de burbujas mostrando valor del cliente (tamaño de burbuja = tiempo total de visualización) vs antigüedad y tipo de suscripción.';
        
        section.appendChild(chartContainer);
        section.appendChild(description);
        
        return section;
    },

    // Inicializar la gráfica
    initializeChart: function() {
        const ctx = document.getElementById('valueChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'bubble',
            data: {
                datasets: [
                    {
                        label: 'Basic',
                        data: this.data.basic,
                        backgroundColor: ChartConfig.colors.danger.replace('0.8', '0.6')
                    },
                    {
                        label: 'Standard',
                        data: this.data.standard,
                        backgroundColor: ChartConfig.colors.success.replace('0.8', '0.6')
                    },
                    {
                        label: 'Premium',
                        data: this.data.premium,
                        backgroundColor: ChartConfig.colors.warning.replace('0.8', '0.6')
                    }
                ]
            },
            options: {
                ...ChartConfig.getOptionsFor('bubble'),
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Antigüedad (meses)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Tiempo Total de Visualización (horas)'
                        }
                    }
                }
            }
        });
    }
};