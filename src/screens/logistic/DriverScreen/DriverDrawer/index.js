import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';

import TermsAndConditionScreen from '../../../termConditionModal/TermsAndConditionScreen';

import DriverDashboard from '../DriverDashboard/DriverDashboard';
import DriverBottomTab from '..';
import { Logout, onPressLogOut } from '../../../../utils';
import { Colors } from '../../../../theme';

const Drawer = createDrawerNavigator();

const userContact = 'user@example.com';

export default function DriverDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="driverBottomTab"
      // eslint-disable-next-line react/no-unstable-nested-components
      drawerContent={(props) => (
        <CustomDrawerContent {...props} userContact={userContact} />
      )}
      screenOptions={({ route, navigation }) => {
        return {
          drawerStyle: {
            width: '80%'
          },
          headerShown: false
        };
      }}
    >
      <Drawer.Screen
        name="driverBottomTab"
        component={DriverBottomTab}
        options={{
          headerShown: false,
          drawerLabel: () => null,
          title: '',
          drawerItemStyle: { height: 0 }
        }}
      />

      <Drawer.Screen
        name="driverDashboard"
        component={DriverDashboard}
        options={{
          headerShown: false,
          drawerLabel: () => null,
          title: '',
          drawerItemStyle: { height: 0 }
        }}
      />

      <Drawer.Screen
        name="termsAndConditionScreen"
        component={TermsAndConditionScreen}
        options={{
          headerShown: false,
          title: 'Terms & Condition',
          drawerLabelStyle: {
            color: Colors.slate130
          }
        }}
      />

      <Drawer.Screen
        name="logout"
        component={Logout}
        listeners={{
          drawerItemPress: onPressLogOut
        }}
        options={{
          headerShown: false,

          title: 'Logout',
          drawerLabelStyle: {
            color: Colors.redColor
          }
        }}
      />
    </Drawer.Navigator>
  );
}
