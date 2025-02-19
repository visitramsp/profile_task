import { StyleSheet } from 'react-native';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  height,
  horizontalScale,
  verticalScale
} from '../../../theme';

const styles = StyleSheet.create({
  loaderView: {
    height: height - 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainView: { marginBottom: verticalScale(50) },
  title: {
    ...ApplicationStyles.smallRobotoFont,
    fontWeight: Fonts.Weight.low,
    color: Colors.black110,
    textAlign: 'justify',
    fontSize: Fonts.size.small,
    lineHeight: 19
  },
  heading: {
    marginTop: verticalScale(15),
    marginBottom: verticalScale(5),
    fontFamily: Fonts.type.poppinsSemiBold,
    fontWeight: Fonts.Weight.semi,
    color: Colors.primary,
    fontSize: Fonts.size.uprSemi,
    textAlign: 'center'
  },
  desc: {
    fontFamily: Fonts.type.poppinsRegular,
    fontWeight: Fonts.Weight.low,
    fontSize: Fonts.size.s10,
    color: Colors.blue20
  },
  defineView: {
    flexDirection: 'row',
    marginTop: verticalScale(5)
  },
  dots: {
    height: 3,
    width: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.black10,
    marginTop: 7
  },

  subHeading: {
    fontFamily: Fonts.type.poppinsRegular,
    fontWeight: Fonts.Weight.low,
    fontSize: Fonts.size.s10,
    color: Colors.black10,
    marginLeft: horizontalScale(10),
    textAlign: 'justify'
  }
});
export default styles;
