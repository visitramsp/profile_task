import { Dimensions, Platform, StyleSheet } from 'react-native';
import { Colors, Fonts, horizontalScale, verticalScale } from '../../../theme';
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  imgBackground: {
    height: '100%',
    width: windowWidth
  },
  headingContainer: {
    height: verticalScale(70),
    width: '88%',
    backgroundColor: Colors.orange12,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    marginTop: verticalScale(20),
    padding: verticalScale(10)
  },
  scroll: {
    height: 'auto',
    width: '100%',
    marginTop: verticalScale(20)
  },
  imagePic: { flexDirection: 'row', alignItems: 'flex-end' },
  flat: { zIndex: 99999999999 },
  inputView: {
    backgroundColor: Colors.white,
    paddingTop: verticalScale(5),
    width: '100%',
    borderRadius: 10,
    paddingBottom:
      Platform.OS === 'android' ? verticalScale(10) : verticalScale(5),
    flexDirection: 'row'
  },
  headingText: {
    textAlign: 'center',
    color: Colors.yellow20,
    marginLeft: verticalScale(10),
    width: '90%'
  },
  textinputContainer: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: horizontalScale(0),
      height: verticalScale(2)
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    height: 'auto',
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'red',
    paddingBottom: Platform.OS === 'ios' ? verticalScale(15) : verticalScale(10)
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingBottom: verticalScale(10),
    width: '80%'
  },
  textinputStyle: {
    minHeight: verticalScale(45),
    maxHeight: verticalScale(150),
    width: '75%',
    marginLeft: verticalScale(15),
    alignSelf: 'center',
    padding: verticalScale(4),
    paddingTop: verticalScale(15),
    paddingRight: verticalScale(10),
    height: 'auto',
    color: Colors.black90,
    fontFamily: Fonts.type.robotoRegular
  },
  pickImage: {
    position: 'absolute',
    bottom: verticalScale(20),
    right: verticalScale(95)
  },
  pickDocument: {
    position: 'absolute',
    bottom: verticalScale(20),
    right: verticalScale(65)
  },
  send: {
    paddingBottom:
      Platform.OS === 'android' ? verticalScale(6) : verticalScale(10)
  },
  rightBubble: {
    marginBottom: '1%',
    marginLeft: '20%',
    paddingLeft: '5%',
    paddingRight: '5%',
    marginRight: '5%',
    maxWidth: '75%',
    minWidth: horizontalScale(100),
    alignSelf: 'flex-end',
    backgroundColor: Colors.lightOrange2,
    borderTopRightRadius: verticalScale(10),
    borderTopLeftRadius: verticalScale(10),
    borderBottomLeftRadius: verticalScale(10),
    borderBottomRightRadius: verticalScale(1)
  },
  leftBubble: {
    marginBottom: '1%',
    marginRight: '20%',
    paddingLeft: '5%',
    paddingRight: '5%',
    marginLeft: '5%',
    maxWidth: '75%',
    minWidth: horizontalScale(100),
    alignSelf: 'flex-start',
    backgroundColor: Colors.black12,
    borderTopLeftRadius: verticalScale(10),
    borderTopRightRadius: verticalScale(10),
    borderBottomLeftRadius: verticalScale(1),
    borderBottomRightRadius: verticalScale(10)
  },
  bubbleRightText: {
    padding: verticalScale(5),
    color: Colors.black90,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.uprSemi
  },
  bubbleLeftText: {
    padding: verticalScale(5),
    color: Colors.black90,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.uprSemi
  },
  leftTimeStyle: {
    color: Colors.white120,
    padding: verticalScale(5)
  },
  rightTimeStyle: {
    color: Colors.white120,
    textAlign: 'right',
    padding: verticalScale(5)
  },
  childrenContainer: {
    marginBottom:
      Platform.OS === 'android' ? verticalScale(0) : verticalScale(20)
  },
  viewChat: { flex: 1, margin: verticalScale(5) },
  userImage: {
    height: verticalScale(110),
    width: horizontalScale(170),
    borderRadius: 10,
    backgroundColor: Colors.lightOrange2,
    marginRight: verticalScale(20),
    paddingTop: verticalScale(5),
    alignSelf: 'flex-end'
  },
  imageUser: {
    height: verticalScale(80),
    width: horizontalScale(160),
    alignSelf: 'center',
    borderRadius: 10
  },
  imageTime: {
    textAlign: 'right',
    marginRight: verticalScale(5),
    color: Colors.black90
  },
  doc: {
    height: verticalScale(70),
    width: horizontalScale(200),
    borderRadius: 10,
    backgroundColor: Colors.lightOrange2,
    marginRight: verticalScale(20),
    paddingTop: verticalScale(10),
    marginLeft: verticalScale(10),
    alignSelf: 'flex-end'
  },
  documentView: {
    backgroundColor: Colors.lightOrange2,
    flexDirection: 'row',
    paddingLeft: verticalScale(5)
  },
  pdf: {
    color: Colors.black,
    marginLeft: verticalScale(10),
    fontFamily: Fonts.type.robotoRegular
  },
  docTime: {
    textAlign: 'right',
    marginRight: verticalScale(5),
    color: Colors.black90
  },
  leftImage: {
    height: verticalScale(110),
    width: horizontalScale(170),
    borderRadius: 10,
    backgroundColor: Colors.black12,
    marginLeft: verticalScale(20),
    paddingTop: verticalScale(5)
  },
  imgLeft: {
    height: verticalScale(80),
    width: horizontalScale(160),
    alignSelf: 'center',
    borderRadius: 10
  },
  leftTime: {
    textAlign: 'right',
    marginRight: verticalScale(5),
    color: Colors.white120
  },
  leftDocument: {
    height: verticalScale(60),
    width: horizontalScale(190),
    borderRadius: 10,
    backgroundColor: Colors.black12,
    marginLeft: verticalScale(20),
    paddingTop: verticalScale(10),
    paddingLeft: verticalScale(10)
  },
  docLeft: {
    backgroundColor: Colors.black12,
    flexDirection: 'row'
  },
  time: {
    textAlign: 'right',
    marginRight: verticalScale(5),
    color: Colors.white120
  }
});

export default styles;
