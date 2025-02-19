import { Platform, StyleSheet } from 'react-native';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  PAGE_SPACING,
  verticalScale
} from '../../../theme';

const styles = StyleSheet.create({
  mainView: { marginTop: 0 },
  headerView: { marginTop: PAGE_SPACING },
  container: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    backgroundColor: Colors.white
  },
  wishlistText: {
    ...ApplicationStyles.normalMontserratFont,
    color: Colors.black50,
    fontSize: Fonts.size.semi,
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10)
  },

  activityIndicator: {
    ...ApplicationStyles.centerView,
    width: '100%',
    height: verticalScale(100)
  },
  itemContainer: {
    borderRadius: 20,
    marginTop: verticalScale(4),
    backgroundColor: Colors.white70,
    shadowColor: Colors.orange115,
    shadowOffset: {
      width: 0,
      height: 15
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10
  },
  contentContainerStyle: {
    paddingBottom:
      Platform.OS === 'android' ? verticalScale(140) : verticalScale(170)
  },
  spaceW: {
    width: horizontalScale(15),
    height: verticalScale(20)
  }
});
export default styles;
