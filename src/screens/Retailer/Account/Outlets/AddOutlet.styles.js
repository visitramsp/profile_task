import { Dimensions, StyleSheet } from 'react-native';
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
  mapContainer: {
    height: height,
    justifyContent: 'center'
  },
  placesInputContainer: {
    left: 0,
    right: 0,
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderRadius: verticalScale(18),
    paddingHorizontal: horizontalScale(10)
  },
  placesInput: {
    fontFamily: Fonts.type.poppinsRegular,
    fontSize: Fonts.size.semi,
    fontWeight: Fonts.Weight.semi,
    textAlignVertical: 'center',
    height: '100%',
    borderRadius: verticalScale(18),
    color: Colors.gray50,
    paddingLeft: horizontalScale(12)
  },
  staticLocationIcon: {
    height: verticalScale(35),
    width: verticalScale(35),
    position: 'absolute',
    tintColor: Colors.red,
    alignSelf: 'center',
    top: '47%'
  },
  googlePlacesView: {
    position: 'absolute',
    top: verticalScale(30),
    left: 10,
    right: 10,
    zIndex: 1, // Ensure the search bar appears on top of the map
    backgroundColor: Colors.white,
    borderRadius: verticalScale(20),
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    marginHorizontal: horizontalScale(15)
  },
  outletName: {
    marginHorizontal: PAGE_SPACING,
    marginTop: verticalScale(5)
  },
  outletAddress: {
    marginHorizontal: PAGE_SPACING,
    marginTop: verticalScale(10)
  },
  pobox: {
    marginHorizontal: PAGE_SPACING,
    marginTop: verticalScale(10)
  },
  gradient: {
    marginTop: verticalScale(20),
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
  gradientBtn: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: cardRadius,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(18)
  },
  addOutletBtn: {
    fontFamily: Fonts.type.montserrat,
    fontWeight: Fonts.Weight.semi,
    fontSize: Fonts.size.regular,
    color: Colors.white
  },
  sheetView: {
    flex: 1
  },
  sheetIndicator: {
    backgroundColor: Colors.white
  },
  sheetBg: {
    borderRadius: verticalScale(30)
  },
  loaderView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: height * 0.2
  }
});
