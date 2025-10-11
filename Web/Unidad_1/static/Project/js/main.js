// js/main.js - Main dashboard initialization file

class DashboardManager {
    constructor() {
        this.charts = {};
        this.initialized = false;
        this.themeManager = null;
        this.tabManager = null;
        this.themeSubscription = null; // To avoid multiple subscriptions
        
        // Initialization configuration
        this.config = {
            autoInitCharts: true,
            showLoadingStates: true,
            enableThemeToggle: true,
            animationDelay: 100
        };

        console.log('Dashboard Manager created');
    }

    // Initialize the complete dashboard
    async init() {
        try {
            console.log('Initializing Salary Dashboard...');

            // 1. Check dependencies
            if (!this.checkDependencies()) {
                throw new Error('Required dependencies not found');
            }

            // 2. Initialize theme manager
            this.initThemeManager();

            // 3. Create dashboard structure
            this.createDashboardStructure();

            // 4. Initialize charts
            if (this.config.autoInitCharts) {
                await this.initAllCharts();
            }

            // 5. Set up event listeners
            this.setupEventListeners();

            this.initialized = true;
            console.log('Dashboard initialized successfully');

            // Dispatch initialization complete event
            this.dispatchEvent('dashboardInitialized');

        } catch (error) {
            console.error('Error initializing dashboard:', error);
            this.showError('Error initializing dashboard: ' + error.message);
        }
    }

    // Check that all dependencies are available
    checkDependencies() {
        const required = [
            'Chart', 'DashboardConfig', 'ChartConfig', 
            'ChartBase', 'SalaryDistChart', 'GeographicChart',
            'RolesChart', 'CompanyChart', 'TemporalChart',
            'WorkModalitiesChart'
        ];
        console.log('Checking dependencies...');
        
        // Check each dependency individually
        required.forEach(dep => {
            const exists = typeof window[dep] !== 'undefined';
            console.log(`${exists ? '✓' : '✗'} ${dep}: ${exists ? 'available' : 'MISSING'}`);
        });

        const missing = required.filter(dep => typeof window[dep] === 'undefined');
        
        if (missing.length > 0) {
            console.error('Missing dependencies:', missing);
            console.error('Complete list of missing dependencies:');
            missing.forEach((dep, index) => {
                console.error(`${index + 1}. ${dep}`);
            });
            return false;
        }

        console.log('All dependencies are available');
        return true;
    }

    // Initialize theme manager
    initThemeManager() {
        if (typeof window.themeManager !== 'undefined') {
            this.themeManager = window.themeManager;
            
            // ONLY subscribe once and avoid initial theme
            if (!this.themeSubscription) {
                this.themeSubscription = this.themeManager.subscribe((newTheme, oldTheme) => {
                    // Only process if theme actually changed and it's not initialization
                    if (newTheme !== oldTheme && oldTheme !== undefined) {
                        this.onThemeChange(newTheme);
                    }
                });
            }

            console.log('Theme manager initialized');
        } else {
            console.warn('themeManager not found, continuing without theme management');
        }
    }

    // Create dashboard HTML structure
    createDashboardStructure() {
        const container = document.querySelector('.main-content');
        if (!container) {
            console.error('Main container not found');
            return;
        }

        // Remove loading container
        const loadingContainer = container.querySelector('.loading-container');
        if (loadingContainer) {
            loadingContainer.remove();
        }

        // Create main tabs
        const tabsContainer = this.createMainTabs();
        container.appendChild(tabsContainer);

        // Create analysis sections
        const sectionsContainer = this.createAnalysisSections();
        container.appendChild(sectionsContainer);

        console.log('Dashboard structure created');
    }

    // Create main dashboard tabs
    createMainTabs() {
        const tabsWrapper = document.createElement('div');
        tabsWrapper.className = 'main-tabs-wrapper';

        const tabsContainer = document.createElement('div');
        tabsContainer.className = 'main-tabs';

        const sections = DashboardConfig.getAllSections();
        
        sections.forEach((section, index) => {
            const tab = document.createElement('button');
            tab.className = `main-tab ${index === 0 ? 'active' : ''}`;
            // Clean title to show only text without emojis
            const cleanTitle = section.title.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim();
            tab.textContent = cleanTitle || section.title;
            tab.dataset.sectionId = section.id;
            
            tab.addEventListener('click', (e) => {
                this.showSection(section.id, e.target);
            });

            tabsContainer.appendChild(tab);
        });

        tabsWrapper.appendChild(tabsContainer);
        return tabsWrapper;
    }

    // Create analysis sections
    createAnalysisSections() {
        const sectionsContainer = document.createElement('div');
        sectionsContainer.className = 'analysis-sections';

        const sections = DashboardConfig.getAllSections();

        sections.forEach((sectionConfig, index) => {
            // Create basic section if specific class doesn't exist
            const ChartClass = window[sectionConfig.chartClass];
            let section;
            
            if (ChartClass && typeof ChartClass.createSection === 'function') {
                section = ChartClass.createSection();
            } else {
                // Create basic section as fallback
                section = this.createBasicSection(sectionConfig);
                console.warn(`Using basic section for: ${sectionConfig.chartClass}`);
            }
            
            section.id = sectionConfig.id + '-section';
            section.classList.add('analysis-section');
            section.classList.add(index === 0 ? 'active' : 'hidden');
            sectionsContainer.appendChild(section);
        });

        return sectionsContainer;
    }

    // Create basic section as fallback
    createBasicSection(config) {
        const section = document.createElement('div');
        section.innerHTML = `
            <div class="section-header">
                <h2>${config.title}</h2>
                <p>${config.description}</p>
            </div>
            <div class="chart-container">
                <canvas id="${config.canvasId}" width="400" height="200"></canvas>
            </div>
        `;
        return section;
    }

    // Initialize all charts
    async initAllCharts() {
        console.log('Initializing charts...');
        
        const sections = DashboardConfig.getAllSections();
        
        for (const section of sections) {
            try {
                await this.initChart(section);
                // Small pause between initializations
                await new Promise(resolve => setTimeout(resolve, this.config.animationDelay));
            } catch (error) {
                console.error(`Error initializing chart ${section.id}:`, error);
                // Create basic chart as fallback
                this.createFallbackChart(section);
            }
        }

        console.log('Chart initialization completed');
    }

    // Create basic chart as fallback
    createFallbackChart(sectionConfig) {
        const canvas = document.getElementById(sectionConfig.canvasId);
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const sampleData = DashboardConfig.sampleData[sectionConfig.id];
        
        if (sampleData && window.Chart) {
            const chart = new Chart(ctx, {
                type: sectionConfig.chartType,
                data: {
                    labels: sampleData.labels,
                    datasets: [{
                        label: 'Sample data',
                        data: sampleData.data,
                        backgroundColor: sampleData.colors || DashboardConfig.colorPalette
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
            
            this.charts[sectionConfig.id] = chart;
            console.log(`Fallback chart created for ${sectionConfig.id}`);
        }
    }

    // Initialize specific chart
    async initChart(sectionConfig) {
        const ChartClass = window[sectionConfig.chartClass];
        
        if (!ChartClass) {
            throw new Error(`Chart class not found: ${sectionConfig.chartClass}`);
        }

        // Check that canvas exists
        const canvas = document.getElementById(sectionConfig.canvasId);
        if (!canvas) {
            console.warn(`Canvas not found: ${sectionConfig.canvasId}, skipping initialization`);
            return;
        }

        try {
            // For WorkModalitiesChart, pass canvasId explicitly
            if (sectionConfig.chartClass === 'WorkModalitiesChart') {
                const chart = new ChartClass(sectionConfig.canvasId);
                if (chart) {
                    this.charts[sectionConfig.id] = chart;
                    console.log(`Chart ${sectionConfig.id} initialized with canvas: ${sectionConfig.canvasId}`);
                }
                return;
            }

            // For other charts, use original method
            if (typeof ChartClass.initializeChart === 'function') {
                const chart = ChartClass.initializeChart();
                if (chart) {
                    this.charts[sectionConfig.id] = chart;
                    console.log(`Chart ${sectionConfig.id} initialized`);
                }
            } else {
                // Manual initialization if no static method exists
                const chart = new ChartClass();
                const sampleData = DashboardConfig.sampleData[sectionConfig.id];
                
                if (sampleData && chart.init) {
                    const success = chart.init(sampleData);
                    if (success) {
                        this.charts[sectionConfig.id] = chart;
                        console.log(`Chart ${sectionConfig.id} initialized manually`);
                    }
                }
            }
        } catch (error) {
            console.error(`Error creating instance of ${sectionConfig.chartClass}:`, error);
            this.createFallbackChart(sectionConfig);
        }
    }

    // Show specific section
    showSection(sectionId, tabElement) {
        // Hide all sections
        document.querySelectorAll('.analysis-section').forEach(section => {
            section.classList.remove('active');
            section.classList.add('hidden');
        });

        // Show selected section
        const targetSection = document.getElementById(sectionId + '-section');
        if (targetSection) {
            targetSection.classList.remove('hidden');
            targetSection.classList.add('active');
        }

        // Update tabs
        document.querySelectorAll('.main-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        tabElement.classList.add('active');

        // Resize chart if necessary
        const chart = this.charts[sectionId];
        if (chart && chart.resize) {
            setTimeout(() => chart.resize(), 100);
        }

        console.log(`Section ${sectionId} shown`);
    }

    // Set up event listeners
    setupEventListeners() {
        // Resize charts when window size changes
        window.addEventListener('resize', this.debounce(() => {
            this.resizeAllCharts();
        }, 250));

        // DO NOT add more theme listeners here - already handled in ThemeManager
        console.log('Event listeners configured');
    }

    // Resize all charts
    resizeAllCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart && chart.resize) {
                chart.resize();
            }
        });
    }

    // Handle theme changes
    onThemeChange(newTheme) {
        console.log(`Theme changed to: ${newTheme}`);
        
        // Update existing charts
        Object.values(this.charts).forEach(chart => {
            if (chart && chart.onThemeChange) {
                chart.onThemeChange(newTheme);
            }
        });
    }

    // Update data for all charts
    updateAllCharts(newData) {
        Object.keys(this.charts).forEach(sectionId => {
            const chart = this.charts[sectionId];
            const sectionData = newData[sectionId];
            
            if (chart && sectionData && chart.updateData) {
                chart.updateData(sectionData);
            }
        });

        console.log('Chart data updated');
    }

    // Get specific chart
    getChart(sectionId) {
        return this.charts[sectionId] || null;
    }

    // Export all charts as images
    exportAllCharts(format = 'png') {
        const exports = {};
        
        Object.keys(this.charts).forEach(sectionId => {
            const chart = this.charts[sectionId];
            if (chart && chart.exportAsImage) {
                exports[sectionId] = chart.exportAsImage(format);
            }
        });

        return exports;
    }

    // Show error message
    showError(message) {
        console.error('Error:', message);
        
        // Create visual error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'dashboard-error';
        errorDiv.innerHTML = `
            <div class="error-content">
                <strong>Error:</strong> ${message}
            </div>
        `;

        document.body.appendChild(errorDiv);

        // Remove after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    // Dispatch custom events
    dispatchEvent(eventName, detail = {}) {
        const event = new CustomEvent(eventName, { detail });
        document.dispatchEvent(event);
    }

    // Utility: debounce
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Destroy dashboard
    destroy() {
        // Clean up theme subscription
        if (this.themeSubscription) {
            this.themeSubscription();
            this.themeSubscription = null;
        }

        // Destroy all charts
        Object.values(this.charts).forEach(chart => {
            if (chart && chart.destroy) {
                chart.destroy();
            }
        });

        this.charts = {};
        this.initialized = false;
        console.log('Dashboard destroyed');
    }
}

// Global dashboard instance
let dashboardManager = null;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM loaded, initializing dashboard...');
    
    try {
        // Create and initialize dashboard
        dashboardManager = new DashboardManager();
        await dashboardManager.init();
        
        // Make globally available for debugging
        window.dashboardManager = dashboardManager;
    } catch (error) {
        console.error('Critical error during initialization:', error);
    }
});

// Make classes globally available
window.DashboardManager = DashboardManager;