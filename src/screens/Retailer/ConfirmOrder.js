import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { ButtonComp, Container } from '../../components';
import DropDownProduct from '../Vendor/DropDownProduct';
import Summary from '../Vendor/summary';
import Shipment from '../Vendor/shipment';
import PaymentMethod from '../Vendor/Payment';
import { useTranslation } from 'react-i18next';
import { APP_LANGUAGE_CONSTANT } from '../../constants';
import { fetchCartList, orderBuyCart } from '../../store/retailer/action';
import styles from '../cartScreen/CartScreen.styles';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { CartEmpty } from '../../assets/icon';
import EmptyScreen from '../../components/EmptyScreen';
import { showError, showToastSuccess } from '../../utils';
import { CartStore } from '../../staticStore/CartStore';
import CommonLoader from '../../components/CommonLoader';

const emptyData = {
  img: CartEmpty,
  title: 'Your Cart is Empty',
  desc: 'Looks like you haven’t added any item to your cart yet'
};
const ConfirmOrder = ({ navigation }) => {
  const outletData = useSelector((state) => state?.user?.userDetail);
  const { t } = useTranslation();
  const [selectedMethod, setSelectedMethod] = useState('Advance Pay');
  const [loading, setLoading] = useState(true);
  const [isLoading1, setIsLoading1] = useState(false);
  const [orderDetail, setOrderDetail] = useState({});
  const [orderList, setOrderList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [isActive, setIsActive] = useState(false);

  const subscribe = () => {
    setTimeout(() => {
      setIsActive(true);
    }, 300);
  };

  const unsubscribe = () => {
    setTimeout(() => {
      setIsActive(false);
    }, 300);
  };

  useFocusEffect(
    useCallback(() => {
      subscribe();
      return () => unsubscribe();
    }, [])
  );

  useEffect(() => {
    isActive && getCartList();
  }, [getCartList, isActive]);

  const getCartList = useCallback(() => {
    try {
      fetchCartList()
        .then((res) => {
          setLoading(false);
          setOrderDetail(res?.data?.order_details);
          const cartList = res?.data?.data.map(
            ({ quantity, productObj, variantObj, uuid }) => ({
              quantity: Number(quantity),
              product_id: productObj?.uuid,
              variant_id: variantObj?.uuid,
              price: variantObj?.price_details,
              brandName: productObj?.brand_id,
              mainVariantTitle: variantObj?.mainVariant?.name,
              mainVariantValue: variantObj?.mainVariant?.value,
              productName: productObj?.title,
              moq: variantObj?.minimum_order_quantity,
              perUnit: variantObj?.price_details,
              img: variantObj?.images?.[0],
              id: uuid,
              maxQuantity: variantObj?.warehouse_arr?.reduce((acc, item) => {
                const qty = parseInt(item.quantity, 10);
                return acc + qty;
              }, 0)
            })
          );
          CartStore.storeAllData(cartList);
          setOrderList(cartList);
        })
        .catch((_err) => {
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
    }
  }, []);

  const totalPrice = useMemo(() => {
    return orderList?.reduce((acc, item) => {
      const quantity = parseInt(item.quantity, 10);
      const price = item.price;
      return acc + quantity * price;
    }, 0);
  }, [orderList]);

  const handleSubmit = () => {
    const productDataFormate = orderList?.map(
      ({ quantity, product_id, variant_id }) => ({
        quantity: Number(quantity),
        product_id: product_id,
        variant_id: variant_id
      })
    );
    const reqBody = {
      outlet_id: outletData?.addresses?.[0]?.uuid,
      order_detail: productDataFormate,
      sub_total: totalPrice,
      delivery_charges: '0', //static
      payment_method: selectedMethod,
      payment_status: 'complete', //static
      card_details: 'asdadadad', //static
      card_data: [
        {
          id: 'asd', //static
          payment: 'a212' //static
        }
      ],
      txn_id: 'aaaaaaaa23123131sdw3123sdf23ea', //static
      delivery_instructions: 'hello world', //static
      payment_id: '', //static
      country_code: 'UAE' //static
    };
    setIsLoading1(true);

    orderBuyCart(reqBody)
      .then((response) => {
        CartStore.removeAllItem();
        showToastSuccess(response?.data?.message);
        navigation.navigate('Dashboard');
      })
      .catch((error) => {
        showError(error);
      })
      .finally(() => {
        setIsLoading1(false);
      });
  };

  const onRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setRefreshing(false);
      getCartList();
      setRefreshing(false);
      setLoading(false);
    }, 2000);
  };

  return (
    <Container
      horizontalScace={false}
      title={t(APP_LANGUAGE_CONSTANT.CART)}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {loading ? (
        // <ActivityIndicator size={'large'} color={Colors.orange10} />
        <CommonLoader isLoading={loading} />
      ) : orderList?.length === 0 ? (
        <EmptyScreen data={emptyData} />
      ) : (
        <View style={styles.mainView}>
          <View style={styles.productDetailsView}>
            <DropDownProduct
              isDisable
              data={orderList}
              title={t(APP_LANGUAGE_CONSTANT.PRODUCT_DETAILS)}
              setOrderList={setOrderList}
            />
            <Summary
              userType
              totalPrice={totalPrice}
              vatCharge={orderDetail?.vat_fee}
              data={orderDetail}
              discount={orderDetail?.discount}
            />
            <Shipment userType navigationDisabled data={outletData} />
          </View>
          <PaymentMethod
            userType
            setSelectedMethod={setSelectedMethod}
            selectedMethod={selectedMethod}
          />
          <View style={styles.btnView}>
            <ButtonComp
              isLoading={isLoading1}
              btnTitle={t(APP_LANGUAGE_CONSTANT.PROCESS_TO_BUY)}
              onPress={handleSubmit}
            />
          </View>
        </View>
      )}
    </Container>
  );
};

export default ConfirmOrder;
