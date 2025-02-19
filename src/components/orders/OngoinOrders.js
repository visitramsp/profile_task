import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import Carousel from 'react-native-reanimated-carousel';

import {
  Colors,
  width,
  verticalScale,
  ApplicationStyles,
  moderateScale
} from '../../theme';
import Fonts from '../../theme/Fonts';
import ContentHeader from '../../screens/Retailer/components/ContentHeader';
import OrderProgress from '../../screens//Retailer/components/OrderProgress';
import {
  APP_LANGUAGE_CONSTANT,
  AppConstant
} from '../../constants/AppConstant';

const dummyData = [{ id: '#123456' }, { id: '#123456' }, { id: '#123456' }];

const OngoinOrders = (props) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={ApplicationStyles.pageSpacing}>
        <ContentHeader
          title={`${t('ONGOING_ORDERS')} (${20})`}
          textStyle={{ color: Colors.secondary }}
          containerExt={{ marginTop: verticalScale(20) }}
          onPress={() => {}}
        />
      </View>
      <Carousel
        loop
        snapEnabled
        autoPlay={false}
        width={width}
        height={verticalScale(150)}
        vertical={false}
        data={dummyData}
        autoPlayInterval={3000}
        style={styles.carouselContainer}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50
        }}
        scrollAnimationDuration={2000}
        pagingEnabled={false}
        renderItem={({}) => (
          <>
            <View style={[styles.imageContainer, {}]}>
              <View style={styles.row}>
                <Text style={styles.custId}>
                  {t(APP_LANGUAGE_CONSTANT.ORDER_ID) + '  '}
                  <Text style={styles.orangeClr}>{'#543456'}</Text>
                </Text>
                <Text style={styles.custId}>
                  {t(APP_LANGUAGE_CONSTANT.STATUS) + ': '}
                  {t(APP_LANGUAGE_CONSTANT.DISPATCH)}
                </Text>
              </View>

              <OrderProgress step={3} />

              <View style={[styles.row, {}]}>
                <View>
                  <Text style={styles.deliveryText}>
                    {t(AppConstant.ORDER_TIME)}
                  </Text>
                  <Text style={styles.dayText}>{'Monday'}</Text>
                  <Text style={styles.arrivalTxt}>
                    {'March 12, 2024 at 12:45pm'}
                  </Text>
                </View>
                <View>
                  <Text style={styles.deliveryText}>
                    {t(APP_LANGUAGE_CONSTANT.ESTIMATED_TIME)}
                  </Text>
                  <Text style={styles.dayText}>{'Monday'}</Text>
                  <Text style={styles.arrivalTxt}>
                    {'March 12, 2024 at 12:45pm'}
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    width: width,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: verticalScale(20),
    overflow: 'hidden',
    backgroundColor: Colors.secondary,
    padding: verticalScale(18),
    shadowColor: Colors.orange10 + 15,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 5
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  custId: {
    fontSize: Fonts.size.semi,
    fontFamily: Fonts.type.montserrat,
    fontWeight: Fonts.Weight.semi,
    color: Colors.black50
  },
  orangeClr: {
    color: Colors.orange10
  },
  deliveryText: {
    fontFamily: Fonts.type.robotoRegular,
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
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.sminy,
    color: Colors.green10
  }
});

export default OngoinOrders;
