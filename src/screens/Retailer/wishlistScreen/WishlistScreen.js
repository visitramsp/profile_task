import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { APP_LANGUAGE_CONSTANT } from '../../../constants';
import styles from './WishlistScreen.styles';
import { ApplicationStyles, Colors, PAGE_SPACING } from '../../../theme';
import { SearchBar, ProductList, Container } from '../../../components';
import {
  fetchWishlist,
  updateCartQuantity
} from '../../../store/retailer/action';
import { useNavigation } from '@react-navigation/native';
import { showError, showToastSuccess } from '../../../utils';
import { CartEmpty } from '../../../assets/icon';
import { useDebounce } from '../../../hooks';
import { API_CONSTANT } from '../../../services/ApiConstant';
import EmptyScreen from '../../../components/EmptyScreen';
import CommonLoader from '../../../components/CommonLoader';

const emptyData = {
  img: CartEmpty,
  title: 'Your Wishlist is Empty',
  desc: 'Looks like you haven’t added any item to your wishlist yet'
};

export default function WishlistScreen({ route }) {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [initialLoader, setInitialLoader] = useState(true);
  const [firstLoader, setFirstLoader] = useState(true);
  const [secondLoader, setSecondLoader] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [wishlistData, setWishlistData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const debounce = useDebounce(searchText, 500);

  useEffect(() => {
    if (debounce?.trim()?.length >= 3) {
      setSecondLoader(true);
      getWishlistData(1, true);
    } else if (debounce?.trim()?.length === 0) {
      getWishlistData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce]);

  const getWishlistData = useCallback(
    (page = 1, isSearch = false) => {
      if (page === 1 && isSearch) {
        setSecondLoader(true);
        setInitialLoader(false);
      }
      try {
        const queryParams = `?searchKeyword=${debounce}&limit=${API_CONSTANT.LIMIT}&page=${page}`;
        fetchWishlist(queryParams)
          .then((res) => {
            if (isSearch || page === 1) {
              setWishlistData(res?.data?.data || []);
            } else {
              setWishlistData((prevData) => [
                ...prevData,
                ...(res?.data?.data || [])
              ]);
            }
            setSecondLoader(false);
            setFirstLoader(false);
            setPage(page + 1);
            setTotalCount(res?.data?.paginated?.totalItems);
          })
          .catch((error) => {
            setSecondLoader(false);
            setFirstLoader(false);
            showError(error);
          })
          .finally(() => {
            setIsFetching(false);
          });
      } catch (error) {
        setIsFetching(false);
        setSecondLoader(false);
        setFirstLoader(false);
        showError(error);
      }
    },
    [debounce]
  );

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
        // navigation.navigate('Cart');
      })
      .catch((error) => {
        setCartLoading(false);
        showError(error);
      });
  };

  const loadMoreData = () => {
    if (totalCount > wishlistData?.length && !isFetching) {
      setIsFetching(true);
      getWishlistData(page);
    }
  };

  const openProductDetails = (item) => {
    navigation.navigate('productDetails', {
      id: item?.productUuid,
      categoryId: item?.category_id,
      isRestockRefresh: false,
      productTime: item?.end_date,
      removeWishlist: removeWishlist
    });
  };

  const removeWishlist = (id) => {
    const removedData = wishlistData?.filter(
      (x, index) => x?.variantObj?.uuid !== id
    );
    setWishlistData(removedData);
    setTotalCount(totalCount - 1);
  };

  const headerComponent = () => (
    <View style={styles.headerView}>
      <SearchBar
        containerStyle={{ marginHorizontal: PAGE_SPACING }}
        value={searchText}
        onChangeValue={setSearchText}
      />

      <View style={ApplicationStyles.pageSpacing}>
        <Text style={styles.wishlistText}>
          {t(APP_LANGUAGE_CONSTANT.WISHLIST)}
          <Text style={{ color: Colors.orange10 }}> ({totalCount})</Text>
        </Text>
      </View>
    </View>
  );

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getWishlistData();
      setRefreshing(false);
    }, 2000);
  };

  return (
    <Container
      scrollable={false}
      chidernContainerStyle={styles.mainView}
      title={t(APP_LANGUAGE_CONSTANT.WISHLIST)}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {firstLoader ? (
        // <ActivityIndicator size={'large'} color={Colors.orange10} />
        <CommonLoader isLoading={firstLoader} />
      ) : wishlistData?.length === 0 && initialLoader ? (
        <EmptyScreen data={emptyData} />
      ) : (
        <>
          <View style={styles.container}>
            <ProductList
              visibleBookmark
              cartButton
              wishList
              numColumns={2}
              secondLoader={secondLoader}
              initialNumToRender={5}
              currentIndex={currentIndex}
              ListHeaderComponent={headerComponent()}
              btnIsLoading={cartLoading}
              addToCart={addToCart}
              data={wishlistData}
              contentContainerStyle={styles.contentContainerStyle}
              itemStyle={styles.itemContainer}
              buttonName={t(APP_LANGUAGE_CONSTANT.ADD_TO_CART_NEW)}
              removeWishlist={removeWishlist}
              setOrderList={setWishlistData}
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
              onPress={openProductDetails}
              onEndReachedThreshold={0.5}
              onEndReached={loadMoreData}
            />
          </View>
        </>
      )}
    </Container>
  );
}
