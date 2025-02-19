import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Colors, horizontalScale, verticalScale, width } from '../../theme';
import { StyleSheet, View } from 'react-native';

const HomeFmcgLoader = () => {
  return (
    <SkeletonPlaceholder backgroundColor={Colors.primary50} borderRadius={4}>
      <View style={styles.container}>
        {Array(5)
          .fill(' ')
          .map((index) => {
            return (
              <View style={styles.item} key={index}>
                <SkeletonPlaceholder.Item
                  width={106}
                  height={106}
                  borderRadius={50}
                />
                <SkeletonPlaceholder.Item
                  width={80}
                  height={20}
                  borderRadius={50}
                  style={styles.title}
                />
              </View>
            );
          })}
      </View>
      <SkeletonPlaceholder.Item
        width={width * 0.9}
        height={verticalScale(210)}
        borderRadius={25}
        style={styles.card}
      />
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    paddingHorizontal: horizontalScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: verticalScale(20)
  },
  item: {
    alignItems: 'center',
    marginRight: horizontalScale(10)
  },
  title: {
    marginTop: verticalScale(10)
  },
  card: {
    marginTop: verticalScale(25),
    alignSelf: 'center'
  }
});

export default HomeFmcgLoader;
