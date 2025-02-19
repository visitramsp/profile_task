import React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import VenderDrawerContent from './VenderDrawerContent';
import { Colors } from '../../../theme';
import VendorIndex from '../VendorIndex';

const Drawer = createDrawerNavigator();
const userContact = 'user@example.com';

export default function VendorDrawer() {
  function drawerContent(props) {
    return <VenderDrawerContent {...props} userContact={userContact} />;
  }
  return (
    <Drawer.Navigator
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
      <Drawer.Screen name="vendorIndex" component={VendorIndex} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  sceneStyle: {
    backgroundColor: Colors.white
  }
});
