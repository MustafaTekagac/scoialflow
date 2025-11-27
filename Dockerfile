# Python imajını kullan
FROM python:3.9-slim

# Gerekli sistem araçlarını ve FFmpeg'i kur
RUN apt-get update && \
    apt-get install -y ffmpeg && \
    rm -rf /var/lib/apt/lists/*

# Çalışma dizinini ayarla
WORKDIR /app

# Dosyaları kopyala
COPY . .

# Python kütüphanelerini yükle
RUN pip install --no-cache-dir -r requirements.txt

# Uygulamayı başlat (Render için PORT ayarı)
CMD gunicorn server:app --bind 0.0.0.0:$PORT