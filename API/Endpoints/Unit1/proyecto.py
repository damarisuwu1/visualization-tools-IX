import traceback
import pandas as pd
from flask_restful import Resource
from ..Utils.collections import MongoCollections
from ..Utils.tables import PostgresTables

class Proyecto_1(Resource):
    # =============== CONSTRUCTOR ===============
    def __init__(self):
        self.mongo = MongoCollections()
        self.postgres = PostgresTables()
        
        try:
            response, code = self.postgres.get(table_name='tech_salaries')
            if code != 200:
                raise Exception("Error al obtener datos de PostgreSQL")
            
            self.df = pd.DataFrame(response['data'])
            self.df['salary_in_usd'] = pd.to_numeric(self.df['salary_in_usd'])
            self.df['work_year'] = pd.to_numeric(self.df['work_year'])
            self.df['period'] = self.df['work_year'].apply(lambda year: 'postAI' if year >= 2023 else 'preAI')
            
            self.exp_level_map = {'EN': 'Entry Level', 'MI': 'Mid-Level', 'SE': 'Senior', 'EX': 'Executive'}
            self.company_size_map = {'S': 'Startup (S)', 'M': 'Medium (M)', 'L': 'Large (L)'}
            self.country_map = {
                'US': 'United States', 'GB': 'United Kingdom', 'CA': 'Canada',
                'DE': 'Germany', 'AU': 'Australia', 'NL': 'Netherlands', 'ES': 'Spain',
                'FR': 'France'
            }
            self.df_filtered = self.df[self.df['experience_level'].isin(self.exp_level_map.keys())]
            self.df_filtered_geo = self.df[self.df['employee_residence'].isin(self.country_map.keys())]

        except Exception as e:
            self.df = pd.DataFrame()
            self.df_filtered = pd.DataFrame()
            self.df_filtered_geo = pd.DataFrame()
            print(f"ADVERTENCIA: No se pudieron cargar los datos. {e}")

    # =============== METODOS PRIVADOS ===============
    def _calculate_growth(self, pre_val, post_val):
        if pre_val > 0:
            return round(((post_val - pre_val) / pre_val) * 100, 1)
        return 0

    def __distributional(self):
        if self.df_filtered.empty: return {}
        avg_salary = self.df_filtered.groupby(['period', 'experience_level'])['salary_in_usd'].mean().unstack().fillna(0)
        labels = [self.exp_level_map[level] for level in self.exp_level_map.keys() if level in avg_salary.columns]
        pre_ai_data, post_ai_data, growth_data = [], [], []

        for level_code in self.exp_level_map.keys():
            if level_code in avg_salary.columns:
                pre_val = int(avg_salary.loc['preAI', level_code]) if 'preAI' in avg_salary.index else 0
                post_val = int(avg_salary.loc['postAI', level_code]) if 'postAI' in avg_salary.index else 0
                pre_ai_data.append(pre_val)
                post_ai_data.append(post_val)
                growth_data.append(self._calculate_growth(pre_val, post_val))

        return {
            "labels": labels,
            "preAI": {"label": "Pre-AI Era (2020-2022)", "data": pre_ai_data, "color": "#94a3b8"},
            "postAI": {"label": "Post-AI Era (2023-2025)", "data": post_ai_data, "color": "#3b82f6"},
            "growth": growth_data
        }

    def __work_modalities(self):
        if self.df.empty: return {}
        modality_counts = self.df.groupby(['work_year', 'remote_ratio']).size().unstack(fill_value=0)
        all_modalities = [0, 50, 100]
        modality_counts = modality_counts.reindex(columns=all_modalities, fill_value=0)
        total_per_year = modality_counts.sum(axis=1)
        modality_percentage = modality_counts.div(total_per_year, axis=0).fillna(0) * 100
        years = sorted(self.df['work_year'].unique())
        return {
            "labels": [str(year) for year in years],
            "datasets": [
                {"label": "On-site", "data": modality_percentage[0].reindex(years, fill_value=0).round().tolist(), "color": "#e74c3c"},
                {"label": "Hybrid", "data": modality_percentage[50].reindex(years, fill_value=0).round().tolist(), "color": "#2ecc71"},
                {"label": "Remote", "data": modality_percentage[100].reindex(years, fill_value=0).round().tolist(), "color": "#3498db"}
            ]
        }

    def __geographic(self):
        if self.df_filtered_geo.empty: return {}
        avg_salary = self.df_filtered_geo.groupby(['period', 'employee_residence'])['salary_in_usd'].mean().unstack().fillna(0)
        labels = [self.country_map[code] for code in self.country_map.keys() if code in avg_salary.columns]
        pre_ai_data, post_ai_data, growth_data = [], [], []

        for country_code in self.country_map.keys():
            if country_code in avg_salary.columns:
                pre_val = int(avg_salary.loc['preAI', country_code]) if 'preAI' in avg_salary.index else 0
                post_val = int(avg_salary.loc['postAI', country_code]) if 'postAI' in avg_salary.index else 0
                pre_ai_data.append(pre_val)
                post_ai_data.append(post_val)
                growth_data.append(self._calculate_growth(pre_val, post_val))

        return {
            "labels": labels,
            "preAI": {"label": "Pre-AI Era (2020-2022)", "data": pre_ai_data, "color": "#94a3b8"},
            "postAI": {"label": "Post-AI Era (2023-2025)", "data": post_ai_data, "color": "#3b82f6"},
            "growth": growth_data
        }

    def __roles(self):
        if self.df.empty: return {}
        target_roles = ["Data Scientist", "Machine Learning Engineer", "Data Engineer", "Data Analyst", "AI Scientist"]
        df_roles = self.df[self.df['job_title'].isin(target_roles)]
        
        if df_roles.empty:
            return {
                "labels": target_roles,
                "preAI": {"label": "Pre-AI Era (2020-2022)", "data": [0]*len(target_roles), "color": "#94a3b8"},
                "postAI": {"label": "Post-AI Era (2023-2025)", "data": [0]*len(target_roles), "color": "#3b82f6"},
                "growth": [0]*len(target_roles)
            }
        
        avg_salary = df_roles.groupby(['period', 'job_title'])['salary_in_usd'].mean().unstack().fillna(0)
        pre_ai_data, post_ai_data, growth_data, labels = [], [], [], []

        for role in target_roles:
            if role in avg_salary.columns:
                labels.append(role)
                pre_val = int(avg_salary.loc['preAI', role]) if 'preAI' in avg_salary.index else 0
                post_val = int(avg_salary.loc['postAI', role]) if 'postAI' in avg_salary.index else 0
                pre_ai_data.append(pre_val)
                post_ai_data.append(post_val)
                growth_data.append(self._calculate_growth(pre_val, post_val))

        return {
            "labels": labels,
            "preAI": {"label": "Pre-AI Era (2020-2022)", "data": pre_ai_data, "color": "#94a3b8"},
            "postAI": {"label": "Post-AI Era (2023-2025)", "data": post_ai_data, "color": "#3b82f6"},
            "growth": growth_data
        }

    def __company(self):
        if self.df.empty: return {}
        df_post_ai = self.df[self.df['period'] == 'postAI']
        avg_salary = df_post_ai.groupby('company_size')['salary_in_usd'].mean()
        labels = [self.company_size_map[size] for size in self.company_size_map.keys() if size in avg_salary.index]
        data = [int(avg_salary[size]) for size in self.company_size_map.keys() if size in avg_salary.index]
        return {
            "labels": labels,
            "data": data,
            "colors": ["#ef4444", "#f59e0b", "#10b981"],
            "description": "Post-AI Era (2023-2025)"
        }

    def __temporal(self):
        if self.df_filtered.empty: return {}
        avg_salary = self.df_filtered.groupby(['work_year', 'experience_level'])['salary_in_usd'].mean().unstack().fillna(0)
        years = sorted(self.df['work_year'].unique())
        datasets = []
        colors = {"EN": "#3498db", "MI": "#2ecc71", "SE": "#e74c3c", "EX": "#34495e"}

        for level_code, level_name in self.exp_level_map.items():
            if level_code in avg_salary.columns:
                data = avg_salary[level_code].reindex(years, fill_value=0).round().astype(int).tolist()
                datasets.append({
                    "label": level_name,
                    "data": data,
                    "color": colors.get(level_code, "#9b59b6")
                })
        
        return {
            "labels": [str(year) for year in years],
            "datasets": datasets
        }

    # =============== METODOS PUBLICOS ===============
    def get(self):
        if self.df.empty:
             return {
                "status": "error", "info": "No se pudieron cargar o procesar los datos.",
                "detalles": "Verifique que la tabla 'tech_salaries' exista y contenga datos."
            }, 500
        
        try:
            return {
                "status": "success",
                "info": {
                    "distributional": self.__distributional(),
                    "workModalities": self.__work_modalities(),
                    "geographic": self.__geographic(),
                    "roles": self.__roles(),
                    "company": self.__company(),
                    "temporal": self.__temporal(),
                }
            }, 200
        except Exception as e:
            return {"status": "error", "info": "Fallo el metodo GET", "detalles": traceback.format_exc().splitlines()}, 500