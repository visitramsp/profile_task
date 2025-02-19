/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable complexity */
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container } from '../../../components';
import SearchBar from '../../../components/SearchBar';
import ItemCountText from '../../../components/headers/ItemCountText';
import ListFilterOptions from '../../../components/listContent/ListFilterOptions';
import OrderList from './OrderList';
import {
  ApplicationStyles,
  Colors,
  horizontalScale,
  PAGE_SPACING,
  verticalScale
} from '../../../theme';
import { getVendorOrderData } from '../../../store/app/action';
import { APP_LANGUAGE_CONSTANT } from '../../../constants';
import { useDebounce } from '../../../hooks';
import { useTranslation } from 'react-i18next';
import { showError } from '../../../utils';
import { API_CONSTANT } from '../../../services/ApiConstant';
import EmptyScreen from '../../../components/EmptyScreen';
import { CartEmpty } from '../../../assets/icon';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { SkipReloadStore } from '../../../staticStore/SkipReloadStore';
import CommonLoader from '../../../components/CommonLoader';
import { store } from '../../../store/Store';
import { setOrderList } from '../../../store/vendor/reducer';
const filterOption = [
  { name: 'All', value: '' },
  { name: 'Dispatched', value: 'dispatched' },
  { name: 'New', value: 'new' },
  { name: 'Out For Delivery', value: 'outfordelivery' },
  { name: 'Processing', value: 'processing' },
  { name: 'Cancelled', value: 'cancelled' },
  { name: 'Delivered', value: 'delivered' }
];

const emptyData = {
  img: CartEmpty,
  title: 'Your Orders is Empty',
  desc: 'Looks like you haven’t added any item to your wishlist yet'
};

export default function Orderes({ route }) {
  const { t } = useTranslation();
  const orderListData = useSelector((state) => state.vendor.orderList);
  const retailerId = route?.params?.retailer_id;
  const [selectedFilterName, setSelectedFilterName] = useState('All');
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [totalNoOfProduct, setTotalNoOfProduct] = useState(0);
  const [currentTab, setCurrentTab] = useState('');
  const [initialLoader, setInitialLoader] = useState(true);
  const [firstLoader, setFirstLoader] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const debounce = useDebounce(search, 500);
  const [isActive, setIsActive] = useState(false);

  const subscribe = () => {
    setTimeout(() => {
      setIsActive(true);
    }, 300);
  };

  const unsubscribe = () => {
    setTimeout(() => {
      store.dispatch(setOrderList({}));
      setIsActive(false);
    }, 300);
  };

  useFocusEffect(
    useCallback(() => {
      if (SkipReloadStore.vendor_OrderList) {
        SkipReloadStore.vendor_OrderEvent(false);
      } else {
        subscribe();
      }
      return () => unsubscribe();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  // eslint-disable-next-line complexity
  useEffect(() => {
    if (search?.trim()?.length >= 3) {
      fetchOrderData(1, currentTab, true);
    } else if (orderListData?.status) {
      const updatedOrders = data.map((order) =>
        order?.order_id === orderListData?.orderId
          ? {
              ...order,
              status: orderListData?.status
            }
          : order
      );
      setData([...updatedOrders]);
      store.dispatch(setOrderList({}));
    } else if (
      search?.trim()?.length === 0 &&
      orderListData?.status === undefined
    ) {
      isActive && fetchOrderData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce, fetchOrderData, isActive, orderListData?.status]);

  const retailer_id = retailerId === undefined ? '' : retailerId;

  const fetchOrderData = useCallback(
    (page = 1, filter = currentTab, isSearch = false) => {
      if (page === 1 && isSearch) {
        setInitialLoader(false);
      }
      try {
        const queryParams = `?pageSize=${API_CONSTANT.LIMIT}&page=${page}&status=${filter}&searchKeyword=${debounce}&retailer_id=${retailer_id}`;
        getVendorOrderData(queryParams)
          .then((res) => {
            if (page === 1) {
              setData(res?.data?.data || []);
              // store.dispatch(setOrderList(res?.data?.data || []));
            } else {
              // store.dispatch(
              //   setOrderList([...orderListData, ...(res?.data?.data || [])])
              // );
              setData((prevData) => [...prevData, ...(res?.data?.data || [])]);
            }
            setTotalNoOfProduct(res?.data?.pagination?.totalItems);
            setPage(page + 1);
            setFirstLoader(false);
          })
          .catch((err) => {
            showError(err);
            setFirstLoader(false);
          })
          .finally(() => {
            setRefreshing(false);
            setIsFetching(false);
          });
      } catch (error) {
        setIsFetching(false);

        setFirstLoader(false);
        showError(error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debounce]
  );
  const loadMoreData = () => {
    if (totalNoOfProduct > data?.length && !isFetching) {
      setIsFetching(true);
      fetchOrderData(page, currentTab);
    }
  };

  const onFilterOption = (item) => {
    setSelectedFilterName(item.name);
    setCurrentTab(item.value);
    fetchOrderData(1, item.value, true);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchOrderData(1, currentTab, true);
  };

  const headerComponent = () => (
    <View style={styles.mainView}>
      <View style={styles.header}>
        <SearchBar value={search} onChangeValue={setSearch} />
        <ItemCountText
          title={t(APP_LANGUAGE_CONSTANT.SEARCH_HISTORY)}
          number={search?.length > 0 ? data?.length : totalNoOfProduct}
        />
      </View>

      {retailer_id?.length === 0 && (
        <ListFilterOptions
          data={filterOption}
          selectedName={selectedFilterName}
          style={{ paddingTop: verticalScale(15) }}
          contentContainerStyle={styles.contentContainerStyle}
          onSelectOption={onFilterOption}
        />
      )}
    </View>
  );
  return (
    <Container
      title={t(APP_LANGUAGE_CONSTANT.ORDERS)}
      scrollable={false}
      chidernContainerStyle={styles.container}
    >
      {firstLoader ? (
        // <ActivityIndicator
        //   size={'large'}
        //   color={Colors.orange10}
        //   style={styles.activeView}
        // />
        <CommonLoader
          isLoading={firstLoader}
          loaderStyle={ApplicationStyles.centerLoader}
        />
      ) : data?.length === 0 && initialLoader ? (
        <EmptyScreen data={emptyData} />
      ) : (
        <>
          <OrderList
            data={data}
            refreshing={refreshing}
            handleRefresh={handleRefresh}
            ListHeaderComponent={headerComponent()}
            // eslint-disable-next-line react/no-unstable-nested-components
            ListFooterComponent={() => {
              return (
                // <ActivityIndicator
                //   size={30}
                //   animating={isFetching}
                //   color={Colors.primary20}
                // />
                <CommonLoader
                  size={30}
                  isLoading={isFetching}
                  color={Colors.primary20}
                />
              );
            }}
            onEndReachedThreshold={0.5}
            onEndReached={loadMoreData}
          />
        </>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: horizontalScale(30)
  },
  container: {
    marginTop: 0
  },
  mainView: {
    // height: verticalScale(150),
    marginTop: verticalScale(30)
  },
  header: {
    paddingHorizontal: PAGE_SPACING
  }
});
