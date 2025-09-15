# ----- IMAGEN BASE -----
FROM python:3.11

# ----- DIRECTORIO DE TRABAJO -----
WORKDIR /app

# ----- COPIAR DEPENDENCIAS -----
COPY requirements.txt /app

# ----- DEPENDENCIAS -----
RUN pip install -r requirements.txt

# ----- PUERTO EXPUESTO -----
EXPOSE 502

# ----- COPIAR CÓDIGO FUENTE -----
COPY . /app

# ----- COMANDO DE ARRANQUE -----
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:502", "app:app"]