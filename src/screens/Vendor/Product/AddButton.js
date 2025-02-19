import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, horizontalScale, verticalScale, Fonts } from '../../../theme';
import { ColoredPlusIcon } from '../../../assets/icon';

const AddButton = ({ title, Icon, style, buttonStyle, TextStyle, onPress }) => {
  return (
    <TouchableOpacity style={[styles.btn, style]} onPress={onPress}>
      <LinearGradient
        colors={[Colors.orange10, Colors.orange30]}
        style={[styles.btnGradient, buttonStyle]}
      >
        <Text style={[styles.btnTitle, TextStyle]}>{title}</Text>
        <View style={styles.icon}>
          {Icon ? (
            <Icon />
          ) : (
            <ColoredPlusIcon width={15} height={15} colors={Colors.primary} />
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    bottom: verticalScale(100),
    right: horizontalScale(16),
    shadowColor: Colors.primary,
    shadowOffset: { height: 1, width: 1 },
    shadowRadius: 1,
    shadowOpacity: 2,
    elevation: 5
  },
  btnGradient: {
    paddingVertical: verticalScale(4),
    paddingHorizontal: horizontalScale(4),
    borderRadius: 22.5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(8),
    paddingLeft: horizontalScale(16)
  },
  icon: {
    backgroundColor: Colors.white,
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18
  },
  btnTitle: {
    fontFamily: Fonts.type.montserrat,
    fontWeight: Fonts.Weight.bold,
    fontSize: Fonts.size.semi,
    color: Colors.white
  }
});
