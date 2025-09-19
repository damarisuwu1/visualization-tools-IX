// js/config/dashboardConfig.js - Configuración centralizada del dashboard

const DashboardConfig = {
    // Información general del dashboard
    info: {
        title: 'Análisis de Datos de Streaming',
        version: '2.0.0',
        author: 'Analytics Team',
        description: 'Dashboard modular para análisis de datos de plataforma de streaming'
    },

    // Iconos SVG modernos para reemplazar emojis
    icons: {
        engagement: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z" fill="currentColor"/>
        </svg>`,
        users: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" fill="currentColor"/>
            <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" fill="currentColor"/>
        </svg>`,
        clock: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            <polyline points="12,6 12,12 16,14" stroke="currentColor" stroke-width="2"/>
        </svg>`,
        settings: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
            <path d="M19.4 15A1.65 1.65 0 0 0 20.25 13.5L20.34 13A8.1 8.1 0 0 0 20.9 12A8.1 8.1 0 0 0 20.34 11L20.25 10.5A1.65 1.65 0 0 0 19.4 9L18.75 8.74A7.8 7.8 0 0 0 17.87 7.29L17.87 6.62A1.65 1.65 0 0 0 16.37 5L15.75 5.07A8.15 8.15 0 0 0 12 4.07A8.15 8.15 0 0 0 8.25 5.07L7.63 5A1.65 1.65 0 0 0 6.13 6.62L6.13 7.29A7.8 7.8 0 0 0 5.25 8.74L4.6 9A1.65 1.65 0 0 0 3.75 10.5L3.66 11A8.1 8.1 0 0 0 3.1 12A8.1 8.1 0 0 0 3.66 13L3.75 13.5A1.65 1.65 0 0 0 4.6 15L5.25 15.26A7.8 7.8 0 0 0 6.13 16.71L6.13 17.38A1.65 1.65 0 0 0 7.63 19L8.25 18.93A8.15 8.15 0 0 0 12 19.93A8.15 8.15 0 0 0 15.75 18.93L16.37 19A1.65 1.65 0 0 0 17.87 17.38L17.87 16.71A7.8 7.8 0 0 0 18.75 15.26L19.4 15Z" stroke="currentColor" stroke-width="2"/>
        </svg>`,
        dollar: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="12" y1="1" x2="12" y2="23" stroke="currentColor" stroke-width="2"/>
            <path d="M17 5H9.5A3.5 3.5 0 0 0 9.5 12H14.5A3.5 3.5 0 0 1 14.5 19H6" stroke="currentColor" stroke-width="2"/>
        </svg>`
    },

    // Configuración de las secciones en orden de aparición
    sections: [
        {
            id: 'engagement',
            module: 'EngagementCharts',
            title: 'Análisis de Engagement y Retención',
            icon: 'engagement',
            description: 'Análisis de compromiso y retención de usuarios',
            priority: 1,
            hasMultipleCharts: true,
            color: '#3b82f6',
            requiredColumns: {
                csv1: ['completion_percentage', 'content_id', 'watch_duration_minutes'],
                csv2: ['user_id', 'age', 'country', 'subscription_type']
            }
        },
        {
            id: 'segmentation',
            module: 'SegmentationChart',
            title: 'Análisis de Segmentación de Usuarios',
            icon: 'users',
            description: 'Segmentación de usuarios por comportamiento',
            priority: 2,
            hasMultipleCharts: false,
            color: '#06b6d4',
            requiredColumns: {
                csv1: ['user_id', 'watch_duration_minutes', 'completion_percentage', 'device_type'],
                csv2: ['user_id', 'age', 'country', 'subscription_type', 'total_watch_time_hours']
            }
        },
        {
            id: 'temporal',
            module: 'TemporalChart',
            title: 'Análisis Temporal',
            icon: 'clock',
            description: 'Análisis de patrones temporales y cohortes',
            priority: 3,
            hasMultipleCharts: false,
            color: '#10b981',
            requiredColumns: {
                csv1: ['user_id', 'watch_date', 'watch_duration_minutes'],
                csv2: ['user_id', 'registration_date', 'total_watch_time_hours']
            }
        },
        {
            id: 'technical',
            module: 'TechnicalChart',
            title: 'Análisis Técnico y de Experiencia',
            icon: 'settings',
            description: 'Análisis de factores técnicos que afectan la experiencia',
            priority: 4,
            hasMultipleCharts: false,
            color: '#8b5cf6',
            requiredColumns: {
                csv1: ['device_type', 'quality_level', 'watch_duration_minutes', 'completion_percentage'],
                csv2: ['user_id', 'country']
            }
        },
        {
            id: 'value',
            module: 'ValueChart',
            title: 'Análisis de Valor del Cliente',
            icon: 'dollar',
            description: 'Análisis del valor y potencial de los clientes',
            priority: 5,
            hasMultipleCharts: false,
            color: '#f59e0b',
            requiredColumns: {
                csv1: ['user_id', 'watch_duration_minutes'],
                csv2: ['user_id', 'subscription_type', 'total_watch_time_hours', 'registration_date']
            }
        }
    ],

    // Configuración de temas y estilos modernos
    themes: {
        default: {
            primaryColor: '#3b82f6',
            secondaryColor: '#06b6d4',
            accentColor: '#10b981',
            backgroundColor: 'rgba(248, 250, 252, 0.8)',
            surfaceColor: 'rgba(255, 255, 255, 0.7)',
            textPrimary: '#1f2937',
            textSecondary: '#6b7280',
            borderColor: 'rgba(229, 231, 235, 0.4)',
            shadowColor: 'rgba(0, 0, 0, 0.08)'
        },
        dark: {
            primaryColor: '#60a5fa',
            secondaryColor: '#22d3ee',
            accentColor: '#34d399',
            backgroundColor: 'rgba(17, 24, 39, 0.9)',
            surfaceColor: 'rgba(31, 41, 55, 0.8)',
            textPrimary: '#f9fafb',
            textSecondary: '#d1d5db',
            borderColor: 'rgba(75, 85, 99, 0.4)',
            shadowColor: 'rgba(0, 0, 0, 0.25)'
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

    // Configuración de gráficas por defecto con estilo moderno
    defaultChartConfig: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 800,
            easing: 'easeOutCubic'
        },
        interaction: {
            intersect: false,
            mode: 'index'
        },
        elements: {
            point: {
                radius: 6,
                hoverRadius: 8,
                borderWidth: 2,
                hoverBorderWidth: 3
            },
            line: {
                borderWidth: 3,
                tension: 0.4
            },
            bar: {
                borderRadius: 8,
                borderSkipped: false
            }
        }
    },

    // Métodos helper actualizados
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

    getIconForSection: function(sectionId) {
        const section = this.getSectionById(sectionId);
        return section && section.icon ? this.icons[section.icon] : '';
    },

    getSectionTitle: function(sectionId) {
        const section = this.getSectionById(sectionId);
        if (!section) return '';
        
        const icon = this.getIconForSection(sectionId);
        return `<span class="section-icon" style="color: ${section.color}; margin-right: 12px; display: inline-flex; align-items: center;">${icon}</span>${section.title}`;
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