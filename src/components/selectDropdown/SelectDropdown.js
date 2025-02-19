import React from 'react';
import { StyleSheet, View, Text, LayoutAnimation } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  verticalScale
} from '../../theme';
import { DownIcons } from '../../assets/icon';

// eslint-disable-next-line complexity
const SelectDropdown = ({
  placeholder,
  isDisable = false,
  data,
  value,
  onChange,
  errors,
  touched,
  style,
  disable = false,
  placeholderStyle
}) => {
  const onFocus = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const renderItem = (item) => (
    <View style={styles.itemContainer}>
      <Text style={styles.labelStyle}>{item?.title}</Text>
    </View>
  );

  const renderSelectedItem = () => {
    const selectedItem = data.find((item) => item?.value === value);
    if (!selectedItem) {
      return <Text style={styles.placeholderStyle}>Select item</Text>;
    }
    return (
      <View style={styles.selectedItemContainer}>
        <Text style={styles.labelStyle}>{selectedItem.title}</Text>
      </View>
    );
  };

  return (
    <>
      <Dropdown
        disable={disable || isDisable}
        style={[
          styles.dropdown,
          style,
          isDisable && {
            backgroundColor: `${Colors.gray10}44`,
            ...ApplicationStyles.productFieldDisable
          }
        ]}
        placeholderStyle={[styles.placeholderStyle, placeholderStyle]}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemTextStyle}
        selectedStyle={styles.selectedStyle}
        containerStyle={styles.containerStyle}
        data={data}
        maxHeight={300}
        labelField="title"
        valueField="value"
        placeholder={placeholder}
        value={value ? value : ''}
        renderItem={renderItem}
        renderRightIcon={() => <DownIcons />}
        renderCustomizedSelectedChild={() => renderSelectedItem()}
        selectedTextProps={{
          numberOfLines: 1,
          ellipsizeMode: 'tail'
        }}
        onChange={onChange}
        onFocus={onFocus}
      />
      {errors && touched && <Text style={styles.error}>{errors}</Text>}
    </>
  );
};

export default SelectDropdown;

const styles = StyleSheet.create({
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
    fontSize: Fonts.size.uprSemi,
    fontFamily: Fonts.type.robotoBold,
    fontWeight: Fonts.Weight.seven,
    color: Colors.black70
  },
  selectedStyle: {
    ...ApplicationStyles.rowAlignCenterJustifyBetween
  },
  itemTextStyle: {
    fontSize: Fonts.size.uprSemi,
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.low,
    color: Colors.black10
  },
  itemContainer: {
    padding: 7,
    backgroundColor: Colors.white
  },
  selectedItemContainer: {
    flexDirection: 'column'
  },
  labelStyle: {
    ...ApplicationStyles.smallMontserratFont,
    fontSize: Fonts.size.uprSemi,
    color: Colors.black50
  },
  containerStyle: {
    borderRadius: 30,
    overflow: 'hidden',
    paddingHorizontal: horizontalScale(10)
  },
  error: {
    color: Colors.red,
    paddingLeft: verticalScale(8),
    paddingTop: verticalScale(2),
    fontSize: 12,
    marginTop: verticalScale(4)
  }
});
