FROM python:3.13-slim

WORKDIR /app

COPY requirements.txt /app

RUN pip install -r requirements.txt

EXPOSE 501

COPY . /app

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:501", "app:app"]