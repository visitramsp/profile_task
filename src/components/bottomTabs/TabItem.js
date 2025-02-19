import { Platform, Pressable, StyleSheet, Text } from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import { ApplicationStyles, Colors, width } from '../../theme';
import { getPathXCenterByIndex } from '../../utils/path';
import Fonts from '../../theme/Fonts';
import { usePath } from '../../hooks';

const ICON_SIZE = 22;
const LABEL_WIDTH = width / 4;
const AnimatedIcon = Animated.createAnimatedComponent(Feather);

const TabItem = ({
  label,
  icon: TabIcon,
  totalTabs,
  index,
  activeIndex,
  onTabPress
}) => {
  const { curvedPaths } = usePath(totalTabs);
  const animatedActiveIndex = useSharedValue(activeIndex);
  const iconPosition = getPathXCenterByIndex(curvedPaths, index);
  const labelPosition = getPathXCenterByIndex(curvedPaths, index);

  const tabStyle = useAnimatedStyle(() => {
    const translateY =
      animatedActiveIndex.value - 1 === index
        ? Platform.OS === 'ios'
          ? -12
          : -14
        : 15;
    const iconPositionX = iconPosition - index * ICON_SIZE;
    return {
      width: ICON_SIZE,
      height: ICON_SIZE,
      transform: [
        { translateY: withTiming(translateY) },
        { translateX: iconPositionX - ICON_SIZE / 2 }
      ]
    };
  });

  const labelContainerStyle = useAnimatedStyle(() => {
    const translateY = animatedActiveIndex.value - 1 === index ? 100 : 40;
    return {
      transform: [
        { translateY: withTiming(translateY) },
        { translateX: labelPosition - LABEL_WIDTH / 2 }
      ]
    };
  });

  const iconColor = useSharedValue(
    activeIndex === index + 1 ? 'white' : 'rgba(128,128,128,0.8)'
  );

  //Adjust Icon color for this first render
  useEffect(() => {
    animatedActiveIndex.value = activeIndex;
    if (activeIndex === index + 1) {
      iconColor.value = withTiming('white');
    } else {
      iconColor.value = withTiming('rgba(128,128,128,0.8)');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  const animatedIconProps = useAnimatedProps(() => ({
    color: iconColor.value
  }));
  return (
    <>
      <Animated.View style={[tabStyle]}>
        <Pressable
          testID={`tab${label}`}
          hitSlop={{ top: 30, bottom: 30, left: 50, right: 50 }}
          onPress={onTabPress}
        >
          <AnimatedIcon animatedProps={animatedIconProps} size={25}>
            <TabIcon width={22} height={22} color={Colors.secondary} />;
          </AnimatedIcon>
        </Pressable>
      </Animated.View>
      <Animated.View style={[labelContainerStyle, styles.labelContainer]}>
        <Text style={styles.label}>{label}</Text>
      </Animated.View>
    </>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  labelContainer: {
    position: 'absolute',
    alignItems: 'center',
    width: LABEL_WIDTH
  },
  label: {
    ...ApplicationStyles.mediumMontserratFont,
    fontSize: Fonts.size.sminy,
    color: Colors.secondary
  }
});
