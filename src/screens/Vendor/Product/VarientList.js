import React, { useEffect, useState, useReducer } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView
} from 'react-native';
import {
  Fonts,
  horizontalScale,
  verticalScale,
  Colors,
  ApplicationStyles
} from '../../../theme';
import FastImage from 'react-native-fast-image';
import {
  GrayDownArrow,
  AppIcon,
  ColoredLocation,
  LightRedTrash
} from '../../../assets/icon';
import {
  ImagePickerModal,
  SelectMultiDropdown,
  TextInputFieldPaper
} from '../../../components';
import { openCamera, openGallery } from '../../../utils/imagepicker';
import { useTranslation } from 'react-i18next';
import {
  APP_LANGUAGE_CONSTANT,
  AppConstant,
  KEYBOARD_TYPE
} from '../../../constants';
import validationRule from '../../../utils/validationRules';
import DateTimePicker from '../../../components/DateTimePicker/DateTimePicker';
import { getImgUri } from '../../../utils';
import { Reducer, initialState } from './AddProductState';
import UploadedFiles from './UploadedFiles';

// eslint-disable-next-line complexity
const RenderPackageType = ({
  state,
  error,
  handleWarehouseChange,
  handleWarehouseQuantityChange
}) => {
  const [quantityValue, setQuantityValue] = useState(
    state?.warehouseList?.find((ele) => ele?.uuid === state.warehouse[0])
      ?.quantity || ''
  );
  const { t } = useTranslation();
  const [dispatch] = useReducer(Reducer, initialState);
  return (
    <View style={styles.package}>
      <SelectMultiDropdown
        isMultiSelect
        style={styles.commonHeight}
        placeholderStyle={{ color: Colors.secondary }}
        data={state?.warehouseList}
        uuid={state.warehouse || []}
        placeholderText={t(APP_LANGUAGE_CONSTANT.SELECT_WAREHOUSE)}
        onchange={(item) => {
          handleWarehouseChange(item);
        }}
        isProductEdit={false}
        state={state}
        dispatch={dispatch}
        renderSelectedItem={(item, unSelect) => (
          <View
            key={item?.id}
            style={[styles.warehouse, { backgroundColor: Colors.lightOrange2 }]}
          >
            <ColoredLocation />
            <Text style={styles.address} numberOfLines={2}>
              {item?.address}
            </Text>
            <TextInput
              style={styles.quantity}
              maxLength={5}
              placeholder={'qty'}
              keyboardType={KEYBOARD_TYPE.NUMERIC_PAD}
              value={item?.quantity}
              placeholderTextColor="#000"
              onChangeText={(text) => {
                setQuantityValue(text);
                const transformed = state?.warehouseList?.map((id) => {
                  if (id?.uuid === item?.uuid) {
                    return {
                      ...id,
                      quantity: text
                    };
                  }
                  return id;
                });

                handleWarehouseQuantityChange(transformed);
              }}
            />
            <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
              <LightRedTrash />
            </TouchableOpacity>
          </View>
        )}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      {quantityValue === '' && state?.warehouse?.length > 0 && (
        <Text style={styles.errorText}>Quantity is required</Text>
      )}
    </View>
  );
};

const RenderSubVariants = ({ index, setSelectedIndex, selectedIndex }) => (
  <TouchableOpacity
    style={[
      styles.subVariantsContainer,
      selectedIndex !== 0 && styles.spaceingTop
    ]}
    onPress={() => setSelectedIndex(index)}
  >
    <Text style={styles.subVarient}>Sub Variants {index + 1}</Text>
    <GrayDownArrow height={16} width={16} />
  </TouchableOpacity>
);

// eslint-disable-next-line complexity
const VariantItem = ({
  item,
  index,
  dispatch,
  itemIndex,
  selectedIndex,
  setSelectedIndex,
  state,
  buyingPrice,
  sellingPrice,
  volume,
  expiryDate,
  mfgDate,
  paramsMoq,
  handleRemoveEvent,
  isHaveDates
}) => {
  const { t } = useTranslation();
  const [price, setPrice] = useState(item?.price || sellingPrice);
  const [quantity, setQuantity] = useState(item?.quantity || volume);
  const [image, setImage] = useState(item?.image || []);

  const [visible, setVisible] = useState(false);
  const [packagingType, setPackagingType] = useState(item?.packagingType || '');
  const [warehouse, setWarehouse] = useState(item?.warehouse || '');

  const [moq, setMoq] = useState(item?.moq || paramsMoq || '');
  const [priceError, setPriceError] = useState(item?.priceError || null);
  const [moqError, setMoqError] = useState(item?.moqError || null);
  const [expiryDateError, setExpiryDateError] = useState(
    item?.expiryDateError || null
  );
  const [packagingDateError, setPackagingDateError] = useState(
    item?.packagingDateError || null
  );
  const [quantityError, setQuantityError] = useState(
    item?.quantityError || null
  );
  const [warehouseListError, setWarehouseListError] = useState(
    item?.warehouseListError || null
  );
  const [imageError, setImageError] = useState(item?.imageError || null);
  const [packageError, setPackageError] = useState(item?.packageError || null);
  const [warehouseError, setWarehouseError] = useState(
    item?.warehouseError || null
  );

  useEffect(() => {
    setWarehouse(item?.warehouse);
  }, [item?.warehouse]);

  useEffect(() => {
    setImage(item?.image || []);
    setPriceError(item?.priceError);
    setQuantityError(item?.quantityError);
    setImageError(item?.imageError);
    setWarehouseError(item?.warehouseError);
    setPackageError(item?.packageError);
    setMoqError(item?.moqError);
    setExpiryDateError(item?.expiryDateError);
    setPackagingDateError(item?.packagingDateError);
    setWarehouseListError(item?.warehouseListError);
  }, [item]);

  const captureFromCamera = async () => {
    const mediaItem = await openCamera();
    if (mediaItem) {
      setImage((prev) => [
        ...prev,
        { uri: mediaItem?.path, path: mediaItem?.path }
      ]);
      handleImageChange(mediaItem);
    }
    setVisible(false);
  };

  const pickFormGallery = async () => {
    const mediaItem = await openGallery();
    if (mediaItem) {
      setImage((prev) => [
        ...prev,
        { uri: mediaItem[0]?.path, path: mediaItem[0]?.path }
      ]);
      handleImageChange(mediaItem[0]);
    }
    setVisible(false);
  };

  const variantDetails = {
    groupIndex: itemIndex,
    itemIndex: selectedIndex,
    price,
    priceError,
    quantity,
    quantityError,
    image,
    imageError,
    warehouse,
    warehouseError,
    packagingType,
    packageError,
    moq,
    moqError,
    expiryDate: item?.expiryDate,
    packagingDate: item?.packagingDate,
    warehouseList: item?.warehouseList,
    expiryDateError,
    packagingDateError
  };

  const handlePriceChange = (value) => {
    setPrice(value);
    setPriceError(
      validationRule.isRequired(value, t(AppConstant.REQUIRED)).msg
    );
    dispatch({
      type: 'UPDATE_VARIANT_DETAILS',
      payload: {
        ...variantDetails,
        price: value,
        priceError: validationRule.isRequired(value, t(AppConstant.REQUIRED))
          .msg
      }
    });
  };

  const handleQuantityChange = (value) => {
    setQuantity(value);
    setQuantityError(
      validationRule.isRequired(value, t(AppConstant.REQUIRED)).msg
    );
    dispatch({
      type: 'UPDATE_VARIANT_DETAILS',
      payload: {
        ...variantDetails,
        quantity: value,
        quantityError: validationRule.isRequired(value, t(AppConstant.REQUIRED))
          .msg
      }
    });
  };

  const handleImageChange = (value) => {
    setImageError(
      validationRule.isRequired(value, t(AppConstant.REQUIRED)).msg
    );
    dispatch({
      type: 'UPDATE_VARIANT_DETAILS',
      payload: {
        ...variantDetails,
        image: [
          ...variantDetails.image,
          {
            uri: value?.path,
            path: value?.path,
            type: value?.mime,
            name: value?.filename ? value?.filename : 'variantImg.png'
          }
        ],
        imageError: validationRule.isRequired(value, t(AppConstant.REQUIRED))
          .msg
      }
    });
  };

  const handlePackageTypeChange = (value) => {
    setPackagingType(value);
    setPackageError(
      validationRule.isRequired(value, t(AppConstant.REQUIRED)).msg
    );
    dispatch({
      type: 'UPDATE_VARIANT_DETAILS',
      payload: {
        ...variantDetails,
        packagingType: value,
        packageError: validationRule.isRequired(value, t(AppConstant.REQUIRED))
          .msg
      }
    });
  };

  const handleMoqChange = (value) => {
    setMoq(value);
    dispatch({
      type: 'UPDATE_VARIANT_DETAILS',
      payload: {
        ...variantDetails,
        moq: value,
        moqError: validationRule.isRequired(value, t(AppConstant.REQUIRED)).msg
      }
    });
  };

  const handleWarehouseChange = (value) => {
    setWarehouse(value);
    setWarehouseError(value.length > 0 ? null : t(AppConstant.REQUIRED));
    dispatch({
      type: 'UPDATE_VARIANT_DETAILS',
      payload: {
        ...variantDetails,
        warehouse: value,
        warehouseError: value.length > 0 ? null : t(AppConstant.REQUIRED)
      }
    });
  };

  const handleWarehouseQuantityChange = (arr) => {
    dispatch({
      type: 'UPDATE_VARIANT_DETAILS',
      payload: {
        ...variantDetails,
        warehouseList: arr
      }
    });
  };

  const selectImg = () => {
    setVisible(true);
  };

  const removeImg = (index) => {
    let tempImgCol = JSON.parse(JSON.stringify(image));
    tempImgCol.splice(index, 1);
    setImage(tempImgCol);
  };

  return (
    <View>
      {selectedIndex === index ? (
        <>
          <View style={styles.topConatiner}>
            <Text
              style={[styles.subVarient, { paddingBottom: verticalScale(12) }]}
            >
              Sub Variants {index + 1}
            </Text>
            <TouchableOpacity
              onPress={() => handleRemoveEvent({ item, index, itemIndex })}
              style={{ position: 'absolute', right: 15, top: 7 }}
            >
              <LightRedTrash />
            </TouchableOpacity>
            <View
              style={[
                ApplicationStyles.rowAlignCenter,
                { gap: horizontalScale(8) }
              ]}
            >
              {(!image || image?.length < 5) && (
                <TouchableOpacity activeOpacity={0.5} onPress={selectImg}>
                  <FastImage source={AppIcon.addimage} style={styles.image} />
                  {imageError && (
                    <Text style={styles.errorText}>{imageError}</Text>
                  )}
                </TouchableOpacity>
              )}
              <UploadedFiles
                files={image || []}
                deleteImages={removeImg}
                imgStyle={styles.image}
              />
            </View>
            <View style={ApplicationStyles.rowJustifyBetween}>
              <View style={styles.header}>
                <Text style={styles.title}>
                  {state?.mainVariantCategory} : {item?.mainVariant?.value}
                </Text>
                {item?.variant1?.value && (
                  <Text style={styles.subTitle}>
                    {`${item?.variant1?.value} ${
                      item?.variant2?.value ? `: ${item?.variant2?.value}` : ''
                    }`}
                  </Text>
                )}
              </View>
            </View>
          </View>
          <View style={styles.form}>
            <View style={styles.row}>
              <View style={[styles.inputWrapper, ApplicationStyles.flex1]}>
                <TextInputFieldPaper
                  label={'Enter Price'}
                  style={[styles.input]}
                  value={price}
                  labelStyle={styles.labelStyle}
                  valueStyle={styles.valueStyle}
                  keyboardType="number-pad"
                  Icon={
                    <Text style={styles.currency}>
                      {t(APP_LANGUAGE_CONSTANT.AED)}
                    </Text>
                  }
                  onChangeText={handlePriceChange}
                />
                {priceError && (
                  <Text style={styles.errorText}>{priceError}</Text>
                )}
              </View>
              <View style={[styles.inputWrapper, ApplicationStyles.flex1]}>
                <TextInputFieldPaper
                  label={'Total quantity'}
                  style={[styles.input]}
                  value={quantity}
                  labelStyle={styles.labelStyle}
                  valueStyle={styles.valueStyle}
                  keyboardType="number-pad"
                  onChangeText={handleQuantityChange}
                />
                {quantityError && (
                  <Text style={styles.errorText}>{quantityError}</Text>
                )}
              </View>
            </View>
            <View style={styles.row}>
              <View style={[styles.inputWrapper, ApplicationStyles.flex1]}>
                <TextInputFieldPaper
                  label={'Package Type'}
                  style={[styles.input]}
                  value={packagingType}
                  labelStyle={styles.labelStyle}
                  valueStyle={styles.valueStyle}
                  onChangeText={handlePackageTypeChange}
                />
                {packageError && (
                  <Text style={styles.errorText}>{packageError}</Text>
                )}
              </View>
              <View style={[styles.inputWrapper, ApplicationStyles.flex1]}>
                <TextInputFieldPaper
                  label={'Moq'}
                  style={[styles.input]}
                  value={moq}
                  labelStyle={styles.labelStyle}
                  valueStyle={styles.valueStyle}
                  onChangeText={handleMoqChange}
                />
                {moqError && <Text style={styles.errorText}>{moqError}</Text>}
              </View>
            </View>
            {isHaveDates && (
              <View style={styles.row}>
                <View style={[styles.inputWrapper, ApplicationStyles.flex1]}>
                  <DateTimePicker
                    label={'Expiry Date'}
                    labelStyle={styles.input}
                    valueStyle={styles.input}
                    date={item?.expiryDate || expiryDate}
                    // labelStyle={styles.labelStyle}
                    // valueStyle={styles.valueStyle}
                    isHideLabel={state?.expiryDate ? true : false}
                    onChange={(date) => {
                      dispatch({
                        type: 'UPDATE_VARIANT_DETAILS',
                        payload: {
                          ...variantDetails,
                          expiryDate: new Date(date),
                          expiryDateError: ''
                        }
                      });
                    }}
                  />
                  {expiryDateError && (
                    <Text style={styles.errorText}>{expiryDateError}</Text>
                  )}
                </View>
                <View style={[styles.inputWrapper, ApplicationStyles.flex1]}>
                  <DateTimePicker
                    label={'MFG Date'}
                    labelStyle={styles.input}
                    valueStyle={styles.input}
                    date={item?.packagingDate || mfgDate}
                    // labelStyle={styles.labelStyle}
                    // valueStyle={styles.valueStyle}
                    isHideLabel={state?.packagingDate ? true : false}
                    onChange={(date) => {
                      dispatch({
                        type: 'UPDATE_VARIANT_DETAILS',
                        payload: {
                          ...variantDetails,
                          packagingDate: new Date(date),
                          packagingDateError: ''
                        }
                      });
                    }}
                  />
                  {packagingDateError && (
                    <Text style={styles.errorText}>{packagingDateError}</Text>
                  )}
                </View>
              </View>
            )}
          </View>
          <RenderPackageType
            state={item}
            handleWarehouseQuantityChange={handleWarehouseQuantityChange}
            handleWarehouseChange={handleWarehouseChange}
            error={warehouseListError}
          />
        </>
      ) : (
        <RenderSubVariants
          index={index}
          setSelectedIndex={setSelectedIndex}
          selectedIndex={selectedIndex}
        />
      )}
      <ImagePickerModal
        type={''}
        isVisible={visible}
        setVisibility={setVisible}
        openCamera={captureFromCamera}
        openGallery={pickFormGallery}
      />
    </View>
  );
};

function VarientList({
  data,
  itemIndex,
  state,
  dispatch,
  buyingPrice,
  sellingPrice,
  volume,
  expiryDate,
  mfgDate,
  moq,
  handleRemoveEvent,
  isHaveDates
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const _renderItem = ({ item, index }) => {
    return selectedIndex === index ? (
      <VariantItem
        key={index}
        item={item}
        index={index}
        state={state}
        dispatch={dispatch}
        itemIndex={itemIndex}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        buyingPrice={buyingPrice}
        sellingPrice={sellingPrice}
        volume={volume}
        expiryDate={expiryDate}
        mfgDate={mfgDate}
        paramsMoq={moq}
        handleRemoveEvent={handleRemoveEvent}
        isHaveDates={isHaveDates}
      />
    ) : (
      <RenderSubVariants
        key={index}
        index={index}
        setSelectedIndex={setSelectedIndex}
        selectedIndex={selectedIndex}
      />
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={_renderItem}
      keyExtractor={(item, i) => `varlient${i}`}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
}

export default VarientList;

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.gray10
  },
  topConatiner: {
    paddingHorizontal: horizontalScale(12),
    backgroundColor: Colors.lightOrange2,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: verticalScale(12)
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 15
  },
  header: {
    gap: verticalScale(12)
  },
  title: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.semi,
    color: Colors.black70
  },
  subTitle: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.semi,
    color: Colors.gray20
  },
  form: {
    gap: verticalScale(5),
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(15),
    backgroundColor: Colors.lightOrange2
  },
  inputWrapper: {
    gap: verticalScale(8)
  },
  input: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.h15,
    fontWeight: Fonts.Weight.low,
    paddingVertical: 0,
    color: Colors.black70,
    backgroundColor: Colors.secondary
  },
  currency: {
    fontFamily: Fonts.type.robotoBold,
    fontSize: Fonts.size.semi,
    color: Colors.gray20
  },
  row: {
    flexDirection: 'row',
    gap: horizontalScale(16),
    alignItems: 'center'
  },
  package: {
    gap: horizontalScale(8),
    backgroundColor: Colors.primary30,
    borderBottomLeftRadius: verticalScale(20),
    borderBottomRightRadius: verticalScale(20),
    padding: verticalScale(16)
  },
  subVariantsContainer: {
    flexDirection: 'row',
    gap: horizontalScale(8),
    backgroundColor: Colors.white,
    paddingVertical: verticalScale(12),
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    padding: verticalScale(4),
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: Colors.gray10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subVarient: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.s10,
    color: Colors.gray50,
    textAlign: 'center'
  },
  spaceingTop: {
    marginTop: verticalScale(16)
  },
  address: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.semi,
    color: Colors.orange30,
    flex: 1,
    flexWrap: 'wrap'
  },
  commonHeight: {
    height: verticalScale(52),
    borderColor: Colors.secondary
  },
  warehouse: {
    flexDirection: 'row',
    width: '100%',
    gap: horizontalScale(8),
    backgroundColor: Colors.white,
    borderRadius: verticalScale(20),
    marginVertical: verticalScale(6),
    padding: verticalScale(16)
  },
  errorText: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.small,
    color: Colors.red
  },
  quantity: {
    backgroundColor: Colors.secondary,
    paddingVertical: 0,
    paddingHorizontal: horizontalScale(10),
    borderRadius: 4,
    color: Colors.orange30,
    fontSize: Fonts.size.uprSemi,
    fontFamily: Fonts.type.robotoMedium
  },
  labelStyle: {
    fontSize: Fonts.size.uprSemi,
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.low
  },
  valueStyle: {
    fontSize: Fonts.size.uprSemi,
    fontFamily: Fonts.type.robotoBold,
    fontWeight: Fonts.Weight.seven
  }
});
