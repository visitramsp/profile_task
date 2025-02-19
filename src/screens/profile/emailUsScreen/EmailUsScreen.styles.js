import { Platform, StyleSheet } from 'react-native';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  height,
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
  dropDownStyle: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.f20
  },
  inputView: {
    marginTop: verticalScale(20)
  },
  selectAccount: {
    borderRadius: 20,
    height: Platform.OS === 'ios' ? height / 15 : height / 12.5
  },
  verifiedText: { color: Colors.green10 },
  buttonView: {
    marginVertical: verticalScale(50),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnView: {
    flex: 1
  },
  multiLineInput: { height: verticalScale(0) }
});

export default styles;
