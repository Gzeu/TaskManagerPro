# API Documentation

## Service Layer APIs

### Task Service (`taskService.ts`)

#### getUserTasks
Fetches all tasks for a specific user.

```typescript
getUserTasks(userId: string): Promise<Task[]>
```

**Parameters:**
- `userId`: The ID of the user

**Returns:** Promise resolving to an array of tasks

**Example:**
```typescript
const tasks = await getUserTasks('user123');
```

#### createTask
Creates a new task.

```typescript
createTask(task: Omit<Task, 'id'>): Promise<Task>
```

**Parameters:**
- `task`: Task object without ID

**Returns:** Promise resolving to the created task with ID

**Example:**
```typescript
const newTask = await createTask({
  title: 'Complete project',
  description: 'Finish the React Native app',
  status: TaskStatus.TODO,
  priority: TaskPriority.HIGH,
  labels: ['work', 'urgent'],
  attachments: [],
  createdBy: 'user123',
  createdAt: new Date(),
  updatedAt: new Date(),
  order: 0,
});
```

#### updateTask
Updates an existing task.

```typescript
updateTask(id: string, updates: Partial<Task>): Promise<Task>
```

**Parameters:**
- `id`: Task ID
- `updates`: Partial task object with fields to update

**Returns:** Promise resolving to the updated task

**Example:**
```typescript
const updated = await updateTask('task123', {
  status: TaskStatus.COMPLETED,
  completedAt: new Date(),
});
```

#### deleteTask
Deletes a task.

```typescript
deleteTask(id: string): Promise<void>
```

**Parameters:**
- `id`: Task ID

**Returns:** Promise resolving when deletion is complete

#### bulkUpdateTasks
Updates multiple tasks at once.

```typescript
bulkUpdateTasks(updates: Array<{ id: string; updates: Partial<Task> }>): Promise<Task[]>
```

**Parameters:**
- `updates`: Array of objects containing task IDs and their updates

**Returns:** Promise resolving to array of updated tasks

**Example:**
```typescript
const updated = await bulkUpdateTasks([
  { id: 'task1', updates: { status: TaskStatus.COMPLETED } },
  { id: 'task2', updates: { priority: TaskPriority.HIGH } },
]);
```

#### subscribeToTasks
Sets up a real-time listener for task changes.

```typescript
subscribeToTasks(userId: string, callback: (tasks: Task[]) => void): () => void
```

**Parameters:**
- `userId`: User ID
- `callback`: Function called when tasks change

**Returns:** Unsubscribe function

**Example:**
```typescript
const unsubscribe = subscribeToTasks('user123', (tasks) => {
  console.log('Tasks updated:', tasks);
});

// Later, to stop listening
unsubscribe();
```

---

### User Service (`userService.ts`)

#### getUserData
Fetches user data from Firestore.

```typescript
getUserData(userId: string): Promise<User | null>
```

#### createUserDocument
Creates a new user document in Firestore.

```typescript
createUserDocument(user: User): Promise<void>
```

#### updateUserData
Updates user data.

```typescript
updateUserData(userId: string, updates: Partial<User>): Promise<void>
```

---

### Label Service (`labelService.ts`)

#### getUserLabels
Fetches all labels for a user.

```typescript
getUserLabels(userId: string): Promise<Label[]>
```

#### createLabel
Creates a new label.

```typescript
createLabel(label: Omit<Label, 'id'>): Promise<Label>
```

#### updateLabel
Updates a label.

```typescript
updateLabel(id: string, updates: Partial<Label>): Promise<Label>
```

#### deleteLabel
Deletes a label.

```typescript
deleteLabel(id: string): Promise<void>
```

---

### Notification Service (`notificationService.ts`)

#### setupNotifications
Initializes notification system.

```typescript
setupNotifications(): Promise<void>
```

#### scheduleTaskReminder
Schedules a local notification for a task.

```typescript
scheduleTaskReminder(taskId: string, title: string, date: Date): void
```

**Example:**
```typescript
scheduleTaskReminder(
  'task123',
  'Complete project documentation',
  new Date(2024, 11, 25, 9, 0)
);
```

#### cancelTaskReminder
Cancels a scheduled notification.

```typescript
cancelTaskReminder(taskId: string): void
```

---

### Biometric Service (`biometricService.ts`)

#### isBiometricAvailable
Checks if biometric authentication is available.

```typescript
isBiometricAvailable(): Promise<boolean>
```

#### authenticateWithBiometric
Prompts user for biometric authentication.

```typescript
authenticateWithBiometric(reason?: string): Promise<boolean>
```

**Example:**
```typescript
const authenticated = await authenticateWithBiometric(
  'Authenticate to access your tasks'
);

if (authenticated) {
  // Allow access
}
```

#### setupBiometricAuth
Sets up biometric authentication keys.

```typescript
setupBiometricAuth(): Promise<boolean>
```

#### storeSecureData
Stores data securely in keychain.

```typescript
storeSecureData(key: string, value: string): Promise<boolean>
```

#### getSecureData
Retrieves secure data from keychain.

```typescript
getSecureData(key: string): Promise<string | null>
```

---

## Redux Actions

### Task Slice

#### fetchTasks
Async thunk to fetch tasks.

```typescript
dispatch(fetchTasks(userId))
```

#### createTask
Async thunk to create a task.

```typescript
dispatch(createTask(taskData))
```

#### updateTask
Async thunk to update a task.

```typescript
dispatch(updateTask({ id: 'task123', updates: { status: TaskStatus.COMPLETED } }))
```

#### deleteTask
Async thunk to delete a task.

```typescript
dispatch(deleteTask('task123'))
```

#### setFilter
Sets task filters.

```typescript
dispatch(setFilter({ status: TaskStatus.TODO, priority: TaskPriority.HIGH }))
```

#### clearFilter
Clears all filters.

```typescript
dispatch(clearFilter())
```

#### setSortBy
Sets sort order.

```typescript
dispatch(setSortBy('dueDate'))
```

#### reorderTasks
Reorders tasks after drag & drop.

```typescript
dispatch(reorderTasks({ from: 0, to: 2 }))
```

---

### UI Slice

#### setCalendarView
Changes calendar view mode.

```typescript
dispatch(setCalendarView('week'))
```

#### toggleSidebar
Toggles sidebar visibility.

```typescript
dispatch(toggleSidebar())
```

#### completeOnboarding
Marks onboarding as completed.

```typescript
dispatch(completeOnboarding())
```

---

## Utility Functions

### Export Utils (`exportUtils.ts`)

#### exportToExcel
Exports tasks to Excel file.

```typescript
exportToExcel(tasks: Task[], filename?: string): Promise<string>
```

#### exportToCSV
Exports tasks to CSV file.

```typescript
exportToCSV(tasks: Task[], filename?: string): Promise<string>
```

#### importFromCSV
Imports tasks from CSV file.

```typescript
importFromCSV(filePath: string): Promise<Partial<Task>[]>
```

---

### Recurrence Utils (`recurrenceUtils.ts`)

#### createRRule
Creates an RRule from recurrence settings.

```typescript
createRRule(settings: RecurrenceSettings, startDate: Date): RRule
```

#### getNextOccurrence
Gets the next occurrence date.

```typescript
getNextOccurrence(rruleString: string, after?: Date): Date | null
```

#### formatRecurrence
Formats recurrence settings to human-readable string.

```typescript
formatRecurrence(settings: RecurrenceSettings): string
```

---

## Custom Hooks

### useKeyboard
Hook to track keyboard state.

```typescript
const { keyboardHeight, isKeyboardVisible } = useKeyboard();
```

### useDebounce
Hook to debounce a value.

```typescript
const debouncedValue = useDebounce(searchQuery, 500);
```

---

## Context APIs

### ThemeContext

```typescript
const { theme, themeMode, isDark, setThemeMode, toggleTheme } = useTheme();
```

**Properties:**
- `theme`: Current theme object
- `themeMode`: 'light' | 'dark' | 'auto'
- `isDark`: boolean indicating if dark mode is active
- `setThemeMode(mode)`: Function to change theme mode
- `toggleTheme()`: Function to toggle between light and dark

### AuthContext

```typescript
const {
  user,
  loading,
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
  signOut,
  resetPassword,
  updateUserRole
} = useAuth();
```

**Properties:**
- `user`: Current user object or null
- `loading`: Authentication loading state
- `signInWithEmail(email, password)`: Sign in with email
- `signUpWithEmail(email, password, displayName)`: Create account
- `signInWithGoogle()`: Sign in with Google OAuth
- `signOut()`: Sign out current user
- `resetPassword(email)`: Send password reset email
- `updateUserRole(userId, role)`: Update user role (admin only)

---

## Firebase Collections Structure

### users
```typescript
{
  id: string,
  email: string,
  displayName: string,
  photoURL?: string,
  role: 'admin' | 'user' | 'guest',
  createdAt: Timestamp,
  lastLoginAt: Timestamp,
  preferences: {
    theme: 'light' | 'dark' | 'auto',
    language: string,
    notifications: {...},
    biometricEnabled: boolean
  }
}
```

### tasks
```typescript
{
  id: string,
  title: string,
  description?: string,
  status: 'todo' | 'in_progress' | 'completed' | 'archived',
  priority: 'low' | 'medium' | 'high' | 'urgent',
  dueDate?: Timestamp,
  reminderDate?: Timestamp,
  labels: string[],
  attachments: Attachment[],
  assignedTo?: string[],
  createdBy: string,
  createdAt: Timestamp,
  updatedAt: Timestamp,
  completedAt?: Timestamp,
  recurrence?: RecurrenceSettings,
  order: number,
  teamId?: string
}
```

### teams
```typescript
{
  id: string,
  name: string,
  description?: string,
  ownerId: string,
  members: TeamMember[],
  createdAt: Timestamp
}
```

### labels
```typescript
{
  id: string,
  name: string,
  color: string,
  userId: string
}
```

---

## Error Handling

All service functions throw errors that should be caught:

```typescript
try {
  await createTask(taskData);
} catch (error) {
  console.error('Failed to create task:', error);
  // Handle error (show toast, etc.)
}
```

For Redux thunks, handle errors in the rejected case:

```typescript
dispatch(createTask(taskData))
  .unwrap()
  .then(() => {
    // Success
  })
  .catch((error) => {
    // Handle error
  });
```

---

For more information, see the source code documentation and inline comments.
