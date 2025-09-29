// js/charts/WorkModalitiesChart.js - Corregido sin ChatGPT
class WorkModalitiesChart {
    constructor(canvasId, data = null) {
        console.log(`🔄 Creando WorkModalitiesChart con canvas: ${canvasId}`);
        
        this.canvasId = canvasId;
        this.data = data;
        this.chart = null;
        // Solo las 3 modalidades principales
        this.selectedLines = new Set(['hybrid', 'presencial', 'remoto']);
        
        this.aiBoomYear = 2022;
        this.aiBoomLineConfig = {
            color: '#dc2626',
            width: 2,
            dash: [5, 5],
            label: 'Boom de la IA'
        };
        
        this.canvas = this.getCanvasWithRetry(canvasId, 3);
        
        if (!this.canvas) {
            console.error(`❌ Canvas no encontrado después de reintentos: ${canvasId}`);
            return;
        }
        
        console.log(`✅ Canvas encontrado: ${canvasId}`);
        this.init();
    }

    getCanvasWithRetry(canvasId, maxRetries = 3) {
        for (let i = 0; i < maxRetries; i++) {
            const canvas = document.getElementById(canvasId);
            if (canvas) {
                return canvas;
            }
            console.warn(`⚠️ Intento ${i + 1}/${maxRetries}: Canvas ${canvasId} no encontrado`);
        }
        return null;
    }

    init() {
        console.log('🔄 Inicializando WorkModalitiesChart...');
        
        try {
            this.createControls();
            
            if (this.data) {
                this.processData(this.data);
            } else {
                this.loadSampleData();
            }
            
            this.createChart();
            this.setupEventListeners();
            
            console.log('✅ WorkModalitiesChart inicializada correctamente');
        } catch (error) {
            console.error('❌ Error inicializando WorkModalitiesChart:', error);
        }
    }

    createControls() {
        if (!this.canvas) {
            console.error('❌ Canvas no disponible para crear controles');
            return;
        }
        
        const container = this.canvas.parentElement;
        if (!container) {
            console.error('❌ Contenedor padre del canvas no encontrado');
            return;
        }
        
        const existingControls = container.querySelector('.chart-controls');
        if (existingControls) {
            existingControls.remove();
        }
        
        // Solo 3 controles: Híbrido, Presencial, Remoto
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'chart-controls';
        controlsContainer.innerHTML = `
            <div class="modalities-controls">
                <h4>Seleccionar Modalidades:</h4>
                <div class="modality-toggles">
                    <label class="modality-toggle" data-modality="hybrid">
                        <input type="checkbox" value="hybrid" checked>
                        <span class="toggle-label">
                            <i class="ti ti-building-bridge"></i> Híbrido
                        </span>
                    </label>
                    <label class="modality-toggle" data-modality="presencial">
                        <input type="checkbox" value="presencial" checked>
                        <span class="toggle-label">
                            <i class="ti ti-building-skyscraper"></i> Presencial
                        </span>
                    </label>
                    <label class="modality-toggle" data-modality="remoto">
                        <input type="checkbox" value="remoto" checked>
                        <span class="toggle-label">
                            <i class="ti ti-home"></i> Remoto
                        </span>
                    </label>
                </div>
                <div class="ai-boom-info">
                    <small>
                        <i class="ti ti-info-circle"></i>
                        La línea roja punteada marca el año 2022 (Boom de IA).
                    </small>
                </div>
            </div>
        `;
        
        container.insertBefore(controlsContainer, container.firstChild);
    }

    loadSampleData() {
        console.log('📊 Cargando datos de ejemplo...');
        
        // SOLO 3 datasets: híbrido, presencial, remoto (sin ChatGPT)
        this.processedData = {
            labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
            datasets: [
                {
                    id: 'hybrid',
                    label: 'Híbrido',
                    data: [35, 32, 30, 45, 65, 85],
                    borderColor: '#2ecc71',
                    backgroundColor: 'rgba(46, 204, 113, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    pointBackgroundColor: '#2ecc71',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    fill: false
                },
                {
                    id: 'presencial',
                    label: 'Presencial',
                    data: [35, 30, 15, 8, 5, 3],
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    pointBackgroundColor: '#e74c3c',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    fill: false
                },
                {
                    id: 'remoto',
                    label: 'Remoto',
                    data: [20, 25, 60, 30, 18, 18],
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    pointBackgroundColor: '#3498db',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    fill: false
                }
            ]
        };
        
        console.log('✅ Datos cargados:', this.processedData);
    }

    processData(rawData) {
        console.log('📊 Procesando datos reales para modalidades de trabajo...');
        this.loadSampleData();
    }

    createChart() {
        if (!this.canvas) {
            console.error('❌ Canvas no disponible para crear gráfica');
            return;
        }

        if (typeof Chart === 'undefined') {
            console.error('❌ Chart.js no está disponible');
            return;
        }

        console.log('📊 Creando gráfica de modalidades...');

        const config = {
            type: 'line',
            data: {
                labels: this.processedData.labels,
                datasets: this.getVisibleDatasets()
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        top: 40,
                        right: 30,
                        bottom: 20,
                        left: 20
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Evolución de Modalidades de Trabajo (2020-2025)',
                        font: {
                            size: 18,
                            weight: 'bold'
                        },
                        padding: {
                            top: 10,
                            bottom: 20
                        },
                        color: this.getThemeColor('text')
                    },
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            usePointStyle: true,
                            pointStyle: 'circle',
                            font: {
                                size: 12,
                                weight: '500'
                            },
                            color: this.getThemeColor('text')
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(255, 255, 255, 0.98)',
                        titleColor: '#1f2937',
                        bodyColor: '#374151',
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                        borderWidth: 1,
                        cornerRadius: 12,
                        padding: 16,
                        displayColors: true,
                        usePointStyle: true,
                        callbacks: {
                            title: (context) => {
                                const year = context[0].label;
                                const isAIBoomYear = year === this.aiBoomYear.toString();
                                return `${isAIBoomYear ? '🚀 ' : ''}Año ${year}${isAIBoomYear ? ' - Boom de la IA' : ''}`;
                            },
                            label: (context) => {
                                const value = context.parsed.y;
                                const dataset = context.dataset;
                                return `${dataset.label}: ${value}%`;
                            },
                            footer: (tooltipItems) => {
                                const total = tooltipItems.reduce((sum, item) => sum + item.parsed.y, 0);
                                return `Total: ${total}%`;
                            }
                        },
                        filter: function(tooltipItem) {
                            return tooltipItem.parsed.y > 0;
                        }
                    }
                },
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Año',
                            font: {
                                size: 14,
                                weight: 'bold'
                            },
                            padding: {
                                top: 10
                            },
                            color: this.getThemeColor('text')
                        },
                        grid: {
                            color: this.getThemeColor('grid'),
                            drawOnChartArea: true,
                            drawTicks: true
                        },
                        ticks: {
                            color: this.getThemeColor('text'),
                            font: {
                                size: 12,
                                weight: '500'
                            },
                            padding: 8
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Porcentaje (%)',
                            font: {
                                size: 14,
                                weight: 'bold'
                            },
                            padding: {
                                bottom: 10
                            },
                            color: this.getThemeColor('text')
                        },
                        min: 0,
                        max: 100,
                        grid: {
                            color: this.getThemeColor('grid'),
                            drawOnChartArea: true,
                            drawTicks: true
                        },
                        ticks: {
                            color: this.getThemeColor('text'),
                            font: {
                                size: 11
                            },
                            padding: 8,
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeOutCubic'
                },
                elements: {
                    line: {
                        tension: 0.4
                    },
                    point: {
                        radius: 6,
                        hoverRadius: 8,
                        borderWidth: 2
                    }
                }
            },
            plugins: [{
                id: 'aiReferenceLinePlugin',
                beforeDatasetsDraw: (chart) => {
                    this.drawAIBoomReferenceLine(chart);
                }
            }]
        };

        try {
            this.chart = new Chart(this.canvas, config);
            console.log('✅ Gráfica creada exitosamente');
        } catch (error) {
            console.error('❌ Error creando gráfica:', error);
        }
    }

    drawAIBoomReferenceLine(chart) {
        const { ctx, chartArea } = chart;
        if (!chartArea) return;

        const { top, bottom } = chartArea;
        
        const labels = chart.data.labels;
        const yearIndex = labels.indexOf(this.aiBoomYear.toString());
        
        if (yearIndex === -1) return;

        const xScale = chart.scales.x;
        const xPos = xScale.getPixelForValue(yearIndex);

        ctx.save();
        ctx.strokeStyle = this.aiBoomLineConfig.color;
        ctx.lineWidth = this.aiBoomLineConfig.width;
        ctx.setLineDash(this.aiBoomLineConfig.dash);
        ctx.globalAlpha = 0.8;

        ctx.beginPath();
        ctx.moveTo(xPos, top);
        ctx.lineTo(xPos, bottom);
        ctx.stroke();

        ctx.setLineDash([]);
        ctx.fillStyle = this.aiBoomLineConfig.color;
        ctx.font = 'bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(this.aiBoomLineConfig.label, xPos, top - 15);

        ctx.restore();
    }

    getVisibleDatasets() {
        if (!this.processedData || !this.processedData.datasets) {
            console.warn('⚠️ No hay datos procesados disponibles');
            return [];
        }
        
        // Solo las modalidades seleccionadas (NO ChatGPT)
        const visible = this.processedData.datasets.filter(dataset => 
            this.selectedLines.has(dataset.id)
        );
        
        console.log(`📊 Datasets visibles: ${visible.length}`, visible.map(d => d.label));
        return visible;
    }

    setupEventListeners() {
        const toggles = document.querySelectorAll('.modality-toggle input[type="checkbox"]');
        
        console.log(`🔗 Configurando ${toggles.length} event listeners`);
        
        toggles.forEach(toggle => {
            toggle.addEventListener('change', (e) => {
                const modalityId = e.target.value;
                
                console.log(`🔄 Toggle cambiado: ${modalityId} -> ${e.target.checked}`);
                
                if (e.target.checked) {
                    this.selectedLines.add(modalityId);
                } else {
                    this.selectedLines.delete(modalityId);
                }
                
                this.updateChart();
            });
        });
    }

    updateChart() {
        if (!this.chart) {
            console.warn('⚠️ No hay gráfica para actualizar');
            return;
        }
        
        console.log('🔄 Actualizando gráfica...');
        
        try {
            this.chart.data.datasets = this.getVisibleDatasets();
            this.chart.update('active');
            console.log('✅ Gráfica actualizada');
        } catch (error) {
            console.error('❌ Error actualizando gráfica:', error);
        }
    }

    getThemeColor(type) {
        const isDark = document.body.classList.contains('dark-theme');
        
        const colors = {
            text: isDark ? '#f9fafb' : '#1f2937',
            grid: isDark ? 'rgba(75, 85, 99, 0.4)' : 'rgba(156, 163, 175, 0.2)',
            background: isDark ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)'
        };
        
        return colors[type] || colors.text;
    }

    updateTheme() {
        if (!this.chart) return;
        
        console.log('🎨 Actualizando tema de gráfica...');
        
        const textColor = this.getThemeColor('text');
        const gridColor = this.getThemeColor('grid');
        const isDark = document.body.classList.contains('dark-theme');
        
        this.chart.options.plugins.title.color = textColor;
        this.chart.options.plugins.legend.labels.color = textColor;
        this.chart.options.scales.x.title.color = textColor;
        this.chart.options.scales.x.ticks.color = textColor;
        this.chart.options.scales.x.grid.color = gridColor;
        this.chart.options.scales.y.title.color = textColor;
        this.chart.options.scales.y.ticks.color = gridColor;
        this.chart.options.scales.y.grid.color = gridColor;
        
        this.aiBoomLineConfig.color = isDark ? '#ef4444' : '#dc2626';
        
        this.chart.update();
    }

    destroy() {
        console.log('🗑️ Destruyendo WorkModalitiesChart...');
        
        const toggles = document.querySelectorAll('.modality-toggle input[type="checkbox"]');
        toggles.forEach(toggle => {
            const newToggle = toggle.cloneNode(true);
            toggle.parentNode.replaceChild(newToggle, toggle);
        });
        
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
        
        const controls = document.querySelector('.chart-controls');
        if (controls) {
            controls.remove();
        }
    }
}

window.WorkModalitiesChart = WorkModalitiesChart;