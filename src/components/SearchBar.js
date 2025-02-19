import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

import {
  Colors,
  Fonts,
  horizontalScale,
  moderateScale,
  verticalScale
} from '../theme';
import { useTranslation } from 'react-i18next';
import { SearchGrayIcon } from '../assets/icon';

export default function SearchBar({
  style,
  containerStyle,
  value,
  onChangeValue,
  onBlur = () => null,
  onFocus = () => null,
  ...rest
}) {
  const { t } = useTranslation();
  return (
    <View style={[styles.container, containerStyle]}>
      <SearchGrayIcon />
      <TextInput
        value={value}
        style={[styles.input, style]}
        placeholder={t('SEARCH')}
        placeholderTextColor={Colors.gray10}
        onChangeText={onChangeValue}
        onBlur={onBlur}
        onFocus={onFocus}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(51.4),
    borderWidth: verticalScale(1),
    borderColor: Colors.gray10,
    backgroundColor: Colors.white,
    paddingHorizontal: horizontalScale(20),
    borderRadius: verticalScale(20)
  },
  input: {
    fontSize: Fonts.size.semi,
    fontWeight: Fonts.Weight.low,
    fontFamily: Fonts.type.robotoRegular,
    color: Colors.black,
    flex: 1,
    paddingLeft: moderateScale(10)
  }
});
