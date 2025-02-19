import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from '../../../components';
import { Text, View } from 'react-native';
import { ApplicationStyles } from '../../../theme';
import SearchBar from '../../../components/SearchBar';
import { APP_LANGUAGE_CONSTANT } from '../../../constants';
import ListFilterOptions from '../../../components/listContent/ListFilterOptions';
import styles from './driverStatusScreen.styles';
import DriverList from '../../../components/listContent/DriverList';

const dRIVER_ARR = [
  {
    name: 'Darlene Robertson',
    size: 'Mercedes-Benz (Large)',
    distance: '15 km',
    status: 'On Delivery',
    dl: '3452-084956',
    ph: '971 9875340243',
    id: 1
  },
  {
    name: 'Darlene Robertson',
    size: 'Mercedes-Benz (Large)',
    distance: '15 km',
    status: 'Offline',
    dl: '3452-084956',
    ph: '971 9875340243 ',
    id: 2
  },
  {
    name: 'Darlene Robertson',
    size: 'Mercedes-Benz (Large)',
    distance: '15 km',
    status: 'Idle',
    dl: '3452-084956',
    ph: '971 9875340243 ',
    id: 3
  },
  {
    name: 'Darlene Robertson',
    size: 'Mercedes-Benz (Large)',
    distance: '15 km',
    status: 'Idle',
    dl: '3452-084956',
    ph: '971 9875340243 ',
    id: 4
  },
  {
    name: 'Darlene Robertson',
    size: 'Mercedes-Benz (Large)',
    distance: '15 km',
    status: 'Idle',
    dl: '3452-084956',
    ph: '971 9875340243 ',
    id: 5
  }
];
const DriverStatusScreen = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState('All');
  const [loader, setLoader] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [selected, setSelected] = useState([]);

  const filterList = [
    { name: t(APP_LANGUAGE_CONSTANT.ALL_STATUS), value: '', num: 0 },
    {
      name: t(APP_LANGUAGE_CONSTANT.ON_DELIVERY),
      value: 'on_delivery',
      num: 0
    },
    { name: t(APP_LANGUAGE_CONSTANT.IDLE), value: 'idle', num: 0 },
    { name: t(APP_LANGUAGE_CONSTANT.OFFLINE), value: 'offline', num: 0 },
    {
      name: t(APP_LANGUAGE_CONSTANT.LARGE_VEHICLES),
      value: 'large_vehicle',
      num: 0
    }
  ];

  const onFilterOption = (item) => {
    setTab(item.name);
    setFilterValue(item.value);
  };
  const openDriverList = () => {};

  return (
    <Container
      horizontalScace={false}
      title={t(APP_LANGUAGE_CONSTANT.DRIVERS_STATUS)}
      containerStyle={ApplicationStyles.overFlowHidden}
    >
      <View style={styles.mainView}>
        <SearchBar value={searchText} onChangeValue={setSearchText} />
        <Text style={styles.historyText}>
          {t(APP_LANGUAGE_CONSTANT.DRIVERS_LIST)}{' '}
          <Text style={styles.numText}>(4)</Text>
        </Text>
      </View>
      <ListFilterOptions
        data={filterList}
        selectedName={tab}
        onSelectOption={onFilterOption}
      />
      <DriverList
        data={dRIVER_ARR}
        isLoading={loader}
        setSelected={setSelected}
        selected={selected}
        onPress={openDriverList}
      />
    </Container>
  );
};
export default DriverStatusScreen;
