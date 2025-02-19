import React from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  Colors,
  horizontalScale,
  moderateScale,
  verticalScale
} from '../../theme';
import Fonts from '../../theme/Fonts';

import {
  FinancialIcon,
  InventoryIcon,
  SupportIcon,
  UserManagementIcon,
  NotificationIcon,
  SuccessIcon,
  Exit
} from '../../assets/icon';

import { AppConstant, SCREEN_NAME } from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';
import GradientButton from '../../components/buttons/GradientButton';
import { onPressLogOut } from '../../utils';

const data = [
  {
    icon: UserManagementIcon,
    title: 'Wishlist',
    screenName: 'wishlistScreen'
  },
  {
    icon: UserManagementIcon,
    title: 'Orders',
    screenName: 'orderes'
  },
  {
    icon: InventoryIcon,
    title: AppConstant.INVENTORY_MANAGEMENT,
    screenName: 'comingSoonScreen'
  },
  {
    icon: FinancialIcon,
    title: AppConstant.FINANCIAL_MANAGEMENT,
    screenName: SCREEN_NAME.COMING_SOON_SCREEN
  },
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
  // },
  // {
  //   icon: SettingIcon,
  //   title: AppConstant.SETTING_TAB,
  //   screenName: 'setting'
  // }
];

// wishlistScreen
export default function RetailerDrawerContent(props) {
  const { navigate } = useNavigation();
  const { t } = useTranslation();
  const { state, navigation } = props;
  const activeRouteName = state.routeNames[state.index];

  return (
    <>
      <DrawerContentScrollView {...props}>
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
          <View style={styles.successContainer}>
            <SuccessIcon style={styles.top5} />
            <View style={styles.flex}>
              <Text style={styles.successTxt}>{t('SUCCESS')}</Text>
              <Text style={styles.successDes}>
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
              <TouchableOpacity
                key={index}
                style={styles.itemBtn}
                onPress={() => navigate(screenName)}
              >
                {screenName === activeRouteName && (
                  <LinearGradient
                    colors={[Colors.orange10, Colors.orange30]}
                    key={index}
                    style={styles.selectedBtn}
                  />
                )}
                <Icon height={28} width={28} />
                <Text style={styles.itemText}>{title}</Text>
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
    height: verticalScale(50),
    marginTop: verticalScale(10),
    width: '95%',
    paddingHorizontal: moderateScale(15)
  },
  itemText: {
    fontSize: Fonts.size.h20,
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
  successTxt: {
    fontSize: Fonts.size.sminy,
    color: Colors.green10,
    fontFamily: Fonts.type.robotoBold
  },
  successDes: {
    fontSize: Fonts.size.s10,
    color: Colors.white,
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
  successContainer: {
    width: '75%',
    minHeight: verticalScale(60),
    borderRadius: 20,
    paddingRight: moderateScale(5),
    borderWidth: 1,
    borderColor: Colors.green10,
    backgroundColor: Colors.green10 + 80,
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
