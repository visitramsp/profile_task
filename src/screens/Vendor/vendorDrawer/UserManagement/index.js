import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AddUser from './AddUser';
import User from './Users';
import { NAVIGATE_MODE } from '../../../../constants';

const Stack = createNativeStackNavigator();

export default function UserManagement() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: NAVIGATE_MODE.FADE_BOTTOM
      }}
    >
      <Stack.Screen name={'User'} component={User} />
      <Stack.Screen name={'AddUser'} component={AddUser} />
    </Stack.Navigator>
  );
}

//
