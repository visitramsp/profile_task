import React, { useEffect, useLayoutEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './Dashboard';
import ProductRoutes from './Product';
import OrderRoutes from './Order';
import CustomBottomTab from '../../components/bottomTabs/CustomBottomTab';
import {
  Dashboard as DashboardICon,
  UserMenu,
  Product,
  Box
} from '../../assets/icon';
import AnimatedDrawer from '../../components/AnimatedDrawer';
import RetailPriceOffer from './RetailsPriceOffer';
import CustomizeOrder from './CustomizeOrder';
import FlashSales from './FlashSales';
import CustomizedUser from '../../components/vender/CustomizedUser';
import NewOrder from './NewOrder';
import AddProduct from './AddProduct';
import { NAVIGATE_MODE } from '../../constants';
import AccountStack from '../profile';
import OrderSummaryModal from '../../components/commonModal/OrderSummaryModal';
import { DeviceEventEmitter } from 'react-native';
import { EVENT_EMITTER_NAME } from '../../constants/Enum';

const Stack = createNativeStackNavigator();

function VenderStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: NAVIGATE_MODE.FADE_BOTTOM
      }}
    >
      <Stack.Screen name="VendorDashboard" component={Dashboard} />
      <Stack.Screen name={'RetailPriceOffer'} component={RetailPriceOffer} />
      <Stack.Screen name={'CustomizeOrder'} component={CustomizeOrder} />
      <Stack.Screen name={'FlashSales'} component={FlashSales} />
      <Stack.Screen name={'CustomizedUser'} component={CustomizedUser} />
      <Stack.Screen name={'NewOrder'} component={NewOrder} />
      <Stack.Screen name={'AddProduct'} component={AddProduct} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const product = 'Products';
const dashboard = 'Dashboard';
const account = 'MyAccount';
const order = 'Orders';

export default function VendorIndex() {
  const [isOpen, setIsOpen] = useState(false);
  const [orderData, setOrderData] = useState(null);

  useLayoutEffect(() => {
    const subscribe = DeviceEventEmitter.addListener(
      EVENT_EMITTER_NAME.OPENORDERSUMMARY,
      (data) => {
        setOrderData(data);
      }
    );

    return () => {
      subscribe.remove();
    };
  }, []);

  useEffect(() => {
    if (orderData) {
      setIsOpen(true);
    }
  }, [orderData]);

  const selectIcon = (routeName) => {
    switch (routeName) {
      case dashboard:
        return DashboardICon;
      case product:
        return Product;
      case account:
        return Box;
      default:
        return UserMenu;
    }
  };

  return (
    <>
      <AnimatedDrawer>
        <Tab.Navigator
          initialRouteName={dashboard}
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBar={(props) => (
            <CustomBottomTab {...props} selectIcon={selectIcon} />
          )}
          screenOptions={() => ({
            headerShown: false
          })}
        >
          <Tab.Screen name={dashboard} component={VenderStack} />
          <Tab.Screen
            name={product}
            options={{ unmountOnBlur: true }}
            component={ProductRoutes}
          />

          <Tab.Screen name={account} component={AccountStack} />
          {/* <Tab.Screen name={insights} component={Insights} /> */}
          <Tab.Screen name={order} component={OrderRoutes} />
        </Tab.Navigator>
      </AnimatedDrawer>
      <OrderSummaryModal
        visible={isOpen}
        orderData={orderData}
        handleVisible={() => {
          setIsOpen(!isOpen);
        }}
      />
    </>
  );
}
