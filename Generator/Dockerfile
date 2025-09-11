FROM python:3.13-slim

ENV PYTHONUNBUFFERED=1
ENV PYTHONIOENCODING=utf-8

WORKDIR /app

COPY requirements.txt /app

RUN pip install -r requirements.txt

EXPOSE 501

COPY . /app

CMD ["python", "main.py"]