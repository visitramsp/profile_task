import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ItemCountText from '../../components/headers/ItemCountText';
import { Fonts, Colors, verticalScale, ApplicationStyles } from '../../theme';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { APP_LANGUAGE_CONSTANT } from '../../constants';

const Info = ({ lable, value, lableStyle, valueStyle }) => {
  return (
    <View style={styles.infoContainer}>
      <Text style={[styles.label, lableStyle]}>{lable}</Text>
      <Text style={[styles.label, valueStyle]}>{value}</Text>
    </View>
  );
};

function Summary({
  data,
  totalPrice,
  vatCharge = 0,
  discount = 0,
  userType,
  showOnlyTotal = false
}) {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      {!showOnlyTotal && (
        <ItemCountText title="Order Summary" isnumberPresent={false} />
      )}
      <Text style={styles.header}>Order Details</Text>
      <Info
        lable={'Order Date'}
        value={moment(data?.created_at).format('DD MMMM yyyy')}
      />
      {!showOnlyTotal && (
        <>
          {!userType && (
            <Info lable={'Order ID'} value={'SI81125730019800907'} />
          )}
          <Info
            lable={'Subtotal (5)'}
            value={`${t(APP_LANGUAGE_CONSTANT.AED)} ${totalPrice}`}
          />

          {/* sub_total */}
          <Info
            lable={'VAT & Fees (5%)'}
            value={`${t(APP_LANGUAGE_CONSTANT.AED)} ${vatCharge}`}
            valueStyle={styles.valueStyle}
          />
          <Info
            lable={'Discount'}
            value={`${t(APP_LANGUAGE_CONSTANT.AED)} -${discount}`}
            valueStyle={styles.valueStyle}
          />
        </>
      )}
      <View style={styles.divider} />
      <Info
        lable={'Total'}
        value={`${t(APP_LANGUAGE_CONSTANT.AED)} ${
          totalPrice + vatCharge - discount
        }`}
        lableStyle={styles.total}
        valueStyle={styles.totalValue}
      />
    </View>
  );
}

export default Summary;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.uprSemi,
    color: Colors.black70,
    marginVertical: verticalScale(16)
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: verticalScale(8)
  },
  label: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.sminy,
    color: Colors.gray20
  },
  divider: {
    height: 1,
    backgroundColor: Colors.gray30,
    width: '100%'
  },
  valueStyle: {
    color: Colors.red
  },
  total: {
    ...ApplicationStyles.smallRobotoFont,
    fontSize: Fonts.size.uprSemi,
    color: Colors.black70
  },
  totalValue: {
    ...ApplicationStyles.regularRobotoFonts,
    fontSize: Fonts.size.uprSemi,
    color: Colors.black70
  }
});
