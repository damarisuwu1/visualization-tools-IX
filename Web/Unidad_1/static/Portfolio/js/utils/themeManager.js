// themeManager.js - Gestor de temas modular

class ThemeManager {
    constructor() {
        this.currentTheme = 'default';
        this.themes = {
            default: {
                name: 'Claro',
                icon: this.getIcon('sun'),
                cssClass: '',
                properties: {
                    primaryColor: '#3b82f6',
                    secondaryColor: '#06b6d4',
                    accentColor: '#10b981',
                    warningColor: '#f59e0b',
                    dangerColor: '#ef4444',
                    backgroundColor: 'rgba(248, 250, 252, 0.9)',
                    surfaceColor: 'rgba(255, 255, 255, 0.7)',
                    textPrimary: '#1f2937',
                    textSecondary: '#6b7280',
                    borderColor: 'rgba(229, 231, 235, 0.4)',
                    shadowColor: 'rgba(0, 0, 0, 0.08)'
                }
            },
            dark: {
                name: 'Oscuro',
                icon: this.getIcon('moon'),
                cssClass: 'dark-theme',
                properties: {
                    primaryColor: '#60a5fa',
                    secondaryColor: '#22d3ee',
                    accentColor: '#34d399',
                    warningColor: '#fbbf24',
                    dangerColor: '#f87171',
                    backgroundColor: 'rgba(17, 24, 39, 0.9)',
                    surfaceColor: 'rgba(31, 41, 55, 0.8)',
                    textPrimary: '#f9fafb',
                    textSecondary: '#d1d5db',
                    borderColor: 'rgba(75, 85, 99, 0.4)',
                    shadowColor: 'rgba(0, 0, 0, 0.25)'
                }
            }
        };
        
        this.observers = [];
        this.storageKey = 'app-theme-preference';
        this.init();
    }

    // Inicializar el gestor de temas
    init() {
        this.loadThemePreference();
        this.applyTheme();
        this.setupSystemPreferenceListener();
    }

    // Obtener iconos SVG
    getIcon(type) {
        const icons = {
            sun: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/>
                <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2"/>
                <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2"/>
                <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2"/>
                <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2"/>
            </svg>`,
            moon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" fill="currentColor"/>
            </svg>`,
            auto: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/>
                <path d="M12 2v2" stroke="currentColor" stroke-width="2"/>
                <path d="M12 20v2" stroke="currentColor" stroke-width="2"/>
                <path d="m4.93 4.93 1.41 1.41" stroke="currentColor" stroke-width="2"/>
                <path d="m17.66 17.66 1.41 1.41" stroke="currentColor" stroke-width="2"/>
                <path d="M2 12h2" stroke="currentColor" stroke-width="2"/>
                <path d="M20 12h2" stroke="currentColor" stroke-width="2"/>
                <path d="m6.34 17.66-1.41 1.41" stroke="currentColor" stroke-width="2"/>
                <path d="m19.07 4.93-1.41 1.41" stroke="currentColor" stroke-width="2"/>
            </svg>`
        };
        return icons[type] || '';
    }

    // Obtener el tema actual
    getCurrentTheme() {
        return this.themes[this.currentTheme];
    }

    // Obtener todas las configuraciones de tema disponibles
    getAvailableThemes() {
        return Object.keys(this.themes).map(key => ({
            key,
            ...this.themes[key]
        }));
    }

    // Cambiar tema
    setTheme(themeKey) {
        if (!this.themes[themeKey]) {
            console.warn(`Tema '${themeKey}' no encontrado`);
            return false;
        }

        const oldTheme = this.currentTheme;
        this.currentTheme = themeKey;
        this.applyTheme();
        this.saveThemePreference();
        this.notifyObservers(oldTheme, themeKey);
        return true;
    }

    // Alternar entre temas (principalmente claro/oscuro)
    toggleTheme() {
        const newTheme = this.currentTheme === 'default' ? 'dark' : 'default';
        return this.setTheme(newTheme);
    }

    // Aplicar tema al DOM
    applyTheme() {
        const theme = this.getCurrentTheme();
        const body = document.body;

        // Remover todas las clases de tema existentes
        Object.values(this.themes).forEach(t => {
            if (t.cssClass) {
                body.classList.remove(t.cssClass);
            }
        });

        // Aplicar clase del tema actual
        if (theme.cssClass) {
            body.classList.add(theme.cssClass);
        }

        // Aplicar propiedades CSS personalizadas (opcional, ya que las variables CSS manejan esto)
        this.updateCSSProperties(theme.properties);

        // Actualizar elementos de interfaz específicos
        this.updateThemeButtons();
        
        // Emitir evento personalizado
        this.dispatchThemeChangeEvent();
    }

    // Actualizar propiedades CSS del documento (backup por si se necesita)
    updateCSSProperties(properties) {
        const root = document.documentElement;
        Object.entries(properties).forEach(([key, value]) => {
            root.style.setProperty(`--theme-${this.camelToKebab(key)}`, value);
        });
    }

    // Convertir camelCase a kebab-case
    camelToKebab(str) {
        return str.replace(/([A-Z])/g, '-$1').toLowerCase();
    }

    // Actualizar todos los botones de tema en la página
    updateThemeButtons() {
        const buttons = document.querySelectorAll('[data-theme-toggle]');
        buttons.forEach(button => this.updateThemeButton(button));
    }

    // Actualizar un botón específico de tema
    updateThemeButton(button) {
        if (!button) return;

        const theme = this.getCurrentTheme();
        const nextTheme = this.currentTheme === 'default' ? this.themes.dark : this.themes.default;
        
        const iconElement = button.querySelector('.theme-icon');
        const textElement = button.querySelector('.theme-text');

        if (iconElement) {
            iconElement.innerHTML = nextTheme.icon;
        }

        if (textElement) {
            textElement.textContent = `Modo ${nextTheme.name}`;
        }

        // Si el botón no tiene elementos específicos, actualizar todo el contenido
        if (!iconElement && !textElement) {
            button.innerHTML = `${nextTheme.icon} <span>Modo ${nextTheme.name}</span>`;
        }

        // Actualizar atributos de accesibilidad
        button.setAttribute('aria-label', `Cambiar a tema ${nextTheme.name.toLowerCase()}`);
        button.setAttribute('title', `Cambiar a tema ${nextTheme.name.toLowerCase()}`);
    }

    // Crear botón de tema con HTML
    createThemeButton(options = {}) {
        const {
            className = 'theme-toggle-btn',
            showText = true,
            position = 'header' // 'header', 'floating', 'inline'
        } = options;

        const theme = this.getCurrentTheme();
        const nextTheme = this.currentTheme === 'default' ? this.themes.dark : this.themes.default;

        const button = document.createElement('button');
        button.className = className;
        button.setAttribute('data-theme-toggle', 'true');
        button.setAttribute('aria-label', `Cambiar a tema ${nextTheme.name.toLowerCase()}`);
        button.setAttribute('title', `Cambiar a tema ${nextTheme.name.toLowerCase()}`);
        
        const iconSpan = document.createElement('span');
        iconSpan.className = 'theme-icon';
        iconSpan.innerHTML = nextTheme.icon;

        button.appendChild(iconSpan);

        if (showText) {
            const textSpan = document.createElement('span');
            textSpan.className = 'theme-text';
            textSpan.textContent = `Modo ${nextTheme.name}`;
            button.appendChild(textSpan);
        }

        // Agregar event listener
        button.addEventListener('click', () => this.toggleTheme());

        return button;
    }

    // Escuchar cambios en las preferencias del sistema
    setupSystemPreferenceListener() {
        if (window.matchMedia) {
            const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            darkModeQuery.addEventListener('change', (e) => {
                // Solo aplicar automáticamente si no hay preferencia guardada
                const saved = this.getStoredPreference();
                if (!saved) {
                    const systemTheme = e.matches ? 'dark' : 'default';
                    this.setTheme(systemTheme);
                }
            });
        }
    }

    // Detectar preferencia del sistema
    getSystemPreference() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'default';
    }

    // Guardar preferencia de tema
    saveThemePreference() {
        try {
            localStorage.setItem(this.storageKey, this.currentTheme);
        } catch (error) {
            console.warn('No se pudo guardar la preferencia de tema:', error);
        }
    }

    // Cargar preferencia de tema
    loadThemePreference() {
        try {
            const saved = this.getStoredPreference();
            if (saved && this.themes[saved]) {
                this.currentTheme = saved;
            } else {
                // Si no hay preferencia guardada, usar la del sistema
                this.currentTheme = this.getSystemPreference();
            }
        } catch (error) {
            console.warn('No se pudo cargar la preferencia de tema:', error);
            this.currentTheme = 'default';
        }
    }

    // Obtener preferencia almacenada
    getStoredPreference() {
        try {
            return localStorage.getItem(this.storageKey);
        } catch (error) {
            return null;
        }
    }

    // Limpiar preferencia guardada
    clearThemePreference() {
        try {
            localStorage.removeItem(this.storageKey);
            this.currentTheme = this.getSystemPreference();
            this.applyTheme();
        } catch (error) {
            console.warn('No se pudo limpiar la preferencia de tema:', error);
        }
    }

    // Sistema de observadores para cambios de tema
    subscribe(callback) {
        this.observers.push(callback);
        return () => {
            this.observers = this.observers.filter(obs => obs !== callback);
        };
    }

    // Notificar a los observadores
    notifyObservers(oldTheme, newTheme) {
        this.observers.forEach(callback => {
            try {
                callback(newTheme, oldTheme);
            } catch (error) {
                console.warn('Error en observador de tema:', error);
            }
        });
    }

    // Emitir evento personalizado de cambio de tema
    dispatchThemeChangeEvent() {
        const event = new CustomEvent('themeChange', {
            detail: {
                theme: this.currentTheme,
                themeData: this.getCurrentTheme()
            }
        });
        document.dispatchEvent(event);
    }

    // Métodos de utilidad para CSS
    isDarkTheme() {
        return this.currentTheme === 'dark';
    }

    getThemeProperty(property) {
        return this.getCurrentTheme().properties[property];
    }

    // Integración con Chart.js
    getChartThemeConfig() {
        const theme = this.getCurrentTheme();
        return {
            backgroundColor: theme.properties.backgroundColor,
            textColor: theme.properties.textPrimary,
            gridColor: theme.properties.borderColor,
            tooltipBackgroundColor: theme.properties.surfaceColor,
            tooltipTextColor: theme.properties.textPrimary
        };
    }

    // Destructor para limpiar event listeners
    destroy() {
        this.observers = [];
        // Aquí podrías limpiar otros event listeners si fuera necesario
    }
}

// Crear instancia global
const themeManager = new ThemeManager();

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeManager;
}

// Hacer disponible globalmente
window.ThemeManager = ThemeManager;
window.themeManager = themeManager;