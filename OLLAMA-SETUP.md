# 🤖 Ollama AI Setup Guide

## 🚀 Hızlı Başlangıç

### 1. Ollama Servisini Başlat

```bash
# Development için sadece Ollama
docker-compose -f docker-compose.dev.yml up -d

# Service durumunu kontrol et
docker-compose -f docker-compose.dev.yml ps
```

### 2. Llama3 Modelini Yükle

#### Linux/Mac için:

```bash
# Script'i çalıştırılabilir yap
chmod +x scripts/init-ollama.sh

# Modeli yükle
./scripts/init-ollama.sh
```

#### Windows için:

```bash
# Batch script çalıştır
scripts\init-ollama.bat
```

#### Manuel Yükleme:

```bash
# Container'a bağlan ve model yükle
docker exec -it codementor-ollama-dev ollama pull llama3

# Model listesini kontrol et
docker exec -it codementor-ollama-dev ollama list
```

## 🔍 Ollama Service Kontrolü

### Health Check

```bash
# Service çalışıyor mu?
curl http://localhost:11434/api/tags

# Modellar yüklü mü?
curl http://localhost:11434/api/tags | jq '.models'
```

### Manual AI Test

```bash
# Basit test
curl -X POST http://localhost:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama3",
    "prompt": "C++ pointer nedir? Kısaca açıkla.",
    "stream": false
  }' | jq -r '.response'
```

### Interactive Chat Test

```bash
# Container içinde interactive chat
docker exec -it codementor-ollama-dev ollama run llama3
```

## 🛠 Troubleshooting

### Model Yüklenmiyorsa

```bash
# Container loglarını kontrol et
docker logs codementor-ollama-dev

# Container'ı yeniden başlat
docker-compose -f docker-compose.dev.yml restart ollama

# Manual download
docker exec -it codementor-ollama-dev ollama pull llama3
```

### Port Çakışması

```bash
# Port 11434 kullanımda mı kontrol et
lsof -i :11434

# Veya Windows'ta
netstat -an | findstr 11434

# Farklı port kullan
docker-compose -f docker-compose.dev.yml down
# docker-compose.dev.yml'de port değiştir "11435:11434"
docker-compose -f docker-compose.dev.yml up -d
```

### Memory Yetersizliği

```bash
# Lightweight model kullan
docker exec -it codementor-ollama-dev ollama pull llama3:7b-q4_0

# Model boyutunu kontrol et
docker exec -it codementor-ollama-dev ollama list
```

## 📊 Performance Monitoring

### Resource Usage

```bash
# Container resource kullanımı
docker stats codementor-ollama-dev

# Disk usage
docker exec -it codementor-ollama-dev du -sh /root/.ollama
```

### API Response Times

```bash
# Benchmark test
time curl -X POST http://localhost:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama3",
    "prompt": "Hello",
    "stream": false
  }'
```

## 🔧 Alternative Models

### Lightweight Models

```bash
# Daha küçük model (daha hızlı)
docker exec -it codementor-ollama-dev ollama pull llama3:7b-q4_0

# Code-specific model
docker exec -it codementor-ollama-dev ollama pull codellama

# Very fast, smaller model
docker exec -it codementor-ollama-dev ollama pull phi3:mini
```

### Model Switching

```bash
# List available models
docker exec -it codementor-ollama-dev ollama list

# Test different model
curl -X POST http://localhost:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "model": "codellama",
    "prompt": "Write a simple C++ hello world program",
    "stream": false
  }'
```

## 🎯 Integration Test

### Full Stack Test

```bash
# 1. Start Ollama
docker-compose -f docker-compose.dev.yml up -d

# 2. Wait and init
sleep 30
./scripts/init-ollama.sh

# 3. Start web app
npm install --legacy-peer-deps
npx expo start --web

# 4. Test AI Chat in browser
# http://localhost:19006
```

## 📝 Development Tips

### Rapid Development

```bash
# Start only what you need
docker-compose -f docker-compose.dev.yml up -d

# Keep Ollama running, restart web app as needed
npx expo start --web --clear
```

### API Development

```bash
# Watch Ollama logs while developing
docker logs -f codementor-ollama-dev

# Test API calls from your code
# Check src/services/ollamaService.ts
```

### Model Caching

```bash
# Keep model loaded for faster responses
docker exec -it codementor-ollama-dev ollama run llama3 "warmup"
```

Bu rehber ile Ollama AI servisiniz sorunsuz çalışacak! 🎉
