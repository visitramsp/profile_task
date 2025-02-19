import { StyleSheet } from 'react-native';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  height,
  horizontalScale,
  verticalScale
} from '../../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    height: '100%',
    paddingTop: horizontalScale(59),
    paddingHorizontal: verticalScale(18)
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  backImage: {
    height: 27,
    width: 35
  },
  heading: {
    color: Colors.black,
    textAlign: 'center',
    margin: 'auto',
    fontFamily: Fonts.type.poppinsSemiBold,
    fontWeight: Fonts.Weight.seven,
    fontSize: 19
  },
  mainProfileView: {
    paddingTop: verticalScale(34),
    ...ApplicationStyles.rowAlignCenter,
    gap: 15
  },
  profileView: {
    height: 49,
    width: 49,
    borderWidth: 2,
    borderColor: Colors.orange20,
    borderRadius: 48.5,
    backgroundColor: Colors.orange10
  },
  nameText: {
    color: Colors.black,
    fontFamily: Fonts.type.poppinsBold,
    fontWeight: Fonts.Weight.seven,
    fontSize: 18
  },
  emailText: {
    color: Colors.gray,
    fontFamily: Fonts.type.poppinsMedium,
    fontWeight: Fonts.Weight.medium,
    fontSize: 14
  },
  accountMainView: {
    paddingTop: verticalScale(50),
    gap: 26
  },
  rowView: {
    ...ApplicationStyles.rowAlignCenter,
    gap: 13
  },
  rowText: {
    color: Colors.gray20,
    fontFamily: Fonts.type.poppinsMedium,
    fontWeight: Fonts.Weight.medium,
    fontSize: 14
  },
  horizontalLine: {
    borderWidth: 1,
    borderColor: Colors.gray10
  },
  helpText: {
    color: Colors.gray20,
    fontFamily: Fonts.type.poppinsSemiBold,
    fontWeight: Fonts.Weight.semi,
    fontSize: 14
  },
  btnView: {
    ...ApplicationStyles.centerLoader,
    marginTop: verticalScale(35),
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 4,
    borderColor: Colors.black,
    marginHorizontal: horizontalScale(18),
    borderRadius: 22.5,
    height: 45
  },
  btnText: {
    color: Colors.gray,
    fontFamily: Fonts.type.poppinsSemiBold,
    fontWeight: Fonts.Weight.semi,
    fontSize: 14,
    textAlign: 'center'
    // paddingVertical: verticalScale(11)
  }
});

export default styles;
