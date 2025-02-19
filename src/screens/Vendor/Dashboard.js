import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState
} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Delivery, AddProduct, Inventry, Payment } from '../../assets/icon';
import {
  ApplicationStyles,
  verticalScale,
  Colors,
  Fonts,
  PAGE_SPACING
} from '../../theme';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import RetailersPriceList from '../../components/vender/RetailerPriceList';
import MainLayout from '../../components/layout/Layout';
import { AnimatedHeader } from '../../components';
import { getCurrentOrders, getRequestProduct } from '../../store/vendor/action';
import { APP_LANGUAGE_CONSTANT, SCREEN_NAME } from '../../constants';
import { useTranslation } from 'react-i18next';
import { showError } from '../../utils';
import { API_CONSTANT } from '../../services/ApiConstant';
import TotalOrders from '../../components/retailer/TotalCard';
import Orders from '../../components/Orders';
import { useFocusEffect } from '@react-navigation/native';

const Dashboard = ({ navigation }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [retailerOfferData, setRetailerOfferData] = useState([]);
  const [totalNoOfProduct, setTotalNoOfProduct] = useState(0);
  const [ordersData, setOrdersData] = useState([]);
  const [isShowHistory, setIsShowHistory] = useState(false);
  const [searchText, setSearchText] = useState('');

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
      subscribe();
      return () => unsubscribe();
    }, [])
  );

  useEffect(() => {
    isActive && (fetchRequestProduct(), fetchCurrentOrder());
  }, [fetchCurrentOrder, fetchRequestProduct, isActive]);

  // useLayoutEffect(() => {
  //   setIsLoading(true);
  // }, []);

  const fetchCurrentOrder = useCallback(() => {
    getCurrentOrders()
      .then((res) => {
        setOrdersData(res?.data?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        showError(err);
      });
  }, []);

  const fetchRequestProduct = useCallback(() => {
    const queryParams = `?pageSize=${API_CONSTANT.LIMIT}`;
    getRequestProduct(queryParams)
      .then((res) => {
        setRetailerOfferData(res?.data?.data);
        setTotalNoOfProduct(res?.data?.pagination?.totalCount);
      })
      .catch((err) => {
        showError(err);
      });
  }, []);

  const onPressRight = () => {
    if (isShowHistory) {
      setIsShowHistory(false);
    } else {
      setIsShowHistory(true);
    }
  };

  const seeAllOrderNavigate = () => {
    navigation.navigate('vendorIndex', {
      screen: 'Orders'
    });
  };

  const navigateProductListEvent = ({ subItem = null, keyword = '' }) => {
    navigation.navigate('vendorIndex', {
      screen: 'Products',
      params: {
        screen: 'Product',
        params: {
          categoryData: subItem,
          keyword: keyword
        }
      }
    });
  };

  return (
    <MainLayout scrollable={false}>
      <AnimatedHeader
        left
        centerIconSize={170}
        isShowHistory={isShowHistory}
        setIsShowHistory={setIsShowHistory}
        value={searchText}
        searchLength={searchText.length}
        onPressRight={onPressRight}
        onChangeText={(text) => {
          setSearchText(text);
        }}
        onSubmitEditing={() => {
          searchText?.trim()?.length > 0 &&
            navigateProductListEvent({ keyword: searchText?.trim() });
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={ApplicationStyles.pageSpacing}>
          <TotalOrders
            creditItem={'100000'}
            currency={t(APP_LANGUAGE_CONSTANT.AED)}
            label1={t(APP_LANGUAGE_CONSTANT.TODAYS_SALES)}
            label2={'Instant Payment'}
          />
        </View>

        <Orders
          isLoading={isLoading}
          currentOrderData={ordersData}
          onPress={seeAllOrderNavigate}
        />

        <View
          style={[
            ApplicationStyles.pageSpacing,
            ApplicationStyles.rowAlignCenterJustifyBetween,
            styles.btnContainer
          ]}
        >
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('addProduct')}
          >
            <LinearGradient
              colors={[Colors.orange10, Colors.orange30]}
              style={styles.icon}
            >
              <AddProduct />
            </LinearGradient>
            <Text style={styles.btnText}>
              {t(APP_LANGUAGE_CONSTANT.ADD)} {'\n'}
              {t(APP_LANGUAGE_CONSTANT.PRODUCT)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate(SCREEN_NAME.COMING_SOON_SCREEN)}
          >
            <LinearGradient
              colors={[Colors.orange10, Colors.orange30]}
              style={styles.icon}
            >
              <Inventry />
            </LinearGradient>
            <Text style={styles.btnText}>
              {t(APP_LANGUAGE_CONSTANT.INVENTORY_SYNC)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('CustomizeOrder')}
          >
            <LinearGradient
              colors={[Colors.orange10, Colors.orange30]}
              style={styles.icon}
            >
              <Delivery height={35} width={35} />
            </LinearGradient>
            <Text style={styles.btnText}>
              {/* {t(APP_LANGUAGE_CONSTANT.QUICK_DELIVERY)} */}
              {t(APP_LANGUAGE_CONSTANT.ADD_CUSTOMIZED_ORDERS)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('FlashSales')}
          >
            <LinearGradient
              colors={[Colors.orange10, Colors.orange30]}
              style={styles.icon}
            >
              <Payment />
            </LinearGradient>
            <Text style={styles.btnText}>
              {/* {t(APP_LANGUAGE_CONSTANT.PAYMENT_STATUS)} */}
              {t(APP_LANGUAGE_CONSTANT.ADD_FLASH_SALES_INPUT)}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <View
            style={[
              ApplicationStyles.pageSpacing,
              ApplicationStyles.rowAlignCenterJustifyBetween,
              styles.retails
            ]}
          >
            <Text style={styles.sectionHeader}>
              {t(APP_LANGUAGE_CONSTANT.RETAILERS_PRICE_OFFER)} (
              {totalNoOfProduct})
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(SCREEN_NAME.RETAIL_PRICE_OFFER, {
                  data: retailerOfferData
                })
              }
            >
              <Text style={[styles.allText, { color: Colors.primary }]}>
                {t(APP_LANGUAGE_CONSTANT.SEE_ALL)}
              </Text>
            </TouchableOpacity>
          </View>

          <RetailersPriceList
            data={retailerOfferData}
            containerStyle={{ paddingLeft: PAGE_SPACING }}
            onPress={() =>
              navigation.navigate(SCREEN_NAME.RETAIL_PRICE_OFFER, {
                data: retailerOfferData
              })
            }
          />
        </View>
        {/* <Buttons
          label1={t(APP_LANGUAGE_CONSTANT.CUSTOMIZED_ORDERS)}
          label2={t(APP_LANGUAGE_CONSTANT.FLASH_SALES_INPUT)}
          navigation1={'CustomizeOrder'}
          navigation2={'FlashSales'}
        /> */}
        <View style={styles.manageSpace} />
      </ScrollView>
    </MainLayout>
  );
};
export default Dashboard;

const styles = StyleSheet.create({
  sectionHeader: {
    ...ApplicationStyles.normalMontserratFont,
    fontWeight: Fonts.Weight.full,
    fontSize: Fonts.size.regularLarge,
    color: Colors.black50
  },
  allText: {
    ...ApplicationStyles.mediumMontserratFont,
    color: Colors.white
  },
  btnContainer: {
    marginTop: verticalScale(10),
    marginBottom: verticalScale(4)
  },
  btn: {
    gap: verticalScale(10),
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    height: 68,
    width: 68,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary
  },
  retails: {
    paddingVertical: verticalScale(12)
  },
  btnText: {
    ...ApplicationStyles.normalMontserratFont,
    fontSize: Fonts.size.sminy,
    textAlign: 'center',
    color: Colors.black,
    fontWeight: Fonts.Weight.bold
  },
  manageSpace: { height: verticalScale(80) }
});
