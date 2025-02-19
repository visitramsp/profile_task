import { StyleSheet } from 'react-native';
import { height, horizontalScale, verticalScale, width } from './Matrics';
import { Colors } from './Colors';
import Fonts from './Fonts';

export const PAGE_SPACING = horizontalScale(29);
export const TAB_HEIGHT = 60;

const ApplicationStyles = StyleSheet.create({
  normalMontserratFont: {
    fontFamily: Fonts.type.montserrat,
    fontSize: Fonts.size.f20,
    fontWeight: Fonts.Weight.full
  },
  mediumMontserratFont: {
    fontFamily: Fonts.type.montserrat,
    fontSize: Fonts.size.semi,
    fontWeight: Fonts.Weight.semi
  },
  smallMontserratFont: {
    fontFamily: Fonts.type.montserrat,
    fontSize: Fonts.size.small,
    fontWeight: Fonts.Weight.medium
  },
  centerLoader: {
    // flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    width: width - 56
    // padding: 0,
    // marginBottom: TAB_HEIGHT
  },
  smallRobotoFont: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.semi,
    fontWeight: Fonts.Weight.medium
  },
  regularRobotoFonts: {
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.low,
    fontSize: Fonts.size.sminy
  },

  pageSpacing: {
    paddingLeft: PAGE_SPACING,
    paddingRight: PAGE_SPACING
  },
  paddingBottom: {
    paddingBottom: verticalScale(130)
  },
  fontRobotoBold: {
    fontFamily: 'Roboto-Bold'
  },
  rowAlignCenterJustifyBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowJustifyBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  centerView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  justifyCenter: {
    justifyContent: 'center'
  },
  flexWrap: {
    flexWrap: 'wrap'
  },
  flex1: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: Colors.secondary
  },
  dNone: {
    display: 'none'
  },
  disabled: {
    opacity: 0.5
  },
  productFieldDisable: {
    opacity: 0.3
  },
  border0: {
    borderWidth: 0
  },
  borderTransparent: {
    borderColor: 'transparent'
  },
  textCenter: {
    textAlign: 'center'
  },
  shadow0: {
    elevation: 0,
    shadowOpacity: 0
  },
  mainView: {
    paddingLeft: PAGE_SPACING - 5,
    paddingRight: PAGE_SPACING - 5,
    paddingTop: verticalScale(18),
    backgroundColor: Colors.white
  },
  overFlowHidden: {
    overflow: 'hidden'
  },
  flexGrow: {
    flexGrow: 1
  },
  flexGrow0: {
    flexGrow: 0
  }
});

export default ApplicationStyles;
