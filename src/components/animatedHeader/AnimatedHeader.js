import React, { useState } from 'react';
import {
  TouchableOpacity,
  LayoutAnimation,
  View,
  StyleSheet,
  TextInput
} from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';

import { DrawerActions, useNavigation } from '@react-navigation/native';

import { APP_LANGUAGE_CONSTANT } from '../../constants/AppConstant';
import Fonts from '../../theme/Fonts';
import { SideDrawerIcon, SearchIcon, SupplyStackLogo } from '../../assets/icon';
import {
  ApplicationStyles,
  Colors,
  horizontalScale,
  PAGE_SPACING,
  verticalScale,
  width
} from '../../theme';
import { navigationRef } from '../../navigation/stackNavigation';

const ICON_SIZE = 50;

const AnimatedHeader = ({
  left = true,
  centerIconSize = 150,
  onPressRight = () => null,
  value,
  onChangeText,
  onSubmitEditing = () => {},
  isShowHistory = false,
  setIsShowHistory = () => null,
  searchLength = 0
}) => {
  const { t } = useTranslation();
  const { dispatch } = useNavigation();

  const [visibleTextInput, setVisibleTextInput] = useState(false);

  const animation = useSharedValue(0);
  const animationStyle = useAnimatedStyle(() => {
    return {
      width:
        animation.value === 1
          ? withTiming(width * 0.85, { duration: 500 })
          : withTiming(ICON_SIZE, { duration: 500 })
    };
  });

  const openDrawer = () => dispatch(DrawerActions.openDrawer());

  const onPressSearch = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onPressRight();
    if (visibleTextInput) {
      animation.value = 0;
      setVisibleTextInput(false);
    } else {
      animation.value = 1;
      setVisibleTextInput(true);
    }
  };

  const onBlur = () => {
    if (visibleTextInput && searchLength === 0) {
      animation.value = 0;
      setVisibleTextInput(false);
      setIsShowHistory(false);
    }
  };

  const navigateAbout = () => {
    navigationRef.navigate('aboutUsScreen');
  };

  return (
    <View
      style={[
        ApplicationStyles.pageSpacing,
        ApplicationStyles.rowAlignCenterJustifyBetween,
        { paddingVertical: verticalScale(8) }
      ]}
    >
      {left && (
        <TouchableOpacity
          style={[styles.icon, styles.leftImg]}
          onPress={openDrawer}
        >
          <SideDrawerIcon />
        </TouchableOpacity>
      )}

      <TouchableOpacity activeOpacity={0.8} onPress={navigateAbout}>
        <SupplyStackLogo
          width={horizontalScale(120)}
          height={verticalScale(40)}
          color={Colors.white}
        />
      </TouchableOpacity>

      <View style={styles.icon} />

      <Animated.View style={[styles.textinputContainer, animationStyle]}>
        {visibleTextInput && (
          <TextInput
            autoFocus={visibleTextInput}
            style={styles.searchInput}
            placeholder={t(APP_LANGUAGE_CONSTANT.SEARCH_HERE)}
            placeholderTextColor={Colors.black}
            value={value}
            onBlur={onBlur}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
          />
        )}
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.searchBtn]}
          onPress={onPressSearch}
        >
          <SearchIcon width={25} height={25} color={Colors.primary10} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: ICON_SIZE,
    width: ICON_SIZE
  },
  leftImg: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 5
  },
  textinputContainer: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: Colors.primary20,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
    height: ICON_SIZE,
    position: 'absolute',
    right: PAGE_SPACING,
    overflow: 'hidden',
    paddingHorizontal: horizontalScale(15),
    zIndex: 9999
  },
  searchInput: {
    flex: 0.85,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.input,
    color: Colors.black
  },
  searchBtn: {
    position: 'absolute',
    right: 0,
    zIndex: 9999,
    height: '100%',
    width: ICON_SIZE,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default AnimatedHeader;
