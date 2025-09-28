# ----- IMAGEN BASE -----
FROM python:3.11

# ----- DIRECTORIO DE TRABAJO -----
WORKDIR /app

ENV PYTHONUNBUFFERED=1
ENV PYTHONIOENCODING=utf-8

# ----- COPIAR DEPENDENCIAS -----
COPY requirements.txt /app

# ----- DEPENDENCIAS -----
RUN pip install -r requirements.txt

# ----- PUERTO EXPUESTO -----
EXPOSE 503

# ----- COPIAR CÓDIGO FUENTE -----
COPY . /app

# ----- COMANDO DE ARRANQUE -----
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:503", "app:app"]