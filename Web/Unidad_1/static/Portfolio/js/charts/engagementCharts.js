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
            description: 'Esta gráfica muestra el porcentaje promedio de finalización por grupo etario, útil para identificar qué demografías son más comprometidas con el contenido.'
        },
        {
            title: 'Abandono por País',
            canvasId: 'engagementChart2',
            description: 'Mapa de calor mostrando tasas de abandono por país, ayudando a identificar mercados con baja retención que necesitan estrategias específicas.'
        },
        {
            title: 'Engagement por Suscripción',
            canvasId: 'engagementChart3',
            description: 'Comparación de tiempo promedio de sesión entre diferentes tipos de suscripción para evaluar el valor percibido por tier.'
        }
    ],

    // URL del endpoint (tu endpoint real)
    apiEndpoint: 'https://upy-homeworks.xpert-ia.com.mx/visualization-tools/api/unit-1/portfolio',

    // Datos (se llenarán desde la API)
    data: {
        completionByAge: {
            labels: [],
            values: []
        },
        abandonmentByCountry: {
            labels: [],
            values: []
        },
        engagementBySubscription: {
            labels: [],
            values: []
        }
    },

    // Método para consumir datos del endpoint
    async fetchEngagementData() {
        try {
            console.log('Obteniendo datos de engagement desde API...');
            
            const response = await fetch(this.apiEndpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Agregar headers adicionales si es necesario (auth, etc.)
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const apiData = await response.json();
            
            // Verificar que el status sea success
            if (apiData.status !== 'success') {
                throw new Error('API returned error status');
            }
            
            // Extraer solo la parte de engagement del response
            const engagementData = apiData.info?.engagement;
            
            if (!engagementData) {
                throw new Error('Datos de engagement no encontrados en la respuesta de la API');
            }

            // Mapear los datos de la API a nuestro formato local
            this.data.completionByAge = {
                labels: engagementData.completionByAge?.labels || [],
                values: engagementData.completionByAge?.values || []
            };

            this.data.abandonmentByCountry = {
                labels: engagementData.abandonmentByCountry?.labels || [],
                values: engagementData.abandonmentByCountry?.values || []
            };

            this.data.engagementBySubscription = {
                labels: engagementData.engagementBySubscription?.labels || [],
                values: engagementData.engagementBySubscription?.values || []
            };

            console.log('Datos de engagement obtenidos correctamente:', this.data);
            return true;

        } catch (error) {
            console.error('Error obteniendo datos de engagement:', error);
            
            // En caso de error, usar datos por defecto
            this.setDefaultData();
            return false;
        }
    },

    // Método para establecer datos por defecto en caso de error
    setDefaultData() {
        console.log('Usando datos por defecto...');
        
        this.data = {
            completionByAge: {
                labels: ['18-25', '26-35', '36-45', '46-55', '55+'],
                values: [0, 0, 0, 0, 0]
            },
            abandonmentByCountry: {
                labels: ['México', 'España', 'Colombia', 'Argentina', 'Chile'],
                values: [0, 0, 0, 0, 0]
            },
            engagementBySubscription: {
                labels: ['Basic', 'Standard', 'Premium'],
                values: [0, 0, 0]
            }
        };
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
        setTimeout(async () => {
            TabManager.initializeTabs(this.sectionConfig.id, this.tabConfigs);
            console.log('Tabs inicializados');
            
            // Obtener datos de la API antes de inicializar gráficas
            await this.fetchEngagementData();
            
            // Inicializar gráficas después de obtener los datos
            setTimeout(() => {
                this.initializeCharts();
                console.log('Gráficas inicializadas con datos de la API');
            }, 100);
        }, 50);
        
        return section;
    },

    // Método para refrescar datos
    async refreshData() {
        console.log('Refrescando datos de engagement...');
        
        // Mostrar indicador de carga (opcional)
        this.showLoadingState();
        
        const success = await this.fetchEngagementData();
        
        if (success) {
            // Recrear las gráficas con los nuevos datos
            this.initializeCharts();
            console.log('Datos refrescados correctamente');
        }
        
        // Ocultar indicador de carga
        this.hideLoadingState();
    },

    // Mostrar estado de carga (opcional)
    showLoadingState() {
        const section = document.getElementById(this.sectionConfig.id);
        if (section) {
            section.style.opacity = '0.6';
            // Agregar spinner o mensaje de carga si es necesario
        }
    },

    // Ocultar estado de carga
    hideLoadingState() {
        const section = document.getElementById(this.sectionConfig.id);
        if (section) {
            section.style.opacity = '1';
        }
    },

    // Inicializar todas las gráficas
    initializeCharts: function() {
        try {
            // Destruir gráficas existentes si existen
            this.destroyExistingCharts();
            
            this.createCompletionChart();
            this.createAbandonmentChart();
            this.createSubscriptionChart();
        } catch (error) {
            console.error('Error inicializando gráficas:', error);
        }
    },

    // Destruir gráficas existentes para evitar duplicados
    destroyExistingCharts() {
        const chartIds = ['engagementChart1', 'engagementChart2', 'engagementChart3'];
        
        chartIds.forEach(chartId => {
            const canvas = document.getElementById(chartId);
            if (canvas) {
                const chart = Chart.getChart(canvas);
                if (chart) {
                    chart.destroy();
                }
            }
        });
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