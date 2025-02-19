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
    marginHorizontal: horizontalScale(30)
  },
  historyText: {
    ...ApplicationStyles.normalMontserratFont,
    fontSize: Fonts.size.semi,
    color: Colors.black50,
    marginTop: verticalScale(21),
    marginBottom: verticalScale(10),
    marginLeft: horizontalScale(10)
  },
  listView: {
    marginTop: verticalScale(17),
    marginBottom: verticalScale(20)
  },
  filterView: {
    marginTop: verticalScale(10)
  }
});
export default styles;
