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
    paddingHorizontal: verticalScale(18),
    paddingBottom: 150
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
    height: 70.75,
    width: 70.75,
    borderWidth: 2,
    borderColor: Colors.orange20,
    borderRadius: 70.75,
    backgroundColor: Colors.orange10,
    margin: 'auto'
  },
  horizontalLine: {
    borderWidth: 1,
    borderColor: Colors.gray10,
    marginVertical: verticalScale(21)
  },
  label: {
    color: Colors.gray20,
    fontSize: 14,
    fontFamily: Fonts.type.poppinsSemiBold,
    fontWeight: Fonts.Weight.semi
  },
  outputText: {
    color: Colors.black,
    fontSize: 12,
    fontFamily: Fonts.type.poppinsSemiBold,
    fontWeight: Fonts.Weight.semi,
    marginTop: 2
  },

  fieldView: {
    ...ApplicationStyles.rowAlignCenterJustifyBetween
  },
  editBtn: {
    borderWidth: 1,
    borderColor: Colors.black,
    paddingVertical: verticalScale(6),
    paddingHorizontal: horizontalScale(10),
    borderRadius: 20
  },
  editText: {
    color: Colors.black,
    fontFamily: Fonts.type.poppinsBold,
    fontWeight: Fonts.Weight.seven,
    fontSize: 12
  },

  desc: {
    color: Colors.gray10,
    fontFamily: Fonts.type.poppinsRegular,
    fontWeight: Fonts.Weight.low,
    fontSize: 10
  },
  btnView: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black,
    marginTop: verticalScale(9),
    marginHorizontal: horizontalScale(18),
    borderRadius: 22,
    height: 32,
    width: 99
  },
  btnText: {
    color: Colors.white,
    fontFamily: Fonts.type.poppinsBlack,
    fontWeight: Fonts.Weight.full,
    fontSize: 12,
    textAlign: 'center'
    // paddingVertical: verticalScale(11)
  },
  inputFieldView: {
    ...ApplicationStyles.rowAlignCenter,
    gap: 5
  },

  profileImage: {
    flex: 1,
    borderRadius: 70.75
  },
  input: {
    height: 30,
    width: 200,
    borderWidth: 1,
    borderColor: Colors.orange30,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 0,
    fontSize: 12,
    backgroundColor: '#fff',
    color: Colors.black
  },
  errorText: {
    color: Colors.red,
    fontFamily: Fonts.type.poppinsSemiBold,
    fontWeight: Fonts.Weight.semi,
    fontSize: 12,
    marginTop: 2
  }
});

export default styles;
