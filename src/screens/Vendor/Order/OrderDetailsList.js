import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { Colors, verticalScale, Fonts, horizontalScale } from '../../../theme';
import FastImage from 'react-native-fast-image';

const OrderedProductList = ({ data, productDetails }) => {
  const _renderProduct = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => productDetails(item)}
      >
        <FastImage
          source={{
            uri: item?.db_variant_obj?.images?.[0]
          }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.detail}>
          <Text style={styles.brand}>Brand Name</Text>
          <Text style={styles.name}>
            {item?.db_product_obj?.brand_id} - {item?.db_variant_obj?.title}
          </Text>
          <Text style={styles.finance}>
            {item?.db_variant_obj?.mainVariant?.name} :{' '}
            {item?.db_variant_obj?.mainVariant?.value}
            {'  '}|{'  '}Per Unit : {item?.db_variant_obj?.price_details} AED{' '}
            {'  '}| Mov: {item?.db_variant_obj?.minimum_order_quantity}
          </Text>

          <View style={styles.priceContainer}>
            <Text style={styles.quantity}>Qty: {item?.quantity}</Text>
            <Text style={styles.totalPrice}>{item?.amount} AED</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index?.toString()}
      renderItem={_renderProduct}
      contentContainerStyle={{ gap: verticalScale(16) }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default OrderedProductList;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: horizontalScale(12),
    backgroundColor: Colors.white,
    alignItems: 'center'
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
    fontFamily: Fonts.type.montserrat,
    fontSize: Fonts.size.sminy,
    color: Colors.gray20,
    fontsWeight: Fonts.Weight.seven
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
  quantity: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.semi,
    color: Colors.green10
  }
});
