import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, View, StyleSheet } from 'react-native';
import { AnimatedHeader } from '../../../components';
import MainLayout from '../../../components/layout/Layout';
import DriverList from '../../../components/listContent/DriverList';
import TodayCard from '../../../components/logistic/TodayCard';
import OngoinOrders from '../../../components/orders/OngoinOrders';
import PendingOrders from '../../../components/orders/PendingOrders';
import { ApplicationStyles } from '../../../theme';

const scrollWidth = Dimensions.get('window').width;

export default function LogisticDashboard(nav) {
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
    <MainLayout style={styles.container}>
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
      <View style={ApplicationStyles.pageSpacing}>
        <TodayCard />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <OngoinOrders />
        <PendingOrders />
        <DriverList />
      </ScrollView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
