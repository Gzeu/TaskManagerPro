# Task Manager Pro

A production-ready mobile application for task management built with React Native, featuring Material Design UI, real-time sync, and comprehensive collaboration tools.

## Features

### 🎨 Modern UI/UX
- Material Design 3 components
- Dark mode support with automatic theme detection
- Drag & drop task reordering
- Smooth animations and transitions

### 🔐 Authentication & Security
- Multi-user authentication (Google OAuth, Email/Password)
- Role-based access control (Admin, User, Guest)
- Biometric authentication (Fingerprint/Face ID)
- Encrypted local storage

### ✅ Task Management
- Create, read, update, and delete tasks
- Task priorities (Low, Medium, High, Urgent)
- Labels and categories
- File attachments
- Due dates and reminders
- Recurring tasks with customizable patterns
- Bulk edit operations
- Advanced search and filtering

### 📊 Analytics & Dashboard
- Interactive charts and graphs
- Completion rate tracking
- Productivity trends
- Task distribution by priority and status

### 📅 Calendar Views
- Month, week, and day views
- Visual task representation
- Quick task creation from calendar

### 👥 Collaboration
- Team workspaces
- Task sharing and assignment
- Real-time chat
- Comments on tasks
- Activity logs
- Mentions and notifications

### 🔔 Notifications
- Push notifications for task reminders
- Deadline alerts
- Team update notifications
- Customizable notification settings
- Quiet hours support

### 🌐 Integrations
- Google Calendar sync
- Discord integration
- Webhook support

### 📤 Import/Export
- Export to Excel, CSV, PDF
- Bulk import from files

### 🌍 Internationalization
- English
- Romanian
- Easy to add more languages

### ⚡ Performance
- Offline mode with local storage
- Real-time sync with Firebase Firestore
- Optimized rendering
- Efficient data caching

## Tech Stack

- **Framework**: React Native 0.73.2
- **Language**: TypeScript
- **State Management**: Redux Toolkit with Redux Persist
- **Backend**: Firebase (Auth, Firestore, Storage, Cloud Messaging)
- **Navigation**: React Navigation
- **UI Library**: React Native Paper (Material Design)
- **Charts**: React Native Chart Kit
- **Calendar**: React Native Calendars
- **Drag & Drop**: React Native Draggable FlatList
- **i18n**: i18next with react-i18next
- **Security**: React Native Biometrics, React Native Keychain
- **Testing**: Jest, React Native Testing Library, Detox

## Prerequisites

- Node.js >= 18
- npm >= 9
- React Native development environment setup
- Firebase project configured
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/task-manager-pro.git
cd task-manager-pro
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Create a Firebase project
   - Download `google-services.json` (Android) and `GoogleService-Info.plist` (iOS)
   - Place them in the appropriate directories
   - Update Firebase configuration in `src/config/firebase.ts`

4. Install iOS dependencies (macOS only):
```bash
cd ios && pod install && cd ..
```

## Running the App

### Development Mode

Start Metro bundler:
```bash
npm start
```

Run on Android:
```bash
npm run android
```

Run on iOS:
```bash
npm run ios
```

## Testing

Run unit tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

Run linter:
```bash
npm run lint
```

Run TypeScript checks:
```bash
npm run typecheck
```

## Building for Production

### Android

```bash
npm run build:android
```

The APK will be generated at `android/app/build/outputs/apk/release/app-release.apk`

### iOS

```bash
npm run build:ios
```

## CI/CD

The project includes a GitHub Actions workflow that:
- Runs linting and tests on every push and PR
- Builds Android and iOS apps on main branch
- Deploys to Play Store and App Store on main branch (requires secrets configuration)

### Required Secrets

- `CODECOV_TOKEN`: For code coverage reporting
- `GOOGLE_PLAY_SERVICE_ACCOUNT`: Service account JSON for Play Store deployment
- `APP_STORE_CONNECT_API_KEY`: API key for App Store deployment

## Project Structure

```
TaskManagerPro/
├── src/
│   ├── assets/           # Images, fonts, locales
│   ├── components/       # Reusable UI components
│   ├── config/          # Configuration files
│   ├── contexts/        # React contexts (Auth, Theme)
│   ├── hooks/           # Custom hooks
│   ├── navigation/      # Navigation setup
│   ├── screens/         # Screen components
│   ├── services/        # Business logic and API calls
│   ├── store/           # Redux store and slices
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── .github/
│   └── workflows/       # CI/CD pipelines
├── android/             # Android native code
├── ios/                 # iOS native code
└── __tests__/          # Test files
```

## Configuration

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password and Google)
4. Create a Firestore database
5. Enable Cloud Storage
6. Enable Cloud Messaging
7. Add your app (iOS and Android)
8. Download configuration files

### Google Sign-In

Update `webClientId` in `src/contexts/AuthContext.tsx` with your Google OAuth client ID.

### Push Notifications

Configure Firebase Cloud Messaging for both iOS and Android following the [official documentation](https://rnfirebase.io/messaging/usage).

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@taskmanagerpro.com or open an issue on GitHub.

## Acknowledgments

- Material Design by Google
- Firebase by Google
- React Native community
- All open-source contributors

---

Built with ❤️ using React Native
