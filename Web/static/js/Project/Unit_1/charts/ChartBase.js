// js/charts/ChartBase.js - Clase base para todas las gráficas

class ChartBase {
    constructor(canvasId) {
        this.canvasId = canvasId;
        this.canvas = null;
        this.ctx = null;
        this.chart = null;
        this.initialized = false;
        this.data = null;
        
        // Configuración por defecto
        this.defaultOptions = {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 800,
                easing: 'easeOutCubic'
            }
        };
    }

    // Inicializar el canvas y contexto
    initCanvas() {
        this.canvas = document.getElementById(this.canvasId);
        if (!this.canvas) {
            console.error(`Canvas no encontrado: ${this.canvasId}`);
            return false;
        }

        this.ctx = this.canvas.getContext('2d');
        if (!this.ctx) {
            console.error(`No se pudo obtener el contexto 2D para: ${this.canvasId}`);
            return false;
        }

        return true;
    }

    // Obtener configuración base adaptada al tema
    getBaseOptions() {
        const themeConfig = ChartConfig ? ChartConfig.getThemeAwareConfig('base') : this.defaultOptions;
        
        return {
            ...this.defaultOptions,
            ...themeConfig,
            plugins: {
                ...themeConfig.plugins,
                tooltip: {
                    ...themeConfig.plugins?.tooltip,
                    callbacks: {
                        ...themeConfig.plugins?.tooltip?.callbacks,
                        label: (context) => {
                            return this.formatTooltipLabel(context);
                        }
                    }
                }
            }
        };
    }

    // Formatear etiquetas del tooltip (puede ser sobrescrito)
    formatTooltipLabel(context) {
        const value = context.parsed.y || context.parsed;
        return `${context.dataset.label}: ${ChartConfig?.formatCurrency(value) || '$' + value}`;
    }

    // Obtener paleta de colores del tema actual
    getColorPalette() {
        if (SalaryConfig && typeof SalaryConfig.getChartColorPalette === 'function') {
            return SalaryConfig.getChartColorPalette();
        }
        
        return [
            '#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444',
            '#8b5cf6', '#ec4899', '#84cc16', '#14b8a6', '#f43f5e'
        ];
    }

    // Preparar datos para la gráfica (debe ser implementado por cada subclase)
    prepareData(rawData) {
        throw new Error('prepareData debe ser implementado por la subclase');
    }

    // Crear la gráfica (debe ser implementado por cada subclase)
    createChart(data, options) {
        throw new Error('createChart debe ser implementado por la subclase');
    }

    // Método principal para inicializar la gráfica
    init(data) {
        try {
            // Inicializar canvas
            if (!this.initCanvas()) {
                return false;
            }

            // Preparar datos
            this.data = this.prepareData(data);
            
            // Obtener opciones
            const options = this.getBaseOptions();
            
            // Destruir gráfica anterior si existe
            this.destroy();
            
            // Crear nueva gráfica
            this.chart = this.createChart(this.data, options);
            
            if (this.chart) {
                this.initialized = true;
                console.log(`Gráfica ${this.canvasId} inicializada correctamente`);
                return true;
            } else {
                console.error(`Error creando gráfica ${this.canvasId}`);
                return false;
            }
            
        } catch (error) {
            console.error(`Error inicializando gráfica ${this.canvasId}:`, error);
            return false;
        }
    }

    // Actualizar datos de la gráfica
    updateData(newData) {
        if (!this.chart) {
            console.warn(`Gráfica ${this.canvasId} no está inicializada`);
            return false;
        }

        try {
            const preparedData = this.prepareData(newData);
            this.chart.data = preparedData;
            this.chart.update('active');
            return true;
        } catch (error) {
            console.error(`Error actualizando datos de ${this.canvasId}:`, error);
            return false;
        }
    }

    // Redimensionar gráfica
    resize() {
        if (this.chart) {
            this.chart.resize();
        }
    }

    // Destruir gráfica
    destroy() {
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
            this.initialized = false;
        }
    }

    // Exportar gráfica como imagen
    exportAsImage(format = 'png') {
        if (!this.chart) {
            console.warn(`Gráfica ${this.canvasId} no está inicializada`);
            return null;
        }

        try {
            const url = this.chart.toBase64Image(format, 1.0);
            return url;
        } catch (error) {
            console.error(`Error exportando gráfica ${this.canvasId}:`, error);
            return null;
        }
    }

    // Obtener datos de la gráfica
    getData() {
        return this.data;
    }

    // Verificar si la gráfica está inicializada
    isInitialized() {
        return this.initialized && this.chart !== null;
    }

    // Método helper para mostrar estado de carga
    showLoading() {
        const container = this.canvas?.parentElement;
        if (container) {
            container.classList.add('chart-loading');
            container.innerHTML = '<div class="chart-loading">Cargando gráfica...</div>';
        }
    }

    // Método helper para mostrar errores
    showError(message) {
        const container = this.canvas?.parentElement;
        if (container) {
            container.classList.add('chart-error');
            container.innerHTML = `<div class="chart-error">Error: ${message}</div>`;
        }
    }

    // Limpiar estados de carga/error
    clearStatus() {
        const container = this.canvas?.parentElement;
        if (container) {
            container.classList.remove('chart-loading', 'chart-error');
        }
    }

    // Suscribirse a cambios de tema
    subscribeToThemeChanges() {
        if (typeof themeManager !== 'undefined') {
            return themeManager.subscribe((newTheme) => {
                this.onThemeChange(newTheme);
            });
        }
        return null;
    }

    // Manejar cambios de tema
    onThemeChange(newTheme) {
        if (this.chart && this.data) {
            // Re-crear la gráfica con el nuevo tema
            const options = this.getBaseOptions();
            this.destroy();
            this.chart = this.createChart(this.data, options);
        }
    }
}

// Hacer disponible globalmente
window.ChartBase = ChartBase;