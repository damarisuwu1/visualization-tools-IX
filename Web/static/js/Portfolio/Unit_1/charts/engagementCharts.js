// js/charts/engagementCharts.js - Gráficas de análisis de engagement

const EngagementCharts = {
    // Configuración de la sección
    sectionConfig: {
        id: 'engagement-section',
        title: DashboardConfig.getSectionTitle('engagement'),
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
        console.log('Creando sección de engagement...');
        const section = TabManager.createSection(this.sectionConfig);
        
        // Agregar la sección al dashboard antes de inicializar tabs
        const container = document.getElementById('dashboard-sections');
        if (container) {
            container.appendChild(section);
            console.log('Sección agregada al dashboard');
        } else {
            console.error('Contenedor dashboard-sections no encontrado');
        }
        
        // Inicializar tabs después de que la sección esté en el DOM
        setTimeout(() => {
            TabManager.initializeTabs(this.sectionConfig.id, this.tabConfigs);
            console.log('Tabs inicializados');
            
            // Inicializar gráficas después de que los tabs estén listos
            setTimeout(() => {
                this.initializeCharts();
                console.log('Gráficas inicializadas');
            }, 100);
        }, 50);
        
        return section;
    },

    // Inicializar todas las gráficas
    initializeCharts: function() {
        try {
            this.createCompletionChart();
            this.createAbandonmentChart();
            this.createSubscriptionChart();
        } catch (error) {
            console.error('Error inicializando gráficas:', error);
        }
    },

    // Gráfica 1: Completion Rate por Edad
    createCompletionChart: function() {
        const ctx = document.getElementById('engagementChart1');
        if (!ctx) {
            console.error('Canvas engagementChart1 no encontrado');
            return;
        }

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.data.completionByAge.labels,
                datasets: [ChartConfig.createDataset(
                    '% Promedio de Finalización',
                    this.data.completionByAge.values,
                    {
                        backgroundColor: ChartConfig.colors.primary,
                        borderColor: ChartConfig.colors.primaryBorder
                    }
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
        if (!ctx) {
            console.error('Canvas engagementChart2 no encontrado');
            return;
        }

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
        if (!ctx) {
            console.error('Canvas engagementChart3 no encontrado');
            return;
        }

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.data.engagementBySubscription.labels,
                datasets: [ChartConfig.createDataset(
                    'Tiempo Promedio de Sesión (min)',
                    this.data.engagementBySubscription.values,
                    {
                        backgroundColor: ChartConfig.colors.secondaryRGBA,
                        borderColor: ChartConfig.colors.secondary,
                        tension: 0.4,
                        fill: true
                    }
                )]
            },
            options: ChartConfig.getOptionsFor('line')
        });
    }
};

// Hacer disponible globalmente
window.EngagementCharts = EngagementCharts;