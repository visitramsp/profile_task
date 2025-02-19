import { StyleSheet } from 'react-native';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  PAGE_SPACING,
  verticalScale
} from '../../../theme';

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: Colors.grayF2F2F2,
    borderRadius: 47,
    marginBottom: 30,
    flexDirection: 'row',
    marginHorizontal: PAGE_SPACING
  },
  driverButton: {
    flex: 1,
    marginHorizontal: horizontalScale(4),
    marginVertical: verticalScale(3),
    borderRadius: 25
  },
  btnShadow: {
    backgroundColor: Colors.primary10,
    shadowColor: Colors.customOrange,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 10
  },
  gradient: {
    ...ApplicationStyles.centerView,
    height: verticalScale(40),
    borderRadius: 25,
    width: '100%'
  },
  buttonText: {
    ...ApplicationStyles.mediumMontserratFont,
    fontWeight: Fonts.Weight.medium,
    color: Colors.white
  },

  rightButton: {
    position: 'absolute',
    bottom: verticalScale(120),
    right: horizontalScale(30)
  },
  addContainer: {
    backgroundColor: Colors.customOrange,
    borderRadius: 25,
    shadowColor: Colors.customOrange,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    width: horizontalScale(180)
  },
  addButton: {
    ...ApplicationStyles.rowAlignCenter,
    height: horizontalScale(45),
    width: horizontalScale(180),
    borderRadius: 22.5
  },
  innerButtom: {
    ...ApplicationStyles.rowAlignCenterJustifyBetween,
    width: '100%'
  },
  title: {
    color: Colors.white70,
    ...ApplicationStyles.normalMontserratFont,
    fontSize: Fonts.size.semi,
    paddingLeft: horizontalScale(20)
  },
  addPlus: {
    ...ApplicationStyles.centerView,
    height: verticalScale(35),
    width: horizontalScale(35),
    backgroundColor: Colors.white,
    borderRadius: 17.5,
    marginRight: horizontalScale(5)
  }
});
export default styles;
