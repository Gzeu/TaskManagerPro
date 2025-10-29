import PushNotification from 'react-native-push-notification';
import { firebaseMessaging } from '@config/firebase';
import { Platform } from 'react-native';

export const setupNotifications = async () => {
  PushNotification.configure({
    onRegister: async token => {
      console.log('FCM Token:', token);
    },
    onNotification: notification => {
      console.log('Notification:', notification);
      notification.finish(PushNotification.FetchResult.NoData);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios',
  });

  PushNotification.createChannel(
    {
      channelId: 'task-reminders',
      channelName: 'Task Reminders',
      channelDescription: 'Notifications for task reminders and deadlines',
      soundName: 'default',
      importance: 4,
      vibrate: true,
    },
    created => console.log(`Channel created: ${created}`),
  );

  const authStatus = await firebaseMessaging().requestPermission();
  const enabled =
    authStatus === 1 || authStatus === 2;

  if (enabled) {
    const fcmToken = await firebaseMessaging().getToken();
    console.log('FCM Token:', fcmToken);
  }
};

export const scheduleTaskReminder = (taskId: string, title: string, date: Date) => {
  PushNotification.localNotificationSchedule({
    channelId: 'task-reminders',
    id: taskId.hashCode(),
    title: 'Task Reminder',
    message: title,
    date,
    allowWhileIdle: true,
  });
};

export const cancelTaskReminder = (taskId: string) => {
  PushNotification.cancelLocalNotification(taskId.hashCode());
};

String.prototype.hashCode = function () {
  let hash = 0;
  for (let i = 0; i < this.length; i++) {
    const char = this.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash;
};
