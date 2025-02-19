import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import {
  Call,
  Chat,
  Close,
  FAQs,
  Feedback,
  Info,
  Setting
} from '../../assets/icon';
import { Colors, Fonts, horizontalScale, verticalScale } from '../../theme';
import { AppConstant } from '../../constants';
import DrawerDropdownItem from '../drawerDropdownItem/DrawerDropdownItem';

export default function CustomDrawerContent(props) {
  const CHAT_ITEMS = [
    {
      title: AppConstant.AQAD_APP,
      screen: 'AQADApp'
    },
    {
      title: AppConstant.WHATSAPP,
      screen: 'WhatsAppMessage'
    }
  ];

  const REQUEST_CALL_ITEMS = [
    {
      title: AppConstant.TECHNICAL_ISSUE,
      screen: 'technical'
    },
    {
      title: AppConstant.SALES_RELATED,
      screen: 'sales'
    },
    {
      title: AppConstant.CONTACT_EMAIL,
      screen: 'contact'
    }
  ];

  const data = [
    {
      icon: Chat,
      title: AppConstant.CHAT_WITH_US,
      data: CHAT_ITEMS,
      isDropDown: true
    },
    {
      icon: Call,
      title: AppConstant.REQUEST_CALL,
      data: REQUEST_CALL_ITEMS,
      isDropDown: true
    },
    {
      icon: FAQs,
      title: AppConstant.FAQS,
      isRight: false,
      screenName: 'FAQ`S'
    },
    {
      icon: Info,
      title: AppConstant.ABOUT_US,
      isRight: false,
      screenName: 'About Us'
    },
    {
      icon: Feedback,
      title: AppConstant.RATINGS_FEEDBACKS,
      isRight: false,
      screenName: 'Rating & Feedback'
    },
    {
      icon: Setting,
      title: AppConstant.CAP_SETTINGS,
      isRight: false,
      screenName: 'Settings'
    }
  ];

  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => props.navigation.closeDrawer()}
        >
          <Close width={horizontalScale(20)} height={verticalScale(20)} />
        </TouchableOpacity>
        <Text style={styles.menuText}>{AppConstant.MENU}</Text>
      </View>

      <View style={{ paddingTop: verticalScale(20) }}>
        {data?.map((res, index) => {
          return (
            <View key={index}>
              <DrawerDropdownItem
                Icon={res?.icon}
                title={res?.title}
                screenName={res?.screenName}
                isRight={res?.isRight}
                isDropDown={res?.isDropDown}
                data={res?.data}
              />
            </View>
          );
        })}
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(30)
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(15)
  },
  menuButton: {},
  menuText: {
    fontSize: 20,
    color: Colors.black10,
    fontFamily: Fonts.type.robotoBold,
    letterSpacing: 1,
    alignItems: 'center',
    flex: 1,
    textAlign: 'center',
    paddingRight: horizontalScale(9)
  }
});
