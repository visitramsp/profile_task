import React, { useCallback, useEffect, useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  View,
  RefreshControl
} from 'react-native';
import MainLayout from '../../components/layout/Layout';
import Orders from '../../components/Orders';
import Buttons from './components/Buttons';
import { ApplicationStyles, horizontalScale, verticalScale } from '../../theme';
import CategoriesListContent from '../../components/listContent/Categories';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { wholesales } from '.';
import { AnimatedHeader } from '../../components';
import ProductList from '../../components/listContent/ProductList';
import TotalOrders from '../../components/retailer/TotalCard';
import {
  getCurrentOrderList,
  getFlashSalesList
} from '../../store/retailer/action';
import { PAGE_SPACING } from '../../theme/ApplicationStyles';
import ContentHeader from './components/ContentHeader';
import { APP_LANGUAGE_CONSTANT, SCREEN_NAME } from '../../constants';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { showError } from '../../utils';

export default function Dashboard() {
  const { t } = useTranslation();
  const userDetail = useSelector((state) => state.user.userDetail);
  const categoryData = useSelector((state) => state.app.categoryList);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading1, setIsLoading1] = useState(true);
  const [flashData, setFlashData] = useState([]);
  const [creditData, setCreditData] = useState({});
  const [currentOrderData, setCurrentOrderData] = useState([]);
  const [isShowHistory, setIsShowHistory] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
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
    setCreditData(userDetail);
  }, [userDetail]);

  // limit=${API_CONSTANT.LIMIT}
  const getFlashSalesData = useCallback(() => {
    const queryParams = `?search_by_name&condition=&page=${1}`;
    getFlashSalesList(queryParams)
      .then((response) => {
        setIsLoading1(false);
        setFlashData(response?.data?.data);
      })
      .catch((err) => {
        setIsLoading1(false);
        showError(err);
      });
  }, []);

  const getCurrentOrderData = useCallback(() => {
    getCurrentOrderList()
      .then((response) => {
        setCurrentOrderData(response?.data?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        showError(err);
      });
  }, []);

  useEffect(() => {
    isActive && (getCurrentOrderData(), getFlashSalesData());
  }, [getCurrentOrderData, getFlashSalesData, isActive]);

  const { navigate } = useNavigation();

  const redirectWholesales = () => {
    navigate(SCREEN_NAME.RESTOCK_REFRESH_SCREEN, {
      restockRefreshStatus: true
    });
  };

  const onPressRight = () => {
    if (isShowHistory) {
      setIsShowHistory(false);
    } else {
      setIsShowHistory(true);
    }
  };
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getCurrentOrderData();
      getFlashSalesData();
      setRefreshing(false);
    }, 2000);
  };

  const redirectCurrentOrder = () => {
    navigate(SCREEN_NAME.ORDERS_SCREEN);
  };

  const navigateCategoryListEvent = (item = null) => {
    if (item) {
      navigateProductListEvent({ subItem: item });
    } else {
      navigate(SCREEN_NAME.UNIVERSAL_CATEGORY_SCREEN, {
        event: ({ subItem, keyword }) =>
          navigateProductListEvent({ subItem, keyword })
      });
    }
  };

  const navigateProductListEvent = ({ subItem = null, keyword = '' }) => {
    navigate(wholesales, {
      screen: 'wholsaleScreen',
      params: {
        categoryData: subItem,
        keyword: keyword
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

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={ApplicationStyles.pageSpacing}>
          <TotalOrders creditItem={creditData?.credit_amount} />
        </View>

        <Orders
          isLoading={isLoading}
          currentOrderData={currentOrderData}
          onPress={redirectCurrentOrder}
        />
        <View style={ApplicationStyles.pageSpacing}>
          <ContentHeader
            title={t(APP_LANGUAGE_CONSTANT.RESTOCK_REFRESH)}
            onPress={() => redirectWholesales()}
          />
          {/* <CountdownTimer /> */}
        </View>
        <View style={styles.flashView}>
          <ProductList
            horizontal
            isLoading={isLoading1}
            data={flashData}
            showsHorizontalScrollIndicator={false}
            itemStyle={{ marginLeft: horizontalScale(0) }}
            columnWrapperStyle={undefined}
            contentContainerStyle={styles.contentContainerStyle}
            onPress={(item) => {
              // navigate(SCREEN_NAME.RESTOCK_REFRESH_SCREEN, {
              //   restockRefreshStatus: true
              // });
              navigate(SCREEN_NAME.PRODUCT_DETAILS_SCREEN, {
                id: item?.findProductObj?.uuid,
                categoryId: item?.category_id,
                isRestockRefresh: true,
                productTime: item?.end_date
              });
            }}
          />
        </View>
        <Buttons navigation2={SCREEN_NAME.COMING_SOON} />

        <View style={ApplicationStyles.pageSpacing}>
          <ContentHeader
            title={t(APP_LANGUAGE_CONSTANT.CATEGORIES)}
            onPress={() => navigateCategoryListEvent()}
          />
        </View>

        <CategoriesListContent
          data={categoryData}
          onPress={navigateCategoryListEvent}
        />
        <View
          style={{
            height:
              Platform.OS === 'ios' ? verticalScale(130) : verticalScale(100)
          }}
        />
      </ScrollView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: PAGE_SPACING,
    paddingBottom: PAGE_SPACING
  },
  flashView: { marginTop: verticalScale(20) }
});
