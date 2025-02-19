/* eslint-disable complexity */
import messaging from '@react-native-firebase/messaging';
import { LogEvents } from '../utils/DevLogs';
import { DeviceEventEmitter } from 'react-native';
import { navigationRef } from '../navigation/stackNavigation';
import { CommonActions } from '@react-navigation/native';
import { showToastError, showToastSuccess } from '../utils';
import { EVENT_EMITTER_NAME } from '../constants/Enum';

const FCM_STATES = {
  KILL_STATE: 'KILL_STATE',
  MINIMIZED_STATE: 'MINIMIZED_STATE',
  BACKGROUND_STATE: 'BACKGROUND_STATE',
  FOREGROUND_STATE: 'FOREGROUND_STATE'
};

export class FirebaseStore {
  static token = null;
  static notificationData = null;

  static updateTokenEvent(params) {
    this.token = params;
  }

  static listenerPushNotification() {
    // Check if the app was opened from a killed state (cold start)
    messaging()
      .getInitialNotification()
      .then((notificationOpen) => {
        if (notificationOpen) {
          this.pushNavigation({
            label: FCM_STATES.KILL_STATE,
            data: notificationOpen
          });
        }
      })
      .catch((e) => {
        LogEvents({
          label: '----Push Kill state Error----',
          msg: e
        });
      });

    // Handle background state notifications when the user taps on them
    messaging().onNotificationOpenedApp((remoteMessage) => {
      if (remoteMessage) {
        this.pushNavigation({
          label: FCM_STATES.MINIMIZED_STATE,
          data: remoteMessage
        });
      }
    });

    // Handle foreground state notifications
    messaging().onMessage((remoteMessage) => {
      if (remoteMessage) {
        this.pushNavigation({
          label: FCM_STATES.FOREGROUND_STATE,
          data: remoteMessage
        });
      }
    });

    // Set background message handler for receiving notifications when the app is in the background
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      if (remoteMessage) {
        this.pushNavigation({
          label: FCM_STATES.BACKGROUND_STATE,
          data: remoteMessage
        });
      }
    });
  }

  static pushNavigation(msg) {
    LogEvents({
      label: '---- Push notification ----',
      msg: msg
    });
    switch (msg.label) {
      case FCM_STATES.FOREGROUND_STATE:
        this.foregroundEvent(msg?.data?.data?.notification_type, msg?.data);
        break;

      case FCM_STATES.KILL_STATE:
        this.notificationData = msg?.data;
        break;

      case FCM_STATES.BACKGROUND_STATE:
      case FCM_STATES.MINIMIZED_STATE:
        this.screenNavigate(msg?.data?.data?.notification_type, msg?.data);
        break;

      default:
        break;
    }
  }

  static screenNavigate(notificationType, data) {
    switch (notificationType) {
      case 'order-placed':
        navigationRef.dispatch(CommonActions.navigate('Orders'));
        navigationRef.dispatch(
          CommonActions.navigate('OrderDetails', {
            orderId: data?.data?.orderId,
            id: data?.data?.uuId
          })
        );
        break;

      case 'order-accepted':
        navigationRef.dispatch(
          CommonActions.navigate('OrderDetails', {
            orderId: data?.data?.orderId,
            id: data?.data?.uuId
          })
        );
        break;

      case 'order-cancelled':
        navigationRef.dispatch(
          CommonActions.navigate('OrderDetails', {
            orderId: data?.data?.orderId,
            id: data?.data?.uuId
          })
        );
        break;

      default:
        break;
    }
  }

  static foregroundEvent(notificationType, data) {
    switch (notificationType) {
      case 'order-placed':
        if (
          DeviceEventEmitter.listenerCount(
            EVENT_EMITTER_NAME.OPENORDERSUMMARY
          ) > 0
        ) {
          DeviceEventEmitter.emit(
            EVENT_EMITTER_NAME.OPENORDERSUMMARY,
            data?.data
          );
        }
        break;

      case 'order-accepted':
        showToastSuccess(data?.notification?.body);
        break;

      case 'order-cancelled':
        showToastError(data?.notification?.body);
        break;

      default:
        break;
    }
  }
}
