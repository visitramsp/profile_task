import { DrawerContentScrollView } from '@react-navigation/drawer';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Exit,
  NotificationIcon,
  OrderCancel,
  Rating,
  Settings,
  Support_Outline,
  Terms
} from '../../../assets/icon';
import GradientButton from '../../../components/buttons/GradientButton';
import { AppConstant } from '../../../constants';
import { Colors } from '../../../theme';
import { onPressLogOut } from '../../../utils';
import styles from './CustomDrawerContent.styles';

const data = [
  {
    id: 1,
    icon: Support_Outline,
    name: AppConstant.SUPPORT,
    screenName: 'support'
  },
  {
    id: 2,
    icon: Rating,
    name: AppConstant.RATINGS_FEEDBACKS,
    screenName: 'rattingFeedback'
  },
  {
    id: 3,
    icon: Terms,
    name: AppConstant.TERMS_CONDITIONS,
    screenName: 'termsCondition'
  },
  {
    id: 4,
    icon: Settings,
    name: AppConstant.SETTING_TAB,
    screenName: 'setting'
  }
];

const LogisticDrawerContent = (props) => {
  const { t } = useTranslation();
  const { state } = props;
  const activeRouteName = state.routeNames[state.index];
  const [selected, setSelected] = useState(false);

  return (
    <>
      <DrawerContentScrollView {...props}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => props.navigation.closeDrawer()}
          >
            <NotificationIcon width={21} height={23} />
            <View style={styles.notiNumberContainer}>
              <Text style={styles.notiNumber}>8</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.successContainer}>
            <View style={styles.cancelView}>
              <OrderCancel style={styles.top5} />
            </View>
            <View style={styles.flex}>
              <Text style={styles.successTxt}>{t('ORDER_CANCEL')}</Text>
              <Text style={styles.successDes}>
                {t(
                  AppConstant.ORDER_DELIVERED_SUCCESSFULLY_YOU_CAN_CHECK_ORDER_DELIVERY_STATUS
                )}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.listContainer}>
          {data?.map((res, index) => {
            const { icon: Icon, name, screenName } = res;
            return (
              <TouchableOpacity
                style={[
                  styles.itemBtn,
                  {
                    backgroundColor:
                      selected === name ? Colors.orange90 : Colors.white
                  }
                ]}
                onPress={() => setSelected(name)}
              >
                {screenName === activeRouteName && (
                  <LinearGradient
                    colors={[Colors.orange10, Colors.orange30]}
                    key={index}
                    style={[styles.selectedBtn, {}]}
                  />
                )}
                <Icon
                  height={28}
                  width={28}
                  color={selected === name ? Colors.primary90 : Colors.grey30}
                />
                <Text
                  style={[
                    styles.itemText,
                    {
                      color:
                        selected === name ? Colors.primary90 : Colors.grey30
                    }
                  ]}
                >
                  {name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </DrawerContentScrollView>
      <GradientButton
        title={t('LOGOUT')}
        icon={<Exit />}
        textStyle={styles.logoutTxt}
        style={styles.logoutBtn}
        onPress={onPressLogOut}
      />
    </>
  );
};
export default LogisticDrawerContent;
