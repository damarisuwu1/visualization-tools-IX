// js/config/dashboardconfig.js - Central dashboard configuration

const DashboardConfig = {
    // Dashboard sections configuration
    sections: {
        distributional: {
            id: 'distributional',
            title: '📈 Salary Evolution: Pre-AI vs Post-AI Era',
            description: 'Comparison of salary distribution before and after AI boom (ChatGPT launch)',
            requiredColumns: ['experience_level', 'salary_in_usd', 'work_year'],
            chartType: 'bar',
            chartClass: 'SalaryDistChart',
            canvasId: 'salaryDistChart'
        },
        workModalities: {
            id: 'workModalities',
            title: '📊 Work Modalities Evolution',
            description: 'Temporal evolution of different work modalities and AI impact',
            requiredColumns: ['work_year', 'remote_ratio', 'employment_type'],
            chartType: 'line',
            chartClass: 'WorkModalitiesChart',
            canvasId: 'workModalitiesChart'
        },
        geographic: {
            id: 'geographic',
            title: '🌍 Geographic Analysis: Pre-AI vs Post-AI',
            description: 'Average salaries by country/region before and after AI boom',
            requiredColumns: ['employee_residence', 'company_location', 'salary_in_usd', 'work_year'],
            chartType: 'bar',
            chartClass: 'GeographicChart',
            canvasId: 'geoChart'
        },
        roles: {
            id: 'roles',
            title: '👥 Role Analysis: Pre-AI vs Post-AI',
            description: 'Top highest-paying roles before and after AI boom',
            requiredColumns: ['job_title', 'salary_in_usd', 'work_year', 'experience_level'],
            chartType: 'bar',
            chartClass: 'RolesChart',
            canvasId: 'rolesChart'
        },
        company: {
            id: 'company',
            title: '🏢 Company Size Analysis: Post-AI Era',
            description: 'Salary distribution by company size after AI boom (2023-2025)',
            requiredColumns: ['company_size', 'salary_in_usd', 'work_year'],
            chartType: 'doughnut',
            chartClass: 'CompanyChart',
            canvasId: 'companyChart'
        },
        temporal: {
            id: 'temporal',
            title: '📅 Temporal Analysis: Pre-AI vs Post-AI Evolution',
            description: 'Salary trends evolution by experience level before and after AI boom',
            requiredColumns: ['work_year', 'salary_in_usd', 'experience_level'],
            chartType: 'line',
            chartClass: 'TemporalChart',
            canvasId: 'temporalChart'
        }
    },

    // Sample data for demonstrations
    sampleData: {
        distributional: {
            labels: ['Entry Level', 'Junior', 'Mid-Level', 'Senior', 'Lead', 'Executive'],
            preAI: {
                label: 'Pre-AI Era (2020-2022)',
                data: [52000, 68000, 95000, 128000, 165000, 210000],
                color: '#94a3b8' // Gris azulado para el pasado
            },
            postAI: {
                label: 'Post-AI Era (2023-2025)',
                data: [58000, 75000, 115000, 155000, 195000, 245000],
                color: '#3b82f6' // Azul vibrante para post-IA
            },
            growth: [11.5, 10.3, 21.1, 21.1, 18.2, 16.7] // Porcentaje de crecimiento
        },
        workModalities: {
            labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
            datasets: [
                { 
                    label: 'Hybrid', 
                    data: [35, 32, 30, 45, 65, 85], 
                    color: '#2ecc71' 
                },
                { 
                    label: 'On-site', 
                    data: [35, 30, 15, 8, 5, 3], 
                    color: '#e74c3c' 
                },
                { 
                    label: 'Remote', 
                    data: [20, 25, 60, 30, 18, 18], 
                    color: '#3498db' 
                },
                { 
                    label: 'AI Boom (ChatGPT)', 
                    data: [0, 0, 2, 25, 45, 72], 
                    color: '#f39c12' 
                }
            ]
        },
        geographic: {
            labels: ['United States', 'United Kingdom', 'Canada', 'Germany', 'Australia', 'Netherlands'],
            preAI: {
                label: 'Pre-AI Era (2020-2022)',
                data: [135000, 78000, 85000, 72000, 95000, 82000],
                color: '#94a3b8'
            },
            postAI: {
                label: 'Post-AI Era (2023-2025)',
                data: [155000, 92000, 98000, 84000, 115000, 95000],
                color: '#3b82f6'
            },
            growth: [14.8, 17.9, 15.3, 16.7, 21.1, 15.9]
        },
        remote: {
            labels: ['2020', '2021', '2022', '2023', '2024'],
            datasets: [
                { 
                    label: '0% Remote', 
                    data: [85000, 88000, 92000, 95000, 98000], 
                    color: '#e74c3c' 
                },
                { 
                    label: '50% Remote', 
                    data: [90000, 95000, 100000, 105000, 108000], 
                    color: '#f39c12' 
                },
                { 
                    label: '100% Remote', 
                    data: [95000, 102000, 110000, 118000, 125000], 
                    color: '#2ecc71' 
                }
            ]
        },
        roles: {
            labels: ['AI/ML Engineer', 'Data Scientist', 'Cloud Architect', 'DevOps Engineer', 'Data Engineer'],
            preAI: {
                label: 'Pre-AI Era (2020-2022)',
                data: [125000, 115000, 135000, 120000, 110000],
                color: '#94a3b8'
            },
            postAI: {
                label: 'Post-AI Era (2023-2025)',
                data: [165000, 145000, 155000, 140000, 130000],
                color: '#3b82f6'
            },
            growth: [32.0, 26.1, 14.8, 16.7, 18.2]
        },
        company: {
            labels: ['Startup (S)', 'Medium (M)', 'Large (L)', 'Enterprise (XL)'],
            data: [105000, 135000, 165000, 195000],
            colors: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6'],
            description: 'Post-AI Era (2023-2025)'
        },
        temporal: {
    labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
    datasets: [
        { 
            label: 'Entry Level', 
            data: [48000, 52000, 56000, 58000, 62000, 65000], 
            color: '#3498db'
        },
        { 
            label: 'Junior', 
            data: [62000, 65000, 68000, 75000, 78000, 82000], 
            color: '#2ecc71'
        },
        { 
            label: 'Mid-Level', 
            data: [85000, 90000, 95000, 115000, 120000, 125000], 
            color: '#f39c12'
        },
        { 
            label: 'Senior', 
            data: [120000, 128000, 135000, 155000, 165000, 175000], 
            color: '#e74c3c'
        },
        { 
            label: 'Lead', 
            data: [150000, 160000, 165000, 195000, 205000, 215000], 
            color: '#9b59b6'
        },
        { 
            label: 'Executive', 
            data: [195000, 205000, 210000, 245000, 255000, 265000], 
            color: '#34495e'
        }
    ],
    growth: {
        'Entry Level': [8.3, 7.7, 3.6, 6.9, 4.8],
        'Junior': [4.8, 4.6, 10.3, 4.0, 5.1],
        'Mid-Level': [5.9, 5.6, 21.1, 4.3, 4.2],
        'Senior': [6.7, 5.5, 14.8, 6.5, 6.1],
        'Lead': [6.7, 3.1, 18.2, 5.1, 4.9],
        'Executive': [5.1, 2.4, 16.7, 4.1, 3.9]
    }
}
    },

    // Color palette for charts
    colorPalette: [
        '#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444',
        '#8b5cf6', '#ec4899', '#84cc16', '#14b8a6', '#f43f5e',
        '#6366f1', '#a855f7', '#22d3ee', '#f97316', '#84cc16'
    ],

    // Get section configuration by ID
    getSectionById: function(sectionId) {
        return this.sections[sectionId] || null;
    },

    // Get formatted section title
    getSectionTitle: function(sectionId) {
        const section = this.getSectionById(sectionId);
        if (!section) return '';
        
        return `<h2 class="analysis-title">
            <span class="section-icon">${section.title.split(' ')[0]}</span>
            ${section.title.substring(section.title.indexOf(' ') + 1)}
        </h2>`;
    },

    // Get all sections
    getAllSections: function() {
        return Object.values(this.sections);
    },

    // Get sections by chart type
    getSectionsByChartType: function(chartType) {
        return Object.values(this.sections).filter(section => 
            section.chartType === chartType
        );
    },

    // Validate if required columns exist
    validateRequiredColumns: function(availableColumns, sectionId) {
        const section = this.getSectionById(sectionId);
        if (!section) return false;

        return section.requiredColumns.every(column => 
            availableColumns.includes(column)
        );
    },

    // Get missing columns for a section
    getMissingColumns: function(availableColumns, sectionId) {
        const section = this.getSectionById(sectionId);
        if (!section) return [];

        return section.requiredColumns.filter(column => 
            !availableColumns.includes(column)
        );
    },

    // Get color palette for charts
    getChartColorPalette: function() {
        return [...this.colorPalette];
    },

    // Theme configuration
    themes: {
        light: {
            name: 'Light',
            cssClass: '',
            chartColors: {
                background: 'rgba(255, 255, 255, 0.9)',
                text: '#1f2937',
                grid: 'rgba(156, 163, 175, 0.2)'
            }
        },
        dark: {
            name: 'Dark',
            cssClass: 'dark-theme',
            chartColors: {
                background: 'rgba(31, 41, 55, 0.9)',
                text: '#f9fafb',
                grid: 'rgba(75, 85, 99, 0.4)'
            }
        }
    },

    // Tab configurations for sections with multiple views
    tabConfigs: {
        distributional: [
            {
                title: 'By Level',
                canvasId: 'salaryDistChart',
                description: 'Distribution by experience level'
            }
        ],
        geographic: [
            {
                title: 'By Country',
                canvasId: 'geoChart',
                description: 'Average salaries by geographic location'
            }
        ]
    },

    // Formatting utilities
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

    // Animation configuration
    animations: {
        duration: 800,
        easing: 'easeOutCubic',
        delay: function(context) {
            return context.dataIndex * 50;
        }
    },

    // Global tooltip configuration
    tooltipConfig: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        titleColor: '#1f2937',
        bodyColor: '#374151',
        cornerRadius: 12,
        padding: 12
    },

    // Initialize configuration
    init: function() {
        console.log('📊 Dashboard Config initialized');
        console.log(`📋 Available sections: ${Object.keys(this.sections).length}`);
        return this;
    }
};

// Auto-initialize when file loads
DashboardConfig.init();

// Make available globally
window.DashboardConfig = DashboardConfig;