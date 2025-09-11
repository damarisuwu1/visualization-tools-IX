import traceback, logging
from flask import Flask, render_template
from dotenv import load_dotenv


# =============== Configs ===============
load_dotenv()
app = Flask(__name__)
logging.basicConfig(level=logging.INFO)




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
    



# Ejecutar la aplicación solo si este archivo se ejecuta directamente
if __name__ == '__main__':
    print("=== FLASK INICIADO CORRECTAMENTE ===")
    print("Accede a estas URLs en tu navegador:")
    print("• Página principal: http://127.0.0.1:501/")

    print("====================================")
    app.run(debug=True, host='127.0.0.1', port=501)