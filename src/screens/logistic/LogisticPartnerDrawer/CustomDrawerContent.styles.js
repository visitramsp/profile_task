import { StyleSheet } from 'react-native';
import {
  Colors,
  Fonts,
  horizontalScale,
  moderateScale,
  verticalScale
} from '../../../theme';

export default StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    paddingLeft: '7%',
    paddingTop: verticalScale(30)
  },
  listContainer: {
    paddingTop: verticalScale(20),
    width: '100%',
    paddingLeft: '3%'
  },
  itemBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: verticalScale(5),
    width: '95%',
    paddingHorizontal: moderateScale(15),
    borderRadius: verticalScale(12),
    paddingVertical: verticalScale(12)
  },
  itemText: {
    fontSize: Fonts.size.f20,
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.low,
    color: Colors.grey30,
    marginLeft: moderateScale(15)
  },
  selectedBtn: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 20,
    position: 'absolute',
    opacity: 0.3
  },
  notificationButton: {
    marginRight: 10,
    width: horizontalScale(50),
    height: horizontalScale(50),
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 20,
    backgroundColor: Colors.orange30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.orange10,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4
  },
  successTxt: {
    fontSize: Fonts.size.tiny,
    color: Colors.red,
    fontWeight: Fonts.Weight.low,
    fontFamily: Fonts.type.robotoBold
  },
  successDes: {
    fontSize: Fonts.size.s10,
    color: Colors.gray20,
    fontFamily: Fonts.type.robotoRegular,
    width: '95%'
  },
  notiNumberContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: Colors.red,
    height: verticalScale(14),
    minWidth: verticalScale(14),
    padding: moderateScale(2),
    borderRadius: 20,
    top: moderateScale(10),
    right: moderateScale(10),
    shadowColor: Colors.red,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4
  },
  notiNumber: {
    color: Colors.white,
    fontFamily: Fonts.type.robotoBold,
    fontSize: 8
  },
  successContainer: {
    width: '70%',
    height: 'auto',
    borderRadius: 20,
    paddingRight: moderateScale(5),
    backgroundColor: Colors.lightOrange3,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: verticalScale(5),
    marginLeft: verticalScale(5)
  },
  cancelView: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6
  },
  top5: { top: verticalScale(5), left: verticalScale(2) },
  flex: { flex: 1 },
  logoutBtn: {
    width: '55%',
    height: verticalScale(55),
    alignSelf: 'center',
    marginBottom: verticalScale(30),
    marginLeft: '3%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 5
  },
  logoutTxt: {
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.semi,
    paddingLeft: moderateScale(7),
    fontSize: Fonts.size.h20
  }
});
