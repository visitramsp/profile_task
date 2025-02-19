import { StyleSheet } from 'react-native';
import { Colors, Fonts, verticalScale } from '../../../../theme';

export default StyleSheet.create({
  itemContainer: {
    flex: 1,
    borderWidth: verticalScale(0.5),
    borderColor: Colors.gray10,
    paddingVertical: verticalScale(10),
    borderRadius: verticalScale(15),
    flexDirection: 'row',
    marginVertical: verticalScale(5),
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconStyle: {
    height: verticalScale(40),
    width: verticalScale(40)
  },
  textContainer: {
    flex: 2
  },
  titleText: {
    fontFamily: Fonts.type.montserrat,
    fontSize: Fonts.size.semi,
    fontWeight: Fonts.Weight.seven,
    color: Colors.black
  },
  descriptionText: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.sminy,
    fontWeight: Fonts.Weight.medium,
    color: Colors.custonLightGray,
    marginTop: verticalScale(3)
  },
  arrowContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  arrowIcon: {
    height: verticalScale(20),
    width: verticalScale(20)
  },
  listContentContainer: {
    marginTop: verticalScale(3)
  }
});
