/* eslint-disable complexity */
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Image,
  ActivityIndicator
} from 'react-native';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  height,
  horizontalScale,
  verticalScale,
  width
} from '../../theme';
import { AppIcon } from '../../assets/icon';
import { APP_LANGUAGE_CONSTANT } from '../../constants';
import { useSelector } from 'react-redux';
import { navigationRef } from '../../navigation/stackNavigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import moment from 'moment';
import { orderAcceptAndCancel } from '../../store/vendor/action';
import { showToastSuccess, showError } from '../../utils';
import { store } from '../../store/Store';
import { setOrderList } from '../../store/vendor/reducer';
import { CommonActions } from '@react-navigation/native';
const OrderSummaryModal = ({
  visible = false,
  handleVisible = () => {},
  orderData = {}
}) => {
  const [loader, setLoader] = useState(false);
  const orderListData = useSelector((State) => State.vendor.orderList);
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();
  const toggleModal = () => {
    handleVisible(!visible);
  };

  const handleAcceptOrderAndCancle = async (item) => {
    try {
      setLoader(true);
      let obj = {
        order_id: orderData?.orderId,
        status: item
      };
      orderAcceptAndCancel(obj)
        .then((response) => {
          toggleModal();
          showToastSuccess(response?.data?.message);
          if (orderListData && Object.keys(orderListData)?.length > 0) {
            const updatedOrders = orderListData?.map((order) =>
              order?.order_id === orderData?.orderId
                ? {
                    ...order,
                    status: item
                  }
                : order
            );
            store.dispatch(setOrderList(updatedOrders));
          }
        })
        .catch((error) => {
          showError(error?.response?.data?.message);
        })
        .finally(() => {
          setLoader(false);
        });
    } catch (error) {
      setLoader(false);
      showError(error?.response?.data?.message);
    }
  };

  const navigateAllOrders = () => {
    toggleModal();
    navigationRef.dispatch(
      CommonActions.navigate('Orders', { screen: 'Orderes' })
    );
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={toggleModal}
    >
      <TouchableOpacity
        style={[styles.closeOverlay, styles.modalOverlay]}
        activeOpacity={1}
        onPress={toggleModal}
      />
      <View style={[styles.modalContent, styles.modalContent2(bottom)]}>
        <LinearGradient
          colors={[Colors.orange10, Colors.orange30]}
          style={[styles.orderBtn]}
        >
          <View style={styles.orderStyle}>
            <Text style={styles.orderId}>
              {t(APP_LANGUAGE_CONSTANT.ORDER_DETAILS)}
            </Text>
            <Text style={styles.status}>
              {t(APP_LANGUAGE_CONSTANT.STATUS)} :
              <Text style={styles.statusNew}>
                {' ' + t(APP_LANGUAGE_CONSTANT.NEW)}
              </Text>
            </Text>
          </View>
        </LinearGradient>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* <Text style={styles.sectionTitle}>
              {t(APP_LANGUAGE_CONSTANT.ORDER_SUMMARY)}
            </Text> */}

          <View
            style={[
              ApplicationStyles.rowAlignCenterJustifyBetween,
              styles.orderdetail
            ]}
          >
            <Text style={styles.sectionSubtitle}>
              {t(APP_LANGUAGE_CONSTANT.ORDER_SUMMARY)}
            </Text>
            <Text style={styles.newGreen}>{t(APP_LANGUAGE_CONSTANT.NEW)}</Text>
          </View>
          <View style={styles.OrderDateCon}>
            <Text style={styles.detailLabel}>Order Date</Text>
            <Text style={styles.detailLabel}>
              {moment(orderData?.orderDate)?.format('Do MMMM YYYY')}
            </Text>
          </View>
          <View style={styles.OrderDateCon}>
            <Text style={styles.detailLabel}>Order ID</Text>
            <Text style={styles.detailLabel}>{orderData?.orderId || ''}</Text>
          </View>

          <View style={styles.OrderDateCon}>
            <Text style={styles.detailLabel}>Subtotal (5)</Text>
            <Text style={styles.detailLabel}>
              {orderData?.subTotal || 0} AED
            </Text>
          </View>
          <View style={styles.OrderDateCon}>
            <Text style={styles.detailLabel}>VAT & Fees (5%)</Text>
            <Text style={[styles.detailLabel, styles.redAED]}>
              {orderData?.vat_fee || 0} AED
            </Text>
          </View>
          <View style={styles.OrderDateCon}>
            <Text style={styles.detailLabel}>Discount</Text>
            <Text style={[styles.detailLabel, styles.redAED]}>
              {orderData?.discount || 0} AED
            </Text>
          </View>
          <View style={styles.totalBorder} />
          <View style={styles.OrderDateCon}>
            <Text style={styles.totalLabel}>
              {t(APP_LANGUAGE_CONSTANT.TOTAL)}
            </Text>
            <Text style={styles.totalLabel}>{orderData?.total || 0} AED</Text>
          </View>
        </ScrollView>

        <TouchableOpacity
          style={styles.productsButton}
          onPress={navigateAllOrders}
        >
          <Text style={styles.productsButtonText}>
            {t(APP_LANGUAGE_CONSTANT.ALL_PRODUCT)}
          </Text>
          <Image source={AppIcon.arrowAllProduct} style={styles.arrowImg} />
        </TouchableOpacity>

        {loader ? (
          <View style={[styles.ActivityContainer]}>
            <ActivityIndicator color={Colors.orange30} size={25} />
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => handleAcceptOrderAndCancle('cancelled')}
            >
              <Text style={styles.cancelButtonText}>
                {t(APP_LANGUAGE_CONSTANT.CANCEL)}
              </Text>
            </TouchableOpacity>
            <LinearGradient
              colors={[Colors.orange10, Colors.orange30]}
              style={styles.acceptButton}
            >
              <TouchableOpacity
                onPress={() => handleAcceptOrderAndCancle('orderaccepted')}
              >
                <Text style={styles.acceptButtonText}>
                  {t(APP_LANGUAGE_CONSTANT.ACCEPT_ORDER)}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  newGreen: {
    color: Colors.green10,
    fontFamily: Fonts.type.montserratMedium,
    fontWeight: Fonts.Weight.seven
  },
  // eslint-disable-next-line react-native/no-unused-styles
  absoluteFill: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  ActivityContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeOverlay: {
    zIndex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  OrderDateCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(5)
  },
  totalBorder: {
    marginVertical: verticalScale(7),
    borderColor: Colors.gray110,
    borderWidth: 0.8
  },
  arrowImg: {
    height: (height * 0.1) / 6,
    width: (width * 0.2) / 5,
    marginHorizontal: horizontalScale(7)
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.black40
  },
  orderBtn: {
    borderRadius: 30,
    paddingVertical: verticalScale(5)
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(20),
    alignItems: 'center',
    width: width,
    height: height * 0.53
  },
  modalContent2: (bottom) => ({
    paddingBottom: bottom,
    zIndex: 2,
    position: 'absolute',
    bottom: 0
  }),
  orderId: {
    fontSize: Fonts.size.semi,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: Fonts.type.montserrat
  },
  status: {
    fontSize: Fonts.size.semi,
    color: Colors.white,
    fontFamily: Fonts.type.montserratSemiBold
  },
  statusNew: {
    fontSize: Fonts.size.semi,
    fontFamily: Fonts.type.montserratSemiBold
  },
  scrollView: {
    width: width * 0.88,
    marginVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(10)
  },
  sectionSubtitle: {
    fontSize: Fonts.size.uprSemi,
    color: Colors.black10,
    fontWeight: Fonts.Weight.medium,
    fontFamily: Fonts.type.robotoMedium,
    marginBottom: verticalScale(5)
  },
  detailLabel: {
    fontSize: Fonts.size.sminy,
    fontFamily: Fonts.type.robotoMedium,
    fontWeight: Fonts.Weight.low,
    color: Colors.gray20
  },
  totalLabel: {
    fontSize: Fonts.size.uprSemi,
    fontFamily: Fonts.type.robotoMedium,
    fontWeight: Fonts.Weight.medium,
    color: Colors.black70
  },

  redAED: {
    color: Colors.red90
  },

  productsButton: {
    borderWidth: 1,
    borderColor: Colors.darkBlue,
    borderRadius: 20,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(16),
    marginBottom: verticalScale(15),
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  productsButtonText: {
    color: Colors.darkBlue,
    fontSize: Fonts.size.medium,
    fontWeight: Fonts.Weight.medium,
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  cancelButton: {
    flex: 1,
    marginRight: horizontalScale(10),
    paddingVertical: verticalScale(11),
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.orange10,
    alignItems: 'center'
  },
  acceptButton: {
    flex: 1,
    marginLeft: horizontalScale(3),
    paddingVertical: verticalScale(11),
    borderRadius: 15,
    alignItems: 'center'
  },
  cancelButtonText: {
    color: Colors.orange10,
    fontSize: Fonts.size.f20,
    fontWeight: Fonts.Weight.semi,
    fontFamily: Fonts.type.montserrat
  },
  acceptButtonText: {
    color: Colors.white,
    fontSize: Fonts.size.f20,
    fontWeight: Fonts.Weight.semi,
    fontFamily: Fonts.type.montserrat
  },
  orderStyle: {
    flexDirection: 'row',
    borderRadius: 30,
    width: '100%',
    justifyContent: 'space-between',
    // padding:
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10)
  },
  orderdetail: {
    marginVertical: verticalScale(4)
  }
});

export default OrderSummaryModal;
