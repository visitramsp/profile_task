import { StyleSheet } from 'react-native';
import {
  ApplicationStyles,
  Colors,
  Fonts,
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

  button: {
    marginVertical: verticalScale(50)
  },
  documentView: { marginTop: 8 }
});

export default styles;
