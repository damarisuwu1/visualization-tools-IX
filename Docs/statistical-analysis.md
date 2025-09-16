# **Statistical Analysis**

### **1. Executive Summary**

* The primary objective of this phase was to perform a **comprehensive Exploratory Data Analysis (EDA)** to understand the data's quality, structure, and content.
* Data from three key datasets (`users.csv`, `viewing_sessions.csv`, and `content.json`) was processed, cleaned, and unified into a single `DataFrame`.
* The findings revealed a robust and high-quality dataset, providing significant insights into user demographics, viewing habits, and content preferences.

---

### **2. Data Quality Assessment**

A critical first task was to assess the quality of the raw data. The following key findings were made:

* **Data Integrity**: An initial inspection using the `.info()` method confirmed **no missing or null values** in the key columns of the datasets.
* **Data Type Consistency**:
    * Date columns (`registration_date` and `watch_date`) were initially loaded as `object` (text) and were converted to a `datetime` format.
    * Numerical and categorical columns were correctly loaded with their expected data types.
* **Data Unification**: The datasets were successfully merged into a single, comprehensive `df_final` `DataFrame`. This process involved:
    1.  Merging `df_users` and `df_viewing` on `user_id`.
    2.  Concatenating `df_movies` and `df_series` into a single `df_content` `DataFrame`.
    3.  Finally, merging the combined `df_combined` with `df_content` on `content_id`.

---

### **3. Descriptive Statistics and Key Metrics**

This section summarizes the main statistical findings.

#### **3.1 Central Tendency and Dispersion**

* The **average age** of users is **41.5 years**, with a standard deviation of 13.9, indicating a diverse age range.
* The average viewing session lasts **78.9 minutes**. The average completion percentage is **78.4%**, a strong indicator of viewer engagement.
* Total watch time shows significant variability, with a mean of **352.4 hours** but a high standard deviation, indicating a few highly engaged users.

#### **3.2 Analysis by Category**

* **Subscription Behavior**: **Premium** users show the highest engagement, with an average watch duration of **88.3 minutes**.
* **Geographic Trends**: **Mexico** and **Colombia** are the most active markets, with the highest number of viewing sessions.
* **Device Usage**: **Smart TV** is the preferred device for content consumption.

---

### **4. Visualizations of Data Distribution**

Visualizations were used to confirm and present the findings, making the data more accessible.

* **Histograms**: The graphs showed that `age` and `watch_duration_minutes` have relatively symmetrical distributions. In contrast, `total_watch_time_hours` is heavily skewed towards lower values, with a long tail representing highly engaged users.
* **Bar Charts**: These visualizations confirmed the dominance of the **Basic** subscription type, the strong market presence in **Mexico**, and the preference for **Smart TV** as a viewing device.

---
