import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { useTranslation } from 'react-i18next';
import Carousel from 'react-native-reanimated-carousel';

import {
  Colors,
  width,
  verticalScale,
  ApplicationStyles,
  moderateScale,
  height
} from '../theme';
import Fonts from '../theme/Fonts';
import ContentHeader from '../screens/Retailer/components/ContentHeader';
import OrderProgress from '../screens/Retailer/components/OrderProgress';
import { APP_LANGUAGE_CONSTANT } from '../constants';
import { useNavigation } from '@react-navigation/native';
import CommonLoader from './CommonLoader';

const Orders = ({
  currentOrderData,
  isLoading,
  onPress = () => null
  // onPressOrder
}) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const onPressOrder = (item) => {
    navigation.navigate('OrderDetails', {
      id: item?.uuid
    });
  };

  return (
    <View style={styles.container}>
      <View style={ApplicationStyles.pageSpacing}>
        <ContentHeader
          title={`${t(APP_LANGUAGE_CONSTANT.CURRENT_ORDERS)} (${
            currentOrderData?.length
          })`}
          textStyle={{ color: Colors.secondary }}
          onPress={onPress}
        />
      </View>
      {isLoading ? (
        <View style={{ marginVertical: verticalScale(20) }}>
          <CommonLoader
            isLoading={isLoading}
            loaderStyle={styles.centerLoader}
          />
          {/* <ActivityIndicator size={'large'} color={Colors.orange10} /> */}
        </View>
      ) : currentOrderData.length > 0 ? (
        <Carousel
          loop
          autoPlay={false}
          width={width}
          height={180}
          vertical={false}
          data={currentOrderData}
          autoPlayInterval={3000}
          style={styles.carouselContainer}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50
          }}
          scrollAnimationDuration={2000}
          // eslint-disable-next-line complexity
          renderItem={({ item }) => (
            <>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.imageContainer}
                onPress={() => onPressOrder(item)}
              >
                <View style={styles.row}>
                  <Text style={styles.custId} numberOfLines={1}>
                    {t(APP_LANGUAGE_CONSTANT.ORDER_ID) + '  '}
                    <Text style={styles.orangeClr}>
                      {'#'} {item?.order_id?.slice(0, 10)}
                    </Text>
                  </Text>
                  <Text style={styles.custId}>
                    {t(APP_LANGUAGE_CONSTANT.STATUS) + ': '}
                    {item?.status}
                  </Text>
                </View>

                <OrderProgress
                  step={
                    (item?.status.toLowerCase() === 'new' && 0) ||
                    (item?.status.toLowerCase() === 'accept' && 1) ||
                    (item?.status.toLowerCase() === 'processing' && 1) ||
                    (item?.status.toLowerCase() === 'outfordelivery' && 2) ||
                    (item?.status.toLowerCase() === 'dispatched' && 3) ||
                    (item?.status.toLowerCase() === 'delivered' && 4)
                  }
                />

                <View style={styles.row}>
                  <View style={styles.dateView}>
                    <Text style={styles.deliveryText}>
                      {t(APP_LANGUAGE_CONSTANT.ORDER_TIME)}
                    </Text>
                    <Text style={styles.dayText}>{item?.getOrderDay}</Text>
                    <Text style={styles.arrivalTxt} numberOfLines={1}>
                      {item?.getOrderDate}
                    </Text>
                  </View>
                  <View style={styles.dateView}>
                    <Text style={styles.deliveryText}>
                      {t(APP_LANGUAGE_CONSTANT.ESTIMATED_TIME)}
                    </Text>
                    <Text style={styles.dayText}>
                      {item?.expectedDeliveryDay}
                    </Text>
                    <Text style={styles.arrivalTxt} numberOfLines={1}>
                      {item?.expectedDeliveryDate}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity style={styles.bottomContainer}>
                <Text style={styles.allProductTxt}>
                  {t(APP_LANGUAGE_CONSTANT.ALL_PRODUCT)} ↓
                </Text>
              </TouchableOpacity> */}
            </>
          )}
        />
      ) : (
        <View style={{ paddingBottom: verticalScale(20) }} />
      )}
    </View>
  );
};
export default Orders;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 20
  },
  centerLoader: {
    alignSelf: 'center',
    height: height / 1.5,
    justifyContent: 'center',
    padding: 0
  },
  carouselContainer: {
    shadowColor: Colors.black40,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 5,
    marginTop: verticalScale(10)
  },
  imageContainer: {
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: Colors.secondary,
    padding: 14,
    shadowColor: Colors.orange10 + 15,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 5
  },
  row: {
    ...ApplicationStyles.rowAlignCenterJustifyBetween,
    width: '100%'
  },
  custId: {
    ...ApplicationStyles.mediumMontserratFont,
    color: Colors.black50
  },
  orangeClr: {
    color: Colors.orange10
  },
  deliveryText: {
    ...ApplicationStyles.regularRobotoFonts,
    fontSize: Fonts.size.sminy,
    color: Colors.gray20
  },
  dayText: {
    fontFamily: Fonts.type.robotoBold,
    fontSize: Fonts.size.semi,
    color: Colors.black70,
    marginVertical: moderateScale(3)
  },
  arrivalTxt: {
    ...ApplicationStyles.regularRobotoFonts,
    fontSize: Fonts.size.sminy,
    color: Colors.green10
  },
  dateView: { width: '48%' }
});
