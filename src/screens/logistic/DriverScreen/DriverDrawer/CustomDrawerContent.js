import {
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors, Fonts } from '../../../../theme';

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => props.navigation.closeDrawer()}
        >
          <AntDesign name="close" size={25} color={Colors.slate130} />
        </TouchableOpacity>
        <Text style={styles.menuText}>MENU</Text>
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,

    position: 'relative'
  },
  menuButton: {
    marginRight: 10
  },
  menuText: {
    position: 'absolute',
    left: '50%',
    fontSize: 20,
    color: Colors.black10,
    fontFamily: Fonts.type.robotoBold,
    letterSpacing: 1
  }
});
