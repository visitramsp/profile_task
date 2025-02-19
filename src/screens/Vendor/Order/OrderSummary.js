import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Fonts, Colors, verticalScale } from '../../../theme';
import { useTranslation } from 'react-i18next';
import { APP_LANGUAGE_CONSTANT, AppConstant } from '../../../constants';
import moment from 'moment';

const Info = ({ lable, value, lableStyle, valueStyle }) => {
  return (
    <View style={styles.infoContainer}>
      <Text style={[styles.label, lableStyle]}>{lable}</Text>
      <Text style={[styles.label, valueStyle]}>{value}</Text>
    </View>
  );
};

function OrderSummary(props) {
  const { t } = useTranslation();
  const { data } = props;

  return (
    <View style={styles.conatiner}>
      <View style={styles.infoContainer}>
        <Text style={styles.header}>
          {t(APP_LANGUAGE_CONSTANT.ORDER_DETAILS)}
        </Text>
        <Text style={[styles.status]}>{t(AppConstant.deliver)}</Text>
      </View>
      <Info
        lable={t(APP_LANGUAGE_CONSTANT.ORDER_DATE)}
        value={moment(data?.order_date).format('Do MMMM YYYY')}
      />
      <Info lable={t(APP_LANGUAGE_CONSTANT.ORDER_ID)} value={data?.order_id} />
      <Info
        lable={`${t(APP_LANGUAGE_CONSTANT.SUBTOTAL)}  (${
          data?.product_arr?.length
        })`}
        value={`${t(APP_LANGUAGE_CONSTANT.AED)} ${data?.sub_total}`}
      />
      <Info
        lable={`${t(APP_LANGUAGE_CONSTANT.VAT_AND_FEES)} (5%)`}
        value={`${t(APP_LANGUAGE_CONSTANT.AED)} ${data?.vat_total_price}`}
        valueStyle={styles.valueStyle}
      />
      <View style={styles.divider} />
      <Info
        lable={t(APP_LANGUAGE_CONSTANT.TOTAL)}
        value={`${t(APP_LANGUAGE_CONSTANT.AED)} ${data?.total_amount}`}
        lableStyle={styles.total}
        valueStyle={styles.total}
      />
    </View>
  );
}

export default OrderSummary;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1
  },
  header: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.uprSemi,
    color: Colors.black70
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
  divider: {
    height: 1,
    backgroundColor: Colors.gray20,
    width: '100%',
    marginBottom: verticalScale(16)
  },
  valueStyle: {
    color: Colors.red
  },
  total: {
    fontSize: Fonts.size.uprSemi,
    color: Colors.black70
  },
  status: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.uprSemi,
    color: Colors.green10
  }
});
