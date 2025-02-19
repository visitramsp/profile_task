import { StyleSheet } from 'react-native';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  verticalScale
} from '../../../theme';

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: Colors.white
  },
  countryInputContainer: {
    ...ApplicationStyles.rowAlignCenter,
    alignItems: 'flex-start',
    height: 60,
    flex: 1
  },
  country: {
    ...ApplicationStyles.rowAlignCenter,
    borderWidth: 1,
    borderColor: Colors.custonLightGray,
    borderRadius: verticalScale(20),
    overflow: 'hidden',
    paddingHorizontal: horizontalScale(10),
    height: 57
  },
  countryText: {
    paddingLeft: horizontalScale(10),
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.h20,
    color: Colors.black80
  },
  countryTextInputView: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.custonLightGray,
    borderRadius: verticalScale(20),
    paddingHorizontal: horizontalScale(15),
    height: 57,
    marginLeft: horizontalScale(10),
    flexDirection: 'row',
    alignItems: 'center'
  },
  countryTextInput: {
    ...ApplicationStyles.flex1,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.h20,
    color: Colors.black80,
    height: 57
  },
  mainViewFirst: {
    marginTop: verticalScale(15)
    // flexDirection: 'row',
    // alignItems: 'center'
  },
  inputView: {
    marginTop: verticalScale(10)
    // backgroundColor: 'green'
  },
  test: { marginTop: verticalScale(15) },
  phoneNumberView: {
    flex: 1,
    marginLeft: horizontalScale(10)
  },
  countryCodePhone: {
    borderWidth: 1,
    borderColor: Colors.custonLightGray,
    height: 57,
    paddingHorizontal: horizontalScale(15),
    borderRadius: verticalScale(20),
    backgroundColor: Colors.white,
    justifyContent: 'center'
  },
  button: {
    marginTop: verticalScale(40),
    marginBottom: 20
  },
  countryNameTitle: {
    color: Colors.white130,
    fontSize: Fonts.size.sminy,
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.low
  },
  countryNameDesc: {
    color: Colors.white130,
    fontSize: Fonts.size.h20,
    fontFamily: Fonts.type.robotoBold,
    fontWeight: Fonts.Weight.seven,
    paddingTop: verticalScale(2)
  },
  documentContainer: {
    borderWidth: 1,
    borderColor: Colors.primary40,
    borderStyle: 'dashed',
    marginTop: verticalScale(10),
    height: verticalScale(90),
    borderRadius: 20
  },
  documentTitle: {
    paddingTop: verticalScale(10),
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.semi,
    fontWeight: Fonts.Weight.low,
    color: Colors.blue30
  },
  documentCaution: {
    paddingTop: verticalScale(10),
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.small,
    fontWeight: Fonts.Weight.low,
    color: Colors.grey
  },
  termsView: {
    marginTop: verticalScale(20),
    flexDirection: 'row',
    alignItems: 'center'
  },
  termsText: {
    color: Colors.blueLight,
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.low,
    fontSize: Fonts.size.ten,
    textDecorationLine: 'underline',
    marginTop: verticalScale(15)
  },
  aqadText: {
    color: Colors.black5,
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.low,
    fontSize: Fonts.size.ten,
    paddingLeft: horizontalScale(6),
    marginTop: verticalScale(15)
  },
  whatsappView: {
    marginBottom: verticalScale(10),
    flexDirection: 'row',
    alignItems: 'center'
  },
  whatsappText: {
    color: Colors.black110,
    paddingLeft: horizontalScale(8),
    ...ApplicationStyles.smallRobotoFont
  },
  whatsappCheck: { position: 'relative', bottom: 6.5 }
});

export default styles;
