import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import ProductDetails from './ProductDetails';
import WholesaleScreen from './Wholesales';
import CategoryProductScreen from '../../categoryProduct/CategoryProductScreen';

const stack = createNativeStackNavigator();

export default function WholesalesIndex() {
  return (
    <stack.Navigator>
      <stack.Screen
        name="wholsaleScreen"
        component={WholesaleScreen}
        options={{ headerShown: false }}
      />

      <stack.Screen
        name="productDetails"
        component={ProductDetails}
        options={{ headerShown: false }}
      />
      <stack.Screen
        name="categoryProductScreen"
        component={CategoryProductScreen}
        options={{ headerShown: false }}
      />
    </stack.Navigator>
  );
}
