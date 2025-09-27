// js/config/dashboardconfig.js - Configuración central del dashboard

const DashboardConfig = {
    // Configuración de secciones del dashboard
    sections: {
        distributional: {
            id: 'distributional',
            title: '📈 Análisis Distribucional',
            description: 'Distribución de salarios por nivel de experiencia',
            requiredColumns: ['experience_level', 'salary_in_usd', 'employment_type'],
            chartType: 'bar',
            chartClass: 'SalaryDistChart',
            canvasId: 'salaryDistChart'
        },
        geographic: {
            id: 'geographic',
            title: '🌍 Análisis Geográfico',
            description: 'Salarios promedio por país/región',
            requiredColumns: ['employee_residence', 'company_location', 'salary_in_usd'],
            chartType: 'bar',
            chartClass: 'GeographicChart',
            canvasId: 'geoChart'
        },
        remote: {
            id: 'remote',
            title: '🏠 Análisis de Trabajo Remoto',
            description: 'Evolución salarial por modalidad de trabajo remoto',
            requiredColumns: ['remote_ratio', 'salary_in_usd', 'work_year'],
            chartType: 'line',
            chartClass: 'RemoteWorkChart',
            canvasId: 'remoteChart'
        },
        roles: {
            id: 'roles',
            title: '👥 Análisis por Roles',
            description: 'Top roles mejor pagados con rangos salariales',
            requiredColumns: ['job_title', 'salary_in_usd', 'experience_level'],
            chartType: 'bar',
            chartClass: 'RolesChart',
            canvasId: 'rolesChart'
        },
        company: {
            id: 'company',
            title: '🏢 Análisis por Tamaño de Empresa',
            description: 'Distribución salarial según el tamaño de la empresa',
            requiredColumns: ['company_size', 'salary_in_usd', 'employment_type'],
            chartType: 'doughnut',
            chartClass: 'CompanyChart',
            canvasId: 'companyChart'
        },
        temporal: {
            id: 'temporal',
            title: '📅 Análisis Temporal',
            description: 'Tendencias salariales por año y nivel de experiencia',
            requiredColumns: ['work_year', 'salary_in_usd', 'experience_level'],
            chartType: 'line',
            chartClass: 'TemporalChart',
            canvasId: 'temporalChart'
        }
    },

    // Datos de ejemplo para demostraciones
    sampleData: {
        distributional: {
            labels: ['Entry-level', 'Mid-level', 'Senior', 'Executive'],
            data: [65000, 95000, 135000, 185000],
            colors: ['#3498db', '#2ecc71', '#f39c12', '#e74c3c']
        },
        geographic: {
            labels: ['Estados Unidos', 'Reino Unido', 'Canadá', 'Alemania', 'Australia'],
            data: [145000, 85000, 92000, 78000, 105000],
            colors: ['#9b59b6', '#3498db', '#2ecc71', '#f39c12', '#e74c3c']
        },
        remote: {
            labels: ['2020', '2021', '2022', '2023', '2024'],
            datasets: [
                { 
                    label: '0% Remoto', 
                    data: [85000, 88000, 92000, 95000, 98000], 
                    color: '#e74c3c' 
                },
                { 
                    label: '50% Remoto', 
                    data: [90000, 95000, 100000, 105000, 108000], 
                    color: '#f39c12' 
                },
                { 
                    label: '100% Remoto', 
                    data: [95000, 102000, 110000, 118000, 125000], 
                    color: '#2ecc71' 
                }
            ]
        },
        roles: {
            labels: ['ML Engineer', 'Data Scientist', 'Data Engineer', 'Analytics Manager', 'Data Analyst'],
            data: [155000, 145000, 135000, 125000, 85000],
            colors: ['#9b59b6', '#3498db', '#2ecc71', '#f39c12', '#e74c3c']
        },
        company: {
            labels: ['Startup (S)', 'Mediana (M)', 'Grande (L)'],
            data: [95000, 125000, 155000],
            colors: ['#e74c3c', '#f39c12', '#2ecc71']
        },
        temporal: {
            labels: ['2020', '2021', '2022', '2023', '2024'],
            datasets: [
                { 
                    label: 'Entry-level', 
                    data: [55000, 58000, 62000, 65000, 68000], 
                    color: '#3498db' 
                },
                { 
                    label: 'Senior', 
                    data: [115000, 125000, 135000, 145000, 155000], 
                    color: '#e74c3c' 
                }
            ]
        }
    },

    // Paleta de colores para gráficas
    colorPalette: [
        '#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444',
        '#8b5cf6', '#ec4899', '#84cc16', '#14b8a6', '#f43f5e',
        '#6366f1', '#a855f7', '#22d3ee', '#f97316', '#84cc16'
    ],

    // Obtener configuración de sección por ID
    getSectionById: function(sectionId) {
        return this.sections[sectionId] || null;
    },

    // Obtener título formateado de sección
    getSectionTitle: function(sectionId) {
        const section = this.getSectionById(sectionId);
        if (!section) return '';
        
        return `<h2 class="analysis-title">
            <span class="section-icon">${section.title.split(' ')[0]}</span>
            ${section.title.substring(section.title.indexOf(' ') + 1)}
        </h2>`;
    },

    // Obtener todas las secciones
    getAllSections: function() {
        return Object.values(this.sections);
    },

    // Obtener secciones por tipo de gráfica
    getSectionsByChartType: function(chartType) {
        return Object.values(this.sections).filter(section => 
            section.chartType === chartType
        );
    },

    // Validar si existen las columnas necesarias
    validateRequiredColumns: function(availableColumns, sectionId) {
        const section = this.getSectionById(sectionId);
        if (!section) return false;

        return section.requiredColumns.every(column => 
            availableColumns.includes(column)
        );
    },

    // Obtener columnas faltantes para una sección
    getMissingColumns: function(availableColumns, sectionId) {
        const section = this.getSectionById(sectionId);
        if (!section) return [];

        return section.requiredColumns.filter(column => 
            !availableColumns.includes(column)
        );
    },

    // Obtener paleta de colores para gráficas
    getChartColorPalette: function() {
        return [...this.colorPalette];
    },

    // Configuración de temas
    themes: {
        light: {
            name: 'Claro',
            cssClass: '',
            chartColors: {
                background: 'rgba(255, 255, 255, 0.9)',
                text: '#1f2937',
                grid: 'rgba(156, 163, 175, 0.2)'
            }
        },
        dark: {
            name: 'Oscuro',
            cssClass: 'dark-theme',
            chartColors: {
                background: 'rgba(31, 41, 55, 0.9)',
                text: '#f9fafb',
                grid: 'rgba(75, 85, 99, 0.4)'
            }
        }
    },

    // Configuración de tabs para secciones con múltiples vistas
    tabConfigs: {
        distributional: [
            {
                title: 'Por Nivel',
                canvasId: 'salaryDistChart',
                description: 'Distribución por nivel de experiencia'
            }
        ],
        geographic: [
            {
                title: 'Por País',
                canvasId: 'geoChart',
                description: 'Salarios promedio por ubicación geográfica'
            }
        ]
    },

    // Utilidades para formateo
    formatters: {
        currency: function(value) {
            if (value >= 1000000) {
                return '$' + (value / 1000000).toFixed(1) + 'M';
            } else if (value >= 1000) {
                return '$' + (value / 1000).toFixed(0) + 'K';
            }
            return '$' + value.toLocaleString();
        },
        
        percentage: function(value, total) {
            return ((value / total) * 100).toFixed(1) + '%';
        }
    },

    // Configuración de animaciones
    animations: {
        duration: 800,
        easing: 'easeOutCubic',
        delay: function(context) {
            return context.dataIndex * 50;
        }
    },

    // Configuración de tooltips globales
    tooltipConfig: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        titleColor: '#1f2937',
        bodyColor: '#374151',
        cornerRadius: 12,
        padding: 12
    },

    // Inicializar configuración
    init: function() {
        console.log('📊 Dashboard Config inicializado');
        console.log(`📋 Secciones disponibles: ${Object.keys(this.sections).length}`);
        return this;
    }
};

// Auto-inicializar cuando se carga el archivo
DashboardConfig.init();

// Hacer disponible globalmente
window.DashboardConfig = DashboardConfig