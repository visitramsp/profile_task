import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SplashScreen from '../../components/SplashScreen/SplashScreen';
import Datepicker from '../../screens/Datepicker';
import LogisticIndex from '../../screens/logistic';
import DriverDrawer from '../../screens/logistic/DriverScreen/DriverDrawer';
import LogisticPartnerDrawer from '../../screens/logistic/LogisticPartnerDrawer';
import Socket from '../../screens/logistic/MyAccount/Socket';
import Dashboard from '../../screens/Vendor/Dashboard';
import Orders from '../../screens/Vendor/Order/Orderes';
import AddProduct from '../../screens/Vendor/Product/AddProduct';
import Products from '../../screens/Vendor/Product/Products';
import VendorDrawer from '../../screens/Vendor/vendorDrawer/VendorDrawer';

import RetailerDrawer from '../drawerNavigation/RetailerDrawer';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import WelcomeScreen from '../../components/SplashScreen/WelcomeScreen';
import { NAVIGATE_MODE, SCREEN_NAME } from '../../constants';
import CurrentOrder from '../../screens/logistic/DriverScreen/CurrentOrder/CurrentOrder';
import WarehouseScreen from '../../screens/profile/warehouseScreen/WarehouseScreen';
import SettingScreen from '../../screens/profile/settingScreen/SettingScreen';
import SupportScreen from '../../screens/profile/supportScreen/SupportScreen';
import EmailUsScreen from '../../screens/profile/emailUsScreen/EmailUsScreen';
import liveChatScreen from '../../screens/profile/liveChatScreen/LiveChatScreen';

import { StatusBar } from 'react-native';
import WishlistScreen from '../../screens/Retailer/wishlistScreen/WishlistScreen';
import DeliveriesScreen from '../../screens/logistic/deliveriesScreen/DeliveriesScreen';
import UniversalTab from '../universal/UniversalTab';
import DriverStatusScreen from '../../screens/logistic/driverStatusScreen/DriverStatusScreen';
import DriverVehicleScreen from '../../screens/logistic/driverVehicleScreen/DriverVehicleScreen';
import AddDriverScreen from '../../screens/logistic/addDriverScreen/AddDriverScreen';
import OrderDetailScreen from '../../screens/logistic/orderDetailScreen/OrderDetailScreen';
import Users from '../../screens/Vendor/vendorDrawer/UserManagement/Users';
import UserManagement from '../../screens/Vendor/vendorDrawer/UserManagement';
import NotificationScreen from '../../screens/notificationScreen/NotificationScreen';
import AddOutlet from '../../screens/Retailer/Account/Outlets/AddOutlet';
import ComingSoonScreen from '../../screens/commingSoon/ComingSoonScreen';
import TermsAndConditionScreen from '../../screens/termConditionModal/TermsAndConditionScreen';
import ReviewFeedbackScreen from '../../screens/profile/reviewFeedbackScreen/ReviewFeedbackScreen';
import DeleteProduct from '../../screens/Vendor/Product/DeleteProduct';
import UniversalCategoryScreen from '../../screens/universal/universalCategoryScreen/UniversalCategoryScreen';
import UniversalHomeScreen from '../../screens/universal/universalHomeScreen/UniversalHomeScreen';
// import UniversalCategoryScreen from '../../screens/universal/universalCategoryScreen/UniversalCategoryScreen';
import UniversalProductList from '../../screens/universal/products/UniversalProductList';
import UniversalProductDetail from '../../screens/universal/products/UniversalProductDetail';
import ReferAndEarnScreen from '../../screens/universal/referAndEarn/ReferAndEarn';
import OrderDetails from '../../screens/Vendor/Order/OrderDetails';
import WholesaleScreen from '../../screens/Retailer/WholesalesPage/Wholesales';
import ProductDetails from '../../screens/Retailer/WholesalesPage/ProductDetails';
import Orderes from '../../screens/Vendor/Order/Orderes';
import PrivacySecurityScreen from '../../screens/profile/privacySecurityScreen/PrivacySecurityScreen';
import InventryManagementScreen from '../../screens/Vendor/vendorDrawer/InventryManagementScreen/InventryManagementScreen';
import DeleteAccountScreen from '../../screens/profile/deleteAccountScreen/DeleteAccountScreen';
import NotificationAndAlertScreen from '../../screens/profile/notificationAndAlertScreen/NotificationAndAlertScreen';

import AboutUsScreen from '../../screens/universal/AboutUsScreen/AboutUsScreen';
import InventorySync from '../../screens/Vendor/InventorySync';
import UniversalKeyInfoScreen from '../../screens/universal/universalHomeScreen/UniversalKeyInfoScreen';

import SettingScreenNew from '../../screens/settings/settingScreenNew';
import YourAccountScreen from '../../screens/yourAccouunt/yourAccountScreen';
// import Checkout from '../../screens/Retailer/CartScreen/Checkout';

export let navigationRef;
const Stack = createNativeStackNavigator();

const AuthStack = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animation: NAVIGATE_MODE.FADE_BOTTOM
        // cardStyle: { opacity: 1,backgroundColor: 'transparent' }
      }}
      detachInactiveScreens={false}
    ></Stack.Navigator>
  );
};

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animation: NAVIGATE_MODE.FADE_BOTTOM
        // cardStyle: { opacity: 1,backgroundColor: 'transparent' }
      }}
      detachInactiveScreens={false}
    ></Stack.Navigator>
  );
};

const UniversalStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: NAVIGATE_MODE.FADE_BOTTOM
      }}
    >
      {/* <Stack.Screen name={SCREEN_NAME.UNIVERSAL_TAB} component={UniversalTab} /> */}
      <Stack.Screen name="aboutUsScreen" component={SettingScreenNew} />
      <Stack.Screen name="yourAccountScreen" component={YourAccountScreen} />
      {/* <Stack.Screen name="aboutUsScreen" component={AboutUsScreen} /> */}
    </Stack.Navigator>
  );
};

export const UniversaleScreenStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: NAVIGATE_MODE.FADE_BOTTOM
      }}
    >
      <Stack.Screen
        name={SCREEN_NAME.UNIVERSAL_HOME_SCREEN}
        component={UniversalHomeScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.UNIVERSAL_KEY_INFO_SCREEN}
        component={UniversalKeyInfoScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.UNIVERSAL_CATEGORY_SCREEN}
        component={UniversalCategoryScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.UNIVERSAL_PRODUCTLIST}
        component={UniversalProductList}
      />
      <Stack.Screen
        name={SCREEN_NAME.UINVERSAL_PRODUCTDETAIL}
        component={UniversalProductDetail}
      />
    </Stack.Navigator>
  );
};
// LogisticInformation
export default function Index() {
  return (
    <SafeAreaProvider>
      <StatusBar translucent backgroundColor="transparent" />
      <NavigationContainer ref={(ref) => (navigationRef = ref)}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: NAVIGATE_MODE.FADE_BOTTOM
          }}
        >
          {/* Splash Screen start */}
          <Stack.Screen
            name={SCREEN_NAME.SPLASH_SCREEN}
            component={SplashScreen}
          />
          {/* Splash Screen end */}
          {/* WelcomeScreen screen start */}
          <Stack.Screen
            name={SCREEN_NAME.WELCOME_SCREEN}
            component={WelcomeScreen}
          />

          {/* WelcomeScreen screen end */}

          {/* universal screen start */}
          <Stack.Screen
            name={SCREEN_NAME.UNIVERSAL_STACK}
            component={UniversalStack}
          />
          <Stack.Screen
            name={'ReferAndEarnScreen'}
            component={ReferAndEarnScreen}
          />
          {/* universal screen end */}

          {/* auth screen start */}
          <Stack.Screen name={SCREEN_NAME.AUTH_STACK} component={AuthStack} />
          {/* auth screen end */}

          <Stack.Screen name={'OrderDetails'} component={OrderDetails} />
          <Stack.Screen name={SCREEN_NAME.APP_STACK} component={AppStack} />
          <Stack.Screen name="emailUsScreen" component={EmailUsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
