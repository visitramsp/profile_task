import { StyleSheet } from 'react-native';
import { cardRadius, Colors, Fonts, verticalScale } from '../../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.orange30
  },
  scrollViewContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: cardRadius,
    borderTopRightRadius: cardRadius
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    paddingVertical: verticalScale(10),
    borderTopLeftRadius: cardRadius,
    borderTopRightRadius: cardRadius,
    marginTop: verticalScale(10)
  },
  orderIdText: {
    fontFamily: Fonts.type.montserrat,
    fontSize: Fonts.size.small,
    fontWeight: Fonts.Weight.medium,
    color: Colors.black
  },
  orderTimeText: {
    fontFamily: Fonts.type.poppinsMedium,
    fontSize: Fonts.size.tiny,
    color: Colors.gray50
  },
  addressContainer: {
    backgroundColor: Colors.white,
    paddingVertical: verticalScale(10),
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  addressIconColumn: {
    alignItems: 'center'
  },
  addressIcon: {
    height: verticalScale(12),
    width: verticalScale(12),
    marginTop: verticalScale(2.5),
    marginLeft: verticalScale(5)
  },
  addressTextColumn: {
    marginLeft: verticalScale(15),
    flex: 1
  },
  addressTitle: {
    fontFamily: Fonts.type.montserrat,
    fontSize: Fonts.size.small,
    fontStyle: Fonts.Weight.medium,
    color: Colors.black
  },
  addressText: {
    fontFamily: Fonts.type.montserrat,
    fontSize: Fonts.size.tiny,
    color: Colors.gray50
  },
  addressGap: {
    height: verticalScale(20)
  },
  announcementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.orange60,
    borderRadius: verticalScale(8),
    marginVertical: verticalScale(10),
    paddingVertical: verticalScale(5),
    overflow: 'hidden'
  },
  speakerIcon: {
    height: verticalScale(15),
    width: verticalScale(15),
    marginLeft: verticalScale(10)
  },
  announcementText: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.tiny,
    color: Colors.orange30,
    paddingVertical: verticalScale(5),
    marginHorizontal: verticalScale(10),
    textAlign: 'justify',
    width: '85%'
  },
  productListTitle: {
    fontFamily: Fonts.type.montserrat,
    fontWeight: Fonts.Weight.seven,
    fontSize: Fonts.size.regular,
    color: Colors.black,
    backgroundColor: Colors.white,
    marginTop: verticalScale(10),
    marginBottom: verticalScale(7)
  },
  itemCount: {
    color: Colors.orange30
  },
  listContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: verticalScale(5)
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: verticalScale(10)
  },
  itemImageContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemImage: {
    height: verticalScale(60),
    width: verticalScale(60)
  },
  itemDetailsContainer: {
    flex: 2,
    marginLeft: verticalScale(15)
  },
  itemName: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.semi,
    color: Colors.black
  },
  itemDetail: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.small,
    color: Colors.gray50
  },
  scannerContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scannerImage: {
    height: verticalScale(30),
    width: verticalScale(30)
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(13),
    right: verticalScale(5)
  },
  buttonIcon: {
    height: verticalScale(20),
    width: verticalScale(20)
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: verticalScale(6),
    paddingVertical: verticalScale(10),
    borderWidth: 1,
    borderColor: Colors.orange30,
    paddingHorizontal: verticalScale(25)
  },
  reportButtonText: {
    fontFamily: Fonts.type.montserrat,
    fontWeight: Fonts.Weight.semi,
    fontSize: Fonts.size.sminy,
    color: Colors.orange30,
    paddingHorizontal: verticalScale(10)
  },
  footerSpacer: {
    flex: 0.1
  },
  downloadButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: verticalScale(6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  LinearGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.orange20,
    borderRadius: verticalScale(6),
    paddingVertical: verticalScale(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  downloadButtonText: {
    fontFamily: Fonts.type.montserrat,
    fontWeight: Fonts.Weight.semi,
    fontSize: Fonts.size.medium,
    color: Colors.white,
    paddingHorizontal: verticalScale(10)
  },
  contactContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: verticalScale(10)
  },
  contactImageContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  contactImage: {
    height: verticalScale(60),
    width: verticalScale(60)
  },
  contactDetailsContainer: {
    flex: 2,
    marginLeft: verticalScale(15)
  },
  contactType: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.semi,
    color: Colors.black
  },
  contactName: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.small,
    color: Colors.orange10
  },
  contactIconContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  contactIcon: {
    height: verticalScale(30),
    width: verticalScale(30)
  },
  contactListContainer: {
    marginBottom: verticalScale(15)
  },
  arrivedButton: {
    backgroundColor: Colors.orange20,
    borderRadius: cardRadius,
    marginTop: verticalScale(10),
    marginBottom: verticalScale(25),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(15),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  arrivedButtonText: {
    fontFamily: Fonts.type.montserrat,
    fontWeight: Fonts.Weight.semi,
    fontSize: Fonts.size.regular,
    color: Colors.white
  }
});
