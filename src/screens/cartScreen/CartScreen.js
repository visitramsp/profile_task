import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { RefreshControl, View } from 'react-native';
import { ButtonComp, Container } from '../../components';
import DropDownProduct from '../Vendor/DropDownProduct';
import Shipment from '../Vendor/shipment';
import Summary from '../Vendor/summary';
import { useTranslation } from 'react-i18next';
import { APP_LANGUAGE_CONSTANT, SCREEN_NAME } from '../../constants';
import { deleteCartItem, updateCartItem } from '../../store/retailer/action';
import styles from './CartScreen.styles';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { CartEmpty } from '../../assets/icon';
import EmptyScreen from '../../components/EmptyScreen';
import { showError, showToastError, showToastSuccess } from '../../utils';
import { CartStore } from '../../staticStore/CartStore';
import CommonLoader from '../../components/CommonLoader';

const emptyData = {
  img: CartEmpty,
  title: 'Your Cart is Empty',
  desc: 'Looks like you haven’t added any item to your cart yet'
};
const CartScreen = ({ navigation }) => {
  const outletData = useSelector((state) => state?.user?.userDetail);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [btnSpinner, setBtnSpinner] = useState(false);
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

  const totalPrice = useMemo(() => {
    return orderList?.reduce((acc, item) => {
      const quantity = parseInt(item.quantity, 10);
      const price = item.price;
      return acc + quantity * price;
    }, 0);
  }, [orderList]);

  useEffect(() => {
    isActive && getCartList();
  }, [getCartList, isActive]);

  const getCartList = useCallback(() => {
    CartStore.getItemList()
      .then((ele) => {
        setOrderList(ele);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleNavigate = () => {
    navigation.navigate(SCREEN_NAME.CONFIRM_ORDER);
  };

  const deleteProductFromCart = async (item) => {
    try {
      const data = {
        product_id: item?.product_id,
        variant_id: item?.variant_id
      };

      deleteCartItem(data)
        .then((res) => {
          CartStore.removeSpecificItem(item);
          setOrderList((prevItems) =>
            prevItems.filter((row) => row.id !== item?.id)
          );
          showToastSuccess(res?.data?.message);
        })
        .catch((err) => {
          showError(err);
        });
    } catch (error) {
      showError(error);
    }
  };

  const confirmOrderEvent = () => {
    setBtnSpinner(true);
    try {
      const data = orderList
        ?.filter((ele) => !ele?.isOutStock)
        ?.map(({ quantity, id }) => ({
          quantity,
          cart_id: id
        }));
      updateCartItem({ arr: data })
        .then((res) => {
          let titleList = [];
          let tempData = orderList?.map((ele) => {
            let index = res?.data?.data?.findIndex((ele2) => ele2 === ele?.id);
            if (index === -1) {
              return { ...ele };
            } else {
              titleList?.push(ele?.productName);
              return {
                ...ele,
                isOutStock: true
              };
            }
          });
          handleNavigate();
          if (titleList?.length > 0) {
            CartStore.storeAllData(tempData);
            showToastError(
              t(APP_LANGUAGE_CONSTANT.OUT_STOCK_MSG_QTY, {
                title: titleList?.join(', ')
              })
            );
          } else {
            showToastSuccess(res?.data?.message);
          }
        })
        .catch((err) => {
          showError(err);
        })
        .finally(() => {
          setBtnSpinner(false);
        });
    } catch (error) {
      setBtnSpinner(false);
      showError(error);
    }
  };

  const onRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setRefreshing(false);
      CartStore.initialSetup();
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
        <CommonLoader isLoading={loading} loaderStyle={styles.centerLoader} />
      ) : // <ActivityIndicator size={'large'} color={Colors.orange10}/>
      orderList?.length === 0 ? (
        <EmptyScreen data={emptyData} />
      ) : (
        <View style={styles.mainView}>
          <View style={styles.productDetailsView}>
            <DropDownProduct
              data={orderList}
              title={t(APP_LANGUAGE_CONSTANT.PRODUCT_DETAILS)}
              setOrderList={setOrderList}
              deleteOnPress={deleteProductFromCart}
            />
            <Shipment
              userType
              data={outletData}
              change={() => navigation.navigate('warehouseScreen')}
            />
            <Summary userType showOnlyTotal totalPrice={totalPrice} />
          </View>
          <View style={styles.btnView}>
            <ButtonComp
              isLoading={btnSpinner}
              btnTitle={t(APP_LANGUAGE_CONSTANT.CONFIRM_ORDER)}
              onPress={confirmOrderEvent}
            />
          </View>
        </View>
      )}
    </Container>
  );
};

export default CartScreen;
