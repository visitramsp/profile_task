import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, { useAnimatedStyle } from 'react-native-reanimated';
import { width } from '../theme';

function LeftAction(prog, drag) {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value - 50 }]
    };
  });

  return (
    <Reanimated.View style={styleAnimation}>
      <Text style={styles.leftAction}>Text</Text>
    </Reanimated.View>
  );
}

function RightAction(prog, drag) {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + 50 }]
    };
  });

  return (
    <Reanimated.View style={styleAnimation}>
      <Text style={styles.rightAction}>Text</Text>
    </Reanimated.View>
  );
}

export default function SwipeContent({ children }) {
  return (
    <GestureHandlerRootView>
      <ReanimatedSwipeable
        enableTrackpadTwoFingerGesture
        containerStyle={styles.swipeable}
        friction={1}
        leftThreshold={10}
        rightThreshold={10}
        renderLeftActions={LeftAction}
        renderRightActions={RightAction}
      >
        {children}
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  leftAction: { width: 46, height: 56, backgroundColor: 'crimson' },
  rightAction: { width: 46, height: 56, backgroundColor: 'purple' },
  swipeable: {
    width: width,
    backgroundColor: 'papayawhip',
    alignItems: 'center',
    alignSelf: 'center'
  }
});
