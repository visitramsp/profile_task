import { StyleSheet } from 'react-native';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  verticalScale
} from '../../theme';

const styles = StyleSheet.create({
  modalView: {
    marginVertical: verticalScale(50),
    backgroundColor: Colors.white,
    borderRadius: 25
  },
  termConditionText: {
    color: Colors.black10,
    marginVertical: verticalScale(24),
    textAlign: 'center',
    fontFamily: Fonts.type.robotoBold,
    fontWeight: Fonts.Weight.seven,
    fontSize: Fonts.size.f20
  },
  title: {
    ...ApplicationStyles.mediumMontserratFont,
    fontWeight: Fonts.Weight.seven,
    color: Colors.black10
  },
  aqadMobileText: {
    fontFamily: Fonts.type.poppinsSemiBold,
    fontWeight: Fonts.Weight.semi,
    fontSize: Fonts.size.small,
    color: Colors.black10
  },
  heading: {
    marginTop: verticalScale(15),
    fontFamily: Fonts.type.poppinsSemiBold,
    fontWeight: Fonts.Weight.semi,
    color: Colors.primary,
    fontSize: Fonts.size.small
  },
  desc: {
    fontFamily: Fonts.type.poppinsRegular,
    fontWeight: Fonts.Weight.low,
    fontSize: Fonts.size.s10,
    color: Colors.blue20
  },
  defineView: {
    flexDirection: 'row'
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
    marginLeft: horizontalScale(10)
  },
  aqadMustText: {
    marginTop: verticalScale(10),
    marginLeft: horizontalScale(13)
  },

  buttonAddCart: {
    marginTop: verticalScale(4),
    marginBottom: horizontalScale(15),
    borderRadius: 10,
    marginHorizontal: 'auto',
    padding: 1
  },

  addButton: {
    ...ApplicationStyles.centerView,
    backgroundColor: Colors.white,
    height: verticalScale(40),
    width: horizontalScale(100),
    borderRadius: 9
  },

  buttonText: {
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.low,
    color: Colors.orange10,
    fontSize: Fonts.size.small
  },
  buttonView: {
    ...ApplicationStyles.rowAlignCenterJustifyBetween,
    marginBottom: verticalScale(50),
    gap: 10
  },
  acceptButton: {
    ...ApplicationStyles.centerView,
    height: verticalScale(40),
    width: horizontalScale(100),
    borderRadius: 9
  },
  termView: {
    flexDirection: 'row',
    marginTop: verticalScale(5)
  }
});
export default styles;
