FROM python:3.13-slim

ENV PYTHONUNBUFFERED=1
ENV PYTHONIOENCODING=utf-8

WORKDIR /app

COPY requirements.txt /app

RUN pip install -r requirements.txt

EXPOSE 504

COPY . /app

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:504", "app:app"]