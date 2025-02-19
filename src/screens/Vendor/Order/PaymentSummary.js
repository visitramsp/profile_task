import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Fonts, Colors, verticalScale } from '../../../theme';
import { useTranslation } from 'react-i18next';
import { APP_LANGUAGE_CONSTANT } from '../../../constants/AppConstant';

const Info = ({ lable, value, lableStyle, valueStyle }) => {
  return (
    <View style={styles.infoContainer}>
      <Text style={[styles.label, lableStyle]}>{lable}</Text>
      <Text style={[styles.label, valueStyle]}>{value}</Text>
    </View>
  );
};

function PaymentSummary(props) {
  const { t } = useTranslation();
  const { data } = props;

  const pascalCaseText = (str) => {
    return str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();
  };

  return (
    <View style={styles.conatiner}>
      <Info
        lable={t(APP_LANGUAGE_CONSTANT.PAYMENT_METHOD)}
        value={data?.payment_method}
      />
      <Info
        lable={t(APP_LANGUAGE_CONSTANT.BANK_NAME)}
        value={data?.brank_name}
      />
      <Info lable={t(APP_LANGUAGE_CONSTANT.BRANCH)} value={data?.branch} />
      <Info lable={t(APP_LANGUAGE_CONSTANT.IBAN)} value={data?.iban_number} />
      <Info
        lable={t(APP_LANGUAGE_CONSTANT.STATUS)}
        value={pascalCaseText(data?.payment_status)}
        valueStyle={styles.total}
      />
    </View>
  );
}

export default PaymentSummary;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(16)
  },
  label: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.sminy,
    color: Colors.gray20
  },
  total: {
    fontSize: Fonts.size.uprSemi,
    color: Colors.green10
  }
});
