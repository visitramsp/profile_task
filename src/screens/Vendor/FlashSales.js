import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import {
  Fonts,
  verticalScale,
  horizontalScale,
  Colors,
  ApplicationStyles,
  PAGE_SPACING
} from '../../theme';
import { CommonModal, Container, HeaderMenu } from '../../components';
import SearchBar from '../../components/SearchBar';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { ColoredPlusIcon, ProductEmpty } from '../../assets/icon';
import { deleteFlashInput, getFlashSalesData } from '../../store/vendor/action';
import { showError, showToastSuccess } from '../../utils';
import { useTranslation } from 'react-i18next';
import { APP_LANGUAGE_CONSTANT } from '../../constants';
import { useDebounce } from '../../hooks';
import EmptyScreen from '../../components/EmptyScreen';
import { API_CONSTANT } from '../../services/ApiConstant';
import AcceptOrderModal from '../../components/vender/AcceptOrderModal';
import CommonLoader from '../../components/CommonLoader';
const emptyData = {
  img: ProductEmpty,
  title: 'No Products Available',
  desc: 'It seems like you haven’t added any item in your product list yet.'
};

const FlashSales = ({ navigation }) => {
  const { t } = useTranslation();
  const [flashSalesData, setFlashSalesData] = useState([]);
  const [searchVal, setSearchVal] = useState('');
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [totalNoOfProduct, setTotalNoOfProduct] = useState(0);
  const [initialLoader, setInitialLoader] = useState(true);
  const [firstLoader, setFirstLoader] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const debounce = useDebounce(searchVal, 500);
  const [openModal, setOpenModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [visible, setVisible] = useState(false);
  const editDeleteData = ['Edit', 'Delete'];
  useEffect(() => {
    if (searchVal?.trim()?.length >= 3) {
      fetchFlashSaleProducts(1, true);
    } else if (searchVal?.trim()?.length === 0) {
      fetchFlashSaleProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce]);

  useEffect(() => {
    fetchFlashSaleProducts();
  }, [fetchFlashSaleProducts]);

  const fetchFlashSaleProducts = useCallback(
    (page = 1, isSearch = false) => {
      if (page === 1 && isSearch) {
        setInitialLoader(false);
      }
      try {
        const queryParams = `?search_by_name=${debounce}&pageSize=${API_CONSTANT.LIMIT}&page=${page}`;

        getFlashSalesData(queryParams)
          .then((res) => {
            if (isSearch || page === 1) {
              setFlashSalesData(res?.data?.data || []);
            } else {
              setFlashSalesData((prevData) => [
                ...prevData,
                ...(res?.data?.data || [])
              ]);
            }
            setPage(page + 1);
            setTotalNoOfProduct(res?.data?.pagination?.totalRecords);
            setFirstLoader(false);
          })
          .catch((err) => {
            showError(err);
            setFirstLoader(false);
          })
          .finally(() => {
            setIsFetching(false);
            setRefreshing(false);
          });
      } catch (error) {
        setIsFetching(false);
        setFirstLoader(false);
        setFlashSalesData([]);
      }
    },
    [debounce]
  );

  const loadMoreData = () => {
    if (totalNoOfProduct > flashSalesData?.length && !isFetching) {
      setIsFetching(true);
      fetchFlashSaleProducts(page, true);
    }
  };

  const deleteFun = (id) => {
    const obj = {
      id: id
    };
    deleteFlashInput(obj)
      .then((res) => {
        const removedData = flashSalesData?.filter((x) => x?.uuid !== id);
        setFlashSalesData(removedData);
        showToastSuccess(res?.data?.message);
        setTotalNoOfProduct(totalNoOfProduct - 1);
      })
      .catch((err) => {
        showError(err);
      });
  };
  const editFun = (row) => {
    navigation.navigate('AddProduct', {
      isProductEdit: true,
      productDetails: {
        ...row
      }
    });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchFlashSaleProducts(1, true);
  };

  const _renderFlashSalesProduct = ({ item }) => {
    return (
      <View style={styles.cellContainer}>
        <FastImage
          source={{ uri: item?.variantObj?.images[0] }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.detail}>
          <Text style={[styles.name]} ellipsizeMode="tail">
            {`${item?.findProductObj?.brand_id} - ${item?.findProductObj?.title}`}
          </Text>
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityText}>
              Available Qty : {item?.quantity}
              <Text style={[styles.currency]}> {item.currency}</Text>
            </Text>
            <Text>|</Text>
            <Text style={[styles.quantityText, styles.soldText]}>
              Sold Units : {item?.sold_quantity}
            </Text>
          </View>
          <View style={styles.quantityContainer}>
            <Text style={styles.offerPrice}>
              Offered Price : {item?.offer_price}
            </Text>
            <Text style={styles.realPrice}>{item?.price}</Text>
          </View>
        </View>
        <View style={styles.menuIconView}>
          <HeaderMenu
            data={editDeleteData}
            onPress1={() => editFun(item)}
            onPress2={() => {
              setOpenModal(true), setDeleteId(item.uuid);
            }}
          />
        </View>
      </View>
    );
  };

  const headerComponent = () => {
    return (
      <View style={styles.mainView}>
        <SearchBar onChangeValue={setSearchVal} />
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>
            {t(APP_LANGUAGE_CONSTANT.ADDED_PRODUCTS)}
          </Text>
          <Text style={styles.headerCount}>({totalNoOfProduct})</Text>
        </View>
      </View>
    );
  };

  const separateComponent = () => <View style={styles.spaceW} />;
  return (
    <>
      <Container
        title={t(APP_LANGUAGE_CONSTANT.FLASH_SALES_INPUT)}
        scrollable={false}
        style={styles.container}
      >
        {firstLoader ? (
          // <ActivityIndicator size={'large'} color={Colors.orange10} />
          <CommonLoader isLoading={firstLoader} />
        ) : flashSalesData?.length === 0 && initialLoader ? (
          <EmptyScreen data={emptyData} />
        ) : (
          <FlatList
            data={flashSalesData}
            extraData={flashSalesData}
            ListHeaderComponent={headerComponent()}
            ItemSeparatorComponent={separateComponent}
            keyExtractor={(item, index) => `FlashSales.${index}`}
            renderItem={_renderFlashSalesProduct}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            contentContainerStyle={styles.contentContainerStyle}
            showsVerticalScrollIndicator={false}
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
        )}
        <View style={styles.manageSpace} />

        <CommonModal
          openModal={openModal}
          closeModal={() => setOpenModal(false)}
          modalHeading={t(APP_LANGUAGE_CONSTANT.ARE_YOU_SURE)}
          modalTitle={t(APP_LANGUAGE_CONSTANT.DELETE_PERMANENTLY)}
          handleSubmit={() => {
            deleteFun(deleteId);
            setOpenModal(false);
          }}
        />
      </Container>

      <TouchableOpacity
        style={styles.btn}
        onPress={() =>
          navigation.navigate('AddProduct', { isProductEdit: false })
        }
      >
        <LinearGradient
          colors={[Colors.orange10, Colors.orange30]}
          style={styles.btnGradient}
        >
          <Text style={styles.btnTitle}>
            {t(APP_LANGUAGE_CONSTANT.ADD_PRODUCT)}
          </Text>
          <View style={styles.icon}>
            <ColoredPlusIcon width={15} height={15} colors={Colors.primary} />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );
};

export default FlashSales;

const styles = StyleSheet.create({
  mainView: {
    marginTop: PAGE_SPACING
  },
  contentContainerStyle: { paddingHorizontal: PAGE_SPACING },
  spaceW: {
    width: horizontalScale(15),
    height: verticalScale(15)
  },
  container: {
    padding: 0,
    margin: 0
  },
  headerContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginVertical: verticalScale(16),
    gap: horizontalScale(6)
  },
  menuIconView: {
    position: 'absolute',
    right: 2,
    top: 2
  },
  headerTitle: {
    fontFamily: Fonts.type.montserrat,
    fontWeight: Fonts.Weight.bold,
    fontSize: Fonts.size.semi,
    color: Colors.black
  },
  headerCount: {
    fontFamily: Fonts.type.montserratBold,
    fontSize: Fonts.size.semi,
    color: Colors.primary
  },
  cellContainer: {
    ...ApplicationStyles.rowAlignCenter,
    gap: horizontalScale(12)
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 10
  },
  name: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.semi,
    color: Colors.black70,
    flexWrap: 'wrap'
  },
  detail: {
    flex: 1,
    gap: verticalScale(8),
    flexWrap: 'wrap'
  },
  quantityContainer: {
    ...ApplicationStyles.rowAlignCenter,
    flexWrap: 'wrap',
    gap: horizontalScale(6)
  },
  quantityText: {
    ontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.small,
    color: Colors.gray20
  },
  soldText: {
    color: Colors.primary
  },
  offerPrice: {
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.robotoBold,
    color: Colors.green10
  },
  realPrice: {
    fontSize: Fonts.size.input,
    fontFamily: Fonts.type.robotoBold,
    color: Colors.gray10,
    textDecorationLine: 'line-through'
  },
  manageSpace: {
    height: verticalScale(74)
  },
  btn: {
    position: 'absolute',
    bottom: verticalScale(100),
    right: horizontalScale(16),
    shadowColor: Colors.primary,
    shadowOffset: { height: 1, width: 1 },
    shadowRadius: 4,
    shadowOpacity: 2,
    elevation: 5
  },
  btnGradient: {
    ...ApplicationStyles.rowAlignCenter,
    paddingVertical: verticalScale(4),
    paddingHorizontal: horizontalScale(4),
    borderRadius: 22.5,

    gap: horizontalScale(8),
    paddingLeft: horizontalScale(16)
  },
  icon: {
    padding: horizontalScale(10),
    backgroundColor: Colors.white,
    height: 35,
    width: 35,
    borderRadius: 18
  },
  btnTitle: {
    fontFamily: Fonts.type.montserrat,
    fontWeight: Fonts.Weight.bold,
    fontSize: Fonts.size.semi,
    color: Colors.white
  }
});
