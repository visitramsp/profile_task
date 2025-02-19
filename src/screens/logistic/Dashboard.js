/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppIcon } from '../../assets/icon';
import { AnimatedHeader } from '../../components';
import DriverList from '../../components/listContent/DriverList';
import TodayCard from '../../components/logistic/TodayCard';
import OngoinOrders from '../../components/orders/OngoinOrders';
import PendingOrders from '../../components/orders/PendingOrders';
import { ApplicationStyles, Colors, verticalScale } from '../../theme';

const scrollWidth = Dimensions.get('window').width;

export default function LogisticDashboard(nav) {
  const { top, bottom } = useSafeAreaInsets(); // Get the safe area insets
  const { t } = useTranslation();
  const scrollViewRef = useRef(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [isShowHistory, setIsShowHistory] = useState(false);
  const [searchText, setSearchText] = useState('');
  let scrollOffset = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollViewRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        scrollOffset += scrollWidth; // Adjust this value based on the width of your screen or items
        if (scrollOffset > contentWidth) {
          scrollOffset = 0;
        }
        scrollViewRef.current.scrollTo({ x: scrollOffset, animated: true });
      }
    }, 2000); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, [contentWidth, scrollWidth]);

  const onPressRight = () => {
    if (isShowHistory) {
      setIsShowHistory(false);
    } else {
      setIsShowHistory(true);
    }
  };

  return (
    <ImageBackground
      source={AppIcon.universalUI}
      style={[ApplicationStyles.flex1, styles.container]}
    >
      {/* Configure the status bar for both iOS and Android */}
      <StatusBar
        translucent // Make the status bar translucent on Android
        barStyle="light-content" // Light text for both iOS and Android
        backgroundColor="transparent" // Transparent background for Android
      />
      <View style={[styles.safeArea, { paddingTop: top }]}>
        <AnimatedHeader
          centerIconSize={170}
          left={false}
          isShowHistory={isShowHistory}
          setIsShowHistory={setIsShowHistory}
          value={searchText}
          searchLength={searchText.length}
          onPressRight={onPressRight}
          onChangeText={(text) => {
            setSearchText(text);
          }}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: bottom + verticalScale(75) }}
        >
          <TodayCard />
          <OngoinOrders />
          <PendingOrders />
          <DriverList />
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  container: {
    backgroundColor: Colors.grayF2F2F2, // Color of the space between drawer and home screen
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12
  }
});
