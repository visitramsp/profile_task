/* eslint-disable complexity */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  LayoutAnimation,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  verticalScale
} from '../../theme';
import { ColoredLocation, DownIcons, LightRedTrash } from '../../assets/icon';
import SelectDropdown from '../selectDropdown/SelectDropdown';
import { useTranslation } from 'react-i18next';
import { KEYBOARD_TYPE } from '../../constants';
import { actions } from '../../screens/Vendor/Product/AddProductState';

const SelectMultiDropdown = ({
  style,
  placeholderStyle,
  isProductEdit,
  state,
  dispatch,
  labelField,
  valueField,
  selected = [],
  setSelected,
  data = [],
  renderSelectedItem,
  placeholderText = '',
  searchPlaceholder = '',
  errors,
  touched,
  disable = false,
  isMultiSelect = false,
  onchange = () => null,
  uuid,
  isAddWarehouse = false,
  activeColor,
  SelectDropdownPlaceholder = 'Select',
  SelectDropdownData = [],
  SelectDropdownValue = '',
  SelectDropdownOnChange = () => null,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isAddWatehouse, setisAddWatehouse] = useState(true);
  const [isVisible, setisVisible] = useState(false);
  const [werehouseList, setwerehouseList] = useState([]);
  const { t } = useTranslation();
  let lable = labelField || 'address';
  let value = valueField || 'uuid';

  const onFocus = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsFocused(true);
    setisVisible(true);
    setisAddWatehouse(true);
  };
  const renderItem = (item, index) => {
    return (
      <View style={styles.item} key={index}>
        <Text style={styles.selectedTextStyle}>{item[lable]}</Text>
      </View>
    );
  };
  useEffect(() => {
    setisAddWatehouse(true);
  }, []);
  const handleOnchange = (Items) => {
    setwerehouseList(Items);
    onchange(Items);
  };
  const handleDelete = () => {
    setwerehouseList([]);
  };
  return (
    <>
      <View style={styles.container}>
        {!isAddWarehouse ? (
          <MultiSelect
            style={[
              styles.dropdown,
              style,
              // eslint-disable-next-line react-native/no-inline-styles
              disable && { backgroundColor: `${Colors.gray10}44`, opacity: 0.8 }
            ]}
            placeholderStyle={[styles.placeholderStyle, placeholderStyle]}
            selectedTextStyle={[styles.selectedTextStyle]}
            containerStyle={styles.containerStyle}
            data={data}
            disable={disable}
            labelField={lable}
            valueField={value}
            activeColor={activeColor}
            placeholder={placeholderText}
            value={uuid}
            renderRightIcon={() => <DownIcons />}
            renderItem={renderItem}
            renderSelectedItem={renderSelectedItem}
            onChange={(item) => {
              handleOnchange(item);
            }}
            onBlur={(_val) => {
              setwerehouseList([]);
              setIsFocused(false);
              setisVisible(false);
            }}
            onFocus={onFocus}
            {...rest}
          />
        ) : (
          <SelectDropdown
            placeholder={SelectDropdownPlaceholder}
            style={styles.commonHeight}
            isDisable={false}
            data={SelectDropdownData}
            value={SelectDropdownValue}
            onChange={(item) => {
              SelectDropdownOnChange(item);
            }}
          />
        )}
        {isMultiSelect &&
          isVisible &&
          werehouseList.length > 0 &&
          werehouseList.map((item, index) => {
            return (
              <View
                key={item?.uuid + item?._index}
                style={[
                  styles.warehouse,
                  { backgroundColor: Colors.lightOrange2 }
                ]}
              >
                <ColoredLocation />
                <Text style={styles.address}>{item?.address}</Text>
                <TextInput
                  style={styles.quantity}
                  maxLength={5}
                  placeholder={'qty'}
                  keyboardType={KEYBOARD_TYPE.NUMERIC_PAD}
                  value={item?.quantity}
                  editable={!isProductEdit}
                  onChangeText={(text) => {
                    const transformed = state?.productWarehouseList?.map(
                      (id) => {
                        if (id?.uuid === item?.uuid) {
                          return {
                            ...id,
                            quantity: text
                          };
                        }
                        return id;
                      }
                    );

                    dispatch({
                      type: actions.productWarehouseList,
                      payload: transformed
                    });
                  }}
                />
                <TouchableOpacity
                  disabled={isProductEdit}
                  onPress={() => handleDelete()}
                >
                  <LightRedTrash />
                </TouchableOpacity>
              </View>
            );
          })}
      </View>
      {errors && touched && <Text style={styles.error}>{errors}</Text>}
    </>
  );
};

export default React.memo(SelectMultiDropdown);

const styles = StyleSheet.create({
  container: { padding: 0 },
  warehouse: {
    flexDirection: 'row',
    width: '100%',
    gap: horizontalScale(8),
    backgroundColor: Colors.white,
    borderRadius: verticalScale(20),
    marginVertical: verticalScale(6),
    padding: verticalScale(16)
  },
  address: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.semi,
    color: Colors.orange30,
    flexWrap: 'wrap',
    flex: 1
  },
  dropdown: {
    marginTop: 3,
    height: verticalScale(46),
    borderRadius: 20,
    padding: 0,
    borderWidth: 1,
    borderColor: Colors.gray10,
    paddingHorizontal: horizontalScale(16)
  },
  quantity: {
    backgroundColor: Colors.secondary,
    paddingVertical: 0,
    paddingHorizontal: horizontalScale(10),
    borderRadius: 4,
    color: Colors.orange30,
    fontSize: Fonts.size.uprSemi,
    fontFamily: Fonts.type.robotoMedium
    // height: verticalScale(20)
  },
  commonHeight: {
    height: verticalScale(52)
  },
  placeholderStyle: {
    fontSize: Fonts.size.uprSemi,
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.low,
    color: Colors.gray10
  },
  selectedTextStyle: {
    ...ApplicationStyles.smallMontserratFont,
    fontSize: Fonts.size.uprSemi,
    color: Colors.black50,
    paddingVertical: 4,
    paddingHorizontal: 7
  },
  item: {
    padding: 5,
    ...ApplicationStyles.rowAlignCenterJustifyBetween
  },
  containerStyle: {
    width: horizontalScale(315),
    position: 'relative',
    left: 30,
    borderRadius: 30,
    overflow: 'hidden'
  },
  error: {
    color: Colors.red,
    paddingLeft: verticalScale(8),
    paddingTop: verticalScale(2),
    fontSize: 12,
    marginTop: verticalScale(4)
  }
});
