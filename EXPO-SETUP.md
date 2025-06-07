# Expo Setup ve Troubleshooting Guide

## 🚀 Kurulum Adımları

### 1. Node.js Gereksinimi

```bash
# Node.js 16 veya üzeri olmalı
node --version
```

### 2. Projeyi Temizle ve Yeniden Kur

```bash
# Cache'i temizle
npm cache clean --force

# node_modules'u sil
rm -rf node_modules

# package-lock.json'u sil
rm package-lock.json

# Yeniden kur
npm install
```

### 3. Expo CLI Kurulumu

```bash
# Global Expo CLI
npm install -g @expo/cli

# veya yeni Expo CLI
npm install -g expo-cli@latest
```

### 4. Metro Cache Temizle

```bash
# Metro cache temizle
npx expo start --clear
```

## 🔧 Olası Hatalar ve Çözümleri

### "Unexpected token 'export'" Hatası

Bu hata genellikle Node.js versiyonu veya Expo SDK uyumsuzluğundan kaynaklanır.

**Çözüm:**

```bash
# 1. Node.js versiyonunu kontrol et (16+ olmalı)
node --version

# 2. Expo CLI'yi güncelle
npm install -g @expo/cli@latest

# 3. Projeyi temizle
rm -rf node_modules package-lock.json
npm install

# 4. Cache'i temizle
npx expo start --clear
```

### Metro Bundle Hatası

```bash
# Metro'yu restart et
npx expo start --clear --reset-cache
```

### iOS Simulator Problemi

```bash
# iOS simulator açık olduğundan emin ol
open -a Simulator

# Sonra expo'yu başlat
npx expo start --ios
```

### Android Emulator Problemi

```bash
# Android Studio'da emulator açık olmalı
# Sonra expo'yu başlat
npx expo start --android
```

## 📱 Test Etme

### 1. Web'de Test

```bash
npx expo start --web
```

### 2. Fiziksel Cihazda Test

1. Expo Go uygulamasını indir (iOS App Store / Google Play)
2. `npx expo start` çalıştır
3. QR kodu tarat

### 3. Emulator'da Test

```bash
# iOS
npx expo start --ios

# Android
npx expo start --android
```

## 🛠 Development Workflow

### 1. Geliştirme Başlat

```bash
npx expo start
```

### 2. Hot Reload

- Dosya kaydettiğinde otomatik güncellenir
- `r` tuşuna bas = reload
- `d` tuşuna bas = dev menu

### 3. Production Build

```bash
# Android APK
npx expo build:android

# iOS IPA
npx expo build:ios
```

## 📦 Bağımlılık Problemleri

### Versiyonları Senkronize Et

```bash
# Expo doctor çalıştır
npx expo doctor

# Uyumsuzlukları düzelt
npx expo install --fix
```

### Peer Dependencies

```bash
# Tüm peer dependency'leri kur
npx expo install
```

## 🔍 Debug Yapma

### 1. Console Logs

```javascript
console.log("Debug mesajı");
console.error("Hata mesajı");
```

### 2. Remote Debugging

- Expo Dev Tools'da "Debug remote JS" aktifleştir
- Chrome Developer Tools açılır

### 3. Flipper (React Native Debugging)

```bash
npm install --save-dev react-native-flipper
```

## 📋 Checklist

Uygulama çalışmıyorsa şu adımları takip edin:

- [ ] Node.js 16+ yüklü mü?
- [ ] Expo CLI güncel mi?
- [ ] `npm install` çalıştırıldı mı?
- [ ] Cache temizlendi mi?
- [ ] package.json'da version uyumsuzluğu var mı?
- [ ] Expo doctor çalıştırıldı mı?
- [ ] Emulator/Simulator çalışıyor mu?

## 🆘 Yardım Alma

### Expo Dokümantasyon

- https://docs.expo.dev/

### Community

- Expo Discord: https://discord.gg/expo
- Stack Overflow: `expo` tag'i ile soru sor

### Debug Bilgileri Topla

```bash
# Sistem bilgileri
npx expo --version
node --version
npm --version

# Expo doctor
npx expo doctor

# Package bilgileri
cat package.json
```

Bu bilgileri soru sorarken paylaş!
