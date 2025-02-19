import { StyleSheet } from 'react-native';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  verticalScale
} from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    shadowColor: Colors.customOrange,
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 5,
    marginTop: verticalScale(30)
  },
  subContainer: {
    borderRadius: 50,
    marginTop: verticalScale(5)
  },
  keyPointCard: {
    backgroundColor: Colors.white150,
    borderRadius: 20,
    marginTop: verticalScale(20),
    alignItems: 'center',
    marginHorizontal: horizontalScale(30),
    paddingTop: verticalScale(27),
    paddingBottom: verticalScale(16),
    paddingHorizontal: horizontalScale(15)
  },
  accountDesc: {
    ...ApplicationStyles.smallRobotoFont,
    alignContent: 'center',
    textAlign: 'center',
    width: '100%',
    paddingHorizontal: 5,
    color: Colors.white
  },
  gradient: {
    height: verticalScale(45),
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: horizontalScale(138)
  },
  loginText: {
    ...ApplicationStyles.mediumMontserratFont,
    fontSize: Fonts.size.f20,
    color: Colors.white
  },
  loginButton: {
    borderRadius: 15
  },
  btnShadow: {
    backgroundColor: Colors.primary10,
    shadowColor: Colors.customOrange,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 15,
    elevation: 10
  },
  rowTitle: {
    ...ApplicationStyles.mediumMontserratFont,
    color: Colors.black90,
    paddingLeft: horizontalScale(16)
  },
  rowView: {
    borderWidth: 1,
    borderColor: Colors.gray10,
    marginBottom: 10,
    height: verticalScale(60),
    borderRadius: 20,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  leftView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: horizontalScale(4)
  },
  languageText: {
    ...ApplicationStyles.smallMontserratFont,
    fontSize: Fonts.size.s10,
    color: Colors.gray20
  },
  featureView: {
    flex: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  languageView: {
    flexDirection: 'row',
    width: horizontalScale(126),
    height: verticalScale(32),
    backgroundColor: Colors.grayF2F2F2,
    justifyContent: 'space-between',
    borderRadius: 50,
    padding: 2
  },
  selectedButton: {
    flex: 1,
    borderRadius: 50
  },
  actionView: {
    flexDirection: 'row',
    width: '100%',
    gap: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(20)
  },
  iconOuterView: {
    backgroundColor: Colors.orangeOpacity10,
    height: verticalScale(36),
    width: horizontalScale(36),
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconInnerView: {
    backgroundColor: Colors.orange10,
    height: verticalScale(20),
    width: horizontalScale(20),
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  signUpBtn: {
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: 15
  }
});
