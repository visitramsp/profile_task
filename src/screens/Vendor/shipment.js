/* eslint-disable complexity */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Fonts,
  verticalScale,
  Colors,
  horizontalScale,
  ApplicationStyles
} from '../../theme';
import { CartLocation } from '../../assets/icon';
import { useNavigation } from '@react-navigation/native';

function Shipment({ data, userType, navigationDisabled = false }) {
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          {userType ? 'Shipment Address' : 'Shipment Details'}
        </Text>
        {!navigationDisabled && (
          <TouchableOpacity
            onPress={() => navigate('warehouseScreen', { screen: 'cart' })}
          >
            <Text style={[styles.outlet]}>
              {userType ? 'Change Address' : 'Change Outlet'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.locationContainer}>
        <View style={styles.icon}>
          <CartLocation height={20} width={20} />
        </View>
        <View style={styles.contactContainer}>
          <Text style={styles.address}>
            {userType
              ? data?.addresses.map((item) => {
                  if (item.is_default === 1) {
                    return item.address;
                  }
                })
              : data?.outletObj?.address}
          </Text>
          <Text style={styles.contact}>
            {userType ? `+971 ${data?.phone}` : data?.userObj?.phone}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default Shipment;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    ...ApplicationStyles.rowAlignCenterJustifyBetween,
    paddingVertical: verticalScale(8),
    marginVertical: verticalScale(16)
  },
  headerText: {
    ...ApplicationStyles.mediumMontserratFont,
    fontWeight: Fonts.Weight.seven,
    color: Colors.black70
  },
  outlet: {
    ...ApplicationStyles.smallMontserratFont,
    color: Colors.primary,
    fontSize: Fonts.size.semi
  },
  locationContainer: {
    flexDirection: 'row',
    gap: horizontalScale(8)
  },
  icon: {
    ...ApplicationStyles.centerView,
    padding: verticalScale(8),
    borderRadius: 8,
    backgroundColor: Colors.lightOrange,
    height: 30,
    width: 30
  },
  address: {
    ...ApplicationStyles.smallMontserratFont,
    fontSize: Fonts.size.medium,
    color: Colors.black70
  },
  contact: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.sminy,
    color: Colors.primary
  },
  contactContainer: {
    gap: verticalScale(4)
  }
});
