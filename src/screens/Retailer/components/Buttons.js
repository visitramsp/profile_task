import React from 'react';
import { View, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useTranslation } from 'react-i18next';
import { ApplicationStyles } from '../../../theme';
import { PAGE_SPACING } from '../../../theme/ApplicationStyles';
import GradientButton from '../../../components/buttons/GradientButton';
import { requestProduct } from '..';

const Buttons = ({ label1, label2, navigation1, navigation2 }) => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  let lable1 = label1 || t('REQUEST_PRODUCT');
  let lable2 = label2 || t('POS_INTEGRATION');
  return (
    <View style={styles.container}>
      <GradientButton
        title={lable1}
        style={styles.btn}
        onPress={() => {
          navigate(navigation1 || requestProduct);
        }}
      />
      <GradientButton
        title={lable2}
        style={styles.btn}
        onPress={() => {
          navigate(navigation2);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: PAGE_SPACING,
    ...ApplicationStyles.pageSpacing,
    marginVertical: 23
  },
  btn: {
    width: '49%'
  }
});

export default Buttons;
