import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import ContentHeader from '../../screens/Retailer/components/ContentHeader';
import {
  ApplicationStyles,
  Colors,
  horizontalScale,
  verticalScale,
  cardRadius
} from '../../theme';
import Fonts from '../../theme/Fonts';
import { APP_LANGUAGE_CONSTANT } from '../../constants';

const dummyData = [
  {
    id: 1,
    name: 'Cameraon Williamson',
    status: 'On Delivery',
    order: 15
  },
  {
    id: 2,
    name: 'Eather Howard',
    status: 'Idle',
    order: 9
  },
  {
    id: 3,
    name: 'Savannah Nguyen',
    status: 'offline',
    order: 5
  },
  {
    id: 4,
    name: 'Marvin McKinney',
    status: 'On Delivery',
    order: 25
  }
];

const DriverList = () => {
  const { t } = useTranslation();

  const renderItem = ({ item, index }) => {
    const isLastItem = index === dummyData.length - 1;
    return (
      <View style={[styles.itemContainer, isLastItem && styles.lastItem]}>
        <Text style={styles.driverName}>{item?.name}</Text>
        <Text
          style={[
            styles.status,
            item?.status === 'On Delivery'
              ? styles.onDelivery
              : item?.status === 'Idle'
              ? styles.idle
              : styles.offline
          ]}
        >
          {item?.status}
        </Text>
        <Text style={styles.order}>{item?.order}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          ApplicationStyles.pageSpacing,
          {
            marginTop:
              Platform.OS === 'android' ? verticalScale(5) : verticalScale(0)
          }
        ]}
      >
        <ContentHeader
          title={`${t(APP_LANGUAGE_CONSTANT.DRIVER_LIST)} (${
            dummyData.length
          })`}
          textStyle={styles.contentHeaderText}
          containerExt={styles.contentHeaderContainer}
          onPress={() => {}}
        />
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            {t(APP_LANGUAGE_CONSTANT.DRIVER_NAME)}
          </Text>
          <Text style={styles.headerText}>
            {t(APP_LANGUAGE_CONSTANT.STATUS)}
          </Text>
          <Text style={styles.headerOrderText}>
            {t(APP_LANGUAGE_CONSTANT.ORDERS)}
          </Text>
        </View>
        <FlatList
          data={dummyData}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(10),
    backgroundColor: Colors.white,
    paddingVertical: verticalScale(8)
  },
  lastItem: {
    borderBottomLeftRadius: cardRadius,
    borderBottomRightRadius: 20,
    paddingBottom: verticalScale(15)
  },
  driverName: {
    flex: 2.5,
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.normal,
    fontSize: Fonts.size.small,
    paddingLeft: horizontalScale(3),
    color: Colors.gray50
  },
  status: {
    flex: 1,
    fontFamily: Fonts.type.robotoBold,
    fontWeight: Fonts.Weight.normal,
    fontSize: Fonts.size.small
  },
  onDelivery: {
    color: Colors.green10
  },
  idle: {
    color: Colors.blue40
  },
  offline: {
    color: Colors.red
  },
  order: {
    flex: 1,
    textAlign: 'right',
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.normal,
    fontSize: Fonts.size.small,
    marginRight: horizontalScale(7),
    color: Colors.gray50
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(10),
    backgroundColor: Colors.orange50,
    marginTop: verticalScale(10),
    paddingVertical: verticalScale(8),
    borderTopLeftRadius: cardRadius,
    borderTopRightRadius: cardRadius
  },
  headerText: {
    flex: 1,
    fontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.small,
    paddingLeft: horizontalScale(3)
  },
  headerOrderText: {
    textAlign: 'right',
    marginRight: horizontalScale(7)
  },
  flatListContent: {
    marginBottom: verticalScale(20)
  },
  contentHeaderText: {
    color: Colors.secondary
  },
  contentHeaderContainer: {
    marginTop: 0,
    marginBottom: verticalScale(5)
  }
});

export default DriverList;
