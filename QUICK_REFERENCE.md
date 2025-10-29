# Quick Reference Guide - Task Manager Pro

Quick command reference and common operations for Task Manager Pro.

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# iOS pod install (macOS only)
cd ios && pod install && cd ..

# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios

# Run tests
npm test

# Lint code
npm run lint

# Type check
npm run typecheck
```

## 📁 Project Structure Quick Reference

```
TaskManagerPro/
├── src/
│   ├── assets/locales/     # EN, RO translations
│   ├── components/         # TaskCard, etc.
│   ├── config/            # firebase.ts, i18n.ts, theme.ts
│   ├── contexts/          # ThemeContext, AuthContext
│   ├── hooks/             # useKeyboard, useDebounce
│   ├── navigation/        # AppNavigator.tsx
│   ├── screens/           # Dashboard, Tasks, Calendar, Settings
│   ├── services/          # taskService, userService, etc.
│   ├── store/             # Redux store + slices
│   ├── types/             # TypeScript definitions
│   └── utils/             # exportUtils, recurrenceUtils
├── android/               # Android native
├── ios/                   # iOS native
├── __tests__/            # Test files
├── .github/workflows/    # CI/CD
└── docs/                 # Documentation
```

## 🔥 Firebase Setup (Essential)

1. Create Firebase project at https://console.firebase.google.com/
2. Enable Authentication (Email/Password, Google)
3. Create Firestore database
4. Enable Storage
5. Enable Cloud Messaging
6. Download config files:
   - Android: `google-services.json` → `android/app/`
   - iOS: `GoogleService-Info.plist` → `ios/TaskManagerPro/`
7. Update `src/contexts/AuthContext.tsx` with Web Client ID

## 🎨 Key Components Location

| Feature | File Path |
|---------|-----------|
| Login Screen | `src/screens/LoginScreen.tsx` |
| Dashboard | `src/screens/DashboardScreen.tsx` |
| Tasks List | `src/screens/TasksScreen.tsx` |
| Calendar | `src/screens/CalendarScreen.tsx` |
| Settings | `src/screens/SettingsScreen.tsx` |
| Task Card | `src/components/TaskCard.tsx` |
| Navigation | `src/navigation/AppNavigator.tsx` |
| Redux Store | `src/store/index.ts` |
| Theme Config | `src/config/theme.ts` |

## 🔐 Authentication Usage

```typescript
// In your component
import { useAuth } from '@/contexts/AuthContext';

const { user, signInWithEmail, signInWithGoogle, signOut } = useAuth();

// Sign in with email
await signInWithEmail('user@example.com', 'password');

// Sign in with Google
await signInWithGoogle();

// Sign out
await signOut();

// Access current user
console.log(user?.displayName);
```

## 🎨 Theme Usage

```typescript
import { useTheme } from '@/contexts/ThemeContext';

const { theme, isDark, themeMode, setThemeMode, toggleTheme } = useTheme();

// Use theme colors
<View style={{ backgroundColor: theme.colors.background }}>
  <Text style={{ color: theme.colors.text }}>Hello</Text>
</View>

// Change theme
setThemeMode('dark'); // 'light' | 'dark' | 'auto'
toggleTheme(); // Switch between light/dark
```

## 📝 Task Operations

```typescript
import { useDispatch } from 'react-redux';
import { createTask, updateTask, deleteTask, fetchTasks } from '@store/slices/tasksSlice';

const dispatch = useDispatch();

// Fetch tasks
dispatch(fetchTasks(userId));

// Create task
dispatch(createTask({
  title: 'New Task',
  description: 'Task description',
  status: TaskStatus.TODO,
  priority: TaskPriority.HIGH,
  labels: ['work'],
  attachments: [],
  createdBy: userId,
  createdAt: new Date(),
  updatedAt: new Date(),
  order: 0
}));

// Update task
dispatch(updateTask({ 
  id: 'task123', 
  updates: { status: TaskStatus.COMPLETED } 
}));

// Delete task
dispatch(deleteTask('task123'));
```

## 🌍 Internationalization

```typescript
import { useTranslation } from 'react-i18next';

const { t, i18n } = useTranslation();

// Use translations
<Text>{t('common.appName')}</Text>
<Text>{t('tasks.createTask')}</Text>

// Change language
i18n.changeLanguage('ro'); // 'en' | 'ro'

// Add new translation
// Edit: src/assets/locales/en.json or ro.json
```

## 📊 Redux Store Access

```typescript
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';

// Access tasks
const tasks = useSelector((state: RootState) => state.tasks.items);
const loading = useSelector((state: RootState) => state.tasks.loading);

// Access labels
const labels = useSelector((state: RootState) => state.labels.items);

// Access UI state
const calendarView = useSelector((state: RootState) => state.ui.calendarView);
```

## 🔔 Notifications

```typescript
import { scheduleTaskReminder, cancelTaskReminder } from '@services/notificationService';

// Schedule reminder
scheduleTaskReminder('task123', 'Complete project', new Date(2024, 11, 25, 9, 0));

// Cancel reminder
cancelTaskReminder('task123');
```

## 📤 Export/Import

```typescript
import { exportToExcel, exportToCSV, importFromCSV } from '@utils/exportUtils';

// Export to Excel
await exportToExcel(tasks, 'my-tasks.xlsx');

// Export to CSV
await exportToCSV(tasks, 'my-tasks.csv');

// Import from CSV
const importedTasks = await importFromCSV('/path/to/file.csv');
```

## 🧪 Testing Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- TaskCard.test.tsx

# Run with coverage
npm test -- --coverage

# Update snapshots
npm test -- -u
```

## 🏗️ Building for Production

### Android

```bash
# Debug build
cd android
./gradlew assembleDebug

# Release APK
./gradlew assembleRelease
# Output: android/app/build/outputs/apk/release/app-release.apk

# Release AAB (for Play Store)
./gradlew bundleRelease
# Output: android/app/build/outputs/bundle/release/app-release.aab

cd ..
```

### iOS (macOS only)

```bash
# Via Xcode:
# 1. Open ios/TaskManagerPro.xcworkspace
# 2. Select "Any iOS Device"
# 3. Product → Archive

# Via CLI:
cd ios
xcodebuild -workspace TaskManagerPro.xcworkspace \
  -scheme TaskManagerPro \
  -configuration Release \
  archive
cd ..
```

## 🐛 Debugging

### React Native Debugger

```bash
# Open Developer Menu
# Android: Cmd+M (Mac) or Ctrl+M (Windows)
# iOS: Cmd+D

# Enable Remote JS Debugging
# Or use Flipper for advanced debugging
```

### Common Debug Commands

```bash
# Clear cache
npm start -- --reset-cache

# Clean Android build
cd android && ./gradlew clean && cd ..

# Clean iOS build
cd ios && xcodebuild clean && cd ..

# Clear watchman
watchman watch-del-all

# Reset Metro
rm -rf $TMPDIR/react-*
```

## 📱 Useful ADB Commands (Android)

```bash
# List devices
adb devices

# Install APK
adb install path/to/app.apk

# View logs
adb logcat

# Reverse port (for debugging)
adb reverse tcp:8081 tcp:8081

# Clear app data
adb shell pm clear com.taskmanagerpro
```

## 🔧 Environment Variables

Create `.env` file:

```env
FIREBASE_API_KEY=your_key
FIREBASE_AUTH_DOMAIN=your_domain
FIREBASE_PROJECT_ID=your_project
FIREBASE_STORAGE_BUCKET=your_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
GOOGLE_WEB_CLIENT_ID=your_web_client_id
```

## 📚 Useful Scripts

### Add to package.json

```json
{
  "scripts": {
    "clean": "rm -rf node_modules && npm install",
    "clean:android": "cd android && ./gradlew clean && cd ..",
    "clean:ios": "cd ios && xcodebuild clean && cd ..",
    "pod-install": "cd ios && pod install && cd ..",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint:fix": "eslint . --fix",
    "postinstall": "cd ios && pod install && cd .."
  }
}
```

## 🚨 Common Issues & Solutions

### Metro bundler issues
```bash
npm start -- --reset-cache
```

### Android build fails
```bash
cd android && ./gradlew clean && cd ..
npm run android
```

### iOS build fails
```bash
cd ios
pod deintegrate
pod install
cd ..
npm run ios
```

### Firebase not connecting
- Verify `google-services.json` location
- Check Firebase Console configuration
- Ensure internet connection

### Google Sign-In fails
- Verify Web Client ID
- Check SHA-1 fingerprint (Android)
- Enable Google Sign-In in Firebase

## 📖 Documentation Links

- **Main README**: [README.md](README.md)
- **Setup Guide**: [docs/SETUP_GUIDE.md](docs/SETUP_GUIDE.md)
- **Architecture**: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- **API Docs**: [docs/API.md](docs/API.md)
- **Contributing**: [CONTRIBUTING.md](CONTRIBUTING.md)

## 🎯 Key Features Checklist

- ✅ Material Design UI with dark mode
- ✅ Multi-user authentication (Google/Email)
- ✅ Role-based access (Admin/User/Guest)
- ✅ Task CRUD with priorities & labels
- ✅ Drag & drop reordering
- ✅ Real-time sync + offline mode
- ✅ Interactive dashboard with charts
- ✅ Calendar views (Month/Week/Day)
- ✅ Push notifications
- ✅ Recurring tasks
- ✅ Collaboration features
- ✅ Import/Export (Excel/CSV)
- ✅ Bulk edit & advanced search
- ✅ Multilingual (EN/RO)
- ✅ Biometric authentication
- ✅ Settings & integrations
- ✅ CI/CD pipeline
- ✅ Comprehensive tests
- ✅ Full documentation

## 💡 Quick Tips

1. Always use `useAuth()` for authentication state
2. Use `useTheme()` for consistent theming
3. Access Redux state with typed `useSelector`
4. Use `useTranslation()` for all text
5. Follow TypeScript strict mode
6. Run tests before committing
7. Keep components small and focused
8. Use proper error handling
9. Comment complex logic
10. Update documentation when adding features

---

**Need more help?** Check the full documentation or open an issue on GitHub.
