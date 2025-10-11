// js/charts/valueChart.js - Análisis de valor del cliente

const ValueChart = {
    // Configuración de la sección
    sectionConfig: {
        id: 'value-section',
        title: DashboardConfig.getSectionTitle('value'),
        csv1Columns: 'user_id, watch_duration_minutes',
        csv2Columns: 'user_id, subscription_type, total_watch_time_hours, registration_date'
    },

    // URL del endpoint
    apiEndpoint: 'https://upy-homeworks.xpert-ia.com.mx/visualization-tools/api/unit-1/portfolio',

    // Datos (se llenarán desde la API)
    data: {
        basic: [],
        standard: [],
        premium: []
    },

    // Método para consumir datos del endpoint
    async fetchValueData() {
        try {
            console.log('Obteniendo datos de valor desde API...');
            
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
            
            const valueData = apiData.info?.value;
            
            if (!valueData) {
                throw new Error('Datos de valor no encontrados en la respuesta de la API');
            }

            this.data.basic = valueData.basic || [];
            this.data.standard = valueData.standard || [];
            this.data.premium = valueData.premium || [];

            console.log('Datos de valor obtenidos correctamente:', this.data);
            return true;

        } catch (error) {
            console.error('Error obteniendo datos de valor:', error);
            this.setDefaultData();
            return false;
        }
    },

    // Método para establecer datos por defecto
    setDefaultData() {
        console.log('Usando datos por defecto para análisis de valor...');
        
        this.data = {
            basic: [{x: 3, y: 15, r: 8}, {x: 8, y: 25, r: 12}],
            standard: [{x: 6, y: 35, r: 15}, {x: 12, y: 45, r: 20}],
            premium: [{x: 15, y: 65, r: 25}, {x: 24, y: 85, r: 30}]
        };
    },

    // Crear la sección
    createSection: function() {
        console.log('Creando sección de valor...');
        const section = TabManager.createSection(this.sectionConfig);
        
        // Crear contenedor de gráfica simple
        const chartContainer = document.createElement('div');
        chartContainer.className = 'chart-container';
        
        const canvas = document.createElement('canvas');
        canvas.id = 'valueChart';
        chartContainer.appendChild(canvas);
        
        const description = document.createElement('div');
        description.className = 'chart-description';
        description.innerHTML = 'Gráfica de burbujas mostrando valor del cliente (tamaño de burbuja = tiempo total de visualización) vs antigüedad y tipo de suscripción.';
        
        section.appendChild(chartContainer);
        section.appendChild(description);
        
        // Agregar la sección al dashboard
        const container = document.getElementById('dashboard-sections');
        if (container) {
            container.appendChild(section);
        }
        
        // Inicializar después de agregar al DOM
        setTimeout(async () => {
            await this.fetchValueData();
            setTimeout(() => {
                this.initializeChart();
            }, 100);
        }, 50);
        
        return section;
    },

    // Método para refrescar datos
    async refreshData() {
        console.log('Refrescando datos de valor...');
        this.showLoadingState();
        
        const success = await this.fetchValueData();
        
        if (success) {
            this.initializeChart();
            console.log('Datos de valor refrescados correctamente');
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
        const ctx = document.getElementById('valueChart');
        if (!ctx) {
            console.error('Canvas valueChart no encontrado');
            return;
        }

        // Destruir gráfica existente si existe
        const existingChart = Chart.getChart(ctx);
        if (existingChart) {
            existingChart.destroy();
        }

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

// Hacer disponible globalmente
window.ValueChart = ValueChart;