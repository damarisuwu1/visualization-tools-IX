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

### **Interpretation of Descriptive Statistics**

This section provides a detailed interpretation of the calculated central tendency and dispersion measures for the key numerical variables.

---

#### **Age**
* **Central Tendency**: The **mean** (41.54) and **median** (42.0) are very similar. This suggests that the age distribution is fairly symmetrical, confirming the visual findings from the histogram.
* **Dispersion**: The **standard deviation** of nearly 14 years shows a moderate spread in the data. This indicates a variety of user ages, from young adults to older viewers, rather than a single concentrated demographic.

---

#### **Watch Duration (minutes)**
* **Central Tendency**: The **mean** (78.91) and **median** (79.0) are very close, indicating a balanced distribution. However, the **mode** is significantly higher at 167.0 minutes. This suggests that while average sessions are around 79 minutes, there's a specific, common peak for very long sessions, likely for feature-length movies or extended content.
* **Dispersion**: The **range** of 178 minutes (from 2 to 180) and a **standard deviation** of 45 minutes show that there is significant variability in how long users watch.

---

#### **Completion Percentage**
* **Central Tendency**: There is a notable difference between the **mean** (78.38%) and the **median** (84.50%). This suggests the distribution is left-skewed, meaning a large number of lower-completion-rate sessions are pulling the average down. The median, being higher, provides a more accurate picture of a typical user's engagement.
* **Dispersion**: The **range** of 90% (from 10% to 100%) and a **standard deviation** of 21.46% confirm a wide variation in how much content users complete.

---

#### **Total Watch Time (hours)**
* **Central Tendency**: The **mean** (352.37) is noticeably higher than the **median** (324.10). This indicates that the distribution is right-skewed, with a long tail of data points.
* **Dispersion**: The large **standard deviation** of 232.19 hours confirms a high degree of variability. This finding, along with the skewed distribution, points to the existence of a small group of **"super-users"** who have accumulated a very high number of viewing hours and are pulling the average up, while the majority of users watch less.

### Outlier Detection and Handling
An analysis was conducted using box plots to identify potential outliers in key numerical variables.

* Watch Duration (minutes): The box plot for watch_duration_minutes showed no significant outliers. This indicates that while session durations vary widely, they all fall within an expected range of user behavior, from short clips to full-length movies.
* Total Watch Time (hours): The box plot for total_watch_time_hours clearly identified a small number of outliers. These data points represent users who have an exceptionally high number of total viewing hours, significantly more than the majority of the user base.
* Decision: We will keep these outliers in the dataset. They are not considered data entry errors or inconsistencies. Instead, they represent a small but highly valuable segment of "super-users" who are extremely engaged with the platform. Removing them would lead to a skewed and incomplete understanding of the platform's most active users, a critical segment for business strategy.