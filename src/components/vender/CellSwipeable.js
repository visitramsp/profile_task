import React from 'react';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

function CellSwipeable({
  children,
  leftAction,
  rightAction,
  reference,
  onSwipeableOpenStartDrag,
  ...rest
}) {
  return (
    <GestureHandlerRootView>
      <ReanimatedSwipeable
        enableTrackpadTwoFingerGesture
        ref={reference}
        friction={1}
        leftThreshold={20}
        rightThreshold={20}
        renderLeftActions={leftAction}
        renderRightActions={rightAction}
        onSwipeableOpenStartDrag={onSwipeableOpenStartDrag}
        {...rest}
      >
        {children}
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
  );
}

export default CellSwipeable;
