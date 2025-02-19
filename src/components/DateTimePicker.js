import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Colors, Fonts, horizontalScale, verticalScale } from '../theme';

const DateTimePicker = ({
  title = '',
  name,
  setFieldValue,
  value,
  touched,
  errors
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const currentDate = date.toISOString().split('T')[0];
    const currentTime = date.toISOString().split('T')[1].slice(0, 8);
    setFieldValue(name, `${currentDate} ${currentTime}`);
    hideDatePicker();
  };
  return (
    <View style={styles.mainView}>
      <TouchableOpacity style={styles.container} onPress={showDatePicker}>
        <Text
          style={[styles.placeholderStyle, value && styles.selectedText]}
          numberOfLines={1}
        >
          {value ? value : title}
        </Text>
      </TouchableOpacity>
      {touched && errors && <Text style={styles.errorText}>{errors}</Text>}

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DateTimePicker;

const styles = StyleSheet.create({
  mainView: { marginBottom: 20 },
  container: {
    height: verticalScale(66),
    borderRadius: 20,
    padding: 0,
    borderWidth: 1,
    borderColor: Colors.gray10,
    paddingHorizontal: horizontalScale(16),
    justifyContent: 'center'
  },
  placeholderStyle: {
    fontSize: Fonts.size.h20,
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.low,
    color: Colors.gray10
  },
  selectedText: {
    backgroundColor: Colors.secondary,
    color: Colors.inputTextColor,
    fontFamily: Fonts.type.robotoBold,
    fontSize: Fonts.size.uprSemi
  },
  errorText: {
    color: Colors.red,
    paddingLeft: verticalScale(8),
    paddingTop: verticalScale(2),
    fontSize: 12,
    marginTop: verticalScale(4)
  }
});
