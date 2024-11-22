import { useState, useEffect, useRef } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

interface NotificationData {
  sound?: string;
  title?: string;
  body?: string;
}

async function sendPushNotification(pokeeExpoPushToken: string, data: NotificationData) {
  const message = {
    to: pokeeExpoPushToken,
    sound: data.sound || 'default',
    title: data.title || 'Original Title',
    body: data.body || 'And here is the body!',
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }

    try {
      const pushTokenString = (await Notifications.getExpoPushTokenAsync()).data;
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}

export default function usePushNotifications() {
  const [expoPushToken, setExpoPushToken] = useState<string>('');
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(
    undefined
  );

  useEffect(() => {
    // Register for push notifications
    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token ?? ''))
      .catch((error: any) => setExpoPushToken(`${error}`));

    // Add notification listeners
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);

      AsyncStorage.getItem('notifications').then((notifications) => {
        AsyncStorage.setItem('notifications', JSON.stringify([...JSON.parse(notifications || '[]'), notification.request.content.body]));
      });
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    // Clean up listeners on unmount
    return () => {
      // These return functions are used to remove the listeners
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  // Function to send notifications
  const sendNotification = async (pokeeExpoPushToken: string, data: NotificationData) => {
    console.log('Sending notification to:', pokeeExpoPushToken);
    if (!pokeeExpoPushToken) {
      alert('Push token not available. Make sure you are connected to the server.');
      return;
    }

    if (!data) {
      alert('Notification data not available.');
      return;
    }

    try {
      await sendPushNotification(pokeeExpoPushToken, data);
      // const notifications = await AsyncStorage.getItem('notifications');
      // await AsyncStorage.setItem('notifications', JSON.stringify([...JSON.parse(notifications || '[]'), data.body]));
      console.log('Notification sent successfully');
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send notification');
    }
  };

  return { expoPushToken, notification, sendNotification };
}
