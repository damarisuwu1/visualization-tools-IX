// js/utils/chartConfig.js - Configuración común para Chart.js

const ChartConfig = {
    // Configuración común para todas las gráficas
    commonOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#374151',
                    font: {
                        family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        size: 13,
                        weight: '500'
                    },
                    padding: 20,
                    usePointStyle: true
                }
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderColor: 'rgba(0, 0, 0, 0.1)',
                borderWidth: 1,
                titleColor: '#1f2937',
                bodyColor: '#374151',
                cornerRadius: 12,
                padding: 12,
                font: {
                    family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                },
                shadowOffsetX: 0,
                shadowOffsetY: 4,
                shadowBlur: 12,
                shadowColor: 'rgba(0, 0, 0, 0.15)'
            }
        },
        layout: {
            padding: {
                top: 10,
                right: 10,
                bottom: 10,
                left: 10
            }
        },
        animation: {
            duration: 800,
            easing: 'easeOutCubic'
        }
    },

    // Colores modernos y elegantes
    colors: {
        primary: '#3b82f6',
        primaryRGBA: 'rgba(59, 130, 246, 0.8)',
        primaryBorder: '#2563eb',

        secondary: '#06b6d4',
        secondaryRGBA: 'rgba(6, 182, 212, 0.8)',
        secondaryBorder: '#0891b2',

        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        info: '#8b5cf6',
        teal: '#14b8a6',
        rose: '#f43f5e',

        palette: [
            '#3b82f6', // Blue
            '#06b6d4', // Cyan
            '#10b981', // Emerald
            '#f59e0b', // Amber
            '#ef4444', // Red
            '#8b5cf6', // Violet
            '#ec4899', // Pink
            '#84cc16', // Lime
            '#14b8a6', // Teal
            '#f43f5e', // Rose
            '#6366f1', // Indigo
            '#a855f7', // Purple
            '#22d3ee'  // Sky
        ]
    },

    // Función helper para crear datasets con estilo moderno
    createDataset: function(label, data, options = {}) {
        return {
            label,
            data,
            backgroundColor: options.backgroundColor || this.colors.primaryRGBA,
            borderColor: options.borderColor || this.colors.primary,
            borderWidth: options.borderWidth || 2,
            borderRadius: options.borderRadius || 8,
            pointBackgroundColor: options.pointBackgroundColor || this.colors.primary,
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: options.pointRadius || 6,
            pointHoverRadius: options.pointHoverRadius || 8,
            tension: options.tension || 0.4,
            ...options
        };
    },

    // Configuraciones específicas por tipo de gráfica
    getOptionsFor: function(chartType) {
        const baseOptions = { ...this.commonOptions };

        // Actualizar colores según el tema actual
        const colors = this.getCurrentThemeColors();
        
        // Aplicar colores del tema a las opciones base
        baseOptions.plugins.legend.labels.color = colors.text;
        baseOptions.plugins.tooltip.backgroundColor = colors.surface;
        baseOptions.plugins.tooltip.titleColor = colors.text;
        baseOptions.plugins.tooltip.bodyColor = colors.textSecondary;

        switch(chartType) {
            case 'bar':
                return {
                    ...baseOptions,
                    scales: {
                        x: {
                            grid: {
                                color: colors.gridColor,
                                borderColor: colors.gridColor
                            },
                            ticks: {
                                color: colors.textSecondary,
                                font: {
                                    family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                    size: 12,
                                    weight: '500'
                                }
                            }
                        },
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: colors.gridColor,
                                borderColor: colors.gridColor
                            },
                            ticks: {
                                color: colors.textSecondary,
                                font: {
                                    family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                    size: 12,
                                    weight: '500'
                                },
                                callback: function(value) {
                                    return '$' + (value / 1000) + 'K';
                                }
                            }
                        }
                    }
                };

            case 'doughnut':
                return {
                    ...baseOptions,
                    cutout: '65%',
                    elements: {
                        arc: {
                            borderWidth: 0,
                            borderRadius: 4
                        }
                    }
                };

            case 'line':
                return {
                    ...baseOptions,
                    scales: {
                        x: {
                            display: true,
                            grid: {
                                color: colors.gridColor,
                                borderColor: colors.gridColor
                            },
                            ticks: {
                                color: colors.textSecondary,
                                font: {
                                    family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                    size: 12,
                                    weight: '500'
                                }
                            }
                        },
                        y: {
                            display: true,
                            beginAtZero: true,
                            grid: {
                                color: colors.gridColor,
                                borderColor: colors.gridColor
                            },
                            ticks: {
                                color: colors.textSecondary,
                                font: {
                                    family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                    size: 12,
                                    weight: '500'
                                },
                                callback: function(value) {
                                    return '$' + (value / 1000) + 'K';
                                }
                            }
                        }
                    },
                    elements: {
                        line: { 
                            tension: 0.4,
                            borderCapStyle: 'round',
                            borderJoinStyle: 'round'
                        },
                        point: {
                            hoverBackgroundColor: '#ffffff',
                            hoverBorderWidth: 3
                        }
                    }
                };

            default:
                return baseOptions;
        }
    },

    // Obtener colores del tema actual
    getCurrentThemeColors: function() {
        if (typeof themeManager !== 'undefined') {
            const theme = themeManager.getCurrentTheme();
            return {
                text: theme.properties.textPrimary,
                textSecondary: theme.properties.textSecondary,
                surface: theme.properties.surfaceColor,
                gridColor: theme.properties.borderColor
            };
        }

        // Colores por defecto si no hay gestor de temas
        return {
            text: '#1f2937',
            textSecondary: '#6b7280',
            surface: 'rgba(255, 255, 255, 0.95)',
            gridColor: 'rgba(156, 163, 175, 0.2)'
        };
    },

    // Formatear valores de dinero
    formatCurrency: function(value) {
        if (value >= 1000000) {
            return '$' + (value / 1000000).toFixed(1) + 'M';
        } else if (value >= 1000) {
            return '$' + (value / 1000).toFixed(0) + 'K';
        }
        return '$' + value.toLocaleString();
    },

    // Obtener configuración adaptada al tema
    getThemeAwareConfig: function(chartType) {
        return this.getOptionsFor(chartType);
    }
};

// Hacer disponible globalmente
window.ChartConfig = ChartConfig;