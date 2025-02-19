import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';

import { useTranslation } from 'react-i18next';

import { ApplicationStyles, Colors } from '../../../theme';

import Fonts from '../../../theme/Fonts';

const ContentHeader = ({ title, onPress, textStyle, containerExt }) => {
  const { t } = useTranslation();

  return (
    <View style={[styles.container, containerExt]}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={[styles.smallText, textStyle]}>{t('SEE_ALL')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  title: {
    ...ApplicationStyles.normalMontserratFont,
    fontWeight: Fonts.Weight.secondlast,
    color: Colors.black50,
    flex: 1
  },
  smallText: {
    ...ApplicationStyles.mediumMontserratFont,
    color: Colors.orange10,
    shadowColor: 'rgba(255, 138, 31, 1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4
  },
  btn: {}
});

export default ContentHeader;
