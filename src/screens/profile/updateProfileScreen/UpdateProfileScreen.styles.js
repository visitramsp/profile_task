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
  profileView: {
    marginVertical: verticalScale(20)
  },
  profileShadow: {
    borderRadius: 20,
    height: 100,
    width: 100,
    marginHorizontal: 'auto',
    backgroundColor: Colors.customOrange,
    shadowColor: Colors.orangeOpacity30,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10
  },
  profileImage: {
    flex: 1,
    borderRadius: 20
  },
  inputView: {
    marginTop: verticalScale(20)
  },

  countryInputContainer: {
    ...ApplicationStyles.rowAlignCenter,
    alignItems: 'flex-start',
    height: 60,
    flex: 1
  },
  country: {
    ...ApplicationStyles.rowAlignCenter,
    borderWidth: 1,
    borderColor: Colors.custonLightGray,
    borderRadius: verticalScale(20),
    overflow: 'hidden',
    paddingHorizontal: horizontalScale(10),
    height: 57
  },
  countryText: {
    paddingLeft: horizontalScale(10),
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.h20,
    color: Colors.black80
  },
  countryTextInputView: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.custonLightGray,
    borderRadius: verticalScale(20),
    paddingHorizontal: horizontalScale(15),
    height: 57,
    marginLeft: horizontalScale(10),
    flexDirection: 'row',
    alignItems: 'center'
  },
  countryTextInput: {
    ...ApplicationStyles.flex1,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.h20,
    color: Colors.black80,
    height: 57
  },
  button: {
    marginTop: verticalScale(100)
  }
});

export default styles;
