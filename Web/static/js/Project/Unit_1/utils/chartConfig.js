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
        }
    },

    // Colores modernos y elegantes
    colors: {
        primary: '#3b82f6',
        primaryRGBA: 'rgba(59, 130, 246, 0.8)',
        primaryBorder: '#2563eb',
        primaryBorderRGBA: 'rgba(37, 99, 235, 1)',

        secondary: '#06b6d4',
        secondaryRGBA: 'rgba(6, 182, 212, 0.8)',
        secondaryBorder: '#0891b2',
        secondaryBorderRGBA: 'rgba(8, 145, 178, 1)',

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
        ],

        // Gradientes para elementos especiales
        gradients: {
            primary: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            secondary: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
            success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            warning: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            danger: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
        }
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

        switch(chartType) {
            case 'bar':
                return {
                    ...baseOptions,
                    scales: {
                        x: {
                            grid: {
                                color: 'rgba(156, 163, 175, 0.2)',
                                borderColor: 'rgba(156, 163, 175, 0.3)'
                            },
                            ticks: {
                                color: '#6b7280',
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
                                color: 'rgba(156, 163, 175, 0.2)',
                                borderColor: 'rgba(156, 163, 175, 0.3)'
                            },
                            ticks: {
                                color: '#6b7280',
                                font: {
                                    family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                    size: 12,
                                    weight: '500'
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
                                color: 'rgba(156, 163, 175, 0.2)',
                                borderColor: 'rgba(156, 163, 175, 0.3)'
                            },
                            ticks: {
                                color: '#6b7280',
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
                                color: 'rgba(156, 163, 175, 0.2)',
                                borderColor: 'rgba(156, 163, 175, 0.3)'
                            },
                            ticks: {
                                color: '#6b7280',
                                font: {
                                    family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                    size: 12,
                                    weight: '500'
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

            case 'scatter':
            case 'bubble':
                return {
                    ...baseOptions,
                    scales: {
                        x: {
                            type: 'linear',
                            position: 'bottom',
                            grid: {
                                color: 'rgba(156, 163, 175, 0.2)',
                                borderColor: 'rgba(156, 163, 175, 0.3)'
                            },
                            ticks: {
                                color: '#6b7280',
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
                                color: 'rgba(156, 163, 175, 0.2)',
                                borderColor: 'rgba(156, 163, 175, 0.3)'
                            },
                            ticks: {
                                color: '#6b7280',
                                font: {
                                    family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                    size: 12,
                                    weight: '500'
                                }
                            }
                        }
                    }
                };

            case 'radar':
                return {
                    ...baseOptions,
                    scales: {
                        r: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(156, 163, 175, 0.3)'
                            },
                            pointLabels: {
                                color: '#374151',
                                font: {
                                    family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                    size: 12,
                                    weight: '500'
                                }
                            },
                            ticks: {
                                color: '#6b7280',
                                backdropColor: 'rgba(255, 255, 255, 0.8)'
                            }
                        }
                    }
                };

            default:
                return baseOptions;
        }
    }
};

// Hacer disponible globalmente en el navegador
window.ChartConfig = ChartConfig;