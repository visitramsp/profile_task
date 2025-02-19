import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Colors, horizontalScale, verticalScale } from '../../theme';
import RenderWholesaleProduct from '../../screens/Retailer/WholesalesPage/RenderWholesaleProduct';
import CommonLoader from '../CommonLoader';

const ProductList = ({
  onPress,
  isLoading,
  isLoading1,
  secondLoader = false,
  loading1 = false,
  footerLoader = false,
  btnIsLoading = false,
  data,
  wishList,
  itemStyle,
  isOneColumn,
  initialNumToRender = 5,
  horizontal = false,
  visibleBookmark = false,
  onPressVisibleBookmark,
  isBookmarked = false,
  contentContainerStyle,
  cartButton = false,
  buttonName = '',
  scrollEnabled = true,
  listHeaderComponent,
  onEndReached = () => null,
  onEndReachedThreshold,
  currentIndex,
  listFooterComponent,
  addToCart = () => null,
  removeWishlist = () => null,
  editDeleteData = [],
  editFun,
  deleteFun,
  isAnonymous = false,
  ListEmptyComponent,
  setOrderList = () => null,
  ...rest
}) => {
  if (isLoading) {
    return (
      <View style={styles.activityIndicator}>
        <CommonLoader isLoading={isLoading} />
        {/* <ActivityIndicator
          size={'large'}
          animating={footerLoader}
          color={Colors.primary20}
        /> */}
      </View>
    );
  }

  const separateComponent = () => <View style={styles.spaceW} />;

  const footerComponent = () => (
    <CommonLoader size={30} color={Colors.primary20} isLoading={isLoading} />
    // <ActivityIndicator
    //   size={30}
    //   animating={footerLoader}
    //   color={Colors.primary20}
    // />
  );

  return (
    <FlatList
      showsHorizontalScrollIndicator
      bounces
      horizontal={horizontal}
      data={data}
      initialNumToRender={initialNumToRender}
      renderItem={({ item, index }) => (
        <RenderWholesaleProduct
          visibleBookmark={visibleBookmark}
          item={item}
          index={index}
          wishList={wishList}
          isAnonymous={isAnonymous}
          itemStyle={itemStyle}
          isOneColumn={isOneColumn}
          cartButton={cartButton}
          addToCart={addToCart}
          isLoading={btnIsLoading}
          rowLoading={secondLoader}
          buttonName={buttonName}
          currentIndex={currentIndex}
          removeWishlist={removeWishlist}
          horizontal={horizontal}
          editDeleteData={editDeleteData}
          deleteFun={deleteFun}
          editFun={editFun}
          setOrderList={setOrderList}
          onPress={() => onPress(item)}
        />
      )}
      style={styles.listContainer}
      contentContainerStyle={[
        styles.contentContainerStyle,
        contentContainerStyle
      ]}
      scrollEnabled={scrollEnabled}
      ItemSeparatorComponent={separateComponent}
      ListHeaderComponent={listHeaderComponent}
      ListEmptyComponent={
        ListEmptyComponent || (
          <View style={styles.emptyItemContainer}>
            <Text style={styles.noItemText}>Not available products</Text>
          </View>
        )
      }
      keyExtractor={(item, index) => item.id + index.toString()}
      ListFooterComponent={footerComponent}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: verticalScale(100)
  },

  listContainer: {},

  spaceW: {
    width: horizontalScale(15),
    height: verticalScale(15)
  },
  contentContainerStyle: {}
});

export default ProductList;
