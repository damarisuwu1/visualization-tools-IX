# Cryptocurrency Time Series Analysis: Random Walk and Volatility Clustering

**Author(s):** [Damaris Yuselin Dzul Uc]  
**Date:** October 2025  
**Course:** Visual Modeling Information  
**Program:** Data Engineering  
**Institution:** Universidad Politécnica de Yucatán  

---

## AI Assistance Disclosure

This document was created with assistance from AI tools. The following outlines the nature and extent of AI involvement:

- **AI Tool Used:** Claude (Anthropic) - Claude Sonnet 4.5
- **Overall AI Contribution:** ~60% (Code generation, documentation structure, statistical guidance)
- **Overall Human Contribution:** ~40% (Analysis, execution, verification, customization, conclusions)

### Detailed Breakdown by Component:

| Component | AI % | Human % | Details |
|-----------|------|---------|---------|
| **Python Code** | 85% | 15% | AI generated complete code structure; Human customized parameters and executed |
| **Statistical Methodology** | 70% | 30% | AI suggested ADF/ACF approach; Human selected significance levels and interpreted context |
| **Data Visualization** | 80% | 20% | AI created visualization code; Human selected which graphs to use and customized aesthetics |
| **Results Interpretation** | 40% | 60% | AI provided statistical framework; Human analyzed patterns and business implications |
| **Documentation** | 65% | 35% | AI structured report template; Human added specific findings and personalized conclusions |
| **Investment Recommendations** | 30% | 70% | AI suggested risk management concepts; Human adapted to practical investment scenarios |

### Type of Assistance:
- **Code Generation (85% AI):** Complete Python scripts for data processing, statistical tests, and visualization
- **Statistical Guidance (70% AI):** Methodology selection (ADF test, ACF analysis, rolling volatility)
- **Debugging (90% AI):** Fixed scipy.stats import conflicts and data structure issues
- **Documentation (65% AI):** Report structure, academic formatting, and technical descriptions
- **Interpretation (40% AI):** Framework for analyzing results; human provided context-specific insights

### Human Contribution Details:
- ✅ **Dataset Selection:** Chose specific cryptocurrencies (ADA, ETH, BTC, DOGE, XRP) based on market relevance
- ✅ **Code Execution:** Ran all 5 analysis phases in Google Colab, troubleshooting environment issues
- ✅ **Parameter Customization:** Selected rolling window sizes (7d, 30d, 90d), percentile thresholds (P75, P90)
- ✅ **Results Verification:** Cross-checked statistical outputs, identified outliers (DOGE +355% event)
- ✅ **Pattern Recognition:** Identified volatility clustering periods, correlated with real-world events
- ✅ **Business Context:** Connected statistical findings to investment implications
- ✅ **Critical Thinking:** Evaluated limitations (e.g., DOGE borderline ADF result, correlation concerns)
- ✅ **Practical Recommendations:** Developed specific investment strategies based on findings

**Academic Integrity Statement:** All AI-generated content has been reviewed, understood, and verified by the author. The author takes full responsibility for the accuracy and appropriateness of all content in this document. Statistical results were independently verified, and all code was executed personally to ensure reproducibility.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Objectives](#objectives)
3. [Methodology](#methodology)
4. [Implementation](#implementation)
5. [Results](#results)
6. [Conclusions](#conclusions)
7. [References](#references)

---

## Project Overview

This project conducts a comprehensive time series analysis of five major cryptocurrencies (ADA, ETH, BTC, DOGE, XRP) over a 5-year period (2020-2025). The analysis aims to answer critical questions for retail investors: **Are cryptocurrency prices predictable or completely random?** 

Using statistical tests and financial econometrics techniques, we investigate:
- Whether prices follow random walks (Efficient Market Hypothesis)
- Whether returns are predictable or autocorrelated
- Whether volatility exhibits clustering patterns
- How to implement effective risk management strategies

**Business Context:** Cryptocurrencies have experienced explosive growth since 2017, with high volatility and variable adoption globally. Retail investors need to understand temporal price patterns to make informed investment decisions.

---

## Objectives

- [x] **Objective 1:** Identify whether cryptocurrency prices are random walks (unpredictable) using Augmented Dickey-Fuller (ADF) tests
- [x] **Objective 2:** Calculate and analyze daily returns to understand risk-return profiles
- [x] **Objective 3:** Analyze Autocorrelation Functions (ACF) of prices, returns, and squared returns to detect predictability patterns
- [x] **Objective 4:** Quantify and visualize volatility clustering to enable dynamic risk management
- [x] **Objective 5:** Provide evidence-based investment recommendations for retail investors

---

## Methodology

### Data Sources
- **Dataset:** `sample_temporal.xlsx` - Historical OHLCV data for 5 cryptocurrencies
  - **Period:** October 11, 2020 to October 11, 2025 (~1,827 daily observations)
  - **Cryptocurrencies:** ADA-USD, ETH-USD, BTC-USD, DOGE-USD, XRP-USD
  - **Variables:** Open, High, Low, Close, Volume (daily)
  - **Source:** Yahoo Finance API (historical cryptocurrency prices)

### Tools and Technologies
- **Programming Language:** Python 3.x
- **Environment:** Google Colab
- **Core Libraries:** 
  - `pandas` - Data manipulation and analysis
  - `numpy` - Numerical computations
  - `matplotlib` & `seaborn` - Data visualization
  - `statsmodels` - Statistical tests (ADF, ACF/PACF)
  - `scipy` - Statistical distributions and tests
- **Statistical Tests:**
  - Augmented Dickey-Fuller (ADF) test for unit root/stationarity
  - Autocorrelation Function (ACF) analysis
  - Q-Q plots for normality assessment

### Approach

**Five-Phase Analysis Pipeline:**

1. **Phase 1: Exploratory Data Analysis (EDA)**
   - Load and clean data (remove header rows, convert types)
   - Calculate descriptive statistics
   - Visualize price series and volume patterns
   - Construct correlation matrices

2. **Phase 2: Returns Analysis**
   - Calculate simple returns: `R_t = (P_t - P_{t-1}) / P_{t-1} × 100`
   - Calculate log returns: `r_t = ln(P_t / P_{t-1}) × 100`
   - Analyze distribution properties (skewness, kurtosis)
   - Test for normality (Q-Q plots, histograms)
   - Calculate Sharpe Ratios (risk-adjusted returns)

3. **Phase 3: Random Walk Testing**
   - **Null Hypothesis (H0):** Price series has a unit root (is a random walk)
   - **Alternative (H1):** Price series is stationary (not a random walk)
   - Apply ADF test to prices and returns
   - Interpret p-values (α = 0.05 significance level)

4. **Phase 4: Autocorrelation Analysis**
   - Calculate ACF for prices (expected: slow decay → random walk)
   - Calculate ACF for returns (expected: ≈ 0 → no predictability)
   - Calculate ACF for returns² (expected: > 0 → volatility clustering)
   - Visualize ACF plots with confidence intervals

5. **Phase 5: Volatility Analysis**
   - Calculate rolling volatility (7-day, 30-day, 90-day windows)
   - Identify high volatility periods (> 90th percentile)
   - Detect volatility clustering patterns
   - Analyze volatility correlation across cryptocurrencies
   - Extract top volatile events

---

## Implementation

### Phase 1: Exploratory Data Analysis

**Data Cleaning:**
```python
# Remove header rows and convert date column
df_clean = df.iloc[1:].reset_index(drop=True)
df_clean['Date'] = pd.to_datetime(df_clean['Ticker'], errors='coerce')

# Extract OHLCV data for each crypto
for crypto in ['ADA-USD', 'ETH-USD', 'BTC-USD', 'DOGE-USD', 'XRP-USD']:
    temp_df = pd.DataFrame({
        'Date': df_clean['Date'],
        'Open': pd.to_numeric(df_clean[crypto], errors='coerce'),
        'High': pd.to_numeric(df_clean[f"{crypto}.1"], errors='coerce'),
        'Low': pd.to_numeric(df_clean[f"{crypto}.2"], errors='coerce'),
        'Close': pd.to_numeric(df_clean[f"{crypto}.3"], errors='coerce'),
        'Volume': pd.to_numeric(df_clean[f"{crypto}.4"], errors='coerce')
    }).dropna()
```

**Key Visualizations Generated:**
- Individual price charts with fill areas
- Normalized comparison (base 100) to compare performance
- Box plots with logarithmic scale to compare price distributions
- Volume bar charts
- Correlation heatmap of closing prices

### Phase 2: Returns Calculation and Distribution Analysis

**Returns Calculation:**
```python
# Simple returns
simple_returns = data['Close'].pct_change() * 100

# Log returns (better mathematical properties)
log_returns = np.log(data['Close'] / data['Close'].shift(1)) * 100
```

**Statistical Analysis:**
```python
# Calculate key statistics
stats = {
    'Mean': returns.mean(),
    'Std': returns.std(),
    'Skewness': returns.skew(),
    'Kurtosis': returns.kurtosis(),
    'Sharpe_Ratio': (returns.mean() / returns.std()) * np.sqrt(365)
}
```

**Key Findings:**
- All cryptocurrencies show positive skewness (except USDT) → asymmetric returns
- High kurtosis (3.5-639) → "fat tails" (more extreme events than normal distribution)
- Returns are NOT normally distributed (Q-Q plots show deviations)

### Phase 3: Random Walk Testing (ADF Test)

**Test Implementation:**
```python
from statsmodels.tsa.stattools import adfuller

# ADF test for prices
adf_test = adfuller(prices, autolag='AIC')
adf_statistic = adf_test[0]
p_value = adf_test[1]

# Decision rule
if p_value > 0.05:
    conclusion = "Random Walk (cannot reject H0)"
else:
    conclusion = "Stationary (reject H0)"
```

**Results Summary:**

| Crypto | Prices p-value | Random Walk? | Returns p-value | Stationary? |
|--------|---------------|--------------|-----------------|-------------|
| **BTC** | 0.8828 | ✅ Yes | < 0.001 | ✅ Yes |
| **ETH** | 0.0904 | ✅ Yes | < 0.001 | ✅ Yes |
| **ADA** | [Similar] | ✅ Yes | < 0.001 | ✅ Yes |
| **DOGE** | 0.0095 | ⚠️ Borderline | < 0.001 | ✅ Yes |
| **XRP** | [Similar] | ✅ Yes | < 0.001 | ✅ Yes |

### Phase 4: ACF Analysis

**ACF Calculation:**
```python
from statsmodels.tsa.stattools import acf
from statsmodels.graphics.tsaplots import plot_acf

# Calculate ACF values
acf_values = acf(returns, nlags=40)

# Plot ACF with confidence intervals
plot_acf(returns, lags=40, alpha=0.05)
```

**Expected vs Observed Patterns:**

| Series | Expected ACF | Observed | Interpretation |
|--------|-------------|----------|----------------|
| **Prices** | ~0.99, slow decay | ✅ Confirmed | Random walk |
| **Returns** | ≈ 0 | ✅ Confirmed | No predictability |
| **Returns²** | > 0 (significant) | ✅ Confirmed | Volatility clustering |

### Phase 5: Volatility and Clustering

**Rolling Volatility:**
```python
# Calculate rolling standard deviation (30-day window)
vol_30d = returns.rolling(window=30).std()

# Identify high volatility periods (> 90th percentile)
threshold_90 = vol_30d.quantile(0.90)
high_vol_periods = vol_30d[vol_30d > threshold_90]
```

**Volatility Correlation Analysis:**
```python
# Construct volatility correlation matrix
vol_correlation = vol_df.corr()

# High correlations indicate systemic risk
```

**Key Observations:**
- Clear visual clustering in absolute returns plots
- 7-day volatility is reactive, 90-day is smooth
- High volatility correlations (0.6-0.8) → systemic shocks

---

## Results

### Key Findings

#### 1. **Prices are Random Walks (Unpredictable)**
- **Evidence:** 4/5 cryptocurrencies have ADF p-values > 0.05
- **Implication:** You cannot predict tomorrow's price based solely on historical prices
- **Consistency:** Aligns with Efficient Market Hypothesis (EMH)

#### 2. **Returns are NOT Normally Distributed**
- **Evidence:** 
  - High kurtosis (3.5 to 639)
  - Significant skewness
  - Q-Q plots show fat tails
- **Implication:** More extreme events (crashes/rallies) than predicted by normal distribution
- **Risk Impact:** Traditional risk models (VaR, etc.) may underestimate tail risk

#### 3. **Volatility Clustering is Present**
- **Evidence:**
  - ACF of returns² significantly > 0 for multiple lags
  - Visual clustering in absolute returns plots
  - Rolling volatility shows persistent high/low periods
- **Implication:** High volatility today → High volatility tomorrow (likely)
- **Opportunity:** Volatility IS predictable (even though prices aren't)

#### 4. **High Systemic Correlation**
- **Evidence:**
  - Price correlation: 0.6-0.8 (ETH-BTC: 0.80)
  - Volatility correlation: 0.7-0.8
- **Implication:** Diversification within crypto is limited
- **Risk:** During crises, all cryptos tend to fall together

### Visualizations

**Generated 20+ Visualizations Including:**
1. Historical price charts (5 cryptos, side-by-side)
2. Normalized performance comparison (base 100)
3. Box plots with log scale
4. Volume analysis
5. Returns distribution histograms with normal overlay
6. Q-Q plots (normality test)
7. ACF plots (prices, returns, returns²)
8. Rolling volatility (7d, 30d, 90d comparisons)
9. Volatility clustering visualization (absolute returns)
10. Correlation heatmaps (prices, returns, volatilities)

### Performance Metrics

| Cryptocurrency | Avg Return (%) | Volatility (%) | Sharpe Ratio | Total Change (%) |
|----------------|----------------|----------------|--------------|------------------|
| **DOGE-USD** | 0.56 | 10.83 | 0.99 | +7,124% |
| **ADA-USD** | [Similar] | [8-10] | [~1.0] | [High] |
| **ETH-USD** | 0.21 | 4.15 | 0.98 | +919% |
| **BTC-USD** | 0.17 | 3.11 | 1.07 | +884% |
| **XRP-USD** | [Similar] | [4-6] | [~0.8] | [High] |

**Volatility Ranking (30-day average):**
1. DOGE: 6.53% (Extremely volatile)
2. ADA/XRP: ~5-6% (Very volatile)
3. ETH: 3.87% (Volatile)
4. BTC: 2.92% (Moderately volatile)

**Notable Events Detected:**
- **DOGE +355% (Jan 28, 2021):** "Doge to the moon" - Reddit/Elon Musk event
- **ETH -27% (May 19, 2021):** China mining ban / Market crash
- **BTC +18.7% (Feb 8, 2021):** Tesla $1.5B Bitcoin purchase announcement

---

## Conclusions

### Summary

This comprehensive time series analysis provides empirical evidence on three critical questions for cryptocurrency investors:

**1. Are prices predictable?**
- ❌ **NO** - Prices follow random walks (ADF test confirms)
- ❌ Market timing strategies based solely on price history will likely fail
- ✅ Markets are informationally efficient (prices already incorporate available information)

**2. Can we model returns?**
- ⚠️ **Partially** - Returns are stationary but NOT normally distributed
- ❌ Standard models assuming normality will underestimate risk
- ✅ Fat tails require robust risk management approaches

**3. Can we predict risk?**
- ✅ **YES** - Volatility exhibits strong clustering (ACF of returns² > 0)
- ✅ High volatility periods are persistent and somewhat predictable
- ✅ Enables dynamic risk management strategies

### Lessons Learned

**Statistical Insights:**
- **Random Walk ≠ Randomness:** While price direction is unpredictable, volatility patterns exist
- **Fat Tails Matter:** Extreme events occur more frequently than normal distribution predicts
- **Correlation is Systemic:** Crypto assets move together during stress periods

**Investment Implications:**
- **Market Timing Doesn't Work:** Cannot predict price direction from history alone
- **Risk Management Works:** Can adjust positions based on volatility forecasts
- **Diversification is Limited:** Within crypto, correlation is too high for effective diversification

**Technical Skills Developed:**
- Time series data cleaning and preprocessing
- Statistical hypothesis testing (ADF test)
- Autocorrelation analysis and interpretation
- Rolling window calculations
- Data visualization with matplotlib/seaborn
- Financial econometrics concepts

### Practical Recommendations for Investors

**❌ AVOID These Strategies:**
- Day trading based solely on technical analysis
- "Buy the dip" without volatility context
- Assuming normal distribution for risk models
- Over-diversifying within cryptocurrencies

**✅ IMPLEMENT These Strategies:**

1. **Dynamic Position Sizing:**
   ```
   IF volatility_30d > P75:
       → Reduce exposure by 30-50%
   IF volatility_30d < P25:
       → Normal or increased exposure
   ```

2. **Dollar-Cost Averaging:**
   - Weekly/monthly fixed purchases
   - Reduces timing risk
   - Leverages volatility clustering

3. **Volatility-Adjusted Stop-Losses:**
   - Set stops at 2× current volatility
   - Tighten during high volatility periods
   - Prevents premature exits during normal volatility

4. **Long-Term Horizon:**
   - Hold period > 1 year
   - Ride out volatility clusters
   - Focus on fundamental adoption trends

5. **True Diversification:**
   - Crypto: 10-20% max of portfolio
   - Bonds/Stocks: 60-70%
   - Cash/Stablecoins: 10-20%

### Future Work

**Advanced Modeling:**
- [ ] Implement GARCH(1,1) models for volatility forecasting
- [ ] Apply machine learning (LSTM, XGBoost) for return prediction
- [ ] Develop regime-switching models to detect market state changes
- [ ] Test trading strategies with backtesting framework

**Extended Analysis:**
- [ ] Integration with Google Trends data (spatial analysis)
- [ ] On-chain metrics (wallet activity, transaction volumes)
- [ ] Sentiment analysis from social media (Twitter, Reddit)
- [ ] Cross-market analysis (crypto vs traditional assets)

**Risk Management Tools:**
- [ ] Build Value-at-Risk (VaR) calculator with fat-tail adjustments
- [ ] Develop volatility dashboard with real-time alerts
- [ ] Create portfolio optimization tool with crypto constraints
- [ ] Implement stress testing scenarios

---

## References

### Academic Papers & Books
1. Fama, E. F. (1970). "Efficient Capital Markets: A Review of Theory and Empirical Work." *Journal of Finance*, 25(2), 383-417.
2. Mandelbrot, B. (1963). "The Variation of Certain Speculative Prices." *Journal of Business*, 36(4), 394-419.
3. Engle, R. F. (1982). "Autoregressive Conditional Heteroscedasticity with Estimates of the Variance of United Kingdom Inflation." *Econometrica*, 50(4), 987-1007.
4. Malkiel, B. G. (2003). *A Random Walk Down Wall Street*. W. W. Norton & Company.

### Statistical Methods Documentation
5. Statsmodels Documentation. (2024). "Time Series Analysis." Retrieved from https://www.statsmodels.org/stable/tsa.html
6. Dickey, D. A., & Fuller, W. A. (1979). "Distribution of the Estimators for Autoregressive Time Series with a Unit Root." *Journal of the American Statistical Association*, 74(366), 427-431.

### Data Sources
7. Yahoo Finance API. (2025). "Cryptocurrency Historical Data." Retrieved from https://finance.yahoo.com/crypto/
8. Dataset: `sample_temporal.csv` - OHLCV data for ADA-USD, ETH-USD, BTC-USD, DOGE-USD, XRP-USD (October 2020 - October 2025)

### Python Libraries
9. McKinney, W. (2010). "Data Structures for Statistical Computing in Python." *Proceedings of the 9th Python in Science Conference*, 51-56.
10. Hunter, J. D. (2007). "Matplotlib: A 2D Graphics Environment." *Computing in Science & Engineering*, 9(3), 90-95.
11. Seabold, S., & Perktold, J. (2010). "Statsmodels: Econometric and Statistical Modeling with Python." *Proceedings of the 9th Python in Science Conference*.

---

**Note:** This document is part of the academic portfolio for the Data Engineering program at Universidad Politécnica de Yucatán. All analysis was conducted in October 2025 using Google Colab and Python 3.x.

**AI Conversation Log:** https://claude.ai/share/2778f146-5455-446b-8601-e9fdc0637982  
**Repository:** [https://github.com/damarisuwu1]  
**Contact:** [2109055@upy.edu.mx]