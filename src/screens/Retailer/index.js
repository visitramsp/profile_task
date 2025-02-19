import React, { useLayoutEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './Dashboard';
import WholesalesIndex from './WholesalesPage';
import CustomBottomTab from '../../components/bottomTabs/CustomBottomTab';
import {
  Dashboard as DashboardIcon,
  Wholeseller,
  User,
  Cart
} from '../../assets/icon';
import RequestProduct from './RequestProduct';
import AnimatedDrawer from '../../components/AnimatedDrawer';
import AddRequestScreen from './addRequestScreen/AddRequestScreen';
import CartScreen from '../cartScreen/CartScreen';
import AccountStack from '../profile';
import { CartStore } from '../../staticStore/CartStore';
import WholesaleScreen from './WholesalesPage/Wholesales';
import CategoryProductScreen from '../categoryProduct/CategoryProductScreen';
import ProductDetails from './WholesalesPage/ProductDetails';
import { SCREEN_NAME } from '../../constants';
import UniversalCategoryScreen from '../universal/universalCategoryScreen/UniversalCategoryScreen';

const Tab = createBottomTabNavigator();
export const wholesales = 'Wholesales';
const dashboard = 'Dashboard';
const account = 'Account';
const cart = 'Cart';
const main = 'Main';

// Stack screens
export const requestProduct = 'RequestProduct';

export default function RetailerIndex() {
  const selectIcon = (routeName) => {
    switch (routeName) {
      case wholesales:
        return Wholeseller;
      case dashboard:
        return DashboardIcon;
      case account:
        return User;
      case cart:
        return Cart;
      default:
        return DashboardIcon;
    }
  };

  useLayoutEffect(() => {
    CartStore.initialSetup();
  }, []);

  const tabBar = (props) => (
    <CustomBottomTab {...props} selectIcon={selectIcon} />
  );

  return (
    <AnimatedDrawer>
      <Tab.Navigator
        initialRouteName={dashboard}
        tabBar={tabBar}
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen name={dashboard} component={StackDashboard} />
        <Tab.Screen
          name={wholesales}
          options={{ unmountOnBlur: true }}
          component={WholesalesIndex}
        />
        <Tab.Screen name={account} component={AccountStack} />
        <Tab.Screen name={cart} component={CartScreen} />
      </Tab.Navigator>
    </AnimatedDrawer>
  );
}

const StackDashboard = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={main}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={main} component={Dashboard} />
      <Stack.Screen name={requestProduct} component={RequestProduct} />
      <Stack.Screen name={'addRequestScreen'} component={AddRequestScreen} />
      <Stack.Screen name="restockRefreshScreen" component={WholesaleScreen} />
      <Stack.Screen
        name="categoryProductScreen"
        component={CategoryProductScreen}
      />
      <Stack.Screen
        name="productDetails"
        component={ProductDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SCREEN_NAME.UNIVERSAL_CATEGORY_SCREEN}
        component={UniversalCategoryScreen}
      />
    </Stack.Navigator>
  );
};
