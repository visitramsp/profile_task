import { Dimensions, StyleSheet } from 'react-native';
import { Colors, horizontalScale, verticalScale } from '../../../theme';
import Fonts from '../../../theme/Fonts';
const windowWidth = Dimensions.get('window').width;
export const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(20),
    backgroundColor: Colors.white
  },
  stepWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  circleWrapper: {
    alignItems: 'center',
    marginRight: horizontalScale(15)
  },
  circle: {
    width: horizontalScale(50),
    height: verticalScale(50),
    borderRadius: 25,
    borderWidth: 1.3,
    borderColor: Colors.orange92,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  orangeCircle: {
    backgroundColor: Colors.orange92
  },
  circleText: {
    fontSize: Fonts.size.input,
    color: Colors.orange92,
    fontWeight: 'bold'
  },
  whiteText: {
    color: Colors.white
  },
  verticalLine: {
    width: horizontalScale(2),
    height: verticalScale(40),
    backgroundColor: Colors.orange92
  },
  textContainer: {
    flex: 1
  },
  stepTitle: {
    fontSize: Fonts.size.semi,
    fontWeight: Fonts.Weight.semi,
    color: Colors.black,
    marginBottom: verticalScale(5),
    fontFamily: Fonts.type.montserratMedium
  },
  stepDescription: {
    fontSize: Fonts.size.small,
    color: Colors.grey5,
    fontFamily: Fonts.type.montserrat
  },
  orangeText: {
    color: Colors.orange92
  },
  label: {
    fontSize: Fonts.size.uprSemi,
    color: Colors.black5,
    marginBottom: verticalScale(10),
    fontFamily: Fonts.type.montserratBold
  },
  referRetailer: {
    fontSize: Fonts.size.f22,
    color: Colors.black,
    fontFamily: Fonts.type.montserratBold
  },
  banner: {
    width: '100%',
    backgroundColor: Colors.lightOrange2,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: verticalScale(10),
    borderStyle: 'dashed',
    borderWidth: 1.5,
    borderColor: Colors.orange10,
    height: verticalScale(200)
  },
  referBanner: {
    width: '90%'
  },
  referDescription: {
    fontSize: Fonts.size.small,
    color: Colors.black,
    fontFamily: Fonts.type.montserrat
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: horizontalScale(15),
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.orange92,
    width: '100%'
  },
  codeText: {
    fontSize: Fonts.size.h20,
    fontWeight: 'bold',
    color: Colors.orange92,
    letterSpacing: 2
  },
  generateText: {
    fontFamily: Fonts.type.montserratMedium,
    fontSize: Fonts.size.uprSemi,
    color: Colors.black5
  },
  btn: {
    height: verticalScale(60),
    width: windowWidth - horizontalScale(65),
    marginTop: verticalScale(20),
    marginBottom: verticalScale(30),
    alignSelf: 'center'
  }
});
