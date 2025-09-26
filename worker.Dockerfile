FROM python:3.12-slim

WORKDIR /app
COPY worker/requirements.txt /app/worker/requirements.txt
RUN pip install --no-cache-dir -r /app/worker/requirements.txt

COPY worker /app/worker
COPY templates /app/templates

CMD ["bash", "-lc", "celery -A worker.tasks worker --loglevel=INFO"]