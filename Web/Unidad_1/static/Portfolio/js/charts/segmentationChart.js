// js/charts/segmentationChart.js - Gráfica de segmentación de usuarios

const SegmentationChart = {
    // Configuración de la sección
    sectionConfig: {
        id: 'segmentation-section',
        title: DashboardConfig.getSectionTitle('segmentation'),
        csv1Columns: 'user_id, watch_duration_minutes, completion_percentage, device_type',
        csv2Columns: 'user_id, age, country, subscription_type, total_watch_time_hours'
    },

    // URL del endpoint
    apiEndpoint: 'https://upy-homeworks.xpert-ia.com.mx/visualization-tools/api/unit-1/portfolio',

    // Datos (se llenarán desde la API)
    data: {
        heavyUsers: [],
        regularUsers: [],
        casualViewers: []
    },

    // Método para consumir datos del endpoint
    async fetchSegmentationData() {
        try {
            console.log('Obteniendo datos de segmentación desde API...');
            
            const response = await fetch(this.apiEndpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const apiData = await response.json();
            
            if (apiData.status !== 'success') {
                throw new Error('API returned error status');
            }
            
            const segmentationData = apiData.info?.segmentation;
            
            if (!segmentationData) {
                throw new Error('Datos de segmentación no encontrados en la respuesta de la API');
            }

            this.data.heavyUsers = segmentationData.heavyUsers || [];
            this.data.regularUsers = segmentationData.regularUsers || [];
            this.data.casualViewers = segmentationData.casualViewers || [];

            console.log('Datos de segmentación obtenidos correctamente:', this.data);
            return true;

        } catch (error) {
            console.error('Error obteniendo datos de segmentación:', error);
            this.setDefaultData();
            return false;
        }
    },

    // Método para establecer datos por defecto
    setDefaultData() {
        console.log('Usando datos por defecto para segmentación...');
        
        this.data = {
            heavyUsers: [{x: 45, y: 85}, {x: 52, y: 78}, {x: 38, y: 92}],
            regularUsers: [{x: 25, y: 65}, {x: 28, y: 58}, {x: 32, y: 72}],
            casualViewers: [{x: 12, y: 35}, {x: 8, y: 28}, {x: 15, y: 42}]
        };
    },

    // Crear la sección
    createSection: function() {
        console.log('Creando sección de segmentación...');
        const section = TabManager.createSection(this.sectionConfig);
        
        // Crear contenedor de gráfica simple (sin tabs)
        const chartContainer = document.createElement('div');
        chartContainer.className = 'chart-container';
        
        const canvas = document.createElement('canvas');
        canvas.id = 'segmentationChart';
        chartContainer.appendChild(canvas);
        
        const description = document.createElement('div');
        description.className = 'chart-description';
        description.innerHTML = 'Scatter plot de segmentación mostrando usuarios agrupados por comportamiento de consumo y valor, identificando segmentos como "Heavy Users", "Casual Viewers", etc.';
        
        section.appendChild(chartContainer);
        section.appendChild(description);
        
        // Agregar la sección al dashboard
        const container = document.getElementById('dashboard-sections');
        if (container) {
            container.appendChild(section);
        }
        
        // Inicializar después de agregar al DOM
        setTimeout(async () => {
            await this.fetchSegmentationData();
            setTimeout(() => {
                this.initializeChart();
            }, 100);
        }, 50);
        
        return section;
    },

    // Método para refrescar datos
    async refreshData() {
        console.log('Refrescando datos de segmentación...');
        this.showLoadingState();
        
        const success = await this.fetchSegmentationData();
        
        if (success) {
            this.initializeChart();
            console.log('Datos de segmentación refrescados correctamente');
        }
        
        this.hideLoadingState();
    },

    showLoadingState() {
        const section = document.getElementById(this.sectionConfig.id);
        if (section) {
            section.style.opacity = '0.6';
        }
    },

    hideLoadingState() {
        const section = document.getElementById(this.sectionConfig.id);
        if (section) {
            section.style.opacity = '1';
        }
    },

    // Inicializar la gráfica
    initializeChart: function() {
        const ctx = document.getElementById('segmentationChart');
        if (!ctx) {
            console.error('Canvas segmentationChart no encontrado');
            return;
        }

        // Destruir gráfica existente si existe
        const existingChart = Chart.getChart(ctx);
        if (existingChart) {
            existingChart.destroy();
        }

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

// Hacer disponible globalmente
window.SegmentationChart = SegmentationChart;