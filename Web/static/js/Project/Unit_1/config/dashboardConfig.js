// js/config/dashboardconfig.js - Central dashboard configuration

const DashboardConfig = {
    // Dashboard sections configuration
    sections: {
        distributional: {
            id: 'distributional',
            title: '📈 Distribution Analysis',
            description: 'Salary distribution by experience level',
            requiredColumns: ['experience_level', 'salary_in_usd', 'employment_type'],
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
            title: '🌍 Geographic Analysis',
            description: 'Average salaries by country/region',
            requiredColumns: ['employee_residence', 'company_location', 'salary_in_usd'],
            chartType: 'bar',
            chartClass: 'GeographicChart',
            canvasId: 'geoChart'
        },
        remote: {
            id: 'remote',
            title: '🏠 Remote Work Analysis',
            description: 'Salary evolution by remote work modality',
            requiredColumns: ['remote_ratio', 'salary_in_usd', 'work_year'],
            chartType: 'line',
            chartClass: 'RemoteWorkChart',
            canvasId: 'remoteChart'
        },
        roles: {
            id: 'roles',
            title: '👥 Role Analysis',
            description: 'Top highest-paying roles with salary ranges',
            requiredColumns: ['job_title', 'salary_in_usd', 'experience_level'],
            chartType: 'bar',
            chartClass: 'RolesChart',
            canvasId: 'rolesChart'
        },
        company: {
            id: 'company',
            title: '🏢 Company Size Analysis',
            description: 'Salary distribution by company size',
            requiredColumns: ['company_size', 'salary_in_usd', 'employment_type'],
            chartType: 'doughnut',
            chartClass: 'CompanyChart',
            canvasId: 'companyChart'
        },
        temporal: {
            id: 'temporal',
            title: '📅 Temporal Analysis',
            description: 'Salary trends by year and experience level',
            requiredColumns: ['work_year', 'salary_in_usd', 'experience_level'],
            chartType: 'line',
            chartClass: 'TemporalChart',
            canvasId: 'temporalChart'
        }
    },

    // Sample data for demonstrations
    sampleData: {
        distributional: {
            labels: ['Entry-level', 'Mid-level', 'Senior', 'Executive'],
            data: [65000, 95000, 135000, 185000],
            colors: ['#3498db', '#2ecc71', '#f39c12', '#e74c3c']
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
            labels: ['United States', 'United Kingdom', 'Canada', 'Germany', 'Australia'],
            data: [145000, 85000, 92000, 78000, 105000],
            colors: ['#9b59b6', '#3498db', '#2ecc71', '#f39c12', '#e74c3c']
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
            labels: ['ML Engineer', 'Data Scientist', 'Data Engineer', 'Analytics Manager', 'Data Analyst'],
            data: [155000, 145000, 135000, 125000, 85000],
            colors: ['#9b59b6', '#3498db', '#2ecc71', '#f39c12', '#e74c3c']
        },
        company: {
            labels: ['Startup (S)', 'Medium (M)', 'Large (L)'],
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