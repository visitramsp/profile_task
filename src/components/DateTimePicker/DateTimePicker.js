import moment from 'moment';
import React, { forwardRef, useState } from 'react';
import {
  TextInput as RNTextInput,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { GrayCalender } from '../../assets/icon';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  verticalScale
} from '../../theme';
import { showToastError } from '../../utils';

const DateTimePicker = (
  {
    type = 'date',
    date,
    maximumDate,
    minuteInterval,
    btnStyle,
    validationSymbol,
    disabled = false,
    label,
    inputStyle,
    labelStyle = { fontSize: Fonts.size.h20 },
    valueStyle = {},
    isHideLabel = false,
    rightIcon,
    onChange,
    placeholder,
    ...rest
  },
  ref
) => {
  const [open, setOpen] = useState(false);
  const [manualDate, setManualDate] = useState(
    date ? moment(date).format('DD/MM/YY') : ''
  );

  // Handle manual date input with auto-formatting
  const handleManualInputChange = (text) => {
    // Only allow numeric characters and limit to 8 characters
    const formattedText = text?.replace(/[^0-9]/g, '')?.slice(0, 8);
    let newDate = formattedText;

    // Insert slashes to format as DD/MM/YY
    if (formattedText.length >= 3) {
      newDate = `${formattedText?.slice(0, 2)}/${formattedText?.slice(2, 4)}`;
    }
    if (formattedText.length >= 5) {
      newDate = `${formattedText?.slice(0, 2)}/${formattedText?.slice(
        2,
        4
      )}/${formattedText?.slice(4, 6)}`;
    }

    setManualDate(newDate); // Update the manual date input state

    // If 8 characters (complete date) entered, validate and format
    if (formattedText.length === 6) {
      if (moment(newDate, 'DD/MM/YY', true).isValid()) {
        const parsedDate = moment(newDate, 'DD/MM/YY').toDate();
        onChange && onChange(parsedDate);
      } else {
        // Handle invalid date input
        showToastError('Invalid date format');
        setManualDate('');
      }
    }
  };

  return (
    <View style={styles.container} ref={ref}>
      <View
        style={[
          styles.inputContainer,
          btnStyle,
          disabled && {
            backgroundColor: `${Colors.gray10}44`,
            ...ApplicationStyles.productFieldDisable
          }
        ]}
      >
        <RNTextInput
          editable={!disabled}
          style={[styles.input, valueStyle]}
          value={manualDate}
          placeholder={placeholder}
          placeholderTextColor={Colors.placeholderGray}
          keyboardType="numeric" // Show numeric keyboard
          maxLength={8} // Limit input length to 8 characters
          onChangeText={handleManualInputChange} // Handle manual input
        />
        <TouchableOpacity
          style={styles.iconContainer}
          disabled={disabled}
          onPress={() => setOpen(true)}
        >
          <GrayCalender height={20} width={20} />
        </TouchableOpacity>
      </View>
      <DatePicker
        {...rest}
        modal
        maximumDate={maximumDate}
        mode={type}
        open={open}
        date={date ? date : new Date()}
        textColor={Colors.black}
        minuteInterval={minuteInterval}
        onConfirm={(value) => {
          setOpen(false);
          const formattedDate = moment(value).format('DD/MM/YY');
          setManualDate(formattedDate); // Set the formatted date in manual input
          onChange && onChange(value); // Call onChange with the selected date
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

export default forwardRef(DateTimePicker); // for forward references

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainer: {
    height: verticalScale(52),
    borderWidth: 1,
    borderColor: Colors.custonLightGray,
    borderRadius: 15,
    padding: verticalScale(2),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white
  },
  input: {
    flex: 1,
    fontSize: Fonts.size.h20,
    backgroundColor: Colors.secondary,
    color: Colors.inputTextColor,
    fontFamily: Fonts.type.robotoBold,
    paddingHorizontal: horizontalScale(5),
    borderRadius: 15,
    height: verticalScale(48)
  },
  iconContainer: {
    paddingHorizontal: horizontalScale(5),
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [
      {
        translateY: -10
      }
    ]
  }
});
