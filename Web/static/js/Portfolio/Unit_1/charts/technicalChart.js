// js/charts/technicalChart.js - Análisis técnico y de experiencia

const TechnicalChart = {
    // Configuración de la sección
    sectionConfig: {
        id: 'technical-section',
        title: '4. 🔧 Análisis Técnico y de Experiencia',
        csv1Columns: 'device_type, quality_level, watch_duration_minutes, completion_percentage',
        csv2Columns: 'user_id, country (para correlacionar con infraestructura)'
    },

    // Datos de ejemplo
    data: {
        labels: ['Mobile', 'Desktop', 'TV', 'Tablet'],
        duration: [22, 45, 62, 35],
        completion: [65, 78, 85, 72]
    },

    // Crear la sección
    createSection: function() {
        const section = TabManager.createSection(this.sectionConfig);
        
        // Crear contenedor de gráfica simple
        const chartContainer = document.createElement('div');
        chartContainer.className = 'chart-container';
        
        const canvas = document.createElement('canvas');
        canvas.id = 'technicalChart';
        chartContainer.appendChild(canvas);
        
        const description = document.createElement('div');
        description.className = 'chart-description';
        description.innerHTML = '📝 Matriz de correlación entre factores técnicos (dispositivo, calidad) y engagement, útil para optimizar la experiencia técnica.';
        
        section.appendChild(chartContainer);
        section.appendChild(description);
        
        return section;
    },

    // Inicializar la gráfica
    initializeChart: function() {
        const ctx = document.getElementById('technicalChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: this.data.labels,
                datasets: [
                    {
                        label: 'Duración Promedio (min)',
                        data: this.data.duration,
                        borderColor: ChartConfig.colors.primaryBorder,
                        backgroundColor: ChartConfig.colors.primary.replace('0.8', '0.2')
                    },
                    {
                        label: 'Completion Rate (%)',
                        data: this.data.completion,
                        borderColor: 'rgba(255, 159, 64, 1)',
                        backgroundColor: 'rgba(255, 159, 64, 0.2)'
                    }
                ]
            },
            options: ChartConfig.getOptionsFor('radar')
        });
    }
}