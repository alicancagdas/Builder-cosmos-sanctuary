# 🐳 Docker + Ollama Setup Guide

## 🚀 Hızlı Başlangıç

### 1. Docker ve Docker Compose Kurulumu

```bash
# Docker kurulu olduğundan emin olun
docker --version
docker-compose --version
```

### 2. Proje Dizininde Docker Compose Başlatma

```bash
# Tüm servisleri başlat (Ollama + React Native Web)
docker-compose up -d

# Logları takip et
docker-compose logs -f
```

### 3. Erişim URL'leri

- **Web App**: http://localhost:3000
- **Ollama API**: http://localhost:11434
- **Development Server**: http://localhost:19006 (dev mode)

## 🔧 Geliştirme Modunda Çalıştırma

### Development Container

```bash
# Sadece development container'ı başlat
docker-compose up app-dev

# Veya background'da
docker-compose up -d app-dev
```

### Local Development (Docker'sız)

```bash
# 1. Ollama'yı Docker'da başlat
docker-compose up -d ollama

# 2. Web uygulamasını local'de çalıştır
npm install
npx expo start --web
```

## 📦 Ollama Modeli Yükleme

### Otomatik Yükleme

Docker Compose başladığında Llama3 modeli otomatik yüklenir. İlk başlatmada biraz zaman alabilir.

### Manuel Model Yükleme

```bash
# Container içinde model yükle
docker exec -it codementor-ollama ollama pull llama3

# Diğer modeller
docker exec -it codementor-ollama ollama pull codellama
docker exec -it codementor-ollama ollama pull mistral
```

### Mevcut Modelleri Listele

```bash
docker exec -it codementor-ollama ollama list
```

## 🛠 Debug ve Troubleshooting

### Container Durumlarını Kontrol Et

```bash
# Çalışan container'ları gör
docker-compose ps

# Logları kontrol et
docker-compose logs ollama
docker-compose logs app
```

### Ollama Servisi Kontrolü

```bash
# Ollama health check
curl http://localhost:11434/api/tags

# Model test
curl http://localhost:11434/api/generate \
  -d '{
    "model": "llama3",
    "prompt": "Hello, how are you?",
    "stream": false
  }'
```

### Container'ları Yeniden Başlat

```bash
# Tüm servisleri yeniden başlat
docker-compose restart

# Sadece Ollama'yı yeniden başlat
docker-compose restart ollama

# Temiz başlangıç (volume'ları korur)
docker-compose down && docker-compose up -d
```

### Veri Temizleme

```bash
# Container'ları ve network'ü sil (volume'ları korur)
docker-compose down

# Volume'ları da sil (model'ler silinir!)
docker-compose down -v

# Tüm container'ları ve image'ları sil
docker-compose down --rmi all -v
```

## 🔍 Monitoring ve Logs

### Real-time Logs

```bash
# Tüm servislerin logları
docker-compose logs -f

# Sadece Ollama logları
docker-compose logs -f ollama

# Sadece app logları
docker-compose logs -f app
```

### Container İçine Giriş

```bash
# Ollama container'ına gir
docker exec -it codementor-ollama bash

# App container'ına gir
docker exec -it codementor-app sh
```

## ⚙️ Configuration

### Environment Variables

`docker-compose.yml` dosyasında şu environment variable'ları ayarlayabilirsiniz:

```yaml
environment:
  - OLLAMA_HOST=0.0.0.0
  - OLLAMA_API_URL=http://ollama:11434
  - EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
```

### Port Değişiklikleri

```yaml
ports:
  - "3001:80" # Web app port değiştir
  - "11435:11434" # Ollama port değiştir
  - "19007:19006" # Expo web port değiştir
```

## 🎯 Production Deployment

### Production Build

```bash
# Production image'ını build et
docker build -t codementor-ai:latest .

# Run production container
docker run -d \
  -p 3000:80 \
  --link codementor-ollama:ollama \
  codementor-ai:latest
```

### Docker Hub'a Push

```bash
# Tag the image
docker tag codementor-ai:latest username/codementor-ai:latest

# Push to Docker Hub
docker push username/codementor-ai:latest
```

## 🔒 Security Considerations

### Production Güvenlik

- Ollama API'yi external access'ten koru
- Environment variables için secret management kullan
- Container'ları non-root user ile çalıştır
- Network isolation uygula

### Firewall Kuralları

```bash
# Sadece localhost'tan Ollama erişimi
iptables -A INPUT -p tcp --dport 11434 -s 127.0.0.1 -j ACCEPT
iptables -A INPUT -p tcp --dport 11434 -j DROP
```

## 📊 Performance Tuning

### Ollama Performance

```bash
# GPU support için
docker run --gpus all ollama/ollama

# Memory limiti
docker run -m 4g ollama/ollama
```

### Model Optimization

```bash
# Quantized model kullan (daha az RAM)
docker exec -it codementor-ollama ollama pull llama3:7b-q4_0

# Model'i memory'de tut
docker exec -it codementor-ollama ollama run llama3 "warmup"
```

## 🆘 Common Issues

### Issue: Ollama modeli yüklenmiyor

```bash
# Solution: Manual model pull
docker exec -it codementor-ollama ollama pull llama3
```

### Issue: React Native web bundle hatası

```bash
# Solution: Clear cache ve rebuild
docker-compose down
docker-compose build --no-cache app
docker-compose up -d
```

### Issue: Port conflict

```bash
# Solution: Port değiştir
docker-compose down
# docker-compose.yml'de port'ları değiştir
docker-compose up -d
```

### Issue: Memory yetersiz

```bash
# Solution: Lightweight model kullan
docker exec -it codementor-ollama ollama pull llama3:7b-q4_0
```

Bu konfigürasyon ile CodeMentor AI uygulamanız Llama3 AI desteği ile Docker'da çalışacak! 🎉
