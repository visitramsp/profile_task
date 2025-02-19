import React, {
  useCallback,
  useEffect,
  useState,
  useLayoutEffect
} from 'react';
import { StyleSheet, View } from 'react-native';
import { Container } from '../../../components';
import ItemCountText from '../../../components/headers/ItemCountText';
import OrderedProductList from './OrderDetailsList';
import { verticalScale } from '../../../theme';
import OrderSummary from './OrderSummary';
import PaymentSummary from './PaymentSummary';
import { APP_LANGUAGE_CONSTANT } from '../../../constants';
import ShipmentSummary from './ShipmentSummary';
import { getVendorOrderDetails } from '../../../store/app/action';
import { useTranslation } from 'react-i18next';
import { showError, showToastSuccess } from '../../../utils';
import CustSmallButton from '../../../components/CustSmallButton';
import { useSelector } from 'react-redux';
import { orderAcceptAndCancel } from '../../../store/vendor/action';
import LoadingIndicator from '../../../components/common/LoadingIndicator';
import { useNavigation } from '@react-navigation/native';
import { setOrderList } from '../../../store/vendor/reducer';
import { store } from '../../../store/Store';
import { SkipReloadStore } from '../../../staticStore/SkipReloadStore';
export default function OrderDetails(props) {
  const { t } = useTranslation();
  const { id, orderId } = props.route.params;
  const navigation = useNavigation();
  const { userDetail } = useSelector((state) => state.user);

  const [data, setData] = useState([]);
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchData();
    store.dispatch(setOrderList({}));
  }, [fetchData]);

  useLayoutEffect(() => {
    SkipReloadStore.vendor_OrderEvent(true);
  }, []);

  const fetchData = useCallback(() => {
    getVendorOrderDetails(`order_id=${id}`)
      .then((res) => {
        setData(res?.data?.data);
        setStatus(res?.data?.data?.status === 'new' ? true : false);
      })
      .catch((err) => {
        showError(err);
      });
  }, [id]);

  const BUTTON_ARR = [
    {
      btnName: t(APP_LANGUAGE_CONSTANT.CANCEL),
      gradiantColor: true,
      loading: false
    },
    {
      btnName: t(APP_LANGUAGE_CONSTANT.ACCEPT_ORDER),
      gradiantColor: false,
      loading: false
    }
  ];
  const handleAcceptOrderAndCancle = async (item) => {
    try {
      setLoading(true);
      let obj = {
        order_id: data?.order_id,
        status: item
      };
      orderAcceptAndCancel(obj)
        .then((response) => {
          setLoading(false);
          showToastSuccess(response?.data?.message);
          store.dispatch(setOrderList({ orderId: orderId, status: item }));
          navigation.goBack();
        })
        .catch((error) => {
          setLoading(false);
          showError(error?.response?.data?.message);
        });
    } catch (error) {
      setLoading(false);
      showError(error?.response?.data?.message);
    }
  };

  const goProductDetails = (item) => {
    navigation.navigate('productDetails', {
      id: item?.uuid,
      categoryId: item?.category_id,
      isOrderView: false
    });
  };
  return (
    <Container title={t(APP_LANGUAGE_CONSTANT.ORDER_DETAILS)}>
      <LoadingIndicator visible={loading} />
      <View style={styles.section}>
        <ItemCountText
          title={t(APP_LANGUAGE_CONSTANT.PRODUCT_DETAILS)}
          number={data?.product_arr?.length}
        />
        <OrderedProductList
          data={data?.product_arr}
          productDetails={(item) => goProductDetails(item)}
        />
      </View>
      <View style={styles.section}>
        <ItemCountText
          title={t(APP_LANGUAGE_CONSTANT.ORDER_SUMMARY)}
          isnumberPresent={false}
        />
        <OrderSummary data={data} />
      </View>
      <View style={styles.section}>
        <ItemCountText
          title={t(APP_LANGUAGE_CONSTANT.SHIPMENT_DETAILS)}
          isnumberPresent={false}
        />
        <ShipmentSummary data={data} />
      </View>
      <View style={styles.section}>
        <ItemCountText
          title={t(APP_LANGUAGE_CONSTANT.PAYMENT_DETAILS)}
          isnumberPresent={false}
        />
        <PaymentSummary data={data} />
      </View>
      {status && userDetail.user_type !== 'retailer' ? (
        <View style={styles.buttonView}>
          {BUTTON_ARR?.map((item, index) => (
            <View key={index} style={styles.btnView}>
              <CustSmallButton
                isLoading={item.loading}
                btnTitle={item.btnName}
                gradiantColor={item.gradiantColor}
                onPress={() =>
                  index === 1
                    ? handleAcceptOrderAndCancle('orderaccepted')
                    : handleAcceptOrderAndCancle('cancelled')
                }
              />
            </View>
          ))}
        </View>
      ) : null}
      <View style={styles.manageSpace} />
    </Container>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: verticalScale(24),
    marginBottom: verticalScale(8)
  },
  manageSpace: {
    height: verticalScale(75)
  },
  buttonView: {
    marginVertical: verticalScale(15),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnView: {
    width: '48%'
  }
});
