import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput
} from 'react-native';
import {
  Colors,
  verticalScale,
  Fonts,
  horizontalScale,
  ApplicationStyles
} from '../../theme';
import { DropDownIcon, MinusIcon, PlusIcon, Trash } from '../../assets/icon';
import FastImage from 'react-native-fast-image';
import ItemCountText from '../../components/headers/ItemCountText';
import LinearGradient from 'react-native-linear-gradient';
import { KEYBOARD_TYPE, APP_LANGUAGE_CONSTANT } from '../../constants';
import { showToastError } from '../../utils';
import { useTranslation } from 'react-i18next';

const DropDownProduct = ({
  selectStatus = false,
  title,
  data,
  setOrderList,
  isDisable = false,
  deleteOnPress = () => null
}) => {
  const { t } = useTranslation();
  const [amountViewWidth, setAmountViewWidth] = useState(0);
  const handleQuantityChange = (id, newQuantity) => {
    setOrderList((prevQuantities) =>
      data.map((q) => (q.id === id ? { ...q, quantity: newQuantity } : q))
    );
  };

  const handleEndEditing = (id) => {
    setOrderList((prevQuantities) =>
      // eslint-disable-next-line complexity
      prevQuantities?.map((q) => {
        if (q.id === id) {
          const item = data.find((item) => item.id === id);
          const min = item.moq || 0;
          const max = item.maxQuantity || Infinity;
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
          const item = data.find((item) => item.id === id);
          const max = item.maxQuantity || Infinity;
          const newQuantity = parseInt(q.quantity, 10) + 1;
          if (newQuantity <= max) {
            return { ...q, quantity: String(newQuantity) };
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
          const item = data.find((item) => item.id === id);
          const min = item.minQuantity || 0;
          const newQuantity = parseInt(q.quantity, 10) - 1;
          if (newQuantity >= min) {
            return { ...q, quantity: String(newQuantity) };
          }
        }
        return q;
      })
    );
  };

  // eslint-disable-next-line complexity
  const _renderProduct = ({ item, index }) => {
    const quantity = parseInt(data[index]?.quantity, 10);
    const min = item?.moq || 0;
    const max = item?.maxQuantity || Infinity;

    const price = item?.price * item?.quantity;

    const getFontSize = (containerWidth = amountViewWidth, number = price) => {
      const baseFontSize = 16;
      const numberLength = number?.toString()?.length;
      const maxFontSizeForWidth = containerWidth / numberLength;
      const dynamicFontSize = Math.min(baseFontSize, maxFontSizeForWidth);

      const minFontSize = 10;
      return Math.max(dynamicFontSize, minFontSize);
    };

    return (
      <View style={styles.card}>
        <FastImage
          source={{ uri: item?.img }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.detail}>
          <View style={styles.brandProView}>
            <View style={ApplicationStyles.flex1}>
              <Text style={styles.brand}>{item.brandName?.toUpperCase()}</Text>
              <Text style={styles.name} numberOfLines={1}>
                {item.productName}
              </Text>
            </View>
            {!isDisable && (
              <TouchableOpacity
                style={styles.imageView}
                onPress={() => deleteOnPress(item)}
              >
                <Trash height={20} width={20} />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.finance} numberOfLines={1}>
            {item?.mainVariantTitle} : {item?.mainVariantValue} | Per Unit :{' '}
            {`${t(APP_LANGUAGE_CONSTANT.AED)} `}
            {item.perUnit} | MOQ : {item?.moq}
          </Text>
          <View style={styles.quantityView}>
            <View
              style={[styles.priceContainer]}
              onLayout={(e) => {
                setAmountViewWidth(e.nativeEvent?.layout?.width - 5);
              }}
            >
              <Text style={[styles.currency, { fontSize: getFontSize() }]}>
                {`${t(APP_LANGUAGE_CONSTANT.AED)}`}
              </Text>
              <Text style={[styles.totalPrice, { fontSize: getFontSize() }]}>
                {price}
              </Text>
            </View>
            <View style={[styles.counterContainer]}>
              {isDisable ? (
                <View style={[styles.quantityView]}>
                  <Text
                    style={[styles.totalPrice, { fontSize: getFontSize() }]}
                  >
                    {String(data[index].quantity)}
                  </Text>
                  <Text style={[styles.currency, { fontSize: getFontSize() }]}>
                    QTY
                  </Text>
                </View>
              ) : (
                <>
                  <TouchableOpacity
                    style={[
                      styles.decrement,
                      quantity <= min && [styles.disabledButton]
                    ]}
                    disabled={quantity <= min}
                    onPress={() => handleDecrement(item.id)}
                  >
                    <MinusIcon
                      height={Fonts.size.small}
                      width={Fonts.size.small}
                    />
                  </TouchableOpacity>

                  <View style={styles.counterView}>
                    <TextInput
                      style={styles.input}
                      maxLength={5}
                      editable={!isDisable}
                      keyboardType={KEYBOARD_TYPE.NUMERIC}
                      value={String(data[index].quantity)}
                      onChangeText={(text) =>
                        handleQuantityChange(item.id, text)
                      }
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
                      quantity >= max && [styles.disabledButton]
                    ]}
                  >
                    <TouchableOpacity
                      disabled={quantity >= max}
                      onPress={() => handleIncrement(item.id)}
                    >
                      <PlusIcon
                        height={Fonts.size.small}
                        width={Fonts.size.small}
                      />
                    </TouchableOpacity>
                  </LinearGradient>
                </>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      {selectStatus && (
        <TouchableOpacity style={styles.dropDown}>
          <Text style={styles.placeholder}>Select Product</Text>
          <DropDownIcon />
        </TouchableOpacity>
      )}
      <View style={styles.productContainer}>
        <ItemCountText
          title={title ? title : 'Selected Product'}
          number={data.length}
        />
        <FlatList
          data={data}
          keyExtractor={(item, index) => `dropDownProducts${index}`}
          renderItem={_renderProduct}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: verticalScale(16) }}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};

export default DropDownProduct;

const styles = StyleSheet.create({
  brandProView: {
    ...ApplicationStyles.rowAlignCenterJustifyBetween
  },
  dropDown: {
    ...ApplicationStyles.rowAlignCenterJustifyBetween,
    marginVertical: verticalScale(16),
    paddingVertical: verticalScale(16),
    borderColor: Colors.gray10,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: horizontalScale(16)
  },
  placeholder: {
    fontSize: Fonts.size.semi,
    color: Colors.gray10,
    fontFamily: Fonts.type.robotoRegular
  },
  productContainer: {
    gap: verticalScale(16)
  },
  card: {
    flexDirection: 'row',
    gap: horizontalScale(12),
    backgroundColor: Colors.white
  },
  imageView: {
    backgroundColor: 'white'
  },
  image: {
    height: horizontalScale(90),
    width: horizontalScale(90),
    borderRadius: horizontalScale(20)
  },
  detail: {
    flex: 1,
    gap: verticalScale(2)
  },
  brand: {
    fontFamily: Fonts.type.montserrat,
    fontSize: Fonts.size.sminy,
    color: Colors.gray20,
    fontWeight: Fonts.Weight.seven,
    paddingTop: 0
  },
  name: {
    fontFamily: Fonts.type.robotoMedium,
    fontWeight: Fonts.Weight.medium,
    fontSize: Fonts.size.semi,
    color: Colors.black70,
    flexWrap: 'wrap'
  },
  finance: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.s10,
    color: Colors.gray20
  },
  quantityView: {
    ...ApplicationStyles.rowAlignCenterJustifyBetween,
    gap: verticalScale(4)
  },
  priceContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: horizontalScale(4),
    height: verticalScale(35),
    marginVertical: 'auto',
    alignItems: 'center'
  },
  totalPrice: {
    ...ApplicationStyles.normalMontserratFont,
    fontWeight: Fonts.Weight.seven,
    color: Colors.primary,
    fontSize: 8
  },
  currency: {
    ...ApplicationStyles.normalMontserratFont,
    fontWeight: Fonts.Weight.seven,
    color: Colors.primary,
    fontSize: 8
  },
  counterContainer: {
    flexDirection: 'row',
    gap: horizontalScale(4),
    marginTop: 5
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
