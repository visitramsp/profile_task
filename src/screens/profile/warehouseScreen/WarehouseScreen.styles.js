import { StyleSheet } from 'react-native';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  verticalScale
} from '../../../theme';

const styles = StyleSheet.create({
  profileText: {
    ...ApplicationStyles.normalMontserratFont,
    color: Colors.black50,
    fontSize: Fonts.size.semi
  },
  mainView: {
    marginTop: verticalScale(20),
    backgroundColor: Colors.slate10,
    marginBottom: verticalScale(100)
  },
  container: {
    marginTop: verticalScale(4),
    backgroundColor: Colors.white
  },
  nameView: {
    ...ApplicationStyles.rowAlignCenterJustifyBetween,
    height: verticalScale(22)
  },
  nameText: {
    ...ApplicationStyles.normalMontserratFont,
    color: Colors.black90,
    fontSize: Fonts.size.semi
  },
  defaultText: {
    ...ApplicationStyles.smallMontserratFont,
    color: Colors.green10,
    fontSize: Fonts.size.sminy
  },
  setAsDefaultText: {
    fontFamily: Fonts.type.robotoMedium,
    fontWeight: Fonts.Weight.medium,
    color: Colors.orange10
  },
  buttonView: {
    height: verticalScale(22),
    width: horizontalScale(67),
    backgroundColor: Colors.slate30,
    ...ApplicationStyles.centerView,
    borderRadius: 10
  },
  addressView: {
    marginVertical: verticalScale(5),
    marginRight: horizontalScale(103)
  },
  addressText: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.small,
    fontWeight: Fonts.Weight.medium,
    color: Colors.gray20
  },
  phoneView: {
    flexDirection: 'row'
  },
  phoneText: {
    fontFamily: Fonts.type.poppinsRegular,
    fontWeight: Fonts.Weight.low,
    color: Colors.gray100,
    fontSize: Fonts.size.sminy
  },
  phoneNumberText: {
    fontFamily: Fonts.type.robotoMedium,
    fontWeight: Fonts.Weight.medium,
    color: Colors.gray100,
    fontSize: Fonts.size.sminy
  },
  actionView: {
    flexDirection: 'row',
    marginBottom: verticalScale(12)
  },
  deleteButton: {
    ...ApplicationStyles.rowAlignCenterJustifyBetween
  },
  deleteText: {
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.low,
    fontSize: Fonts.size.sminy,
    color: Colors.red10,
    paddingLeft: horizontalScale(6)
  },
  addContainer: {
    backgroundColor: Colors.customOrange,
    borderRadius: 25,
    shadowColor: Colors.customOrange,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    width: horizontalScale(150)
  },
  addButton: {
    ...ApplicationStyles.rowAlignCenterJustifyBetween,
    height: horizontalScale(45),
    width: horizontalScale(160),
    borderRadius: 22.5
  },
  title: {
    color: Colors.white70,
    ...ApplicationStyles.normalMontserratFont,
    fontSize: Fonts.size.semi,
    fontWeight: Fonts.Weight.semi,
    paddingLeft: 15
  },
  addPlus: {
    ...ApplicationStyles.centerView,
    height: verticalScale(35),
    width: horizontalScale(35),
    backgroundColor: Colors.white,
    borderRadius: 17.5,
    marginRight: horizontalScale(5)
  },
  innerButtom: {
    ...ApplicationStyles.rowAlignCenterJustifyBetween,
    width: '100%'
  },
  rightButton: {
    position: 'absolute',
    bottom: verticalScale(120),
    right: horizontalScale(30)
  }
});
export default styles;
