import traceback
import pandas as pd
from flask_restful import Resource
from ..Utils.collections import MongoCollections
from ..Utils.tables import PostgresTables

class Proyecto_1(Resource):
    # =============== CONSTRUCTOR ===============
    def __init__(self):
        """
        Al inicializar, obtenemos todos los datos de la tabla 'tech_salaries'
        y los cargamos en un DataFrame de pandas para un análisis eficiente.
        """
        self.mongo = MongoCollections()
        self.postgres = PostgresTables()
        
        try:
            # 1. Obtener todos los datos de la tabla de salarios
            response, code = self.postgres.get(table_name='tech_salaries')
            if code != 200:
                raise Exception("Error al obtener datos de PostgreSQL")
            
            # 2. Convertir los datos a un DataFrame de pandas
            self.df = pd.DataFrame(response['data'])

            # 3. Pre-procesamiento y mapeos para facilitar el análisis
            # Asegurar que las columnas numéricas sean del tipo correcto
            self.df['salary_in_usd'] = pd.to_numeric(self.df['salary_in_usd'])
            self.df['work_year'] = pd.to_numeric(self.df['work_year'])

            # Crear columna para distinguir Pre-AI y Post-AI
            self.df['period'] = self.df['work_year'].apply(lambda year: 'postAI' if year >= 2023 else 'preAI')
            
            # Mapeos para las etiquetas de los gráficos
            self.exp_level_map = {'EN': 'Entry Level', 'MI': 'Mid-Level', 'SE': 'Senior', 'EX': 'Executive'}
            self.company_size_map = {'S': 'Startup (S)', 'M': 'Medium (M)', 'L': 'Large (L)'}
            self.country_map = {
                'US': 'United States', 'GB': 'United Kingdom', 'CA': 'Canada',
                'DE': 'Germany', 'AU': 'Australia', 'NL': 'Netherlands', 'ES': 'Spain',
                'FR': 'France'
            }
            # Filtrar el DataFrame para usar solo los niveles de experiencia y países mapeados
            self.df_filtered = self.df[self.df['experience_level'].isin(self.exp_level_map.keys())]
            self.df_filtered_geo = self.df[self.df['employee_residence'].isin(self.country_map.keys())]


        except Exception as e:
            # Si hay un error (ej. la tabla no existe), inicializamos un df vacío
            self.df = pd.DataFrame()
            self.df_filtered = pd.DataFrame()
            self.df_filtered_geo = pd.DataFrame()
            print(f"ADVERTENCIA: No se pudieron cargar los datos. {e}")

    # =============== METODOS PRIVADOS ===============
    def _calculate_average(self, data):
        """Función auxiliar para calcular el promedio de una serie de pandas, manejando casos vacíos."""
        return int(data.mean()) if not data.empty else 0

    def _calculate_growth(self, pre_val, post_val):
        """Función auxiliar para calcular el porcentaje de crecimiento."""
        if pre_val > 0:
            return round(((post_val - pre_val) / pre_val) * 100, 1)
        return 0

    def __distributional(self):
        '''
        Calcula el salario promedio por nivel de experiencia para las eras Pre y Post-AI.
        '''
        if self.df_filtered.empty:
            return {}
            
        # Agrupar por periodo y nivel de experiencia, y calcular el salario promedio
        avg_salary = self.df_filtered.groupby(['period', 'experience_level'])['salary_in_usd'].mean().unstack()

        labels = [self.exp_level_map[level] for level in self.exp_level_map.keys() if level in avg_salary.columns]
        pre_ai_data = []
        post_ai_data = []
        growth_data = []

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
        '''
        Calcula la distribución porcentual de las modalidades de trabajo a lo largo de los años.
        '''
        if self.df.empty:
            return {}

        # Contar ocurrencias de cada modalidad por año
        modality_counts = self.df.groupby(['work_year', 'remote_ratio']).size().unstack(fill_value=0)
        
        # --- INICIO DE LA CORRECCIÓN ---
        # Asegurarse de que existan columnas para todas las modalidades (0, 50, 100)
        # y rellenar con 0 si alguna de ellas no tiene datos en el DataFrame.
        all_modalities = [0, 50, 100]
        modality_counts = modality_counts.reindex(columns=all_modalities, fill_value=0)
        # --- FIN DE LA CORRECCIÓN ---
        
        # Calcular el total por año para obtener el porcentaje
        total_per_year = modality_counts.sum(axis=1)
        
        # Calcular porcentajes, evitando división por cero si un año no tiene registros.
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
        '''
        Calcula el salario promedio por país para las eras Pre y Post-AI, para un grupo selecto de países.
        '''
        if self.df_filtered_geo.empty:
            return {}

        avg_salary = self.df_filtered_geo.groupby(['period', 'employee_residence'])['salary_in_usd'].mean().unstack()

        labels = [self.country_map[code] for code in self.country_map.keys() if code in avg_salary.columns]
        pre_ai_data = []
        post_ai_data = []
        growth_data = []

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
        '''
        Calcula el salario promedio para roles de alta demanda en las eras Pre y Post-AI.
        '''
        if self.df.empty:
            return {}
        
        target_roles = ["Data Scientist", "Machine Learning Engineer", "Data Engineer", "Data Analyst", "AI Scientist"]
        
        # Filtrar el DataFrame para incluir solo los roles de interés
        df_roles = self.df[self.df['job_title'].isin(target_roles)]
        
        avg_salary = df_roles.groupby(['period', 'job_title'])['salary_in_usd'].mean().unstack()
        
        pre_ai_data = []
        post_ai_data = []
        growth_data = []

        for role in target_roles:
            if role in avg_salary.columns:
                pre_val = int(avg_salary.loc['preAI', role]) if 'preAI' in avg_salary.index else 0
                post_val = int(avg_salary.loc['postAI', role]) if 'postAI' in avg_salary.index else 0

                pre_ai_data.append(pre_val)
                post_ai_data.append(post_val)
                growth_data.append(self._calculate_growth(pre_val, post_val))

        return {
            "labels": target_roles,
            "preAI": {"label": "Pre-AI Era (2020-2022)", "data": pre_ai_data, "color": "#94a3b8"},
            "postAI": {"label": "Post-AI Era (2023-2025)", "data": post_ai_data, "color": "#3b82f6"},
            "growth": growth_data
        }

    def __company(self):
        '''
        Calcula el salario promedio por tamaño de empresa en la era Post-AI.
        '''
        if self.df.empty:
            return {}

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
        '''
        Muestra la evolución del salario promedio a lo largo de los años para cada nivel de experiencia.
        '''
        if self.df_filtered.empty:
            return {}

        avg_salary = self.df_filtered.groupby(['work_year', 'experience_level'])['salary_in_usd'].mean().unstack()
        
        years = sorted(self.df['work_year'].unique())
        datasets = []
        
        colors = {"EN": "#3498db", "MI": "#2ecc71", "SE": "#e74c3c", "EX": "#34495e"}

        for level_code, level_name in self.exp_level_map.items():
            if level_code in avg_salary.columns:
                # Rellenar años faltantes con 0 y luego tomar la lista
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
        '''
        Orquesta la llamada a todos los métodos privados y ensambla la respuesta final.
        '''
        # Si el DataFrame no se cargó, retorna un error.
        if self.df.empty:
             return {
                "status": "error",
                "info": "No se pudieron cargar o procesar los datos de la base de datos.",
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