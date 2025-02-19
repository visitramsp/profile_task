import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  FlatList
} from 'react-native';

import FastImage from 'react-native-fast-image';

import { Colors, horizontalScale, verticalScale } from '../../theme';
import ApplicationStyles, { PAGE_SPACING } from '../../theme/ApplicationStyles';
import CommonLoader from '../CommonLoader';

const CategoriesListContent = ({
  isLoading,
  data,
  itemStyle,
  style,
  imgStyle,
  fastImageStyle,
  ListEmptyComponent,
  onPress = () => null
}) => {
  if (isLoading) {
    return (
      <View style={styles.activityIndicator}>
        {/* <ActivityIndicator size={'large'} color={Colors.orange10} /> */}
        <CommonLoader isLoading={isLoading} />
      </View>
    );
  }

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.5}
        style={[styles.fmcgImgContainer, itemStyle]}
        onPress={() => onPress(item)}
      >
        <View style={[styles.fmcgImgView, imgStyle]}>
          <FastImage
            source={{ uri: item?.image }}
            style={[styles.fmcgImg, fastImageStyle]}
          />
        </View>
        <Text style={styles.fmcgText}>{item?.title}</Text>
      </TouchableOpacity>
    );
  };

  const itemSeparator = () => <View style={styles.spaceW} />;

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        key={'categories_list'}
        data={data}
        renderItem={renderItem}
        style={[styles.listContainer, style]}
        contentContainerStyle={{ paddingHorizontal: PAGE_SPACING }}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        ItemSeparatorComponent={itemSeparator}
        // ListEmptyComponent={
        //   ListEmptyComponent || (
        //     <View style={styles.emptyItemContainer}>
        //       <Text style={styles.noItemText}>Not found categories</Text>
        //     </View>
        //   )
        // }
        keyExtractor={(item) => item?.id || item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  listContainer: {},
  fmcgImgContainer: {
    width: horizontalScale(106)
  },
  fmcgImgView: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: Colors.primary20,
    shadowColor: Colors.orange20,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 100,
    marginTop: verticalScale(20)
  },
  fmcgImg: {
    width: '100%',
    height: '100%',
    borderRadius: 100
  },
  fmcgText: {
    ...ApplicationStyles.smallMontserratFont,
    paddingTop: verticalScale(13),
    color: Colors.black,
    textAlign: 'center'
  },
  spaceW: {
    width: horizontalScale(15)
  },
  activityIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: verticalScale(100)
  }
});

export default CategoriesListContent;
