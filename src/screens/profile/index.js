import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './profileScreen/ProfileScreen';
import UpdateProfileScreen from './updateProfileScreen/UpdateProfileScreen';
import { NAVIGATE_MODE, SCREEN_NAME } from '../../constants';
import CompanyDetailScreen from './CompanyDetailScreen/CompanyDetailScreen';
import SettingScreen from './settingScreen/SettingScreen';
import SupportScreen from './supportScreen/SupportScreen';
import WarehouseScreen from './warehouseScreen/WarehouseScreen';
import ChangePasswordScreen from './changePasswordScreen/ChangePasswordScreen';
import PrivacySecurityScreen from './privacySecurityScreen/PrivacySecurityScreen';
import DeleteAccountScreen from './deleteAccountScreen/DeleteAccountScreen';
const AccountStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: NAVIGATE_MODE.FADE_BOTTOM
      }}
    >
      <Stack.Screen
        name={SCREEN_NAME.PROFILE_SCREEN}
        component={ProfileScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.UPDATE_PROFILE_SCREEN}
        component={UpdateProfileScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.WAREHOUSE_SCREEN}
        component={WarehouseScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.COMPANY_DETAILS_SCREEN}
        component={CompanyDetailScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.SETTING_SCREEN}
        component={SettingScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.SUPPORT_SCREEN}
        component={SupportScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.CHANGE_PASSWORD_SCREEN}
        component={ChangePasswordScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.DELETE_ACCOUNT}
        component={DeleteAccountScreen}
      />

      <Stack.Screen
        name={SCREEN_NAME.PRIVACY_SECURITY_SCREEN}
        component={PrivacySecurityScreen}
      />
    </Stack.Navigator>
  );
};

export default AccountStack;
