export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  ARCHIVED = 'archived',
}

export enum RecurrenceType {
  NONE = 'none',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
  CUSTOM = 'custom',
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  createdAt: Date;
  lastLoginAt: Date;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: NotificationSettings;
  biometricEnabled: boolean;
}

export interface NotificationSettings {
  enabled: boolean;
  taskReminders: boolean;
  deadlineAlerts: boolean;
  teamUpdates: boolean;
  quietHoursStart?: string;
  quietHoursEnd?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  reminderDate?: Date;
  labels: string[];
  attachments: Attachment[];
  assignedTo?: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  recurrence?: RecurrenceSettings;
  parentTaskId?: string;
  order: number;
  teamId?: string;
}

export interface RecurrenceSettings {
  type: RecurrenceType;
  interval: number;
  daysOfWeek?: number[];
  endDate?: Date;
  rruleString?: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: Date;
  uploadedBy: string;
}

export interface Label {
  id: string;
  name: string;
  color: string;
  userId: string;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  members: TeamMember[];
  createdAt: Date;
}

export interface TeamMember {
  userId: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: Date;
}

export interface Comment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  mentions: string[];
}

export interface ActivityLog {
  id: string;
  taskId: string;
  userId: string;
  action: string;
  details: Record<string, any>;
  timestamp: Date;
}

export interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  completionRate: number;
  productivityTrend: ProductivityData[];
  tasksByPriority: Record<TaskPriority, number>;
  tasksByStatus: Record<TaskStatus, number>;
}

export interface ProductivityData {
  date: string;
  completed: number;
  created: number;
}

export interface ChatMessage {
  id: string;
  teamId: string;
  userId: string;
  content: string;
  timestamp: Date;
  attachments?: Attachment[];
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: 'task_reminder' | 'deadline' | 'team_update' | 'mention';
  taskId?: string;
  read: boolean;
  createdAt: Date;
}

export interface Integration {
  id: string;
  type: 'google_calendar' | 'discord' | 'slack';
  userId: string;
  enabled: boolean;
  config: Record<string, any>;
}
