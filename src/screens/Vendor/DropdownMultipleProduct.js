import React, { useState } from 'react';
import { StyleSheet, View, Text, LayoutAnimation } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  verticalScale
} from '../../theme';
import { DownIcons } from '../../assets/icon';

const DropdownMultipleProduct = ({
  style,
  placeholderStyle,
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
  onchange,
  uuid,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  let lable = labelField || 'address';
  let value = valueField || 'uuid';

  const onFocus = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsFocused(true);
  };
  const renderItem = (item, index) => {
    return (
      <View style={styles.item} key={index}>
        <Text style={styles.selectedTextStyle}>{item.title}</Text>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <MultiSelect
          style={[styles.dropdown, style]}
          placeholderStyle={[styles.placeholderStyle, placeholderStyle]}
          selectedTextStyle={[styles.selectedTextStyle]}
          containerStyle={styles.containerStyle}
          data={data}
          disable={disable}
          labelField={lable}
          valueField={value}
          placeholder={placeholderText}
          value={uuid}
          renderRightIcon={() => <DownIcons />}
          renderItem={renderItem}
          renderSelectedItem={renderSelectedItem}
          onChange={onchange}
          onBlur={(val) => {
            setIsFocused(false);
          }}
          onFocus={onFocus}
          {...rest}
        />
      </View>
      {errors && touched && <Text style={styles.error}>{errors}</Text>}
    </>
  );
};

export default DropdownMultipleProduct;

const styles = StyleSheet.create({
  container: { padding: 0 },
  dropdown: {
    marginTop: 3,
    height: verticalScale(46),
    borderRadius: 20,
    padding: 0,
    borderWidth: 1,
    borderColor: Colors.gray10,
    paddingHorizontal: horizontalScale(16)
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
    // flexDirection: 'column',
  },
  error: {
    color: Colors.red,
    paddingLeft: verticalScale(8),
    paddingTop: verticalScale(2),
    fontSize: 12,
    marginTop: verticalScale(4)
  }
});
