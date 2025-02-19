import { Dimensions, Platform, StyleSheet } from 'react-native';
import {
  cardRadius,
  Colors,
  Fonts,
  horizontalScale,
  PAGE_SPACING,
  verticalScale
} from '../../../../theme';

const { height } = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flex: 1
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  mapContainer: {
    flex: 1
  },
  headerGradient: {
    borderBottomLeftRadius: cardRadius,
    borderBottomRightRadius: cardRadius,
    paddingTop: verticalScale(10),
    height: height / 6
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  profileImageContainer: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileImage: {
    height: verticalScale(70),
    width: verticalScale(70),
    borderRadius: verticalScale(70) / 2
  },
  userInfoContainer: {
    flex: 2,
    justifyContent: 'center'
  },
  greetingText: {
    fontFamily: Fonts.type.montserrat,
    fontWeight: Fonts.Weight.normal,
    color: Colors.black,
    fontSize: Fonts.size.small
  },
  locationText: {
    fontFamily: Fonts.type.montserrat,
    fontWeight: Fonts.Weight.bold,
    color: Colors.white,
    fontSize: Fonts.size.uprSemi
  },
  notificationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  notificationImage: {
    height: verticalScale(60),
    width: verticalScale(60),
    borderRadius: verticalScale(60) / 2
  },
  buttonGradient: {
    marginTop: verticalScale(10),
    marginBottom: verticalScale(25),
    backgroundColor: Colors.white,
    marginHorizontal: PAGE_SPACING,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: cardRadius
  },
  statusContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: PAGE_SPACING,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: verticalScale(15)
  },
  statusTextContainer: {
    flex: 1
  },
  statusTitle: {
    fontFamily: Fonts.type.montserrat,
    fontWeight: Fonts.Weight.bold,
    color: Colors.white,
    fontSize: Fonts.size.regularLarge
  },
  statusSubtitle: {
    color: Colors.green30,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.montserrat,
    fontWeight: Fonts.Weight.medium
  },
  actionSheetContainer: {
    backgroundColor: Colors.orange30
  },
  actionSheetIndicator: {
    height: verticalScale(5),
    width: verticalScale(60),
    marginTop: verticalScale(10),
    backgroundColor: Colors.white
  },
  actionSheetContent: {
    backgroundColor: Colors.white
  },
  orderHeader: {
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'center',
    backgroundColor: Colors.orange30,
    paddingHorizontal: verticalScale(20),
    paddingVertical: verticalScale(10)
  },
  orderHeader1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  orderIdText: {
    fontFamily: Fonts.type.montserrat,
    fontWeight: Fonts.Weight.medium,
    fontSize: Fonts.size.small,
    color: Colors.black
  },
  orderTimeText: {
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.normal,
    fontSize: Fonts.size.sminy,
    color: Colors.white,
    alignSelf: 'flex-start'
  },
  detailsButton: {
    borderWidth: 1,
    borderColor: Colors.white,
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(7),
    borderRadius: verticalScale(10)
  },
  detailsButtonText: {
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.medium,
    fontSize: Fonts.size.small,
    color: Colors.white,
    top: Platform.OS === 'android' ? verticalScale(1) : 0
  },
  addressContainer: {
    backgroundColor: Colors.white,
    paddingVertical: verticalScale(10),
    marginTop: verticalScale(10),
    paddingHorizontal: verticalScale(20),
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  addressIconColumn: {
    alignItems: 'center'
  },
  addressIcon: {
    height: verticalScale(12),
    width: verticalScale(12),
    marginTop: verticalScale(2.5),
    marginLeft: verticalScale(5)
  },
  verticalLine: {
    width: verticalScale(2),
    height: verticalScale(32),
    backgroundColor: Colors.transparent,
    borderStyle: 'dotted',
    borderLeftWidth: verticalScale(2),
    borderColor: Colors.black,
    marginLeft: verticalScale(5),
    marginVertical: verticalScale(5)
  },
  addressTextColumn: {
    marginLeft: verticalScale(15),
    flex: 1
  },
  addressTitle: {
    fontFamily: Fonts.type.montserratSemiBold,
    fontSize: Fonts.size.small,
    color: Colors.black
  },
  addressText: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.sminy,
    fontWeight: Fonts.Weight.normal,
    color: Colors.gray50
  },
  addressGap: {
    height: verticalScale(20)
  },
  arrivedButton: {
    // backgroundColor: Colors.orange20,
    width: '100%',
    alignSelf: 'center',
    borderRadius: cardRadius,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(18)
  },
  arrivedButtonText: {
    fontFamily: Fonts.type.montserrat,
    fontWeight: Fonts.Weight.semi,
    fontSize: Fonts.size.regular,
    color: Colors.white
  },
  handleIndicatorStyle: {
    backgroundColor: Colors.orange70,
    width: verticalScale(60),
    height: verticalScale(4),
    borderRadius: 3
  }
});
