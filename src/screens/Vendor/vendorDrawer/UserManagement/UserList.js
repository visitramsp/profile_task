import React, { useCallback } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated from 'react-native-reanimated';
import { WhiteTrash } from '../../../../assets/icon';
import CellSwipeable from '../../../../components/vender/CellSwipeable';
import { deleteSubUser } from '../../../../store/vendor/action';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  PAGE_SPACING,
  verticalScale
} from '../../../../theme';
import { showError, showToastSuccess, toTitleCase } from '../../../../utils';
import { useNavigation } from '@react-navigation/native';

function UserList({
  data,
  setData,
  ListFooterComponent = () => null,
  onEndReachedThreshold,
  onEndReached = () => null,
  totalNoOfProduct = '',
  setTotalNoOfProduct = () => null,
  refreshing,
  handleRefresh
}) {
  const navigation = useNavigation();

  const onDelete = useCallback(
    (item) => {
      deleteSubUser(`id=${item?.uuid}`)
        .then((res) => {
          setData((prevData) => prevData.filter((e) => e?.uuid !== item?.uuid));
          showToastSuccess(res?.data?.message);
          setTotalNoOfProduct(totalNoOfProduct - 1);
        })
        .catch((err) => {
          showError(err);
        });
    },
    [setData, setTotalNoOfProduct, totalNoOfProduct]
  );

  const _rightAction = useCallback(
    (item) => (
      <Animated.View style={[styles.swipe, { width: horizontalScale(60) }]}>
        <TouchableOpacity
          style={[styles.swipeBtn, styles.swipRightBtn]}
          onPress={() => onDelete(item)}
        >
          <WhiteTrash />
        </TouchableOpacity>
      </Animated.View>
    ),
    [onDelete]
  );

  const roles = (arr) => arr.map((e) => toTitleCase(e?.title)).join(' | ');

  const _renderUser = useCallback(
    ({ item }) => (
      <CellSwipeable rightAction={() => _rightAction(item)}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.cellContainer}
          onPress={() => navigation.navigate('AddUser', { item })}
        >
          <FastImage
            source={{
              uri:
                item?.profile_photo ||
                'https://t4.ftcdn.net/jpg/06/85/70/67/360_F_685706799_hrkAM8ffiXoD5okWxwcXU29saHtekay3.jpg'
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.detail}>
            <Text style={styles.name} ellipsizeMode="tail">
              {toTitleCase(item?.name)}
            </Text>
            <View style={styles.roleContainer}>
              <Text style={styles.role}>
                Role: {roles(item?.permissionDetails)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </CellSwipeable>
    ),
    [_rightAction, navigation]
  );

  return (
    <SafeAreaView style={[styles.container]}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item, index) => item.uuid + index.toString()}
        renderItem={_renderUser}
        contentContainerStyle={styles.contentContainerStyle}
        ListFooterComponent={ListFooterComponent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        onEndReachedThreshold={onEndReachedThreshold}
        onEndReached={onEndReached}
      />
    </SafeAreaView>
  );
}

export default UserList;

const styles = StyleSheet.create({
  container: {
    paddingTop: verticalScale(8)
  },
  contentContainerStyle: {
    gap: verticalScale(16),
    paddingBottom: verticalScale(200)
  },
  cellContainer: {
    flexDirection: 'row',
    gap: horizontalScale(12),
    paddingHorizontal: PAGE_SPACING,
    backgroundColor: Colors.white
  },
  image: {
    height: verticalScale(70),
    width: horizontalScale(70),
    borderRadius: 10
  },
  detail: {
    gap: verticalScale(4),
    flex: 1,
    flexWrap: 'wrap'
  },
  name: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.semi,
    color: Colors.black70
  },
  roleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap' // Fixed this to ensure correct wrapping behavior
  },
  role: {
    fontSize: Fonts.size.sminy,
    fontFamily: Fonts.type.robotoMedium,
    color: Colors.gray20,
    lineHeight: verticalScale(22)
  },
  swipe: {
    justifyContent: 'center',
    alignItems: 'center',
    width: horizontalScale(80)
  },
  swipeBtn: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  swipRightBtn: {
    backgroundColor: Colors.red40
  },
  activeText: {
    ...ApplicationStyles.mediumMontserratFont,
    color: Colors.gray10,
    textAlign: 'center'
  }
});
