/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Dimensions, StyleSheet, View, TouchableOpacity } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import Video from 'react-native-video';
import { ContainerLayout } from '../../../components';
import { APP_LANGUAGE_CONSTANT } from '../../../constants';

const { height, width } = Dimensions.get('screen');

const ExploreScreen = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScreenFocused, setIsScreenFocused] = useState(true);
  const [isPausedByUser, setIsPausedByUser] = useState(false); // New state to track user pause

  const data = [
    {
      id: 1,
      url: require('../../../assets/video1.mp4')
    },
    {
      id: 2,
      url: require('../../../assets/video2.mp4')
    },
    {
      id: 3,
      url: 'https://www.w3schools.com/html/mov_bbb.mp4'
    }
  ];

  // Trigger focus and blur effects
  useFocusEffect(
    useCallback(() => {
      setIsScreenFocused(true);
      setIsPausedByUser(false);
      return () => {
        setIsScreenFocused(false);
      };
    }, [])
  );

  // Handle index change when swiping between videos
  const handleIndexChange = ({ index }) => {
    setCurrentIndex(index);
    setIsPausedByUser(false); // Reset user pause when changing videos
  };

  // Handle tap to pause or play the video
  const handleVideoTap = () => {
    setIsPausedByUser(!isPausedByUser); // Toggle pause state
  };

  const renderItem = useCallback(
    ({ item, index }) => {
      const isPaused =
        index !== currentIndex || !isScreenFocused || isPausedByUser; // Include user pause state

      return (
        <TouchableOpacity
          activeOpacity={1} // No visual feedback on tap
          style={styles.renderItemView}
          onPress={handleVideoTap}
        >
          <View pointerEvents="box-none" style={styles.renderItemView}>
            <Video
              fullscreenAutorotate
              repeat
              controls={false}
              paused={isPaused}
              source={
                typeof item.url === 'string' ? { uri: item.url } : item.url
              }
              style={styles.video}
              playInBackground={false}
              playWhenInactive={false}
              resizeMode={typeof item.url === 'string' ? 'contain' : 'cover'}
            />
          </View>
        </TouchableOpacity>
      );
    },
    [currentIndex, isScreenFocused, isPausedByUser]
  );

  return (
    <ContainerLayout
      isShowLeftIcon={false}
      title={t(APP_LANGUAGE_CONSTANT.EXPLORE)}
    >
      <SwiperFlatList
        index={0}
        data={data}
        renderItem={renderItem}
        onChangeIndex={handleIndexChange}
      />
    </ContainerLayout>
  );
};

const styles = StyleSheet.create({
  renderItemView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height
  },
  video: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black'
  }
});

export default ExploreScreen;
