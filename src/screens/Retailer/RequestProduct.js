import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  height,
  horizontalScale,
  PAGE_SPACING,
  verticalScale
} from '../../theme';
import { useTranslation } from 'react-i18next';
import SearchBar from '../../components/SearchBar';
import ItemCountText from '../../components/headers/ItemCountText';
import GradientButton from '../../components/buttons/GradientButton';
import { CommonModal, Container, HeaderMenu } from '../../components';
import { APP_LANGUAGE_CONSTANT } from '../../constants';
import { getRequestProductList } from '../../store/retailer/action';
import { useDebounce } from '../../hooks';
import { showError, showToastSuccess } from '../../utils';
import { ProductEmpty } from '../../assets/icon';
import { API_CONSTANT } from '../../services/ApiConstant';
import EmptyScreen from '../../components/EmptyScreen';
import { useIsFocused } from '@react-navigation/native';
import { deleteRequestProduct } from '../../store/vendor/action';
import CommonLoader from '../../components/CommonLoader';
const emptyData = {
  img: ProductEmpty,
  title: 'No Request Product',
  desc: 'It seems like you haven’t added any item in your Request product list yet.'
};
export default function RequestProduct({ navigation }) {
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const [searchValue, setSearchValue] = useState('');
  const [reqProductData, setReqProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [initialLoader, setInitialLoader] = useState(true);
  const [firstLoader, setFirstLoader] = useState(true);
  const debounce = useDebounce(searchValue, 500);
  const [openModal, setOpenModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const editDeleteData = ['Edit', 'Delete'];
  useEffect(() => {
    if (debounce?.trim()?.length >= 3) {
      getReqProductData(1, true);
    } else if (debounce?.trim()?.length === 0) {
      getReqProductData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce]);
  useEffect(() => {
    getReqProductData();
  }, [isFocused]);

  const getReqProductData = useCallback(
    (page = 1, isSearch = false) => {
      if (page === 1 && isSearch) {
        setInitialLoader(false);
      }
      try {
        const queryParams = `?pageSize=${API_CONSTANT.LIMIT}&page=${page}&name=${debounce}`;
        getRequestProductList(queryParams)
          .then((res) => {
            if (isSearch || page === 1) {
              setReqProductData(res?.data?.data || []);
            } else {
              setReqProductData((prevData) => [
                ...prevData,
                ...(res?.data?.data || [])
              ]);
            }
            setTotalCount(res?.data?.pagination?.totalRecords);
            setPage(page + 1);
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
    [debounce]
  );

  const loadMoreData = () => {
    if (totalCount > reqProductData?.length && !isFetching) {
      setIsFetching(true);
      getReqProductData(page);
    }
  };

  const editFun = (row) => {
    navigation.navigate('addRequestScreen', {
      isProductEdit: true,
      productDetails: {
        ...row
      }
    });
  };

  const deleteFun = (id) => {
    const obj = {
      id: id
    };
    deleteRequestProduct(obj)
      .then((res) => {
        const removedData = reqProductData?.filter((x) => x?.uuid !== id);
        setReqProductData(removedData);
        showToastSuccess(res?.data?.message);
        setTotalCount(totalCount - 1);
      })
      .catch((err) => {
        showError(err);
      });
  };

  const renderItem = ({ item }) => {
    const { quantity, price } = item;
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <Image
          style={styles.img}
          source={{ uri: item?.variantObj?.images[0] }}
        />
        <View style={[styles.itemRightContainer]}>
          <Text style={styles.title} numberOfLines={1}>
            {item?.variantObj?.title}
          </Text>
          <Text style={styles.qltTxt}>
            {t(APP_LANGUAGE_CONSTANT.REQUIRED_QUANTITY)} : {quantity}
          </Text>
          <View style={styles.row}>
            <Text style={styles.priceTxt} numberOfLines={2}>
              {item?.accepted_by_vendors?.length > 0
                ? t(APP_LANGUAGE_CONSTANT.REQUESTED_PRICE)
                : t(APP_LANGUAGE_CONSTANT.ASKING_PRICE)}{' '}
              : {price} {item?.accepted_by_vendors?.length > 0 ? 'AED' : 'AED'}
            </Text>
            <View
              style={[
                styles.statusBtn,
                item?.accepted_by_vendors?.length > 0 && styles.acceptedContent
              ]}
            >
              <Text style={styles.statusTxt}>
                {item?.accepted_by_vendors?.length > 0
                  ? t(APP_LANGUAGE_CONSTANT.ACCEPTED)
                  : t(APP_LANGUAGE_CONSTANT.PENDING)}
              </Text>
            </View>
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
      </TouchableOpacity>
    );
  };

  const itemSeparatorComponent = () => <View style={styles.spaceW} />;

  const headerComponent = () => (
    <View style={styles.headerView}>
      <SearchBar value={searchValue} onChangeValue={setSearchValue} />
      <ItemCountText
        title={t(APP_LANGUAGE_CONSTANT.REQUESTED_LIST)}
        number={totalCount}
      />
    </View>
  );

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getReqProductData();
      setRefreshing(false);
    }, 2000);
  };

  return (
    <>
      <Container
        // scrollable={false}
        title={t(APP_LANGUAGE_CONSTANT.REQUEST_PRODUCT)}
        style={[styles.container]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {firstLoader ? (
          <CommonLoader isLoading={firstLoader} />
        ) : // <ActivityIndicator color={Colors.orange10} size={'large'}/>
        reqProductData?.length === 0 && initialLoader ? (
          <EmptyScreen data={emptyData} />
        ) : (
          <FlatList
            initialNumToRender={7}
            data={reqProductData}
            extraData={reqProductData}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={itemSeparatorComponent}
            ListHeaderComponent={headerComponent()}
            contentContainerStyle={[
              styles.contentContainerStyle,
              styles.horizontalSpace
            ]}
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
            // eslint-disable-next-line react/jsx-sort-props
            onEndReached={loadMoreData}
            scrollEnabled={false}
          />
        )}
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
      <GradientButton
        title={t(APP_LANGUAGE_CONSTANT.ADD_REQUEST)}
        style={styles.requestBtn}
        gradientStyle={styles.gradient}
        textStyle={styles.txtStyle}
        rightIcon={
          <View style={styles.addIcon}>
            <Text style={styles.plusTxt}>+</Text>
          </View>
        }
        onPress={() =>
          navigation.navigate('addRequestScreen', { isProductEdit: false })
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  headerView: { paddingVertical: verticalScale(20) },
  spaceW: {
    width: horizontalScale(15),
    height: verticalScale(15)
  },
  container: {
    flex: 1
  },
  itemRightContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: horizontalScale(10)
  },
  contentContainerStyle: {
    paddingBottom:
      Platform.OS === 'ios' ? verticalScale(180) : verticalScale(150),
    paddingHorizontal: PAGE_SPACING
    // width: '100%'
  },
  horizontalSpace: {
    paddingHorizontal: horizontalScale(0)
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  img: {
    height: verticalScale(80),
    width: horizontalScale(80),
    borderRadius: 20
  },
  title: {
    fontSize: Fonts.size.semi,
    fontFamily: Fonts.type.robotoBold,
    color: Colors.black70
  },
  qltTxt: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.robotoRegular,
    color: Colors.gray20,
    marginVertical: verticalScale(3)
  },
  row: {
    ...ApplicationStyles.rowAlignCenterJustifyBetween
  },
  menuIconView: {
    position: 'absolute',
    right: 2,
    top: 2
  },
  priceTxt: {
    flex: 1,
    fontSize: Fonts.size.uprSemi,
    color: Colors.orange10,
    fontFamily: Fonts.type.robotoBold
  },
  statusBtn: {
    backgroundColor: Colors.yellow10,
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(5),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.yellow20
  },
  statusTxt: {
    fontSize: Fonts.size.sminy,
    fontFamily: Fonts.type.robotoRegular,
    color: Colors.white
  },
  acceptedContent: {
    borderColor: Colors.green10,
    backgroundColor: Colors.green10
  },
  requestBtn: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? height * 0.13 : height * 0.1,
    right: 25,
    width: horizontalScale(180)
  },
  gradient: { borderRadius: 30, justifyContent: 'flex-start' },
  addIcon: {
    backgroundColor: Colors.white,
    height: '80%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    position: 'absolute',
    right: '2.5%'
  },
  plusTxt: {
    fontSize: Fonts.size.h3,
    bottom: Platform.OS === 'android' ? 5 : 2,
    left: Platform.OS === 'ios' ? 1 : 0,
    color: Colors.orange10
  },
  txtStyle: { paddingLeft: horizontalScale(25) }
});
