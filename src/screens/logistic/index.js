import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  Dashboard as DashboardIcon,
  Delivery,
  InsightMenu,
  User
} from '../../assets/icon';
import AnimatedDrawer from '../../components/AnimatedDrawer';
import CustomBottomTab from '../../components/bottomTabs/CustomBottomTab';
import Dashboard from './Dashboard';
import Deliveries from './Deliveries';

const Tab = createBottomTabNavigator();
const insights = 'Insights';
const deliveries = 'Deliveries';
const account = 'My Account';
const dashboard = 'Dashboard';
const main = 'Main';

export default function LogisticIndex() {
  const selectIcon = (routeName) => {
    switch (routeName) {
      case insights:
        return InsightMenu;
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
        <Tab.Screen name={deliveries} component={Deliveries} />
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
      <Stack.Screen name={main} component={Dashboard} />
    </Stack.Navigator>
  );
};
