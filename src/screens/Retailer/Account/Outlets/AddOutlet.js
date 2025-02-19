import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import LinearGradient from 'react-native-linear-gradient';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { AppIcon, SearchIcons } from '../../../../assets/icon';
import { ContainerLayout, TextInputFieldPaper } from '../../../../components';
import { APP_LANGUAGE_CONSTANT } from '../../../../constants';
import { getUserInfo } from '../../../../store/auth/action';
import {
  addOutletAddress,
  editWarehouseOutletAddress
} from '../../../../store/retailer/action';
import { ApplicationStyles, Colors } from '../../../../theme';
import {
  getWarehouseOutlet,
  removePlaceCode,
  showError,
  showToastError,
  showToastSuccess
} from '../../../../utils';
import styles from './AddOutlet.styles';
import { API_CONSTANT } from '../../../../services/ApiConstant';
import CommonLoader from '../../../../components/CommonLoader';

const EDIT_ADDRESS = 'editOutlet';
// eslint-disable-next-line complexity
const AddOutlet = (props) => {
  const { item, from } = props?.route?.params;

  const { t } = useTranslation();
  const navigation = useNavigation();
  const API_KEY = API_CONSTANT.GOOGLE_API_KEY;
  const [mapRegion, setMapRegion] = useState({
    latitude: 25.26728093524965,
    longitude: 55.308081995932895,
    latitudeDelta: 0.009473568799027277,
    longitudeDelta: 0.05390837788581848
  }); // Initially null to prevent the map from rendering too early
  const [outletName, setOutletName] = useState(
    from === EDIT_ADDRESS ? item?.name : ''
  );
  const [outletAddress, setOutletAddress] = useState(
    from === EDIT_ADDRESS ? item?.address : ''
  );
  const [poBox, setPoBox] = useState(
    from === EDIT_ADDRESS ? String(item?.po_box) : ''
  );
  const [countryCode, setCountryCode] = useState(
    from === EDIT_ADDRESS ? item?.country_code : 'IN'
  );
  const [address, setAddress] = useState(
    from === EDIT_ADDRESS ? item?.name : ''
  );
  const [inputAddress, setInputAddress] = useState(address); // Local state for the input field

  useEffect(() => {
    setInputAddress(address); // Sync with the main address when it's updated
  }, [address]);

  const autocompleteRef = useRef(null);

  // ref
  const bottomSheetRef = useRef(null);

  const latitudeRef = useRef(
    from === EDIT_ADDRESS ? parseFloat(item?.latitude) : 0.0
  );
  const longitudeRef = useRef(
    from === EDIT_ADDRESS ? parseFloat(item?.longitude) : 0.0
  );
  const latitudeDeltaRef = useRef(0.05);
  const longitudeDeltaRef = useRef(0.003);
  const hasRenderedMap = useRef(false);

  const snapPoints = ['15%', '45%'];

  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  const checkPermission = useCallback(() => {
    check(
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      // eslint-disable-next-line complexity
    ).then((result) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          break;
        case RESULTS.DENIED:
          requestPermission();
          break;
        case RESULTS.LIMITED:
          break;
        case RESULTS.GRANTED:
          onPermissionAvailable();
          break;
        case RESULTS.BLOCKED:
          Linking.openSettings();
          break;
      }
    });
  }, [onPermissionAvailable, requestPermission]);

  const onPermissionAvailable = useCallback(() => {
    if (from === EDIT_ADDRESS) {
      setMapRegion({
        latitude: parseFloat(item?.latitude),
        longitude: parseFloat(item?.longitude),
        latitudeDelta: 0.009473568799027277, // handle bug in google autocomplete
        longitudeDelta: 0.05390837788581848 // handle bug in google autocomplete
      });
    } else {
      getLocation();
    }
  }, [from, getLocation, item?.latitude, item?.longitude]);

  const requestPermission = useCallback(() => {
    request(
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
    ).then((result) => {
      switch (result) {
        case 'denied':
          break;
        case 'granted':
          onRequestGranted();
          break;
        case 'blocked':
          break;
        default:
          //
          break;
      }
    });
  }, [onRequestGranted]);

  const onRequestGranted = useCallback(() => {
    if (from === EDIT_ADDRESS) {
      setMapRegion({
        latitude: parseFloat(item?.latitude),
        longitude: parseFloat(item?.longitude),
        latitudeDelta: 0.009473568799027277,
        longitudeDelta: 0.05390837788581848
      });
    } else {
      getLocation();
    }
  }, [from, getLocation, item?.latitude, item?.longitude]);

  const getLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        latitudeRef.current = latitude;
        longitudeRef.current = longitude;
        const currentLocation = {
          // latitude: latitude - offsetLatitude, // Offset to shift dot upwards
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        };
        setMapRegion(currentLocation);

        getAddressFromLocation(latitude, longitude);
      },
      (error) => {
        // See error code charts below.
        console.error(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, [getAddressFromLocation]);

  const getAddressFromLocation = useCallback(
    async (latitude, longitude) => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
        );
        const data = await response.json();
        // console.log('data ==>> ', JSON.stringify(data));

        if (data.results.length > 0) {
          const addr = removePlaceCode(data.results[0].formatted_address);

          // const name = data.results[0].address_components[0].long_name; // Get the place name
          const postalCode = extractPostalCode(
            data.results[0].address_components
          ); // Get postal code from the address components
          setAddress(addr);
          setOutletAddress(addr);
          setPoBox(postalCode);
          setCountryCode(
            extractCountryCode(data.results[0].address_components)
          );
        }
      } catch (error) {
        console.error('Error fetching address: ', error);
      }
    },
    [API_KEY]
  );

  const extractPostalCode = (components) =>
    components.find((comp) => comp.types.includes('postal_code'))?.long_name ||
    '';

  const extractCountryCode = (components) =>
    components.find((comp) => comp.types.includes('country'))?.short_name || '';

  const handleAddressSelection = (details) => {
    const { lat, lng } = details.geometry.location;
    const formattedAddress = details?.formatted_address || '';
    setAddress(formattedAddress); // Update the input field
    setOutletAddress(formattedAddress);
    setMapRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005
    });
    latitudeRef.current = details.geometry.location.lat;
    longitudeRef.current = details.geometry.location.lng;
    getAddressFromLocation(lat, lng);
  };

  const onRegionChangeComplete = useCallback(
    (value) => {
      if (!hasRenderedMap.current) {
        hasRenderedMap.current = true;
        return;
      }

      const isLatitudeChanged =
        Math.abs(latitudeRef.current - value.latitude) > 0.0001;
      const isLongitudeChanged =
        Math.abs(longitudeRef.current - value.longitude) > 0.0001;

      if (isLatitudeChanged || isLongitudeChanged) {
        setMapRegion({
          latitude: value.latitude,
          longitude: value.longitude,
          latitudeDelta: value.latitudeDelta,
          longitudeDelta: value.longitudeDelta
        });

        latitudeRef.current = value.latitude;
        longitudeRef.current = value.longitude;
        latitudeDeltaRef.current = value.latitudeDelta;
        longitudeDeltaRef.current = value.longitudeDelta;

        getAddressFromLocation(value.latitude, value.longitude);
      }
    },
    [getAddressFromLocation]
  );

  const onAddOutlet = () => {
    if (outletName.length === 0) {
      showToastError('Enter your outlet name');
    } else if (outletAddress.length === 0) {
      showToastError('Enter your outlet address');
    } else if (poBox.length === 0) {
      showToastError('Enter P.O.Box number');
    } else if (from === EDIT_ADDRESS) {
      const body = {
        name: outletName,
        address: outletAddress,
        po_box: poBox,
        latitude: String(latitudeRef.current),
        longitude: String(longitudeRef.current),
        country_code: countryCode,
        id: item?.uuid
      };
      editWarehouseOutletAddress(body)
        .then((res) => {
          getUserInfo().catch(() => {});
          showToastSuccess(res?.data?.message);
          navigation.goBack();
        })
        .catch((err) => {
          showError(err);
        });
    } else {
      const body = {
        arr: [
          {
            name: outletName,
            address: outletAddress,
            po_box: poBox,
            is_default: 1,
            latitude: String(latitudeRef.current),
            longitude: String(longitudeRef.current),
            country_code: countryCode
          }
        ]
      };

      addOutletAddress(body)
        .then((res) => {
          getUserInfo().catch(() => {});
          showToastSuccess(res?.data?.message);
          navigation.goBack();
        })
        .catch((err) => {
          showError(err);
        });
    }
  };

  const customData = getWarehouseOutlet();

  return (
    <ContainerLayout
      title={
        from === EDIT_ADDRESS ? customData?.editButtonName : customData?.heading
      }
      scrollable={false}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.googlePlacesView}>
          <GooglePlacesAutocomplete
            fetchDetails
            enableHighAccuracyLocation
            currentLocation
            isRowScrollable
            ref={autocompleteRef}
            autoFocus={false}
            listViewDisplayed={false}
            keepResultsAfterBlur={false}
            placeholder={address || 'Search'} // Set the placeholder to the input value or 'Search'
            textInputProps={{
              onFocus: () => {
                // Expand the BottomSheet when the input is focused
                bottomSheetRef?.current?.snapToIndex(0);
              },
              onBlur: () => {
                // Collapse the BottomSheet when the input is blurred
                bottomSheetRef?.current?.snapToIndex(1);
              },
              value: inputAddress, // Use inputAddress for the input field value
              onChangeText: (text) => setInputAddress(text), // Update only inputAddress on text change
              placeholderTextColor: Colors.gray10
            }}
            numberOfLines={1}
            keyboardShouldPersistTaps="always"
            currentLocationLabel="Current location"
            query={{
              key: API_KEY,
              language: 'en'
            }}
            minLength={3}
            GooglePlacesSearchQuery={{
              rankby: 'distance'
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={200}
            styles={{
              textInputContainer: styles.placesInputContainer,
              textInput: styles.placesInput
            }}
            renderLeftButton={() => (
              <View style={ApplicationStyles.centerView}>
                <SearchIcons />
              </View>
            )}
            onPress={(data, details = null) => {
              if (details) {
                handleAddressSelection(details);
                setInputAddress(details?.formatted_address);
              }
            }}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mapContainer}>
            {mapRegion ? (
              <MapView
                followsUserLocation
                showsMyLocationButton
                showsCompass
                rotateEnabled
                loadingEnabled
                showsUserLocation
                style={StyleSheet.absoluteFillObject}
                provider={PROVIDER_GOOGLE}
                userLocationPriority="high"
                loadingIndicatorColor={'#00000050'}
                mapType="standard"
                region={mapRegion}
                onRegionChangeComplete={onRegionChangeComplete}
              >
                {/* <Marker
                coordinate={{
                  latitude: mapRegion.latitude,
                  longitude: mapRegion.longitude
                }}
                anchor={{ x: 0.5, y: 0.5 }} // Adjust the anchor to ensure it's centered
                flat={true} // Keeps the marker flat to the map surface
              >
                <Image
                  source={AppIcon.Location} // Your custom marker image
                  // style={styles.staticLocationIcon} // Make sure the size is consistent
                  style={{
                    width: 30, // Set a fixed size for the marker image
                    height: 30, // This will ensure consistent scaling
                    alignSelf: 'center' // Center the image
                  }}
                  resizeMode="contain"
                  resizeMethod="auto"
                />
              </Marker> */}
              </MapView>
            ) : (
              <View style={styles.loaderView}>
                {/* <ActivityIndicator
                  size="large"
                  style={{}}
                  color={Colors.primary}
                /> */}
                <CommonLoader isLoading={!mapRegion} color={Colors.primary} />
              </View>
            )}
            <Image
              source={AppIcon.Location}
              // style={{
              //   width: verticalScale(30), // Set a fixed size for the marker image
              //   height: verticalScale(30), // This will ensure consistent scaling
              //   alignSelf: 'center' // Center the image
              // }}
              style={styles.staticLocationIcon}
              resizeMode="contain"
              resizeMethod="auto"
            />
          </View>
        </ScrollView>
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          handleIndicatorStyle={{ backgroundColor: Colors.grey10 }}
          backgroundStyle={styles.sheetBg}
        >
          <BottomSheetScrollView style={styles.sheetView}>
            <TextInputFieldPaper
              label={t(APP_LANGUAGE_CONSTANT.OUTLET_NAME)}
              value={outletName}
              style={styles.outletName}
              onFocus={() => bottomSheetRef?.current?.snapToIndex(1)}
              onChangeText={(text) => {
                setOutletName(text), bottomSheetRef?.current?.snapToIndex(1);
              }}
            />
            <TextInputFieldPaper
              label={t(APP_LANGUAGE_CONSTANT.OUTLET_ADDRESS)}
              value={outletAddress}
              style={styles.outletAddress}
              onChangeText={(text) => setOutletAddress(text)}
            />
            <TextInputFieldPaper
              label={t(APP_LANGUAGE_CONSTANT.P_O_BOX)}
              value={poBox}
              style={styles.pobox}
              keyboardType="number-pad"
              onChangeText={(text) => setPoBox(text)}
            />
            <View style={{ backgroundColor: Colors.white }}>
              <LinearGradient
                colors={[Colors.orange10, Colors.orange30]} // Dark at top, light at bottom
                start={{ x: 0.5, y: 0 }} // Top-center (dark)
                end={{ x: 0.5, y: 1 }} // Bottom-center (light)
                style={styles.gradient}
              >
                <TouchableOpacity
                  style={styles.gradientBtn}
                  onPress={onAddOutlet}
                >
                  <Text style={styles.addOutletBtn}>
                    {from === EDIT_ADDRESS
                      ? customData?.editButtonName
                      : customData?.heading}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      </KeyboardAvoidingView>
    </ContainerLayout>
  );
};
export default AddOutlet;
