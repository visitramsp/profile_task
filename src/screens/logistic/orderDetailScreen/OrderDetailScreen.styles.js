import { StyleSheet } from 'react-native';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  verticalScale
} from '../../../theme';

const styles = StyleSheet.create({
  mainView: {
    ...ApplicationStyles.rowAlignCenterJustifyBetween
  },
  titleText: {
    ...ApplicationStyles.smallRobotoFont,
    fontSize: Fonts.size.small,
    color: Colors.gray20,
    marginTop: verticalScale(10)
  },
  OrderTxt: {
    color: Colors.orange10,
    fontSize: Fonts.size.uprSemi,
    marginTop: 0
  },
  statusView: {
    height: verticalScale(25),
    backgroundColor: Colors.yellow20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(12),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.yellowBorder
  },
  statusTxt: {
    ...ApplicationStyles.regularRobotoFonts,
    color: Colors.white
  },
  productTxt: {
    marginTop: verticalScale(30),
    marginBottom: verticalScale(10),
    ...ApplicationStyles.normalMontserratFont,
    fontSize: Fonts.size.medium,
    color: Colors.black50
  },
  totalText: {
    color: Colors.orange10
  },
  imgView: {
    backgroundColor: Colors.customOrange,
    height: verticalScale(70),
    width: horizontalScale(70),
    borderRadius: 10
  },
  imgSelf: {
    height: verticalScale(70),
    width: horizontalScale(70),
    borderRadius: 10
  },
  productView: {
    marginTop: verticalScale(10),
    flexDirection: 'row'
  },
  productDetailView: {
    marginLeft: horizontalScale(10)
  },
  nameTxt: {
    ...ApplicationStyles.smallRobotoFont,
    fontSize: Fonts.size.semi,
    color: Colors.black70,
    marginTop: verticalScale(2)
  },
  packageTxt: {
    ...ApplicationStyles.smallRobotoFont,
    fontSize: Fonts.size.small,
    color: Colors.gray20,
    lineHeight: 22
  },
  buttonView: {
    marginVertical: verticalScale(30)
  }
});

export default styles;
