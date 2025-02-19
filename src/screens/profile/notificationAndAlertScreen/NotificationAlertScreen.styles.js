import { StyleSheet } from 'react-native';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  verticalScale
} from '../../../theme';

const styles = StyleSheet.create({
  faqHeader: {
    ...ApplicationStyles.rowAlignCenterJustifyBetween,
    alignItems: 'flex-start',
    width: '100%',
    height: 'auto',
    backgroundColor: 'white',
    marginTop: verticalScale(10),
    borderWidth: verticalScale(1),
    borderColor: Colors.gray110,
    borderRadius: 20,
    padding: verticalScale(14)
  },
  question: {
    fontFamily: Fonts.type.montserratMedium,
    fontWeight: Fonts.Weight.semi,
    fontSize: Fonts.size.uprSemi,
    color: Colors.black90,
    width: '100%'
  },
  answerContainer: {
    color: Colors.gray20,
    fontSize: Fonts.size.sminy,
    paddingTop: verticalScale(5),
    fontFamily: Fonts.type.montserrat
  },
  toggleLevel: { color: Colors.black, fontWeight: Fonts.Weight.semi },
  titleView: {
    width: '80%'
  },
  toggle: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    alignSelf: 'center'
  }
});

export default styles;
