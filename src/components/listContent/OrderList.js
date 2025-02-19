import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';

import { Colors, horizontalScale, verticalScale } from '../../theme';
import Fonts from '../../theme/Fonts';
import ApplicationStyles from '../../theme/ApplicationStyles';
import {
  AppIcon,
  CircleIcon,
  DropLocationIcon,
  VerticleList
} from '../../assets/icon';
import { useTranslation } from 'react-i18next';
import { APP_LANGUAGE_CONSTANT } from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import CommonLoader from '../CommonLoader';

const OrderList = ({
  onPress,
  isLoading,
  data,
  currentTab,
  BTN_ARR,
  ...rest
}) => {
  const { t } = useTranslation();
  if (isLoading) {
    return (
      <View style={styles.activityIndicator}>
        <CommonLoader isLoading={isLoading} />
        {/* <ActivityIndicator size={'large'} color={Colors.orange10} /> */}
      </View>
    );
  }
  // eslint-disable-next-line complexity
  const renderItem = ({ item, index }) => {
    return (
      <>
        {index > 0 && <View style={styles.horizontalLine} />}
        <View
          style={[styles.mainContainer, index > 0 && styles.zeroGreaterView]}
        >
          <View style={styles.driverView}>
            {currentTab !== 'Pending' && (
              <View style={styles.imgView}>
                <Image source={AppIcon.driverProfile} style={styles.imgSelf} />
              </View>
            )}
            <View
              style={[
                styles.driverDetailsView,
                currentTab === 'Pending' && styles.currentView
              ]}
            >
              <View>
                <View style={styles.topView}>
                  <Text style={styles.nameText}>
                    {currentTab === 'Pending'
                      ? `Order Id : ${item.orderId}`
                      : item.name}
                  </Text>

                  {currentTab === 'Pending' ? (
                    <View style={[styles.statusView, styles.pendingView]}>
                      <Text style={styles.statusText}>Pending</Text>
                    </View>
                  ) : (
                    <View
                      style={[
                        styles.statusView,
                        item.status === 'Pending' && styles.pendingView,
                        item.status === 'Cancelled' && styles.cancelledView
                      ]}
                    >
                      <Text style={styles.statusText}>{item.status}</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.pickupText}>
                  {currentTab === 'Pending'
                    ? item.currentDate
                    : t(APP_LANGUAGE_CONSTANT.PICKUP_TRUCK)}{' '}
                  : {currentTab !== 'Pending' && item.pickup}
                </Text>

                {currentTab === 'Pending' ? (
                  <View style={styles.distanceView}>
                    <Text style={styles.distanceText}>
                      {'Distance'} {item.distance}
                    </Text>
                    <Text style={styles.elapseText}>
                      {'Elapsed Time : '} {item.elapseTile}
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.distanceText}>
                    {t(APP_LANGUAGE_CONSTANT.DISTANCE_TRAVELLED)} :{' '}
                    {item.distance}
                  </Text>
                )}
              </View>
            </View>
          </View>
          <View style={styles.addressView}>
            <View>
              <CircleIcon style={{ marginTop: verticalScale(3) }} />
              <VerticleList style={styles.dashedView} height={47} />
              <DropLocationIcon />
            </View>
            <View style={styles.pickupAddView}>
              <View style={styles.pickInnerView}>
                <Text style={styles.pickAddText}>
                  {t(APP_LANGUAGE_CONSTANT.PICKUP_AADREES)}
                </Text>
                <Text style={styles.pickAddTime}>{item.time}</Text>
              </View>
              <Text style={styles.pickFullAddText} numberOfLines={1}>
                {item.pickupAdd}
              </Text>

              <View
                style={[styles.pickInnerView, { marginTop: verticalScale(20) }]}
              >
                <Text style={styles.pickAddText}>
                  {t(APP_LANGUAGE_CONSTANT.DROP_ADDRESS)}
                </Text>
              </View>
              <Text style={styles.pickFullAddText} numberOfLines={1}>
                {item.dropAdd}
              </Text>
            </View>
          </View>
          {currentTab === 'Pending' && (
            <View style={styles.buttonView}>
              {BTN_ARR.map((item, index) => (
                <TouchableOpacity key={index}>
                  <LinearGradient
                    colors={[Colors.orange10, Colors.orange30]}
                    style={[styles.gradient]}
                  >
                    <View
                      style={[
                        styles.assignView,
                        index === 0 && styles.selectedAssignView
                      ]}
                    >
                      <Text
                        style={[
                          styles.btnTxt,
                          index === 0 && styles.selectedBtnTxt
                        ]}
                      >
                        {item}
                      </Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </>
    );
  };

  const separateComponent = () => <View style={styles.spaceW} />;

  return (
    <FlatList
      key={'categories_list'}
      data={data}
      renderItem={renderItem}
      style={[styles.listContainer]}
      contentContainerStyle={{ paddingHorizontal: horizontalScale(0) }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      bounses={false}
      ItemSeparatorComponent={separateComponent}
      ListEmptyComponent={
        <View style={styles.emptyItemContainer}>
          <Text style={styles.noItemText}>Not found categories</Text>
        </View>
      }
      keyExtractor={(item) => item?.id}
    />
  );
};

export default OrderList;

const styles = StyleSheet.create({
  activityIndicator: {
    ...ApplicationStyles.centerView,
    width: '50%',
    height: verticalScale(100)
  },
  listContainer: {
    marginTop: verticalScale(10)
  },
  spaceW: {
    width: horizontalScale(15),
    height: verticalScale(15)
  },
  horizontalLine: { borderBottomWidth: 3, borderColor: Colors.gray40 },
  mainContainer: {
    paddingBottom: verticalScale(5),
    marginHorizontal: horizontalScale(30)
  },
  zeroGreaterView: { marginTop: verticalScale(20) },
  driverView: {
    flexDirection: 'row'
  },
  imgView: {
    backgroundColor: Colors.customOrange,
    height: verticalScale(70),
    width: horizontalScale(70),
    borderRadius: 10
  },
  imgSelf: {
    height: verticalScale(70),
    width: horizontalScale(70),
    borderRadius: 10
  },
  driverDetailsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: horizontalScale(15),
    width: horizontalScale(230)
  },
  currentView: {
    width: '100%',
    marginLeft: 0
  },
  topView: {
    ...ApplicationStyles.rowAlignCenterJustifyBetween,
    width: '100%'
  },

  statusView: {
    ...ApplicationStyles.centerView,
    height: verticalScale(25),
    borderWidth: 1,
    borderColor: Colors.greenBorder,
    backgroundColor: Colors.green120,
    borderRadius: 8
  },
  nameText: {
    ...ApplicationStyles.smallRobotoFont,
    color: Colors.black
  },
  pendingView: {
    borderColor: Colors.yellowBorder,
    backgroundColor: Colors.yellow20
  },
  cancelledView: {
    borderColor: Colors.gray100,
    backgroundColor: Colors.gray20
  },
  statusText: {
    color: Colors.white,
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.low,
    fontSize: Fonts.size.sminy,
    paddingHorizontal: horizontalScale(12)
  },
  pickupText: {
    ...ApplicationStyles.smallRobotoFont,
    fontSize: Fonts.size.sminy,
    color: Colors.gray20
  },
  distanceView: {
    ...ApplicationStyles.rowAlignCenterJustifyBetween
  },
  distanceText: {
    ...ApplicationStyles.smallRobotoFont,
    color: Colors.orange10,
    marginTop: verticalScale(5)
  },
  elapseText: {
    ...ApplicationStyles.smallRobotoFont,
    color: Colors.gray10
  },
  addressView: {
    marginTop: verticalScale(10),
    flexDirection: 'row',
    width: horizontalScale(315)
  },
  pickupAddView: {
    paddingLeft: horizontalScale(13)
  },
  pickInnerView: {
    ...ApplicationStyles.rowAlignCenterJustifyBetween
  },
  pickAddText: {
    ...ApplicationStyles.mediumMontserratFont,
    fontSize: Fonts.size.semi,
    color: Colors.black50
  },
  dashedView: {
    position: 'relative',
    left: 6.5
  },
  pickAddTime: {
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.low,
    fontSize: Fonts.size.sminy,
    color: Colors.gray10
  },
  pickFullAddText: {
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.low,
    fontSize: Fonts.size.semi,
    color: Colors.gray20,
    marginTop: verticalScale(2)
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: verticalScale(16)
  },
  gradient: {
    ...ApplicationStyles.centerView,
    flexDirection: 'row',
    width: horizontalScale(108),
    height: verticalScale(38),
    shadowColor: Colors.primary10 + 30,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
    borderRadius: 11
  },
  assignView: {
    ...ApplicationStyles.centerView,
    borderWidth: 1,
    borderColor: Colors.orange10,
    width: horizontalScale(108),
    height: verticalScale(38),
    borderRadius: 12
  },
  selectedAssignView: { backgroundColor: Colors.white },
  btnTxt: {
    ...ApplicationStyles.smallRobotoFont,
    color: Colors.white,
    fontSize: Fonts.size.small
  },
  selectedBtnTxt: { color: Colors.orange10 }
});
