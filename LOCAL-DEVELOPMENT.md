# 🚀 Local Development Setup

Docker build sorunları yaşıyorsanız, local geliştirme environment'ı kullanın.

## 📦 Önerilen Yaklaşım: Ollama Docker + Local Web App

### 1. Sadece Ollama'yı Docker'da Çalıştır

```bash
# Simplified docker-compose ile sadece AI servisi
docker-compose -f docker-compose.dev.yml up -d

# Ollama sağlığını kontrol et
curl http://localhost:11434/api/tags
```

### 2. Web App'i Local'de Çalıştır

```bash
# Bağımlılık çakışmalarını düzelt
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Web'de çalıştır
npx expo start --web
```

## 🔧 Dependency Çakışması Çözümleri

### Option 1: Legacy Peer Deps (Önerilen)

```bash
# .npmrc dosyası oluştur
echo "legacy-peer-deps=true" > .npmrc
echo "auto-install-peers=true" >> .npmrc

# Yeniden kur
rm -rf node_modules package-lock.json
npm install
```

### Option 2: Force Install

```bash
npm install --force
```

### Option 3: Manual Conflict Resolution

```bash
# Conflicting package'ları manuel kaldır
npm uninstall @react-navigation/web
npm install
```

## 🐛 Troubleshooting

### Web Bundle Hatası

```bash
# Expo cache temizle
npx expo start --clear

# Metro cache temizle
npx expo start --reset-cache

# Node modules temizle
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Vector Icons Hatası

```bash
# Expo vector icons'u yeniden kur
npx expo install @expo/vector-icons

# Web için ek dependencies
npx expo install react-native-web react-dom
```

### Navigation Hatası

```bash
# React Navigation web desteği yok, bu normal
# Sadece mobil platformlarda navigation çalışır
# Web'de tek sayfa olarak test edin
```

## 🌐 Platform Test Stratejisi

### 1. Web Development

```bash
# Ollama AI ile
docker-compose -f docker-compose.dev.yml up -d
npx expo start --web

# AI Chat'i test et: http://localhost:19006
```

### 2. Mobile Development

```bash
# Expo Go ile mobil test
npx expo start
# QR kod tarat
```

### 3. iOS Simulator

```bash
npx expo start --ios
```

### 4. Android Emulator

```bash
npx expo start --android
```

## 📱 Development Workflow

### Daily Development

```bash
# 1. Ollama'yı başlat (bir kez)
docker-compose -f docker-compose.dev.yml up -d

# 2. Her gün web'de çalış
npx expo start --web

# 3. Mobil test gerektiğinde
npx expo start
```

### AI Features Test

```bash
# Ollama health check
curl http://localhost:11434/api/tags

# Manual AI test
curl -X POST http://localhost:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama3",
    "prompt": "C++ pointer nedir?",
    "stream": false
  }'
```

## 🎯 Production Simulation

Local'de production benzeri test:

```bash
# 1. Web build oluştur
npx expo export:web

# 2. Static server ile serve et
npx serve web-build -p 3000

# 3. Ollama'yı Docker'da çalıştır
docker-compose -f docker-compose.dev.yml up -d
```

## 🔍 Debug Commands

### Check Dependencies

```bash
npm ls @react-navigation/core
npm ls react-native-web
npm outdated
```

### Expo Diagnostics

```bash
npx expo doctor
npx expo config
```

### Clean Everything

```bash
# Total cleanup
rm -rf node_modules package-lock.json
rm -rf .expo
npx expo install --fix
```

Bu approach ile Docker build sorunlarını bypass edip development'a devam edebilirsiniz! 🎉
