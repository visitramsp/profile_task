import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NAVIGATE_MODE, SCREEN_NAME } from '../../constants';

// import UniversalCategoryScreen from '../../screens/universal/universalCategoryScreen/UniversalCategoryScreen';
import SettingScreenNew from '../../screens/settings/settingScreenNew';
import YourAccountScreen from '../../screens/yourAccouunt/yourAccountScreen';
// import Checkout from '../../screens/Retailer/CartScreen/Checkout';

export let navigationRef;
const Stack = createNativeStackNavigator();

const UniversalStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: NAVIGATE_MODE.FADE_BOTTOM
      }}
    >
      {/* <Stack.Screen name={SCREEN_NAME.UNIVERSAL_TAB} component={UniversalTab} /> */}
      <Stack.Screen name="settingScreenNew" component={SettingScreenNew} />
      <Stack.Screen name="yourAccountScreen" component={YourAccountScreen} />
      {/* <Stack.Screen name="aboutUsScreen" component={AboutUsScreen} /> */}
    </Stack.Navigator>
  );
};

// export const UniversaleScreenStack = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//         animation: NAVIGATE_MODE.FADE_BOTTOM
//       }}
//     >
//       <Stack.Screen
//         name={SCREEN_NAME.UNIVERSAL_HOME_SCREEN}
//         component={UniversalHomeScreen}
//       />
//       <Stack.Screen
//         name={SCREEN_NAME.UNIVERSAL_KEY_INFO_SCREEN}
//         component={UniversalKeyInfoScreen}
//       />
//       <Stack.Screen
//         name={SCREEN_NAME.UNIVERSAL_CATEGORY_SCREEN}
//         component={UniversalCategoryScreen}
//       />
//       <Stack.Screen
//         name={SCREEN_NAME.UNIVERSAL_PRODUCTLIST}
//         component={UniversalProductList}
//       />
//       <Stack.Screen
//         name={SCREEN_NAME.UINVERSAL_PRODUCTDETAIL}
//         component={UniversalProductDetail}
//       />
//     </Stack.Navigator>
//   );
// };
// LogisticInformation
export default function Index() {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={(ref) => (navigationRef = ref)}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: NAVIGATE_MODE.FADE_BOTTOM
          }}
        >
          {/* Splash Screen start */}
          {/* <Stack.Screen
            name={SCREEN_NAME.SPLASH_SCREEN}
            component={SplashScreen}
          /> */}
          {/* Splash Screen end */}
          {/* WelcomeScreen screen start */}
          {/* <Stack.Screen
            name={SCREEN_NAME.WELCOME_SCREEN}
            component={WelcomeScreen}
          /> */}

          {/* WelcomeScreen screen end */}

          {/* universal screen start */}
          <Stack.Screen
            name={SCREEN_NAME.UNIVERSAL_STACK}
            component={UniversalStack}
          />

          {/* universal screen end */}

          {/* auth screen start */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
