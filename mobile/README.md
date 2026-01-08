# 📱 Sourav Verma Portfolio - Mobile App

React Native mobile app built with Expo for Sourav Verma's graphic design portfolio.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Expo CLI: `npm install -g @expo/cli`
- EAS CLI: `npm install -g eas-cli`

### Development Setup

1. **Install Dependencies**
```bash
cd mobile
npm install
```

2. **Start Development Server**
```bash
npm start
# or
expo start
```

3. **Run on Device/Simulator**
```bash
# Android
npm run android
# or scan QR code with Expo Go app

# iOS (Mac only)
npm run ios
# or scan QR code with Expo Go app
```

## 📱 Building for Production

### Android APK (for testing)
```bash
eas build --platform android --profile preview
```

### Android App Bundle (for Play Store)
```bash
eas build --platform android --profile production
```

### iOS Build (requires Apple Developer account)
```bash
eas build --platform ios --profile production
```

## 🎨 Features

- **Native Navigation** - Smooth page transitions
- **Custom Tab Bar** - Glassmorphism design
- **Touch Optimized** - Large touch targets
- **Responsive Design** - Works on all screen sizes
- **Offline Ready** - Core functionality works offline
- **Fast Performance** - Optimized for 60fps

## 📂 Project Structure

```
mobile/
├── src/
│   ├── screens/           # App screens
│   ├── components/        # Reusable components
│   └── utils/            # Utilities and helpers
├── assets/               # Images, fonts, icons
├── App.js               # Main app component
└── app.json            # Expo configuration
```

## 🔧 Configuration

### App Icon & Splash Screen
- Replace `assets/icon.png` (1024x1024)
- Replace `assets/splash.png` (1284x2778)
- Replace `assets/adaptive-icon.png` (1024x1024)

### App Details
Update in `app.json`:
- `name`: App display name
- `slug`: Unique identifier
- `version`: App version
- `ios.bundleIdentifier`: iOS bundle ID
- `android.package`: Android package name

## 🌐 API Configuration

The app connects to the same backend as the web version:
- Development: `http://localhost:5000`
- Production: Update API base URL in components

## 📦 Publishing

### Google Play Store
1. Build AAB: `eas build --platform android --profile production`
2. Download AAB file
3. Upload to Google Play Console

### Apple App Store
1. Build IPA: `eas build --platform ios --profile production`
2. Download IPA file
3. Upload to App Store Connect

## 🔄 Updates

### Over-the-Air Updates
```bash
# Publish update
eas update --branch production --message "Bug fixes"
```

## 🛠 Troubleshooting

### Common Issues

**Metro bundler issues:**
```bash
npx expo start --clear
```

**Build failures:**
```bash
# Clear cache
npm start -- --reset-cache

# Reinstall dependencies
rm -rf node_modules
npm install
```

**iOS simulator not opening:**
```bash
# Install iOS simulator
xcode-select --install
```

## 📱 Testing

### Physical Device Testing
1. Install Expo Go from app store
2. Scan QR code from `expo start`
3. Test all features

### Simulator Testing
```bash
# iOS Simulator (Mac only)
expo start --ios

# Android Emulator
expo start --android
```

## 🚀 Performance Tips

- Use `react-native-fast-image` for optimized images
- Implement lazy loading for large lists
- Use `react-native-reanimated` for smooth animations
- Optimize bundle size with Metro bundler

---

**Ready to launch your mobile portfolio! 📱✨**