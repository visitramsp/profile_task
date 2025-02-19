import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { Colors, horizontalScale, verticalScale } from '../../../theme';
import FastImage from 'react-native-fast-image';
import ApplicationStyles, {
  PAGE_SPACING
} from '../../../theme/ApplicationStyles';

export default function ImageSwiper({ data = [] }) {
  const swiperRef = useRef(null);
  const listRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemSeparatorComponent = () => (
    <View style={{ width: horizontalScale(15) }} />
  );

  useEffect(() => {
    if (data?.length > 0) {
      setCurrentIndex(0);
      swiperRef.current?.scrollTo(0);
      listRef.current?.scrollToOffset({ animated: false, offset: 0 });
    }
  }, [data]);

  const selectCurrentIndex = (index) => {
    setCurrentIndex(index);
    swiperRef.current.scrollTo(index);
  };

  const renderItem = ({ item, index }) => {
    const isSelected = index === currentIndex;
    return (
      <TouchableOpacity
        style={[
          styles.smallImgContainer,
          isSelected && styles.selectedContainer
        ]}
        onPress={() => selectCurrentIndex(index)}
      >
        <FastImage
          key={index}
          style={styles.smallImg}
          source={{ uri: item?.uri }}
        />
      </TouchableOpacity>
    );
  };

  const onIndexChanged = (index) => {
    listRef.current?.scrollToIndex({
      animated: true,
      index: index < 2 ? 0 : index - 2
    });
    if (index === 0) {
      listRef.current?.scrollToOffset({
        x: 0,
        animated: true
      });
    }
    setCurrentIndex(index);
  };

  return (
    <>
      <Swiper
        key={data?.length}
        ref={swiperRef}
        loop={false}
        style={styles.swiperContainer}
        activeDotStyle={styles.swiperActiveDot}
        paginationStyle={styles.swiperPagination}
        dotColor={Colors.white20}
        onIndexChanged={onIndexChanged}
      >
        {data?.length > 0 &&
          data?.map((res, index) => {
            return (
              <FastImage
                key={index}
                style={styles.swiperImg}
                source={{ uri: res?.uri }}
              />
            );
          })}
      </Swiper>

      <View
        style={[styles.subContainer, !data?.length > 0 && styles.loadingView]}
      >
        {data?.length > 0 && (
          <FlatList
            horizontal
            key={data?.length}
            ref={listRef}
            data={data}
            bounces={false}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={itemSeparatorComponent}
            contentContainerStyle={styles.contentContainerStyle}
            renderItem={renderItem}
            keyExtractor={(item, index) => index?.toString()}
          />
        )}
      </View>
    </>
  );
}
//

const styles = StyleSheet.create({
  swiperContainer: {
    height: verticalScale(331),
    shadowColor: 'transparent', // Remove shadow color
    shadowOpacity: 0, // Remove shadow on iOS
    elevation: 0
  },
  subContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: '100%',
    height: verticalScale(159),
    backgroundColor: Colors.gray40,
    marginTop: -verticalScale(30),
    shadowColor: Colors.slate120,
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5
  },
  swiperActiveDot: {
    width: horizontalScale(15),
    backgroundColor: Colors.primary
  },
  swiperPagination: {
    bottom: verticalScale(50)
  },
  swiperImg: {
    height: '100%',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  smallImg: {
    width: horizontalScale(64),
    aspectRatio: 1,
    borderRadius: 15,
    backgroundColor: Colors.gray10
  },
  contentContainerStyle: {
    paddingHorizontal: PAGE_SPACING,
    paddingTop: verticalScale(30)
  },
  smallImgContainer: {
    ...ApplicationStyles.centerView,
    width: horizontalScale(72),
    aspectRatio: 1,
    borderRadius: 18
  },
  selectedContainer: {
    backgroundColor: Colors.orange10,
    shadowColor: Colors.blackShadow70,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10
  },
  loadingView: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
