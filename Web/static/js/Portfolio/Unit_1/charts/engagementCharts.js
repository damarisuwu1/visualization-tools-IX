// js/charts/engagementCharts.js - Gráficas de análisis de engagement

const EngagementCharts = {
    // Configuración de la sección
    sectionConfig: {
        id: 'engagement-section',
        title: '1. 📈 Análisis de Engagement y Retención',
        csv1Columns: 'completion_percentage, content_id, watch_duration_minutes',
        csv2Columns: 'user_id, age, country, subscription_type'
    },

    // Configuración de tabs
    tabConfigs: [
        {
            title: 'Completion Rate por Edad',
            canvasId: 'engagementChart1',
            description: '📝 Esta gráfica muestra el porcentaje promedio de finalización por grupo etario, útil para identificar qué demografías son más comprometidas con el contenido.'
        },
        {
            title: 'Abandono por País',
            canvasId: 'engagementChart2',
            description: '📝 Mapa de calor mostrando tasas de abandono por país, ayudando a identificar mercados con baja retención que necesitan estrategias específicas.'
        },
        {
            title: 'Engagement por Suscripción',
            canvasId: 'engagementChart3',
            description: '📝 Comparación de tiempo promedio de sesión entre diferentes tipos de suscripción para evaluar el valor percibido por tier.'
        }
    ],

    // Datos de ejemplo
    data: {
        completionByAge: {
            labels: ['18-25', '26-35', '36-45', '46-55', '55+'],
            values: [72, 78, 65, 58, 45]
        },
        abandonmentByCountry: {
            labels: ['México', 'España', 'Colombia', 'Argentina', 'Chile'],
            values: [25, 18, 32, 28, 22]
        },
        engagementBySubscription: {
            labels: ['Basic', 'Standard', 'Premium'],
            values: [25, 38, 52]
        }
    },

    // Crear la sección completa
    createSection: function() {
        const section = TabManager.createSection(this.sectionConfig);
        TabManager.initializeTabs(this.sectionConfig.id, this.tabConfigs);
        return section;
    },

    // Inicializar todas las gráficas
    initializeCharts: function() {
        this.createCompletionChart();
        this.createAbandonmentChart();
        this.createSubscriptionChart();
    },

    // Gráfica 1: Completion Rate por Edad
    createCompletionChart: function() {
        const ctx = document.getElementById('engagementChart1');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.data.completionByAge.labels,
                datasets: [ChartConfig.createDataset(
                    '% Promedio de Finalización',
                    this.data.completionByAge.values
                )]
            },
            options: {
                ...ChartConfig.getOptionsFor('bar'),
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    },

    // Gráfica 2: Abandono por País
    createAbandonmentChart: function() {
        const ctx = document.getElementById('engagementChart2');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: this.data.abandonmentByCountry.labels,
                datasets: [{
                    label: 'Tasa de Abandono (%)',
                    data: this.data.abandonmentByCountry.values,
                    backgroundColor: ChartConfig.colors.palette
                }]
            },
            options: ChartConfig.getOptionsFor('doughnut')
        });
    },

    // Gráfica 3: Engagement por Suscripción
    createSubscriptionChart: function() {
        const ctx = document.getElementById('engagementChart3');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.data.engagementBySubscription.labels,
                datasets: [ChartConfig.createDataset(
                    'Tiempo Promedio de Sesión (min)',
                    this.data.engagementBySubscription.values,
                    {
                        backgroundColor: ChartConfig.colors.secondary,
                        borderColor: ChartConfig.colors.secondaryBorder,
                        tension: 0.4,
                        fill: true
                    }
                )]
            },
            options: ChartConfig.getOptionsFor('line')
        });
    }
};