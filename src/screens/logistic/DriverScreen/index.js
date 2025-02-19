import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  Dashboard as DashboardIcon,
  Delivery,
  Support,
  User
} from '../../../assets/icon';
import AnimatedDrawer from '../../../components/AnimatedDrawer';
import CustomBottomTab from '../../../components/bottomTabs/CustomBottomTab';
import DriverAccount from './DriverAccount/DriverAccount';
import DriverDashboard from './DriverDashboard/DriverDashboard';
import DriverDeliveries from './DriverDeliveries/DriverDeliveries';
import SupportScreen from './DriverSupport/DriverSupport';

const Tab = createBottomTabNavigator();

const support = 'Support';
const dashboard = 'Dashboard';
const deliveries = 'Deliveries';
const account = 'My Account';
const main = 'Main';

export default function DriverBottomTab() {
  const selectIcon = (routeName) => {
    switch (routeName) {
      case support:
        return Support;
      case dashboard:
        return DashboardIcon;
      case account:
        return User;
      case deliveries:
        return Delivery;
      default:
        return DashboardIcon;
    }
  };

  const tabBar = (props) => (
    <CustomBottomTab {...props} selectIcon={selectIcon} />
  );

  return (
    <AnimatedDrawer>
      <Tab.Navigator
        initialRouteName={dashboard}
        tabBar={tabBar}
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen name={dashboard} component={StackDashboard} />
        <Tab.Screen name={support} component={SupportScreen} />
        <Tab.Screen name={deliveries} component={DriverDeliveries} />
        <Tab.Screen name={account} component={DriverAccount} />
      </Tab.Navigator>
    </AnimatedDrawer>
  );
}

const StackDashboard = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={main}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={main} component={DriverDashboard} />
    </Stack.Navigator>
  );
};
