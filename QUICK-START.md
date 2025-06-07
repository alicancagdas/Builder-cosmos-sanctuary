# 🚀 CodeMentor AI - Hızlı Başlangıç

## 🎯 1 Dakikada Çalıştır!

### Option 1: Docker ile (Önerilen - AI Destekli)

```bash
# Tüm servisleri başlat
docker-compose up -d

# Web'de aç: http://localhost:3000
# AI servisi: http://localhost:11434
```

### Option 2: Sadece Web App

```bash
# Paketleri kur
npm install

# Web'de çalıştır
npx expo start --web
```

## 📱 Demo Kullanıcıları

Hızlı test için aşağıdaki demo kullanıcılarını kullanabilirsiniz:

### 👨‍💻 Ethan Carter (Intermediate)

- **E-posta**: `ethan.carter@example.com`
- **Şifre**: `demo123` (herhangi bir şifre)
- **Seviye**: Intermediate
- **Stats**: 12 kurs, 247 alıştırma

### 🎓 Demo User (Beginner)

- **E-posta**: `demo@codementor.ai`
- **Şifre**: `demo123`
- **Seviye**: Beginner
- **Stats**: 3 kurs, 45 alıştırma

### 🎯 Admin User (Expert)

- **E-posta**: `admin@codementor.ai`
- **Şifre**: `demo123`
- **Seviye**: Expert
- **Stats**: 25 kurs, 500 alıştırma

## 🤖 AI Chat Test

AI Chat'i test etmek için:

1. Login olduktan sonra "AI Chat" sekmesine gidin
2. Aşağıdaki soruları deneyin:

```
"C++ pointer nedir?"
"Class ve struct farkı nedir?"
"Bu kodu açıkla: int* ptr = &x;"
"Memory leak nasıl önlenir?"
```

## 💻 Platform Test Seçenekleri

### 🌐 Web Browser

```bash
npx expo start --web
# Otomatik olarak browser'da açılır
```

### 📱 Mobile (Expo Go)

```bash
npx expo start
# QR kodu tarayın (Expo Go app gerekli)
```

### 🖥️ Desktop Emulators

```bash
# iOS Simulator (Mac)
npx expo start --ios

# Android Emulator
npx expo start --android
```

## 🔧 Troubleshooting

### Web Bundle Hatası

```bash
# Cache temizle
npx expo start --clear

# Node modules yenile
rm -rf node_modules && npm install
```

### Docker Issues

```bash
# Container'ları yeniden başlat
docker-compose restart

# Logs kontrol et
docker-compose logs -f
```

### Missing Dependencies

```bash
# Web dependencies kur
npx expo install react-native-web@~0.19.6 react-dom@18.2.0 @expo/webpack-config@^19.0.0
```

## 📊 Test Senaryoları

### 1. Homepage Test

- ✅ Hero section yükleniyor
- ✅ Feature cards görünüyor
- ✅ Stats cards animate oluyor
- ✅ Popular courses scroll ediyor

### 2. Authentication Test

- ✅ Demo users ile login
- ✅ Registration form çalışıyor
- ✅ Profile data persist oluyor

### 3. AI Chat Test

- ✅ Mesaj gönderme
- ✅ AI response alınıyor (Docker ile)
- ✅ Code highlighting çalışıyor
- ✅ Typing indicator aktif

### 4. Code Editor Test

- ✅ Kod yazılabiliyor
- ✅ Templates yükleniyor
- ✅ Run simulation çalışıyor
- ✅ AI suggestions gösteriliyor

### 5. Navigation Test

- ✅ Bottom tabs çalışıyor
- ✅ Stack navigation doğru
- ✅ Deep linking aktif

## 🎉 İlk Çalıştırma Checklist

- [ ] `npm install` tamamlandı
- [ ] Web'de uygulama açıldı (`http://localhost:19006`)
- [ ] Demo user ile login olundu
- [ ] AI Chat test edildi
- [ ] Code Editor test edildi
- [ ] Courses sayfası açıldı
- [ ] Profile data görüntülendi

## 🚀 Production Deployment

### Vercel (Önerilen)

```bash
# Build for web
npx expo export:web

# Deploy to Vercel
vercel --prod
```

### Docker Production

```bash
# Production build
docker build -t codementor-ai .

# Run production
docker run -p 3000:80 codementor-ai
```

Herhangi bir sorunla karşılaştığınızda `DOCKER-SETUP.md` veya `EXPO-SETUP.md` dosyalarına bakın! 🛠️
