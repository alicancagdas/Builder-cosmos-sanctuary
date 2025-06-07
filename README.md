# CodeMentor AI - React Native Mobil Uygulama

🧠 **CodeMentor AI** - C ve C++ öğrenme platformunun React Native ile geliştirilmiş mobil uygulaması.

## 📱 Özellikler

### Ana Ekranlar

- **🏠 Ana Sayfa**: Platform tanıtımı, popüler kurslar ve istatistikler
- **📚 Kurslar**: C ve C++ kursları, filtreleme ve arama
- **🎯 Alıştırmalar**: Pratik problemler, günlük challenge'lar
- **🤖 AI Chat**: Gerçek zamanlı AI destekli sohbet
- **👤 Profil**: Kullanıcı profili, başarılar ve istatistikler

### Ek Özellikler

- **💻 Kod Editörü**: Mobil kod yazma ve test etme
- **📝 Quiz Sistemi**: Bilgi testleri (geliştirme aşamasında)
- **👥 Forum**: Topluluk etkileşimi (geliştirme aşamasında)
- **📊 İlerleme Takibi**: Detaylı analiz (geliştirme aşamasında)
- **🎓 AI Mentor**: Kişisel rehberlik (geliştirme aşamasında)

## 🛠 Teknolojiler

- **React Native**: Mobil uygulama geliştirme
- **Expo**: Geliştirme platformu
- **TypeScript**: Tip güvenliği
- **React Navigation**: Navigasyon sistemi
- **React Native Paper**: Material Design UI
- **Expo Vector Icons**: İkonlar
- **Linear Gradient**: Gradient efektleri

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler

- Node.js (v16 veya üstü)
- npm veya yarn
- Expo CLI
- iOS Simulator (Mac) veya Android Emulator

### Kurulum

```bash
# Bağımlılıkları yükle
npm install

# veya
yarn install
```

### Çalıştırma

```bash
# Geliştirme sunucusunu başlat
npm start

# veya
yarn start

# iOS simülatörde çalıştır
npm run ios

# Android emülatörde çalıştır
npm run android

# Web'de çalıştır
npm run web
```

## 📁 Proje Yapısı

```
├── App.tsx                 # Ana uygulama bileşeni
├── app.json               # Expo konfigürasyonu
├── package.json           # Bağımlılıklar
├── tsconfig.json          # TypeScript konfigürasyonu
├── babel.config.js        # Babel konfigürasyonu
└── src/
    └── screens/           # Ekran bileşenleri
        ├── HomeScreen.tsx
        ├── CoursesScreen.tsx
        ├── ExercisesScreen.tsx
        ├── AIChatScreen.tsx
        ├── ProfileScreen.tsx
        ├── CodeEditorScreen.tsx
        ├── LoginScreen.tsx
        └── ...
```

## 🎨 Tasarım Sistemi

### Renkler

- **Ana Renk**: #3b82f6 (Blue)
- **İkincil Renk**: #8b5cf6 (Purple)
- **Arka Plan**: #030712 (Dark Navy)
- **Kart Arka Planı**: #0f172a (Slate)
- **Border**: #334155 (Slate)

### Tipografi

- **Ana Font**: System Font
- **Kod Font**: Monospace
- **Boyutlar**: 12px - 32px

## 📱 Ekran Görünümleri

### Ana Sayfa

- Logo ve navigasyon
- Hero section gradient ile
- İstatistik kartları
- Özellik gösterimi
- Popüler kurslar (yatay scroll)
- CTA section

### Kurslar

- Arama ve filtreleme
- Kurs kartları
- İlerleme gösterimi
- Seviye badgeleri

### AI Chat

- Gerçek zamanlı mesajlaşma
- Kod blokları destekli
- Hızlı aksiyonlar
- Örnek sorular

### Profil

- Kullanıcı bilgileri
- İstatistik kartları
- Başarı rozetleri
- Tab navigasyon

## 🔧 Geliştirme Notları

### Navigation

- React Navigation 6 kullanılıyor
- Bottom Tabs + Stack Navigation
- Deep linking desteği

### State Management

- React Hooks (useState, useEffect)
- Context API (gelecekte Redux eklenebilir)

### Styling

- StyleSheet API
- Responsive tasarım
- Dark theme odaklı

### Components

- React Native Paper
- Custom components
- Reusable patterns

## 🚧 Geliştirme Aşamasındaki Özellikler

- [ ] Quiz sistemi implementasyonu
- [ ] Forum ve topluluk özellikleri
- [ ] İlerleme takibi ve analitik
- [ ] AI Mentor detaylı özellikler
- [ ] Kod editörü syntax highlighting
- [ ] Push notification
- [ ] Offline support
- [ ] Performance optimizasyonları

## 📦 Build ve Deploy

### Development Build

```bash
expo build:android
expo build:ios
```

### Production Build

```bash
expo build:android --type app-bundle
expo build:ios --type archive
```

## 🎯 Gelecek Özellikler

- **🔥 Advanced Code Editor**: Syntax highlighting, autocomplete
- **📊 Analytics**: Detaylı kullanım analitikleri
- **🎮 Gamification**: Daha fazla oyun elementi
- **🌐 Social Features**: Arkadaş sistemi, leaderboard
- **📱 Native Modules**: Platform specific özellikler
- **☁️ Cloud Sync**: Çoklu cihaz senkronizasyonu

## 📞 İletişim ve Destek

Bu proje CodeMentor AI platformunun mobil versiyonudur. Web versiyonu ile sync halinde geliştirilmektedir.

---

**CodeMentor AI** - AI destekli C/C++ öğrenme deneyimi 🚀
