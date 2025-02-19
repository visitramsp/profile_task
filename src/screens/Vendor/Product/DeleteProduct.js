import React, { useCallback, useEffect, useState } from 'react';
import { Container } from '../../../components';
import { API_CONSTANT } from '../../../services/ApiConstant';
import { showError } from '../../../utils';
import { FlatList, StyleSheet, View } from 'react-native';
import { APP_LANGUAGE_CONSTANT } from '../../../constants';
import { Colors, horizontalScale, verticalScale } from '../../../theme';
import EmptyScreen from '../../../components/EmptyScreen';
import { ProductEmpty } from '../../../assets/icon';
import RenderWholesaleProduct from '../../Retailer/WholesalesPage/RenderWholesaleProduct';
import { useTranslation } from 'react-i18next';
import { getArchiveProduct } from '../../../store/vendor/action';
import CommonLoader from '../../../components/CommonLoader';

const emptyData = {
  img: ProductEmpty,
  title: 'No Products Available',
  desc: 'It seems like you haven’t added any item in your product list yet.'
};
const DeleteProduct = ({ navigation }) => {
  const { t } = useTranslation();
  const [resProductData, setResProductData] = useState([]);
  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [initialLoader, setInitialLoader] = useState(true);
  const [firstLoader, setFirstLoader] = useState(true);
  const [totalNoOfProduct, setTotalNoOfProduct] = useState(0);

  useEffect(() => {
    getProductsData();
  }, []);
  const getProductsData = useCallback((page = 1, isSearch = false) => {
    try {
      if (page === 1 && isSearch) {
        setInitialLoader(false);
      }
      const queryParams = `?limit=${API_CONSTANT.LIMIT}&page=${page}`;
      getArchiveProduct(queryParams)
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
  }, []);

  const loadMoreData = () => {
    if (totalNoOfProduct > resProductData?.length && !isFetching) {
      setIsFetching(true);
      getProductsData(page, true);
    }
  };

  const headerComponent = () => (
    <View
      style={{
        paddingTop: verticalScale(10),
        paddingBottom: verticalScale(20)
      }}
    >
      {/* <Text style={styles.requestTxt}>jjjjj</Text> */}
    </View>
  );

  const openProductDetails = (item) => {
    navigation.navigate('productDetails', {
      id: item?.uuid,
      categoryId: item?.category_id,
      isVendorView: true,
      isDeleted: true
    });
  };

  const separateComponent = () => <View style={styles.spaceW} />;
  return (
    <Container
      title={t(APP_LANGUAGE_CONSTANT.ARCHIVE_PRODUCT)}
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
          loaderStyle={styles.activityView}
          isLoading={firstLoader}
        />
      ) : resProductData?.length === 0 && initialLoader ? (
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
                item={item}
                index={index}
                onPress={openProductDetails}
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
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0
  },
  spaceW: {
    width: horizontalScale(15),
    height: verticalScale(15)
  },
  activityView: { marginTop: verticalScale(20) }
});

export default DeleteProduct;
