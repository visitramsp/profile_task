import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Orderes from './Orderes';
import OrderDetails from './OrderDetails';

const Stack = createNativeStackNavigator();

export default function OrderRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Orderes"
    >
      <Stack.Screen name="Orderes" component={Orderes} />
      <Stack.Screen name={'OrderDetails'} component={OrderDetails} />
    </Stack.Navigator>
  );
}
