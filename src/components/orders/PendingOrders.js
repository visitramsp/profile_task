import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import ContentHeader from '../../screens/Retailer/components/ContentHeader';
import {
  ApplicationStyles,
  Colors,
  horizontalScale,
  verticalScale,
  width
} from '../../theme';
import Fonts from '../../theme/Fonts';
import {
  AppConstant,
  APP_LANGUAGE_CONSTANT
} from '../../constants/AppConstant';

const dummyData = [{ id: '#123456' }, { id: '#123456' }, { id: '#123456' }];

const PendingOrders = (props) => {
  const { t } = useTranslation();

  return (
    <View style={[styles.container]}>
      <View
        style={[
          ApplicationStyles.pageSpacing,
          {
            marginTop:
              Platform.OS === 'android' ? verticalScale(12) : verticalScale(0)
          }
        ]}
      >
        <ContentHeader
          title={`${t(APP_LANGUAGE_CONSTANT.PENDING_ORDERS)} (${
            dummyData.length
          })`}
          textStyle={{
            color: Colors.secondary
          }}
          containerExt={{ marginTop: 0 }}
          onPress={() => {}}
        />
      </View>
      <Carousel
        loop
        autoPlay={false}
        width={width}
        height={
          Platform.OS === 'android' ? verticalScale(230) : verticalScale(200)
        }
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
        renderItem={({}) => (
          <>
            <View style={styles.imageContainer}>
              <View style={[styles.orderInfoContainer]}>
                <Text style={styles.orderIdText}>
                  {t(APP_LANGUAGE_CONSTANT.ORDER_ID) + ' : ' + '#543456'}
                </Text>
                <Text style={styles.orderTimeText}>
                  {t(AppConstant.ORDER_TIME)} :{' '}
                  <Text style={styles.orderTimeDetailsText}>
                    Monday, February 15, 2024 at 6:38 pm
                  </Text>
                </Text>
              </View>
              <View style={styles.row}>
                <View>
                  <Text style={styles.deliveryText}>
                    {t(APP_LANGUAGE_CONSTANT.PICKUP_ADDRESS)}
                  </Text>
                  <Text style={styles.dayText}>4517 Washington Ave.</Text>
                  <Text style={styles.arrivalTxt}>
                    Manchester, Kentucky 39495
                  </Text>
                </View>
                <View>
                  <Text style={styles.deliveryText}>
                    {t(APP_LANGUAGE_CONSTANT.DROP_ADDRESS)}
                  </Text>
                  <Text style={styles.dayText}>3891 Ranchview Dr.</Text>
                  <Text style={styles.arrivalTxt}>
                    Richardson, California 62639
                  </Text>
                </View>
              </View>
              <Text style={styles.distanceText}>
                {t(APP_LANGUAGE_CONSTANT.DISTANCE_TO_TRAVEL)} : 25{' '}
                {APP_LANGUAGE_CONSTANT.KM}
              </Text>
            </View>
            <TouchableOpacity style={styles.bottomContainer}>
              <Text style={styles.allProductTxt}>
                {t(APP_LANGUAGE_CONSTANT.ALL_PRODUCT)} ↓
              </Text>
            </TouchableOpacity>
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
    marginTop: verticalScale(4)
  },
  imageContainer: {
    width: 'auto',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: horizontalScale(20),
    overflow: 'hidden',
    backgroundColor: Colors.secondary,
    shadowColor: Colors.orange10 + 15,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 5,
    paddingBottom: horizontalScale(14)
  },
  orderInfoContainer: {
    paddingHorizontal: horizontalScale(14),
    paddingTop: horizontalScale(12),
    paddingBottom: horizontalScale(10),
    backgroundColor: Colors.orange40
  },
  orderIdText: {
    fontFamily: Fonts.type.poppinsMedium,
    fontSize: Fonts.size.regular,
    color: Colors.black
  },
  orderTimeText: {
    fontFamily: Fonts.type.poppinsRegular,
    color: Colors.white,
    fontSize: Fonts.size.small,
    marginTop: horizontalScale(2)
  },
  orderTimeDetailsText: {
    fontFamily: Fonts.type.poppinsRegular,
    fontSize: Fonts.size.small,
    color: Colors.white
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: horizontalScale(15),
    paddingTop: horizontalScale(12),
    paddingBottom: horizontalScale(8)
  },
  deliveryText: {
    fontFamily: Fonts.type.poppinsMedium,
    fontSize: Fonts.size.semi,
    color: Colors.black
  },
  dayText: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.small,
    color: Colors.gray,
    marginVertical: horizontalScale(3)
  },
  arrivalTxt: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.small,
    color: Colors.gray
  },
  distanceText: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.semi,
    color: Colors.orange10,
    paddingLeft: horizontalScale(15)
  },
  bottomContainer: {
    width: '80%',
    height: 30,
    backgroundColor: '#ffffffAA',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  allProductTxt: {
    fontSize: Fonts.size.tiny,
    color: Colors.orange10
  }
});

export default PendingOrders;
