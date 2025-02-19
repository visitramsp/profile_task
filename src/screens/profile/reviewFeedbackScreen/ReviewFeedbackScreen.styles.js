import { StyleSheet } from 'react-native';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  verticalScale
} from '../../../theme';

const styles = StyleSheet.create({
  mainView: {
    marginBottom: verticalScale(5),
    borderWidth: 1,
    borderColor: Colors.gray110,
    borderRadius: 20,
    padding: 12
  },
  orderText: {
    ...ApplicationStyles.mediumMontserratFont,
    color: Colors.darkBlue
  },
  orderIdText: {
    color: Colors.orange10
  },
  productView: {
    ...ApplicationStyles.rowAlignCenterJustifyBetween
  },
  productName: {
    ...ApplicationStyles.smallRobotoFont,
    color: Colors.black70
  },
  priceText: {
    ...ApplicationStyles.normalMontserratFont,
    fontWeight: Fonts.Weight.seven,
    color: Colors.orange10,
    fontSize: Fonts.size.uprSemi
  },
  qty: {
    ...ApplicationStyles.smallRobotoFont,
    color: Colors.gray20
  },
  ratingText: {
    ...ApplicationStyles.normalMontserratFont,
    color: Colors.black,
    fontWeight: Fonts.Weight.seven,
    marginVertical: 3
  },
  retailerText: {
    ...ApplicationStyles.mediumMontserratFont,
    fontWeight: Fonts.Weight.semi,
    color: Colors.gray100
  },
  rattingView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  reqRateText: {
    ...ApplicationStyles.normalMontserratFont,
    fontWeight: Fonts.Weight.bold,
    fontSize: Fonts.size.uprSemi,
    color: Colors.red10,
    textAlign: 'center',
    paddingTop: verticalScale(15)
  }
});

export default styles;
