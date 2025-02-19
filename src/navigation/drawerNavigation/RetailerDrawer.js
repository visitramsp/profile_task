import React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import RetailerIndex from '../../screens/Retailer';
import UserManagement from '../../screens/Vendor/vendorDrawer/UserManagement';

import RetailerDrawerContent from './RetailerDrawerContent';
import { Colors } from '../../theme';
import SupportScreen from '../../screens/profile/supportScreen/SupportScreen';

const Drawer = createDrawerNavigator();
const userContact = 'user@example.com';

export default function RetailerDrawer() {
  function drawerContent(props) {
    return <RetailerDrawerContent {...props} userContact={userContact} />;
  }
  return (
    <Drawer.Navigator
      initialRouteName="retailerIndex"
      screenOptions={() => {
        return {
          headerShown: false,
          swipeEnabled: false,
          drawerStyle: {
            width: '75%'
          },
          drawerType: 'slide',
          sceneContainerStyle: styles.sceneStyle,
          overlayColor: 'transparent'
          // swipeEdgeWidth: Platform.OS === 'android' && 180
        };
      }}
      drawerContent={drawerContent}
    >
      <Drawer.Screen name="retailerIndex" component={RetailerIndex} />

      <Drawer.Screen name="userManagement" component={UserManagement} />

      <Drawer.Screen name="support" component={SupportScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  sceneStyle: {
    backgroundColor: Colors.white
  }
});
