import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native';

import FastImage from 'react-native-fast-image';

import { Colors, horizontalScale, verticalScale } from '../../theme';
import Fonts from '../../theme/Fonts';
import ApplicationStyles, { PAGE_SPACING } from '../../theme/ApplicationStyles';
import { Bookmark, SelectedBookmark } from '../../assets/icon';
import CommonLoader from '../CommonLoader';

const RelatedProducts = ({
  onPress = () => null,
  isLoading,
  data,
  itemStyle,
  horizontal = false,
  visibleBookmark = false,
  onPressVisibleBookmark,
  isBookmarked = false,
  contentContainerStyle,
  ...rest
}) => {
  if (isLoading) {
    return (
      <View style={styles.activityIndicator}>
        {/* <ActivityIndicator size={'large'} color={Colors.orange10} /> */}
        <CommonLoader isLoading={isLoading} />
      </View>
    );
  }

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        style={[styles.itemContainer]}
        onPress={() => onPress(item)}
      >
        <FastImage
          style={styles.img}
          resizeMode="cover"
          source={{ uri: item?.variantObj?.images?.[0] }}
        />
        <Text style={styles.brandNm}>
          {item?.findProductObj?.brand_id?.toUpperCase()}
        </Text>
        {/* )} */}
        <Text style={styles.title}>{item?.findProductObj?.title}</Text>
        <View style={styles.amountContainer}>
          <Text style={styles.priceTxt}>
            {item?.variantObj?.price_details} AED
          </Text>
          <Text style={styles.cacelPrice}>
            {item?.variantObj?.compare_price_at} AED
          </Text>
        </View>
        {item?.WishlistObj && (
          <TouchableOpacity
            style={styles.bookmark}
            hitSlop={{ left: 5, right: 5, top: 5, bottom: 5 }}
            onPress={() => onPressVisibleBookmark(item, index)}
          >
            {item?.WishlistObj?.productId?.length > 0 ? (
              <SelectedBookmark />
            ) : (
              <Bookmark />
            )}
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  const separateComponent = () => <View style={styles.spaceW} />;

  return (
    <View style={{ marginTop: verticalScale(20) }}>
      <FlatList
        horizontal={horizontal}
        key={'products_list'}
        data={data}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.contentContainerStyle,
          contentContainerStyle
        ]}
        showsHorizontalScrollIndicator={false}
        bounses={false}
        columnWrapperStyle={styles.justifyBetween}
        ItemSeparatorComponent={separateComponent}
        ListEmptyComponent={
          <View style={styles.emptyItemContainer}>
            <Text style={styles.noItemText}>Not available products</Text>
          </View>
        }
        keyExtractor={(item) => item?.id}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    ...ApplicationStyles.centerView,
    width: '100%',
    height: verticalScale(100)
  },
  itemContainer: {
    width: horizontalScale(150),
    borderRadius: 20,
    marginTop: verticalScale(4),
    backgroundColor: Colors.white70,
    shadowColor: Colors.orange115,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10
  },
  img: {
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: verticalScale(150)
  },

  title: {
    fontSize: Fonts.size.sminy,
    fontFamily: Fonts.type.robotoRegular,
    color: Colors.black70,
    padding: verticalScale(4),
    paddingHorizontal: horizontalScale(10),
    textAlign: 'left'
  },
  amountContainer: {
    ...ApplicationStyles.rowAlignCenter,
    padding: verticalScale(8),
    marginBottom: verticalScale(10),
    paddingVertical: verticalScale(3)
  },
  priceTxt: {
    fontSize: Fonts.size.semi,
    fontFamily: Fonts.type.robotoBold,
    color: Colors.orange10
  },
  cacelPrice: {
    fontSize: Fonts.size.tiny,
    fontFamily: Fonts.type.robotoRegular,
    color: Colors.gray10,
    marginLeft: horizontalScale(5),
    textDecorationLine: 'line-through'
  },
  spaceW: {
    width: horizontalScale(15),
    height: verticalScale(15)
  },
  contentContainerStyle: {
    paddingHorizontal: PAGE_SPACING / 2,
    alignSelf: 'center',
    paddingBottom: verticalScale(20)
  },
  justifyBetween: { justifyContent: 'space-between' },
  brandNm: {
    fontSize: Fonts.size.sminy,
    fontFamily: Fonts.type.robotoBold,
    color: Colors.black70,
    paddingTop: verticalScale(8),
    paddingHorizontal: horizontalScale(10),
    textAlign: 'left'
  },
  bookmark: {
    ...ApplicationStyles.centerView,
    height: verticalScale(30),
    aspectRatio: 1,
    position: 'absolute',
    backgroundColor: Colors.white,
    right: horizontalScale(8),
    top: horizontalScale(8),
    borderRadius: 30
  },
  noItemText: {
    color: Colors.red
  }
});

export default RelatedProducts;
