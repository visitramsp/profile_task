import React, { useState } from 'react';
import { LayoutAnimation, StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { DownIcons } from '../../../assets/icon';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  verticalScale
} from '../../../theme';
const AsssignVehicleInput = ({
  data,
  placeholder,
  value,
  onBlur,
  onChange,
  errors,
  touched
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const renderItem = (item) => (
    <View style={styles.itemContainer}>
      <Text style={styles.labelStyle}>{item?.label}</Text>
    </View>
  );
  const renderLabel = () => {
    if (value || isFocus) {
      return <Text style={[styles.label]}>{placeholder}</Text>;
    }
    return null;
  };

  const renderSelectedItem = () => {
    const selectedItem = data.find((item) => item?.value === value);
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
            valueField="value"
            placeholder={!isFocus ? placeholder : ''}
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
            onFocus={() => {
              setIsFocus(true);
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
            }}
            onBlur={(val) => {
              setIsFocus(false);
            }}
            onChange={onChange}
          />
        </View>
      </View>
      {errors && touched && <Text style={styles.error}>{errors}</Text>}
    </>
  );
};

export default AsssignVehicleInput;

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
    paddingVertical: verticalScale(10)
  },
  dropdown: {
    height: verticalScale(50),
    borderRadius: 8
  },
  label: {
    position: 'absolute',
    top: 8,
    zIndex: 999,
    fontSize: Fonts.size.sminy,
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.low,
    color: Colors.black
  },
  placeholderStyle: {
    fontSize: Fonts.size.uprSemi,
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.low,
    color: Colors.gray10,
    position: 'relative',
    bottom: 5
  },
  selectedTextStyle: {
    ...ApplicationStyles.fontRobotoBold,
    fontWeight: Fonts.Weight.seven,
    color: Colors.black,
    fontSize: Fonts.size.f20,
    marginTop: 12
  },
  inputSearchStyle: {
    height: verticalScale(40),
    fontSize: Fonts.size.uprSemi
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
