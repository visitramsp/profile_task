import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { DownIcons } from '../../assets/icon';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  verticalScale
} from '../../theme';

const PaymentMethodInput = ({
  data,
  placeholder,
  value = '',
  onChange,
  errors,
  touched
}) => {
  const renderItem = (item) => (
    <View style={styles.itemContainer}>
      <Text style={styles.labelStyle}>{item?.label}</Text>
    </View>
  );
  const renderLabel = () => {
    if (value) {
      return <Text style={[styles.label]}>{placeholder}</Text>;
    }
    return null;
  };

  const renderSelectedItem = () => {
    const selectedItem = data.find((item) => item?.label === value);
    if (!selectedItem) {
      return <Text style={styles.placeholderStyle}>Select item</Text>;
    }
    return (
      <View style={styles.selectedItemContainer}>
        <Text style={styles.labelStyle}>{selectedItem.label}</Text>
      </View>
    );
  };

  return (
    <>
      <View style={styles.mainView}>
        <View style={styles.container}>
          {renderLabel()}
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemTextStyle={styles.itemTextStyle}
            selectedStyle={styles.selectedStyle}
            containerStyle={styles.containerStyle}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="label"
            placeholder={placeholder}
            renderItem={renderItem}
            value={value}
            renderSelectedItem={renderSelectedItem}
            renderRightIcon={() => (
              <View style={styles.iconStyle}>
                <DownIcons />
              </View>
            )}
            selectedTextProps={{
              numberOfLines: 1,
              ellipsizeMode: 'tail'
            }}
            onChange={onChange}
          />
        </View>
      </View>
      {errors && touched && <Text style={styles.error}>{errors}</Text>}
    </>
  );
};

export default PaymentMethodInput;

const styles = StyleSheet.create({
  selectedItemContainer: {
    flexDirection: 'column'
  },
  labelStyle: {
    ...ApplicationStyles.smallMontserratFont,
    fontSize: Fonts.size.uprSemi,
    color: Colors.black50
  },
  itemContainer: {
    paddingVertical: 9,
    paddingHorizontal: 7
  },
  mainView: {
    height: verticalScale(66),
    borderRadius: 20,
    padding: 0,
    borderWidth: 1,
    borderColor: Colors.gray10,
    paddingHorizontal: horizontalScale(16)
  },
  selectedStyle: {
    ...ApplicationStyles.rowAlignCenterJustifyBetween
  },
  container: {
    paddingVertical: 10
  },
  dropdown: {
    height: verticalScale(50),
    borderRadius: 8
  },
  label: {
    position: 'absolute',
    top: verticalScale(10),
    zIndex: 999,
    fontSize: Fonts.size.sminy,
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.low,
    color: Colors.black
  },
  placeholderStyle: {
    fontSize: Fonts.size.h20,
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.low,
    color: Colors.gray10,
    position: 'relative',
    bottom: verticalScale(4)
  },
  selectedTextStyle: {
    fontFamily: Fonts.type.robotoBold,
    fontWeight: Fonts.Weight.seven,
    color: Colors.black70,
    fontSize: Fonts.size.f20,
    marginTop: verticalScale(13)
  },
  inputSearchStyle: {
    height: verticalScale(40),
    fontSize: 16
  },
  itemTextStyle: {
    fontSize: Fonts.size.uprSemi,
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.low,
    color: Colors.black70
  },
  iconStyle: { position: 'relative', top: -4 },
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
