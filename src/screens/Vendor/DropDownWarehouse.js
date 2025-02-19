import React, { useState } from 'react';
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

const DropDownWareHouse = ({
  placeholder,
  data,
  onChange,
  errors,
  value,
  touched,
  style
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const onFocus = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsFocused(true);
  };
  const renderItem = (item) => (
    <View style={styles.itemContainer}>
      <Text style={styles.labelStyle}>{item?.address}</Text>
    </View>
  );

  const renderSelectedItem = () => {
    const selectedItem = data.find((item) => item?.value === value);
    if (!selectedItem) {
      return <Text style={styles.placeholderStyle}>Select item</Text>;
    }
    return (
      <View style={styles.selectedItemContainer}>
        <Text style={styles.labelStyle}>{selectedItem.name}</Text>
      </View>
    );
  };

  return (
    <>
      <Dropdown
        style={[styles.dropdown, style]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemTextStyle}
        selectedStyle={styles.selectedStyle}
        containerStyle={styles.containerStyle}
        data={data}
        maxHeight={300}
        labelField="title"
        valueField="value"
        placeholder={placeholder}
        value={value ? value.address : ''}
        renderItem={renderItem}
        renderRightIcon={() => <DownIcons />}
        renderCustomizedSelectedChild={() => renderSelectedItem()}
        selectedTextProps={{
          numberOfLines: 1,
          ellipsizeMode: 'tail'
        }}
        onChange={onChange}
        onBlur={(val) => {
          setIsFocused(false);
        }}
        onFocus={onFocus}
      />
      {errors && touched && <Text style={styles.error}>{errors}</Text>}
    </>
  );
};

export default React.memo(DropDownWareHouse);

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
