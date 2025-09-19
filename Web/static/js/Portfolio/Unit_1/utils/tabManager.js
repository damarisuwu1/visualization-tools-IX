// js/utils/tabManager.js - Gestor de pestañas y navegación

const TabManager = {
    // Función principal para cambiar tabs
    showTab: function(section, tabId) {
        // Ocultar todos los tabs de esa sección
        const tabs = document.querySelectorAll(`[id^="${section}-tab"]`);
        tabs.forEach(tab => {
            if (tab) tab.classList.remove('active');
        });
        
        // Mostrar el tab seleccionado
        const selectedTab = document.getElementById(`${section}-${tabId}`);
        if (selectedTab) {
            selectedTab.classList.add('active');
        }
        
        // Actualizar botones - buscar el botón que activó el evento
        const parentSection = event.target.closest('.analysis-section');
        if (parentSection) {
            const buttons = parentSection.querySelectorAll('.nav-tab');
            buttons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
        }
    },

    // Inicializar tabs para una sección
    initializeTabs: function(sectionId, tabConfigs) {
        const section = document.getElementById(sectionId);
        if (!section) return;

        // Crear estructura de tabs
        const tabsContainer = document.createElement('div');
        tabsContainer.className = 'nav-tabs';

        const contentContainer = document.createElement('div');
        contentContainer.className = 'tabs-content';

        tabConfigs.forEach((config, index) => {
            // Crear botón del tab
            const tabButton = document.createElement('button');
            tabButton.className = `nav-tab ${index === 0 ? 'active' : ''}`;
            tabButton.textContent = config.title;
            tabButton.onclick = () => this.showTab(sectionId, `tab${index + 1}`);
            tabsContainer.appendChild(tabButton);

            // Crear contenido del tab
            const tabContent = document.createElement('div');
            tabContent.id = `${sectionId}-tab${index + 1}`;
            tabContent.className = `tab-content ${index === 0 ? 'active' : ''}`;
            
            const chartContainer = document.createElement('div');
            chartContainer.className = 'chart-container';
            
            const canvas = document.createElement('canvas');
            canvas.id = config.canvasId;
            chartContainer.appendChild(canvas);
            
            const description = document.createElement('div');
            description.className = 'chart-description';
            description.innerHTML = config.description;
            
            tabContent.appendChild(chartContainer);
            tabContent.appendChild(description);
            contentContainer.appendChild(tabContent);
        });

        section.appendChild(tabsContainer);
        section.appendChild(contentContainer);
    },

    // Helper para crear secciones dinámicamente
    createSection: function(config) {
        const section = document.createElement('div');
        section.className = 'analysis-section';
        section.id = config.id;

        const title = document.createElement('h2');
        title.className = 'analysis-title';
        title.innerHTML = config.title;

        const columnsNeeded = document.createElement('div');
        columnsNeeded.className = 'columns-needed';
        columnsNeeded.innerHTML = `
            <div class="columns-title">Columnas Necesarias:</div>
            <div class="csv-columns">
                <span class="csv1">CSV1:</span> ${config.csv1Columns}
            </div>
            <div class="csv-columns">
                <span class="csv2">CSV2:</span> ${config.csv2Columns}
            </div>
        `;

        section.appendChild(title);
        section.appendChild(columnsNeeded);

        return section;
    }
};