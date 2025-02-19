import { StyleSheet } from 'react-native';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  verticalScale
} from '../../../theme';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    margin: 0
  },
  mainView: {
    height: verticalScale(720),
    backgroundColor: Colors.white,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: horizontalScale(30),
    paddingTop: verticalScale(39)
  },
  orderView: {
    alignItems: 'center',
    marginBottom: verticalScale(30)
  },
  orderTitle: {
    ...ApplicationStyles.normalMontserratFont,
    color: Colors.black,
    fontSize: Fonts.size.semi
  },
  orderDescription: {
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.low,
    fontSize: Fonts.size.semi,
    color: Colors.gray20,
    paddingTop: verticalScale(5)
  },
  rattingView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(20),
    gap: 15
  },
  buttonView: {
    marginTop: verticalScale(50),
    width: horizontalScale(165),
    justifyContent: 'center',
    marginHorizontal: 'auto'
  }
});

export default styles;
