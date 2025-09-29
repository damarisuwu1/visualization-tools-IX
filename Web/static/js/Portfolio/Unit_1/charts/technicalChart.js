// js/charts/technicalChart.js - Análisis técnico y de experiencia

const TechnicalChart = {
    // Configuración de la sección
    sectionConfig: {
        id: 'technical-section',
        title: DashboardConfig.getSectionTitle('technical'),
        csv1Columns: 'device_type, quality_level, watch_duration_minutes, completion_percentage',
        csv2Columns: 'user_id, country (para correlacionar con infraestructura)'
    },

    // URL del endpoint
    apiEndpoint: 'https://upy-homeworks.xpert-ia.com.mx/visualization-tools/api/unit-1/portfolio',

    // Datos (se llenarán desde la API)
    data: {
        labels: [],
        duration: [],
        completion: []
    },

    // Método para consumir datos del endpoint
    async fetchTechnicalData() {
        try {
            console.log('Obteniendo datos técnicos desde API...');
            
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
            
            const technicalData = apiData.info?.technical;
            
            if (!technicalData) {
                throw new Error('Datos técnicos no encontrados en la respuesta de la API');
            }

            this.data.labels = technicalData.labels || [];
            this.data.duration = technicalData.duration || [];
            this.data.completion = technicalData.completion || [];

            console.log('Datos técnicos obtenidos correctamente:', this.data);
            return true;

        } catch (error) {
            console.error('Error obteniendo datos técnicos:', error);
            this.setDefaultData();
            return false;
        }
    },

    // Método para establecer datos por defecto
    setDefaultData() {
        console.log('Usando datos por defecto para análisis técnico...');
        
        this.data = {
            labels: ['Mobile', 'Desktop', 'TV', 'Tablet'],
            duration: [22, 45, 62, 35],
            completion: [65, 78, 85, 72]
        };
    },

    // Crear la sección
    createSection: function() {
        console.log('Creando sección técnica...');
        const section = TabManager.createSection(this.sectionConfig);
        
        // Crear contenedor de gráfica simple
        const chartContainer = document.createElement('div');
        chartContainer.className = 'chart-container';
        
        const canvas = document.createElement('canvas');
        canvas.id = 'technicalChart';
        chartContainer.appendChild(canvas);
        
        const description = document.createElement('div');
        description.className = 'chart-description';
        description.innerHTML = 'Matriz de correlación entre factores técnicos (dispositivo, calidad) y engagement, útil para optimizar la experiencia técnica.';
        
        section.appendChild(chartContainer);
        section.appendChild(description);
        
        // Agregar la sección al dashboard
        const container = document.getElementById('dashboard-sections');
        if (container) {
            container.appendChild(section);
        }
        
        // Inicializar después de agregar al DOM
        setTimeout(async () => {
            await this.fetchTechnicalData();
            setTimeout(() => {
                this.initializeChart();
            }, 100);
        }, 50);
        
        return section;
    },

    // Método para refrescar datos
    async refreshData() {
        console.log('Refrescando datos técnicos...');
        this.showLoadingState();
        
        const success = await this.fetchTechnicalData();
        
        if (success) {
            this.initializeChart();
            console.log('Datos técnicos refrescados correctamente');
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
        const ctx = document.getElementById('technicalChart');
        if (!ctx) {
            console.error('Canvas technicalChart no encontrado');
            return;
        }

        // Destruir gráfica existente si existe
        const existingChart = Chart.getChart(ctx);
        if (existingChart) {
            existingChart.destroy();
        }

        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: this.data.labels,
                datasets: [
                    {
                        label: 'Duración Promedio (min)',
                        data: this.data.duration,
                        borderColor: ChartConfig.colors.primaryBorder,
                        backgroundColor: ChartConfig.colors.primary.replace('0.8', '0.2')
                    },
                    {
                        label: 'Completion Rate (%)',
                        data: this.data.completion,
                        borderColor: 'rgba(255, 159, 64, 1)',
                        backgroundColor: 'rgba(255, 159, 64, 0.2)'
                    }
                ]
            },
            options: ChartConfig.getOptionsFor('radar')
        });
    }
};

// Hacer disponible globalmente
window.TechnicalChart = TechnicalChart;