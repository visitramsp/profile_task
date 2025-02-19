import { Platform, StyleSheet } from 'react-native';
import { Colors, Fonts, verticalScale } from '../../../../theme';

export default StyleSheet.create({
  tabButton: {
    marginRight: verticalScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: verticalScale(10),
    paddingHorizontal: verticalScale(15),
    paddingVertical: verticalScale(8)
  },
  tabButtonText: {
    fontWeight: Fonts.Weight.medium,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.small
  },
  deliveryCard: {
    backgroundColor: Colors.white,
    paddingVertical: verticalScale(15),
    borderRadius: verticalScale(10),
    marginBottom: verticalScale(5)
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  orderId: {
    fontWeight: Fonts.Weight.medium,
    fontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.semi,
    color: Colors.black
  },
  orderDate: {
    fontWeight: Fonts.Weight.medium,
    fontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.sminy,
    color: Colors.white120,
    paddingTop: verticalScale(3)
  },
  statusBox: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: 80,
    alignSelf: 'center',
    alignItems: 'center'
  },
  statusText: {
    fontWeight: Fonts.Weight.low,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.sminy,
    color: Colors.white
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(8)
  },
  distanceText: {
    fontWeight: Fonts.Weight.medium,
    fontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.small,
    color: Colors.orange10
  },
  elapsedText: {
    fontWeight: Fonts.Weight.medium,
    fontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.small,
    color: Colors.black
  },
  pickLineView: {
    flex: 0.03,
    marginTop: Platform.OS === 'android' ? verticalScale(5) : verticalScale(2.5)
  },
  addressContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(10)
  },
  addressHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  pickupLabel: {
    fontWeight: Fonts.Weight.semi,
    fontFamily: Fonts.type.montserrat,
    fontSize: Fonts.size.semi,
    color: Colors.black,
    marginLeft: verticalScale(12),
    marginBottom: verticalScale(3)
  },
  pickupDate: {
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.low,
    color: Colors.gray10,
    fontSize: Fonts.size.sminy
  },
  pickupAddress: {
    fontWeight: Fonts.Weight.medium,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.sminy,
    color: Colors.white120,
    marginLeft: verticalScale(12)
  },
  dropLabel: {
    fontWeight: Fonts.Weight.semi,
    fontFamily: Fonts.type.montserrat,
    fontSize: Fonts.size.semi,
    color: Colors.black,
    marginBottom: verticalScale(3),
    marginTop: verticalScale(15),
    marginLeft: verticalScale(12)
  },
  dropAddress: {
    fontWeight: Fonts.Weight.medium,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.sminy,
    color: Colors.white120,
    marginLeft: verticalScale(12)
  },
  deliveryHistory: {
    fontFamily: Fonts.type.montserrat,
    fontSize: Fonts.size.semi,
    fontWeight: Fonts.Weight.seven,
    marginTop: verticalScale(20),
    color: Colors.black
  },
  tabList: {
    marginTop: verticalScale(15)
  },
  deliveryList: {
    marginTop: verticalScale(10)
  },
  footerSpace: {
    paddingBottom: verticalScale(100)
  },
  itemSeparator: {
    borderWidth: verticalScale(2),
    borderColor: Colors.buttonGray
  }
});
