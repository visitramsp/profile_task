import { StyleSheet } from 'react-native';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  verticalScale
} from '../../../theme';

const styles = StyleSheet.create({
  title: {
    ...ApplicationStyles.mediumMontserratFont,
    fontSize: Fonts.size.f20,
    color: Colors.blue30
  },
  desc: {
    marginTop: verticalScale(10),
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.low,
    color: Colors.white110,
    fontSize: Fonts.size.semi
  },
  inputView: {
    marginTop: verticalScale(20)
  },
  buttonView: {
    marginTop: verticalScale(50)
  },
  verifyView: {
    ...ApplicationStyles.centerView,
    height: verticalScale(20),
    width: horizontalScale(45),
    backgroundColor: Colors.red100,
    borderRadius: 4
  },
  weakText: {
    fontFamily: Fonts.type.robotoMedium,
    fontWeight: Fonts.Weight.medium,
    color: Colors.red10,
    fontSize: Fonts.size.s10
  },
  verifiedView: {
    backgroundColor: Colors.green50,
    width: 55
  },
  verifiedText: { color: Colors.green10 }
});

export default styles;
