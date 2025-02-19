import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MapView, { Marker } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ToggleSwitch from 'toggle-switch-react-native';
import { AppIcon } from '../../../../assets/icon';
import DottedLine from '../../../../components/common/DottedLine';
import {
  APP_LANGUAGE_CONSTANT,
  AppConstant,
  SCREEN_NAME
} from '../../../../constants';
import {
  ApplicationStyles,
  Colors,
  lightGray,
  verticalScale
} from '../../../../theme';
import styles from './DriverDashboard.styles';

const { height } = Dimensions.get('screen');

export default function DriverDashboard() {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [isEnabled, setIsEnabled] = React.useState(false);
  const changeStatus = () => setIsEnabled((previousState) => !previousState);
  const [location, setLocation] = useState({
    latitude: 28.57592884098658,
    longitude: 77.19851977041256
  });

  // ref
  const bottomSheetRef = useRef(null);

  useEffect(() => {
    const getLocation = async () => {
      const hasPermission = false;
      // const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
          },
          (error) => {
            Alert.alert('Error', error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }
    };
    getLocation();
  }, []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {}, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[Colors.orange50, Colors.orange40, Colors.orange30]}
        style={[styles.gradient, { height: top }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <StatusBar backgroundColor={Colors.orange40} barStyle="dark-content" />
      </LinearGradient>

      <LinearGradient
        colors={[Colors.orange50, Colors.orange40, Colors.orange30]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerContainer}>
          <View style={styles.profileImageContainer}>
            <Image source={AppIcon.DriverPic} style={styles.profileImage} />
          </View>
          <View style={styles.userInfoContainer}>
            <Text style={styles.greetingText}>
              {t(APP_LANGUAGE_CONSTANT.HELLO)}, Henry !
            </Text>
            <Text style={styles.locationText}>Ras Al Khaimah, UAE</Text>
          </View>
          <View style={styles.notificationContainer}>
            <Image
              source={AppIcon.DriverNotification}
              style={styles.notificationImage}
            />
          </View>
        </View>
        <View style={styles.statusContainer}>
          <View style={styles.statusTextContainer}>
            <Text style={styles.statusTitle}>
              {t(APP_LANGUAGE_CONSTANT.STATUS)}
            </Text>
            <Text style={styles.statusSubtitle}>
              {t(AppConstant.OPEN_TO_DELIVERY)}
            </Text>
          </View>

          <ToggleSwitch
            isOn={isEnabled}
            offColor={lightGray}
            size="medium"
            onColor="#21d59b"
            onToggle={(isOn) => changeStatus(isOn)}
          />
        </View>
      </LinearGradient>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[ApplicationStyles.justifyCenter, { height: height }]}>
          <MapView
            style={StyleSheet.absoluteFillObject}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          >
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude
              }}
              title={'Marker Title'}
              description={'Marker Description'}
            />
          </MapView>
        </View>
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={[verticalScale(360), verticalScale(360)]}
        handleIndicatorStyle={styles.handleIndicatorStyle}
        handleStyle={{ backgroundColor: Colors.orange30 }}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={ApplicationStyles.flex1}>
          <View style={styles.actionSheetContent}>
            <View
              style={[styles.orderHeader, { borderWidth: verticalScale(0) }]}
            >
              <View style={styles.orderHeader1}>
                <Text style={[styles.orderIdText, {}]}>
                  {t(APP_LANGUAGE_CONSTANT.CURRENT_ORDER_ID)} : #526403
                </Text>
                <TouchableOpacity
                  style={styles.detailsButton}
                  onPress={() => {
                    navigation.navigate(SCREEN_NAME.APP_STACK, {
                      screen: SCREEN_NAME.CURRENT_ORDER
                    });
                    bottomSheetRef.current.close();
                  }}
                >
                  <Text style={styles.detailsButtonText}>
                    {t(APP_LANGUAGE_CONSTANT.DETAILS)}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.orderTimeText}>
                {t(AppConstant.ORDER_TIME)}: Monday, February 15,2024 at 6:38 pm
              </Text>
            </View>
            <View style={styles.addressContainer}>
              <View style={styles.addressIconColumn}>
                <Image
                  source={AppIcon.PickUp}
                  style={styles.addressIcon}
                  resizeMode="cover"
                />
                <DottedLine />
                <Image source={AppIcon.Location} style={styles.addressIcon} />
              </View>

              <View style={styles.addressTextColumn}>
                <Text style={styles.addressTitle}>
                  {t(APP_LANGUAGE_CONSTANT.PICKUP_ADDRESS)}
                </Text>
                <Text style={styles.addressText}>
                  Forest Hills South Side, Pasthal, Boisar, 401504
                </Text>

                <View style={styles.addressGap} />

                <Text style={styles.addressTitle}>
                  {t(APP_LANGUAGE_CONSTANT.DROP_ADDRESS)}
                </Text>
                <Text style={styles.addressText}>
                  Another Address Example, City, Zip Code
                </Text>
              </View>
            </View>
            <LinearGradient
              colors={[Colors.orange10, Colors.orange30]} // Dark at top, light at bottom
              start={{ x: 0.5, y: 0 }} // Top-center (dark)
              end={{ x: 0.5, y: 1 }} // Bottom-center (light)
              style={styles.buttonGradient}
            >
              <TouchableOpacity style={styles.arrivedButton}>
                <Text style={styles.arrivedButtonText}>
                  {t(APP_LANGUAGE_CONSTANT.ARRIVED_AT_PICKUP)}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
}
