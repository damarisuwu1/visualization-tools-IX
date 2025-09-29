// js/charts/temporalChart.js - Análisis temporal y cohortes

const TemporalChart = {
    // Configuración de la sección
    sectionConfig: {
        id: 'temporal-section',
        title: DashboardConfig.getSectionTitle('temporal'),
        csv1Columns: 'user_id, watch_date, watch_duration_minutes',
        csv2Columns: 'user_id, registration_date, total_watch_time_hours'
    },

    // URL del endpoint
    apiEndpoint: 'https://upy-homeworks.xpert-ia.com.mx/visualization-tools/api/unit-1/portfolio',

    // Datos (se llenarán desde la API)
    data: {
        labels: [],
        cohorts: {
            enero: [],
            febrero: [],
            marzo: []
        }
    },

    // Método para consumir datos del endpoint
    async fetchTemporalData() {
        try {
            console.log('Obteniendo datos temporales desde API...');
            
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
            
            const temporalData = apiData.info?.temporal;
            
            if (!temporalData) {
                throw new Error('Datos temporales no encontrados en la respuesta de la API');
            }

            this.data.labels = temporalData.labels || [];
            this.data.cohorts = temporalData.cohorts || {
                enero: [],
                febrero: [],
                marzo: []
            };

            console.log('Datos temporales obtenidos correctamente:', this.data);
            return true;

        } catch (error) {
            console.error('Error obteniendo datos temporales:', error);
            this.setDefaultData();
            return false;
        }
    },

    // Método para establecer datos por defecto
    setDefaultData() {
        console.log('Usando datos por defecto para análisis temporal...');
        
        this.data = {
            labels: ['Mes 1', 'Mes 2', 'Mes 3', 'Mes 4', 'Mes 5', 'Mes 6'],
            cohorts: {
                enero: [100, 85, 72, 65, 58, 52],
                febrero: [100, 88, 78, 70, 65, 60],
                marzo: [100, 92, 82, 75, 72, 68]
            }
        };
    },

    // Crear la sección
    createSection: function() {
        console.log('Creando sección temporal...');
        const section = TabManager.createSection(this.sectionConfig);
        
        // Crear contenedor de gráfica simple
        const chartContainer = document.createElement('div');
        chartContainer.className = 'chart-container';
        
        const canvas = document.createElement('canvas');
        canvas.id = 'temporalChart';
        chartContainer.appendChild(canvas);
        
        const description = document.createElement('div');
        description.className = 'chart-description';
        description.innerHTML = 'Análisis de cohortes mostrando la evolución del engagement de usuarios según su fecha de registro, identificando patrones de retención a largo plazo.';
        
        section.appendChild(chartContainer);
        section.appendChild(description);
        
        // Agregar la sección al dashboard
        const container = document.getElementById('dashboard-sections');
        if (container) {
            container.appendChild(section);
        }
        
        // Inicializar después de agregar al DOM
        setTimeout(async () => {
            await this.fetchTemporalData();
            setTimeout(() => {
                this.initializeChart();
            }, 100);
        }, 50);
        
        return section;
    },

    // Método para refrescar datos
    async refreshData() {
        console.log('Refrescando datos temporales...');
        this.showLoadingState();
        
        const success = await this.fetchTemporalData();
        
        if (success) {
            this.initializeChart();
            console.log('Datos temporales refrescados correctamente');
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
        const ctx = document.getElementById('temporalChart');
        if (!ctx) {
            console.error('Canvas temporalChart no encontrado');
            return;
        }

        // Destruir gráfica existente si existe
        const existingChart = Chart.getChart(ctx);
        if (existingChart) {
            existingChart.destroy();
        }

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

// Hacer disponible globalmente
window.TemporalChart = TemporalChart;