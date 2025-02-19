import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import CustomBottomTab from '../../components/bottomTabs/CustomBottomTab';
import { ExploreMenu, HomeMenu, UserMenu } from '../../assets/icon';
import { SCREEN_NAME } from '../../constants';
import ExploreScreen from '../../screens/universal/explore/ExploreScreen';
import UniversalAccountScreen from '../../screens/universal/universalAccountScreen/UniversalAccountScreen';
import { UniversaleScreenStack } from '../stackNavigation';

const Tab = createBottomTabNavigator();

const UniversalTab = () => {
  const selectIcon = (routeName) => {
    switch (routeName) {
      case SCREEN_NAME.UNIVERSAL_HOME:
        return HomeMenu;
      case SCREEN_NAME.EXPLORE:
        return ExploreMenu;
      default:
        return UserMenu;
    }
  };

  return (
    <Tab.Navigator
      initialRouteName={SCREEN_NAME.UNIVERSAL_HOME}
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={(props) => <CustomBottomTab {...props} selectIcon={selectIcon} />}
      screenOptions={() => ({
        headerShown: false
      })}
    >
      <Tab.Screen name={SCREEN_NAME.EXPLORE} component={ExploreScreen} />
      {/* <Tab.Screen
        name={SCREEN_NAME.UNIVERSAL_CATEGORY_SCREEN}
        component={UniversalCategoryScreen}
      /> */}
      <Tab.Screen
        name={SCREEN_NAME.UNIVERSAL_HOME}
        component={UniversaleScreenStack}
      />
      <Tab.Screen
        name={SCREEN_NAME.MY_ACCOUNT}
        component={UniversalAccountScreen}
      />
    </Tab.Navigator>
  );
};

export default UniversalTab;
