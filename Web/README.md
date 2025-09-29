# 📊 Portfolio Visualization Microservice

## 🎯 Microservice Objective

Portfolio Visualization is a specialized data visualization microservice that integrates with analysis APIs to transform processed data into interactive dashboards. Its purpose is to provide an intuitive visual interface for analyzing:

- **📈 Portfolio**: User engagement metrics and behavior on streaming platforms
- **💼 Project**: Global technology job market trends and salary analysis

## 🏗 Microservice Architecture

```
Frontend (Flask) ←→ Analysis APIs ←→ Databases
     │                   │                    │
     │              Complex Data         Raw Data
 Interactive        Processing           Storage
 Visualization
```

## 🔌 API Integration

### 📡 Portfolio - Unit 1

**API Endpoint**: `GET /api/unidad-1/portfolio`

**Purpose**: User engagement and behavior metrics

**API Response**:

```json
{
    "status": "success",
    "info": {
        "engagement": {
            "completionByAge": {
                "labels": ["18-25", "26-35", "36-45", "46-55", "55+"],
                "values": [85, 78, 65, 58, 45]
            },
            "abandonmentByCountry": {
                "labels": ["México", "España", "Colombia", "Argentina", "Chile"],
                "values": [12, 8, 15, 11, 9]
            },
            "engagementBySubscription": {
                "labels": ["Basic", "Standard", "Premium"],
                "values": [45, 68, 82]
            }
        }
    }
}
```

**Generated Visualizations**:
- Completion rate by age group chart
- Abandonment map by country
- Engagement by subscription type

### 🏢 Project - Unit 1

**API Endpoint**: `GET /api/unidad-1/project`

**Purpose**: Technology job salary analysis and trends

**API Response**:

```json
{
    "status": "success",
    "info": {
        "distributional": {
            "labels": ["Entry Level", "Junior", "Mid-Level", "Senior", "Lead", "Executive"],
            "preAI": {
                "label": "Pre-AI Era (2020-2022)",
                "data": [52000, 68000, 95000, 128000, 165000, 210000],
                "color": "#94a3b8"
            },
            "postAI": {
                "label": "Post-AI Era (2023-2025)",
                "data": [58000, 75000, 115000, 155000, 195000, 245000],
                "color": "#3b82f6"
            },
            "growth": [11.5, 10.3, 21.1, 21.1, 18.2, 16.7]
        },
        "workModalities": {
            "labels": ["2020", "2021", "2022", "2023", "2024", "2025"],
            "datasets": [
                { 
                    "label": "Hybrid", 
                    "data": [35, 32, 30, 45, 65, 85], 
                    "color": "#2ecc71" 
                },
                { 
                    "label": "On-site", 
                    "data": [35, 30, 15, 8, 5, 3], 
                    "color": "#e74c3c" 
                },
                { 
                    "label": "Remote", 
                    "data": [20, 25, 60, 30, 18, 18], 
                    "color": "#3498db" 
                },
                { 
                    "label": "AI Boom (ChatGPT)", 
                    "data": [0, 0, 2, 25, 45, 72], 
                    "color": "#f39c12" 
                }
            ]
        },
        "geographic": {
            "labels": ["United States", "United Kingdom", "Canada", "Germany", "Australia", "Netherlands"],
            "preAI": {
                "label": "Pre-AI Era (2020-2022)",
                "data": [135000, 78000, 85000, 72000, 95000, 82000],
                "color": "#94a3b8"
            },
            "postAI": {
                "label": "Post-AI Era (2023-2025)",
                "data": [155000, 92000, 98000, 84000, 115000, 95000],
                "color": "#3b82f6"
            },
            "growth": [14.8, 17.9, 15.3, 16.7, 21.1, 15.9]
        },
        "remote": {
            "labels": ["2020", "2021", "2022", "2023", "2024"],
            "datasets": [
                { 
                    "label": "0% Remote", 
                    "data": [85000, 88000, 92000, 95000, 98000], 
                    "color": "#e74c3c" 
                },
                { 
                    "label": "50% Remote", 
                    "data": [90000, 95000, 100000, 105000, 108000], 
                    "color": "#f39c12" 
                },
                { 
                    "label": "100% Remote", 
                    "data": [95000, 102000, 110000, 118000, 125000], 
                    "color": "#2ecc71" 
                }
            ]
        },
        "roles": {
            "labels": ["AI/ML Engineer", "Data Scientist", "Cloud Architect", "DevOps Engineer", "Data Engineer"],
            "preAI": {
                "label": "Pre-AI Era (2020-2022)",
                "data": [125000, 115000, 135000, 120000, 110000],
                "color": "#94a3b8"
            },
            "postAI": {
                "label": "Post-AI Era (2023-2025)",
                "data": [165000, 145000, 155000, 140000, 130000],
                "color": "#3b82f6"
            },
            "growth": [32.0, 26.1, 14.8, 16.7, 18.2]
        },
        "company": {
            "labels": ["Startup (S)", "Medium (M)", "Large (L)", "Enterprise (XL)"],
            "data": [105000, 135000, 165000, 195000],
            "colors": ["#ef4444", "#f59e0b", "#10b981", "#3b82f6"],
            "description": "Post-AI Era (2023-2025)"
        },
        "temporal":{
            "labels": ["2020", "2021", "2022", "2023", "2024", "2025"],
            "datasets": [
                {
                    "label": "Entry Level",
                    "data": [48000, 52000, 56000, 58000, 62000, 65000],
                    "color": "#3498db"
                },
                {
                    "label": "Junior",
                    "data": [62000, 65000, 68000, 75000, 78000, 82000],
                    "color": "#2ecc71"
                },
                {
                    "label": "Mid-Level",
                    "data": [85000, 90000, 95000, 115000, 120000, 125000],
                    "color": "#f39c12"
                },
                {
                    "label": "Senior",
                    "data": [120000, 128000, 135000, 155000, 165000, 175000],
                    "color": "#e74c3c"
                },
                {
                    "label": "Lead",
                    "data": [150000, 160000, 165000, 195000, 205000, 215000],
                    "color": "#9b59b6"
                },
                {
                    "label": "Executive",
                    "data": [195000, 205000, 210000, 245000, 255000, 265000],
                    "color": "#34495e"
                }
            ],
            "growth": {
                "Entry Level": [8.3, 7.7, 3.6, 6.9, 4.8],
                "Junior": [4.8, 4.6, 10.3, 4.0, 5.1],
                "Mid-Level": [5.9, 5.6, 21.1, 4.3, 4.2],
                "Senior": [6.7, 5.5, 14.8, 6.5, 6.1],
                "Lead": [6.7, 3.1, 18.2, 5.1, 4.9],
                "Executive": [5.1, 2.4, 16.7, 4.1, 3.9]
            }
        }
    }
}
```

**Generated Visualizations**:
- Salary distribution by experience level
- Geographic salary comparison
- Remote work evolution trends
- Technology roles salary comparison
- Company size impact on salaries
- Temporal salary trends

## 🗂 Project Structure

```
Web/
│
├── static/                  
│   ├── css/                 
│   │   ├── Portfolio/Unit_1/
│   │   │   ├── charts.css       
│   │   │   ├── components.css   
│   │   │   ├── main.css         
│   │   │   └── themes.css       
│   │   └── Project/Unit_1/      
│   │       ├── charts.css
│   │       ├── components.css
│   │       ├── main.css
│   │       └── themes.css
│   │
│   └── js/                  
│       ├── Portfolio/Unit_1/
│       │   ├── charts/          
│       │   │   ├── engagement.js
│       │   │   ├── completion.js
│       │   │   └── abandonment.js
│       │   ├── config/          
│       │   │   └── api.config.js
│       │   └── utils/           
│       │       └── data.loader.js
│       └── Project/Unit_1/      
│           ├── charts/
│           │   ├── salary.distribution.js
│           │   ├── geographic.analysis.js
│           │   ├── remote.trends.js
│           │   ├── roles.comparison.js
│           │   ├── company.size.js
│           │   └── temporal.evolution.js
│           ├── config/
│           │   └── api.config.js
│           └── utils/
│               └── data.loader.js
│
├── templates/               
│   ├── Portfolio/Unit_1/main.html
│   ├── Project/Unit_1/main.html
│   └── index.html            
│
├── app.py                   
├── Dockerfile               
├── requirements.txt         
└── README.md                
```

## 🔗 Microservice Routes

| Route | Method | Description | API Integration |
|-------|--------|-------------|-----------------|
| / | GET | Main navigation page | - |
| /portfolio/unit1 | GET | Engagement metrics dashboard | /api/unidad-1/portfolio |
| /project/unit1 | GET | Salary analysis dashboard | /api/unidad-1/project |

## 📊 Data Flow

```
[Frontend - HTTP Request] 
       │
       ▼ (Render Template)
[Flask - app.py] 
       │
       ▼ (API Fetch)
[Analysis APIs] 
       │
       ▼ (Complex Processing)
[Databases] 
       │
       ▼ (Processed Data)
[Frontend - Visualization]
       │
       ▼ (Chart.js/D3.js)
[Interactive Dashboards]
```

## 🛠 Setup and Execution

### Prerequisites
- Python 3.8+
- Access to analysis APIs
- Dependencies listed in requirements.txt

### Local Installation

1. **Clone repository**

```bash
git clone <repository-url>
cd portfolio-visualization
```

2. **Configure environment variables**

```bash
cp .env.example .env
# Edit .env with API URLs
API_PORTFOLIO_URL=http://api-service:8000/api
API_PROJECT_URL=http://api-service:8000/api
```

3. **Install dependencies**

```bash
pip install -r requirements.txt
```

4. **Run microservice**

```bash
python app.py
```

### Docker Execution

```bash
docker build -t portfolio-visualization .
docker run -p 5000:5000 --env-file .env portfolio-visualization
```

### Access URLs
- **Main Microservice**: http://localhost:5000
- **Portfolio Unit 1**: http://localhost:5000/portfolio/unit1
- **Project Unit 1**: http://localhost:5000/project/unit1

## 🔧 Technical Dependencies

### Backend (Python/Flask)

```python
# requirements.txt
Flask==2.3.3
python-dotenv==1.0.0
requests==2.31.0
pandas==2.0.3
gunicorn==21.2.0
```

### Frontend (Included in Templates)
- **Chart.js 4.x** - Main visualizations
- **Bootstrap 5.x** - UI Framework
- **Font Awesome 6.x** - Icons
- **D3.js 7.x** - Advanced visualizations

## 🔄 API Integration Mechanism

### API Configuration

```javascript
// static/js/Portfolio/Unit_1/config/api.config.js
const API_CONFIG = {
    PORTFOLIO: {
        UNIT_1: '/api/unidad-1/portfolio'
    },
    PROJECT: {
        UNIT_1: '/api/unidad-1/project'
    },
    BASE_URL: process.env.API_BASE_URL || 'http://localhost:8000'
};
```

### Data Loading

```javascript
// static/js/utils/data.loader.js
async function loadPortfolioData() {
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.PORTFOLIO.UNIT_1}`);
        const data = await response.json();
        
        if (data.status === 'success') {
            return data.info;
        } else {
            throw new Error('API returned error status');
        }
    } catch (error) {
        console.error('Error loading portfolio data:', error);
        showError('Could not load portfolio data');
    }
}
```

## 🎨 Visualization Features

### Portfolio Unit 1
- **Completion by Age**: Comparative bar chart by age groups
- **Abandonment by Country**: Heat map or bar chart by country
- **Engagement by Subscription**: Pie chart or bar chart by subscription type

### Project Unit 1
- **Salary Distribution**: Bar chart for level distribution
- **Geographic Analysis**: Interactive map or comparative bar chart
- **Remote Work Trends**: Multi-line chart for temporal evolution
- **Roles Comparison**: Horizontal bar chart for role comparison
- **Company Size Impact**: Bar chart for company size analysis
- **Temporal Evolution**: Line chart for temporal trends

## 📈 Microservice Scalability

To add new units:

1. Create folder structure
2. Configure new API endpoint
3. Add route in app.py
4. Create corresponding templates and assets

**Example for Portfolio Unit 2**:

```python
@app.route('/portfolio/unit2')
def portfolio_unit2():
    return render_template('Portfolio/Unit_2/main.html')
```

## 🐛 Troubleshooting

### Common Issues

**API unavailable**
- Verify API connectivity
- Check analysis service logs
- Confirm URLs in environment variables

**Inconsistent data**
- Validate API response format
- Verify expected data structure
- Check microservice logs

**Visualization problems**
- Check browser console for JS errors
- Confirm Chart.js/D3.js loading correctly
- Validate data structure for charts

### Monitoring
- Structured logs with complete traceback
- Automatic health checks
- API performance metrics
- Real-time error alerts

## 👥 Authors
- Alan Valbuena
- Sergio Barrera

## Microservice Responsibilities

### ✅ Our responsibility:
- Frontend visualization and API integration
- HTML/CSS/JS templates
- Flask server and routing

### ❌ Other microservice:
- Data processing and analysis
- Complex queries and data transformation
- Database storage and management

## 🔄 Development Workflow

1. Analysis APIs process complex data and send structured information
2. Our microservice receives processed data and generates visualizations
3. Users interact with dashboards for visual analysis

## 📄 License

Distributed under MIT License. See LICENSE for more information.
