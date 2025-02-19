import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';

import {
  ApplicationStyles,
  verticalScale,
  horizontalScale,
  Colors,
  Fonts,
  width,
  PAGE_SPACING
} from '../../theme';

import FastImage from 'react-native-fast-image';
import { APP_LANGUAGE_CONSTANT } from '../../constants';

const RetailersPriceList = ({ data, containerStyle, onPress }) => {
  const _renderItems = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[
          retailerStyle.cell,
          data?.length - 1 === index && {
            marginRight: PAGE_SPACING * 2
          }
        ]}
        onPress={onPress}
      >
        <FastImage
          source={{
            uri: item?.variantObj?.images[0]
          }}
          style={retailerStyle.image}
        />
        <View style={retailerStyle.details}>
          <Text style={retailerStyle.itemName}>
            {`${item?.productObj?.brand_id} - ${item?.productObj?.title}`}
          </Text>
          <View
            style={[
              ApplicationStyles.rowAlignCenterJustifyBetween,
              ApplicationStyles.flexWrap
            ]}
          >
            <Text
              style={retailerStyle.price}
            >{`${item?.price} ${APP_LANGUAGE_CONSTANT.AED}`}</Text>
            <Text
              style={retailerStyle.numberOfUnits}
            >{`${item?.quantity} ${APP_LANGUAGE_CONSTANT.UNIT}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      horizontal
      data={data}
      style={containerStyle}
      keyExtractor={(item, index) => `retailers${index}`}
      showsHorizontalScrollIndicator={false}
      renderItem={_renderItems}
    />
  );
};

export default React.memo(RetailersPriceList);

const retailerStyle = StyleSheet.create({
  cell: {
    borderRadius: 20,
    width: width * 0.35,
    marginRight: horizontalScale(16),
    paddingBottom: verticalScale(5),
    shadowColor: Colors.primary70,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 1,
    elevation: 5,
    backgroundColor: Colors.white,
    marginVertical: verticalScale(8)
  },
  image: {
    height: width * 0.28,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  details: {
    padding: verticalScale(8),
    gap: verticalScale(4)
  },
  itemName: {
    fontSize: Fonts.size.sminy,
    fontFamily: Fonts.type.robotoRegular
  },
  price: {
    fontFamily: Fonts.type.robotoBold,
    fontSize: Fonts.size.semi,
    color: Colors.primary
  },
  numberOfUnits: {
    fontFamily: Fonts.type.robotoBold,
    fontSize: Fonts.size.tiny,
    color: Colors.green10
  }
});
