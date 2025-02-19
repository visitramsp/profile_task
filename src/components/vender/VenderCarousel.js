import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {
  ApplicationStyles,
  verticalScale,
  Colors,
  Fonts,
  width,
  height,
  horizontalScale
} from '../../theme';
import Carousel from 'react-native-reanimated-carousel';
import LinearGradient from 'react-native-linear-gradient';
import StepIndicator from './stepindcator';
import { APP_LANGUAGE_CONSTANT } from '../../constants';
import { useTranslation } from 'react-i18next';
import { AppIcon } from '../../assets/icon';

const VenderCarousel = ({ data }) => {
  const { t } = useTranslation();

  return (
    <View style={carouselStyle.cellContainer}>
      <Carousel
        width={width}
        height={height * 0.3}
        vertical={false}
        data={data}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50
        }}
        style={carouselStyle.container}
        renderItem={({ item }) => {
          return (
            <>
              <View style={carouselStyle.allProduct}>
                <LinearGradient
                  colors={[Colors.white, Colors.orange115]}
                  style={carouselStyle.gradient}
                >
                  <Text style={carouselStyle.productText}>
                    All Products
                    <Image
                      style={carouselStyle.imageStyle}
                      source={AppIcon.downArrow}
                    />
                  </Text>
                </LinearGradient>
              </View>
              <View style={[carouselStyle.cell, ApplicationStyles.pageSpacing]}>
                <View style={[ApplicationStyles.rowAlignCenterJustifyBetween]}>
                  <View style={carouselStyle.orderStatusConatianer}>
                    <Text
                      style={[
                        carouselStyle.orderText,
                        { color: Colors.black50 }
                      ]}
                    >
                      {t(APP_LANGUAGE_CONSTANT.ORDER_ID)}
                    </Text>
                    <Text
                      style={[
                        carouselStyle.orderText,
                        { color: Colors.primary }
                      ]}
                    >
                      {' #' + item?.order_id?.slice(0, 10)}
                    </Text>
                  </View>
                  <View style={carouselStyle.orderStatusConatianer}>
                    <Text
                      style={[
                        carouselStyle.orderText,
                        { color: Colors.black50 }
                      ]}
                    >
                      {t(APP_LANGUAGE_CONSTANT.STATUS)}
                    </Text>
                    <Text
                      style={[
                        carouselStyle.orderText,
                        { color: Colors.black50 }
                      ]}
                    >
                      {' : '} {item?.status}
                    </Text>
                  </View>
                </View>
                <View style={{ marginVertical: verticalScale(4) }}>
                  <StepIndicator steps={[1, 2, 3, 4, 5]} currentStep={4} />
                </View>
                <View style={[ApplicationStyles.rowAlignCenterJustifyBetween]}>
                  <View style={carouselStyle.delivery}>
                    <Text style={[carouselStyle.orderTimeText]}>
                      Order Time
                    </Text>
                    <Text style={[carouselStyle.orderDay]}>
                      {item?.getOrderDay}
                    </Text>
                    <Text
                      style={[
                        carouselStyle.orderTimeText,
                        carouselStyle.orderActualTime
                      ]}
                    >
                      {item?.getOrderDate}
                    </Text>
                  </View>
                  <View
                    style={[
                      carouselStyle.delivery,
                      { paddingLeft: horizontalScale(5) }
                    ]}
                  >
                    <Text style={[carouselStyle.orderTimeText]}>
                      Estimated Time
                    </Text>
                    <Text style={[carouselStyle.orderDay]}>
                      {item?.expectedDeliveryDay}
                    </Text>
                    <Text
                      style={[
                        carouselStyle.orderTimeText,
                        carouselStyle.orderActualTime
                      ]}
                    >
                      {item?.expectedDeliveryDate}
                    </Text>
                  </View>
                </View>
              </View>
            </>
          );
        }}
      />
    </View>
  );
};

export default VenderCarousel;

const carouselStyle = StyleSheet.create({
  container: {
    shadowColor: Colors.black40,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 5
  },
  cellContainer: {
    justifyContent: 'center',
    height: verticalScale(180)
  },
  cell: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingVertical: verticalScale(20),
    gap: verticalScale(8)
  },
  orderStatusConatianer: {
    flexDirection: 'row'
  },
  orderText: {
    ...ApplicationStyles.mediumMontserratFont,
    fontSize: Fonts.size.small
  },
  orderTimeText: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.small,
    color: Colors.white120
  },
  orderDay: {
    color: Colors.black70,
    fontFamily: Fonts.type.robotoBold,
    fontSize: Fonts.size.semi
  },
  orderActualTime: {
    color: Colors.green10
  },
  delivery: {
    flex: 1,
    gap: verticalScale(4)
  },
  allProduct: {
    position: 'absolute',
    bottom: verticalScale(26),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '80%',
    height: verticalScale(30),
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden'
  },
  gradient: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  productText: {
    fontSize: 10,
    fontFamily: Fonts.type.robotoRegular,
    color: Colors.primary
  },
  imageStyle: { height: 13, width: 13 }
});
