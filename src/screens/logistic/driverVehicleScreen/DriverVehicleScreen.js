import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from '../../../components';
import { ApplicationStyles, Colors } from '../../../theme';
import { APP_LANGUAGE_CONSTANT } from '../../../constants';
import { LayoutAnimation, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './DriverVehicleScreen.styles';
import { AddButton } from '../../../assets/icon';
import DriverList from '../../../components/listContent/DriverList';

const DRIVER_ARR = [
  {
    name: 'Darlene Robertson',
    size: 'Mercedes-Benz (Large)',
    distance: '15 km',
    status: 'Verified',
    dl: '3452-084956',
    ph: '971 9875340243',
    id: 1
  },
  {
    name: 'Darlene Robertson',
    size: 'Mercedes-Benz (Large)',
    distance: '15 km',
    status: 'Not Verified',
    dl: '3452-084956',
    ph: '971 9875340243 ',
    id: 2
  },
  {
    name: 'Darlene Robertson',
    size: 'Mercedes-Benz (Large)',
    distance: '15 km',
    status: 'Verified',
    dl: '3452-084956',
    ph: '971 9875340243 ',
    id: 3
  },
  {
    name: 'Darlene Robertson',
    size: 'Mercedes-Benz (Large)',
    distance: '15 km',
    status: 'Verified',
    dl: '3452-084956',
    ph: '971 9875340243 ',
    id: 4
  },
  {
    name: 'Darlene Robertson',
    size: 'Mercedes-Benz (Large)',
    distance: '15 km',
    status: 'Verified',
    dl: '3452-084956',
    ph: '971 9875340243 ',
    id: 5
  }
];
const VEHICLE_ARR = [
  {
    name: 'Darlene Robertson',
    size: 'Mercedes-Benz (Large)',
    distance: '15 km',
    status: 'Registered',
    dl: '3452-084956',
    ph: '971 9875340243',
    id: 1
  },
  {
    name: 'Darlene Robertson',
    size: 'Mercedes-Benz (Large)',
    distance: '15 km',
    status: 'Not Registered',
    dl: '3452-084956',
    ph: '971 9875340243 ',
    id: 2
  },
  {
    name: 'Darlene Robertson',
    size: 'Mercedes-Benz (Large)',
    distance: '15 km',
    status: 'Registered',
    dl: '3452-084956',
    ph: '971 9875340243 ',
    id: 3
  },
  {
    name: 'Darlene Robertson',
    size: 'Mercedes-Benz (Large)',
    distance: '15 km',
    status: 'Registered',
    dl: '3452-084956',
    ph: '971 9875340243 ',
    id: 4
  },
  {
    name: 'Darlene Robertson',
    size: 'Mercedes-Benz (Large)',
    distance: '15 km',
    status: 'Registered',
    dl: '3452-084956',
    ph: '971 9875340243 ',
    id: 5
  }
];
const DriverVehicleScreen = () => {
  const { t } = useTranslation();
  const [loader, setLoader] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openDriverList = () => {};

  const BUTTON_ARR = [
    {
      title: APP_LANGUAGE_CONSTANT.DRIVERS
    },
    {
      title: APP_LANGUAGE_CONSTANT.VEHICLE
    }
  ];

  return (
    <>
      <Container
        title={t(APP_LANGUAGE_CONSTANT.DRIVER_VEHICLE_DETAILS)}
        containerStyle={ApplicationStyles.overFlowHidden}
        horizontalScace={false}
      >
        <View style={styles.mainView}>
          {BUTTON_ARR?.map((res, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.driverButton,
                  selectedIndex === index && styles.btnShadow
                ]}
                onPress={() => {
                  setSelectedIndex(index);
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut
                  );
                }}
              >
                <LinearGradient
                  colors={
                    selectedIndex === index
                      ? [Colors.primary40, Colors.primary60]
                      : [Colors.transparent, Colors.transparent]
                  }
                  style={styles.gradient}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      selectedIndex !== index && {
                        color: Colors.white90
                      }
                    ]}
                  >
                    {t(res?.title)}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>
        <DriverList
          data={selectedIndex === 0 ? DRIVER_ARR : VEHICLE_ARR}
          isLoading={loader}
          selectedIndex={selectedIndex}
          onPress={openDriverList}
        />
      </Container>
      <View style={styles.rightButton}>
        <TouchableOpacity style={[styles.addContainer]} activeOpacity={0.5}>
          <LinearGradient
            colors={[Colors.primary40, Colors.primary60]}
            style={[styles.addButton, { backgroundColor: Colors.primary10 }]}
          >
            <View style={styles.innerButtom}>
              <Text style={styles.title}>
                {selectedIndex === 0
                  ? t(APP_LANGUAGE_CONSTANT.ADD_DRIVER)
                  : t(APP_LANGUAGE_CONSTANT.ADD_VEHICLE)}
              </Text>
              <View style={styles.addPlus}>
                <AddButton />
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default DriverVehicleScreen;
