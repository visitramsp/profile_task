/* eslint-disable react/no-unstable-nested-components */
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Platform, Text, TouchableOpacity, View } from 'react-native';
import { PickDropLine } from '../../../../assets/icon';
import { Container } from '../../../../components';
import SearchBar from '../../../../components/SearchBar';
import { APP_LANGUAGE_CONSTANT } from '../../../../constants';
import { ApplicationStyles, Colors, verticalScale } from '../../../../theme';
import styles from './DriverDeliveries.styles';

const deliveryData = [
  {
    id: '#2564712',
    date: 'Wednesday, 8th July 2024',
    distance: '15 km',
    status: 'Completed',
    pickup: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
    drop: '3891 Ranchview Dr. Richardson, California 62639',
    elapsed: '17:45 Pm'
  },
  {
    id: '#2564713',
    date: 'Wednesday, 8th July 2024',
    distance: '15 km',
    status: 'Pending',
    pickup: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
    drop: '3891 Ranchview Dr. Richardson, California 62639',
    elapsed: '17:45 Pm'
  },
  {
    id: '#2564714',
    date: 'Wednesday, 8th July 2024',
    distance: '15 km',
    status: 'Canceled',
    pickup: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
    drop: '3891 Ranchview Dr. Richardson, California 62639',
    elapsed: '17:45Pm'
  }
];

const DriverDeliveries = () => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState('All');

  const Tabs = [
    { id: 1, name: t(APP_LANGUAGE_CONSTANT.ALL), isSelected: true },
    { id: 2, name: t(APP_LANGUAGE_CONSTANT.PENDING), isSelected: false },
    { id: 3, name: t(APP_LANGUAGE_CONSTANT.IN_QUEUE), isSelected: false },
    { id: 4, name: t(APP_LANGUAGE_CONSTANT.COMPLETED), isSelected: false },
    { id: 5, name: t(APP_LANGUAGE_CONSTANT.CANCELED), isSelected: false }
  ];

  // Memoize the tab rendering to avoid unnecessary re-renders
  const renderTabs = useCallback(
    ({ item }) => {
      const isSelected = selectedTab === item.name;

      return (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.tabButton,
            {
              backgroundColor: isSelected ? Colors.orange10 : Colors.buttonGray
            }
          ]}
          onPress={() => setSelectedTab(item.name)}
        >
          <Text
            style={[
              styles.tabButtonText,
              { color: isSelected ? Colors.white : Colors.black }
            ]}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    },
    [selectedTab]
  );

  // Render delivery card
  const renderDelivery = ({ item }) => (
    <View key={item.id} style={styles.deliveryCard}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.orderId}>
            {t(APP_LANGUAGE_CONSTANT.ORDER_ID)} #{item.id}
          </Text>
          <Text style={styles.orderDate}>{item.date}</Text>
        </View>
        <View>
          <View
            style={[
              styles.statusBox,
              {
                backgroundColor:
                  item.status === 'Completed'
                    ? Colors.green10
                    : item.status === 'Pending'
                    ? Colors.yellow20
                    : Colors.gray20
              }
            ]}
          >
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
      </View>
      <View style={styles.cardDetails}>
        <Text style={styles.distanceText}>
          {t(APP_LANGUAGE_CONSTANT.DISTANCE_TRAVELLED)}: {item.distance}
        </Text>
        <Text style={styles.elapsedText}>
          {t(APP_LANGUAGE_CONSTANT.ELAPSED_TIME)}:{' '}
          <Text style={{ color: Colors.gray20 }}>{item.elapsed}</Text>
        </Text>
      </View>
      <View style={[styles.addressContainer, {}]}>
        <View style={styles.pickLineView}>
          <PickDropLine
            height={
              Platform.OS === 'android' ? verticalScale(64) : verticalScale(56)
            }
            width={verticalScale(13)}
          />
        </View>
        <View style={ApplicationStyles.flex1}>
          <View style={styles.addressHeader}>
            <Text numberOfLines={1} style={styles.pickupLabel}>
              {t(APP_LANGUAGE_CONSTANT.PICKUP_ADDRESS)}
            </Text>
            <Text style={styles.pickupDate}>10th January 2024, 12:16pm</Text>
          </View>
          <Text numberOfLines={1} style={styles.pickupAddress}>
            {item.pickup}
          </Text>
          <Text style={styles.dropLabel}>
            {t(APP_LANGUAGE_CONSTANT.DROP_ADDRESS)}
          </Text>
          <Text numberOfLines={1} style={styles.dropAddress}>
            {item.drop}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <Container title={t(APP_LANGUAGE_CONSTANT.DELIVERIES)}>
      <SearchBar />
      <Text style={styles.deliveryHistory}>
        {t(APP_LANGUAGE_CONSTANT.DELIVERY_HISTORY)}{' '}
        <Text style={{ color: Colors.orange10 }}>({deliveryData.length})</Text>
      </Text>
      <FlatList
        horizontal
        data={Tabs}
        renderItem={renderTabs}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.tabList}
        showsHorizontalScrollIndicator={false}
      />
      <FlatList
        data={deliveryData}
        renderItem={renderDelivery}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.deliveryList}
        ListFooterComponent={() => <View style={styles.footerSpace} />}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
    </Container>
  );
};

export default DriverDeliveries;
