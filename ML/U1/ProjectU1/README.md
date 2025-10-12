# AI Impact Analysis on Tech Salaries (2020-2025)

---

### 🗂️ Project Structure

```
ML/
└── ProjectU1/
    ├──Project_analysis.ipynb
    ├── Data/
    │   ├── raw/
    │   │   └── (datasets original)

```

---

## Executive Summary

This comprehensive analysis examines the impact of artificial intelligence (particularly the ChatGPT boom starting November 2022) on technology sector salaries using a dataset of 65,117 tech salary records from 2020-2025.

### Key Findings

#### 🎯 **Significant AI Impact Detected**
- **Overall salary growth: +22.2%** (Pre-AI: $119,515 → Post-AI: $146,020)
- **Statistical significance: p < 0.001** (highly significant)
- **Peak impact year: 2023** with +25.3 impact points

#### 📊 **Differential Impact by Experience Level**
The AI boom did not affect all experience levels equally:
- **Entry-level: +52.6%** ($67,829 → $103,487) - Most benefited group
- **Mid-level: +34.3%** ($96,970 → $130,203)
- **Senior: +11.5%** ($143,759 → $160,241) 
- **Executive: +7.2%** ($182,833 → $195,972) - Least impacted

#### 🏢 **Company Size Impact**
Large enterprises led the salary inflation:
- **Large companies (>250 employees): +40.4%**
- **Medium companies (50-250): +12.8%**
- **Small companies (<50): +4.5%**

#### 🌍 **Geographic Variations**
- **Spain: +49.0%** - Highest growth globally
- **Germany: +31.0%** - Strong European tech hub
- **Canada: +13.0%**, **US: +10.0%** - Moderate growth
- **France: -1.0%**, **UK: -5.0%** - Negative growth

### Temporal Analysis

#### Critical Timeline
- **2020-2021**: Stable period, minimal salary changes
- **2022**: First significant jump (+27.2%) - Pre-ChatGPT preparation
- **2023**: Maximum impact (+19.6%) - Post-ChatGPT boom
- **2024-2025**: Stabilization phase with slight decline

#### Work Modality Shifts
A surprising reversal occurred in work arrangements:
- **Pre-AI (2020-2022)**: Remote work dominated (48-65%)
- **Post-AI (2023-2025)**: Return to office (69-82% on-site)
- **2023**: Critical inflection point with +42.8pp shift to in-person work

### Outlier and Pattern Analysis

#### Extreme Salaries
- **Maximum salary increased 64%**: $456K (2020) → $750K (2025)
- **Outlier percentage remained stable**: 1.5% (Pre-AI) vs 1.6% (Post-AI)
- **Top-paying roles**: Information Security Officer, Software Engineer, Security Engineer

#### Role-Specific Performance
**Biggest Winners:**
- Penetration Testing Engineer: +53.7%
- Data Scientist: +50.5%
- Cyber Security Consultant: +47.1%

**Biggest Losers:**
- Security Specialist: -15.7%
- Detection Engineer: -14.4%
- Head of Information Security: -10.4%

### Predictive Model Results

#### Model Performance
- **Best Model**: Random Forest (R² = 0.124, MAE = $45,299)
- **Most Important Predictor**: Experience Level (85.2% importance)
- **AI Period Impact**: 2.1% model importance

#### Key Prediction Insights
The model revealed counter-intuitive patterns:
- **Junior roles gained significantly** more value than senior roles
- **Experience level remains the dominant salary predictor**
- **Work modality has minimal salary impact** (1.1% importance)

### Employee Segmentation (Clustering Analysis)

Five distinct employee archetypes were identified in the post-AI period:

1. **Cluster 0** (6,136 employees): Entry-level, medium companies, on-site ($107K avg)
2. **Cluster 1** (11,170 employees): Senior remote workers, medium companies ($152K avg)
3. **Cluster 2** (24,671 employees): Senior on-site, medium companies ($147K avg)
4. **Cluster 3** (1,297 employees): Senior hybrid, large companies ($164K avg) - Premium segment
5. **Cluster 4** (19,566 employees): Senior on-site, medium companies ($152K avg)

### Statistical Validation

#### Correlation Analysis
- **Experience Level**: 0.267 correlation with salary (strongest)
- **AI Period**: 0.078 correlation (significant but moderate)
- **Work Modality**: 0.050 correlation (minimal impact)

#### AI Impact Index
A composite metric combining salary, seniority levels, and company size shows:
- **2023: Peak impact** (+25.3 points)
- **2024-2025: Sustained elevation** (+13.4 and +11.3 points)
- Clear demarcation between pre and post-AI periods

### Business Implications

#### For Companies
1. **Talent Retention Strategy**: Large companies are winning the talent war through aggressive salary increases
2. **Experience Premium Shift**: Junior talent became more valuable relative to senior talent
3. **Geographic Arbitrage**: European markets (especially Spain, Germany) offer high growth opportunities

#### For Professionals
1. **Early Career Advantage**: Entry-level professionals benefited most from AI adoption
2. **Specialization Risk**: Hyper-specialized roles showed negative growth
3. **Location Matters**: Geographic choice significantly impacts salary trajectory

#### For Market Dynamics
1. **AI Created Real Economic Impact**: Not just hype, but measurable salary inflation
2. **Return to Office Correlation**: AI adoption coincided with reduced remote work
3. **Market Maturation**: 2024-2025 show stabilization after initial disruption

### Methodology

#### Data Quality
- **Sample Size**: 65,117 records across 6 years
- **Geographic Coverage**: Global dataset with emphasis on US, Europe
- **Temporal Range**: 2020-2025 covering pre/during/post AI boom

#### Analytical Approaches
- **Statistical Testing**: t-tests, correlation analysis
- **Predictive Modeling**: Random Forest, Linear Regression
- **Segmentation**: K-means clustering, PCA analysis
- **Temporal Analysis**: Year-over-year growth, impact indexing

### Limitations and Considerations

1. **Dataset Bias**: Primarily security-focused tech roles, may not represent entire tech sector
2. **Geographic Skew**: Heavy US representation may bias global conclusions
3. **Causation vs Correlation**: While timing aligns with AI boom, multiple factors influence salaries
4. **Self-Reporting Bias**: Salary data quality depends on accurate self-reporting
5. **Economic Context**: Analysis period includes COVID-19 effects and broader economic changes

### Future Research Directions

1. **Longitudinal Tracking**: Continue monitoring as AI adoption matures
2. **Role Granularity**: Deeper analysis of specific job functions and their AI susceptibility
3. **Skills Analysis**: Correlation between specific technical skills and salary growth
4. **Industry Expansion**: Include non-security tech roles for broader market view

### Conclusion

The analysis provides strong evidence that the AI boom, particularly following ChatGPT's release in November 2022, created a significant and measurable impact on tech sector salaries. The effect was not uniform - it disproportionately benefited early-career professionals and employees at large companies, while creating geographic winners and losers.

The data suggests that rather than replacing workers, the initial AI wave increased the value of tech talent, particularly those able to adapt and leverage AI tools. However, the market appears to be entering a stabilization phase, with growth rates moderating in 2024-2025.

This analysis demonstrates that major technological disruptions can create rapid and significant labor market changes, with implications for career planning, business strategy, and policy considerations in the technology sector.

---
*Analysis conducted using comprehensive exploratory data analysis, statistical testing, predictive modeling, and clustering techniques. All findings are statistically validated with appropriate significance testing.*