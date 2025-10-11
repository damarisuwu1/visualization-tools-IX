import traceback, logging, os
from flask import Flask, render_template, send_from_directory
from dotenv import load_dotenv
from jinja2 import ChoiceLoader, FileSystemLoader

# =============== Configs ===============
load_dotenv()

# Crear la app de Flask
app = Flask(__name__)
logging.basicConfig(level=logging.INFO)

# Configurar múltiples carpetas de templates
template_folders = [
    os.path.join(os.path.dirname(__file__), 'templates'),  # Templates principal
    os.path.join(os.path.dirname(__file__), 'Unidad_1', 'templates'),  # Unidad 1 templates
]

# Verificar que las carpetas existen
print("\n🔍 Verificando carpetas de templates:")
for folder in template_folders:
    exists = os.path.exists(folder)
    status = "✅" if exists else "❌"
    print(f"{status} {folder}")
    if exists:
        # Listar archivos en la carpeta recursivamente
        try:
            for root, dirs, files in os.walk(folder):
                level = root.replace(folder, '').count(os.sep)
                indent = ' ' * 2 * level
                print(f"{indent}{os.path.basename(root)}/")
                sub_indent = ' ' * 2 * (level + 1)
                for file in files:
                    print(f"{sub_indent}{file}")
        except Exception as e:
            print(f"   Error listando archivos: {e}")

# Aplicar el ChoiceLoader para buscar templates en múltiples carpetas
app.jinja_loader = ChoiceLoader([
    FileSystemLoader(folder) for folder in template_folders if os.path.exists(folder)
])

# Leer endpoint de API desde variable de entorno
API_ENDPOINT = os.getenv('API_ENDPOINT', 'https://upy-homeworks.xpert-ia.com.mx/visualization-tools/api/unit-1/project')

# =============== Rutas para archivos estáticos de cada unidad ===============
@app.route('/unidad1/proyecto/<path:filename>')
def unidad1_proyecto_static(filename):
    """Servir archivos estáticos de Unidad 1 - Proyecto"""
    static_dir = os.path.join(os.path.dirname(__file__), 'Unidad_1', 'static', 'Project')
    return send_from_directory(static_dir, filename)

@app.route('/unidad1/portafolio/<path:filename>')
def unidad1_portafolio_static(filename):
    """Servir archivos estáticos de Unidad 1 - Portfolio"""
    static_dir = os.path.join(os.path.dirname(__file__), 'Unidad_1', 'static', 'Portfolio')
    return send_from_directory(static_dir, filename)

# Agregar más rutas para otras unidades según necesites:
# @app.route('/unidad2/proyecto/<path:filename>')
# def unidad2_proyecto_static(filename):
#     static_dir = os.path.join(os.path.dirname(__file__), 'Unidad_2', 'static', 'Project')
#     return send_from_directory(static_dir, filename)

# =============== Rutas de páginas ===============
# ===== Home =====
@app.route('/')
def home():
    try:
        return render_template('index.html')
    except Exception as e:
        error = traceback.format_exc()
        app.logger.error(f"Error cargando la página principal: {e}")
        return f"Ocurrió un error al cargar la página principal: <pre>{error}</pre>", 500

# ===== Proyectos =====
@app.route('/project/unit1')
def project_unit1():
    try:
        return render_template('Project/main.html', api_endpoint=API_ENDPOINT)
    except Exception as e:
        error = traceback.format_exc()
        app.logger.error(f"Error cargando proyecto unidad 1: {e}")
        return f"Ocurrió un error al cargar el proyecto de la unidad 1: <pre>{error}</pre>", 500

# @app.route('/project/unit2')
# def project_unit2():
#     try:
#         return render_template('Project/main.html', api_endpoint=API_ENDPOINT_UNIT2)
#     except Exception as e:
#         error = traceback.format_exc()
#         app.logger.error(f"Error cargando proyecto unidad 2: {e}")
#         return f"Ocurrió un error al cargar el proyecto de la unidad 2: <pre>{error}</pre>", 500

# ===== Portafolios =====
@app.route('/portfolio/unit1')
def portfolio_unit1():
    try:
        return render_template('Portfolio/main.html', api_endpoint=API_ENDPOINT)
    except Exception as e:
        error = traceback.format_exc()
        app.logger.error(f"Error cargando portafolio unidad 1: {e}")
        return f"Ocurrió un error al cargar el portafolio de la unidad 1: <pre>{error}</pre>", 500

# Ejecutar la aplicación solo si este archivo se ejecuta directamente
if __name__ == '__main__':
    print("\n=== FLASK INICIADO CORRECTAMENTE ===")
    print("Accede a estas URLs en tu navegador:")
    print("• Página principal: http://127.0.0.1:502/")
    print("• Proyecto Unidad 1: http://127.0.0.1:502/project/unit1")
    print("• Portafolio Unidad 1: http://127.0.0.1:502/portfolio/unit1")
    print(f"• API Endpoint: {API_ENDPOINT}")
    print("\n📁 Rutas estáticas configuradas:")
    print("  • /unidad1/proyecto/")
    print("  • /unidad1/portafolio/")
    print("====================================\n")
    app.run(debug=True, host='127.0.0.1', port=502)