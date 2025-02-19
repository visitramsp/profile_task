import React from 'react';
import { Colors, height, verticalScale, width } from '../theme';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-reanimated-carousel';

const CarouselHome = ({ data }) => {
  return (
    <View style={{ height: verticalScale(210) }}>
      <Carousel
        autoPlay
        loop
        width={width}
        height={height / 2}
        vertical={false}
        data={data}
        autoPlayInterval={1500}
        style={styles.container}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50
        }}
        scrollAnimationDuration={2000}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <FastImage style={styles.img} source={{ uri: item?.image }} />
          </View>
        )}
      />
    </View>
  );
};

export default CarouselHome;

const styles = StyleSheet.create({
  container: {
    shadowColor: Colors.black40,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 5
  },
  imageContainer: {
    height: verticalScale(210),
    justifyContent: 'center',
    overflow: 'hidden'
  },
  img: {
    width: '100%',
    height: verticalScale(210),
    borderRadius: 20
  }
});
