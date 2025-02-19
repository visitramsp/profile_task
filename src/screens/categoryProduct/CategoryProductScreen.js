import React, { useCallback, useEffect, useState } from 'react';
import { Container } from '../../components';
import { API_CONSTANT } from '../../services/ApiConstant';
import { showError } from '../../utils';
import { fetchCategoryProduct } from '../../store/retailer/action';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { APP_LANGUAGE_CONSTANT, USER_TYPE } from '../../constants';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  verticalScale
} from '../../theme';
import EmptyScreen from '../../components/EmptyScreen';
import { ProductEmpty } from '../../assets/icon';
import RenderWholesaleProduct from '../Retailer/WholesalesPage/RenderWholesaleProduct';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import CommonLoader from '../../components/CommonLoader';

const emptyData = {
  img: ProductEmpty,
  title: 'No Products Available',
  desc: 'It seems like you haven’t added any item in your product list yet.'
};
const CategoryProductScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const outletData = useSelector((state) => state.user?.userDetail);
  const { uuid, title } = route.params.row;
  const [resProductData, setResProductData] = useState([]);
  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [initialLoader, setInitialLoader] = useState(true);
  const [firstLoader, setFirstLoader] = useState(true);
  const [totalNoOfProduct, setTotalNoOfProduct] = useState(0);
  useEffect(() => {
    getProductsData();
  }, [getProductsData, uuid]);

  const getProductsData = useCallback(
    (page = 1, isSearch = false) => {
      if (page === 1 && isSearch) {
        setInitialLoader(false);
      }

      try {
        const queryParams = `?search_by_name=&condition=&limit=${API_CONSTANT.LIMIT}&page=${page}&category_id=${uuid}`;

        fetchCategoryProduct(queryParams)
          .then((res) => {
            setTotalNoOfProduct(res?.data?.pagination?.totalItems);
            setPage(page + 1);

            if (page === 1) {
              setResProductData(res?.data?.data || []);
            } else {
              setResProductData((prevData) => [
                ...prevData,
                ...(res?.data?.data || [])
              ]);
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
    [uuid]
  );

  const loadMoreData = () => {
    if (totalNoOfProduct > resProductData?.length && !isFetching) {
      setIsFetching(true);
      getProductsData(page, true);
    }
  };
  const openProductDetails = (item) => {
    outletData?.user_type === USER_TYPE.VENDOR
      ? navigation.navigate('productDetails', {
          id: item?.uuid,
          categoryId: item?.category_id,
          isVendorView: true
        })
      : navigation.navigate('productDetails', {
          id: item?.uuid,
          categoryId: item?.category_id
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
    <View
      style={{
        paddingTop: verticalScale(10),
        paddingBottom: verticalScale(20)
      }}
    >
      <Text style={styles.requestTxt}>{title}</Text>
    </View>
  );

  const separateComponent = () => <View style={styles.spaceW} />;
  return (
    <Container title={t(APP_LANGUAGE_CONSTANT.CATEGORY)} scrollable={false}>
      {firstLoader ? (
        <CommonLoader
          isLoading={firstLoader}
          loaderStyle={styles.activityView}
        />
      ) : // <ActivityIndicator
      // style={styles.activityView}
      // color={Colors?.orange10}
      // size={'large'}
      // />
      resProductData?.length === 0 && initialLoader ? (
        <EmptyScreen data={emptyData} />
      ) : (
        <>
          <FlatList
            numColumns={2}
            initialNumToRender={5}
            data={resProductData}
            extraData={resProductData}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={headerComponent()}
            ItemSeparatorComponent={separateComponent}
            renderItem={({ item, index }) => (
              <RenderWholesaleProduct
                visibleBookmark={
                  outletData?.user_type === 'vendor' ? false : true
                }
                item={item}
                index={index}
                onPress={openProductDetails}
                removeWishlist={removeWishlist}
              />
            )}
            keyExtractor={(item, index) => item.id + index.toString()}
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
          <View
            style={{
              height: verticalScale(60)
            }}
          />
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  spaceW: {
    width: horizontalScale(15),
    height: verticalScale(15)
  },
  activityView: { marginTop: verticalScale(20) },
  requestTxt: {
    ...ApplicationStyles.mediumMontserratFont,
    fontWeight: Fonts.Weight.seven,
    color: Colors.black50,
    marginTop: verticalScale(20),
    marginLeft: horizontalScale(30)
  }
});

export default CategoryProductScreen;
