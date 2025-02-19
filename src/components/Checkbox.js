import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CheckBoxIcon } from '../assets/icon';
import { Colors, Fonts, horizontalScale, verticalScale } from '../theme';

export default function Checkbox({ checked, label, onPress }) {
  return (
    <View style={styles.mainView}>
      <TouchableOpacity
        style={[styles.container, checked ? styles.checked : {}]}
        onPress={onPress}
      >
        {checked ? <CheckBoxIcon width={10} height={10} /> : null}
      </TouchableOpacity>
      {label && <Text style={styles.lebel}>{label ? label : null}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(15)
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.grayF0F0F0
  },

  checked: {
    backgroundColor: Colors.orange10,
    borderWidth: 0
  },
  lebel: {
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.low,
    fontSize: Fonts.size.regularLarge,
    color: Colors.inputTextColor,
    marginLeft: horizontalScale(8)
  }
});
