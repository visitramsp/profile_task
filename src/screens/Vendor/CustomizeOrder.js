import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable
} from 'react-native';
import { Container } from '../../components';
import SearchBar from '../../components/SearchBar';
import {
  verticalScale,
  Colors,
  horizontalScale,
  Fonts,
  height
} from '../../theme';
import {
  ColoredPlusIcon,
  ColoredInfoIcon,
  GrayLocation,
  GrayCart,
  OrangeCart
} from '../../assets/icon';
import LinearGradient from 'react-native-linear-gradient';
import ApplicationStyles, { PAGE_SPACING } from '../../theme/ApplicationStyles';
import FastImage from 'react-native-fast-image';
import { getRetailer, getRetailerHistory } from '../../store/vendor/action';
import { useDebounce } from '../../hooks';
import { showError } from '../../utils';
import { t } from 'i18next';
import { APP_LANGUAGE_CONSTANT } from '../../constants';

const CustomizeOrder = ({ navigation, route }) => {
  const data = route?.params?.data;
  const uuid = route?.params?.uuid;
  const [visible, setVisible] = useState(false);
  const [seletedtedReorder, setSelectedReorder] = useState(1);
  const [retailerData, setRetailerdata] = useState([]);
  const [retailerHistoryData, setRetailerHistoryData] = useState([]);
  const [searchVal, setSearchVal] = useState('');
  const [userId, setUserId] = useState('');

  const debounce = useDebounce(searchVal, 500);
  useEffect(() => {
    if (searchVal?.trim()?.length >= 3) {
      const queryParams = `?search_by_name=${searchVal}`;
      fetchRetailer(queryParams);
    } else if (searchVal?.trim()?.length === 0) {
      fetchRetailer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce]);

  useEffect(() => {
    fetchRetailer();
  }, [fetchRetailer]);

  const fetchRetailer = useCallback((queryParams = '') => {
    getRetailer(queryParams)
      .then((res) => {
        setRetailerdata(res?.data?.data);
      })
      .catch((err) => {
        showError(err);
      });
  }, []);

  const fetchRetailerHistory = useCallback((id) => {
    setUserId(id);
    const queryParams = `?user_id=${id}&pageSize=1&page=1`;
    getRetailerHistory(queryParams)
      .then((res) => {
        setRetailerHistoryData(res?.data?.data);
      })
      .catch((err) => {
        showError(err);
      })
      .finally(() => {
        setVisible(true);
      });
  }, []);

  const onClickAddRetailer = () => {
    navigation.navigate('CustomizedUser', {
      screenName: 'Add Retailer',
      header: 'Retailer Information',
      subHeader: 'Add retailers for automated reordering!',
      nameLable: 'Retailer’s Name',
      namePlaceholder: 'Enter retailer’s Name',
      emailLable: 'Retailer’s Email Address',
      emailPlaceHolder: 'Enter retailer’s Email Address',
      isRetailer: true
    });
  };

  const onClickAddHoReCa = () => {
    navigation.navigate('CustomizedUser', {
      screenName: 'Add HoReCa',
      header: 'HoReCa Information',
      subHeader: 'Add HoReCa for automated reordering!',
      nameLable: 'HoReCa’s Name',
      namePlaceholder: 'Enter HoReCa’s Name',
      emailLable: 'HoReCa’s Email Address',
      emailPlaceHolder: 'Enter HoReCa’s Email Address',
      isRetailer: true
    });
  };

  const placeOrder = () => {
    navigation.navigate('NewOrder', {
      data: data,
      uuid: uuid
    });
  };

  const redirectOrders = () => {
    navigation.navigate('orderes', { retailer_id: userId });
  };

  const _renderOrder = ({ item }) => {
    return (
      <View style={styles.cell}>
        <Text style={styles.name}>{item.RecevierName}</Text>
        <View style={styles.locationContainer}>
          <GrayLocation width={18} height={18} color={Colors.custonLightGray} />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
        <TouchableOpacity
          style={styles.infoBtn}
          onPress={() => fetchRetailerHistory(item?.uuid)}
        >
          <ColoredInfoIcon color={Colors.primary} />
        </TouchableOpacity>
      </View>
    );
  };

  const _renderProduct = ({ item, index }) => {
    return (
      <View style={styles.cellContainer}>
        <FastImage
          source={{ uri: item?.product_arr?.[0]?.db_variant_obj?.images?.[0] }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.detail}>
          <View style={styles.info}>
            <Text style={styles.name} ellipsizeMode="tail">
              {item?.product_arr?.[0]?.db_product_obj?.title}
            </Text>
            <View style={styles.quntitycontainer}>
              <Text style={styles.quntityText}>
                Quantity: {item?.product_arr?.[0]?.quantity} |
              </Text>
              <Text style={styles.quntityText}>
                Pet unit: {item?.product_arr?.[0]?.db_price_obj?.price}
              </Text>
            </View>
          </View>

          <View style={styles.locationContainer}>
            <Text style={styles.priceText}>
              Total Price kk : {item?.product_arr?.[0]?.amount}
            </Text>
          </View>
        </View>
        {/* <TouchableOpacity style={styles.cartBtn}>
          {seletedtedReorder === index ? <OrangeCart /> : <GrayCart />}
        </TouchableOpacity> */}
      </View>
    );
  };

  return (
    <>
      <Container
        // scrollable={false}
        style={styles.containerView}
        title={t(APP_LANGUAGE_CONSTANT.CUSTOMIZED_ORDERS)}
      >
        <View style={styles.searchBar}>
          <SearchBar onChangeValue={setSearchVal} />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={onClickAddRetailer}>
            <LinearGradient
              colors={[Colors.orange10, Colors.orange30]}
              style={styles.btnGradient}
            >
              <View style={styles.icon}>
                <ColoredPlusIcon
                  width={15}
                  height={15}
                  colors={Colors.primary}
                />
              </View>
              <Text style={styles.btnTitle}>
                {t(APP_LANGUAGE_CONSTANT.ADD_RETAILER)}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={onClickAddHoReCa}>
            <LinearGradient
              colors={[Colors.orange10, Colors.orange30]}
              style={styles.btnGradient}
            >
              <View style={styles.icon}>
                <ColoredPlusIcon
                  width={15}
                  height={15}
                  colors={Colors.primary}
                />
              </View>
              <Text style={styles.btnTitle}>
                {t(APP_LANGUAGE_CONSTANT.ADD_HORECA)}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={{}}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Added Retailer</Text>
            <Text style={styles.headerCount}>({retailerData?.length})</Text>
          </View>
          <FlatList
            nestedScrollEnabled={true}
            data={retailerData}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={_renderOrder}
            scrollEnabled={false}
            contentContainerStyle={styles.contentContainerStyle}
          />
          <View style={styles.manageSpace} />
        </View>

        <Modal transparent visible={visible}>
          <View style={styles.modalContainer}>
            <Pressable
              style={styles.pressableContainer}
              onPress={() => setVisible(false)}
            />
            <View style={styles.productContainer}>
              <View
                style={[
                  styles.headerContainer,
                  { marginVertical: verticalScale(25) }
                ]}
              >
                <Text style={styles.headerTitle}>Recent Ordered Products</Text>
                <Text style={styles.headerCount}>
                  ({retailerHistoryData?.length})
                </Text>
              </View>
              <FlatList
                nestedScrollEnabled={true}
                data={retailerHistoryData}
                keyExtractor={(item, index) => `retailsProduct${index}`}
                renderItem={_renderProduct}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
              />
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={[styles.historyBtn]}
                  onPress={redirectOrders}
                >
                  <Text style={styles.modalBtn}>Order History</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <LinearGradient
                    colors={[Colors.orange10, Colors.orange30]}
                    style={styles.historyBtn}
                  >
                    <Text style={[styles.modalBtn, styles.reOrderText]}>
                      Reorder
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View style={styles.modalManageSpace} />
            </View>
          </View>
        </Modal>
      </Container>

      <TouchableOpacity
        style={[ApplicationStyles.pageSpacing, styles.placeOrderBtnContainer]}
        onPress={placeOrder}
      >
        <LinearGradient
          colors={[Colors.orange10, Colors.orange30]}
          style={[styles.placeOrderBtn]}
        >
          <Text style={[styles.placeOrderBtnText]}>
            {t(APP_LANGUAGE_CONSTANT.PLACE_NEW_ORDER)}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );
};

export default CustomizeOrder;

const styles = StyleSheet.create({
  containerView: { marginTop: 0 },
  searchBar: {
    paddingVertical: verticalScale(16)
  },
  btnContainer: {
    marginVertical: verticalScale(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  btn: {
    shadowColor: Colors.primary,
    shadowOffset: { height: 1, width: 1 },
    shadowRadius: 4,
    shadowOpacity: 2,
    elevation: 5,
    width: '48%'
  },
  btnGradient: {
    paddingVertical: verticalScale(4),
    paddingHorizontal: horizontalScale(4),
    borderRadius: 22.5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(5),
    paddingRight: horizontalScale(16)
  },
  icon: {
    padding: horizontalScale(10),
    backgroundColor: Colors.white,
    height: 35,
    width: 35,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnTitle: {
    fontFamily: Fonts.type.montserrat,
    fontWeight: Fonts.Weight.bold,
    fontSize: Fonts.size.small + 0.5,
    color: Colors.white
  },
  placeOrderBtnContainer: {
    position: 'absolute',
    bottom: verticalScale(110),
    width: '100%'
  },
  placeOrderBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 66,
    borderRadius: 20
  },
  placeOrderBtnText: {
    fontSize: Fonts.size.h20,
    fontFamily: Fonts.type.montserrat,
    fontWeight: Fonts.Weight.bold,
    color: Colors.white
  },
  headerContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginVertical: verticalScale(16),
    gap: horizontalScale(6)
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
  cell: {
    padding: horizontalScale(16),
    borderRadius: 20,
    borderWidth: 1,
    gap: horizontalScale(8),
    borderColor: Colors.gray10
  },
  detail: {
    flex: 1,
    gap: horizontalScale(8)
  },
  info: {
    gap: horizontalScale(8)
  },
  name: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.semi,
    color: Colors.black70,
    flexWrap: 'wrap'
  },
  locationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: horizontalScale(4)
  },
  locationText: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.semi,
    color: Colors.gray10
  },
  contentContainerStyle: {
    gap: verticalScale(16)
  },
  infoBtn: {
    position: 'absolute',
    top: '50%',
    right: horizontalScale(16)
  },
  modalContainer: {
    flex: 1
  },
  pressableContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.white140
  },
  productContainer: {
    height: height / 2,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: PAGE_SPACING,
    width: '100%',
    position: 'absolute',
    bottom: -verticalScale(16)
  },
  cellContainer: {
    flexDirection: 'row',
    gap: horizontalScale(12)
  },
  image: {
    height: verticalScale(70),
    width: horizontalScale(70),
    borderRadius: 10
  },
  quntitycontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: horizontalScale(6)
  },
  quntityText: {
    ontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.small,
    color: Colors.gray10
  },
  content: {
    gap: verticalScale(8)
  },
  priceText: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.small,
    color: Colors.black
  },
  manageSpace: { height: verticalScale(200) },
  modalManageSpace: { height: verticalScale(60) },
  historyBtn: {
    padding: horizontalScale(12),
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.primary,
    minWidth: horizontalScale(140),
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalBtn: {
    fontFamily: Fonts.type.montserrat,
    fontWeight: Fonts.Weight.semi,
    fontSize: Fonts.size.h20,
    color: Colors.primary
  },
  reOrderText: {
    color: Colors.white
  }
});
