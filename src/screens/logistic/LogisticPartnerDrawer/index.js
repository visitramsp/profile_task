import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import { Colors } from '../../../theme';

import LogisticIndex from '..';
import TermsAndConditionScreen from '../../termConditionModal/TermsAndConditionScreen';
import LogisticDashboard from '../logisticDashboard';
import { Logout, onPressLogOut } from '../../../utils';

const Drawer = createDrawerNavigator();

const userContact = 'user@example.com';

export default function LogisticPartnerDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="logisticIndex"
      // eslint-disable-next-line react/no-unstable-nested-components
      drawerContent={(props) => (
        <CustomDrawerContent {...props} userContact={userContact} />
      )}
      screenOptions={() => {
        return {
          drawerStyle: {
            width: '80%',
            backgroundColor: Colors.white // Set the drawer background to transparent
          },
          headerShown: false,
          sceneContainerStyle: {
            backgroundColor: Colors.white, // Color of the space between drawer and home screen
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 6
            },
            shadowOpacity: 0.37,
            shadowRadius: 7.49,
            elevation: 12
          },
          overlayColor: 'rgba(0, 0, 0, 0)' // Background overlay color with slight transparency
        };
      }}
    >
      <Drawer.Screen
        name="logisticIndex"
        component={LogisticIndex}
        options={{
          headerShown: false,
          drawerLabel: () => null,
          title: '',
          drawerItemStyle: { height: 0 }
        }}
      />

      <Drawer.Screen
        name="retailerDashboard"
        component={LogisticDashboard}
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
          title: 'Logout',
          drawerLabelStyle: {
            color: Colors.redColor
          }
        }}
      />
    </Drawer.Navigator>
  );
}
