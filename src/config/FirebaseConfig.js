import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';
import { LogEvents } from '../utils/DevLogs';
import { FirebaseStore } from '../staticStore/FirebaseStore';

const FCM_TOKEN = 'FCM_TOKEN';

//Get Device Registration Token
const getToken = async () => {
  let fcmToken = await AsyncStorage.getItem(FCM_TOKEN);
  LogEvents({ label: 'FCM-TOKEN', msg: fcmToken });
  if (!fcmToken) {
    fcmToken = await messaging().getToken();
    LogEvents({ label: 'FCM-TOKEN', msg: fcmToken });
    if (fcmToken) {
      FirebaseStore.updateTokenEvent(fcmToken);
      await AsyncStorage.setItem(FCM_TOKEN, fcmToken);
    }
  } else {
    FirebaseStore.updateTokenEvent(fcmToken);
  }
};

export const requestUserPermission = async () => {
  const authorizationStatus = await messaging().requestPermission();

  if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
    if (Platform.OS === 'android') {
      request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
        .then((res) => {
          getToken();
        })
        .catch((e) => {
          // eslint-disable-next-line no-restricted-syntax
          console.log(e);
        });
    } else {
      getToken();
    }
  } else if (
    authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
  ) {
    LogEvents({
      label: 'FCM-TOKEN-REQ-PERMISSION',
      msg: 'User has provisional notification permissions.'
    });
  } else {
    LogEvents({
      label: 'FCM-TOKEN-REQ-PERMISSION',
      msg: `User has notification permissions disabled. ${authorizationStatus}`
    });
  }
};
