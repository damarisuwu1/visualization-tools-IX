// js/charts/ChartBase.js - Base class for all charts with API integration support

class ChartBase {
    constructor(canvasId) {
        this.canvasId = canvasId;
        this.canvas = null;
        this.ctx = null;
        this.chart = null;
        this.initialized = false;
        this.data = null;
        this.apiEndpoint = null;
        this.isLoadingData = false;
        
        // Default configuration
        this.defaultOptions = {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 800,
                easing: 'easeOutCubic'
            }
        };
    }

    // Initialize canvas and context
    initCanvas() {
        this.canvas = document.getElementById(this.canvasId);
        if (!this.canvas) {
            console.error(`Canvas not found: ${this.canvasId}`);
            return false;
        }

        this.ctx = this.canvas.getContext('2d');
        if (!this.ctx) {
            console.error(`Could not get 2D context for: ${this.canvasId}`);
            return false;
        }

        return true;
    }

    // Get base configuration adapted to theme
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

    // Format tooltip labels (can be overridden)
    formatTooltipLabel(context) {
        const value = context.parsed.y || context.parsed;
        return `${context.dataset.label}: ${ChartConfig?.formatCurrency(value) || '$' + value}`;
    }

    // Get color palette from current theme
    getColorPalette() {
        return this.getChartColorPalette();
    }

    // Get color palette (main method)
    getChartColorPalette() {
        if (DashboardConfig && typeof DashboardConfig.getChartColorPalette === 'function') {
            return DashboardConfig.getChartColorPalette();
        }
        
        return [
            '#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444',
            '#8b5cf6', '#ec4899', '#84cc16', '#14b8a6', '#f43f5e'
        ];
    }

    // Get theme-specific colors
    getThemeColors(themeName) {
        const defaultColors = {
            textPrimary: '#1f2937',
            textSecondary: '#6b7280',
            borderColor: 'rgba(229, 231, 235, 0.4)'
        };

        if (themeName === 'dark') {
            return {
                textPrimary: '#f9fafb',
                textSecondary: '#d1d5db',
                borderColor: 'rgba(75, 85, 99, 0.4)'
            };
        }

        return defaultColors;
    }

    // Fetch data from API (can be overridden by subclasses)
    async fetchData() {
        if (!this.apiEndpoint) {
            console.warn(`No API endpoint configured for ${this.canvasId}`);
            return null;
        }

        if (this.isLoadingData) {
            console.warn(`Data is already being loaded for ${this.canvasId}`);
            return null;
        }

        this.isLoadingData = true;
        this.showLoading();

        try {
            console.log(`Fetching data from API for ${this.canvasId}...`);
            
            const response = await fetch(this.apiEndpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const apiData = await response.json();
            
            if (apiData.status !== 'success') {
                throw new Error('API returned error status');
            }

            console.log(`Data fetched successfully for ${this.canvasId}:`, apiData.info);
            this.clearStatus();
            return apiData.info;

        } catch (error) {
            console.error(`Error fetching data for ${this.canvasId}:`, error);
            this.showError(`Failed to load data: ${error.message}`);
            return null;
        } finally {
            this.isLoadingData = false;
        }
    }

    // Set default data in case of API failure (should be implemented by subclasses)
    setDefaultData() {
        console.warn(`setDefaultData should be implemented by subclass for ${this.canvasId}`);
    }

    // Prepare data for chart (must be implemented by each subclass)
    prepareData(rawData) {
        throw new Error('prepareData must be implemented by subclass');
    }

    // Create chart (must be implemented by each subclass)
    createChart(data, options) {
        throw new Error('createChart must be implemented by subclass');
    }

    // Main method to initialize chart
    async init(data) {
        try {
            // Initialize canvas
            if (!this.initCanvas()) {
                return false;
            }

            // If no data provided, try to fetch from API
            if (!data && this.apiEndpoint) {
                const apiData = await this.fetchData();
                if (apiData) {
                    data = apiData;
                } else {
                    // Use default data if API fails
                    this.setDefaultData();
                    data = this.data;
                }
            }

            console.log(`Raw data received for ${this.canvasId}:`, data);

            // Prepare data
            this.data = this.prepareData(data);
            
            console.log(`Prepared data for ${this.canvasId}:`, JSON.stringify(this.data, null, 2));
            
            // Get options
            const options = this.getBaseOptions();
            
            // Destroy previous chart if exists
            this.destroy();
            
            // Create new chart
            this.chart = this.createChart(this.data, options);
            
            if (this.chart) {
                this.initialized = true;
                
                // Subscribe to theme changes ONLY once
                this.subscribeToThemeChanges();
                
                console.log(`Chart ${this.canvasId} initialized successfully`);
                return true;
            } else {
                console.error(`Error creating chart ${this.canvasId}`);
                return false;
            }
            
        } catch (error) {
            console.error(`Error initializing chart ${this.canvasId}:`, error);
            this.showError(error.message);
            return false;
        }
    }

    // Update chart data
    updateData(newData) {
        if (!this.chart) {
            console.warn(`Chart ${this.canvasId} is not initialized`);
            return false;
        }

        try {
            const preparedData = this.prepareData(newData);
            this.chart.data = preparedData;
            this.chart.update('active');
            return true;
        } catch (error) {
            console.error(`Error updating data for ${this.canvasId}:`, error);
            return false;
        }
    }

    // Refresh data from API
    async refreshData() {
        if (!this.apiEndpoint) {
            console.warn(`No API endpoint configured for ${this.canvasId}`);
            return false;
        }

        console.log(`Refreshing data for ${this.canvasId}...`);
        
        const apiData = await this.fetchData();
        
        if (apiData && this.chart) {
            return this.updateData(apiData);
        }
        
        return false;
    }

    // Resize chart
    resize() {
        if (this.chart) {
            this.chart.resize();
        }
    }

    // Destroy chart
    destroy() {
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
            this.initialized = false;
        }
        
        // Clean up theme subscription
        if (this.themeSubscription) {
            this.themeSubscription();
            this.themeSubscription = null;
        }
    }

    // Export chart as image
    exportAsImage(format = 'png') {
        if (!this.chart) {
            console.warn(`Chart ${this.canvasId} is not initialized`);
            return null;
        }

        try {
            const url = this.chart.toBase64Image(format, 1.0);
            return url;
        } catch (error) {
            console.error(`Error exporting chart ${this.canvasId}:`, error);
            return null;
        }
    }

    // Get chart data
    getData() {
        return this.data;
    }

    // Check if chart is initialized
    isInitialized() {
        return this.initialized && this.chart !== null;
    }

    // Helper method to show loading state
    showLoading() {
        const container = this.canvas?.parentElement;
        if (container) {
            // Remove any existing status elements
            const existingStatus = container.querySelector('.chart-status');
            if (existingStatus) {
                existingStatus.remove();
            }

            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'chart-status chart-loading';
            loadingDiv.innerHTML = '<div class="loading-spinner"></div><p>Loading chart data...</p>';
            container.appendChild(loadingDiv);
        }
    }

    // Helper method to show errors
    showError(message) {
        const container = this.canvas?.parentElement;
        if (container) {
            // Remove any existing status elements
            const existingStatus = container.querySelector('.chart-status');
            if (existingStatus) {
                existingStatus.remove();
            }

            const errorDiv = document.createElement('div');
            errorDiv.className = 'chart-status chart-error';
            errorDiv.innerHTML = `<p>Error: ${message}</p>`;
            container.appendChild(errorDiv);
        }
    }

    // Clear loading/error states
    clearStatus() {
        const container = this.canvas?.parentElement;
        if (container) {
            const statusElements = container.querySelectorAll('.chart-status');
            statusElements.forEach(el => el.remove());
        }
    }

    // Subscribe to theme changes
    subscribeToThemeChanges() {
        if (typeof themeManager !== 'undefined') {
            // Only subscribe once
            if (!this.themeSubscription) {
                this.themeSubscription = themeManager.subscribe((newTheme, oldTheme) => {
                    // Avoid infinite loops
                    if (newTheme !== oldTheme) {
                        this.onThemeChange(newTheme);
                    }
                });
            }
            return this.themeSubscription;
        }
        return null;
    }

    // Handle theme changes
    onThemeChange(newTheme) {
        if (this.chart && this.data && !this.updatingTheme) {
            this.updatingTheme = true;
            console.log(`Applying theme ${newTheme} to chart ${this.canvasId}`);
            
            try {
                // Get new color palette
                const colorPalette = this.getChartColorPalette();
                
                // Update colors in datasets
                if (this.chart.data.datasets) {
                    this.chart.data.datasets.forEach((dataset, index) => {
                        const colorIndex = index % colorPalette.length;
                        
                        if (Array.isArray(dataset.backgroundColor)) {
                            dataset.backgroundColor = colorPalette;
                            dataset.borderColor = colorPalette;
                        } else {
                            dataset.backgroundColor = colorPalette[colorIndex];
                            dataset.borderColor = colorPalette[colorIndex];
                        }
                    });
                }
                
                // Update chart options based on theme
                const themeColors = this.getThemeColors(newTheme);
                if (this.chart.options.plugins && this.chart.options.plugins.legend) {
                    this.chart.options.plugins.legend.labels.color = themeColors.textPrimary;
                }
                
                if (this.chart.options.scales) {
                    Object.keys(this.chart.options.scales).forEach(scaleKey => {
                        const scale = this.chart.options.scales[scaleKey];
                        if (scale.ticks) scale.ticks.color = themeColors.textSecondary;
                        if (scale.grid) scale.grid.color = themeColors.borderColor;
                    });
                }
                
                // Update without animation to avoid loops
                this.chart.update('none');
                
            } catch (error) {
                console.error(`Error applying theme to ${this.canvasId}:`, error);
            } finally {
                // Reset flag after a small delay
                setTimeout(() => {
                    this.updatingTheme = false;
                }, 100);
            }
        }
    }
}

// Make available globally
window.ChartBase = ChartBase;