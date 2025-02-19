import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import {
  GreenCheckbox,
  ProductEmpty,
  RetailerLocation,
  WhiteTrash
} from '../../assets/icon';
import { CommonModal, Container } from '../../components';
import EmptyScreen from '../../components/EmptyScreen';
import SearchBar from '../../components/SearchBar';
import AcceptOrderModal from '../../components/vender/AcceptOrderModal';
import CellSwipeable from '../../components/vender/CellSwipeable';
import { APP_LANGUAGE_CONSTANT, PRODUCT_REQUEST } from '../../constants';
import { useDebounce } from '../../hooks';
import { API_CONSTANT } from '../../services/ApiConstant';
import { getRequestProduct, putRequestVendor } from '../../store/vendor/action';
import { Colors, Fonts, horizontalScale, verticalScale } from '../../theme';
import { PAGE_SPACING } from '../../theme/ApplicationStyles';
import { showError, showToastSuccess } from '../../utils';
import CommonLoader from '../../components/CommonLoader';

const emptyData = {
  img: ProductEmpty,
  title: 'No Products Available',
  desc: 'It seems like you haven’t added any item in your product list yet.'
};

const RetailPriceOffer = ({ navigation }) => {
  const { t } = useTranslation();
  const offerPriceListData = useSelector(
    (state) => state.vendor.offerPriceList
  );

  const swiperRef = useRef([]);
  const openSwipeableRef = useRef(null);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [totalNoOfProduct, setTotalNoOfProduct] = useState(0);
  const [searchVal, setSearchVal] = useState('');
  const [initialLoader, setInitialLoader] = useState(true);
  const [firstLoader, setFirstLoader] = useState(true);
  const debounce = useDebounce(searchVal, 500);
  const [visible, setVisible] = useState(false);
  const [selectedItemID, setSelectedItemID] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  useEffect(() => {
    setData(offerPriceListData);
  }, [offerPriceListData]);

  useEffect(() => {
    if (searchVal?.trim()?.length >= 3) {
      fetchRequestProduct(1, true);
    } else if (searchVal?.trim()?.length === 0) {
      fetchRequestProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce]);

  const fetchRequestProduct = useCallback(
    (page = 1, isSearch = false) => {
      if (page === 1 && isSearch) {
        setInitialLoader(false);
      }
      try {
        const queryParams = `?search_by_name=${debounce}&pageSize=${API_CONSTANT.LIMIT}&page=${page}`;
        const storeData = debounce?.length > 0;
        getRequestProduct(queryParams, isSearch)
          .then((res) => {
            setTotalNoOfProduct(res?.data?.pagination?.totalCount);
            setPage(page + 1);
            if (storeData) {
              if (page === 1) {
                setData(res?.data?.data || []);
              } else {
                setData((prevData) => [
                  ...prevData,
                  ...(res?.data?.data || [])
                ]);
              }
            }
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
    [debounce]
  );

  const loadMoreData = () => {
    if (totalNoOfProduct > data?.length && !isFetching) {
      setIsFetching(true);
      fetchRequestProduct(page, true);
    }
  };

  const onPressOrder = (obj, item) => {
    closeAllSwipeable();
    setSelectedItemID(item?.created_by);
    setVisible(true);
    // putRequestVendor(obj)
    //   .then((res) => {
    //     setData(data?.filter((item) => item?.uuid !== obj?.request_id));
    //     if (obj?.status === PRODUCT_REQUEST.ACCEPT) {
    //       showToastSuccess(APP_LANGUAGE_CONSTANT.ACCEPT_SUCCESS);
    //       // navigation.navigate(SCREEN_NAME.NEW_ORDER, {
    //       //   uuid: res?.data?.data?.uuid,
    //       //   data: item
    //       // });
    //     } else {
    //       showToastSuccess(APP_LANGUAGE_CONSTANT.DELETE_SUCCESS);
    //     }
    //   })
    //   .catch((err) => {
    //     showError(err);
    //   });
  };
  const onPressOrderDelete = (id) => {
    const obj = {
      request_id: [id],
      status: PRODUCT_REQUEST.REJECT
    };
    closeAllSwipeable();
    putRequestVendor(obj)
      .then((res) => {
        showToastSuccess(res.data.message);
        const removedData = data?.filter((item) => item?.uuid !== id);
        setData(removedData);
        setTotalNoOfProduct(totalNoOfProduct - 1);
      })
      .catch((err) => {
        showError(err);
      });
  };

  const closeAllSwipeable = () => {
    swiperRef.current.forEach((ref) => {
      if (ref && ref.close) {
        ref.close();
      }
    });
  };

  const handleSwipeableWillOpen = (index) => {
    if (
      openSwipeableRef.current &&
      openSwipeableRef.current !== swiperRef.current[index]
    ) {
      openSwipeableRef.current.close();
    }
    openSwipeableRef.current = swiperRef.current[index];
  };

  const _leftAction = (item) => {
    return (
      <Animated.View style={[styles.swipe]}>
        <TouchableOpacity
          style={styles.swipeBtn}
          onPress={() => {
            const obj = {
              request_id: item?.uuid,
              status: PRODUCT_REQUEST.ACCEPT
            };
            onPressOrder(obj, item);
          }}
        >
          <View style={styles.greenTick}>
            <GreenCheckbox />
          </View>
          {/* <View style={styles.circle} /> */}
          <Text style={styles.accept}>Accept</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const _rightAction = (item) => {
    return (
      <Animated.View style={[styles.swipe, { width: horizontalScale(60) }]}>
        <TouchableOpacity
          style={[styles.swipeBtn, styles.swipRightBtn]}
          onPress={() => {
            setOpenModal(true), setDeleteId(item.uuid);
          }}
        >
          <WhiteTrash />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const _renderItem = ({ item, index }) => {
    return (
      <CellSwipeable
        reference={(ref) => (swiperRef.current[index] = ref)} // Assign ref for each Swipeable
        leftAction={() => _leftAction(item)}
        rightAction={() => _rightAction(item)}
        onSwipeableOpenStartDrag={() => handleSwipeableWillOpen(index)}
      >
        <View style={[styles.cellContainer]}>
          <FastImage
            source={{ uri: item?.variantObj?.images[0] }}
            style={styles.image}
          />
          <View style={styles.info}>
            <Text style={styles.name} ellipsizeMode="tail">
              {`${item?.productObj?.brand_id}  ${item?.productObj?.title}`}
            </Text>
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>
                {`${t(APP_LANGUAGE_CONSTANT.REQ_PRICE)}`}
                <Text style={[styles.currency]}>
                  {` ${item?.price} ${t(APP_LANGUAGE_CONSTANT.AED)}`}
                </Text>
              </Text>
              <Text>|</Text>
              <Text style={styles.priceText}>Qty : {item?.quantity}</Text>
            </View>
            <View style={styles.locationContainer}>
              <RetailerLocation width={18} height={20} color={Colors.gray10} />
              <Text style={styles.locationText}>
                {item?.outletObj?.address}
              </Text>
            </View>
          </View>
        </View>
      </CellSwipeable>
    );
  };

  const headerComponent = () => (
    <>
      <View style={styles.pageSpacing}>
        <SearchBar value={searchVal} onChangeValue={setSearchVal} />
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Current Orders</Text>
          <Text style={styles.headerCount}>({totalNoOfProduct})</Text>
        </View>
      </View>
    </>
  );

  const handleRefresh = () => {
    setRefreshing(true);
    fetchRequestProduct();
  };

  return (
    <Container
      title={t(APP_LANGUAGE_CONSTANT.RETAILER_PRICE_OFFER)}
      scrollable={false}
      chidernContainerStyle={styles.container}
    >
      {firstLoader ? (
        // <ActivityIndicator
        //   size={'large'}
        //   color={Colors.orange10}
        //   style={styles.activeView}
        // />
        <CommonLoader loaderStyle={styles.activeView} isLoading={firstLoader} />
      ) : data?.length === 0 && initialLoader ? (
        <EmptyScreen data={emptyData} />
      ) : (
        <FlatList
          data={data}
          extraData={data}
          ListHeaderComponent={headerComponent()}
          keyExtractor={(item, index) => `currentOrders${index}`}
          showsVerticalScrollIndicator={false}
          renderItem={_renderItem}
          contentContainerStyle={styles.contentContainerStyle}
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
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          onEndReachedThreshold={0.5}
          onEndReached={loadMoreData}
        />
      )}
      <View style={styles.manageGap} />
      <AcceptOrderModal
        visible={visible}
        setVisible={setVisible}
        id={selectedItemID}
      />
      <CommonModal
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
        modalHeading={t(APP_LANGUAGE_CONSTANT.ARE_YOU_SURE)}
        modalTitle={t(APP_LANGUAGE_CONSTANT.DELETE_PERMANENTLY)}
        handleSubmit={() => {
          onPressOrderDelete(deleteId);
          setOpenModal(false);
        }}
      />
    </Container>
  );
};

export default RetailPriceOffer;

const styles = StyleSheet.create({
  activeView: {
    marginTop: verticalScale(20)
  },
  contentContainerStyle: {
    gap: verticalScale(16),
    paddingBottom: verticalScale(50)
  },

  container: {
    // marginTop: 0
  },
  pageSpacing: {
    paddingHorizontal: PAGE_SPACING,
    marginTop: verticalScale(30)
  },
  headerContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginVertical: verticalScale(16),
    gap: horizontalScale(6)
  },
  headerTitle: {
    fontFamily: Fonts.type.montserratBold,
    fontSize: Fonts.size.semi,
    color: Colors.black
  },
  headerCount: {
    fontFamily: Fonts.type.montserratBold,
    fontSize: Fonts.size.semi,
    color: Colors.primary
  },
  cellContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(12),
    paddingHorizontal: PAGE_SPACING,
    backgroundColor: Colors.white
  },
  image: {
    height: verticalScale(70),
    width: horizontalScale(70),
    borderRadius: 10
  },
  name: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.semi,
    color: Colors.black70,
    flexWrap: 'wrap'
  },
  priceContainer: {
    flexDirection: 'row',
    gap: horizontalScale(6)
  },
  priceText: {
    ontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.small,
    color: Colors.black70
  },
  currency: {
    ontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.small,
    color: Colors.green10
  },
  locationContainer: {
    flexDirection: 'row',
    width: '85%',
    gap: horizontalScale(4)
  },
  locationText: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.small,
    color: Colors.gray10
  },
  info: {
    gap: verticalScale(6)
  },
  greenTick: {
    marginBottom: verticalScale(15)
  },
  manageGap: {
    height: verticalScale(30)
  },
  swipe: {
    justifyContent: 'center',
    alignItems: 'center',
    width: horizontalScale(80)
  },
  swipeBtn: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.green80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  swipRightBtn: {
    backgroundColor: Colors.red40
  },
  accept: {
    color: Colors.white,
    fontSize: Fonts.size.semi,
    fontFamily: Fonts.type.robotoMedium,
    position: 'absolute',
    bottom: verticalScale(10)
  }
});
