# Use a slim Python image
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies required for psycopg2 (postgreSQL client)
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# copy requirements file into containter
COPY requirements.txt .

# install python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# copy project files into container
COPY . .

# run the application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
