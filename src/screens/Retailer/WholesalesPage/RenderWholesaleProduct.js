import React, { memo, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  moderateScale,
  verticalScale,
  width
} from '../../../theme';
import { useNavigation } from '@react-navigation/native';
import {
  Bookmark,
  Cart,
  MinusIcon,
  PlusIcon,
  SelectedBookmark
} from '../../../assets/icon';
import { showError, showToastError, showToastSuccess } from '../../../utils';
import { postWishlist } from '../../../store/retailer/action';
import { useDispatch, useSelector } from 'react-redux';
import { updateWishlist } from '../../../store/retailer/reducer';
import LinearGradient from 'react-native-linear-gradient';
import CountdownTimer from '../components/CountdownTimer';
import { HeaderMenu } from '../../../components';
import { KEYBOARD_TYPE, SCREEN_NAME } from '../../../constants';
import { string } from 'yup';
import CommonLoader from '../../../components/CommonLoader';

// eslint-disable-next-line complexity
const RenderWholesaleProduct = ({
  item,
  index,
  data,
  onPress = () => null,
  visibleBookmark,
  itemStyle,
  cartButton,
  addToCart = () => null,
  isLoading,
  wishList,
  buttonName,
  currentIndex,
  isOneColumn,
  removeWishlist = () => null,
  rowLoading = false,
  horizontal = false,
  editDeleteData = [],
  deleteFun = () => null,
  editFun = () => null,
  isAnonymous = false,
  isFleshTime = false,
  setOrderList = () => null
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const wholesalesData = useSelector(
    (state) => state?.retailer?.wholesalesProductList
  );

  const [isWishlist, setIsWishlist] = useState(false);
  useEffect(() => {
    setIsWishlist(item?.isInWishlist);
  }, [item]);
  const quantity = parseInt(item[index]?.quantity, 10);
  const min = item?.variantObj?.minimum_order_quantity || 0;
  const max = item.total_available_quantity || Infinity;
  if (rowLoading && index === 0) {
    return (
      <View style={styles.activityIndicator}>
        <CommonLoader isLoading={rowLoading && index === 0} />
        {/* <ActivityIndicator size={'large'} color={Colors.orange10}/> */}
      </View>
    );
  }

  const onPressWishlist = () => {
    if (isAnonymous) {
      navigation.navigate(SCREEN_NAME.AUTH_STACK, {
        screen: 'Login'
      });
      return;
    }
    const req = {
      productId: cartButton ? item?.findProductObj?.uuid : item?.uuid,
      variant_id: item?.variantObj?.uuid
    };

    postWishlist(req)
      .then((response) => {
        removeWishlist(item?.variantObj?.uuid);
        showToastSuccess(response?.data?.message);
        currentIndex === index && setIsWishlist(!isWishlist);
        let i = wholesalesData?.findIndex(
          (x) => x?.variantObj?.uuid === item?.variantObj?.uuid
        );

        if (i !== -1) {
          dispatch(updateWishlist({ index: i }));
        }
      })
      .catch((error) => {
        showError(error);
      });
  };

  const handleQuantityChange = (id, newQuantity) => {
    setOrderList((prevQuantities) =>
      prevQuantities.map((q) =>
        q.id === id ? { ...q, quantity: newQuantity } : q
      )
    );
  };

  const handleEndEditing = (id) => {
    setOrderList((prevQuantities) =>
      // eslint-disable-next-line complexity
      prevQuantities?.map((q) => {
        if (q.id === id) {
          const items = prevQuantities.find((item) => item.id === id);
          const min = items.moq || 0;
          const max = items.maxQuantity || Infinity;
          const numericQuantity = parseInt(q.quantity, 10);
          if (!q.quantity || isNaN(numericQuantity)) {
            showToastError(`Minimum quantity order is ${min}.`);
            return { ...q, quantity: String(min) };
          } else if (numericQuantity < min) {
            showToastError(`Minimum quantity order is ${min}.`);
            return { ...q, quantity: String(min) };
          } else if (numericQuantity > max) {
            showToastError(`Maximum quantity order is ${max}.`);
            return { ...q, quantity: String(max) };
          } else {
            return q;
          }
        }
        return q;
      })
    );
  };

  const handleIncrement = (id) => {
    setOrderList((prevQuantities) =>
      prevQuantities.map((q) => {
        if (q.id === id) {
          const max = item.total_available_quantity || Infinity;
          const newQuantity =
            parseInt(q?.variantObj.minimum_order_quantity, 10) + 1;
          if (newQuantity <= max) {
            return {
              ...q,
              variantObj: {
                ...q.variantObj,
                minimum_order_quantity: String(newQuantity)
              }
            };
          }
        }
        return q;
      })
    );
  };

  const handleDecrement = (id) => {
    setOrderList((prevQuantities) =>
      prevQuantities.map((q) => {
        if (q.id === id) {
          const newQuantity =
            parseInt(q.variantObj.minimum_order_quantity, 10) - 1;
          if (item.variantObj.minimum_order_quantity >= newQuantity) {
            return {
              ...q,
              variantObj: {
                ...q.variantObj,
                minimum_order_quantity: String(newQuantity)
              }
            };
          }
        }
        return q;
      })
    );
  };

  return (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        itemStyle,
        // eslint-disable-next-line react-native/no-inline-styles
        isOneColumn && {
          width: width * 0.9,
          borderRadius: moderateScale(10),
          padding: 0
        }
      ]}
      onPress={() => onPress(item)}
    >
      <View style={[isOneColumn && styles.container1Column]}>
        <FastImage
          style={isOneColumn ? styles.img1Column : styles.img2Column}
          resizeMode="cover"
          source={{ uri: item?.variantObj?.images?.[0] }}
        />
        <View
          style={[
            isOneColumn && {
              ...styles.container1Column,
              ...styles.listView
            }
          ]}
        >
          <View>
            <Text
              style={
                isOneColumn ? styles.brandNm1Column : styles.brandNm2Column
              }
            >
              {item?.brand_id || item?.findProductObj?.brand_id}
            </Text>
            <Text
              style={isOneColumn ? styles.title1Column : styles.title2Column}
            >
              {item?.findProductObj?.title}
            </Text>
            <View style={styles.priceView}>
              <View style={styles.amountContainer}>
                <Text style={styles.priceTxt}>
                  {Math.floor(item?.variantObj?.price_details)} AED{' '}
                </Text>
                {/* <Text style={styles.cancelPrice} numberOfLines={1}>
                  {item?.variantObj?.price_details} AED
                </Text> */}
              </View>
              {!isOneColumn && editDeleteData?.length > 0 && (
                <View style={styles.menuView}>
                  <HeaderMenu
                    data={editDeleteData}
                    onPress1={() => editFun(item)}
                    onPress2={() => deleteFun(item)}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
      {cartButton && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
            alignSelf: 'center',
            alignItems: 'center',
            marginTop: -verticalScale(10)
          }}
        >
          {!wishList ? (
            <View style={[styles.counterContainer]}>
              <TouchableOpacity
                style={[
                  styles.decrement,
                  item?.variantObj?.minimum_order_quantity <=
                    item?.quantity && [styles.disabledButton]
                ]}
                disabled={
                  item?.variantObj?.minimum_order_quantity <= item.quantity
                }
                onPress={() => handleDecrement(item.id)}
              >
                <MinusIcon height={Fonts.size.small} width={Fonts.size.small} />
              </TouchableOpacity>
              <View style={styles.counterView}>
                <TextInput
                  editable={false}
                  style={styles.input}
                  maxLength={5}
                  keyboardType={KEYBOARD_TYPE.NUMERIC}
                  value={String(item?.variantObj?.minimum_order_quantity)}
                  onChangeText={(text) => handleQuantityChange(item.id, text)}
                  onEndEditing={() => handleEndEditing(item.id)}
                />
              </View>

              <LinearGradient
                colors={
                  quantity >= max
                    ? [Colors.transparent, Colors.transparent]
                    : [Colors.orange10, Colors.orange30]
                }
                style={[
                  styles.plusView,
                  item.quantity >= max && [styles.disabledButton]
                ]}
              >
                <TouchableOpacity
                  disabled={item.quantity >= max}
                  onPress={() => handleIncrement(item.id)}
                >
                  <PlusIcon
                    height={Fonts.size.small}
                    width={Fonts.size.small}
                  />
                </TouchableOpacity>
              </LinearGradient>
            </View>
          ) : null}

          <TouchableOpacity
            style={{ marginTop: !isOneColumn ? 10 : 0 }}
            onPress={() => addToCart(item, index)}
          >
            <LinearGradient
              style={[styles.buttonAddCart]}
              colors={[Colors.orange10, Colors.orange30]}
            >
              {isOneColumn || wishList ? (
                <View
                  style={[
                    styles.addButton,
                    isOneColumn
                      ? { width: horizontalScale(150) }
                      : wishList
                      ? { width: horizontalScale(140) }
                      : { width: horizontalScale(150) }
                  ]}
                >
                  {isLoading && currentIndex === index ? (
                    // <ActivityIndicator size={'small'} color={Colors.orange10} />
                    <CommonLoader
                      isLoading={isLoading && currentIndex === index}
                    />
                  ) : (
                    <Text style={styles.buttonText}>{buttonName}</Text>
                  )}
                </View>
              ) : (
                <View style={styles.cartView}>
                  <Cart
                    height={verticalScale(15)}
                    width={horizontalScale(15)}
                  />
                </View>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
      {isFleshTime
        ? ''
        : visibleBookmark && (
            <TouchableOpacity
              style={styles.bookmark}
              hitSlop={{ left: 5, right: 5, top: 5, bottom: 5 }}
              onPress={onPressWishlist}
            >
              {isWishlist ? <SelectedBookmark /> : <Bookmark />}
            </TouchableOpacity>
          )}

      {(horizontal || isFleshTime) && (
        <View style={[styles.fleshTimingView]}>
          <CountdownTimer endTime={item?.end_date} />
        </View>
      )}

      {isOneColumn && editDeleteData?.length > 0 && (
        <View style={styles.menuIconView}>
          <HeaderMenu
            data={editDeleteData}
            onPress1={() => editFun(item)}
            onPress2={() => deleteFun(item)}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  priceView: {
    ...ApplicationStyles.rowAlignCenterJustifyBetween
  },
  activityIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: verticalScale(100)
  },
  itemContainer: {
    width: width * 0.425,
    marginLeft: width * 0.05,
    borderRadius: 20,
    backgroundColor: Colors.secondary,
    shadowColor: Colors.orangeOpacity15,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    marginTop: verticalScale(4)
  },
  img2Column: {
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: verticalScale(150)
  },
  img1Column: {
    height: verticalScale(70),
    width: horizontalScale(70),
    marginHorizontal: 5,
    borderRadius: 10
  },
  container1Column: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(12),
    paddingHorizontal: 5,
    paddingVertical: 5
  },
  cartView: { padding: 5 },
  title2Column: {
    fontSize: Fonts.size.sminy,
    fontFamily: Fonts.type.robotoRegular,
    color: Colors.black70,
    padding: verticalScale(4),
    paddingHorizontal: horizontalScale(10),
    textAlign: 'left'
  },
  title1Column: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.semi,
    color: Colors.black70,
    padding: verticalScale(4),
    paddingHorizontal: horizontalScale(10),
    textAlign: 'left',
    flexWrap: 'wrap'
  },
  amountContainer: {
    padding: verticalScale(8),
    flexDirection: 'row',
    marginBottom: verticalScale(10),
    paddingVertical: verticalScale(3),
    alignItems: 'center'
  },
  priceTxt: {
    fontSize: Fonts.size.semi,
    fontFamily: Fonts.type.robotoBold,
    color: Colors.orange10
  },
  brandNm2Column: {
    fontSize: Fonts.size.uprSemi,
    fontFamily: Fonts.type.robotoBold,
    color: Colors.black70,
    paddingTop: verticalScale(5),
    paddingHorizontal: horizontalScale(10),
    textAlign: 'left'
  },
  brandNm1Column: {
    width: horizontalScale(195),
    fontSize: Fonts.size.uprSemi,
    fontFamily: Fonts.type.robotoBold,
    color: Colors.black70,
    paddingTop: verticalScale(5),
    paddingHorizontal: horizontalScale(10),
    textAlign: 'left'
  },

  estimateTime: {
    position: 'absolute',
    left: 10
  },
  bookmark: {
    height: verticalScale(30),
    aspectRatio: 1,
    position: 'absolute',
    backgroundColor: Colors.white,
    right: horizontalScale(8),
    top: horizontalScale(8),
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonAddCart: {
    marginTop: verticalScale(4),
    marginBottom: horizontalScale(15),
    borderRadius: 10,
    marginHorizontal: 'auto',
    // width: '48%',
    padding: 1
  },
  addButton: {
    backgroundColor: Colors.white,
    height: verticalScale(43),
    // width: horizontalScale(70),
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    ...ApplicationStyles.normalMontserratFont,
    color: Colors.orange10,
    fontSize: Fonts.size.semi
  },
  listView: {
    justifyContent: 'space-between',
    flex: 1
  },
  menuIconView: {
    position: 'absolute',
    right: 10,
    bottom: 10
  },
  menuView: { marginRight: 10, marginBottom: 5 },
  fleshTimingView: {
    flex: 1,
    position: 'absolute',
    right: 10,
    top: 0
  },
  counterContainer: {
    flexDirection: 'row',
    gap: horizontalScale(4),
    marginTop: 0
  },
  decrement: {
    ...ApplicationStyles.centerView,
    borderWidth: 1,
    borderColor: Colors.gray10,
    borderRadius: 5,
    height: 25,
    width: 25
  },
  counterView: {
    ...ApplicationStyles.centerView,
    borderWidth: 1,
    borderColor: Colors.gray10,
    borderRadius: 5,
    height: 25,
    width: horizontalScale(50)
  },
  input: {
    color: Colors.black200,
    fontFamily: Fonts.type.robotoMedium,
    fontWeight: Fonts.Weight.medium,
    fontSize: Fonts.size.small,
    width: horizontalScale(65),
    paddingVertical: 0,
    paddingHorizontal: 10,
    marginVertical: 0,
    textAlign: 'center'
  },
  plusView: {
    ...ApplicationStyles.centerView,
    height: 25,
    width: 25,
    borderRadius: 5
  },
  disabledButton: {
    borderRadius: 5,
    backgroundColor: Colors.white160,
    borderWidth: 0
  }
});

export default memo(RenderWholesaleProduct);
