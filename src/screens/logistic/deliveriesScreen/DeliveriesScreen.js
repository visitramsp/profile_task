import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from '../../../components';
import { Text, View } from 'react-native';
import { ApplicationStyles } from '../../../theme';
import SearchBar from '../../../components/SearchBar';
import { APP_LANGUAGE_CONSTANT } from '../../../constants';
import styles from './DeliveriesScreen.styles';
import ListFilterOptions from '../../../components/listContent/ListFilterOptions';
import OrderList from '../../../components/listContent/OrderList';

const DELIVERIES_ARR = [
  {
    name: 'Darlene Robertson',
    pickup: 'Dubai x 23473',
    distance: '15 km',
    status: 'Completed',
    pickupAdd: '2118 Thornridge Cir. Syracuse, Connecti 62639',
    dropAdd: '3891 Ranchview Dr. Richardson, Califo 62639',
    time: '10th Jan 2024, 12:16 pm',
    elapseTile: 'NA',
    orderId: '#2384673',
    currentDate: 'Wednesday, 8th July 2024'
  },
  {
    name: 'Darlene Robertson',
    pickup: 'Dubai x 23473',
    distance: '15 km',
    status: 'Pending',
    pickupAdd: '2118 Thornridge Cir. Syracuse, Connecti 62639',
    dropAdd: '3891 Ranchview Dr. Richardson, Califo 62639',
    time: '10th Jan 2024, 12:16 pm',
    elapseTile: 'NA',
    orderId: '#2384673',
    currentDate: 'Wednesday, 8th July 2024'
  },
  {
    name: 'Darlene Robertson',
    pickup: 'Dubai x 23473',
    distance: '15 km',
    status: 'Cancelled',
    pickupAdd: '2118 Thornridge Cir. Syracuse, Connecti 35624',
    dropAdd: '3891 Ranchview Dr. Richardson, Califo 62639',
    time: '10th Jan 2024, 12:16 pm',
    elapseTile: 'NA',
    orderId: '#2384673',
    currentDate: 'Wednesday, 8th July 2024'
  },
  {
    name: 'Darlene Robertson',
    pickup: 'Dubai x 23473',
    distance: '15 km',
    status: 'Pending',
    pickupAdd: '2118 Thornridge Cir. Syracuse, Connecti 62639',
    dropAdd: '3891 Ranchview Dr. Richardson, Califo 62639',
    time: '10th Jan 2024, 12:16 pm',
    elapseTile: 'NA',
    orderId: '#2384673',
    currentDate: 'Wednesday, 8th July 2024'
  },
  {
    name: 'Darlene Robertson',
    pickup: 'Dubai x 23473',
    distance: '15 km',
    status: 'Pending',
    pickupAdd: '2118 Thornridge Cir. Syracuse, Connecti 62639',
    dropAdd: '3891 Ranchview Dr. Richardson, Califo 62639',
    time: '10th Jan 2024, 12:16 pm',
    elapseTile: 'NA',
    orderId: '#2384673',
    currentDate: 'Wednesday, 8th July 2024'
  },
  {
    name: 'Darlene Robertson',
    pickup: 'Dubai x 23473',
    distance: '15 km',
    status: 'Pending',
    pickupAdd: '2118 Thornridge Cir. Syracuse, Connecti 62639',
    dropAdd: '3891 Ranchview Dr. Richardson, Califo 62639',
    time: '10th Jan 2024, 12:16 pm',
    elapseTile: 'NA',
    orderId: '#2384673',
    currentDate: 'Wednesday, 8th July 2024'
  }
];
const DeliveriesScreen = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const BTN_ARR = [
    t(APP_LANGUAGE_CONSTANT.ORDER_DETAIL),
    t(APP_LANGUAGE_CONSTANT.ASSIGN_ORDER)
  ];
  const filterList = [
    { name: t(APP_LANGUAGE_CONSTANT.ALL_STATUS), value: 'All', num: 0 },
    { name: t(APP_LANGUAGE_CONSTANT.PENDING), value: 'pending', num: 3 },
    { name: t(APP_LANGUAGE_CONSTANT.ONGOING), value: 'ongoing', num: 9 },
    { name: t(APP_LANGUAGE_CONSTANT.COMPLETE), value: 'complete', num: 5 },
    { name: t(APP_LANGUAGE_CONSTANT.CANCELLED), value: 'cancelled', num: 0 }
  ];

  const onFilterOption = (item) => {
    setTab(item.name);
    setFilterValue(item.value);
  };
  return (
    <Container
      horizontalScace={false}
      title={t(APP_LANGUAGE_CONSTANT.DELIVERIES)}
      containerStyle={ApplicationStyles.overFlowHidden}
    >
      <View style={styles.mainView}>
        <SearchBar value={searchText} onChangeValue={setSearchText} />
        <Text style={styles.historyText}>
          {t(APP_LANGUAGE_CONSTANT.DELIVERY_HISTORY)} (4)
        </Text>
      </View>
      <View style={styles.filterView}>
        <ListFilterOptions
          data={filterList}
          selectedName={tab}
          onSelectOption={onFilterOption}
        />
      </View>
      <View style={styles.listView}>
        <OrderList
          data={DELIVERIES_ARR}
          isLoading={isLoading}
          currentTab={tab}
          BTN_ARR={BTN_ARR}
        />
      </View>
    </Container>
  );
};
export default DeliveriesScreen;
