import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import {
  Colors,
  verticalScale,
  Fonts,
  horizontalScale,
  PAGE_SPACING,
  ApplicationStyles
} from '../../../theme';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { APP_LANGUAGE_CONSTANT } from '../../../constants';

const OrderList = ({
  data,
  ListFooterComponent = () => null,
  onEndReachedThreshold = onEndReachedThreshold,
  onEndReached = () => null,
  refreshing,
  handleRefresh,
  ListHeaderComponent
}) => {
  const navigation = useNavigation();

  const { t } = useTranslation();
  const [amountViewWidth, setAmountViewWidth] = useState(0);
  // eslint-disable-next-line complexity
  const _renderProduct = ({ item }) => {
    const price = item?.product_arr[0]?.amount + t(APP_LANGUAGE_CONSTANT.AED);
    const getFontSize = (containerWidth = amountViewWidth, number = price) => {
      const baseFontSize = 20;
      const numberLength = number?.toString()?.length;
      const maxFontSizeForWidth = containerWidth / numberLength;
      const dynamicFontSize = Math.min(baseFontSize, maxFontSizeForWidth);

      const minFontSize = 10;
      return Math.max(dynamicFontSize, minFontSize);
    };
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('OrderDetails', {
            id: item?.uuid,
            orderId: item?.order_id
          })
        }
      >
        <FastImage
          source={{
            uri: item?.product_arr[0]?.db_variant_obj?.images[0]
          }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.detail}>
          <Text style={styles.brand}>
            {t(APP_LANGUAGE_CONSTANT.BRAND_NAME)}
          </Text>
          <Text style={styles.name}>
            {item?.product_arr?.[0]?.db_product_obj?.brand_id}-{' '}
            {item?.product_arr[0]?.db_product_obj?.title}
          </Text>
          <Text style={styles.finance}>
            {t(APP_LANGUAGE_CONSTANT.ORDER_ID)} : {item.order_id?.slice(0, 10)}{' '}
            {'  '}| {t(APP_LANGUAGE_CONSTANT.PER_UNIT)} :{' '}
            {t(APP_LANGUAGE_CONSTANT.AED)}{' '}
            {item?.product_arr[0]?.db_price_obj?.price}
          </Text>

          <View
            style={styles.priceContainer}
            onLayout={(e) => {
              setAmountViewWidth(e.nativeEvent?.layout?.width - 5);
            }}
          >
            <Text style={[styles.totalPrice, { fontSize: getFontSize() }]}>
              {t(APP_LANGUAGE_CONSTANT.AED)} {item?.product_arr[0]?.amount}
            </Text>
            <View
              style={[
                styles.statusContainer,
                {
                  backgroundColor:
                    item?.status === 'new'
                      ? Colors.yellow20
                      : item?.status === 'outfordelivery'
                      ? Colors.yellow
                      : item?.status === 'processing'
                      ? Colors.skyBlue10
                      : item?.status === 'cancelled'
                      ? Colors.red40
                      : Colors.green10
                }
              ]}
            >
              <Text style={styles.status}>
                {item?.status === 'orderaccepted' ? 'Accepted' : item?.status}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={data}
        // contentContainerStyle={{ paddingBottom: 30 }}
        keyExtractor={(item, index) => `dropDownProducts${index}`}
        renderItem={_renderProduct}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={styles.contentContainerStyle}
        ListFooterComponent={ListFooterComponent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        onEndReachedThreshold={onEndReachedThreshold}
        onEndReached={onEndReached}
      />
    </View>
  );
};

export default OrderList;

const styles = StyleSheet.create({
  contentContainerStyle: {
    gap: verticalScale(16),
    paddingBottom: verticalScale(75)
  },
  listContainer: { flex: 1, alignItems: 'center', flexGrow: 1 },
  card: {
    flexDirection: 'row',
    gap: horizontalScale(12),
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingHorizontal: PAGE_SPACING
  },
  image: {
    height: horizontalScale(90),
    width: horizontalScale(90),
    borderRadius: horizontalScale(20)
  },
  detail: {
    flex: 1,
    gap: verticalScale(4),
    paddingVertical: verticalScale(2)
  },
  brand: {
    ...ApplicationStyles.smallMontserratFont,
    fontsWeight: Fonts.Weight.seven,
    fontSize: Fonts.size.sminy,
    color: Colors.gray20
  },
  name: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.semi,
    color: Colors.black70,
    flexWrap: 'wrap'
  },
  finance: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.s10,
    color: Colors.gray20
  },
  priceContainer: {
    flexDirection: 'row',
    paddingHorizontal: verticalScale(4),
    gap: horizontalScale(8),
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  totalPrice: {
    fontFamily: Fonts.type.montserrat,
    fontSize: Fonts.size.h20,
    fontWeight: Fonts.Weight.seven,
    color: Colors.primary
  },
  statusContainer: {
    paddingHorizontal: horizontalScale(12),
    paddingVertical: horizontalScale(10),
    borderRadius: horizontalScale(8),
    justifyContent: 'center',
    alignItems: 'center'
  },
  status: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.sminy,
    color: Colors.white,
    textTransform: 'capitalize'
  }
});
