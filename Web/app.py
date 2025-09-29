import traceback, logging, os
from flask import Flask, render_template
from dotenv import load_dotenv

# =============== Configs ===============
load_dotenv()
app = Flask(__name__)
logging.basicConfig(level=logging.INFO)

# Leer endpoint de API desde variable de entorno
API_ENDPOINT = os.getenv('API_ENDPOINT', 'https://upy-homeworks.xpert-ia.com.mx/visualization-tools/api/unit-1/project')

# =============== Rutas ===============
# ===== Home =====
@app.route('/')
def home():
    try:
        return render_template('index.html')
    except Exception as e:
        error = traceback.format_exc()
        app.logger.error(f"Error cargando la página principal: {e}")
        return f"Ocurrió un error al cargar la página principal: /*{error}*/", 500

# ===== Proyectos =====
@app.route('/project/unit1')
def project_unit1():
    try:
        return render_template('Project/Unit_1/main.html', api_endpoint=API_ENDPOINT)
    except Exception as e:
        error = traceback.format_exc()
        app.logger.error(f"Error cargando proyecto unidad 1: {e}")
        return f"Ocurrió un error al cargar el proyecto de la unidad 1: /*{error}*/", 500

# ===== Portafolios =====
@app.route('/portfolio/unit1')
def portfolio_unit1():
    try:
        return render_template('Portfolio/Unit_1/main.html', api_endpoint=API_ENDPOINT)
    except Exception as e:
        error = traceback.format_exc()
        app.logger.error(f"Error cargando proyecto unidad 1: {e}")
        return f"Ocurrió un error al cargar el portafolio de la unidad 1: /*{error}*/", 500

# Ejecutar la aplicación solo si este archivo se ejecuta directamente
if __name__ == '__main__':
    print("=== FLASK INICIADO CORRECTAMENTE ===")
    print("Accede a estas URLs en tu navegador:")
    print("• Página principal: http://127.0.0.1:502/")
    print("• Proyecto Unidad 1: http://127.0.0.1:502/project/unit1")
    print("• Portafolio Unidad 1: http://127.0.0.1:502/portfolio/unit1")
    print(f"• API Endpoint: {API_ENDPOINT}")
    print("• Otras rutas disponibles:")
    print("  - /project/unit[1-6] (proyectos)")
    print("  - /portfolio/unit[1-6] (portafolios)")
    print("====================================")
    app.run(debug=True, host='127.0.0.1', port=502)