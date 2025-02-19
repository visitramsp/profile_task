import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { Platform, StyleSheet, View, RefreshControl } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors, horizontalScale, verticalScale } from '../../../theme';
import ApplicationStyles from '../../../theme/ApplicationStyles';
import SearchBar from '../../../components/SearchBar';
import ItemCountText from '../../../components/headers/ItemCountText';
import CategoriesListContent from '../../../components/listContent/Categories';
import ProductList from '../../../components/listContent/ProductList';
import { Container } from '../../../components';
import { useDebounce } from '../../../hooks';
import { API_CONSTANT } from '../../../services/ApiConstant';
import { APP_LANGUAGE_CONSTANT, SCREEN_NAME } from '../../../constants';
import EmptyScreen from '../../../components/EmptyScreen';
import { getCategoryList, getProductList } from '../../../store/app/action';
import { ProductEmpty } from '../../../assets/icon';
import ListFilterOptions from '../../../components/listContent/ListFilterOptions';
import CommonLoader from '../../../components/CommonLoader';

const emptyData = {
  img: ProductEmpty,
  title: 'No Products Available',
  desc: 'It seems like you haven’t added any item in your product list yet.'
};

const filterList = [
  { name: 'All', id: 1, value: '' },
  { name: 'Popular', id: 2, value: 'popular' },
  { name: 'Top Sales', id: 3, value: 'top_sales' },
  { name: 'Features', id: 4, value: 'features' }
];

export default function UniversalProductList({ navigation, route }) {
  const { t } = useTranslation();
  const categoryData = route.params?.categoryData;
  const [resCatData, setResCatData] = useState([]);
  const [tab, setTab] = useState('All');
  const [selectedTab, SetSelectedTab] = useState('');
  const [searchText, setSearchText] = useState(route.params?.keyword || '');
  const [refreshing, setRefreshing] = useState(false);
  const [productData, setProductData] = useState([]);
  const [isOneColumn, setOneColumn] = useState(false);
  const [totalNoOfProduct, setTotalNoOfProduct] = useState(0);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [firstLoader, setFirstLoader] = useState(true);
  const debounce = useDebounce(searchText, 500);

  const initialRender = useRef(true);

  useLayoutEffect(() => {
    fetchProduct(1);
  }, [debounce, selectedTab]);

  useLayoutEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      fetchProduct(page);
    }
  }, [page]);

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

  const fetchProduct = (pagenum) => {
    const queryParams = `?search_by_name=${debounce}&category_id=${
      categoryData?.uuid || ''
    }&condition=${selectedTab}&limit=${API_CONSTANT.LIMIT}&page=${pagenum}`;
    getProductList(queryParams)
      .then((res) => {
        setTotalNoOfProduct(res.data.pagination.totalItems);
        if (pagenum === 1) {
          setProductData(res?.data?.data || []);
        } else {
          setProductData((prevData) => [
            ...prevData,
            ...(res?.data?.data || [])
          ]);
        }
      })
      .catch(() => {})
      .finally(() => {
        setFirstLoader(false);
        setRefreshing(false);
        setIsFetching(false);
      });
  };

  const switchListLayout = () => {
    setFirstLoader(true);
    setOneColumn((previousState) => !previousState);
    setTimeout(() => {
      setFirstLoader(false);
    }, 100);
  };

  const redirectCategoryProduct = (row) => {
    navigation.push(SCREEN_NAME.UNIVERSAL_PRODUCTLIST, {
      categoryData: row
    });
  };

  const openProductDetails = (item) => {
    navigation.navigate(SCREEN_NAME.UINVERSAL_PRODUCTDETAIL, {
      id: item?.uuid,
      categoryId: item?.category_id,
      isAnonymous: true
    });
  };

  const loadMoreData = () => {
    if (totalNoOfProduct > productData?.length && !isFetching) {
      setIsFetching(true);
      setPage((prev) => prev + 1);
    }
  };

  const onFilterOption = (item) => {
    setTab(item?.name);
    SetSelectedTab(item?.value);
  };

  const headerComponent = () => {
    return (
      <>
        <View
          style={[
            ApplicationStyles.pageSpacing,
            { paddingTop: verticalScale(20) }
          ]}
        >
          <SearchBar value={searchText} onChangeValue={setSearchText} />
        </View>
        {searchText?.trim()?.length === 0 && (
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
              ListEmptyComponent={<></>}
              onPress={redirectCategoryProduct}
            />
          </>
        )}
        <View style={styles.activeView}>
          <ListFilterOptions
            data={filterList}
            selectedName={tab}
            contentContainerStyle={styles.tabViewOther}
            mainViewStyle={false}
            onSelectOption={onFilterOption}
          />
        </View>
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
    fetchProduct(1);
  };

  return (
    <>
      <Container
        title={categoryData?.title || t(APP_LANGUAGE_CONSTANT.PRODUCTS)}
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
            loaderStyle={styles.activeView}
          />
        ) : (
          <ProductList
            visibleBookmark
            isAnonymous
            footerLoader={isFetching}
            data={productData}
            numColumns={isOneColumn ? 1 : 2}
            isOneColumn={isOneColumn}
            initialNumToRender={5}
            contentContainerStyle={styles.contentContainerStyle}
            listHeaderComponent={headerComponent()}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <EmptyScreen data={emptyData} ctnStyle={styles.ctnStyle} />
            }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            onPress={openProductDetails}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.5}
          />
        )}
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  activeView: {
    marginTop: verticalScale(20)
  },
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
  tabViewOther: {
    paddingHorizontal: horizontalScale(30),
    paddingTop: verticalScale(10)
  },
  contentContainerStyle: {
    paddingBottom:
      Platform.OS === 'android' ? verticalScale(140) : verticalScale(170)
  },
  ctnStyle: {
    height: 'auto'
  }
});
