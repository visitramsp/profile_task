import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { ApplicationStyles, Colors, Fonts, verticalScale } from '../theme';

const ScreenInfo = ({ title, description }) => {
  const { t } = useTranslation();

  return (
    <View>
      <Text style={styles.title}>{t(title)}</Text>
      <Text style={styles.description}>{t(description)}</Text>
    </View>
  );
};

export default ScreenInfo;

const styles = StyleSheet.create({
  title: {
    ...ApplicationStyles.normalMontserratFont,
    fontSize: Fonts.size.f25,
    fontWeight: Fonts.Weight.full,
    color: Colors.blue30
  },
  description: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.f24,
    paddingTop: verticalScale(15),
    color: Colors.white110
  }
});
