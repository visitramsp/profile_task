import { StyleSheet } from 'react-native';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  verticalScale
} from '../../../theme';

const styles = StyleSheet.create({
  cartView: {
    height: verticalScale(90),
    marginTop: verticalScale(10),
    flexDirection: 'row'
  },
  imageView: {
    height: verticalScale(90),
    width: horizontalScale(90),
    borderRadius: 20
  },
  img: {
    width: horizontalScale(90),
    height: verticalScale(90),
    borderRadius: 20
  },
  contentView: {
    paddingLeft: horizontalScale(8),
    marginTop: verticalScale(6)
  },
  brandText: {
    ...ApplicationStyles.normalMontserratFont,
    fontSize: Fonts.size.sminy,
    color: Colors.white120
  },
  productText: {
    fontFamily: Fonts.type.robotoMedium,
    fontWeight: Fonts.Weight.medium,
    fontSize: Fonts.size.semi,
    color: Colors.black70
    // marginTop: verticalScale(5)
  },
  variantView: {
    flexDirection: 'row',
    gap: 5
    // marginTop: verticalScale(5)
  },
  colorText: {
    fontFamily: Fonts.type.robotoMedium,
    fontWeight: Fonts.Weight.medium,
    fontSize: Fonts.size.s10,
    color: Colors.gray20
  },
  priceText: {
    ...ApplicationStyles.normalMontserratFont,
    fontSize: Fonts.size.f20,
    color: Colors.orange10
  },
  priceView: {
    ...ApplicationStyles.rowAlignCenter
  },
  unitText: {
    marginLeft: verticalScale(5)
  },
  outletView: {
    marginVertical: verticalScale(30)
  },
  outletListView: {
    ...ApplicationStyles.rowAlignCenterJustifyBetween,
    backgroundColor: Colors.yellow30,
    paddingLeft: horizontalScale(15),
    marginTop: verticalScale(10),
    borderRadius: 20,
    padding: 11,
    width: horizontalScale(315)
  },
  leftView: {
    ...ApplicationStyles.rowAlignCenter,
    flex: 1
  },
  addressText: {
    color: Colors.orange30,
    fontFamily: Fonts.type.robotoMedium,
    fontWeight: Fonts.Weight.medium,
    fontSize: Fonts.size.semi,
    marginLeft: horizontalScale(15),
    width: horizontalScale(220)
  },
  inputView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(20)
  },
  aedText: {
    fontFamily: Fonts.type.robotoBold,
    fontWeight: Fonts.Weight.seven,
    fontSize: Fonts.size.f20,
    color: Colors.gray10
  },
  buttonView: {
    marginVertical: verticalScale(68)
  },
  marginVer: { marginTop: verticalScale(8) }
});

export default styles;
