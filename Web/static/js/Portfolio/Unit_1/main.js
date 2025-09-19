// js/main.js - Archivo principal que orquesta todo el dashboard

class StreamingDashboard {
    constructor() {
        this.sections = [];
        this.charts = [];
        this.initialized = false;
    }

    // Inicializar el dashboard completo
    init() {
        if (this.initialized) return;

        console.log('🚀 Inicializando Dashboard de Streaming...');
        
        // Esperar a que el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.render());
        } else {
            this.render();
        }
    }

    // Renderizar todas las secciones
    render() {
        const container = document.getElementById('dashboard-sections');
        if (!container) {
            console.error('❌ Contenedor dashboard-sections no encontrado');
            return;
        }

        // Crear y añadir todas las secciones
        this.createAllSections(container);
        
        // Inicializar todas las gráficas después de que el DOM esté actualizado
        setTimeout(() => {
            this.initializeAllCharts();
            this.initialized = true;
            console.log('✅ Dashboard inicializado correctamente');
        }, 500);
    }

    // Crear todas las secciones
    createAllSections(container) {
        const chartModules = [
            EngagementCharts,
            SegmentationChart,
            TemporalChart,
            TechnicalChart,
            ValueChart
        ];

        chartModules.forEach(module => {
            try {
                const section = module.createSection();
                container.appendChild(section);
                console.log(`✅ Sección ${module.sectionConfig.title} creada`);
            } catch (error) {
                console.error(`❌ Error creando sección ${module.sectionConfig?.title || 'desconocida'}:`, error);
            }
        });
    }

    // Inicializar todas las gráficas
    initializeAllCharts() {
        // Engagement Charts (tiene múltiples gráficas)
        try {
            EngagementCharts.initializeCharts();
            console.log('✅ Gráficas de Engagement inicializadas');
        } catch (error) {
            console.error('❌ Error en gráficas de Engagement:', error);
        }

        // Resto de gráficas individuales
        const singleCharts = [
            { module: SegmentationChart, name: 'Segmentación' },
            { module: TemporalChart, name: 'Temporal' },
            { module: TechnicalChart, name: 'Técnico' },
            { module: ValueChart, name: 'Valor del Cliente' }
        ];

        singleCharts.forEach(({ module, name }) => {
            try {
                module.initializeChart();
                console.log(`✅ Gráfica ${name} inicializada`);
            } catch (error) {
                console.error(`❌ Error en gráfica ${name}:`, error);
            }
        });
    }

    // Método para actualizar datos (útil para cuando se conecten datos reales)
    updateData(sectionId, newData) {
        console.log(`🔄 Actualizando datos para ${sectionId}`, newData);
        // Aquí se implementaría la lógica para actualizar los datos
        // y re-renderizar la gráfica específica
    }

    // Método para exportar configuración (útil para debugging)
    exportConfig() {
        return {
            initialized: this.initialized,
            sections: this.sections.length,
            timestamp: new Date().toISOString()
        };
    }

    // Método para destruir el dashboard (cleanup)
    destroy() {
        const container = document.getElementById('dashboard-sections');
        if (container) {
            container.innerHTML = '';
        }
        this.sections = [];
        this.charts = [];
        this.initialized = false;
        console.log('🧹 Dashboard destruido');
    }
}

// Función global para mostrar tabs (compatible con el HTML existente)
function showTab(section, tabId) {
    TabManager.showTab(section, tabId);
}

// Instanciar y inicializar el dashboard
const dashboard = new StreamingDashboard();

// Auto-inicializar cuando se cargue el script
dashboard.init();

// Exportar para uso global si es necesario
window.StreamingDashboard = StreamingDashboard;
window.dashboard = dashboard;