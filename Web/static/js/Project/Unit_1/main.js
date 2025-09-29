// js/main.js - Archivo principal de inicialización del dashboard

class DashboardManager {
    constructor() {
        this.charts = {};
        this.initialized = false;
        this.themeManager = null;
        this.tabManager = null;
        this.themeSubscription = null; // Para evitar múltiples suscripciones
        
        // Configuración de inicialización
        this.config = {
            autoInitCharts: true,
            showLoadingStates: true,
            enableThemeToggle: true,
            animationDelay: 100
        };

        console.log('🚀 Dashboard Manager creado');
    }

    // Inicializar el dashboard completo
    async init() {
        try {
            console.log('📊 Inicializando Dashboard de Salarios...');

            // 1. Verificar dependencias
            if (!this.checkDependencies()) {
                throw new Error('Dependencias requeridas no encontradas');
            }

            // 2. Inicializar gestor de temas
            this.initThemeManager();

            // 3. Crear estructura del dashboard
            this.createDashboardStructure();

            // 4. Inicializar gráficas
            if (this.config.autoInitCharts) {
                await this.initAllCharts();
            }

            // 5. Configurar event listeners
            this.setupEventListeners();

            this.initialized = true;
            console.log('✅ Dashboard inicializado correctamente');

            // Dispatch evento de inicialización completa
            this.dispatchEvent('dashboardInitialized');

        } catch (error) {
            console.error('❌ Error inicializando dashboard:', error);
            this.showError('Error inicializando el dashboard: ' + error.message);
        }
    }

    // Verificar que todas las dependencias estén disponibles
    checkDependencies() {
        const required = [
            'Chart', 'DashboardConfig', 'ChartConfig', 
            'ChartBase', 'SalaryDistChart', 'GeographicChart',
            'RolesChart', 'CompanyChart', 'TemporalChart',
            'WorkModalitiesChart'
        ];
        console.log('🔍 Verificando dependencias...');
        
        // Verificar cada dependencia individualmente
        required.forEach(dep => {
            const exists = typeof window[dep] !== 'undefined';
            console.log(`${exists ? '✅' : '❌'} ${dep}: ${exists ? 'disponible' : 'FALTANTE'}`);
        });

        const missing = required.filter(dep => typeof window[dep] === 'undefined');
        
        if (missing.length > 0) {
            console.error('❌ Dependencias faltantes:', missing);
            console.error('📋 Lista completa de dependencias faltantes:');
            missing.forEach((dep, index) => {
                console.error(`${index + 1}. ${dep}`);
            });
            return false;
        }

        console.log('✅ Todas las dependencias están disponibles');
        return true;
    }

    // Inicializar el gestor de temas
    initThemeManager() {
        if (typeof window.themeManager !== 'undefined') {
            this.themeManager = window.themeManager;
            
            // SOLO suscribirse una vez y evitar el tema inicial
            if (!this.themeSubscription) {
                this.themeSubscription = this.themeManager.subscribe((newTheme, oldTheme) => {
                    // Solo procesar si realmente cambió el tema y no es la inicialización
                    if (newTheme !== oldTheme && oldTheme !== undefined) {
                        this.onThemeChange(newTheme);
                    }
                });
            }

            console.log('🎨 Gestor de temas inicializado');
        } else {
            console.warn('⚠️ themeManager no encontrado, continuando sin gestión de temas');
        }
    }

    // Crear la estructura HTML del dashboard
    createDashboardStructure() {
        const container = document.querySelector('.main-content');
        if (!container) {
            console.error('❌ Contenedor principal no encontrado');
            return;
        }

        // Remover loading container
        const loadingContainer = container.querySelector('.loading-container');
        if (loadingContainer) {
            loadingContainer.remove();
        }

        // Crear tabs principales
        const tabsContainer = this.createMainTabs();
        container.appendChild(tabsContainer);

        // Crear secciones de análisis
        const sectionsContainer = this.createAnalysisSections();
        container.appendChild(sectionsContainer);

        console.log('🏗️ Estructura del dashboard creada');
    }

    // Crear tabs principales del dashboard
    createMainTabs() {
        const tabsWrapper = document.createElement('div');
        tabsWrapper.className = 'main-tabs-wrapper';

        const tabsContainer = document.createElement('div');
        tabsContainer.className = 'main-tabs';

        const sections = DashboardConfig.getAllSections();
        
        sections.forEach((section, index) => {
            const tab = document.createElement('button');
            tab.className = `main-tab ${index === 0 ? 'active' : ''}`;
            // Limpiar el título para mostrar solo el texto sin emojis
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

    // Crear secciones de análisis
    createAnalysisSections() {
        const sectionsContainer = document.createElement('div');
        sectionsContainer.className = 'analysis-sections';

        const sections = DashboardConfig.getAllSections();

        sections.forEach((sectionConfig, index) => {
            // Crear una sección básica si la clase específica no existe
            const ChartClass = window[sectionConfig.chartClass];
            let section;
            
            if (ChartClass && typeof ChartClass.createSection === 'function') {
                section = ChartClass.createSection();
            } else {
                // Crear sección básica como fallback
                section = this.createBasicSection(sectionConfig);
                console.warn(`⚠️ Usando sección básica para: ${sectionConfig.chartClass}`);
            }
            
            section.id = sectionConfig.id + '-section';
            section.classList.add('analysis-section');
            section.classList.add(index === 0 ? 'active' : 'hidden');
            sectionsContainer.appendChild(section);
        });

        return sectionsContainer;
    }

    // Crear sección básica como fallback
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

    // Inicializar todas las gráficas
    async initAllCharts() {
        console.log('📈 Inicializando gráficas...');
        
        const sections = DashboardConfig.getAllSections();
        
        for (const section of sections) {
            try {
                await this.initChart(section);
                // Pequeña pausa entre inicializaciones
                await new Promise(resolve => setTimeout(resolve, this.config.animationDelay));
            } catch (error) {
                console.error(`❌ Error inicializando gráfica ${section.id}:`, error);
                // Crear gráfica básica como fallback
                this.createFallbackChart(section);
            }
        }

        console.log('✅ Inicialización de gráficas completada');
    }

    // Crear gráfica básica como fallback
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
                        label: 'Datos de muestra',
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
            console.log(`✅ Gráfica fallback creada para ${sectionConfig.id}`);
        }
    }

    // Inicializar una gráfica específica
    // Inicializar una gráfica específica
async initChart(sectionConfig) {
    const ChartClass = window[sectionConfig.chartClass];
    
    if (!ChartClass) {
        throw new Error(`Clase de gráfica no encontrada: ${sectionConfig.chartClass}`);
    }

    // Verificar que el canvas existe
    const canvas = document.getElementById(sectionConfig.canvasId);
    if (!canvas) {
        console.warn(`Canvas no encontrado: ${sectionConfig.canvasId}, saltando inicialización`);
        return;
    }

    try {
        // Para WorkModalitiesChart, pasar el canvasId explícitamente
        if (sectionConfig.chartClass === 'WorkModalitiesChart') {
            const chart = new ChartClass(sectionConfig.canvasId);
            if (chart) {
                this.charts[sectionConfig.id] = chart;
                console.log(`✅ Gráfica ${sectionConfig.id} inicializada con canvas: ${sectionConfig.canvasId}`);
            }
            return;
        }

        // Para otras gráficas, usar el método original
        if (typeof ChartClass.initializeChart === 'function') {
            const chart = ChartClass.initializeChart();
            if (chart) {
                this.charts[sectionConfig.id] = chart;
                console.log(`✅ Gráfica ${sectionConfig.id} inicializada`);
            }
        } else {
            // Inicialización manual si no hay método estático
            const chart = new ChartClass();
            const sampleData = DashboardConfig.sampleData[sectionConfig.id];
            
            if (sampleData && chart.init) {
                const success = chart.init(sampleData);
                if (success) {
                    this.charts[sectionConfig.id] = chart;
                    console.log(`✅ Gráfica ${sectionConfig.id} inicializada manualmente`);
                }
            }
        }
    } catch (error) {
        console.error(`❌ Error creando instancia de ${sectionConfig.chartClass}:`, error);
        this.createFallbackChart(sectionConfig);
    }
}

    // Mostrar una sección específica
    showSection(sectionId, tabElement) {
        // Ocultar todas las secciones
        document.querySelectorAll('.analysis-section').forEach(section => {
            section.classList.remove('active');
            section.classList.add('hidden');
        });

        // Mostrar sección seleccionada
        const targetSection = document.getElementById(sectionId + '-section');
        if (targetSection) {
            targetSection.classList.remove('hidden');
            targetSection.classList.add('active');
        }

        // Actualizar tabs
        document.querySelectorAll('.main-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        tabElement.classList.add('active');

        // Redimensionar gráfica si es necesario
        const chart = this.charts[sectionId];
        if (chart && chart.resize) {
            setTimeout(() => chart.resize(), 100);
        }

        console.log(`📊 Sección ${sectionId} mostrada`);
    }

    // Configurar event listeners
    setupEventListeners() {
        // Redimensionar gráficas cuando cambie el tamaño de ventana
        window.addEventListener('resize', this.debounce(() => {
            this.resizeAllCharts();
        }, 250));

        // NO agregar más listeners de tema aquí - ya está manejado en ThemeManager
        console.log('👂 Event listeners configurados');
    }

    // Redimensionar todas las gráficas
    resizeAllCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart && chart.resize) {
                chart.resize();
            }
        });
    }

    // Manejar cambios de tema
    onThemeChange(newTheme) {
        console.log(`🎨 Tema cambiado a: ${newTheme}`);
        
        // Actualizar gráficas existentes
        Object.values(this.charts).forEach(chart => {
            if (chart && chart.onThemeChange) {
                chart.onThemeChange(newTheme);
            }
        });
    }

    // Actualizar datos de todas las gráficas
    updateAllCharts(newData) {
        Object.keys(this.charts).forEach(sectionId => {
            const chart = this.charts[sectionId];
            const sectionData = newData[sectionId];
            
            if (chart && sectionData && chart.updateData) {
                chart.updateData(sectionData);
            }
        });

        console.log('📊 Datos de gráficas actualizados');
    }

    // Obtener una gráfica específica
    getChart(sectionId) {
        return this.charts[sectionId] || null;
    }

    // Exportar todas las gráficas como imágenes
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

    // Mostrar mensaje de error
    showError(message) {
        console.error('❌', message);
        
        // Crear notificación de error visual
        const errorDiv = document.createElement('div');
        errorDiv.className = 'dashboard-error';
        errorDiv.innerHTML = `
            <div class="error-content">
                <strong>Error:</strong> ${message}
            </div>
        `;

        document.body.appendChild(errorDiv);

        // Remover después de 5 segundos
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    // Dispatch eventos personalizados
    dispatchEvent(eventName, detail = {}) {
        const event = new CustomEvent(eventName, { detail });
        document.dispatchEvent(event);
    }

    // Utilidad: debounce
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

    // Destruir el dashboard
    destroy() {
        // Limpiar suscripción de tema
        if (this.themeSubscription) {
            this.themeSubscription();
            this.themeSubscription = null;
        }

        // Destruir todas las gráficas
        Object.values(this.charts).forEach(chart => {
            if (chart && chart.destroy) {
                chart.destroy();
            }
        });

        this.charts = {};
        this.initialized = false;
        console.log('🧹 Dashboard destruido');
    }
}

// Instancia global del dashboard
let dashboardManager = null;

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🌟 DOM cargado, inicializando dashboard...');
    
    try {
        // Crear y inicializar el dashboard
        dashboardManager = new DashboardManager();
        await dashboardManager.init();
        
        // Hacer disponible globalmente para debugging
        window.dashboardManager = dashboardManager;
    } catch (error) {
        console.error('💥 Error crítico al inicializar:', error);
    }
});

// Hacer clases disponibles globalmente
window.DashboardManager = DashboardManager;