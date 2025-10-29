# Setup Guide - Task Manager Pro

Complete guide to set up and run Task Manager Pro on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Git**: Latest version
- **React Native CLI**: `npm install -g react-native-cli`

### For Android Development
- **Android Studio**: Latest version
- **JDK**: Version 17
- **Android SDK**: API Level 33 or higher
- **Android Emulator** or physical device with USB debugging enabled

### For iOS Development (macOS only)
- **Xcode**: Version 14.0 or higher
- **CocoaPods**: `sudo gem install cocoapods`
- **Xcode Command Line Tools**: `xcode-select --install`
- **iOS Simulator** or physical device

## Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/task-manager-pro.git
cd task-manager-pro
```

## Step 2: Install Dependencies

```bash
npm install
```

For iOS, install pod dependencies:
```bash
cd ios && pod install && cd ..
```

## Step 3: Firebase Configuration

### 3.1 Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: "Task Manager Pro"
4. Follow the setup wizard

### 3.2 Enable Services

Enable the following services in Firebase Console:

1. **Authentication**
   - Go to Authentication → Sign-in method
   - Enable "Email/Password"
   - Enable "Google"

2. **Firestore Database**
   - Go to Firestore Database
   - Create database (Start in test mode for development)
   - Set up security rules (see below)

3. **Storage**
   - Go to Storage
   - Get started with default settings

4. **Cloud Messaging**
   - Already enabled by default

### 3.3 Add Apps to Firebase

#### For Android:
1. Click "Add app" → Android
2. Package name: `com.taskmanagerpro`
3. Download `google-services.json`
4. Place it in `android/app/` directory

#### For iOS:
1. Click "Add app" → iOS
2. Bundle ID: `com.taskmanagerpro`
3. Download `GoogleService-Info.plist`
4. Place it in `ios/TaskManagerPro/` directory

### 3.4 Configure Google Sign-In

1. In Firebase Console, go to Authentication → Sign-in method → Google
2. Copy the Web Client ID
3. Update `src/contexts/AuthContext.tsx`:
```typescript
GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID_HERE.apps.googleusercontent.com',
});
```

### 3.5 Firestore Security Rules

Set up security rules in Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Tasks collection
    match /tasks/{taskId} {
      allow read: if request.auth != null && 
        (resource.data.createdBy == request.auth.uid || 
         request.auth.uid in resource.data.assignedTo);
      allow create: if request.auth != null && 
        request.resource.data.createdBy == request.auth.uid;
      allow update, delete: if request.auth != null && 
        resource.data.createdBy == request.auth.uid;
    }
    
    // Labels collection
    match /labels/{labelId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
    
    // Teams collection
    match /teams/{teamId} {
      allow read: if request.auth != null && 
        request.auth.uid in resource.data.members;
      allow write: if request.auth != null && 
        resource.data.ownerId == request.auth.uid;
    }
    
    // Notifications collection
    match /notifications/{notificationId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
  }
}
```

## Step 4: Environment Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update `.env` with your Firebase configuration:
```env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
GOOGLE_WEB_CLIENT_ID=your_web_client_id.apps.googleusercontent.com
```

## Step 5: Configure Android

### 5.1 Update Package Name (Optional)

If you want to change the package name:

1. Update `android/app/build.gradle`:
```gradle
defaultConfig {
    applicationId "com.yourcompany.taskmanager"
    // ...
}
```

2. Update `android/app/src/main/AndroidManifest.xml`
3. Rename package directories accordingly

### 5.2 Generate Release Keystore

For release builds:

```bash
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

Create `android/gradle.properties`:
```properties
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=your_store_password
MYAPP_RELEASE_KEY_PASSWORD=your_key_password
```

## Step 6: Configure iOS (macOS only)

### 6.1 Update Bundle Identifier

1. Open `ios/TaskManagerPro.xcworkspace` in Xcode
2. Select project → Targets → TaskManagerPro
3. General → Identity → Bundle Identifier
4. Change to your desired identifier

### 6.2 Configure Signing

1. In Xcode, select project target
2. Signing & Capabilities
3. Select your Team
4. Enable "Automatically manage signing"

### 6.3 Configure Push Notifications

1. In Xcode, go to Signing & Capabilities
2. Click "+ Capability"
3. Add "Push Notifications"
4. Add "Background Modes"
5. Enable "Remote notifications"

## Step 7: Run the Application

### Start Metro Bundler

```bash
npm start
```

### Run on Android

In a new terminal:
```bash
npm run android
```

Or using React Native CLI:
```bash
npx react-native run-android
```

### Run on iOS (macOS only)

In a new terminal:
```bash
npm run ios
```

Or using React Native CLI:
```bash
npx react-native run-ios
```

## Step 8: Verify Installation

1. App should launch on emulator/device
2. You should see the login screen
3. Try creating an account with email/password
4. Try signing in with Google
5. Create a test task
6. Verify real-time sync by opening app on another device

## Troubleshooting

### Common Issues

#### Metro Bundler Issues
```bash
# Clear cache
npm start -- --reset-cache

# Or
npx react-native start --reset-cache
```

#### Android Build Failures
```bash
# Clean build
cd android
./gradlew clean
cd ..

# Rebuild
npm run android
```

#### iOS Build Failures
```bash
# Clean build folder
cd ios
xcodebuild clean
rm -rf ~/Library/Developer/Xcode/DerivedData/*

# Reinstall pods
pod deintegrate
pod install
cd ..

# Rebuild
npm run ios
```

#### Firebase Connection Issues
- Verify `google-services.json` and `GoogleService-Info.plist` are in correct locations
- Check Firebase Console for correct configuration
- Ensure internet connection is available

#### Google Sign-In Issues
- Verify Web Client ID is correct
- Check SHA-1 fingerprint is added to Firebase (Android)
- Ensure Google Sign-In is enabled in Firebase Console

### Getting Help

If you encounter issues:

1. Check the [GitHub Issues](https://github.com/yourusername/task-manager-pro/issues)
2. Read the [FAQ](FAQ.md)
3. Join our Discord community
4. Contact support@taskmanagerpro.com

## Next Steps

After successful setup:

1. Read the [Architecture Documentation](ARCHITECTURE.md)
2. Review the [API Documentation](API.md)
3. Check out [Contributing Guidelines](../CONTRIBUTING.md)
4. Start building features!

## Development Tips

### Hot Reload
- Press `R` twice to reload in Android
- Press `Cmd+R` to reload in iOS
- Enable Fast Refresh for automatic reloading

### Debugging
- Open Developer Menu:
  - Android: Shake device or press `Cmd+M` (Mac) or `Ctrl+M` (Windows/Linux)
  - iOS: Shake device or press `Cmd+D`
- Enable Remote JS Debugging
- Use React Native Debugger or Flipper

### Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run with coverage
npm test -- --coverage

# Lint code
npm run lint

# Type check
npm run typecheck
```

### Building for Production

#### Android APK
```bash
cd android
./gradlew assembleRelease
```
APK location: `android/app/build/outputs/apk/release/app-release.apk`

#### Android AAB (for Play Store)
```bash
cd android
./gradlew bundleRelease
```
AAB location: `android/app/build/outputs/bundle/release/app-release.aab`

#### iOS Archive
1. Open project in Xcode
2. Select "Any iOS Device" as target
3. Product → Archive
4. Upload to App Store Connect

---

Happy coding! 🚀
