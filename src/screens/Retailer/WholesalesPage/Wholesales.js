/* eslint-disable complexity */
import React, {
  useCallback,
  useEffect,
  useState,
  useLayoutEffect
} from 'react';
import { FlatList, StyleSheet, View, RefreshControl } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors, horizontalScale, verticalScale } from '../../../theme';
import {
  fetchProduct,
  getFlashSalesList,
  updateCartQuantity
} from '../../../store/retailer/action';
import ApplicationStyles from '../../../theme/ApplicationStyles';
import SearchBar from '../../../components/SearchBar';
import ItemCountText from '../../../components/headers/ItemCountText';
import CategoriesListContent from '../../../components/listContent/Categories';
import ListFilterOptions from '../../../components/listContent/ListFilterOptions';
import { Container } from '../../../components';
import { ProductEmpty } from '../../../assets/icon';
import { APP_LANGUAGE_CONSTANT, SCREEN_NAME } from '../../../constants';
import RenderWholesaleProduct from './RenderWholesaleProduct';
import { useDebounce } from '../../../hooks';
import { showError, showToastSuccess } from '../../../utils';
import { useSelector } from 'react-redux';
import { API_CONSTANT } from '../../../services/ApiConstant';
import EmptyScreen from '../../../components/EmptyScreen';
import { CartStore } from '../../../staticStore/CartStore';
import { SkipReloadStore } from '../../../staticStore/SkipReloadStore';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CommonLoader from '../../../components/CommonLoader';
import { getCategoryList } from '../../../store/app/action';

const filterList = [
  { name: 'All', id: 1, value: '' },
  { name: 'Popular', id: 2, value: 'popular' },
  { name: 'Top Sales', id: 3, value: 'top_sales' },
  { name: 'Features', id: 4, value: 'features' }
];

const emptyData = {
  img: ProductEmpty,
  title: 'No Products Available',
  desc: 'It seems like you haven’t added any item in your product list yet.'
};

// eslint-disable-next-line complexity
export default function WholesaleScreen({ route }) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const categoryData = route?.params?.categoryData;
  const reduxResCatData = useSelector((state) => state.app.categoryList);
  const wholesalesData = useSelector(
    (state) => state?.retailer?.wholesalesProductList
  );
  const [tab, setTab] = useState('All');
  const [resCatData, setResCatData] = useState(reduxResCatData);
  const [selectedTab, SetSelectedTab] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState(route.params?.keyword || '');
  const [totalNoOfProduct, setTotalNoOfProduct] = useState(0);
  const [resProductData, setResProductData] = useState([]);
  const [page, setPage] = useState(0);
  const [isOneColumn, setOneColumn] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [initialLoader, setInitialLoader] = useState(true);
  const [firstLoader, setFirstLoader] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [cartLoading, setCartLoading] = useState(false);
  const debounce = useDebounce(searchText, 500);
  const isRestockRefresh = route?.params?.restockRefreshStatus;
  const [scrollEnabled, setScrollEnabled] = useState(true);
  let onEndReachedCalledDuringMomentum = false;

  useLayoutEffect(() => {
    if (categoryData && Object.keys(categoryData)?.length > 0) {
      fetchCategory();
    }
  }, [categoryData]);

  useFocusEffect(
    useCallback(() => {
      isRestockRefresh === undefined
        ? setResProductData(wholesalesData)
        : getProductsData(1, false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wholesalesData, isRestockRefresh])
  );

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
      if (SkipReloadStore.retailer_ProductList) {
        SkipReloadStore.retailer_ProductEvent(false);
      } else {
        subscribe();
      }
      return () => unsubscribe();
    }, [])
  );

  useEffect(() => {
    if (debounce?.trim()?.length >= 3) {
      getProductsData(1, false, selectedTab, true);
    } else if (debounce?.trim()?.length === 0) {
      isActive && getProductsData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce, getProductsData, isActive]);

  const fetchCategory = () => {
    const queryParams = `?category_id=${categoryData?.uuid}`;
    getCategoryList(queryParams)
      .then((res) => {
        if (res.data.data?.length > 0) {
          setResCatData(res.data.data);
        }
      })
      .catch(() => {});
  };

  const getProductsData = useCallback(
    (page = 1, fetchMore = false, filter = selectedTab, isSearch = false) => {
      if (page === 1 && isSearch) {
        setInitialLoader(false);
      }
      try {
        const queryParams = `?search_by_name=${debounce}&category_id=${
          categoryData?.uuid || ''
        }&condition=${filter}&limit=${API_CONSTANT.LIMIT}&page=${page}`;
        const storeData = filter?.length > 0 || debounce?.length > 0;

        const wholesalesApi = () =>
          isRestockRefresh === undefined
            ? fetchProduct(queryParams, fetchMore, storeData)
            : getFlashSalesList(queryParams, fetchMore, storeData);

        wholesalesApi()
          .then((res) => {
            setTotalNoOfProduct(res?.data?.pagination?.totalItems);
            setPage(page + 1);
            if (storeData || isRestockRefresh) {
              if (page === 1) {
                setResProductData(res?.data?.data || []);
              } else {
                setResProductData((prevData) => [
                  ...prevData,
                  ...(res?.data?.data || [])
                ]);
              }
            }
            setFirstLoader(false);
          })
          .catch((error) => {
            showError(error);
            setFirstLoader(false);
          })
          .finally(() => {
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
    if (isFetching || totalNoOfProduct <= resProductData?.length) {
      return;
    }

    setIsFetching(true);
    getProductsData(page, true, selectedTab)?.finally(() => {
      setIsFetching(false);
    });
  };

  const onFilterOption = (item) => {
    setTab(item?.name);
    SetSelectedTab(item?.value);
    getProductsData(1, false, item?.value, true);
  };

  const openProductDetails = (item) => {
    navigation.navigate('productDetails', {
      id: isRestockRefresh ? item?.findProductObj?.uuid : item?.uuid,
      categoryId: item?.category_id,
      isRestockRefresh: isRestockRefresh ? true : false,
      productTime: item?.end_date
    });
  };

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  const redirectCategoryProduct = (row) => {
    navigation.push('wholsaleScreen', {
      categoryData: row
    });
  };

  const switchListLayout = () => {
    setFirstLoader(true);
    setOneColumn((previousState) => !previousState);
    setTimeout(() => {
      setFirstLoader(false);
    }, 100);
  };

  const addToCart = (data, index) => {
    setCurrentIndex(index);
    setCartLoading(true);
    const req = {
      product_id: data?.findProductObj?.uuid,
      variant_id: data?.variantObj?.uuid,
      quantity: data?.variantObj?.minimum_order_quantity
    };

    updateCartQuantity(req)
      .then((response) => {
        setCartLoading(false);
        showToastSuccess(response?.data?.message);
        CartStore.storeDataEvent({
          filterProductData: {
            ...data?.variantObj,
            variant_title: data?.variantObj?.title
          },
          productDetails: data?.findProductObj,
          cart_auto_incrimented_id: response.data?.data?.cart_id
        });
      })
      .catch((error) => {
        setCartLoading(false);
        showError(error);
      });
  };

  const removeWishlist = (id) => {
    setResProductData((prevData) =>
      prevData.map((item, i) =>
        item?.variantObj?.uuid === id
          ? {
              ...item,
              isInWishlist: !item?.isInWishlist
            }
          : item
      )
    );
  };

  const headerComponent = () => (
    <>
      <ItemCountText
        title={t('CATEGORY_TILES')}
        number={resCatData?.length}
        style={ApplicationStyles.pageSpacing}
      />
      <CategoriesListContent
        data={resCatData}
        itemStyle={styles.itemStyle}
        imgStyle={styles.imgStyle}
        onPress={redirectCategoryProduct}
      />
      <View>
        <ListFilterOptions
          data={filterList}
          selectedName={tab}
          contentContainerStyle={styles.tabViewOther}
          mainViewStyle={false}
          onSelectOption={onFilterOption}
        />
      </View>
      <View style={styles.tabView}>
        <ItemCountText
          displayToggle
          title={t('PRODUCT_LISTING')}
          number={totalNoOfProduct}
          isRestockRefresh={isRestockRefresh}
          isOneColumn={isOneColumn}
          switchListLayout={switchListLayout}
          style={ApplicationStyles.pageSpacing}
        />
      </View>
    </>
  );

  const separateComponent = () => <View style={styles.spaceW} />;

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getProductsData(1, false, '', true);
      setResProductData(wholesalesData);
      setRefreshing(false);
    }, 2000);
  };

  return (
    <Container
      title={
        categoryData?.title ||
        t(
          isRestockRefresh
            ? APP_LANGUAGE_CONSTANT.RESTOCK_REFRESH
            : APP_LANGUAGE_CONSTANT.WHOLESALES
        )
      }
      scrollable={false}
      chidernContainerStyle={styles.container}
    >
      {firstLoader ? (
        // <ActivityIndicator
        //   size={'large'}
        //   color={Colors.orange10}
        //   style={styles.activityView}
        // />
        <CommonLoader
          isLoading={firstLoader}
          loaderStyle={ApplicationStyles.centerLoader}
        />
      ) : (
        <>
          <View
            style={{
              paddingTop: verticalScale(20),
              paddingHorizontal: horizontalScale(30),
              marginBottom: verticalScale(10)
            }}
          >
            <SearchBar value={searchText} onChangeValue={handleSearchChange} />
          </View>
          <FlatList
            numColumns={isOneColumn ? 1 : 2}
            initialNumToRender={5}
            data={resProductData}
            extraData={resProductData}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={separateComponent}
            ListHeaderComponent={headerComponent()}
            renderItem={({ item, index }) => (
              <RenderWholesaleProduct
                cartButton
                visibleBookmark
                buttonName={t(APP_LANGUAGE_CONSTANT.ADD_TO_CART_NEW)}
                item={item}
                wishList={false}
                isOneColumn={isOneColumn}
                index={index}
                addToCart={addToCart}
                isLoading={cartLoading}
                currentIndex={currentIndex}
                isFleshTime={isRestockRefresh}
                removeWishlist={removeWishlist}
                setOrderList={setResProductData}
                onPress={openProductDetails}
              />
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={
              <EmptyScreen data={emptyData} ctnStyle={styles.ctnStyle} />
            }
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              if (!onEndReachedCalledDuringMomentum) {
                loadMoreData();
                onEndReachedCalledDuringMomentum = true;
              }
            }}
            // eslint-disable-next-line react/jsx-sort-props
            onMomentumScrollBegin={() => {
              onEndReachedCalledDuringMomentum = false;
            }}
            keyExtractor={(item, index) => item.uuid || index.toString()}
            // eslint-disable-next-line react/no-unstable-nested-components
            ListFooterComponent={() => {
              return (
                // <ActivityIndicator
                //   size={30}
                //   animating={isFetching}
                //   color={Colors.primary20}
                // />
                <CommonLoader
                  isLoading={isFetching}
                  size={30}
                  color={Colors.primary20}
                />
              );
            }}
          />
          {!isRestockRefresh && <View style={{ height: verticalScale(50) }} />}
        </>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0
  },
  spaceW: {
    width: horizontalScale(15),
    height: verticalScale(15)
  },
  imgStyle: { width: horizontalScale(70) },
  itemStyle: {
    width: horizontalScale(86),
    alignItems: 'center'
  },
  ctnStyle: {
    height: 'auto'
  },
  tabView: {
    marginBottom: verticalScale(15)
  },
  tabViewOther: {
    paddingHorizontal: horizontalScale(30),
    paddingTop: verticalScale(10)
  }
});
