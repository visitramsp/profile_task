import { Dimensions, StyleSheet } from 'react-native';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  moderateScale,
  verticalScale
} from '../../theme';
const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    flex: 1
  },
  slide: {
    width,
    alignItems: 'center'
  },
  dotContainer: {
    ...ApplicationStyles.rowAlignCenterJustifyBetween,
    paddingHorizontal: horizontalScale(30),
    bottom: verticalScale(13)
  },
  activeDot: {
    backgroundColor: Colors.primary10,
    height: 10,
    width: 18,
    marginRight: horizontalScale(5),
    borderRadius: 10
  },
  inActiveDot: {
    backgroundColor: Colors.white20,
    height: 10,
    width: 10,
    marginRight: moderateScale(5),
    borderRadius: 10
  },
  title: {
    ...ApplicationStyles.mediumMontserratFont,
    fontSize: Fonts.size.f20,
    lineHeight: 28,
    textAlign: 'center',
    color: Colors.secondary,
    paddingTop: verticalScale(15),
    paddingHorizontal: verticalScale(30)
  },
  description: {
    ...ApplicationStyles.regularRobotoFonts,
    fontSize: Fonts.size.semi,
    color: Colors.secondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingTop: verticalScale(10),
    paddingHorizontal: verticalScale(10)
  },
  skip: {
    ...ApplicationStyles.smallMontserratFont,
    color: Colors.secondary
  },
  slideImage: {
    flex: 0.95,
    width: width * 1.3
  },
  contentView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  dotView: {
    ...ApplicationStyles.rowAlignCenterJustifyBetween
  },
  arrowIcon: {
    width: horizontalScale(20),
    height: verticalScale(15),
    tintColor: Colors.secondary
  }
});
