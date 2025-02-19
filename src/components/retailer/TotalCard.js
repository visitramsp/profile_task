import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { useTranslation } from 'react-i18next';

import { Colors, moderateScale } from '../../theme';

import Fonts from '../../theme/Fonts';
import ApplicationStyles, { PAGE_SPACING } from '../../theme/ApplicationStyles';
import { APP_LANGUAGE_CONSTANT } from '../../constants';

const TotalCard = ({ creditItem, currency = 'SKU', label1, label2 }) => {
  const { t } = useTranslation();
  let title1 = label1 || t(APP_LANGUAGE_CONSTANT.TOTAL_INVENTORY);
  let title2 = label2 || t(APP_LANGUAGE_CONSTANT.AQAD_CREDIT);
  return (
    <View style={styles.container}>
      <View style={styles.itemLeftContainer}>
        <Text style={[styles.title]} numberOfLines={1}>
          {title1}
        </Text>
        <View style={styles.row}>
          <Text style={styles.numTxt}>0</Text>
          <Text style={styles.smallTxt}>SKU</Text>
        </View>
      </View>

      <View style={styles.itemRightContainer}>
        <View style={styles.lowOpacity} />
        <Text style={styles.title} numberOfLines={1}>
          {title2}
        </Text>
        <View style={styles.row}>
          <Text style={styles.numTxt}>{creditItem}</Text>
          <Text style={styles.smallTxt}>AED</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...ApplicationStyles.rowAlignCenterJustifyBetween,
    width: '100%',
    marginTop: PAGE_SPACING
  },
  itemLeftContainer: {
    width: '48%',
    backgroundColor: Colors.orange90,
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 20,
    padding: moderateScale(12),
    shadowColor: Colors.primary20,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.5,
    shadowRadius: 32,
    elevation: 10
  },
  lowOpacity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'white',
    opacity: 0.5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.white
  },
  itemRightContainer: {
    width: '48%',
    padding: moderateScale(12),
    shadowColor: Colors.skyblue20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10
  },
  title: {
    fontSize: Fonts.size.regularLarge,
    lineHeight: Fonts.size.f26,
    color: Colors.black60,
    fontFamily: Fonts.type.robotoRegular
  },
  numTxt: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.robotoBold,
    color: Colors.black50
  },
  smallTxt: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.robotoBold,
    color: Colors.black50,
    marginLeft: '3%',
    top: 5
  },
  row: {
    ...ApplicationStyles.rowAlignCenterJustifyBetween,
    marginTop: '2%'
  }
});

export default TotalCard;
