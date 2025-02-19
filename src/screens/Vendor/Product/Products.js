/* eslint-disable complexity */
import React, { useCallback, useEffect, useState } from 'react';
import { Platform, StyleSheet, View, RefreshControl } from 'react-native';
import { useTranslation } from 'react-i18next';
import { horizontalScale, verticalScale } from '../../../theme';
import ApplicationStyles from '../../../theme/ApplicationStyles';
import SearchBar from '../../../components/SearchBar';
import ItemCountText from '../../../components/headers/ItemCountText';
import CategoriesListContent from '../../../components/listContent/Categories';
import ProductList from '../../../components/listContent/ProductList';
import AddButton from './AddButton';
import { CommonModal, Container } from '../../../components';
import { useDebounce } from '../../../hooks';
import {
  deleteProductWithVariant,
  fetchProductVendor
} from '../../../store/vendor/action';
import { useSelector } from 'react-redux';
import { API_CONSTANT } from '../../../services/ApiConstant';
import { APP_LANGUAGE_CONSTANT, SCREEN_NAME } from '../../../constants';
import { useFocusEffect } from '@react-navigation/native';
import EmptyScreen from '../../../components/EmptyScreen';
import { ProductEmpty } from '../../../assets/icon';
import { showError, showToastSuccess } from '../../../utils';
import { SkipReloadStore } from '../../../staticStore/SkipReloadStore';
import CommonLoader from '../../../components/CommonLoader';

const emptyData = {
  img: ProductEmpty,
  title: 'No Products Available',
  desc: 'It seems like you haven’t added any item in your product list yet.'
};

const editDeleteData = ['Edit', 'Delete'];

export default function Products(nav) {
  const { t } = useTranslation();
  const resCatData = useSelector((state) => state.app.categoryList);
  const productList = useSelector((state) => state?.vendor?.productList);
  const [searchText, setSearchText] = useState(
    nav?.route.params?.keyword || ''
  );
  const [refreshing, setRefreshing] = useState(false);
  const [productData, setProductData] = useState([]);
  const [isOneColumn, setOneColumn] = useState(false);
  const [totalNoOfProduct, setTotalNoOfProduct] = useState(0);
  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [selectDeleteItem, setSelectDeleteItem] = useState({});
  const [initialLoader, setInitialLoader] = useState(true);
  const [firstLoader, setFirstLoader] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const debounce = useDebounce(searchText, 500);

  useEffect(() => {
    setProductData(productList);
  }, [productList]);

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
      if (SkipReloadStore.vendor_ProductList) {
        SkipReloadStore.vendor_ProductEvent(false);
      } else {
        subscribe();
      }
      return () => unsubscribe();
    }, [])
  );

  useEffect(() => {
    if (debounce?.trim()?.length >= 1) {
      getProductsData(1, false, true);
    } else if (debounce?.trim()?.length === 0) {
      isActive && getProductsData();
    }
  }, [debounce, getProductsData, isActive]);

  const getProductsData = useCallback(
    (page = 1, fetchMore = false, isSearch = false) => {
      if (page === 1 && isSearch) {
        setInitialLoader(false);
      }
      try {
        const queryParams = `?search_by_name=${debounce}&limit=${API_CONSTANT.LIMIT}&page=${page}`;
        const storeData = debounce?.length > 0;
        fetchProductVendor(queryParams, fetchMore, storeData)
          .then((res) => {
            if (storeData) {
              if (page === 1) {
                setProductData(res?.data?.data || []);
              } else {
                setProductData((prevData) => [
                  ...prevData,
                  ...(res?.data?.data || [])
                ]);
              }
            }
            setTotalNoOfProduct(res?.data?.pagination?.totalItems);
            setPage(page + 1);
            setFirstLoader(false);
          })
          .catch((_err) => {
            setProductData([]);
            setFirstLoader(false);
          })
          .finally(() => {
            setIsFetching(false);
            setRefreshing(false);
          });
      } catch (error) {
        setIsFetching(false);
        setFirstLoader(false);
        setProductData([]);
      }
    },
    [debounce]
  );

  const openProductDetails = (item) => {
    nav.navigation.navigate('productDetails', {
      id: item?.uuid,
      categoryId: item?.category_id,
      isVendorView: true
    });
  };

  const addProduct = () => {
    nav.navigation.navigate('AddProduct');
  };

  const loadMoreData = () => {
    if (totalNoOfProduct > productList?.length && !isFetching) {
      setIsFetching(true);
      getProductsData(page, true);
    }
  };

  const switchListLayout = () => {
    setFirstLoader(true);
    setOneColumn((previousState) => !previousState);
    setTimeout(() => {
      setFirstLoader(false);
    }, 100);
  };

  const editFun = (row) => {
    nav.navigation.navigate('AddProduct', {
      isProductEdit: true,
      productDetails: {
        ...row,
        ...row.findProductObj,
        product_title: row.title,
        product_description: row.description,
        variants: [row.variantObj],
        product_uuid: row.uuid
      }
    });
  };
  const deleteFun = () => {
    deleteProductWithVariant(`/?id=${selectDeleteItem?.uuid}`)
      .then((res) => {
        const removedData = productData?.filter(
          (x) => x?.uuid !== selectDeleteItem?.uuid
        );
        setProductData(removedData);
        showToastSuccess(res?.data?.message);
        setTotalNoOfProduct(totalNoOfProduct - 1);
      })
      .catch((err) => {
        showError(err);
      });
  };

  const redirectCategoryProduct = (row) => {
    nav.navigation.navigate(SCREEN_NAME.CATEGORY_PRODUCT_SCREEN, {
      row: row,
      visibleBookmark: false
    });
  };

  const headerComponent = () => {
    return (
      <>
        <ItemCountText
          title={t(APP_LANGUAGE_CONSTANT.CATEGORY_TILES)}
          number={resCatData?.length}
          style={ApplicationStyles.pageSpacing}
        />
        <CategoriesListContent
          data={resCatData}
          itemStyle={styles.itemStyle}
          imgStyle={styles.imgStyle}
          onPress={redirectCategoryProduct}
        />
        <ItemCountText
          displayToggle
          title={t(APP_LANGUAGE_CONSTANT.PRODUCT_LISTING)}
          number={totalNoOfProduct}
          isOneColumn={isOneColumn}
          switchListLayout={switchListLayout}
          style={[
            ApplicationStyles.pageSpacing,
            { paddingBottom: verticalScale(20) }
          ]}
        />
      </>
    );
  };

  const handleRefresh = () => {
    setRefreshing(true);
    getProductsData(1, false, true);
  };

  return (
    <>
      <Container
        title={t(APP_LANGUAGE_CONSTANT.PRODUCTS)}
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
        ) : productData?.length === 0 && initialLoader ? (
          <EmptyScreen data={emptyData} />
        ) : (
          <>
            <View
              style={[
                ApplicationStyles.pageSpacing,
                {
                  paddingTop: verticalScale(20),
                  marginBottom: verticalScale(10)
                }
              ]}
            >
              <SearchBar value={searchText} onChangeValue={setSearchText} />
            </View>
            <ProductList
              footerLoader={isFetching}
              data={productData}
              numColumns={isOneColumn ? 1 : 2}
              isOneColumn={isOneColumn}
              initialNumToRender={5}
              contentContainerStyle={styles.contentContainerStyle}
              listHeaderComponent={headerComponent()}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                />
              }
              editDeleteData={editDeleteData}
              deleteFun={(item) => {
                setSelectDeleteItem(item);
                setOpenModal(true);
              }}
              editFun={editFun}
              onPress={openProductDetails}
              onEndReached={loadMoreData}
              onEndReachedThreshold={0.5}
            />
          </>
        )}
        {/* <View style={{ marginLeft: 20 }}>
          <HeaderMenu
            data={editDeleteData}
            onPress1={onPress1}
            onPress2={onPress2}
          />
        </View> */}
        <CommonModal
          openModal={openModal}
          closeModal={() => setOpenModal(false)}
          modalHeading={t(APP_LANGUAGE_CONSTANT.ARE_YOU_SURE)}
          modalTitle={t(APP_LANGUAGE_CONSTANT.DELETE_PERMANENTLY)}
          handleSubmit={() => {
            deleteFun();
            setOpenModal(false);
          }}
        />
      </Container>

      <AddButton
        title={t(APP_LANGUAGE_CONSTANT.ADD_PRODUCT)}
        onPress={addProduct}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0
  },
  imgStyle: {
    width: horizontalScale(70)
  },
  itemStyle: {
    width: horizontalScale(86),
    alignItems: 'center'
  },
  contentContainerStyle: {
    paddingBottom:
      Platform.OS === 'android' ? verticalScale(140) : verticalScale(170)
  }
});
