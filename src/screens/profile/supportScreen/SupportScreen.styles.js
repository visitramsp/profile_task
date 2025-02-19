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
    ...ApplicationStyles.rowAlignCenter,
    height: verticalScale(85),
    marginBottom: verticalScale(5),
    borderWidth: 1,
    borderColor: Colors.gray110,
    borderRadius: 20,
    paddingLeft: 20
  },
  centerView: {
    paddingLeft: horizontalScale(18),
    width: horizontalScale(210)
  },
  title: {
    ...ApplicationStyles.mediumMontserratFont,
    fontSize: Fonts.size.semi,
    color: Colors.black90
  },
  iconsView: {
    ...ApplicationStyles.centerView,
    height: verticalScale(48),
    width: horizontalScale(48),
    backgroundColor: Colors.orangeOpacity10,
    borderRadius: 24
  },
  titleDesc: {
    fontFamily: Fonts.type.robotoMedium,
    fontWeight: Fonts.Weight.medium,
    fontSize: Fonts.size.sminy,
    color: Colors.gray10
  },
  greaterView: {
    height: verticalScale(20),
    width: horizontalScale(20),
    paddingRight: 20
  }
});

export default styles;
