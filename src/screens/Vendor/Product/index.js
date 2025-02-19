import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Products from './Products';
import AddProduct from './AddProduct';
import AddVarinats from './AddVariants';
import ProductDetails from '../../Retailer/WholesalesPage/ProductDetails';

const Stack = createNativeStackNavigator();

export default function ProductRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Product"
    >
      <Stack.Screen name="Product" component={Products} />
      <Stack.Screen name={'AddProduct'} component={AddProduct} />
      <Stack.Screen name={'productDetails'} component={ProductDetails} />
      <Stack.Screen name={'AddVarinats'} component={AddVarinats} />
    </Stack.Navigator>
  );
}

//ProductVariantAdd
