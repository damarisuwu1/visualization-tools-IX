# 📊 WEB Visualization Microservice - Unit 2 Checkpoint 1

## 🎯 Checkpoint Objective

**Unit 2 Checkpoint 1** focuses on **Time Series Analysis Visualizations** using **D3.js**. This checkpoint implements interactive dashboards for analyzing temporal patterns, autocorrelation structures, and cross-correlation relationships in streaming engagement data and technology market trends.

## 📚 Theoretical Foundation

### Time Series Concepts Implemented

#### 1. **White Noise Analysis**
- Visualization of uncorrelated random variables
- ACF plots showing near-zero correlation for lags > 0
- Confidence band visualization (±2/√n)

#### 2. **Signal Plus Noise**
- Separation of deterministic signals from random noise
- Persistent autocorrelation patterns
- Sinusoidal pattern detection in user engagement

#### 3. **Autocorrelation Function (ACF)**
- Measures temporal dependence within single series
- Lag-based correlation visualization
- Statistical significance testing

#### 4. **Cross-Correlation Function (CCF)**
- Relationship analysis between two time series
- Lead/lag pattern detection
- Multi-series comparative analysis

#### 5. **Stationarity Assessment**
- Weak stationarity visualization (constant mean, lag-dependent covariance)
- Trend detection and removal
- Statistical testing for time-invariant properties

## 🏗 Microservice Architecture

```
Frontend (Flask) ←→ Time Series APIs ←→ Statistical Processing
     │                      │                      │
     │                Complex Analysis      Raw Temporal Data
 D3.js Interactive        (ACF/CCF)            Storage
 Time Series Viz      Python/statsmodels
```

## 🔌 API Integration

### 📡 Portfolio - Unit 2 Checkpoint 1

**API Endpoint**: `GET /api/unidad-2/portfolio/checkpoint1`

**Purpose**: User engagement time series analysis with ACF/CCF patterns

**API Response Structure**:

```json
{
    "status": "success",
    "info": {
        "timeSeriesEngagement": {
            "labels": ["2024-01", "2024-02", "2024-03", ...],
            "series": [
                {
                    "name": "Watch Time (hours)",
                    "data": [1245, 1389, 1502, ...],
                    "type": "signal_plus_noise",
                    "color": "#3b82f6"
                },
                {
                    "name": "User Sessions",
                    "data": [8932, 9214, 9856, ...],
                    "type": "autoregressive",
                    "color": "#10b981"
                }
            ]
        },
        "autocorrelation": {
            "watchTime": {
                "lags": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                "acf_values": [1.0, 0.85, 0.72, 0.58, 0.45, 0.32, 0.21, 0.12, 0.08, 0.04, 0.02],
                "confidence_upper": 0.089,
                "confidence_lower": -0.089,
                "interpretation": "Strong persistent correlation, signal plus noise model"
            },
            "userSessions": {
                "lags": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                "acf_values": [1.0, 0.78, 0.61, 0.46, 0.33, 0.22, 0.14, 0.08, 0.05, 0.02, 0.01],
                "confidence_upper": 0.089,
                "confidence_lower": -0.089,
                "interpretation": "Moderate autocorrelation, AR(2) process"
            }
        },
        "crossCorrelation": {
            "series1": "Watch Time",
            "series2": "User Sessions",
            "lags": [-10, -9, -8, ..., 0, ..., 8, 9, 10],
            "ccf_values": [0.02, 0.05, 0.08, ..., 0.65, ..., 0.12, 0.08, 0.04],
            "confidence_upper": 0.089,
            "confidence_lower": -0.089,
            "max_correlation_lag": 0,
            "interpretation": "Simultaneous correlation, no lead/lag relationship"
        },
        "stationarity": {
            "watchTime": {
                "is_stationary": false,
                "trend": "increasing",
                "mean": 1456.3,
                "variance": 234.5,
                "recommendation": "Apply differencing or detrending"
            },
            "userSessions": {
                "is_stationary": true,
                "trend": "none",
                "mean": 9245.7,
                "variance": 156.2,
                "recommendation": "Series ready for analysis"
            }
        },
        "whiteNoiseTest": {
            "watchTime": {
                "is_white_noise": false,
                "ljung_box_statistic": 156.34,
                "p_value": 0.0001,
                "conclusion": "Significant autocorrelation detected"
            },
            "userSessions": {
                "is_white_noise": false,
                "ljung_box_statistic": 89.23,
                "p_value": 0.0023,
                "conclusion": "Significant autocorrelation detected"
            }
        }
    }
}
```

**Generated Visualizations**:
1. **Multi-line Time Series Chart** - Raw temporal data with trend lines
2. **ACF Plot** - Autocorrelation visualization with confidence bands
3. **CCF Plot** - Cross-correlation between multiple series
4. **Stationarity Dashboard** - Mean/variance over time windows
5. **Decomposition View** - Trend, seasonal, and residual components

### 🏢 Project - Unit 2 Checkpoint 1

**API Endpoint**: `GET /api/unidad-2/project/checkpoint1`

**Purpose**: Technology salary and adoption time series analysis

**API Response Structure**:

```json
{
    "status": "success",
    "info": {
        "salaryTimeSeries": {
            "labels": ["2020-Q1", "2020-Q2", ..., "2025-Q4"],
            "series": [
                {
                    "name": "AI/ML Engineer Salary",
                    "data": [118000, 122000, 128000, ..., 175000],
                    "type": "trending_with_noise",
                    "color": "#ef4444"
                },
                {
                    "name": "Data Scientist Salary",
                    "data": [105000, 108000, 112000, ..., 148000],
                    "type": "autoregressive",
                    "color": "#3b82f6"
                }
            ]
        },
        "autocorrelation": {
            "aiMlSalary": {
                "lags": [0, 1, 2, 3, 4, 5, 6, 7, 8],
                "acf_values": [1.0, 0.92, 0.84, 0.76, 0.68, 0.59, 0.51, 0.43, 0.35],
                "confidence_upper": 0.082,
                "confidence_lower": -0.082,
                "interpretation": "Very strong trend component, non-stationary"
            },
            "dataScienceSalary": {
                "lags": [0, 1, 2, 3, 4, 5, 6, 7, 8],
                "acf_values": [1.0, 0.88, 0.77, 0.66, 0.55, 0.45, 0.36, 0.28, 0.21],
                "confidence_upper": 0.082,
                "confidence_lower": -0.082,
                "interpretation": "Strong trend, slower growth rate"
            }
        },
        "crossCorrelation": {
            "series1": "AI/ML Salary",
            "series2": "Data Science Salary",
            "lags": [-8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8],
            "ccf_values": [0.45, 0.52, 0.61, 0.72, 0.81, 0.89, 0.94, 0.98, 0.96, 0.92, 0.86, 0.78, 0.69, 0.59, 0.49, 0.39, 0.30],
            "confidence_upper": 0.082,
            "confidence_lower": -0.082,
            "max_correlation_lag": -1,
            "interpretation": "AI/ML salary leads Data Science by 1 quarter"
        },
        "jobPostingTimeSeries": {
            "labels": ["2020-01", "2020-02", ..., "2025-10"],
            "series": [
                {
                    "name": "Remote AI Jobs",
                    "data": [234, 267, 312, ..., 8945],
                    "type": "exponential_growth",
                    "color": "#10b981"
                },
                {
                    "name": "Hybrid Positions",
                    "data": [1456, 1523, 1689, ..., 12456],
                    "type": "linear_growth",
                    "color": "#f59e0b"
                }
            ]
        },
        "seasonality": {
            "aiJobs": {
                "seasonal_component": [0.12, 0.08, -0.05, -0.15, -0.08, 0.02, 0.05, 0.08, 0.15, 0.12, 0.05, -0.02],
                "seasonal_period": 12,
                "interpretation": "Hiring peaks in Q1 and Q4, drops in Q2-Q3"
            }
        },
        "technologyAdoption": {
            "labels": ["2020-W1", "2020-W2", ..., "2025-W42"],
            "series": [
                {
                    "name": "GPT API Usage",
                    "data": [0, 0, 0, ..., 125000, 132000, 145000],
                    "adoption_point": "2022-W48",
                    "growth_rate": "exponential"
                }
            ]
        }
    }
}
```

**Generated Visualizations**:
1. **Salary Evolution Timeline** - Multi-series temporal analysis
2. **ACF Comparative Dashboard** - Side-by-side autocorrelation plots
3. **CCF Lead/Lag Analysis** - Cross-correlation with lag interpretation
4. **Seasonal Decomposition** - STL decomposition visualization
5. **Technology Adoption Curves** - S-curve and exponential growth patterns
6. **Forecast Confidence Intervals** - ARIMA-based predictions

## 🗂 Project Structure

```
Web/
│
├── static/                  
│   ├── css/                 
│   │   └── Portfolio/
│   │       └── checkpoint1/
│   │           ├── main.css              # Main dashboard styles
│   │           ├── timeseries.css        # Time series specific styles
│   │           └── index.css             # Component styles
│   │
│   └── js/                  
│       └── Portfolio/
│           └── checkpoint1/
│               ├── main.js               # Main orchestration
│               ├── index.js              # D3.js core visualizations
│               ├── timeseries.js         # Time series charts
│               ├── acf-plot.js           # Autocorrelation visualization
│               ├── ccf-plot.js           # Cross-correlation visualization
│               ├── stationarity.js       # Stationarity tests view
│               └── decomposition.js      # Series decomposition
│
├── templates/               
│   └── Portfolio/
│       └── checkpoint1/
│           └── main.html                 # Dashboard template
│
├── app.py                                # Flask application
├── requirements.txt         
└── README.md                
```

## 🎨 Technology Stack

### Backend
- **Flask 2.3.3** - Web framework
- **Python 3.8+** - Core language
- **Requests** - API integration

### Frontend
- **D3.js v7** - Time series visualizations
- **Bootstrap 5.x** - Responsive dashboard layout
- **Custom CSS** - Time series specific styling
- **Vanilla JavaScript** - Event handling and data processing

### Time Series Analysis (API Side)
- **statsmodels** - ACF/CCF computation
- **scipy** - Statistical testing
- **numpy** - Numerical operations

## 🔗 Microservice Routes

| Route | Method | Description | API Integration |
|-------|--------|-------------|-----------------|
| / | GET | Main navigation | - |
| /portfolio/checkpoint1 | GET | Engagement time series dashboard | /api/unidad-2/portfolio/checkpoint1 |
| /project/checkpoint1 | GET | Technology market time series | /api/unidad-2/project/checkpoint1 |

## 📊 Data Flow

```
[User Accesses Dashboard]
       │
       ▼
[Flask Renders Template]
       │
       ▼
[Client Fetches API Data]
       │
       ▼
[API: Statistical Processing]
   - ACF/CCF calculation
   - Stationarity tests
   - Decomposition
       │
       ▼
[D3.js Time Series Binding]
       │
       ▼
[Interactive Visualizations]
   - Line charts
   - ACF/CCF plots
   - Confidence bands
   - Interactive tooltips
       │
       ▼
[User Interactions]
   - Zoom/pan timeline
   - Toggle series
   - Lag selection
   - Export options
```

## 🎯 D3.js Implementation Patterns

### 1. Time Series Line Chart with Zoom

```javascript
// Time series with brush zoom
const x = d3.scaleTime()
    .domain(d3.extent(data, d => d.date))
    .range([0, width]);

const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .range([height, 0]);

const line = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.value))
    .curve(d3.curveMonotoneX);

// Add brush for zooming
const brush = d3.brushX()
    .extent([[0, 0], [width, height]])
    .on("end", updateChart);
```

### 2. ACF Plot with Confidence Bands

```javascript
// Autocorrelation function visualization
const acfData = apiResponse.autocorrelation.watchTime;

svg.selectAll(".acf-bar")
    .data(acfData.acf_values)
    .join("rect")
    .attr("class", "acf-bar")
    .attr("x", (d, i) => x(acfData.lags[i]))
    .attr("y", d => d > 0 ? y(d) : y(0))
    .attr("width", x.bandwidth())
    .attr("height", d => Math.abs(y(d) - y(0)))
    .attr("fill", d => Math.abs(d) > acfData.confidence_upper ? "#ef4444" : "#3b82f6");

// Confidence bands
svg.append("line")
    .attr("x1", 0).attr("x2", width)
    .attr("y1", y(acfData.confidence_upper))
    .attr("y2", y(acfData.confidence_upper))
    .attr("stroke", "#94a3b8")
    .attr("stroke-dasharray", "4,4");
```

### 3. CCF Plot with Lead/Lag Interpretation

```javascript
// Cross-correlation with lag markers
const ccfData = apiResponse.crossCorrelation;

svg.selectAll(".ccf-point")
    .data(ccfData.ccf_values)
    .join("circle")
    .attr("class", "ccf-point")
    .attr("cx", (d, i) => x(ccfData.lags[i]))
    .attr("cy", d => y(d))
    .attr("r", 4)
    .attr("fill", (d, i) => 
        ccfData.lags[i] === ccfData.max_correlation_lag ? "#ef4444" : "#3b82f6"
    );

// Connect points with lines
const ccfLine = d3.line()
    .x((d, i) => x(ccfData.lags[i]))
    .y(d => y(d));

svg.append("path")
    .datum(ccfData.ccf_values)
    .attr("fill", "none")
    .attr("stroke", "#3b82f6")
    .attr("stroke-width", 2)
    .attr("d", ccfLine);
```

### 4. Stationarity Dashboard

```javascript
// Moving mean and variance visualization
const windowSize = 12;
const rollingMean = calculateRollingMean(data, windowSize);
const rollingVar = calculateRollingVariance(data, windowSize);

// Mean plot
svg.append("path")
    .datum(rollingMean)
    .attr("fill", "none")
    .attr("stroke", "#10b981")
    .attr("stroke-width", 2)
    .attr("d", d3.line()
        .x((d, i) => x(data[i].date))
        .y(d => y(d))
    );

// Variance plot (separate axis)
const y2 = d3.scaleLinear()
    .domain([0, d3.max(rollingVar)])
    .range([height, 0]);

svg.append("path")
    .datum(rollingVar)
    .attr("fill", "none")
    .attr("stroke", "#f59e0b")
    .attr("stroke-width", 2)
    .attr("d", d3.line()
        .x((d, i) => x(data[i].date))
        .y(d => y2(d))
    );
```

### 5. Series Decomposition (Trend + Seasonal + Residual)

```javascript
// STL decomposition visualization
const decomposition = apiResponse.decomposition;

// Create small multiples
const components = ["trend", "seasonal", "residual"];
const smallHeight = height / 3;

components.forEach((component, i) => {
    const componentG = svg.append("g")
        .attr("transform", `translate(0, ${i * smallHeight})`);
    
    componentG.append("path")
        .datum(decomposition[component])
        .attr("fill", "none")
        .attr("stroke", "#3b82f6")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x((d, idx) => x(data[idx].date))
            .y(d => yScales[component](d))
        );
    
    // Add component label
    componentG.append("text")
        .attr("x", -40)
        .attr("y", smallHeight / 2)
        .text(component.charAt(0).toUpperCase() + component.slice(1))
        .attr("text-anchor", "end")
        .style("font-weight", "bold");
});
```

## 🛠 Setup and Execution

### Prerequisites
- Python 3.8+
- Modern browser with SVG support
- Access to time series analysis APIs
- statsmodels and scipy (API side)

### Local Installation

1. **Navigate to project**

```bash
cd Web
```

2. **Configure environment**

```bash
# .env file
API_BASE_URL=http://localhost:8000
API_PORTFOLIO_TS=/api/unidad-2/portfolio/checkpoint1
API_PROJECT_TS=/api/unidad-2/project/checkpoint1
```

3. **Install dependencies**

```bash
pip install -r requirements.txt
```

4. **Run application**

```bash
python app.py
```

### Access URLs
- **Main Dashboard**: http://localhost:5000
- **Portfolio Time Series**: http://localhost:5000/portfolio/checkpoint1
- **Project Time Series**: http://localhost:5000/project/checkpoint1

## 🎨 Visualization Features

### Portfolio Checkpoint 1

#### 1. **Time Series Overview**
- **Multi-line chart** with watch time and user sessions
- **Interactive legend** to toggle series visibility
- **Zoom and pan** capabilities
- **Tooltip** with exact values and dates

#### 2. **ACF Analysis Dashboard**
- **Side-by-side ACF plots** for each series
- **Confidence bands** (±2/√n) visualization
- **Lag interpretation** labels
- **Statistical significance** color coding

#### 3. **CCF Analysis**
- **Cross-correlation plot** with lag range [-10, 10]
- **Lead/lag marker** at maximum correlation
- **Confidence interval** bands
- **Interpretation panel** with textual insights

#### 4. **Stationarity Tests**
- **Rolling mean** visualization
- **Rolling variance** overlay
- **Test statistics panel** (ADF, KPSS)
- **Recommendation** box for data transformation

#### 5. **White Noise Test**
- **Ljung-Box statistic** visualization
- **P-value interpretation**
- **Hypothesis conclusion** display

### Project Checkpoint 1

#### 1. **Salary Evolution**
- **Multi-series comparison** (AI/ML vs Data Science)
- **Quarterly aggregation** view
- **Trend line** overlay
- **Growth rate** annotations

#### 2. **ACF Comparative View**
- **Split-screen ACF plots**
- **Synchronized lag scales**
- **Difference highlighting** between series
- **Model identification** suggestions (AR, MA, ARMA)

#### 3. **Lead/Lag Analysis**
- **CCF plot** with extended lag range
- **Economic interpretation** of lag relationships
- **Causal inference** disclaimer
- **Time-shifted overlay** option

#### 4. **Seasonal Decomposition**
- **Three-panel view**: Trend, Seasonal, Residual
- **Seasonal component** bar chart
- **Periodogram** for frequency analysis
- **Seasonal strength** metrics

#### 5. **Technology Adoption Timeline**
- **S-curve fitting** for new technologies
- **Inflection point** markers
- **Adoption rate** calculations
- **Forecast confidence intervals**

#### 6. **Job Posting Trends**
- **Weekly aggregation** view
- **Remote vs Hybrid** comparison
- **Growth acceleration** indicators
- **Event annotations** (e.g., "ChatGPT Launch")

## 🔧 Key Statistical Concepts Visualized

### 1. **White Noise Detection**
```
Visual Cues:
✓ ACF values within confidence bands
✓ Random scatter in time series
✓ Constant mean and variance
✓ Ljung-Box p-value > 0.05
```

### 2. **Autoregressive Patterns**
```
Visual Cues:
✓ Slowly decaying ACF
✓ Spiky PACF at low lags
✓ Smooth time series trends
✓ Order suggestion: AR(p)
```

### 3. **Moving Average Patterns**
```
Visual Cues:
✓ Spiky ACF at low lags
✓ Decaying PACF
✓ Sudden drops in correlation
✓ Order suggestion: MA(q)
```

### 4. **Non-Stationarity**
```
Visual Cues:
✓ Persistent ACF (slow decay)
✓ Trending mean over time
✓ Changing variance
✓ Recommendation: Differencing
```

### 5. **Seasonality**
```
Visual Cues:
✓ Periodic ACF spikes
✓ Repeating patterns
✓ Seasonal decomposition peaks
✓ Spectral density peaks
```

## 📈 Interactive Features

### User Interactions

#### Time Range Selection
```javascript
// Brush-based zooming
brush.on("end", function(event) {
    if (event.selection) {
        const [x0, x1] = event.selection;
        const newDomain = [x.invert(x0), x.invert(x1)];
        updateAllCharts(newDomain);
    }
});
```

#### Series Toggle
```javascript
// Click legend to show/hide series
legend.on("click", function(d) {
    d.visible = !d.visible;
    svg.select(`.line-${d.id}`)
        .transition()
        .style("opacity", d.visible ? 1 : 0.1);
});
```

#### Lag Slider
```javascript
// Adjust correlation lag range
lagSlider.on("input", function() {
    const maxLag = +this.value;
    updateACFPlot(maxLag);
    updateCCFPlot(maxLag);
});
```

#### Tooltip Details
```javascript
// Hover for detailed statistics
d3.selectAll(".data-point")
    .on("mouseover", function(event, d) {
        tooltip.html(`
            <strong>Date:</strong> ${formatDate(d.date)}<br>
            <strong>Value:</strong> ${formatNumber(d.value)}<br>
            <strong>ACF(1):</strong> ${d.acf1.toFixed(3)}<br>
            <strong>Trend:</strong> ${d.trend}
        `);
    });
```

## 🐛 Troubleshooting

### Common Issues

**ACF values not displaying**
```javascript
// Check data structure
console.log("ACF Data:", apiResponse.autocorrelation);
// Ensure lags and acf_values arrays match in length
```

**Confidence bands incorrect**
```javascript
// Verify n (sample size) for calculation
const confidenceBand = 2 / Math.sqrt(n);
```

**CCF interpretation confusing**
```
Positive lag: Series 1 leads Series 2
Negative lag: Series 2 leads Series 1
Zero lag: Simultaneous correlation
```

**Time series not updating**
```javascript
// Clear old elements before redraw
svg.selectAll(".time-series-line").remove();
```

**Stationarity test failing**
- Check for missing data points
- Verify time series is sorted by date
- Ensure sufficient data points (n > 30)

## 📚 Statistical Interpretation Guide

### ACF Interpretation
| Pattern | Interpretation | Model Suggestion |
|---------|---------------|------------------|
| Quick decay to 0 | Stationary, short memory | AR(1) or MA(1) |
| Slow linear decay | Non-stationary | Apply differencing |
| Sinusoidal pattern | Seasonality | Seasonal ARIMA |
| Spikes at specific lags | MA process | MA(q) where q = last significant lag |
| Exponential decay | AR process | AR(p) |

### CCF Interpretation
| Max CCF Lag | Meaning |
|-------------|---------|
| Lag 0 | Simultaneous relationship |
| Positive lag | Series 1 leads Series 2 |
| Negative lag | Series 2 leads Series 1 |
| No significant CCF | Independent series |

### Stationarity Indicators
| Test | Stationary if... |
|------|-----------------|
| ADF | p-value < 0.05 |
| KPSS | p-value > 0.05 |
| Visual | Constant mean & variance |
| ACF | Quick decay to zero |

## 🚀 Performance Optimization

### Data Handling
- **Client-side caching** of API responses
- **Lazy loading** of decomposition components
- **Debounced updates** on user interactions

### Rendering
- **Canvas fallback** for >500 time points
- **Downsampling** for large datasets (Largest-Triangle-Three-Buckets algorithm)
- **Virtual scrolling** for correlation tables

### Memory Management
```javascript
// Cleanup on component unmount
function cleanup() {
    svg.selectAll("*").remove();
    simulation.stop();
    window.removeEventListener('resize', handleResize);
}
```

## 🔄 Migration from Unit 1

### Key Differences

| Aspect | Unit 1 | Unit 2 Checkpoint 1 |
|--------|--------|---------------------|
| **Library** | Chart.js | D3.js |
| **Data Type** | Aggregated metrics | Time series |
| **Analysis** | Descriptive statistics | Temporal correlation |
| **Interactivity** | Basic tooltips | Zoom, brush, filtering |
| **Complexity** | Simple bar/line charts | ACF/CCF/decomposition |

## 📖 Key Deliverables

### Documentation ✓
- [x] **README.md** - This comprehensive guide
- [x] **Design rationale** - Embedded in visualization descriptions
- [x] **Statistical interpretation** - Included in tables above

### Visualizations ✓
- [x] **Time series charts** - Multi-line with zoom
- [x] **ACF plots** - With confidence bands
- [x] **CCF plots** - Lead/lag analysis
- [x] **Stationarity dashboard** - Rolling statistics
- [x] **Decomposition view** - Trend/seasonal/residual

### Interactive Dashboard ✓
- [x] **app.py** - Flask routes for Portfolio/Project
- [x] **main.html** - Dashboard template
- [x] **custom.css** - Time series styling
- [x] **JavaScript modules** - D3.js implementations

### Technical Stack ✓
- [x] **requirements.txt** - Flask, requests
- [x] **API integration** - Documented endpoints
- [x] **D3.js v7** - Core visualization library

## 👥 Team

**Authors**: Alan Valbuena & Sergio Barrera

### Responsibilities

#### Frontend Team (Us)
- ✅ Time series visualizations with D3.js
- ✅ Interactive dashboard components
- ✅ Flask routing and template rendering
- ✅ User experience and interactions

#### Backend Team (Analysis API)
- ✅ ACF/CCF statistical computation
- ✅ Stationarity testing
- ✅ Series decomposition
- ✅ Data preprocessing

## 📄 License

Distributed under MIT License.

---

**Version**: 2.0.0 - Checkpoint 1 (Time Series Analysis)  
**Last Updated**: October 2025  
**Framework**: Flask + D3.js v7  
**Focus**: Temporal Pattern Analysis & Statistical Correlation