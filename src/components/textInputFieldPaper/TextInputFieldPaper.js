import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  verticalScale
} from '../../theme';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line complexity
const TextInputFieldPaper = (props) => {
  const {
    value,
    mode = 'flat',
    isDisable = false,
    editable = true,
    autoCapitalize = false,
    onChangeText = () => null,
    onBlur = () => null,
    underlineStyle = ApplicationStyles.dNone,
    containerStyle,
    style,
    labelStyle = { fontSize: Fonts.size.h20 },
    valueStyle = {},
    secureTextEntry,
    keyboardType,
    Icon,
    onPressRight,
    errors,
    touched,
    validationSymbol,
    multiline = false,
    numberOfLines = 1,
    maxLength
  } = props;
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => {
    setIsFocused(true);
  };
  return (
    <>
      <View
        style={[
          styles.inputViewEmail,
          style,
          isDisable && {
            backgroundColor: `${Colors.gray10}44`,
            ...ApplicationStyles.productFieldDisable
          }
        ]}
      >
        <TextInput
          mode={mode}
          autoCapitalize={autoCapitalize}
          style={[
            styles.input,
            containerStyle,
            valueStyle,
            isDisable && { backgroundColor: Colors.transparent }
          ]}
          underlineStyle={underlineStyle}
          value={value}
          editable={isDisable ? false : editable}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          onChangeText={onChangeText}
          onBlur={(val) => {
            onBlur(val);
            setIsFocused(false);
          }}
          onFocus={onFocus}
        />
        {Icon &&
          (onPressRight ? (
            <TouchableOpacity onPress={onPressRight}>
              <Icon />
            </TouchableOpacity>
          ) : (
            Icon
          ))}
      </View>
      {errors && touched && <Text style={styles.error}>{errors}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    color: Colors.white80,
    fontWeight: Fonts.Weight.low
  },
  input: {
    backgroundColor: Colors.secondary,
    color: Colors.inputTextColor,
    fontFamily: Fonts.type.robotoBold,
    paddingHorizontal: horizontalScale(5),
    fontSize: Fonts.size.h20,
    borderRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    height: 57,
    overflow: 'hidden',
    flex: 1
  },
  inputViewEmail: {
    ...ApplicationStyles.rowAlignCenter,
    borderWidth: 1,
    borderColor: Colors.custonLightGray,
    borderRadius: verticalScale(20),
    overflow: 'hidden',
    paddingHorizontal: horizontalScale(13)
  },
  error: {
    color: Colors.red,
    paddingLeft: verticalScale(8),
    paddingTop: verticalScale(2),
    fontSize: 12,
    marginTop: verticalScale(4)
  }
});

export default TextInputFieldPaper;
