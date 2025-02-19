import { StyleSheet } from 'react-native';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  verticalScale
} from '../../../theme';

const styles = StyleSheet.create({
  businessText: {
    ...ApplicationStyles.normalMontserratFont,
    color: Colors.black50,
    fontSize: Fonts.size.semi
  },
  mainView: {
    height: verticalScale(56),
    marginTop: verticalScale(20)
  },
  title: {
    fontFamily: Fonts.type.robotoMedium,
    fontWeight: Fonts.Weight.medium,
    fontSize: Fonts.size.medium,
    color: Colors.gray20
  },
  desc: {
    ...ApplicationStyles.mediumMontserratFont,
    fontSize: Fonts.size.small,
    color: Colors.black70,
    paddingTop: verticalScale(4),
    paddingBottom: verticalScale(12)
  }
});

export default styles;
