import React, { useState } from 'react';
import { Container } from '../../../components';
import { APP_LANGUAGE_CONSTANT } from '../../../constants';
import { useTranslation } from 'react-i18next';
import { Text, View, FlatList } from 'react-native';
import styles from './NotificationAlertScreen.styles';
import ToggleSwitch from 'toggle-switch-react-native';
import { Colors } from '../../../theme';

export default function NotificationAndAlertScreen({ navigation }) {
  const { t } = useTranslation();
  const [NotificationData, setNotificationData] = useState([
    {
      id: '1',
      isEnabled: true,
      title: 'Order Status Updates',
      Description:
        'Toggle for receiving notifications when an order is placed, processed, dispatched, or delivered.'
    },
    {
      id: '2',
      isEnabled: false,
      title: 'Product Availability',
      Description: 'Notifications when out-of-stock products become available.'
    },
    {
      id: '3',
      isEnabled: true,
      title: 'Discount and Promotion Updates',
      Description:
        'Receive updates on special promotions, deals, and exclusive offers.'
    },
    {
      id: '4',
      isEnabled: false,
      title: 'Do Not Disturb',
      Description: 'Set specific hours when notifications should not be sent.'
    },
    {
      id: '5',
      isEnabled: false,
      title: 'Login Alerts',
      Description:
        'Notifications for successful and unsuccessful login attempts for security purposes.'
    },
    {
      id: '6',
      isEnabled: true,
      title: 'Credit Limit Reminders',
      Description: 'Alerts when nearing or exceeding credit limits.'
    }
  ]);

  const rememberMe = (id) => {
    const updatedData = NotificationData.map((item, index) => {
      if (item.id === id) {
        return { ...item, isEnabled: !item.isEnabled }; // Toggle only the current item
      }
      return item;
    });
    setNotificationData(updatedData);
  };

  return (
    <Container title={t(APP_LANGUAGE_CONSTANT.NOTIFICATION_ALERT)}>
      <FlatList
        data={NotificationData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View activeOpacity={0.6} style={styles.faqHeader}>
            <View style={styles.titleView}>
              <Text style={styles.question}>{item?.title}</Text>
              <Text style={styles.answerContainer}>{item?.Description}</Text>
            </View>
            <View style={styles.toggle}>
              <ToggleSwitch
                isOn={item?.isEnabled}
                offColor={Colors.grey}
                labelStyle={styles.toggleLevel}
                size="small"
                onColor={Colors.orange10}
                onToggle={() => rememberMe(item?.id)}
              />
            </View>
          </View>
        )}
      />
    </Container>
  );
}
