
# **Portfolio Unit 2: Spatiotemporal Analysis of Cryptocurrency Volatility and Public Interest**

## 👥 **Team Information**
| Full Name |
 :--- |
| Damaris Dzul and Ariel Buenfil|

## 📝 **Project Description**

This project undertakes a comprehensive spatiotemporal analysis to explore the intricate relationship between cryptocurrency market volatility and global public interest. The primary objective is to determine if patterns in public curiosity, as measured by Google Search Trends, correlate with or predict fluctuations in the cryptocurrency market. The analysis leverages time-series statistical methods to uncover temporal dependencies and geospatial visualization techniques to map the geographical distribution of interest in cryptocurrencies like Bitcoin and Ethereum. The core of this investigation is documented in the `03_spatiotemporal_analysis_fixed.ipynb` notebook, which provides a step-by-step walkthrough of the data processing, analysis, and visualization workflow.

## 📁 **Project Structure**

The project is organized into a main analysis notebook and a dedicated data directory. This structure ensures a clean separation between the code and the data, facilitating reproducibility and clarity.

```
ML/U2/PortfolioU2/
├── 📂 data/
│   ├── 📄 acf_returns_squared.json
│   ├── 📄 ccf_full.json
│   ├── 📄 correlation.json
│   ├── 📄 interests.json
│   ├── 📄 map_data.csv
│   ├── 📄 sample_temporal.csv
│   ├── 📄 trends.csv
│   ├── 📄 trends_fixed.csv
│   └── 📄 vol_stats.json
│
└── 📓 03_spatiotemporal_analysis_fixed.ipynb
```

## 🎯 **Analysis Goals & Workflow**

The main goal of this analysis is to answer the following questions:

1.  Is there evidence of **volatility clustering** in the cryptocurrency market?
2.  Is there a statistically significant **correlation** between public search interest and market volatility?
3.  What is the **global distribution** of public interest in cryptocurrencies?

The following section details the progress and evidence for each analytical step.

-----

### **Progress and Evidence**

#### 1\. Data Ingestion and Preprocessing

  * **Description:** The initial step involved loading two primary datasets: historical daily price data for cryptocurrencies and Google Trends data for related search terms. The financial data was processed to calculate daily returns. These returns were then squared to serve as a proxy for daily volatility, a standard practice in financial econometrics. The Google Trends data was cleaned and chronologically aligned with the price data for subsequent correlation analysis.
  * **Evidence:** Initial dataframes loaded and prepared for analysis within the notebook.
  * **Tools/Files:**
      * **Notebook:** `03_spatiotemporal_analysis_fixed.ipynb`
      * **Input Data:** `data/sample_temporal.csv`, `data/trends_fixed.csv`

#### 2\. Temporal Analysis: Volatility Clustering with Autocorrelation

  * **Description:** To investigate the presence of volatility clustering, we computed the Autocorrelation Function (ACF) on the squared returns. The ACF plot visualizes the correlation of the time series with its own past values. A slowly decaying ACF plot is a strong indicator of volatility clustering. Our analysis confirmed this phenomenon, revealing a persistent, slowly decaying autocorrelation structure.
  * **Evidence:** The Autocorrelation Function (ACF) plot for the squared returns, showing significant correlation at multiple lags.
    <br>
    \<img src="[https://i.imgur.com/vHq8u93.png](https://www.google.com/search?q=https://i.imgur.com/vHq8u93.png)" alt="ACF Plot of Squared Returns" width="600"/\>
    <br>
  * **Tools/Files:**
      * **Notebook:** `03_spatiotemporal_analysis_fixed.ipynb`
      * **Output Data:** `data/acf_returns_squared.json`

#### 3\. Temporal Analysis: Cross-Correlation with Google Trends

  * **Description:** We employed the Cross-Correlation Function (CCF) to measure the relationship between our two time series: market volatility and Google Search interest. The CCF plot helps identify if one series leads or lags the other. The analysis revealed a statistically significant correlation between the two, suggesting that spikes in public interest often coincide with or precede periods of high market turbulence.
  * **Evidence:** The Cross-Correlation Function (CCF) plot illustrating the correlation between volatility and search trends at various time lags.
  * **Tools/Files:**
      * **Notebook:** `03_spatiotemporal_analysis_fixed.ipynb`
      * **Output Data:** `data/ccf_full.json`, `data/correlation.json`

#### 4\. Spatiotemporal Analysis: Geographic Interest Distribution

  * **Description:** To add a spatial dimension, we aggregated Google Trends data by country to measure relative search interest globally and generated a choropleth world map. This visualization provides an intuitive understanding of which regions are hotspots of cryptocurrency interest. The map revealed high levels of interest in countries across South America, Africa, and Eastern Europe, highlighting the global nature of the cryptocurrency phenomenon.
  * **Evidence:** A choropleth world map displaying the geographical distribution of search interest.
  * **Tools/Files:**
      * **Notebook:** `03_spatiotemporal_analysis_fixed.ipynb`
      * **Output Data:** `data/interests.json`, `data/map_data.csv`

-----

## 🗂️ **Data Dictionary**

The `data/` directory contains all datasets generated and used throughout the analysis.

| File Name | Description |
| :--- | :--- |
| `acf_returns_squared.json` | Stores the results of the Autocorrelation Function (ACF) on the squared returns. |
| `ccf_full.json` | Contains the full output of the Cross-Correlation Function (CCF) between market volatility and search trends. |
| `correlation.json` | A JSON file holding the Pearson correlation coefficient between the primary time series. |
| `interests.json` | Aggregated Google Trends data showing relative search interest for cryptocurrencies by country. |
| `map_data.csv` | A processed CSV file formatted for direct use in creating the geospatial choropleth map visualization. |
| `sample_temporal.csv` | Raw historical daily price data for selected cryptocurrencies. |
| `trends.csv` / `trends_fixed.csv` | Raw and cleaned time-series data from Google Trends, respectively. |
| `vol_stats.json` | Contains descriptive statistics (mean, standard deviation, etc.) for the calculated daily volatility series. |

-----

## 🤖 **AI Disclosures**

During the development of this project, AI-powered tools were utilized to assist with the following tasks:

  * **Code Generation & Debugging:** AI was used as a programming assistant to generate boilerplate code, suggest optimizations, and help debug complex functions within the Jupyter Notebook.
  * **Documentation & Explanation:** AI tools were leveraged to generate clear and concise explanations for the statistical methods employed (ACF, CCF) and to help structure this README file in a professional and comprehensive manner.

All analytical conclusions and interpretations of the results were performed by the project team members.

-----

## 🚀 **Instructions to Run the Analysis**

To replicate this analysis, please follow the steps below.

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/monroyminerodiego/visualization-tools-IX.git
    cd visualization-tools-IX/ML/U2/PortfolioU2
    ```

2.  **Set Up a Virtual Environment (Recommended):**

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3.  **Install Required Libraries:**
    A `requirements.txt` file should be created containing the necessary libraries.

    ```bash
    pip install pandas numpy matplotlib statsmodels jupyter
    ```

4.  **Launch Jupyter Notebook:**

    ```bash
    jupyter notebook
    ```

5.  **Run the Notebook:**
    Open the `03_spatiotemporal_analysis_fixed.ipynb` file in the Jupyter interface and execute the cells sequentially from top to bottom. All data paths are relative and should work without modification.