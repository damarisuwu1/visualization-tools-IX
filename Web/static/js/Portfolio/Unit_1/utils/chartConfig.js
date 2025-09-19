const ChartConfig = {
    // Configuración común para todas las gráficas
    commonOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            }
        }
    },

    // Colores predefinidos (hex y rgba para flexibilidad)
    colors: {
        primary: '#6366f1',
        primaryRGBA: 'rgba(102, 126, 234, 0.8)',
        primaryBorder: '#4f46e5',
        primaryBorderRGBA: 'rgba(102, 126, 234, 1)',
        
        secondary: '#06b6d4',
        secondaryRGBA: 'rgba(75, 192, 192, 0.8)',
        secondaryBorder: '#0891b2',
        secondaryBorderRGBA: 'rgba(75, 192, 192, 1)',

        danger: 'rgba(255, 99, 132, 0.8)',
        warning: 'rgba(255, 205, 86, 0.8)',
        success: 'rgba(54, 162, 235, 0.8)',
        info: 'rgba(153, 102, 255, 0.8)',

        palette: [
            '#6366f1',
            '#06b6d4',
            '#10b981',
            '#f59e0b',
            '#ef4444',
            '#8b5cf6',
            '#ec4899',
            '#84cc16',
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 205, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)'
        ]
    },

    // Función helper para crear datasets
    createDataset: function(label, data, options = {}) {
        return {
            label,
            data,
            backgroundColor: options.backgroundColor || this.colors.primary,
            borderColor: options.borderColor || this.colors.primaryBorder,
            borderWidth: options.borderWidth || 2,
            borderRadius: options.borderRadius || 4,
            ...options
        };
    },

    // Configuraciones específicas por tipo de gráfica
    getOptionsFor: function(chartType) {
        const baseOptions = { ...this.commonOptions };

        switch(chartType) {
            case 'bar':
                return {
                    ...baseOptions,
                    scales: {
                        y: { beginAtZero: true }
                    }
                };

            case 'doughnut':
                return {
                    ...baseOptions,
                    cutout: '60%'
                };

            case 'line':
                return {
                    ...baseOptions,
                    scales: {
                        x: { display: true },
                        y: { display: true, beginAtZero: true }
                    },
                    elements: {
                        line: { tension: 0.4 }
                    }
                };

            case 'scatter':
            case 'bubble':
                return {
                    ...baseOptions,
                    scales: {
                        x: { type: 'linear', position: 'bottom' },
                        y: { beginAtZero: true }
                    }
                };

            case 'radar':
                return {
                    ...baseOptions,
                    scales: {
                        r: { beginAtZero: true }
                    }
                };

            default:
                return baseOptions;
        }
    }
};

// Hacer disponible globalmente en el navegador
window.ChartConfig = ChartConfig;
