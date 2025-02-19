import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { APP_LANGUAGE_CONSTANT } from '../../constants/AppConstant';
import { navigateNonLoginDrawer } from '../../utils';
import { styles } from './style';
import LinearGradient from 'react-native-linear-gradient';
import { ApplicationStyles, Colors, horizontalScale, width } from '../../theme';
import { AppIcon } from '../../assets/icon';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const { t } = useTranslation();

  const slides = [
    {
      key: 1,
      title: t(APP_LANGUAGE_CONSTANT?.AUTOMATE_YOUR_BUSINESS_WITH_SUPPLYMATCH),
      description: t(APP_LANGUAGE_CONSTANT?.PRODUCTS_INSTANT_PAYMENTS),
      image: AppIcon.WelcomeImage1
    },
    {
      key: 2,
      title: t(APP_LANGUAGE_CONSTANT?.BOOST_SALES_GET_PAID_FAST),
      description: t(APP_LANGUAGE_CONSTANT?.INSTANT_PAYMENTS_AUTOMATED),
      image: AppIcon.WelcomeImage2
    },
    {
      key: 3,
      title: t(APP_LANGUAGE_CONSTANT?.MINUTE_EXPRESS_DELIVERY_GUARANTEED),
      description: t(APP_LANGUAGE_CONSTANT?.URGENT_RESTOCKING_REALTIME),
      image: AppIcon.WelcomeImage3
    }
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <View style={styles.contentView}>
          <Text style={styles.title}>{item?.title}</Text>
          <View style={{ paddingHorizontal: horizontalScale(30) }}>
            <Text style={styles.description}>{item?.description}</Text>
          </View>
        </View>
        <View style={ApplicationStyles.flex1}>
          <Image
            resizeMode="contain"
            source={item?.image}
            style={styles.slideImage}
          />
        </View>
      </View>
    );
  };

  const handleSkip = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const handleScrollToIndexFailed = (error) => {
    const offset = error.averageItemLength * error.index;
    flatListRef.current?.scrollToOffset({ offset, animated: true });
  };
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <LinearGradient
      style={styles.container}
      colors={[Colors.orange10, Colors.orange30]}
    >
      <SafeAreaView style={ApplicationStyles.flex1}>
        <FlatList
          horizontal
          pagingEnabled
          data={slides}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.key}
          ref={flatListRef}
          viewabilityConfig={viewConfigRef.current}
          snapToInterval={width}
          decelerationRate="fast"
          onViewableItemsChanged={onViewRef.current}
          onScrollToIndexFailed={handleScrollToIndexFailed}
        />
        <View style={styles.dotContainer}>
          <View style={styles.dotView}>
            {slides?.map((res, index) => {
              return (
                <View
                  key={res.key}
                  style={[
                    currentIndex === index
                      ? styles.activeDot
                      : styles.inActiveDot
                  ]}
                />
              );
            })}
          </View>
          <TouchableOpacity
            style={ApplicationStyles.rowAlignCenter}
            onPress={() =>
              currentIndex === 2 ? navigateNonLoginDrawer() : handleSkip()
            }
          >
            <Text style={styles.skip}>{t(APP_LANGUAGE_CONSTANT?.SKIP)}</Text>
            <Image source={AppIcon.arrowRight} style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
