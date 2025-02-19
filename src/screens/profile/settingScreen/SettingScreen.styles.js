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
    height: verticalScale(62),
    marginBottom: verticalScale(5),
    borderWidth: 1,
    borderColor: Colors.gray110,
    borderRadius: 20,
    padding: 12
  },
  title: {
    ...ApplicationStyles.mediumMontserratFont,
    fontSize: Fonts.size.semi,
    color: Colors.black90,
    paddingLeft: horizontalScale(16)
  },
  iconsView: {
    ...ApplicationStyles.centerView,
    height: verticalScale(38),
    width: horizontalScale(38),
    backgroundColor: Colors.orangeOpacity10,
    borderRadius: 18
  }
});

export default styles;
