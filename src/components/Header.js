import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ArrowLeft, Bell, HamBurger } from '../assets/icon';
import { HEADER_TYPE } from '../constants/Enum';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  moderateScale,
  verticalScale
} from '../theme';

export default function Header(props) {
  const {
    isBack = true,
    isLeft = true,
    isRight = false,
    isShowNotificationBtn = false,
    headerType,
    headerTitle,
    onPressLeft = () => null,
    onPressRight = () => null,
    renderRightIcon = () => null,
    customContainer = () => {},
    leftIcon
  } = props;

  const headerTypeOnlyTitle = () => headerType === HEADER_TYPE.ONLY_TITLE;

  const leftImg = () => {
    if (leftIcon) {
      return leftIcon;
    } else if (isBack) {
      return <ArrowLeft width={24} height={24} />;
    } else {
      return <HamBurger width={24} height={24} />;
    }
  };

  const leftComponents = () => {
    return (
      <TouchableOpacity
        style={[styles.leftContainerStyle]}
        activeOpacity={0.5}
        onPress={() => onPressLeft()}
      >
        {leftImg()}
      </TouchableOpacity>
    );
  };

  const rightComponents = () => {
    return (
      <>
        {isShowNotificationBtn && (
          <TouchableOpacity
            style={styles.notificationBtn}
            onPress={() => onPressRight()}
          >
            <>
              <Bell />
              <View style={styles.countView}>
                <Text style={styles.notificationCount}>10</Text>
              </View>
            </>
          </TouchableOpacity>
        )}
        {renderRightIcon()}
      </>
    );
  };

  return (
    <View style={[styles.container, customContainer]}>
      {isLeft ? leftComponents() : <View style={styles.emptyView} />}
      {headerTypeOnlyTitle() && (
        <Text style={styles.headerTitle}>{headerTitle}</Text>
      )}
      {isRight ? rightComponents() : <View style={styles.emptyView} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...ApplicationStyles.pageSpacing,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.secondary,
    paddingVertical: verticalScale(13),
    shadowColor: Colors.blackShadow30,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5
  },
  notificationBtn: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    shadowColor: Colors.black,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5
  },
  notificationCount: {
    fontFamily: Fonts.type.robotoBold,
    color: Colors.secondary,
    borderRadius: 50,
    fontSize: 10,
    paddingHorizontal: horizontalScale(3),
    paddingVertical: verticalScale(2)
  },
  countView: {
    position: 'absolute',
    borderRadius: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    top: 11,
    right: 16,
    backgroundColor: Colors.primary
  },
  headerTitle: {
    ...ApplicationStyles.normalMontserratFont,
    color: Colors.white70,
    fontWeight: Fonts.Weight.seven
  },
  emptyView: {
    width: horizontalScale(15),
    height: verticalScale(15)
  },
  leftContainerStyle: {
    width: 40,
    height: 40,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    top: -3,
    left: -5,
    paddingRight: 5,
    paddingBottom: 5
  }
});
