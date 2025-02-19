import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {} from '../';

import { useTranslation } from 'react-i18next';

import { Colors, moderateScale } from '../../theme';

import Fonts from '../../theme/Fonts';
import { PAGE_SPACING } from '../../theme/ApplicationStyles';
import { APP_LANGUAGE_CONSTANT } from '../../constants/AppConstant';

const TodayCard = ({}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.itemLeftContainer}>
        <Text style={styles.title}>{t(APP_LANGUAGE_CONSTANT.TODAY_ORDER)}</Text>
        <View style={styles.row}>
          <Text style={styles.numTxt}>500000</Text>
        </View>
      </View>

      <View style={styles.itemRightContainer}>
        <View style={styles.lowOpacity} />
        <Text style={styles.title}>
          {t(APP_LANGUAGE_CONSTANT.TODAY_TRAVEL)}
        </Text>
        <View style={styles.row}>
          <Text style={styles.numTxt}>975895</Text>
          <Text style={styles.smallTxt}>{t(APP_LANGUAGE_CONSTANT.KM)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: PAGE_SPACING,
    paddingHorizontal: PAGE_SPACING
  },
  itemLeftContainer: {
    width: '48%',
    backgroundColor: '#fae3cf',
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
    shadowColor: 'rgba(151, 71, 255, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10
  },
  title: {
    fontSize: Fonts.size.h20,
    lineHeight: Fonts.size.f26,
    color: Colors.black60,
    fontFamily: Fonts.type.robotoRegular
  },
  numTxt: {
    fontSize: Fonts.size.h5,
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
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '2%'
  }
});

export default TodayCard;
