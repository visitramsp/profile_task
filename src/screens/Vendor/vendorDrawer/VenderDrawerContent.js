import React, { useState } from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  LayoutAnimation
} from 'react-native';
import {
  ApplicationStyles,
  Colors,
  horizontalScale,
  moderateScale,
  verticalScale
} from '../../../theme';
import Fonts from '../../../theme/Fonts';

import {
  FailureIcon,
  FinanceManagementIcon,
  InventoryIcon,
  SupportIcon,
  UserManagementIcon,
  NotificationIcon,
  Exit,
  DownArrow,
  UpArrow
} from '../../../assets/icon';

import { AppConstant, SCREEN_NAME } from '../../../constants';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';
import GradientButton from '../../../components/buttons/GradientButton';
import { onPressLogOut } from '../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { setWarehouseId } from '../../../store/app/reducer';

const data = [
  {
    icon: InventoryIcon,
    title: AppConstant.INVENTORY_MANAGEMENT,
    screenName: 'InventryManagementScreen'
  },
  {
    icon: FinanceManagementIcon,
    title: AppConstant.FINANCIAL_MANAGEMENT,
    screenName: SCREEN_NAME.COMING_SOON_SCREEN
  },
  // {
  //   icon: CustomerIcon,
  //   title: AppConstant.CUSTOMER,
  //   screenName: 'userManagement'
  // },
  {
    icon: UserManagementIcon,
    title: AppConstant.USER_MANAGEMENT,
    screenName: 'userManagement'
  },
  {
    icon: SupportIcon,
    title: AppConstant.SUPPORT,
    screenName: 'support'
  },
  {
    icon: SupportIcon,
    title: AppConstant.ARCHIVE_PRODUCT,
    screenName: 'deleteProduct'
  },
  {
    icon: SupportIcon,
    title: AppConstant.REFERRAL_ON,
    screenName: 'ReferAndEarnScreen'
  }
  // {
  //   icon: RatingIcon,
  //   title: AppConstant.RATINGS_FEEDBACKS,
  //   screenName: 'rattingFeedback'
  // },
  // {
  //   icon: Terms,
  //   title: AppConstant.TERMS_CONDITIONS,
  //   screenName: 'termsCondition'
  // }
  // {
  //   icon: SettingIcon,
  //   title: AppConstant.SETTING_TAB,
  //   screenName: 'setting'
  // }
];

export default function VenderDrawerContent(props) {
  const { t } = useTranslation();
  const { state, navigation } = props;
  const activeRouteName = state.routeNames[state.index];
  const { userDetail } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(null);

  const onPressMenu = (index, screenName) => {
    if (index === 0) {
      if (userDetail?.addresses?.length > 0) {
        setIsVisible(index === isVisible ? null : index);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      } else {
        navigation.navigate(SCREEN_NAME.INVENTORY_SYNC);
      }
    } else {
      navigation.navigate(screenName);
    }
  };

  const onPressWarehouse = (id) => {
    dispatch(setWarehouseId(id));
  };

  return (
    <View style={[ApplicationStyles.flex1]}>
      <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => navigation.navigate(SCREEN_NAME.NOTIFICATION_SCREEN)}
          >
            <NotificationIcon width={21} height={23} />
            <View style={styles.notiNumberContainer}>
              <Text style={styles.notiNumber}>8</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.cancelContainer}>
            <FailureIcon style={styles.top5} />
            <View style={styles.flex}>
              <Text style={styles.cancelTxt}> Order Cancel</Text>
              <Text style={styles.cancelDes}>
                Order delivered successfully, you can check order delivery
                status
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.listContainer}>
          {data?.map((res, index) => {
            const { icon: Icon, title, screenName } = res;
            return (
              <View key={index}>
                <TouchableOpacity
                  style={styles.itemBtn}
                  onPress={() => onPressMenu(index, screenName)}
                >
                  {screenName === activeRouteName && (
                    <LinearGradient
                      colors={[Colors.orange10, Colors.orange30]}
                      key={index}
                      style={styles.selectedBtn}
                    />
                  )}
                  <Icon height={28} width={28} />
                  <Text style={styles.itemText} numberOfLines={2}>
                    {title}
                  </Text>
                  {index === 0 && (
                    <View style={{ paddingLeft: horizontalScale(10) }}>
                      {isVisible === index ? (
                        <UpArrow height={20} width={20} />
                      ) : (
                        <DownArrow height={20} width={20} />
                      )}
                    </View>
                  )}
                </TouchableOpacity>
                <View style={{ paddingLeft: horizontalScale(40) }}>
                  {isVisible === index &&
                    userDetail?.addresses?.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          activeOpacity={0.5}
                          style={{ paddingVertical: verticalScale(10) }}
                          onPress={() => {
                            onPressWarehouse(item?.uuid);
                            setIsVisible(null);
                            navigation.navigate(screenName);
                          }}
                        >
                          <Text
                            style={{
                              ...styles.itemText,
                              fontSize: Fonts.size.input
                            }}
                            numberOfLines={1}
                          >
                            {item?.address}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                </View>
              </View>
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
    </View>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingLeft: '3%',
    paddingTop: verticalScale(30)
  },
  listContainer: {
    paddingTop: verticalScale(20),
    width: '100%',
    paddingLeft: '3%'
  },
  itemBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: verticalScale(53),
    marginTop: verticalScale(10),
    paddingHorizontal: moderateScale(15)
  },
  itemText: {
    flex: 1,
    fontSize: Fonts.size.h6,
    fontFamily: Fonts.type.robotoRegular,
    color: Colors.grey30,
    marginLeft: moderateScale(15)
  },
  selectedBtn: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 20,
    position: 'absolute',
    opacity: 0.3
  },
  notificationButton: {
    marginRight: 10,
    width: horizontalScale(50),
    height: horizontalScale(50),
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 20,
    backgroundColor: Colors.orange30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.orange10,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4
  },
  cancelTxt: {
    fontSize: Fonts.size.sminy,
    color: Colors.red,
    fontFamily: Fonts.type.robotoBold
  },
  cancelDes: {
    fontSize: Fonts.size.s10,
    color: Colors.gray20,
    fontFamily: Fonts.type.robotoRegular
  },
  notiNumberContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: Colors.red,
    height: verticalScale(14),
    minWidth: verticalScale(14),
    padding: moderateScale(2),
    borderRadius: 20,
    top: moderateScale(10),
    right: moderateScale(10),
    shadowColor: Colors.red,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4
  },
  notiNumber: {
    color: Colors.white,
    fontFamily: Fonts.type.robotoBold,
    fontSize: 8
  },
  cancelContainer: {
    width: '75%',
    minHeight: verticalScale(60),
    borderRadius: 20,
    paddingRight: moderateScale(5),
    backgroundColor: Colors.primary80,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  top5: { top: 5 },
  flex: { flex: 1 },
  logoutBtn: {
    width: horizontalScale(207),
    height: verticalScale(55),
    alignSelf: 'center',
    marginBottom: verticalScale(30),
    marginLeft: '3%'
  },
  logoutTxt: {
    paddingLeft: moderateScale(7),
    fontSize: Fonts.size.h20
  }
});
