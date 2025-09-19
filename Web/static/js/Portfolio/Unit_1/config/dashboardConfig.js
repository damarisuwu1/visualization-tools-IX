// js/config/dashboardConfig.js - Configuración centralizada del dashboard

const DashboardConfig = {
    // Información general del dashboard
    info: {
        title: 'Análisis de Datos de Streaming',
        version: '2.0.0',
        author: 'Analytics Team',
        description: 'Dashboard modular para análisis de datos de plataforma de streaming'
    },

    // Configuración de las secciones en orden de aparición
    sections: [
        {
            id: 'engagement',
            module: 'EngagementCharts',
            title: '📈 Análisis de Engagement y Retención',
            description: 'Análisis de compromiso y retención de usuarios',
            priority: 1,
            hasMultipleCharts: true,
            requiredColumns: {
                csv1: ['completion_percentage', 'content_id', 'watch_duration_minutes'],
                csv2: ['user_id', 'age', 'country', 'subscription_type']
            }
        },
        {
            id: 'segmentation',
            module: 'SegmentationChart',
            title: '👥 Análisis de Segmentación de Usuarios',
            description: 'Segmentación de usuarios por comportamiento',
            priority: 2,
            hasMultipleCharts: false,
            requiredColumns: {
                csv1: ['user_id', 'watch_duration_minutes', 'completion_percentage', 'device_type'],
                csv2: ['user_id', 'age', 'country', 'subscription_type', 'total_watch_time_hours']
            }
        },
        {
            id: 'temporal',
            module: 'TemporalChart',
            title: '⏰ Análisis Temporal',
            description: 'Análisis de patrones temporales y cohortes',
            priority: 3,
            hasMultipleCharts: false,
            requiredColumns: {
                csv1: ['user_id', 'watch_date', 'watch_duration_minutes'],
                csv2: ['user_id', 'registration_date', 'total_watch_time_hours']
            }
        },
        {
            id: 'technical',
            module: 'TechnicalChart',
            title: '🔧 Análisis Técnico y de Experiencia',
            description: 'Análisis de factores técnicos que afectan la experiencia',
            priority: 4,
            hasMultipleCharts: false,
            requiredColumns: {
                csv1: ['device_type', 'quality_level', 'watch_duration_minutes', 'completion_percentage'],
                csv2: ['user_id', 'country']
            }
        },
        {
            id: 'value',
            module: 'ValueChart',
            title: '💰 Análisis de Valor del Cliente',
            description: 'Análisis del valor y potencial de los clientes',
            priority: 5,
            hasMultipleCharts: false,
            requiredColumns: {
                csv1: ['user_id', 'watch_duration_minutes'],
                csv2: ['user_id', 'subscription_type', 'total_watch_time_hours', 'registration_date']
            }
        }
    ],

    // Configuración de temas y estilos
    themes: {
        default: {
            primaryColor: '#667eea',
            secondaryColor: '#764ba2',
            accentColor: '#2a5298',
            backgroundColor: '#f8f9fa'
        },
        dark: {
            primaryColor: '#4f46e5',
            secondaryColor: '#7c3aed',
            accentColor: '#1e40af',
            backgroundColor: '#1f2937'
        }
    },

    // Configuración de exportación
    export: {
        formats: ['png', 'pdf', 'csv'],
        resolution: {
            width: 1200,
            height: 800
        }
    },

    // Configuración de datos
    data: {
        refreshInterval: 300000, // 5 minutos
        maxRecords: 10000,
        cacheEnabled: true
    },

    // Validaciones
    validation: {
        requiredFiles: ['CSV1', 'CSV2'],
        minimumRecords: 100,
        requiredColumns: {
            // Se define en cada sección específica
        }
    },

    // Configuración de gráficas por defecto
    defaultChartConfig: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 1000,
            easing: 'easeOutQuart'
        },
        interaction: {
            intersect: false,
            mode: 'index'
        }
    },

    // Métodos helper
    getSectionById: function(id) {
        return this.sections.find(section => section.id === id);
    },

    getRequiredColumnsForSection: function(sectionId) {
        const section = this.getSectionById(sectionId);
        return section ? section.requiredColumns : null;
    },

    getSectionsByPriority: function() {
        return [...this.sections].sort((a, b) => a.priority - b.priority);
    },

    validateSection: function(sectionId, data) {
        const section = this.getSectionById(sectionId);
        if (!section) return { valid: false, error: 'Sección no encontrada' };

        const requiredCols = section.requiredColumns;
        const csv1Cols = Object.keys(data.csv1?.[0] || {});
        const csv2Cols = Object.keys(data.csv2?.[0] || {});

        const missingCsv1 = requiredCols.csv1.filter(col => !csv1Cols.includes(col));
        const missingCsv2 = requiredCols.csv2.filter(col => !csv2Cols.includes(col));

        if (missingCsv1.length > 0 || missingCsv2.length > 0) {
            return {
                valid: false,
                error: 'Columnas faltantes',
                missingColumns: { csv1: missingCsv1, csv2: missingCsv2 }
            };
        }

        return { valid: true };
    }
};