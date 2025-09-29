// js/charts/WorkModalitiesChart.js - Work Modalities Chart with API Integration

class WorkModalitiesChart {
    constructor(canvasId, data = null) {
        console.log(`🔄 Creating WorkModalitiesChart with canvas: ${canvasId}`);
        
        this.canvasId = canvasId;
        this.data = data;
        this.chart = null;
        this.apiEndpoint = 'https://upy-homeworks.xpert-ia.com.mx/visualization-tools/api/unit-1/project';
        
        // Only 3 main modalities
        this.selectedLines = new Set(['hybrid', 'onsite', 'remote']);
        
        this.aiBoomYear = 2022;
        this.aiBoomLineConfig = {
            color: '#dc2626',
            width: 2,
            dash: [5, 5],
            label: 'AI Boom'
        };
        
        this.canvas = this.getCanvasWithRetry(canvasId, 3);
        
        if (!this.canvas) {
            console.error(`❌ Canvas not found after retries: ${canvasId}`);
            return;
        }
        
        console.log(`✅ Canvas found: ${canvasId}`);
        this.init();
    }

    getCanvasWithRetry(canvasId, maxRetries = 3) {
        for (let i = 0; i < maxRetries; i++) {
            const canvas = document.getElementById(canvasId);
            if (canvas) {
                return canvas;
            }
            console.warn(`⚠️ Attempt ${i + 1}/${maxRetries}: Canvas ${canvasId} not found`);
        }
        return null;
    }

    async init() {
        console.log('🔄 Initializing WorkModalitiesChart...');
        
        try {
            this.createControls();
            
            if (this.data) {
                this.processData(this.data);
            } else {
                await this.fetchData();
            }
            
            this.createChart();
            this.setupEventListeners();
            
            console.log('✅ WorkModalitiesChart initialized correctly');
        } catch (error) {
            console.error('❌ Error initializing WorkModalitiesChart:', error);
        }
    }

    // Fetch data from API
    async fetchData() {
        try {
            console.log('Fetching work modalities data from API...');
            
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
            
            const modalitiesData = apiData.info?.workModalities;
            
            if (!modalitiesData) {
                console.warn('Work modalities data not found in API response, using defaults');
                this.loadSampleData();
                return false;
            }

            this.processedData = {
                labels: modalitiesData.labels || [],
                datasets: modalitiesData.datasets || []
            };

            console.log('Work modalities data fetched successfully:', this.processedData);
            return true;

        } catch (error) {
            console.error('Error fetching work modalities data:', error);
            this.loadSampleData();
            return false;
        }
    }

    createControls() {
        if (!this.canvas) {
            console.error('❌ Canvas not available to create controls');
            return;
        }
        
        const container = this.canvas.parentElement;
        if (!container) {
            console.error('❌ Parent container of canvas not found');
            return;
        }
        
        const existingControls = container.querySelector('.chart-controls');
        if (existingControls) {
            existingControls.remove();
        }
        
        // Only 3 controls: Hybrid, On-site, Remote
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'chart-controls';
        controlsContainer.innerHTML = `
            <div class="modalities-controls">
                <h4>Select Modalities:</h4>
                <div class="modality-toggles">
                    <label class="modality-toggle" data-modality="hybrid">
                        <input type="checkbox" value="hybrid" checked>
                        <span class="toggle-label">
                            <i class="ti ti-building-bridge"></i> Hybrid
                        </span>
                    </label>
                    <label class="modality-toggle" data-modality="onsite">
                        <input type="checkbox" value="onsite" checked>
                        <span class="toggle-label">
                            <i class="ti ti-building-skyscraper"></i> On-site
                        </span>
                    </label>
                    <label class="modality-toggle" data-modality="remote">
                        <input type="checkbox" value="remote" checked>
                        <span class="toggle-label">
                            <i class="ti ti-home"></i> Remote
                        </span>
                    </label>
                </div>
                <div class="ai-boom-info">
                    <small>
                        <i class="ti ti-info-circle"></i>
                        The red dotted line marks year 2022 (AI Boom).
                    </small>
                </div>
            </div>
        `;
        
        container.insertBefore(controlsContainer, container.firstChild);
    }

    loadSampleData() {
        console.log('📊 Loading sample data...');
        
        // ONLY 3 datasets: hybrid, on-site, remote
        this.processedData = {
            labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
            datasets: [
                {
                    id: 'hybrid',
                    label: 'Hybrid',
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
                    id: 'onsite',
                    label: 'On-site',
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
                    id: 'remote',
                    label: 'Remote',
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
        
        console.log('✅ Data loaded:', this.processedData);
    }

    processData(rawData) {
        console.log('📊 Processing real data for work modalities...');
        this.loadSampleData();
    }

    createChart() {
        if (!this.canvas) {
            console.error('❌ Canvas not available to create chart');
            return;
        }

        if (typeof Chart === 'undefined') {
            console.error('❌ Chart.js is not available');
            return;
        }

        console.log('📊 Creating modalities chart...');

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
                        text: 'Work Modalities Evolution (2020-2025)',
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
                                return `${isAIBoomYear ? '🚀 ' : ''}Year ${year}${isAIBoomYear ? ' - AI Boom' : ''}`;
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
                            text: 'Year',
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
                            text: 'Percentage (%)',
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
            console.log('✅ Chart created successfully');
        } catch (error) {
            console.error('❌ Error creating chart:', error);
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
            console.warn('⚠️ No processed data available');
            return [];
        }
        
        const visible = this.processedData.datasets.filter(dataset => 
            this.selectedLines.has(dataset.id)
        );
        
        console.log(`📊 Visible datasets: ${visible.length}`, visible.map(d => d.label));
        return visible;
    }

    setupEventListeners() {
        const toggles = document.querySelectorAll('.modality-toggle input[type="checkbox"]');
        
        console.log(`🔗 Setting up ${toggles.length} event listeners`);
        
        toggles.forEach(toggle => {
            toggle.addEventListener('change', (e) => {
                const modalityId = e.target.value;
                
                console.log(`🔄 Toggle changed: ${modalityId} -> ${e.target.checked}`);
                
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
            console.warn('⚠️ No chart to update');
            return;
        }
        
        console.log('🔄 Updating chart...');
        
        try {
            this.chart.data.datasets = this.getVisibleDatasets();
            this.chart.update('active');
            console.log('✅ Chart updated');
        } catch (error) {
            console.error('❌ Error updating chart:', error);
        }
    }

    // Refresh data from API
    async refreshData() {
        console.log('Refreshing work modalities data...');
        
        const success = await this.fetchData();
        
        if (success && this.chart) {
            this.chart.data.labels = this.processedData.labels;
            this.chart.data.datasets = this.getVisibleDatasets();
            this.chart.update();
            console.log('Work modalities data refreshed successfully');
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
        
        console.log('🎨 Updating chart theme...');
        
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
        console.log('🗑️ Destroying WorkModalitiesChart...');
        
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