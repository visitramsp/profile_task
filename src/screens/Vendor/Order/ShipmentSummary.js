import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Fonts, Colors, verticalScale, horizontalScale } from '../../../theme';
import { TruckIcon } from '../../../assets/icon';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { APP_LANGUAGE_CONSTANT } from '../../../constants';

const positions = [
  {
    source: 'Pickup Point',
    destination: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
    time: '10th January 2024 | 17:45'
  },
  {
    source: 'Delivery Point -1',
    destination: 'Tracking details has been shared with you.',
    time: '10th January 2024 | 17:45'
  },
  {
    source: 'Delivery Point -2',
    destination: 'Your order will be on your door step shortly.',
    time: '10th January 2024 | 17:45'
  }
];

function ShipmentSummary(props) {
  const { t } = useTranslation();
  const { data } = props;

  return (
    <View style={styles.conatiner}>
      <View style={styles.shipmentContainer}>
        <View style={styles.iconContainer}>
          <View style={styles.icon}>
            <TruckIcon height={20} width={20} />
          </View>
          {positions.length - 1 > 0 && <View style={styles.line} />}
        </View>
        <View style={styles.info}>
          <Text style={styles.title}>
            {t(APP_LANGUAGE_CONSTANT.PICKUP_POINT)}
          </Text>
          <Text style={styles.address}>{data?.warehouse_address}</Text>
          <Text style={styles.time}>
            {moment(data?.created_at).format('Do MMMM YYYY hh:mm A')}
          </Text>
        </View>
      </View>
      <View style={styles.shipmentContainer}>
        <View style={styles.iconContainer}>
          <View style={styles.icon}>
            <TruckIcon height={20} width={20} />
          </View>
          {/* {positions.length - 1 > 1 && <View style={styles.line} />} */}
        </View>
        <View style={styles.info}>
          <Text style={styles.title}>
            {t(APP_LANGUAGE_CONSTANT.DELIVERY_POINT)}
          </Text>
          <Text style={styles.address}>{data?.outlet_address}</Text>
          <Text style={styles.time}>
            {moment(data?.delivery_date).format('Do MMMM YYYY hh:mm A')}
          </Text>
        </View>
      </View>
      {/* {positions.map((pos, index) => (
        <View style={styles.shipmentContainer}>
          <View style={styles.iconContainer}>
            <View style={styles.icon}>
              <TruckIcon height={20} width={20} />
            </View>
            {positions.length - 1 > index && <View style={styles.line} />}
          </View>
          <View style={styles.info}>
            <Text style={styles.title}>{pos.source}</Text>
            <Text style={styles.address}>{pos.destination}</Text>
            <Text style={styles.time}>{pos.time}</Text>
          </View>
        </View>
      ))} */}
    </View>
  );
}

export default ShipmentSummary;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1
  },
  shipmentContainer: {
    flexDirection: 'row',
    marginVertical: verticalScale(2),
    gap: horizontalScale(8)
  },
  iconContainer: {
    gap: verticalScale(4),
    alignSelf: 'flex-start',
    alignItems: 'center'
  },
  icon: {
    height: 30,
    width: 30,
    borderRadius: 8,
    backgroundColor: Colors.lightOrange2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  line: {
    height: verticalScale(40),
    width: 2,
    backgroundColor: Colors.primary
  },
  info: {
    paddingVertical: verticalScale(4),
    gap: verticalScale(4)
  },
  title: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.small,
    color: Colors.primary
  },
  address: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.sminy,
    color: Colors.gray20
  },
  time: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.sminy,
    color: Colors.gray20
  }
});
