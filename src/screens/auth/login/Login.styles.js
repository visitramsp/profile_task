import { StyleSheet } from 'react-native';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  height,
  horizontalScale,
  moderateScale,
  verticalScale
} from '../../../theme';

export const styles = StyleSheet.create({
  topNavigation: {
    height: verticalScale(15),
    width: horizontalScale(23.3),
    marginBottom: verticalScale(20)
  },
  loginSignView: {
    backgroundColor: Colors.grayF2F2F2,
    borderRadius: 47,
    marginBottom: 30,
    flexDirection: 'row'
  },
  loginButton: {
    flex: 1,
    marginLeft: horizontalScale(4),
    marginVertical: verticalScale(3),
    borderRadius: 25
  },
  btnShadow: {
    backgroundColor: Colors.primary10,
    shadowColor: Colors.customOrange,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 10
  },
  gradient: {
    height: verticalScale(40),
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  loginText: {
    ...ApplicationStyles.mediumMontserratFont,
    fontWeight: Fonts.Weight.medium,
    color: Colors.white
  },
  signUpButton: {
    flex: 1,
    borderRadius: 25,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputViewEmail: {
    borderWidth: 1,
    borderColor: Colors.custonLightGray,
    borderRadius: verticalScale(20),
    overflow: 'hidden'
  },
  checkboxContainer: {
    marginTop: verticalScale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: moderateScale(20),
    paddingHorizontal: horizontalScale(18),
    height: verticalScale(66),
    marginTop: verticalScale(10),
    borderWidth: 1,
    borderColor: Colors.custonLightGray
  },
  hiddenPass: {
    height: verticalScale(24),
    width: horizontalScale(24)
  },
  socialText: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.medium,
    fontWeight: Fonts.Weight.low,
    color: Colors.white70,
    alignItems: 'center',
    textAlign: 'center',
    paddingLeft: horizontalScale(20)
  },
  button: {
    backgroundColor: Colors.primary,
    padding: moderateScale(12),
    paddingHorizontal: horizontalScale(40),
    borderRadius: moderateScale(10),
    alignItems: 'center'
  },
  innerMainContainer: {
    backgroundColor: Colors.secondary,
    ...ApplicationStyles.pageSpacing,
    flex: 1,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    shadowColor: Colors.customOrange,
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 5,
    marginTop: verticalScale(25)
  },
  welcomeView: {
    marginBottom: verticalScale(10),
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoImage: {
    height: verticalScale(97),
    width: horizontalScale(165),
    resizeMode: 'contain'
  },
  formView: {
    marginTop: verticalScale(40)
  },
  toggleOuterView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  toggleView: {
    borderWidth: 0,
    borderColor: 'transparent'
  },
  forgetPassView: {
    justifyContent: 'center',
    marginBottom: 20
  },
  forgetPassText: {
    ...ApplicationStyles.mediumMontserratFont,
    color: Colors.black10,
    textAlign: 'center'
  },
  buttonView: {
    marginVertical: verticalScale(24),
    marginBottom: verticalScale(32)
  },
  dashView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  dash: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.custonLightGray
  },
  orText: {
    width: horizontalScale(90),
    textAlign: 'center',
    fontFamily: Fonts.type.robotoRegular,
    color: Colors.white80,
    fontSize: Fonts.size.sminy
  },
  socialLoginView: {
    marginTop: verticalScale(32),
    alignItems: 'center'
  },
  socialBtn: {
    backgroundColor: Colors.white,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(45),
    width: horizontalScale(250),
    paddingHorizontal: horizontalScale(35),
    borderRadius: moderateScale(43),
    borderWidth: 1,
    borderColor: Colors.custonLightGray
  },
  socialApple: {
    backgroundColor: Colors.inputTextColor,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(45),
    width: horizontalScale(250),
    paddingHorizontal: horizontalScale(20),
    borderRadius: moderateScale(43),
    borderWidth: 1,
    borderColor: Colors.custonLightGray
  },
  signupView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(24),
    justifyContent: 'center'
  },
  signupBTN: {
    marginLeft: verticalScale(16)
  },
  logoTitle: {
    ...ApplicationStyles.normalMontserratFont,
    fontSize: Fonts.size.f22,
    color: Colors.secondary,
    paddingTop: verticalScale(5),
    textAlign: 'center'
  },
  signUpTitle: {
    ...ApplicationStyles.normalMontserratFont,
    fontWeight: Fonts.Weight.semi,
    color: Colors.blue30
  },
  signUpDesc: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.semi,
    fontWeight: Fonts.Weight.low,
    color: Colors.white110,
    paddingTop: verticalScale(10)
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  heading: {
    ...ApplicationStyles.normalMontserratFont,
    fontWeight: Fonts.Weight.semi,
    color: Colors.white80
  },
  content: {
    marginTop: 5,
    color: Colors.blue10,
    fontFamily: Fonts.type.poppinsRegular,
    fontSize: 15
  },
  mainContainer: {
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(15),
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.white80,
    paddingLeft: horizontalScale(30),
    borderRadius: 20
  },
  userCardContainer: {
    marginBottom: verticalScale(8),
    borderRadius: 20
  },
  dot: {
    fontSize: 4,
    color: Colors.white70
  },
  reqDocTxt: {
    fontSize: Fonts.size.semi,
    lineHeight: 20,
    color: Colors.white70,
    fontWeight: Fonts.Weight.medium
  }
});
