import React from 'react';
import { StyleSheet, Keyboard } from 'react-native';
import { Colors, verticalScale, horizontalScale, Fonts } from '../../theme';
import { Dropdown } from 'react-native-element-dropdown';
import { DropDownIcon } from '../../assets/icon';

// eslint-disable-next-line complexity
const DropdownComponent = ({
  style,
  options,
  placeholder,
  placeholderStyle,
  lableField,
  valueField,
  selectedTextStyle,
  inputSearchStyle,
  value,
  onChange,
  searchPlaceholder,
  rightIcon,
  iconStyle,
  ...rest
}) => {
  let labelfield = lableField || 'label';
  let valuefiled = valueField || 'value';
  let placeHolder = placeholder || 'Select item';
  let searchPlaceHolder = searchPlaceholder || 'Search ...';

  return (
    <Dropdown
      search
      style={[styles.dropdown, style]}
      placeholderStyle={[styles.placeholderStyle, placeholderStyle]}
      selectedTextStyle={[styles.selectedTextStyle, selectedTextStyle]}
      inputSearchStyle={[styles.inputSearchStyle, inputSearchStyle]}
      iconStyle={[styles.iconStyle, iconStyle]}
      data={options}
      maxHeight={300}
      labelField={labelfield}
      valueField={valuefiled}
      placeholder={placeHolder}
      searchPlaceholder={searchPlaceHolder}
      value={value}
      renderRightIcon={rightIcon ? rightIcon : () => <DropDownIcon />}
      onChange={onChange}
      onFocus={() => Keyboard.dismiss()}
      {...rest}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    marginVertical: verticalScale(16),
    height: verticalScale(48),
    borderColor: Colors.gray10,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: horizontalScale(16)
  },
  placeholderStyle: {
    fontSize: Fonts.size.semi,
    color: Colors.gray10,
    fontFamily: Fonts.type.robotoRegular
  },
  selectedTextStyle: {
    fontSize: Fonts.size.semi,
    color: Colors.inputTextColor,
    fontFamily: Fonts.type.robotoRegular
  },
  iconStyle: {
    width: 20,
    height: 20
  },
  inputSearchStyle: {
    height: verticalScale(48),
    fontSize: Fonts.size.semi,
    color: Colors.inputTextColor,
    fontFamily: Fonts.type.robotoRegular
  }
});
