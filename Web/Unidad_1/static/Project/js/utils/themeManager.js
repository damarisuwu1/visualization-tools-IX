// js/utils/themeManager.js - Modular theme manager

class ThemeManager {
    constructor() {
        this.currentTheme = 'default';
        this.themes = {
            default: {
                name: 'Light',
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
                name: 'Dark',
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
        this.storageKey = 'salary-dashboard-theme';
        this.init();
    }

    // Initialize theme manager
    init() {
        this.loadThemePreference();
        this.applyTheme();
        this.setupSystemPreferenceListener();
    }

    // Get SVG icons
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
            </svg>`
        };
        return icons[type] || '';
    }

    // Get current theme
    getCurrentTheme() {
        return this.themes[this.currentTheme];
    }

    // Change theme
    setTheme(themeKey) {
        if (!this.themes[themeKey]) {
            console.warn(`Theme '${themeKey}' not found`);
            return false;
        }

        const oldTheme = this.currentTheme;
        this.currentTheme = themeKey;
        this.applyTheme();
        this.saveThemePreference();
        this.notifyObservers(oldTheme, themeKey);
        return true;
    }

    // Toggle between themes
    toggleTheme() {
        const newTheme = this.currentTheme === 'default' ? 'dark' : 'default';
        return this.setTheme(newTheme);
    }

    // Apply theme to DOM
    applyTheme() {
        const theme = this.getCurrentTheme();
        const body = document.body;

        // Remove all existing theme classes
        Object.values(this.themes).forEach(t => {
            if (t.cssClass) {
                body.classList.remove(t.cssClass);
            }
        });

        // Apply current theme class
        if (theme.cssClass) {
            body.classList.add(theme.cssClass);
        }

        // Update specific UI elements
        this.updateThemeButtons();
        
        // Dispatch custom event
        this.dispatchThemeChangeEvent();
    }

    // Update all theme buttons on the page
    updateThemeButtons() {
        const buttons = document.querySelectorAll('[data-theme-toggle]');
        buttons.forEach(button => this.updateThemeButton(button));
    }

    // Update a specific theme button
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
            textElement.textContent = `${nextTheme.name} Mode`;
        }

        // Update accessibility attributes
        button.setAttribute('aria-label', `Switch to ${nextTheme.name.toLowerCase()} theme`);
        button.setAttribute('title', `Switch to ${nextTheme.name.toLowerCase()} theme`);
    }

    // Listen for system preference changes
    setupSystemPreferenceListener() {
        if (window.matchMedia) {
            const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            darkModeQuery.addEventListener('change', (e) => {
                const saved = this.getStoredPreference();
                if (!saved) {
                    const systemTheme = e.matches ? 'dark' : 'default';
                    this.setTheme(systemTheme);
                }
            });
        }
    }

    // Detect system preference
    getSystemPreference() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'default';
    }

    // Save theme preference
    saveThemePreference() {
        try {
            localStorage.setItem(this.storageKey, this.currentTheme);
        } catch (error) {
            console.warn('Could not save theme preference:', error);
        }
    }

    // Load theme preference
    loadThemePreference() {
        try {
            const saved = this.getStoredPreference();
            if (saved && this.themes[saved]) {
                this.currentTheme = saved;
            } else {
                this.currentTheme = this.getSystemPreference();
            }
        } catch (error) {
            console.warn('Could not load theme preference:', error);
            this.currentTheme = 'default';
        }
    }

    // Get stored preference
    getStoredPreference() {
        try {
            return localStorage.getItem(this.storageKey);
        } catch (error) {
            return null;
        }
    }

    // Observer system for theme changes
    subscribe(callback) {
        this.observers.push(callback);
        return () => {
            this.observers = this.observers.filter(obs => obs !== callback);
        };
    }

    // Notify observers
    notifyObservers(oldTheme, newTheme) {
        this.observers.forEach(callback => {
            try {
                callback(newTheme, oldTheme);
            } catch (error) {
                console.warn('Error in theme observer:', error);
            }
        });
    }

    // Dispatch custom theme change event
    dispatchThemeChangeEvent() {
        const event = new CustomEvent('themeChange', {
            detail: {
                theme: this.currentTheme,
                themeData: this.getCurrentTheme()
            }
        });
        document.dispatchEvent(event);
    }

    // Utility methods
    isDarkTheme() {
        return this.currentTheme === 'dark';
    }

    getThemeProperty(property) {
        return this.getCurrentTheme().properties[property];
    }

    destroy() {
        this.observers = [];
    }
}

// Create global instance
const themeManager = new ThemeManager();

// Event listener for theme button
document.addEventListener('DOMContentLoaded', () => {
    const themeButton = document.querySelector('[data-theme-toggle]');
    if (themeButton) {
        themeButton.addEventListener('click', () => {
            themeManager.toggleTheme();
        });
    }
});

// Make available globally
window.ThemeManager = ThemeManager;
window.themeManager = themeManager;