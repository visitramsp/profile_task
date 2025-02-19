import { StyleSheet } from 'react-native';
import {
  ApplicationStyles,
  Colors,
  horizontalScale,
  verticalScale,
  width
} from '../../../theme';
import Fonts from '../../../theme/Fonts';
import { PAGE_SPACING } from '../../../theme/ApplicationStyles';

export const styles = StyleSheet.create({
  safeareaStyle: {
    flex: 1
  },
  manageSpace: { height: verticalScale(60) },
  CarouselView: {
    marginVertical: horizontalScale(5),
    paddingBottom: verticalScale(35)
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  searchBtn: {
    position: 'absolute',
    right: 13
  },
  userTitle: {
    ...ApplicationStyles.normalMontserratFont,
    fontWeight: Fonts.Weight.full,
    color: Colors.blue
  },
  userTitleSpac: {
    flex: 1,
    textAlign: 'center'
  },
  userTypeContainer: {
    paddingTop: verticalScale(10),
    flexDirection: 'row',
    alignItems: 'center'
  },
  userType: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  keyPointCard: {
    width: width * 0.195,
    backgroundColor: Colors.white50,
    borderRadius: 20,
    marginTop: verticalScale(5),
    paddingTop: verticalScale(8),
    paddingBottom: verticalScale(13),
    paddingHorizontal: horizontalScale(5),
    alignItems: 'center',
    shadowColor: Colors.primary30,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5
  },
  keyPointText: {
    ...ApplicationStyles.smallMontserratFont,
    fontSize: Fonts.size.s10,
    textAlign: 'center',
    paddingTop: verticalScale(7),
    color: Colors.black30
  },
  seeAll: {
    ...ApplicationStyles.mediumMontserratFont,
    fontWeight: Fonts.Weight.secondlast,
    color: Colors.secondary,
    backgroundColor: 'transparent',
    shadowColor: Colors.primary20,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5
  },
  fmcgContainer: {
    ...ApplicationStyles.pageSpacing,
    paddingTop: verticalScale(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  fmcgImg: {
    width: 106,
    height: 106,
    borderRadius: 100
  },
  fmcgText: {
    ...ApplicationStyles.smallMontserratFont,
    paddingTop: verticalScale(13),
    textAlign: 'center',
    color: Colors.black100
  },
  fmcgImgView: {
    width: 106,
    backgroundColor: Colors.primary20,
    shadowColor: Colors.primary20,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 100
  },
  textinputContainer: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: Colors.primary20,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
    height: 52,
    position: 'absolute',
    right: PAGE_SPACING,
    paddingHorizontal: horizontalScale(15)
  },
  searchInput: {
    flex: 0.85,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.input
  },
  searchContainer: {
    backgroundColor: Colors.white50,
    marginHorizontal: PAGE_SPACING,
    borderRadius: 20,
    paddingHorizontal: horizontalScale(10)
  },
  searchText: {
    paddingVertical: verticalScale(10),
    color: Colors.black10,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.semi
  },
  fmcgImgContainer: {
    width: 106,
    marginLeft: horizontalScale(10)
  },
  referralContainer: {
    width: '85%',
    backgroundColor: Colors.lightOrange2,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: verticalScale(5),
    borderStyle: 'dashed',
    borderWidth: 1.5,
    borderColor: Colors.orange10
  },
  refer: {
    height: verticalScale(75),
    width: '90%',
    borderRadius: 20,
    backgroundColor: Colors.orange10,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(15)
  },
  earn: {
    flexDirection: 'row',
    width: '75%',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    height: verticalScale(70)
  },
  referText: {
    fontSize: Fonts.size.regularLarge,
    textAlign: 'center',
    color: Colors.white,
    marginRight: verticalScale(10),
    fontFamily: 'Montserrat-Bold'
  },
  referralText: {
    fontSize: Fonts.size.f20,
    textAlign: 'center',
    marginTop: verticalScale(15),
    marginBottom: verticalScale(10),
    fontFamily: 'Montserrat-Bold',
    color: Colors.black
  },
  earnText: {
    color: Colors.primary,
    fontSize: Fonts.size.f20,
    fontFamily: 'Montserrat-Bold'
  }
});
