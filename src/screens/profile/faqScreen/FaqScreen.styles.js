import { StyleSheet } from 'react-native';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  verticalScale
} from '../../../theme';

const styles = StyleSheet.create({
  title: {
    ...ApplicationStyles.mediumMontserratFont,
    fontSize: Fonts.size.f20,
    color: Colors.blue30,
    marginTop: verticalScale(20)
  },
  desc: {
    marginTop: verticalScale(10),
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.low,
    color: Colors.white110,
    fontSize: Fonts.size.semi
  },
  toggleIcon: {
    marginLeft: verticalScale(5)
  },

  faqItem: {},
  faqHeader: {
    ...ApplicationStyles.rowAlignCenterJustifyBetween,
    alignItems: 'flex-start',
    paddingVertical: verticalScale(12),
    paddingBottom: verticalScale(8),
    width: '88%'
  },
  question: {
    ...ApplicationStyles.fontRobotoBold,
    fontWeight: Fonts.Weight.semi,
    fontSize: Fonts.size.f16,
    color: Colors.black90,
    width: '100%',
    paddingTop: verticalScale(2)
  },
  answerContainer: {
    overflow: 'hidden',
    paddingBottom: verticalScale(10)
  },
  answer: {
    ...ApplicationStyles.regularRobotoFonts,
    fontSize: Fonts.size.small,
    color: Colors.gray20,
    paddingVertical: verticalScale(5),
    lineHeight: 18
  },
  border: {
    backgroundColor: Colors.gray90,
    height: verticalScale(3)
  }
});

export default styles;
