import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  runOnJS,
  useAnimatedProps,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { interpolatePath } from 'react-native-redash';

import TabItem from './TabItem';
import AnimatedCircle from './AnimatedCircle';
import { Colors, width } from '../../theme';
import { getPathXCenter } from '../../utils/path';
import { usePath } from '../../hooks';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const CustomBottomTab = ({
  state,
  descriptors,
  navigation,
  selectIcon
}) => {
  const { containerPath, curvedPaths, tHeight } = usePath(
    state?.routeNames?.length || 0
  );
  const circleXCoordinate = useSharedValue(0);
  const progress = useSharedValue(1);
  const handleMoveCircle = (currentPath) => {
    circleXCoordinate.value = getPathXCenter(currentPath);
  };

  useEffect(() => {
    progress.value = withTiming(state.index + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const animatedProps = useAnimatedProps(() => {
    const currentPath = interpolatePath(
      progress.value,
      Array.from({ length: curvedPaths.length }, (_, index) => index + 1),
      curvedPaths
    );
    runOnJS(handleMoveCircle)(currentPath);
    return {
      d: `${containerPath} ${currentPath}`
    };
  });

  const handleTabPress = (tab) => {
    navigation.navigate(tab);
  };

  return (
    <View style={styles.tabBarContainer}>
      <Svg width={width} height={tHeight} style={styles.shadowMd}>
        <AnimatedPath fill={Colors.primary40} animatedProps={animatedProps} />
      </Svg>
      <AnimatedCircle circleX={circleXCoordinate} />
      <View
        style={[
          styles.tabItemsContainer,
          {
            height: tHeight
          }
        ]}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel ? options.tabBarLabel : route.name;

          return (
            <TabItem
              key={index.toString()}
              label={label}
              icon={selectIcon(route.name)}
              activeIndex={state.index + 1}
              index={index}
              totalTabs={state?.routeNames?.length || 0}
              onTabPress={() => handleTabPress(route.name)}
            />
          );
        })}
      </View>
    </View>
  );
};
export default CustomBottomTab;

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 0,
    shadowOffset: {
      width: 0,
      height: -12
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 24,
    shadowColor: Colors.primary40
  },
  tabItemsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    width: '100%'
  },
  shadowMd: {
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 3 }
  }
});
