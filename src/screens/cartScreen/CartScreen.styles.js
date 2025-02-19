import { StyleSheet } from 'react-native';
import { height, horizontalScale, verticalScale } from '../../theme';

const styles = StyleSheet.create({
  mainView: { marginBottom: verticalScale(100) },
  productDetailsView: { marginHorizontal: horizontalScale(30) },
  btnView: {
    paddingHorizontal: horizontalScale(30),
    marginTop: verticalScale(30)
  },
  centerLoader: {
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 0,
    height: height / 1.35
  }
});
export default styles;
