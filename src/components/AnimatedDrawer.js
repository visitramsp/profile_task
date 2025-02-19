import React from 'react';
import { StyleSheet } from 'react-native';

import { useDrawerProgress } from '@react-navigation/drawer';
import Animated, {
  interpolate,
  useAnimatedStyle
} from 'react-native-reanimated';
import { Colors } from '../theme';

export default function AnimatedDrawer({ children }) {
  const drawerProgress = useDrawerProgress();

  const viewStyles = useAnimatedStyle(() => {
    const scale = interpolate(drawerProgress.value, [0, 1], [1, 0.9]);
    const borderRadius = interpolate(drawerProgress.value, [0, 1], [0, 50]);
    return {
      transform: [{ scale }],
      borderRadius
    };
  });

  return (
    <Animated.View style={[styles.safeArea, viewStyles]}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: Colors.white,
    shadowColor: 'rgba(254, 121, 0, 0.1)',
    shadowOffset: { width: -5, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 25
  }
});
