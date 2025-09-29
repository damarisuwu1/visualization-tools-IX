# 📊 Portfolio Visualization Microservice

## 🎯 Microservice Objective

Portfolio Visualization is a specialized data visualization microservice that integrates with analysis APIs to transform processed data into interactive dashboards. Its purpose is to provide an intuitive visual interface for analyzing:

- *📈 Portfolio*: User engagement metrics and behavior on streaming platforms
- *💼 Project*: Global technology job market trends and salary analysis

## 🏗 Microservice Architecture


Frontend (Flask) ←→ Analysis APIs ←→ Databases
     │                   │                    │
     │              Complex Data         Raw Data
 Interactive        Processing           Storage
 Visualization


## 🔌 API Integration

### 📡 Portfolio - Unit 1

*API Endpoint*: GET /api/unidad-1/portfolio

*Purpose*: User engagement and behavior metrics

*API Response*:

json
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


*Generated Visualizations*:
- Completion rate by age group chart
- Abandonment map by country
- Engagement by subscription type

### 🏢 Project - Unit 1

*API Endpoint*: GET /api/unidad-1/project

*Purpose*: Technology job salary analysis and trends

*API Response*:

```json
{
    "status": "success",
    "info": {
        "distributional": {
            "labels": ["Entry-level", "Mid-level", "Senior", "Executive"],
            "data": [65000, 95000, 135000, 185000],
            "colors": ["#3498db", "#2ecc71", "#f39c12", "#e74c3c"]
        },
        "geographic": {
            "labels": ["Estados Unidos", "Reino Unido", "Canadá", "Alemania", "Australia"],
            "data": [145000, 85000, 92000, 78000, 105000],
            "colors": ["#9b59b6", "#3498db", "#2ecc71", "#f39c12", "#e74c3c"]
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
            "labels": ["ML Engineer", "Data Scientist", "Data Engineer", "Analytics Manager", "Data Analyst"],
            "data": [155000, 145000, 135000, 125000, 85000],
            "colors": ["#9b59b6", "#3498db", "#2ecc71", "#f39c12", "#e74c3c"]
        },
        "company": {
            "labels": ["Startup (S)", "Medium (M)", "Large (L)"],
            "data": [95000, 125000, 155000],
            "colors": ["#e74c3c", "#f39c12", "#2ecc71"]
        },
        "temporal": {
            "labels": ["2020", "2021", "2022", "2023", "2024"],
            "datasets": [
                { 
                    "label": "Entry-level", 
                    "data": [55000, 58000, 62000, 65000, 68000],
                    "color": "#3498db" 
                },
                { 
                    "label": "Senior", 
                    "data": [115000, 125000, 135000, 145000, 155000], 
                    "color": "#e74c3c" 
                }
            ]
        }
    }
}


*Generated Visualizations*:
- Salary distribution by experience level
- Geographic salary comparison
- Remote work evolution trends
- Technology roles salary comparison
- Company size impact on salaries
- Temporal salary trends

## 🗂 Project Structure


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


## 🔗 Microservice Routes

| Route | Method | Description | API Integration |
|-------|--------|-------------|-----------------|
| / | GET | Main navigation page | - |
| /portfolio/unit1 | GET | Engagement metrics dashboard | /api/unidad-1/portfolio |
| /project/unit1 | GET | Salary analysis dashboard | /api/unidad-1/project |

## 📊 Data Flow


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


## 🛠 Setup and Execution

### Prerequisites
- Python 3.8+
- Access to analysis APIs
- Dependencies listed in requirements.txt

### Local Installation

1. *Clone repository*

bash
git clone <repository-url>
cd portfolio-visualization


2. *Configure environment variables*

bash
cp .env.example .env
# Edit .env with API URLs
API_PORTFOLIO_URL=http://api-service:8000/api
API_PROJECT_URL=http://api-service:8000/api


3. *Install dependencies*

bash
pip install -r requirements.txt


4. *Run microservice*

bash
python app.py


### Docker Execution

bash
docker build -t portfolio-visualization .
docker run -p 5000:5000 --env-file .env portfolio-visualization


### Access URLs
- *Main Microservice*: http://localhost:5000
- *Portfolio Unit 1*: http://localhost:5000/portfolio/unit1
- *Project Unit 1*: http://localhost:5000/project/unit1

## 🔧 Technical Dependencies

### Backend (Python/Flask)

python
# requirements.txt
Flask==2.3.3
python-dotenv==1.0.0
requests==2.31.0
pandas==2.0.3
gunicorn==21.2.0


### Frontend (Included in Templates)
- *Chart.js 4.x* - Main visualizations
- *Bootstrap 5.x* - UI Framework
- *Font Awesome 6.x* - Icons
- *D3.js 7.x* - Advanced visualizations

## 🔄 API Integration Mechanism

### API Configuration

javascript
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


### Data Loading

javascript
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


## 🎨 Visualization Features

### Portfolio Unit 1
- *Completion by Age*: Comparative bar chart by age groups
- *Abandonment by Country*: Heat map or bar chart by country
- *Engagement by Subscription*: Pie chart or bar chart by subscription type

### Project Unit 1
- *Salary Distribution*: Bar chart for level distribution
- *Geographic Analysis*: Interactive map or comparative bar chart
- *Remote Work Trends*: Multi-line chart for temporal evolution
- *Roles Comparison*: Horizontal bar chart for role comparison
- *Company Size Impact*: Bar chart for company size analysis
- *Temporal Evolution*: Line chart for temporal trends

## 📈 Microservice Scalability

To add new units:

1. Create folder structure
2. Configure new API endpoint
3. Add route in app.py
4. Create corresponding templates and assets

*Example for Portfolio Unit 2*:

python
@app.route('/portfolio/unit2')
def portfolio_unit2():
    return render_template('Portfolio/Unit_2/main.html')


## 🐛 Troubleshooting

### Common Issues

*API unavailable*
- Verify API connectivity
- Check analysis service logs
- Confirm URLs in environment variables

*Inconsistent data*
- Validate API response format
- Verify expected data structure
- Check microservice logs

*Visualization problems*
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