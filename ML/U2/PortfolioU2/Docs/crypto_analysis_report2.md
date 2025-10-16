# Cryptocurrency spatial and spatio-temporal analysis: Regional analysis and Cross-Correlation Function in global interest in cryptos 

**Author(s):** [Ariel Joel Buenfil Góngora]  
**Date:** October 2025  
**Course:** Visual Modeling Information  
**Program:** Data Engineering  
**Institution:** Universidad Politécnica de Yucatán  

---

## AI Assistance Disclosure

This document was created with assistance from AI tools. The following outlines the nature and extent of AI involvement:

- **AI Tool Used:** Gemini (Google) - Gemini Flash 2.5
- **Overall AI Contribution:** ~55% (Code generation, documentation among the code, statistical guidance)
- **Overall Human Contribution:** ~45% (Analysis, execution, code structure, verification, customization, conclusions)

### Detailed Breakdown by Component:

| Component | AI % | Human % | Details |
|-----------|------|---------|---------|
| **Python Code** | 60% | 30% | AI generated complete code structure; Human customized parameters and executed |
| **Statistical Methodology** | 70% | 30% | AI suggested ADF/ACF approach; Human selected significance levels and interpreted context |
| **Data Visualization** | 80% | 20% | AI created visualization code; Human selected which graphs to use and customized aesthetics |
| **Results Interpretation** | 40% | 60% | AI provided statistical framework; Human analyzed patterns and business implications |
| **Documentation** | 60% | 40% | AI structured report template; Human added specific findings and personalized conclusions |
| **Crypto interest findings** | 30% | 70% | AI suggested risk management concepts; Human adapted to practical investment scenarios |

### Type of Assistance:
- **Code Generation (60% AI):** Complete Python scripts for data processing, statistical tests, and visualization.
- **Statistical Guidance (70% AI):** Methodology selection (CCF approach and Normalization techniques).
- **Debugging (55% AI):** Fixed minimum data manipulation code and data structure issues.
- **Documentation (60% AI):** Report structure, academic formatting, and technical descriptions.
- **Interpretation (40% AI):** Framework for analyzing results; human provided context-specific insights.

### Human Contribution Details:
- ✅ **Dataset Selection:** Chose specific cryptocurrencies (ADA, ETH, BTC, DOGE, XRP) based on market relevance, as well as target countries from a public Geodataset.
- ✅ **Code Execution:** Ran, debugged, and validated all code snippets in Jupyter Notebook.
- ✅ **Parameter Customization:** Normalization ranges, lag windows, significance levels.
- ✅ **Results Verification:** Logic checks on statistical outputs represented in visualizations.
- ✅ **Pattern Recognition:** Identified volatility clustering periods, correlated in the global interest spikes.
- ✅ **Business Context:** Connected statistical findings to investment implications, specially from a geographical perspective.
- ✅ **Critical Thinking:** Logical reasoning about lead/lag relationships and their practical meaning, as well as interests and volatility veracity over time.
- ✅ **Practical Recommendations:** Developed specific investment strategies based on findings.

**Academic Integrity Statement:** 

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

This project conducts a comprehensive spatial and spatio-temporal analysis of the interest and volatility of the five major cryptocurrencies (ADA, ETH, BTC, DOGE, XRP) over a 5-year period (2020-2025) among selected countries. The analysis aims to answer critical questions for retail investors interested in the regional behavior of cryptocoins: **Do certain countries share the same interest in a cryptocoin?** 

**Business Context:** Cryptocurrencies have experienced explosive growth since 2017, with high volatility and variable adoption globally. Retail investors need to understand temporal price patterns to make informed investment decisions, specially if their decision depends on their location or the investment plan involves greographical strategy. Additionally, a good hint to know if is worth to invest in a cryptocoin, is to take a look at the most active countries related with this topic.

---

## Objectives

- [x] **Objective 1:** Characterize regional interest in a selected set of cryptocurrencies using Google Trends data (per-country cumulative interest).
- [x] **Objective 2:** Produce spatial visualizations (choropleth) showing cumulative interest by country.
- [x] **Objective 3:** Construct region-level time series of normalized interest and compare with global BTC price dynamics.
- [x] **Objective 4:** Compute a spatio-temporal relationship (lead/lag) between global interest and market volatility (BTC weekly volatility) using Cross-Correlation Function (CCF).
- [x] **Objective 5:** Provide practical recommendations for retail investors based on spatial and spatio-temporal evidence.

---

## Methodology

### Data Sources
- **Dataset 1:** `sample_temporal.csv` - Historical OHLCV data for 5 cryptocurrencies
  - **Period:** October 11, 2020 to October 11, 2025 (~1,827 daily observations)
  - **Cryptocurrencies:** ADA-USD, ETH-USD, BTC-USD, DOGE-USD, XRP-USD
  - **Variables:** Open, High, Low, Close, Volume (daily)
  - **Source:** Yahoo Finance API (historical cryptocurrency prices)
- **Dataset 2:** `trends_fixed.csv` - Historical trending search data for 5 cryptocurrencies and 1 related keyword (Cryptocurrency) per country (October 2020 - October 2025)
  - **Period:** October 11, 2020 to October 11, 2025 (~1,827 daily observations)
  - **Cryptocurrencies:** Bitcoin, Ethereum, Ripple, Cardano, Dogecoin, Criptocurrency
  - **Variables:** weekly date, country, keyword, interest
  - **Source:** Google Trends API (historical search trending)
- **Dataset 3:** `https://naturalearth.s3.amazonaws.com/110m_cultural/ne_110m_admin_0_countries.zip` - Geographical data of the entire world.
  - **Period:** N/A
  - **Selected ountries:** United States, Mexico, Brazil, Germany, United Kingdom, Singapore, China, South Korea, Japan, India.
  - **Source:** `https://naturalearth.s3.amazonaws.com/110m_cultural/ne_110m_admin_0_countries.zip`

### Tools and Technologies
- **Programming Language:** Python 3.13.1
- **Environment:** Jupyter Notebook - Python Kernel 3.13.1
- **Core Libraries:** 
  - `pandas` & `geopandas` - Data manipulation and spatial operations
  - `numpy` - Numerical computations
  - `plotly.express` & `plotly.graph_objects`- Data visualization
  - `statsmodels` - Statistical tests (CCF)
- **Statistical Tests:**
  - Test results retrieved from the temporal analysis.
  - Cross-Correlation Function to calculate the correlation between volatility and global interest in a cryptocoin.

### Approach

Five-phase analysis pipeline (temporal + spatial integrated):

1. Phase 1 — Temporal EDA and diagnostics: clean OHLCV, compute returns, ADF, ACF, rolling volatility, rank assets by volatility and return. (More details in the crypto_analysis_report1.md)
2. Phase 2 — Spatial EDA: load Natural Earth, ingest trends per country, compute cumulative interest and per-keyword shares, build choropleth maps.
3. Phase 3 — Regional time-series: aggregate weekly interest per country; normalize per-country interest (0–100) and build dual-axis time series vs BTC price.
4. Phase 4 — Spatio-temporal correlation: compute country-level metrics (Total Interest, Volatile Asset Ratio) and visualize cross-country preference vs engagement; compute CCF between global weekly interest change and BTC weekly volatility change.
5. Phase 5 — Synthesis and recommendations: combine spatial and temporal evidence to present investor guidance and propose next steps (GARCH, Granger causality, realtime alerting).

---

## Implementation

### Phase 1: Exploratory Data Analysis (temporal)
- Load `sample_temporal.csv`, drop the extra header rows and parse Date column.
- Extract OHLCV per asset (BTC-USD, ETH-USD, ADA-USD, DOGE-USD, XRP-USD).
- Compute simple and log returns, descriptive statistics (mean, std, kurtosis, skewness), and Sharpe-like metric (annualized).
- Stationarity tests: ADF on prices (many series behave as random walks) and returns (returns are stationary).
- ACF diagnostics: prices show slow decay (random walk), returns ~0 autocorrelation, returns² show significant positive ACF (volatility clustering).
- Rolling volatility (7d, 30d, 90d) computed and visualized; high-volatility periods flagged using percentile thresholds (P75, P90).

Key code fragments executed in notebook:
- returns calculation, rolling std, adfuller tests, plot_acf on price/returns/returns².

### Phase 2: Spatial EDA
- Load Natural Earth country geometries via geopandas.
- Load `trends_fixed.csv` (weekly interest by country and keyword).
- Select focus countries (ISO A2): US, MX, BR, CN, JP, DE, GB, IN, KR, SG.
- Aggregate total interest per country over the 5-year period:
  - Constructed `interests_df` with columns ISO_A2 and Interest (cumulative interest).
- Merge with spatial geometries to produce `geo_interests_df`.
- Generated interactive choropleth (Plotly) showing cumulative search interest by country using `geo_interests_df.geometry` and `Interest` as color scale.
- Note: SG was removed in one cleaning step in the notebook due to how the sample was constructed; final geo dataframe has interest filled with zeros where missing.

Code summary (not exhaustive):
- geopandas.read_file(...) → spatial dataframe
- trends_df.groupby('country')['interest'].sum() → per-country totals
- spatial_df.merge(interests_df, on='ISO_A2', how='left') → geo_interests_df
- px.choropleth_map(...) → interactive choropleth (fig.show() in notebook)

### Phase 3: Time series by region
- Mapped weekly trends to ISO codes and grouped by (date, ISO_A2) to compute Total_Weekly_Interest per country.
- Resampled BTC daily prices to weekly (`W-SUN`) to provide a price context.
- Normalized series:
  - Per-country interest normalized to 0–100 (group-wise min/max).
  - BTC weekly price normalized to 0–100 globally.
- Built interactive dual-axis time series per selected country (example: MX):
  - Left axis: normalized BTC price index (context).
  - Right axis: normalized weekly country interest index.
- Built cumulative performance indices (base 100) for assets using cumulative sum of log returns for comparative visualization.

Key outputs:
- regional_temporal_df with columns ['date', 'ISO_A2', 'Total_Weekly_Interest', 'Norm_Interest', 'BTC_Close', 'Norm_BTC_Price']
- Interactive time-series figure per country (change `selected_country_iso` variable to inspect other countries)

### Phase 4: Spatio-temporal analysis and cross-country metrics
- Computed per-country keyword pivot totals (ISO_A2 x keyword) and derived:
  - Total_Interest (sum all keywords)
  - Volatile_Interest (sum interest over volatile assets: Bitcoin, Ripple, Cardano, Dogecoin)
  - Volatile_Ratio = Volatile_Interest / Total_Interest (expressed as percent) — proxy of country preference for higher-risk assets
- Built interactive scatter plot (Total_Interest vs Volatile_Ratio) where point size = Total_Interest and label = ISO code. Added global BTC average volatility annotation as context.

Interpretation:
- Countries in the upper-right (high total interest, high volatile ratio) indicate strong engagement and preference for speculative assets — higher retail risk appetite or larger retail attention.
- Correlations of country volatility preferences confirm that global market volatility acts as a common driver (volatility measures are highly correlated across assets).

### Phase 5: Spatio-temporal lead/lag (Cross-Correlation Function)
- Objective: determine lead/lag relationship between global weekly search interest (X) and BTC weekly realized volatility (Y).
- Steps in notebook:
  1. Compute daily BTC log returns and aggregate weekly realized volatility = weekly std of daily log returns.
  2. Aggregate global weekly interest by summing the trends interest across countries and keywords.
  3. Align series on weekly dates and enforce stationarity by taking week-over-week percent changes for both series.
  4. Compute Cross-Correlation Function (CCF) up to ±52 weeks; build a symmetric lag vector and a `ccf_full` series.
  5. Plot results with 95% significance bounds approx = 1.96 / sqrt(N).

Key numeric highlights (noted in notebook output):
- Strongest observed peak ≈ 0.2228 (noted in notebook).
- Contemporaneous correlation (lag 0) ≈ −0.0138 (very weak and near zero).
- Negative lags (X leads Y): implies global interest changes sometimes precede changes in BTC volatility.
- Positive lags (Y leads X): implies volatility changes sometimes precede public interest spikes.

Visualization:
- Interactive plot (Plotly) showing CCF across lags with shaded areas marking interpretation regions:
  - Negative lags region: "Interest Predicts Volatility"
  - Positive lags region: "Volatility Predicts Interest"
  - Central region: "Contemporaneous"

---

## Results

### Key Findings (spatial & spatio-temporal)

1. Regional engagement varies materially across countries.
   - Evidence: Choropleth of cumulative interest (geo_interests_df) highlights top-engaged countries (US, MX, BR, GB, IN among focus group).
   - Implication: Market marketing and adoption strategies should prioritize the highest-engagement countries; liquidity and retail flow may concentrate there.
   - Consistency: Matches expected internet-search intensity patterns.

2. Countries differ in preference for volatile assets (risk appetite proxy).
   - Evidence: Scatter (Total_Interest vs Volatile_Ratio) identifies countries with high engagement and high volatile-asset preference.
   - Implication: These countries are potential sources of sudden retail-driven demand spikes (FOMO events); they may amplify market rallies and crashes.
   - Risk Impact: High volatile-ratio countries increase systemic retail-driven short-term demand sensitivity.

3. Temporal coupling between global interest and market volatility shows lead/lag structure.
   - Evidence: CCF peak ≈ 0.2228 at a particular lag (noted in notebook). Lag 0 correlation near −0.0138 indicates essentially no contemporaneous linear relation.
   - Interpretation:
     - Negative lag peaks indicate that increases in global search interest occasionally precede increases in BTC volatility (interest → volatility).
     - Positive lag peaks indicate that spikes in volatility can precede increases in global interest (volatility → interest).
   - Practical meaning: Search interest can act as an early-warning signal for future volatility in some cases; conversely, market turbulence triggers subsequent public interest spikes.

4. Spatial and temporal signals are complementary for risk monitoring.
   - Evidence: High-engagement, high-volatile-ratio countries are often the earliest amplifiers of interest-driven volatility spikes.
   - Implication: Combine per-country monitoring (spatial) with CCF-based lead indicators (temporal) to create actionable alerts.

### Visualizations Generated
1. Choropleth map: Global Crypto Engagement (2020–2025) by Total Search Interest (interactive, Plotly).
2. Scatter: Total Engagement vs Preference for Volatile Assets (country-level).
3. Regional time series (dual-axis): Normalized weekly country interest vs normalized BTC weekly price (interactive).
4. Comparative cumulative performance chart for cryptos (normalized to base 100).
5. Cross-Correlation Function (CCF) between Global Interest change and BTC volatility change (lags ±52 weeks).
6. Supporting static plots: ACFs, returns distributions, rolling volatility panels.

### Compact performance snapshot (temporal results already computed)
| Cryptocurrency | Avg Return (%) | Volatility (%) | Sharpe Ratio | Total Change (%) |
|----------------|----------------|----------------|--------------|------------------|
| **DOGE-USD** | 0.56 | 10.83 | 0.99 | +7,124% |
| **ADA-USD** | [Similar] | [8-10] | [~1.0] | [High] |
| **ETH-USD** | 0.21 | 4.15 | 0.98 | +919% |
| **BTC-USD** | 0.17 | 3.11 | 1.07 | +884% |
| **XRP-USD** | [Similar] | [4-6] | [~0.8] | [High] |

**Interest ranking (5 years timeframe, example):**
- Top aggregated engagement: United States (US), Mexico (MX), Brazil (BR), United Kingdom (GB), India (IN)

**Notable spatio-temporal events detected:**
- Several high-volatility windows (P90) align with interest surges in high-engagement countries — consistent with the CCF lead/lag interpretation.

---

## Conclusions

### Summary — Answers to business questions

1. Do certain countries share the same interest in a cryptocoin?
   - Yes. Aggregate interest and keyword pivots show clusters of high engagement (US, MX, BR, GB, IN). Countries also differ in relative preference for volatile assets (volatile_ratio), indicating not only volume but composition differences.

2. Can spatial interest be used to anticipate market volatility?
   - Partially. The CCF analysis shows non-negligible lead-lag relationships: in some lags, interest changes precede volatility changes (negative lags), which supports the use of interest as an early-warning indicator when combined with additional filters (thresholds, country weights). Lag-0 correlation is near-zero, so contemporaneous changes are weak.

3. What practical monitoring strategy follows from these results?
   - Combine spatial monitoring (per-country total interest and volatile_ratio) with CCF-led indicators on global interest to build tiered alerts:
     - Tier 1: Large sudden increases in interest in high volatile-ratio countries → raise volatility watch.
     - Tier 2: Sustained interest growth across multiple regions → increase risk posture and consider hedges.
     - Tier 3: Confirm with volatility metrics (rolling 30d > P75/P90) before executing defensive actions.

### Lessons Learned

- Spatial heterogeneity matters: total search volume alone is not enough; composition (preference for volatile assets) is a key differentiator.
- Spatio-temporal signals are useful but noisy: CCF reveals statistically meaningful peaks, yet effect sizes are moderate (peak ~0.22).
- Stationarity and aggregation choices (weekly aggregation, differencing) materially affect CCF results — preprocessing must be consistent and reproducible.

### Technical Skills Developed
- Integrating geopandas geometries with trends data for choropleths.
- Normalizing per-country time series for comparative visualization.
- Computing and interpreting CCF with correct stationarity enforcement (differencing).
- Building interactive Plotly visualizations for spatial and spatio-temporal diagnostics.

### Practical Recommendations for Investors / Product Owners

1. Build an interest-based monitoring dashboard:
   - Real-time ingestion of search interest (or proxies) for focus countries.
   - Display Total_Interest, Volatile_Ratio, and rolling volatility; flag P75/P90 exceedances.

2. Use interest as an early-warning (not an execution signal):
   - Combine interest surges from high volatile-ratio countries with volatility upticks to trigger hedging or reduced exposure.

3. Adjust risk sizing dynamically:
   - If rolling 30d volatility > P75 and interest surge persists → reduce exposure by 30–50%.

4. Prioritize market outreach and education in high-engagement countries:
   - High interest + high volatile_ratio suggests both opportunity and responsibility (retail education, risk warnings).

5. For trading desks: use CCF results to design distributed-lag risk models (monitor lags where interest leads volatility).

### Limitations
- Google Trends data are normalized and sampled; absolute comparability across keywords/countries has constraints.
- Aggregation choices (weekly alignment) affect CCF; results are sensitive to resampling and differencing choices.
- Results are correlational; causality would require Granger tests or structural modelling.

---

## Future Work

- Run Granger causality tests at country and global levels to assess predictive power formally.
- Implement GARCH-family models (GARCH, EGARCH) for conditional volatility forecasts and compare with interest-driven indicators.
- Build a real-time streaming pipeline for trends ingestion and volatility computation to enable operational alerts.
- Extend analysis to more countries and include language/region-specific keywords for better coverage.
- Explore panel models and distributed-lag specifications to quantify country contributions to global volatility.

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
8. Dataset 1: `sample_temporal.csv` - OHLCV data for ADA-USD, ETH-USD, BTC-USD, DOGE-USD, XRP-USD (October 2020 - October 2025)
9. Dataset 2: `trends_fixed.csv` -  Historical trending search data for 5 cryptocurrencies and 1 related keyword (Cryptocurrency) per country (October 2020 - October 2025)
10. Dataset 3: Natural Earth country geometries - Retrieved from `https://naturalearth.s3.amazonaws.com/110m_cultural/ne_110m_admin_0_countries.zip`

### Python Libraries
11. McKinney, W. (2010). "Data Structures for Statistical Computing in Python." *Proceedings of the 9th Python in Science Conference*, 51-56.
12. Hunter, J. D. (2007). "Matplotlib: A 2D Graphics Environment." *Computing in Science & Engineering*, 9(3), 90-95.
13. Seabold, S., & Perktold, J. (2010). "Statsmodels: Econometric and Statistical Modeling with Python." *Proceedings of the 9th Python in Science Conference*.

---

**Note:** This document is part of the academic portfolio for the Data Engineering program at Universidad Politécnica de Yucatán. All analysis was conducted in October 2025 using Jupyter Notebook and Python 3.13.1

**AI Conversation Log:** https://gemini.google.com/share/fad0cfedcf8b  
**Repository:** [https://github.com/areo-17]  
**Contact:** [2209025@upy.edu.mx]